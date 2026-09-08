import { getCatalog, getExhibit, getPreview, renderExhibitContent } from "./exhibits/registry.js";

const exhibits = getCatalog();

const main = document.querySelector("#main");
document.querySelector(".nav-count").textContent = String(exhibits.length).padStart(2, "0");
let currentId = null;
let mode = "bad";
let cleanup = () => {};
let activeFilter = "All exhibits";

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

function renderHome(anchor) {
  currentId = null;
  main.innerHTML = `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy"><div class="eyebrow"><span class="small-cross">✳</span> A CELEBRATION OF WHAT NOT TO DO</div>
      <h1 id="hero-title">Good taste.<br><span>Bad examples.</span></h1>
      <p>The internet has some terrible ideas.<br>We gave them a very nice home.</p>
      <a class="primary-link" href="/#collection">Enter the collection <span>↘</span></a>
      <div class="hero-fine">${exhibits.length} interactive exhibits <span>·</span> Zero best practices <span>·</span> Free admission</div></div>
      <div class="hero-sculpture" aria-hidden="true"><div class="orbit-label">EXCEPTIONALLY BAD. INTENTIONALLY SO.</div><div class="sculpture-window"><div class="window-top"><span>● ● ●</span><span>oops.website</span><span>×</span></div><div class="sculpture-body"><span class="error-tag">DESIGN ERROR 404</span><div class="face"><span>×</span><span>×</span><i></i></div><strong>Looks wrong.<br>Feels right.</strong><span class="window-button">please don't click</span></div></div><div class="award-seal">100%<span>BAD<br>BY DESIGN</span></div><span class="floating-star">✳</span><span class="sculpture-caption">FIG. 001 — A BEAUTIFUL MISTAKE</span></div>
    </section>
    <div class="manifesto-strip"><span>BAD DESIGN. GOOD COMPANY.</span><span aria-hidden="true">✳</span><span>LOOK. CLICK. QUESTION EVERYTHING.</span><span aria-hidden="true">✳</span><span>PLEASE TRY THIS AT HOME.</span><span aria-hidden="true">✳</span></div>
    <section class="collection section-wrap" id="collection" aria-labelledby="collection-title"><div class="section-heading"><div><div class="eyebrow">THE PERMANENT COLLECTION</div><h2 id="collection-title">${exhibits.length} ways to get it wrong<span> (and counting).</span></h2></div><p>Don't just look at bad design.<br>Experience the inconvenience.</p></div>
    <div class="filters" role="group" aria-label="Filter exhibits">${["All exhibits", ...new Set(exhibits.map(exhibit => exhibit.category))].map(label => `<button class="filter" aria-pressed="${activeFilter === label}" data-filter="${label}">${label}${label === "All exhibits" ? ` <span>${String(exhibits.length).padStart(2, "0")}</span>` : ""}</button>`).join("")}</div>
    <div class="card-grid" id="exhibit-grid">${exhibits.filter(e => activeFilter === "All exhibits" || e.category === activeFilter).map(card).join("")}</div>
    <p class="collection-footnote"><span>↳</span> Every exhibit is interactive. Every bad decision is on purpose.</p></section>
    <section id="about" class="about section-wrap"><div class="about-symbol" aria-hidden="true">✳</div><div><div class="eyebrow">OUR QUESTIONABLE MISSION</div><h2>Sometimes the best lesson<br>is a really bad example.</h2><p>We're a little museum of big design mistakes. A place to play with the patterns that make the internet frustrating, confusing, and occasionally hilarious.</p><p>Turn up the chaos. Find the flaw. Then hit <strong>“Fix it”</strong> to see what a little consideration can do. No real purchases, no collected data, no inescapable popups. Just educationally questionable fun.</p><span class="about-signoff">CURATED WITH LOVE. AND SOME CONCERN. ↗</span></div></section>`;
  document.title = "Really Bad Design Museum — Good taste. Bad examples.";
  main.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    main.querySelectorAll("[data-filter]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    document.querySelector("#exhibit-grid").innerHTML = exhibits.filter(e => activeFilter === "All exhibits" || e.category === activeFilter).map(card).join("");
  }));
  if (anchor) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView());
}

function renderExhibit(id, focus = false) {
  const exhibit = exhibits.find(item => item.id === id);
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
  const modeNote = mode === "fixed"
    ? "SENSIBLE MODE — a little consideration goes a long way."
    : mode === "worse"
      ? `HARD MODE — the exhibit has stopped playing fair.<strong class="worse-added"><span>EXPECT TROUBLE</span>${exhibit.worseChange}</strong>`
      : "ORIGINAL DISASTER — interact below. You can escape at any time.";
  main.innerHTML = `<section class="exhibit-page section-wrap">
    <a class="escape" href="/#collection">← Escape exhibit</a>
    <div class="exhibit-heading"><div><div class="eyebrow">EXHIBIT ${exhibit.number} / ${exhibit.category.toUpperCase()}</div><h1>${exhibit.name}</h1><p>${exhibit.tagline}</p></div><span class="specimen-label">PLEASE TOUCH<br>THE ARTWORK. ↙</span></div>
    <div class="exhibit-toolbar"><div class="mode-controls game-difficulty" role="group" aria-label="Exhibit difficulty"><span class="difficulty-label">CHOOSE YOUR DIFFICULTY</span><button data-mode="bad" aria-pressed="${mode === "bad"}">Easy</button><button data-mode="worse" aria-pressed="${mode === "worse"}">Hard ↗</button><button data-mode="fixed" aria-pressed="${mode === "fixed"}">Fix it ✓</button></div><div class="toolbar-actions"><button class="reset-button">↻ Reset</button><a class="toolbar-exit" href="/#collection" aria-label="Escape exhibit">Exit ↗</a></div></div>
    <p class="mode-note" role="status">${modeNote}</p>
    <div class="difficulty-progress" id="difficulty-progress" hidden><div class="difficulty-transition-content"><span class="difficulty-transition-title" aria-hidden="true">EASY CLEARED.</span><p role="status"></p><div class="difficulty-countdown" aria-hidden="true"></div><div class="difficulty-transition-actions"><button type="button" class="plain-button" data-difficulty-action="stay">Stay here</button><button type="button" class="plain-button" data-difficulty-action="advance">That was too easy, bring it on ↗</button></div></div></div>
    <div class="exhibit-stage ${id}-stage ${mode}" id="stage"></div>
    <aside class="curator-note"><span class="note-icon" aria-hidden="true">↳</span><div><div class="eyebrow">${mode === "fixed" ? "AFTER THE INTERVENTION" : "THE CURATOR'S NOTE"}</div><h2>${mode === "fixed" ? "That was almost too easy." : "The curators have questions."}</h2><p>${mode === "fixed" ? exhibit.fix : exhibit.lesson}</p></div></aside>
    <div class="exhibit-bottom"><a href="/#collection">← All exhibits</a><a href="/exhibit/${exhibits[(exhibits.indexOf(exhibit) + 1) % exhibits.length].id}">Next questionable idea →</a></div>
  </section>`;
  main.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => {
    cleanup();
    mode = button.dataset.mode;
    renderExhibit(id);
    main.querySelector(`[data-mode="${mode}"]`).focus();
  }));
  main.querySelector(".reset-button").addEventListener("click", () => {
    cleanup();
    mode = "bad";
    renderExhibit(id);
    main.querySelector(".reset-button").focus();
  });
  renderStage(id);
  setupDifficultyProgression(id);
  if (focus) main.focus({ preventScroll: true });
}

function setupDifficultyProgression(id) {
  const stage = main.querySelector("#stage");
  const notice = main.querySelector("#difficulty-progress");
  const initialMode = mode;
  const stageCleanup = cleanup;
  let completed = false;
  let disposed = false;
  let advanceTimer = null;
  let countdownTimer = null;
  let previousFocus = null;
  const startHardMode = () => {
    if (disposed) return;
    cleanup();
    mode = "worse";
    renderExhibit(id);
    main.querySelector(".mode-note").prepend("Hard mode started. Easy was the warm-up. ");
    main.querySelector("[data-mode='worse']").focus({ preventScroll: true });
  };
  const complete = () => {
    if (disposed || completed || initialMode !== "bad") return;
    completed = true;
    previousFocus = document.activeElement;
    notice.hidden = false;
    notice.querySelector("p").textContent = "Easy mode cleared! Hard mode starts in 3 seconds.";
    const deadline = Date.now() + 3000;
    countdownTimer = setInterval(() => {
      const seconds = Math.max(1, Math.ceil((deadline - Date.now()) / 1000));
      notice.querySelector("p").textContent = `Easy mode cleared! Hard mode starts in ${seconds} second${seconds === 1 ? "" : "s"}.`;
    }, 1000);
    queueMicrotask(() => {
      if (!disposed && !notice.hidden) notice.querySelector("[data-difficulty-action='stay']").focus({ preventScroll: true });
    });
    advanceTimer = setTimeout(startHardMode, 3000);
  };
  stage.addEventListener("exhibit-complete", complete);
  notice.querySelector("[data-difficulty-action='stay']").addEventListener("click", () => {
    clearTimeout(advanceTimer);
    clearInterval(countdownTimer);
    notice.hidden = true;
    main.querySelector(".mode-note").prepend("Staying in easy mode. Hard mode is ready whenever you are. ");
    const focusTarget = previousFocus?.isConnected && !previousFocus.matches(":disabled") ? previousFocus : main;
    focusTarget.focus({ preventScroll: true });
  });
  notice.querySelector("[data-difficulty-action='advance']").addEventListener("click", startHardMode);
  cleanup = () => {
    disposed = true;
    clearTimeout(advanceTimer);
    clearInterval(countdownTimer);
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
