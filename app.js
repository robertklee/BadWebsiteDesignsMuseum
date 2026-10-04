import { getCatalog, getExhibit, getPreview, renderExhibitContent } from "./exhibits/registry.js";

const exhibits = getCatalog();

const main = document.querySelector("#main");
document.querySelector(".nav-count").textContent = String(exhibits.length).padStart(2, "0");
let currentId = null;
let mode = "bad";
let cleanup = () => {};
let activeFilter = "All exhibits";
let guideOpen = true;

try {
  guideOpen = sessionStorage.getItem("museum-guide-dismissed") !== "true";
} catch (error) {
  if (!(error instanceof DOMException) || error.name !== "SecurityError") throw error;
  console.warn("The museum guide preference is unavailable; the guide will remain available.", error);
}

function dismissGuide() {
  guideOpen = false;
  try {
    sessionStorage.setItem("museum-guide-dismissed", "true");
  } catch (error) {
    if (!(error instanceof DOMException) || !["SecurityError", "QuotaExceededError"].includes(error.name)) throw error;
    console.warn("Unable to remember the museum guide dismissal for this tab.", error);
  }
}

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function preview(id) {
  return getPreview(id);
}

export { exhibits, preview };

function card(exhibit) {
  return `<a class="exhibit-card" href="/exhibit/${exhibit.id}">
    <div class="card-art ${exhibit.color}" aria-hidden="true"><span class="exhibit-number">EXHIBIT ${exhibit.number}</span>${exhibit.new ? '<span class="new-banner">NEW</span>' : ""}${preview(exhibit.id)}<span class="card-enter">↗</span></div>
    <div class="card-meta"><span>${exhibit.category}</span><span>INTERACTIVE ↗</span></div>
    <h3>${exhibit.name}</h3><p>${exhibit.description}</p>
  </a>`;
}

function setupScrollPreviews(grid) {
  const touch = matchMedia("(hover: none) and (pointer: coarse)");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const listeners = new AbortController();
  const played = new Set();
  let timer = null;
  let active = null;
  let touching = false;
  let disposed = false;
  grid.dataset.thumbInput = touch.matches ? "touch" : "mouse";

  const stop = () => {
    clearTimeout(timer);
    timer = null;
    const previous = active;
    active = null;
    previous?.classList.remove("thumb-scroll-active");
  };
  const enabled = () => !disposed && grid.dataset.thumbInput === "touch" && !reducedMotion.matches && !document.hidden && !touching && grid.isConnected && !grid.querySelector(":focus-visible");
  const placement = element => {
    const viewport = window.visualViewport;
    const height = viewport?.height || innerHeight;
    const top = viewport?.offsetTop || 0;
    const bounds = element.querySelector(".card-art").getBoundingClientRect();
    const visible = Math.max(0, Math.min(bounds.bottom, top + height * .9) - Math.max(bounds.top, top + height * .1));
    return { element, distance: Math.abs(bounds.top + bounds.height / 2 - top - height / 2), visibility: visible / Math.min(bounds.height, height * .8) };
  };
  const activate = () => {
    timer = null;
    if (!enabled() || active) return;
    const candidates = [...grid.querySelectorAll(".exhibit-card")].map(placement)
      .filter(candidate => candidate.visibility >= .65 && !played.has(candidate.element.getAttribute("href")))
      .sort((first, second) => first.distance - second.distance);
    for (const { element } of candidates) {
      element.classList.add("thumb-scroll-active");
      const animations = element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith("thumb-"));
      if (!animations.length) {
        played.add(element.getAttribute("href"));
        element.classList.remove("thumb-scroll-active");
        continue;
      }
      active = element;
      Promise.all(animations.map(animation => animation.finished)).then(() => {
        if (active !== element) return;
        played.add(element.getAttribute("href"));
        active = null;
        element.classList.remove("thumb-scroll-active");
        schedule();
      }).catch(() => {});
      break;
    }
  };
  const schedule = () => {
    if (active?.isConnected && enabled() && placement(active).visibility >= .35) return;
    stop();
    if (enabled()) timer = setTimeout(activate, 180);
  };
  const selectInput = input => {
    if (grid.dataset.thumbInput === input) return;
    grid.dataset.thumbInput = input;
    schedule();
  };
  const options = { passive: true, signal: listeners.signal };
  window.addEventListener("scroll", schedule, options);
  window.addEventListener("resize", schedule, options);
  window.visualViewport?.addEventListener("resize", schedule, options);
  window.visualViewport?.addEventListener("scroll", schedule, options);
  document.addEventListener("visibilitychange", () => {
    touching = false;
    schedule();
  }, options);
  document.addEventListener("pointerdown", event => {
    touching = true;
    selectInput(event.pointerType === "mouse" ? "mouse" : "touch");
    stop();
  }, options);
  document.addEventListener("pointermove", event => {
    if (!touching && event.pointerType === "mouse") selectInput("mouse");
  }, options);
  window.addEventListener("wheel", () => selectInput("mouse"), options);
  grid.addEventListener("focusin", schedule, options);
  grid.addEventListener("focusout", () => queueMicrotask(() => { if (!disposed) schedule(); }), options);
  const release = () => { touching = false; schedule(); };
  document.addEventListener("pointerup", release, options);
  document.addEventListener("pointercancel", release, options);
  touch.addEventListener("change", () => selectInput(touch.matches ? "touch" : "mouse"), options);
  reducedMotion.addEventListener("change", schedule, options);
  document.fonts.ready.then(() => { if (!disposed) schedule(); });
  schedule();
  return {
    refresh: schedule,
    dispose() {
      disposed = true;
      stop();
      listeners.abort();
      delete grid.dataset.thumbInput;
    },
  };
}

function renderHome(anchor) {
  currentId = null;
  main.innerHTML = `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy"><div class="eyebrow"><span class="small-cross">✳</span> SIMPLE TASKS. TERRIBLE EXPERIENCES.</div>
      <h1 id="hero-title">Good taste.<br><span>Bad examples.</span></h1>
      <p>A collection of everyday tasks with exceptionally bad ideas attached. Enter a phone number, cancel a subscription, or click a button. Simple enough. In theory.</p>
      <a class="primary-link" href="/exhibit/cat-captcha">Try your first bad idea <span>↗</span></a>
      <a class="hero-browse" href="/#collection">Or browse the whole collection ↓</a>
      <div class="hero-fine">${exhibits.length} things to try <span>·</span> Deliberately bad design <span>·</span> Free to explore</div></div>
      <div class="hero-sculpture" aria-hidden="true"><div class="orbit-label">EXCEPTIONALLY BAD. INTENTIONALLY SO.</div><div class="sculpture-window"><div class="window-top"><span>● ● ●</span><span>oops.website</span><span>×</span></div><div class="sculpture-body"><span class="error-tag">DESIGN ERROR 404</span><div class="face"><span>×</span><span>×</span><i></i></div><strong>Looks wrong.<br>Feels right.</strong><span class="window-button">please don't click</span></div></div><div class="award-seal">100%<span>BAD<br>BY DESIGN</span></div><span class="floating-star">✳</span><span class="sculpture-caption">FIG. 001 — A BEAUTIFUL MISTAKE</span></div>
    </section>
    <div class="manifesto-strip"><span>FAMILIAR TASKS. UNFAMILIAR OBSTACLES.</span><span aria-hidden="true">✳</span><span>CLICK. TYPE. TRY AGAIN.</span><span aria-hidden="true">✳</span><span>ALL THE FRUSTRATION. NONE OF THE CONSEQUENCES.</span><span aria-hidden="true">✳</span></div>
    <section class="collection section-wrap" id="collection" aria-labelledby="collection-title"><div class="section-heading"><div><div class="eyebrow">THE PERMANENT COLLECTION</div><h2 id="collection-title">${exhibits.length} simple tasks, made difficult<span> (on purpose).</span></h2></div><p>Pick something you'd normally do online.<br>See how much worse it could be.</p></div>
    <div class="filters" role="group" aria-label="Filter exhibits">${["All exhibits", ...new Set(exhibits.map(exhibit => exhibit.category))].map(label => `<button class="filter" aria-pressed="${activeFilter === label}" data-filter="${label}">${label}${label === "All exhibits" ? ` <span>${String(exhibits.length).padStart(2, "0")}</span>` : ""}</button>`).join("")}</div>
    <div class="card-grid" id="exhibit-grid">${exhibits.filter(e => activeFilter === "All exhibits" || e.category === activeFilter).map(card).join("")}</div>
    <p class="collection-footnote"><span>↳</span> These are working demos, not screenshots. Try the task yourself; the bad design is deliberate.</p></section>
    <section id="about" class="about section-wrap"><div class="about-symbol" aria-hidden="true">✳</div><div><div class="eyebrow">WHY THIS WEBSITE EXISTS</div><h2>You've had a frustrating<br>experience online. So have we.</h2><p>You came to do one small thing online. The website had other plans. This collection takes familiar frustrations somewhere they probably should never have gone. No design or programming knowledge required.</p><p>Each exhibit gives you a familiar task and an unnecessarily difficult way to do it. Choose <strong>“Make it even worse”</strong> to take the joke further, or the smaller “Fix it” option for a break. Nothing you buy, send, or sign up for here is real, and you can always leave an exhibit.</p><span class="about-signoff">INSPIRED BY REAL FRUSTRATIONS. EXAGGERATED FOR YOUR ENJOYMENT. ↗</span></div></section>`;
  document.title = "Really Bad Design Museum — Good taste. Bad examples.";
  const scrollPreviews = setupScrollPreviews(main.querySelector("#exhibit-grid"));
  cleanup = scrollPreviews.dispose;
  main.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    main.querySelectorAll("[data-filter]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    document.querySelector("#exhibit-grid").innerHTML = exhibits.filter(e => activeFilter === "All exhibits" || e.category === activeFilter).map(card).join("");
    scrollPreviews.refresh();
  }));
  if (anchor) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView());
}

function renderExhibit(id, focus = false) {
  const exhibit = getExhibit(id);
  if (!exhibit) {
    currentId = null;
    main.innerHTML = `<section class="not-found section-wrap"><div class="eyebrow">EXHIBIT NOT FOUND</div><h1>This one's missing.</h1><p>That link doesn't lead to an exhibit. Choose another from the collection.</p><a class="primary-link" href="/#collection">Back to the collection ↗</a></section>`;
    return;
  }
  currentId = id;
  const url = new URL(location.href);
  if (mode === "worse") url.searchParams.set("mode", "hard");
  else if (mode === "fixed") url.searchParams.set("mode", "fixed");
  else url.searchParams.delete("mode");
  if (url.href !== location.href) history.replaceState(history.state, "", url);
  document.title = `${exhibit.name} — Really Bad Design Museum`;
  const nextExhibit = exhibits[(exhibits.indexOf(exhibit) + 1) % exhibits.length];
  const modeLabel = mode === "fixed" ? "Fixed. Suspiciously sensible" : mode === "worse" ? "Even worse. You asked for this" : "Original disaster";
  const modeNote = mode === "fixed"
    ? "This version removes the unnecessary obstacles. Switch back whenever you'd like."
    : mode === "worse"
      ? exhibit.worseChange
      : "Try the task below. The obstacles are deliberate; Restart and Exit always work.";
  main.innerHTML = `<section class="exhibit-page section-wrap">
    <a class="escape" href="/#collection">← Back to the collection</a>
    <div class="exhibit-heading"><div><div class="eyebrow">EXHIBIT ${exhibit.number} / ${exhibit.category.toUpperCase()}</div><h1>${exhibit.name}</h1><p>${exhibit.tagline}</p></div><span class="specimen-label">TRY IT YOURSELF.<br>IT REALLY WORKS. ↙</span></div>
    <details class="exhibit-guide"${guideOpen ? " open" : ""}>
      <summary>New here? Here's how this works <span aria-hidden="true">↓</span></summary>
      <div class="guide-body"><p class="guide-intro">This website collects the worst ways to do simple tasks online. Each exhibit starts with something familiar, then makes it far more difficult than it needs to be.</p>
      <ol class="guide-steps"><li><strong>Try a familiar task.</strong><span>Click, type, or scroll in the demo below. The instructions tell you what you're trying to do.</span></li><li><strong>Make it even worse.</strong><span>Choose the more frustrating version whenever you like. You don't have to finish first. Switching modes starts a fresh demo and clears progress.</span></li><li><strong>Stay in control.</strong><span>Restart begins the current demo again. Exit returns to the collection. “Fix it” removes the obstacles. Escape exits only when focus is on the museum controls; inside the demo, it belongs to the current control or pop-up.</span></li></ol>
      <div class="guide-footer"><p>These are demos, not real services. Use made-up details, never real passwords or payment information.</p><button type="button" class="guide-dismiss">Got it — let's try it</button></div></div>
    </details>
    <div class="exhibit-toolbar"><span class="museum-controls-label">MUSEUM CONTROLS <span>These actually work.</span></span><div class="mode-controls" role="group" aria-label="Exhibit mode"><button type="button" data-mode="bad" aria-pressed="${mode === "bad"}">Original disaster</button><button type="button" data-mode="worse" aria-pressed="${mode === "worse"}">Make it even worse ↗</button><button type="button" class="mode-fix" data-mode="fixed" aria-pressed="${mode === "fixed"}">Fix it ✓</button></div><div class="toolbar-actions"><button type="button" class="reset-button" aria-label="Restart in the current mode">↻ Restart</button><a class="toolbar-exit" href="/#collection">Exit ↗</a></div></div>
    <p class="mode-note" role="status"><strong>${modeLabel}.</strong> ${modeNote} Switching modes starts a fresh demo and clears progress.</p>
    <section class="exhibit-frame" aria-labelledby="simulation-title">
      <div class="exhibit-frame-heading"><div><span class="eyebrow" id="simulation-title">INTERACTIVE DEMO</span><p>Try the task here. No real-world consequences.</p></div><button type="button" class="start-exhibit">Jump into exhibit ↓</button></div>
      <div class="exhibit-task" id="exhibit-task"><span>YOUR TASK</span><p>${mode === "fixed" ? exhibit.fixedTask : exhibit.task}</p></div>
      <div class="exhibit-stage ${id}-stage ${mode}" id="stage" role="region" aria-label="${exhibit.name} simulation" aria-describedby="exhibit-task" tabindex="-1"></div>
      <div class="exhibit-frame-footer"><span>SIMULATION ONLY</span><span>No real orders, accounts, or submissions.</span></div>
    </section>
    <aside class="exhibit-outcome" id="exhibit-outcome" aria-label="Exhibit result" aria-live="polite" aria-atomic="true" hidden><a href="#difficulty-progress"><strong></strong><span></span><small>View result and next options →</small></a><button type="button" aria-label="Hide result notification" title="Hide result notification">×</button></aside>
    <section class="difficulty-progress" id="difficulty-progress" aria-labelledby="completion-title" hidden><div><div class="eyebrow">YOUR RESULT</div><h2 id="completion-title" tabindex="-1">Task complete</h2><p></p></div><div class="difficulty-transition-actions">${mode === "worse" ? `<a class="completion-primary" href="/exhibit/${nextExhibit.id}">Next questionable idea →</a>` : '<button type="button" class="completion-primary" data-difficulty-action="advance">Make it even worse ↗</button>'}${mode !== "fixed" ? '<button type="button" class="completion-fix" data-difficulty-action="fix">Fix it ✓</button>' : ""}<button type="button" class="completion-stay" data-difficulty-action="stay">Keep admiring this mess</button></div></section>
    <details class="curator-note"><summary>${mode === "fixed" ? "What's different in this version?" : "What's the idea behind this exhibit?"}</summary><p>${mode === "fixed" ? exhibit.fix : exhibit.lesson}</p></details>
    <div class="exhibit-bottom"><a href="/#collection">← All exhibits</a><a href="/exhibit/${nextExhibit.id}">Next questionable idea →</a></div>
  </section>`;
  const guide = main.querySelector(".exhibit-guide");
  guide.addEventListener("toggle", () => {
    if (!guide.isConnected) return;
    guideOpen = guide.open;
    if (!guide.open) dismissGuide();
  });
  const stage = main.querySelector("#stage");
  const enterStage = () => {
    stage.focus({ preventScroll: true });
    const taskTop = main.querySelector("#exhibit-task").getBoundingClientRect().top + window.scrollY;
    const toolbarHeight = main.querySelector(".exhibit-toolbar").getBoundingClientRect().height;
    window.scrollTo({ top: Math.max(0, taskTop - toolbarHeight - 12), behavior: "instant" });
  };
  const enterMuseumControls = () => {
    main.querySelector(".exhibit-toolbar").scrollIntoView({ block: "start", behavior: "instant" });
    main.querySelector('[data-mode][aria-pressed="true"]').focus({ preventScroll: true });
  };
  stage.addEventListener("museum-controls", enterMuseumControls);
  main.querySelector(".guide-dismiss").addEventListener("click", () => {
    guide.open = false;
    dismissGuide();
    main.querySelector(".start-exhibit").focus({ preventScroll: true });
  });
  main.querySelector(".start-exhibit").addEventListener("click", enterStage);
  const changeMode = nextMode => {
    cleanup();
    mode = nextMode;
    renderExhibit(id);
    main.querySelector(`[data-mode="${mode}"]`).focus({ preventScroll: true });
  };
  main.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => {
    if (mode !== button.dataset.mode) changeMode(button.dataset.mode);
  }));
  main.querySelector(".reset-button").addEventListener("click", () => {
    cleanup();
    renderExhibit(id);
    main.querySelector(".reset-button").focus({ preventScroll: true });
  });
  const completionCleanup = setupCompletionActions(changeMode);
  renderStage(id);
  const stageCleanup = cleanup;
  cleanup = () => {
    stage.removeEventListener("museum-controls", enterMuseumControls);
    completionCleanup();
    stageCleanup();
  };
  if (focus) main.focus({ preventScroll: true });
}

function setupCompletionActions(changeMode) {
  const stage = main.querySelector("#stage");
  const notice = main.querySelector("#difficulty-progress");
  const notification = main.querySelector("#exhibit-outcome");
  let completed = false;
  let disposed = false;
  const complete = event => {
    if (disposed || completed) return;
    completed = true;
    const blocked = event.detail?.outcome === "blocked";
    const title = blocked ? "Demo complete — goal blocked" : "Task complete";
    const result = event.detail?.message || stage.querySelector(".demo-status")?.textContent.trim() || "Your task is complete.";
    stage.dataset.outcome = blocked ? "blocked" : "success";
    main.querySelector("#exhibit-task > span").textContent = blocked ? "DEMO COMPLETE" : "TASK COMPLETE";
    main.querySelector(".exhibit-frame-footer > span").textContent = blocked ? "GOAL BLOCKED BY THE WEBSITE" : "TASK COMPLETE";
    notice.hidden = false;
    notice.querySelector("h2").textContent = title;
    notice.querySelector("p").textContent = result;
    notification.querySelector("strong").textContent = title;
    notification.querySelector("span").textContent = result;
    notification.hidden = false;
  };
  stage.addEventListener("exhibit-complete", complete);
  const reset = () => {
    if (disposed) return;
    completed = false;
    delete stage.dataset.outcome;
    main.querySelector("#exhibit-task > span").textContent = "YOUR TASK";
    main.querySelector(".exhibit-frame-footer > span").textContent = "SIMULATION ONLY";
    notice.hidden = true;
    notice.querySelector("h2").textContent = "Task complete";
    notice.querySelector("p").textContent = "";
    notification.hidden = true;
    notification.querySelector("strong").textContent = "";
    notification.querySelector("span").textContent = "";
  };
  stage.addEventListener("exhibit-reset", reset);
  notice.querySelector("[data-difficulty-action='stay']").addEventListener("click", () => {
    notice.hidden = true;
    notification.hidden = true;
    stage.focus({ preventScroll: true });
  });
  notification.querySelector("button").addEventListener("click", () => {
    notification.hidden = true;
    stage.focus({ preventScroll: true });
  });
  notification.querySelector("a").addEventListener("click", event => {
    event.preventDefault();
    notice.hidden = false;
    notification.hidden = true;
    notice.scrollIntoView({ block: "center", behavior: "instant" });
    notice.querySelector("h2").focus({ preventScroll: true });
  });
  notice.querySelector("[data-difficulty-action='advance']")?.addEventListener("click", () => changeMode("worse"));
  notice.querySelector("[data-difficulty-action='fix']")?.addEventListener("click", () => changeMode("fixed"));
  return () => {
    disposed = true;
    stage.removeEventListener("exhibit-complete", complete);
    stage.removeEventListener("exhibit-reset", reset);
  };
}

function renderStage(id) {
  cleanup = () => {};
  const stage = document.querySelector("#stage");
  cleanup = renderExhibitContent({ id, stage, mode, shuffle: shuffled }) || (() => {});
}

function route() {
  cleanup();
  cleanup = () => {};
  const requestedMode = new URLSearchParams(location.search).get("mode");
  mode = requestedMode === "hard" ? "worse" : requestedMode === "fixed" ? "fixed" : "bad";
  const hash = location.hash.slice(1);
  const pathMatch = location.pathname.match(/^\/exhibit\/([^/]+)\/?$/);
  if (pathMatch) {
    renderExhibit(decodeURIComponent(pathMatch[1]), true);
    window.scrollTo(0, 0);
  } else if (hash.startsWith("exhibit/")) {
    const exhibitId = hash.slice(8);
    history.replaceState(history.state, "", `/exhibit/${encodeURIComponent(exhibitId)}${location.search}`);
    renderExhibit(exhibitId, true);
    window.scrollTo(0, 0);
  } else {
    renderHome(hash === "collection" || hash === "about" ? hash : null);
    if (!hash || hash === "home") window.scrollTo(0, 0);
  }
}

window.addEventListener("hashchange", route);
window.addEventListener("popstate", route);
document.querySelector(".skip-link").addEventListener("click", event => {
  event.preventDefault();
  main.focus();
});
window.addEventListener("keydown", event => {
  if (event.key !== "Escape" || !currentId || event.defaultPrevented || event.isComposing
      || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.target instanceof Element && event.target.closest(".exhibit-toolbar")) location.href = "/#collection";
});
route();
