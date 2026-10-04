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
      <div class="hero-copy"><div class="eyebrow"><span class="small-cross">✳</span> A CELEBRATION OF WHAT NOT TO DO</div>
      <h1 id="hero-title">Good taste.<br><span>Bad examples.</span></h1>
      <p>The internet has some terrible ideas.<br>We gave them a very nice home.</p>
      <a class="primary-link" href="/exhibit/cat-captcha">Try your first bad idea <span>↗</span></a>
      <a class="hero-browse" href="/#collection">Or browse the whole collection ↓</a>
      <div class="hero-fine">${exhibits.length} interactive exhibits <span>·</span> Zero best practices <span>·</span> Free admission</div></div>
      <div class="hero-sculpture" aria-hidden="true"><div class="orbit-label">EXCEPTIONALLY BAD. INTENTIONALLY SO.</div><div class="sculpture-window"><div class="window-top"><span>● ● ●</span><span>oops.website</span><span>×</span></div><div class="sculpture-body"><span class="error-tag">DESIGN ERROR 404</span><div class="face"><span>×</span><span>×</span><i></i></div><strong>Looks wrong.<br>Feels right.</strong><span class="window-button">please don't click</span></div></div><div class="award-seal">100%<span>BAD<br>BY DESIGN</span></div><span class="floating-star">✳</span><span class="sculpture-caption">FIG. 001 — A BEAUTIFUL MISTAKE</span></div>
    </section>
    <div class="manifesto-strip"><span>BAD DESIGN. GOOD COMPANY.</span><span aria-hidden="true">✳</span><span>LOOK. CLICK. QUESTION EVERYTHING.</span><span aria-hidden="true">✳</span><span>PLEASE TRY THIS AT HOME.</span><span aria-hidden="true">✳</span></div>
    <section class="collection section-wrap" id="collection" aria-labelledby="collection-title"><div class="section-heading"><div><div class="eyebrow">THE PERMANENT COLLECTION</div><h2 id="collection-title">${exhibits.length} ways to get it wrong<span> (and counting).</span></h2></div><p>Don't just look at bad design.<br>Experience the inconvenience.</p></div>
    <div class="filters" role="group" aria-label="Filter exhibits">${["All exhibits", ...new Set(exhibits.map(exhibit => exhibit.category))].map(label => `<button class="filter" aria-pressed="${activeFilter === label}" data-filter="${label}">${label}${label === "All exhibits" ? ` <span>${String(exhibits.length).padStart(2, "0")}</span>` : ""}</button>`).join("")}</div>
    <div class="card-grid" id="exhibit-grid">${exhibits.filter(e => activeFilter === "All exhibits" || e.category === activeFilter).map(card).join("")}</div>
    <p class="collection-footnote"><span>↳</span> Every exhibit is interactive. Every bad decision is on purpose.</p></section>
    <section id="about" class="about section-wrap"><div class="about-symbol" aria-hidden="true">✳</div><div><div class="eyebrow">OUR QUESTIONABLE MISSION</div><h2>Sometimes the best lesson<br>is a really bad example.</h2><p>We're a little museum of big design mistakes. A place to play with the patterns that make the internet frustrating, confusing, and occasionally hilarious.</p><p>Try an ordinary task. Discover an extraordinary inconvenience. Then choose <strong>“Make it even worse”</strong>, because apparently that wasn't enough. “Fix it” is there if you've developed a sudden interest in sensible decisions. No real purchases, no collected data, no inescapable popups. Just questionable fun.</p><span class="about-signoff">CURATED WITH LOVE. AND SOME CONCERN. ↗</span></div></section>`;
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
    main.innerHTML = `<section class="not-found section-wrap"><div class="eyebrow">ERROR 404. THE REAL KIND.</div><h1>Too bad to exhibit.</h1><p>We couldn't find that exhibit.</p><a class="primary-link" href="/#collection">Back to the collection ↗</a></section>`;
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
    ? "The joke is taking a short break. Switch back whenever you miss the nonsense."
    : mode === "worse"
      ? exhibit.worseChange
      : "The inconvenience is intentional. The museum controls aren't part of the joke.";
  main.innerHTML = `<section class="exhibit-page section-wrap">
    <a class="escape" href="/#collection">← Back to the collection</a>
    <div class="exhibit-heading"><div><div class="eyebrow">EXHIBIT ${exhibit.number} / ${exhibit.category.toUpperCase()}</div><h1>${exhibit.name}</h1><p>${exhibit.tagline}</p></div><span class="specimen-label">PLEASE TOUCH<br>THE ARTWORK. ↙</span></div>
    <details class="exhibit-guide"${guideOpen ? " open" : ""}>
      <summary>New here? Here's how this works <span aria-hidden="true">↓</span></summary>
      <div class="guide-body"><p class="guide-intro">A fake website inside a real museum. Only one of them is supposed to work.</p>
      <ol class="guide-steps"><li><strong>Try the ordinary task.</strong><span>Play inside the labeled exhibit below. Yes, it's meant to behave like that.</span></li><li><strong>Make a bad idea worse.</strong><span>Turn up the nonsense whenever you like. No need to finish first.</span></li><li><strong>Leave with your dignity.</strong><span>Restart and Exit always work. “Fix it” is the small, sensible escape hatch.</span></li></ol>
      <div class="guide-footer"><p>All make-believe. Use invented details, never real passwords or payment information.</p><button type="button" class="guide-dismiss">Got it — let me suffer</button></div></div>
    </details>
    <div class="exhibit-toolbar"><span class="museum-controls-label">MUSEUM CONTROLS <span>These actually work.</span></span><div class="mode-controls" role="group" aria-label="Exhibit mode"><button type="button" data-mode="bad" aria-pressed="${mode === "bad"}">Original disaster</button><button type="button" data-mode="worse" aria-pressed="${mode === "worse"}">Make it even worse ↗</button><button type="button" class="mode-fix" data-mode="fixed" aria-pressed="${mode === "fixed"}">Fix it ✓</button></div><div class="toolbar-actions"><button type="button" class="reset-button" aria-label="Restart in the current mode">↻ Restart</button><a class="toolbar-exit" href="/#collection">Exit ↗</a></div></div>
    <p class="mode-note" role="status"><strong>${modeLabel}.</strong> ${modeNote}</p>
    <section class="exhibit-frame" aria-labelledby="simulation-title">
      <div class="exhibit-frame-heading"><div><span class="eyebrow" id="simulation-title">INTERACTIVE EXHIBIT · FAKE WEBSITE</span><p>Everything below is the joke.</p></div><button type="button" class="start-exhibit">Jump into exhibit ↓</button></div>
      <div class="exhibit-task" id="exhibit-task"><span>YOUR MISSION</span><p>${mode === "fixed" ? "Try the everyday task, minus the unnecessary nonsense." : exhibit.task}</p></div>
      <div class="exhibit-stage ${id}-stage ${mode}" id="stage" role="region" aria-label="${exhibit.name} simulation" aria-describedby="exhibit-task" tabindex="-1"></div>
      <div class="exhibit-frame-footer"><span>END OF THE FAKE WEBSITE</span><span>No real orders, accounts, or submissions.</span></div>
    </section>
    <section class="difficulty-progress" id="difficulty-progress" aria-labelledby="completion-title" hidden><div><div class="eyebrow">EXHIBIT SURVIVED</div><h2 id="completion-title">${mode === "worse" ? "You survived the sequel." : mode === "fixed" ? "Suspiciously cooperative." : "Against all reasonable odds."}</h2><p role="status"></p></div><div class="difficulty-transition-actions">${mode === "worse" ? `<a class="completion-primary" href="/exhibit/${nextExhibit.id}">Next questionable idea →</a>` : '<button type="button" class="completion-primary" data-difficulty-action="advance">Make it even worse ↗</button>'}${mode !== "fixed" ? '<button type="button" class="completion-fix" data-difficulty-action="fix">Fix it ✓</button>' : ""}<button type="button" class="completion-stay" data-difficulty-action="stay">Keep admiring this mess</button></div></section>
    <details class="curator-note"><summary>${mode === "fixed" ? "A brief lapse in terrible judgment" : "A word from the curators"}</summary><p>${mode === "fixed" ? exhibit.fix : exhibit.lesson}</p></details>
    <div class="exhibit-bottom"><a href="/#collection">← All exhibits</a><a href="/exhibit/${nextExhibit.id}">Next questionable idea →</a></div>
  </section>`;
  const guide = main.querySelector(".exhibit-guide");
  guide.addEventListener("toggle", () => {
    if (!guide.isConnected) return;
    guideOpen = guide.open;
    if (!guide.open) dismissGuide();
  });
  const enterStage = () => {
    const stage = main.querySelector("#stage");
    stage.focus({ preventScroll: true });
    stage.scrollIntoView({ block: "start", behavior: "instant" });
  };
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
  renderStage(id);
  setupCompletionActions(changeMode);
  if (focus) main.focus({ preventScroll: true });
}

function setupCompletionActions(changeMode) {
  const stage = main.querySelector("#stage");
  const notice = main.querySelector("#difficulty-progress");
  const initialMode = mode;
  const stageCleanup = cleanup;
  let completed = false;
  let disposed = false;
  const complete = () => {
    if (disposed || completed) return;
    completed = true;
    notice.hidden = false;
    notice.querySelector("p").textContent = initialMode === "worse"
      ? "That was the extra nonsense. Your next bad idea is ready when you are."
      : initialMode === "fixed"
        ? "Task complete. Enough good judgment for one visit?"
        : "Task complete. Apparently this could still be more inconvenient. Nothing changes until you choose.";
  };
  stage.addEventListener("exhibit-complete", complete);
  notice.querySelector("[data-difficulty-action='stay']").addEventListener("click", () => {
    notice.hidden = true;
    stage.focus({ preventScroll: true });
  });
  notice.querySelector("[data-difficulty-action='advance']")?.addEventListener("click", () => changeMode("worse"));
  notice.querySelector("[data-difficulty-action='fix']")?.addEventListener("click", () => changeMode("fixed"));
  cleanup = () => {
    disposed = true;
    stage.removeEventListener("exhibit-complete", complete);
    stageCleanup();
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
  if (event.key === "Escape" && currentId) location.href = "/#collection";
});
route();
