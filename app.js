const exhibitCatalog = [
  { id: "runaway", name: "The Runaway Button", category: "Interaction", number: "01", color: "lilac", tagline: "A call to action. A refusal to cooperate.", description: "Finally, a button with a healthy fear of commitment.", lesson: "The button has considered your request and chosen flight. It is currently exploring opportunities near the opposite edge of the box.", fix: "After extensive negotiations, the button has agreed to remain in one place." },
  { id: "corporate", name: "The Corporate Fog Machine", category: "Copywriting", number: "02", color: "blue", tagline: "Onboarding without the onboarded part.", description: "Every completed step unlocks more mandatory steps.", lesson: "Each completed step creates exciting opportunities for additional steps. Progress is strongest when nobody can quite locate it.", fix: "The product now says what it is and asks one question. Several committees are resting." },
  { id: "dropdown", name: "The Character Bureaucracy", category: "Forms", number: "03", color: "pink", tagline: "Every letter needs a permit.", description: "Tune a precision dial. File the paperwork. Earn one character.", lesson: "One letter is a serious administrative event. Please allow three to five stamps for processing.", fix: "The paperwork was archived. A text box is now handling the letters." },
  { id: "word-editor", name: "The Dropdown Word Processor", category: "Forms", number: "04", color: "orange", tagline: "A whole document. One dropdown per character.", description: "Write, edit, and regret every letter you select from a menu.", lesson: "Typing was alarmingly efficient, so every character now gets its own tiny meeting. Minutes will be distributed one letter at a time.", fix: "The keyboard has been reinstated and is eager to put this behind it." },
  { id: "recipe", name: "The Recipe Odyssey", category: "Content", number: "05", color: "green", tagline: "Two ingredients. Six compulsory quizzes.", description: "Prove you read the memoir before you're allowed to make toast.", lesson: "Toast should never be attempted without a full understanding of the author's childhood summers. The bread can wait.", fix: "The ingredients have been moved above the memoir. Breakfast may now proceed." },
  { id: "retro", name: "The Retro Personal Homepage", category: "Nostalgia", number: "06", color: "yellow", tagline: "The guestbook requires a typing license.", description: "A backwards keyboard and a very suspicious cat CAPTCHA.", lesson: "The early web had room for stars, counters, guestbooks, and at least one unexplained planet. It also had opinions about your vowels.", fix: "The personality survived. The guestbook has stopped fighting visitors." },
  ...additionalExhibits,
];

const exhibitOrder = [
  "cat-captcha",
  "runaway",
  "password-gym",
  "correcting-search",
  "notification-swatter",
  "tetris-volume",
  "phone",
  "terms-game",
  "fonts",
  "unix-birthday",
  "seismic-editor",
  "volume-seesaw",
  "dropdown",
  "wind-volume",
  "checkbox-ecosystem",
  "password-crane",
  "physics-cart",
  "email-auction",
  "elevator-date",
  "expanding-form",
  "shrinking-unsubscribe",
  "word-editor",
  "cookies",
  "address-jigsaw",
  "retro",
  "ai-store",
  "mystery-menu",
  "alphabet",
  "horizontal",
  "cancel",
  "recipe",
  "corporate",
  "loading",
  "volume",
  "calendar",
];
const worseChanges = {
  "cat-captcha": "Six cheeses, two-step cat sprints every eighth turn, and a rejected first exit: pay a seventh cheese at the top left, then reach the relocated top-right hole. Cheese pickups distract the cat for one turn.",
  "tetris-volume": "More than doubles the falling speed.",
  "seismic-editor": "Builds structural stress twice as fast and shakes the editor harder.",
  "checkbox-ecosystem": "Drains health faster and creates a checked offspring box after every third feeding.",
  "password-crane": "Grabs the next ASCII character instead of the selected one on every third attempt.",
  "physics-cart": "Steepens the hill and adds a speed bump.",
  "volume-seesaw": "Adds negative-weight balloons and rolls a weight to the opposite tray after every third addition.",
  "wind-volume": "Strengthens the gusts and can turn the slider upside down.",
  "notification-swatter": "Spawns alerts faster and creates another alert whenever you miss.",
  "email-auction": "Raises reserve prices, adds two rival bids to every lot, and gives @ a third rival.",
  "elevator-date": "Skips three floors per departure unless you request a stop.",
  "expanding-form": "Makes every gap grow faster, triples the distance caps, and folds longer answers.",
  "correcting-search": "Requires five rejected corrections instead of three, plus an explanation for every rejection.",
  "shrinking-unsubscribe": "Starts shrinking sooner, shrinks to a smaller minimum, relocates earlier, runs the touch shrink timer almost twice as fast, and squirms out of clean taps more stubbornly.",
  phone: "Rerolls and unlocks the digit immediately to the left after each roll.",
  "password-gym": "Expands to 32 rules and ends with a rule that contradicts the earlier requirements.",
  "word-editor": "Reshuffles every character menu after each edit.",
  cookies: "Flips three switches per click and reverses what their labels mean.",
  "address-jigsaw": "Adds four decoy pieces and reshuffles the unused tray after every edit.",
  runaway: "Detects an approaching pointer, shrinks the real button, leaves clickable decoys, relocates faster on touch, and raises the typical catch from 8 direct hits to 20 (18–24 total).",
  dropdown: "Requires five approval stamps, changes frequency offsets, destroys incorrect permits, and makes Undo remove two characters.",
  "terms-game": "Doubles the agreement to 160 clauses, asks 12 questions, and hides clause references unless you spend one of five hints. Wrong answers restart the exam without refunding hints.",
  retro: "Replaces vowels, rearranges CAPTCHA tiles after every selection, and requires two rounds.",
  "ai-store": "Requires three product-calibration rounds.",
  fonts: "Styles every character separately instead of every word.",
  "mystery-menu": "Reshuffles which destination each mystery icon opens after every click.",
  "unix-birthday": "Removes the slider and midnight helper, leaving one raw millisecond timestamp field.",
  alphabet: "Also reshuffles the alphabet whenever you commit a slider adjustment.",
  horizontal: "Reverses the arrow buttons and the direction of vertical mouse-wheel scrolling.",
  cancel: "Adds two checkpoints, shuffles the buttons, and sends you back to the start after a wrong answer.",
  recipe: "Resets all reading progress after a wrong answer or an attempt to skip.",
  corporate: "Adds a required authorization checkbox and creates three new steps after each answer instead of two.",
  loading: "Interrupts the fake loading process for three mandatory approvals.",
  volume: "Changes the controls to +17 and -11, then lowers the value every two seconds.",
  calendar: "Makes Forward alternate between jumping seven days ahead and moving six days back.",
};
const exhibitsById = new Map(exhibitCatalog.map(exhibit => [exhibit.id, exhibit]));
const exhibits = exhibitOrder.map((id, index) => {
  const exhibit = exhibitsById.get(id);
  if (!exhibit) throw new Error(`Unknown exhibit in collection order: ${id}`);
  return { ...exhibit, number: String(index + 1).padStart(2, "0") };
});
if (exhibits.length !== exhibitCatalog.length || new Set(exhibitOrder).size !== exhibitCatalog.length || exhibitsById.size !== exhibitCatalog.length) {
  throw new Error("The collection order must include every exhibit exactly once.");
}
if (Object.keys(worseChanges).length !== exhibitCatalog.length || exhibitOrder.some(id => !worseChanges[id])) {
  throw new Error("Every exhibit needs a Worse-mode change summary.");
}

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
  const previews = {
    runaway: `<div class="preview-runaway"><span class="pointer p1">↖</span><span class="little-label">come back here.</span><span class="fake-button">Click me <span>↗</span></span><span class="pointer p2">↖</span><span class="dotted-path"></span></div>`,
    corporate: `<div class="preview-corporate"><span class="tiny-logo">◈ SYNERGIA</span><strong>Tomorrow.<br>But more.</strong><span class="tiny-copy">Empowering the next next.</span><span class="orb"></span><span class="tiny-cta">Unlock potential ↗</span></div>`,
    dropdown: `<div class="preview-dropdown"><span class="form-label">Apply for one letter.</span><div class="preview-dial">H <small>2496 Hz</small><div>━━━━●━━━━</div></div><span class="permit-stamp">APPROVAL PENDING</span><span class="dropdown-note">now file the paperwork.</span></div>`,
    "word-editor": `<div class="preview-word-editor"><span>UNTITLED DOCUMENT</span><div class="preview-word-toolbar">File &nbsp; Edit &nbsp; Suffer</div><strong><span>H ⌄</span><span>e ⌄</span><span>l ⌄</span><span>l ⌄</span><span>o ⌄</span></strong><div class="fake-lines"></div><small>5 letters. 5 dropdowns.</small></div>`,
    recipe: `<div class="preview-recipe"><span class="recipe-blog">a pinch of patience</span><strong>It all began<br>with my grandmother...</strong><div class="fake-lines"></div><div class="fake-lines short"></div><span class="recipe-distance">↓ Recipe: 6 quizzes away</span></div>`,
    retro: `<div class="preview-retro"><span class="retro-stars">✦ &nbsp; ☆ &nbsp; ✧ &nbsp; ☆ &nbsp; ✦</span><strong>WELCOME TO<br>MY HOMEPAGE!</strong><span class="retro-globe">◎</span><span class="construction">🚧 UNDER CONSTRUCTION 🚧</span><span class="visitor">YOU ARE VISITOR 000042</span></div>`,
  };
  return previews[id] || additionalPreview(id);
}

function card(exhibit) {
  return `<a class="exhibit-card" href="/exhibit/${exhibit.id}">
    <div class="card-art ${exhibit.color}" aria-hidden="true"><span class="exhibit-number">EXHIBIT ${exhibit.number}</span>${preview(exhibit.id)}<span class="card-enter">↗</span></div>
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
      ? `EXTRA TERRIBLE — we regret to inform you that this was approved.<strong class="worse-added"><span>ADDED IN WORSE MODE</span>${worseChanges[id]}</strong>`
      : "ORIGINAL DISASTER — interact below. You can escape at any time.";
  main.innerHTML = `<section class="exhibit-page section-wrap">
    <a class="escape" href="/#collection">← Escape exhibit</a>
    <div class="exhibit-heading"><div><div class="eyebrow">EXHIBIT ${exhibit.number} / ${exhibit.category.toUpperCase()}</div><h1>${exhibit.name}</h1><p>${exhibit.tagline}</p></div><span class="specimen-label">PLEASE TOUCH<br>THE ARTWORK. ↙</span></div>
    <div class="exhibit-toolbar"><div class="mode-controls game-difficulty" role="group" aria-label="Exhibit difficulty"><span class="difficulty-label">CHOOSE YOUR DIFFICULTY</span><button data-mode="bad" aria-pressed="${mode === "bad"}">Easy</button><button data-mode="worse" aria-pressed="${mode === "worse"}">Hard ↗</button><button data-mode="fixed" aria-pressed="${mode === "fixed"}">Fix it ✓</button></div><div class="toolbar-actions"><button class="reset-button">↻ Reset</button><a class="toolbar-exit" href="/#collection" aria-label="Escape exhibit">Exit ↗</a></div></div>
    <p class="mode-note" role="status">${modeNote}</p>
    <div class="difficulty-progress" id="difficulty-progress" hidden><div class="difficulty-transition-content"><span class="difficulty-transition-title" aria-hidden="true">EASY CLEARED.</span><p role="status"></p><div class="difficulty-countdown" aria-hidden="true"></div><button type="button" class="plain-button">Stay here</button></div></div>
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
      if (!disposed && !notice.hidden) notice.querySelector("button").focus({ preventScroll: true });
    });
    advanceTimer = setTimeout(() => {
      if (disposed) return;
      cleanup();
      mode = "worse";
      renderExhibit(id);
      main.querySelector(".mode-note").prepend("Hard mode started. Easy was the warm-up. ");
      main.querySelector("[data-mode='worse']").focus({ preventScroll: true });
    }, 3000);
  };
  stage.addEventListener("exhibit-complete", complete);
  notice.querySelector("button").addEventListener("click", () => {
    clearTimeout(advanceTimer);
    clearInterval(countdownTimer);
    notice.hidden = true;
    main.querySelector(".mode-note").prepend("Staying in easy mode. Hard mode is ready whenever you are. ");
    const focusTarget = previousFocus?.isConnected && !previousFocus.matches(":disabled") ? previousFocus : main;
    focusTarget.focus({ preventScroll: true });
  });
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
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const status = `<div class="demo-status" role="status" id="demo-status"></div>`;
  const say = text => { document.querySelector("#demo-status").textContent = text; };
  if (id === "runaway") {
    stage.innerHTML = `<div class="demo-centered"><span class="demo-kicker">COMMITMENT ISSUES, AS A SERVICE</span><h2>${fixed ? "Your button is ready." : "One click. How hard can it be?"}</h2><p>${fixed ? "No chase. No tricks. Just a button." : worse ? "It detects your approach, shrinks, and leaves decoys. On touch it moves faster and denies considerably more direct hits. Apparently catching it requires persistence and a paper trail." : "Chase it across the arena. On touch it moves on a timer and denies your first several direct hits. Keep tapping. Eventually it runs out of excuses."}</p><div class="chase-arena"><button class="demo-button runaway-button">Claim your prize →</button></div>${status}<small>Keyboard users: tab to the real button and press Enter. It never runs from the keyboard, and decoys never receive focus.<br>Reduced-motion preferences disable every kind of evasion, and Fix it removes the chase entirely.</small></div>`;
    const button = stage.querySelector(".runaway-button");
    const arena = stage.querySelector(".chase-arena");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = matchMedia("(hover: none), (pointer: coarse)");
    if (!fixed) stage.querySelector(".demo-kicker").textContent = worse
      ? "HARD MODE — NOW IT'S PERSONAL"
      : "EASY MODE — CONSIDER THIS A WARM-UP";
    let attempts = 0;
    let lastMove = -Infinity;
    let dodgedAt = -Infinity;
    let rejectedTouch = false;
    let directHits = 0;
    // Weighted offsets keep the median at zero despite the longer positive tail.
    const hitOffsets = [-2, -2, -1, -1, 0, 0, 0, 0, 1, 1, 2, 2, 3, 4];
    const requiredHits = (worse ? 20 : 8) + hitOffsets[Math.floor(Math.random() * hitOffsets.length)];
    const flinches = [
      "You had it. It panicked.",
      "That was a clean hit. It left anyway.",
      "You definitely touched it. It disagrees.",
      "Contact confirmed. Commitment declined.",
      "It felt you coming and lost its nerve.",
      "Caught, briefly, in the technical sense.",
      "It was yours for roughly one frame.",
      "That one nearly stuck. Nearly.",
    ];
    // The chase should not run its course before you have even scrolled to the arena.
    let onscreen = false;
    const watcher = new IntersectionObserver(([entry]) => { onscreen = entry.isIntersecting; }, { threshold: 0.4 });
    let drift = null;
    let caught = false;
    const history = [];
    function escape(pointer, note) {
      if (fixed || caught || motion.matches) return;
      lastMove = performance.now();
      attempts++;
      if (worse) button.style.width = `${Math.max(100, 190 - attempts * 9)}px`;
      const maxX = Math.max(0, arena.clientWidth - button.offsetWidth);
      const maxY = Math.max(0, arena.clientHeight - button.offsetHeight);
      const old = { x: button.offsetLeft, y: button.offsetTop };
      // Without a pointer to flee from, it simply flees from wherever it is standing.
      const from = pointer || { x: old.x + button.offsetWidth / 2, y: old.y + button.offsetHeight / 2 };
      // Favor distant, unvisited destinations instead of bouncing between corners.
      const candidates = Array.from({ length: 60 }, () => {
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        const pointerDistance = Math.hypot(
          Math.max(x - from.x, 0, from.x - x - button.offsetWidth),
          Math.max(y - from.y, 0, from.y - y - button.offsetHeight),
        );
        const novelty = Math.min(...[...history, old].map(point => Math.hypot(x - point.x, y - point.y)));
        return { x, y, pointerDistance, score: pointerDistance + novelty * 2 };
      });
      // Landing back under the finger would hand out a free win, because the browser sends the
      // click to whatever sits under the pointer when it lifts. Stay well clear of it.
      const pick = candidates.filter(candidate => candidate.pointerDistance > 140);
      const destination = (pick.length ? pick : candidates).reduce((best, candidate) => candidate.score > best.score ? candidate : best);
      history.push(destination);
      if (history.length > 8) history.shift();
      if (worse) {
        const decoy = document.createElement("span");
        decoy.className = "runaway-decoy";
        decoy.textContent = "Claim your prize →";
        decoy.setAttribute("aria-hidden", "true");
        decoy.style.left = `${old.x}px`;
        decoy.style.top = `${old.y}px`;
        decoy.addEventListener("click", () => { if (!caught) say("That was a decoy. The real button has already left."); });
        arena.append(decoy);
        if (arena.querySelectorAll(".runaway-decoy").length > 5) arena.querySelector(".runaway-decoy").remove();
      }
      button.style.left = `${destination.x}px`;
      button.style.top = `${destination.y}px`;
      say(note || `Escape ${attempts}. ${worse ? "Smaller target. More impostors. Same absolutely nothing." : "A new destination. Another missed opportunity."}`);
    }
    function flee(event, note) {
      if (performance.now() - lastMove < 100) return;
      escape(local(event), note);
    }
    function local(event) {
      const bounds = arena.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    }
    function gap(event) {
      const rect = button.getBoundingClientRect();
      return Math.hypot(Math.max(rect.left - event.clientX, 0, event.clientX - rect.right), Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom));
    }
    // A finger cannot hover, so on touch the button stops waiting to be approached and simply
    // keeps moving. Keyboard focus pauses it so the accessible path still works.
    function startDrift() {
      if (drift || fixed || caught || motion.matches) return;
      drift = setInterval(() => {
        if (document.hidden || !onscreen || button.matches(":focus-visible")) return;
        escape(null, `It moved on its own. Escape ${attempts + 1}. ${worse ? "It will not wait for you." : "Tap it before it goes again."}`);
      }, worse ? 900 : 1400);
    }
    if (coarse.matches) startDrift();
    button.addEventListener("pointerenter", event => { if (event.pointerType === "mouse") flee(event); });
    arena.addEventListener("pointerdown", event => {
      rejectedTouch = false;
      if (fixed || caught || event.pointerType === "mouse" || motion.matches) return;
      startDrift();
      // The guard only ever applies to the tap that caused a dodge, so rapid tapping still wins.
      dodgedAt = -Infinity;
      if (!event.target.closest(".runaway-button")) {
        rejectedTouch = true;
        // Near misses scare it off, so a touch has to be accurate and not merely present.
        if (gap(event) >= (worse ? 130 : 90)) return;
        flee(event);
        dodgedAt = performance.now();
        return;
      }
      directHits++;
      if (directHits >= requiredHits) {
        win("direct hit");
        return;
      }
      rejectedTouch = true;
      escape(local(event), `${flinches[(directHits - 1) % flinches.length]} Direct hits: ${directHits}.`);
      dodgedAt = performance.now();
    });
    arena.addEventListener("pointermove", event => {
      if (fixed || caught || motion.matches) return;
      const touch = event.pointerType !== "mouse";
      // Dragging a finger toward it is not a shortcut either.
      if (touch ? !(event.buttons || event.pressure > 0) : !worse) return;
      if (gap(event) < (touch ? 90 : 65)) flee(event);
      else return;
      if (touch) {
        rejectedTouch = true;
        dodgedAt = performance.now();
      }
    });
    const resize = new ResizeObserver(() => {
      if (fixed || !attempts) return;
      button.style.left = `${Math.min(button.offsetLeft, Math.max(0, arena.clientWidth - button.offsetWidth))}px`;
      button.style.top = `${Math.min(button.offsetTop, Math.max(0, arena.clientHeight - button.offsetHeight))}px`;
    });
    resize.observe(arena);
    watcher.observe(arena);
    cleanup = () => {
      resize.disconnect();
      watcher.disconnect();
      clearInterval(drift);
      document.body.classList.remove("runaway-won");
    };
    function win(method = "pointer") {
      if (caught) return;
      caught = true;
      clearInterval(drift);
      drift = null;
      watcher.disconnect();
      arena.querySelectorAll(".runaway-decoy").forEach(decoy => decoy.remove());
      document.body.classList.add("runaway-won");
      button.textContent = "Caught! ✓";
      button.disabled = true;
      stage.querySelector("h2").textContent = "You caught it!";
      stage.querySelector(".demo-centered > p").textContent = "The chase is over. It has officially run out of excuses.";
      const difficulty = worse ? "Hard" : fixed ? "Fix it" : "Easy";
      const stats = method === "direct hit"
        ? `${difficulty} mode · ${directHits} direct hits · ${attempts} escapes`
        : `${difficulty} mode · ${method === "keyboard" ? "keyboard catch" : method === "reduced motion" ? "reduced-motion catch" : fixed ? "stable-button catch" : "pointer catch"} · ${attempts} escapes`;
      say(`You win! ${stats}. Game stopped. Reset to chase it again.`);
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    }
    button.addEventListener("click", event => {
      // Safari snaps a near miss onto the closest button, which would turn a dodge into a win.
      if (!fixed && !motion.matches && event.detail !== 0 && (rejectedTouch || performance.now() - dodgedAt < 350)) { event.preventDefault(); return; }
      win(fixed ? "fixed" : motion.matches ? "reduced motion" : event.detail === 0 ? "keyboard" : "pointer");
    });
  } else if (id === "corporate") {
    stage.innerHTML = `<div class="corporate-demo"><div class="corporate-nav"><strong>◈ ${fixed ? "Clearboard" : "SYNERGIA"}</strong><span>${fixed ? "Project planning for small teams" : "VISION. VELOCITY. VAGUENESS."}</span></div><div class="corporate-content"><span class="demo-kicker">${fixed ? "LESS ADMIN. MORE MAKING." : "THE FUTURE IS AN ABSTRACT NOUN."}</span><h2>${fixed ? "Plan your team's work.<br>In one shared place." : worse ? "Hyper-synergize your<br>meta-potentiality." : "Tomorrow.<br>But more."}</h2><p>${fixed ? "Clearboard is a shared task board for small teams. Assign tasks, set due dates, and see what's ready to ship. $8 per person, per month." : worse ? "An AI-native, paradigm-agnostic ecosystem empowering the operationalization of your organization's next-generation potentiality at unprecedented scale." : "We empower forward-thinking innovators to unlock transformative possibilities through a next-generation ecosystem of purposeful synergy."}</p><button class="demo-button">${fixed ? "Try the sample task board →" : "Unlock your potential ↗"}</button>${status}</div><div class="corporate-orb" aria-hidden="true"></div></div>`;
    let onboardingStep = 1;
    let totalSteps = 4;
    const onboarding = document.createElement("div");
    onboarding.className = "obstacle-panel";
    const renderOnboarding = () => {
      const questions = [
        "Choose your preferred paradigm.",
        "How aligned is your alignment?",
        "Select a synergy deployment philosophy.",
        "Who authorized your authorization?",
      ];
      onboarding.innerHTML = `<span class="demo-kicker">MANDATORY PRE-ONBOARDING</span><h3>Step ${onboardingStep} of ${totalSteps}</h3><progress value="${onboardingStep}" max="${totalSteps}" aria-label="Onboarding progress"></progress><form><label for="paradigm">${questions[(onboardingStep - 1) % questions.length]}</label><select id="paradigm" required><option value="">Please operationalize a choice</option>${shuffled(["Synergistically adjacent", "Post-disruptive", "Horizontally vertical"]).map(choice => `<option>${choice}</option>`).join("")}</select>${worse ? `<label class="obstacle-check"><input type="checkbox" required> I authorize a meeting to authorize the next meeting.</label>` : ""}<button class="demo-button">Continue to almost finished →</button><button type="button" class="plain-button" id="onboarding-back">Go back</button></form><small>Every completed step adds ${worse ? "three more" : "two more"}. There is no product at the end. “Fix it” ends the nonsense.</small>`;
      onboarding.querySelector("form").addEventListener("submit", event => {
        event.preventDefault();
        onboardingStep++;
        totalSteps += worse ? 3 : 2;
        renderOnboarding();
        say(`Progress successfully made less complete. ${totalSteps - onboardingStep} steps now remain.`);
        onboarding.querySelector("select").focus();
        if (onboardingStep === 5) {
          say("You finished the original four steps. Management has rewarded you with more onboarding.");
          stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
        }
      });
      onboarding.querySelector("#onboarding-back").addEventListener("click", () => {
        onboardingStep = 1;
        renderOnboarding();
        say("Go back means all the way back. Previous answers have been respectfully discarded.");
        onboarding.querySelector("select").focus();
      });
    };
    stage.querySelector("button").addEventListener("click", () => {
      if (fixed) {
        document.querySelector("#demo-status").innerHTML = `Sample board <span class="sample-tasks"><span>To do: Draft homepage</span><span>In progress: Build navigation</span><span>Done: Choose readable fonts</span></span>`;
      } else {
        stage.querySelector(".corporate-content").append(onboarding);
        renderOnboarding();
        onboarding.querySelector("select").focus();
        say("First, a quick onboarding. You will never be more than almost finished.");
      }
    });
  } else if (id === "dropdown") {
    stage.innerHTML = `<div class="form-demo"><span class="demo-kicker">DEPARTMENT OF INDIVIDUAL CHARACTER APPROVAL</span><h2>${fixed ? "Tell us something." : "Apply for one letter."}</h2><p>${fixed ? "A message should take seconds, not geological eras." : `Find a character's frequency. Tune to the exact integer. Lock it. Obtain ${worse ? "five" : "three"} approvals in the specified order. Repeat for every letter, space, and punctuation mark.`}</p><form id="message-form">${fixed ? "" : `<div id="character-machine" class="character-machine"><span class="demo-kicker">01 / TUNE YOUR CHARACTER</span><details class="frequency-directory"><summary>Character frequency directory (not clickable, naturally)</summary><div id="frequency-directory"></div></details><label for="letter-dial">Character tuner: 0–9999 Hz</label><input id="letter-dial" type="range" min="0" max="9999" step="1" value="5000" aria-describedby="tuner-help"><div class="dial-readout"><strong id="tuned-letter">?</strong><output id="frequency-value" for="letter-dial">5000 Hz</output><span id="signal-quality"></span></div><p id="tuner-help">Drag to get close. Use arrow keys or the ±1 buttons for precision. Only the exact frequency is accepted.</p><div class="letter-controls"><button type="button" class="plain-button" id="dial-down" aria-label="Decrease frequency by one">−1 Hz</button><button type="button" class="plain-button" id="dial-up" aria-label="Increase frequency by one">+1 Hz</button><button type="button" class="demo-button" id="lock-letter">Lock character</button></div><div id="character-permit" hidden></div></div>`}<label for="message">${fixed ? "Your message" : "Your painstakingly assembled message"}</label><textarea id="message" maxlength="280" ${fixed ? "required" : "readonly"} placeholder="${fixed ? "Type something nice. Or constructive." : "The empty page awaits its first approved character."}"></textarea><div class="form-bottom"><span id="letter-count">0 / 280 characters</span>${!fixed ? `<button type="button" class="plain-button" id="undo-letter">${worse ? "Undo (deletes TWO)" : "Undo"}</button>` : ""}<button class="demo-button" type="submit">Send message →</button></div></form>${status}<small>${!fixed ? `The alphabet is reshuffled after every character.${worse ? " Frequencies change too. Incorrect paperwork destroys the permit." : ""}<br>` : ""}Demo only. Your message is never sent or saved.</small></div>`;
    const message = stage.querySelector("#message");
    const update = () => { stage.querySelector("#letter-count").textContent = `${message.value.length} / 280 characters`; };
    message.addEventListener("input", update);
    if (!fixed) {
      const dial = stage.querySelector("#letter-dial");
      const permit = stage.querySelector("#character-permit");
      const lock = stage.querySelector("#lock-letter");
      let frequencies = [];
      let selected = null;
      let locked = null;
      let approvals = [];
      let approved = 0;
      const label = letter => letter === " " ? "[space]" : letter;
      const tune = () => {
        const value = Number(dial.value);
        selected = frequencies.find(item => item.frequency === value) || null;
        const nearest = frequencies.reduce((best, item) => Math.abs(item.frequency - value) < Math.abs(best.frequency - value) ? item : best);
        stage.querySelector("#tuned-letter").textContent = selected ? label(selected.letter) : "≈ " + label(nearest.letter);
        stage.querySelector("#frequency-value").textContent = `${value} Hz`;
        stage.querySelector("#signal-quality").textContent = selected ? "SIGNAL LOCKED. Now request a permit." : `${Math.abs(nearest.frequency - value)} Hz away from ${label(nearest.letter)}. Not acceptable.`;
        dial.setAttribute("aria-valuetext", `${value} hertz. ${selected ? label(selected.letter) : "No exact character"}`);
        lock.disabled = !selected || locked !== null;
      };
      const scramble = () => {
        const offset = worse ? 20 + Math.floor(Math.random() * 280) : 137;
        frequencies = shuffled("ABCDEFGHIJKLMNOPQRSTUVWXYZ .!").map((letter, index) => ({ letter, frequency: offset + index * 337 }));
        stage.querySelector("#frequency-directory").textContent = frequencies.map(item => `${label(item.letter)} = ${item.frequency}`).join("   /   ");
        dial.value = "5000";
        locked = null;
        permit.hidden = true;
        dial.disabled = false;
        stage.querySelector("#dial-down").disabled = false;
        stage.querySelector("#dial-up").disabled = false;
        tune();
      };
      const renderPermit = () => {
        permit.hidden = false;
        permit.innerHTML = `<span class="demo-kicker">02 / CHARACTER PERMIT: ${label(locked)}</span><p>Obtain stamps in this order: <strong>${approvals.join(" → ")}</strong></p><p>${approved} / ${approvals.length} approvals. A wrong stamp ${worse ? "destroys this permit" : "resets all approvals"}.</p><div class="permit-stamps">${shuffled(approvals).map(stamp => `<button type="button" class="plain-button" data-stamp="${stamp}">${stamp}</button>`).join("")}</div><button type="button" class="demo-button" id="add-letter" ${approved < approvals.length ? "disabled" : ""}>03 / Append approved character</button>`;
        permit.querySelectorAll("[data-stamp]").forEach(button => button.addEventListener("click", () => {
          if (button.dataset.stamp !== approvals[approved]) {
            approved = 0;
            if (worse) {
              scramble();
              say("Incorrect stamp. Permit shredded. Frequencies reassigned. Start this character again.");
              dial.focus();
              return;
            }
            say("Wrong department. All approvals have been reset.");
          } else {
            approved++;
            say(`Stamp ${approved} of ${approvals.length} obtained.`);
          }
          renderPermit();
          if (approved === approvals.length) permit.querySelector("#add-letter").focus();
          else permit.querySelector("[data-stamp]").focus();
        }));
        if (approved === approvals.length) permit.querySelectorAll("[data-stamp]").forEach(button => { button.disabled = true; });
        permit.querySelector("#add-letter").addEventListener("click", () => {
          if (message.value.length >= 280) { say("The 280-character limit has been reached. Your approved text is preserved."); return; }
          message.value += locked;
          update();
          scramble();
          say("ONE character approved. All frequencies reassigned. Please apply again.");
          dial.focus();
        });
      };
      dial.addEventListener("input", tune);
      for (const [id, delta] of [["dial-down", -1], ["dial-up", 1]]) {
        stage.querySelector(`#${id}`).addEventListener("click", () => {
          dial.value = String(Math.max(0, Math.min(9999, Number(dial.value) + delta)));
          tune();
        });
      }
      lock.addEventListener("click", () => {
        locked = selected.letter;
        approved = 0;
        approvals = shuffled(worse ? ["Legal", "Finance", "Vowels", "Compliance", "Management"] : ["Legal", "Vowels", "Management"]);
        dial.disabled = true;
        stage.querySelector("#dial-down").disabled = true;
        stage.querySelector("#dial-up").disabled = true;
        lock.disabled = true;
        renderPermit();
        permit.querySelector("[data-stamp]").focus();
      });
      stage.querySelector("#undo-letter").addEventListener("click", () => {
        const count = worse ? 2 : 1;
        if (!message.value) { say("There is nothing to undo. The bureaucracy has already achieved that."); return; }
        message.value = message.value.slice(0, -count);
        update();
        say(`Removed up to ${count} character${count === 1 ? "" : "s"}. Their paperwork cannot be recovered.`);
      });
      scramble();
    }
    stage.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      say(message.value.trim() ? "Message admired! This is a demo, so nothing was sent." : "Add a message first. Even this form needs something to work with.");
      if (message.value.trim()) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    });
  } else if (id === "word-editor") {
    renderWordEditor(stage, mode);
  } else if (id === "recipe") {
    const recipe = `<section class="actual-recipe" id="actual-recipe" tabindex="-1"><span class="demo-kicker">YOU MADE IT. LET'S MAKE TOAST.</span><h3>Butter on toast</h3><div class="recipe-stats">2 ingredients <span>5 minutes</span> Serves 1</div><h4>Ingredients</h4><ul><li>1 slice of bread</li><li>1 teaspoon of butter</li></ul><h4>Method</h4><ol><li>Toast the bread until golden.</li><li>Spread the butter on it. Eat while warm.</li></ol></section>`;
    const chapters = [
      ["It all began with my grandmother.", "She was a remarkable woman. She owned a toaster. But before we get to that, you need to understand the village, the wind, and the particular shade of beige in her kitchen."],
      ["A brief history of the kitchen window.", "It faced east. Or perhaps west. We spent many summers debating this. The bread waited patiently, as bread is known to do. You're probably here for a recipe. We're getting there."],
      ["The summer we almost bought a spoon.", "Father said we already had a spoon. Mother said that wasn't the point. In many ways, that conversation shaped the person I am today. It did not, however, affect the toast."],
      ["What bread means to me.", "Some say bread is flour, water, and yeast. I say it's a journey. A journey that requires at least six paragraphs before mentioning that you should put it in a toaster."],
      ["A note on butter, and belonging.", "The butter was butter. But spiritually, it was so much more. It was a reminder that the simplest things in life can be made unnecessarily complicated by a food blog."],
      ["Before we begin, a few final thoughts.", "Thank you for being part of this community. Thank you for scrolling. Most of all, thank you for your commitment to finding a recipe that is, in fact, just butter on toast."],
    ];
    const story = chapters.map(([title, text], index) => `<section class="story-chapter"><span>CHAPTER ${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p>${worse ? `<div class="recipe-ad">ADVERTISEMENT<br><strong>This space could have been the recipe.</strong><p>Instead, here's a thoughtful pause for a product that doesn't exist.</p></div><p>${text}</p>` : ""}</section>`).join("");
    stage.innerHTML = `<div class="recipe-demo"><div class="blog-masthead">a pinch of patience<span>FOOD. FAMILY. EXCESSIVE CONTEXT.</span></div><div class="recipe-intro"><span class="demo-kicker">THE SIMPLE THINGS</span><h2>The perfect buttered toast.</h2><p>By Olivia · 5 minute recipe · ${fixed ? "No expedition required" : "Recipe locked behind 6 mandatory reading-comprehension quizzes"}</p>${fixed ? "" : `<button class="plain-button" id="jump-recipe">Jump to recipe ↓</button><small>The exhibit's skip button lies. The museum's “Fix it” and Exit controls don't.</small>`}</div>${fixed ? `${recipe}<details class="optional-story"><summary>The story behind the toast (optional)</summary>${story}</details>` : `<div id="story-gate"></div>${status}`}</div>`;
    if (!fixed) {
      const gate = stage.querySelector("#story-gate");
      const quizzes = [
        { question: "What appliance did grandmother own?", answer: "A toaster", options: ["A toaster", "A blender", "A particle accelerator"] },
        { question: "Which way did the kitchen window face?", answer: "Nobody could agree", options: ["Due north", "Nobody could agree", "Into the fridge"] },
        { question: "What did the family almost buy?", answer: "A spoon", options: ["A spoon", "A yacht", "More bread"] },
        { question: "What is bread, according to this blog?", answer: "A journey", options: ["A journey", "A spreadsheet", "A subscription"] },
        { question: "What was the butter?", answer: "Butter", options: ["Butter", "Margarine", "A metaphor with Wi-Fi"] },
        { question: "What are we making?", answer: "Butter on toast", options: ["Butter on toast", "A six-course dinner", "Progress, allegedly"] },
      ];
      let chapter = 0;
      let detours = 0;
      const renderChapter = () => {
        if (chapter === chapters.length) {
          gate.innerHTML = recipe;
          gate.querySelector("#actual-recipe").focus();
          say("Six quizzes later: put butter on toast. That was the entire recipe.");
          stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
          return;
        }
        const quiz = quizzes[chapter];
        gate.innerHTML = `<div class="reading-progress">RECIPE ACCESS: ${chapter} / 6 CHAPTERS APPROVED</div><section class="story-chapter"><span>MANDATORY CHAPTER ${chapter + 1}</span><h3>${chapters[chapter][0]}</h3><p>${chapters[chapter][1]}</p>${worse ? `<div class="recipe-ad">SPONSORED INTERRUPTION<strong>This could have been the recipe.</strong></div>` : ""}<form class="reading-quiz"><label for="reading-answer">${quiz.question}</label><select id="reading-answer" required><option value="">Prove you read it</option>${shuffled(quiz.options).map(option => `<option>${option}</option>`).join("")}</select>${worse ? `<label class="obstacle-check"><input type="checkbox" required> I certify that this paragraph changed my relationship with toast.</label>` : ""}<button class="demo-button">Unlock the next paragraph →</button><small>${worse ? "Wrong answer? Back to chapter one." : "The recipe is not accessible until every quiz is passed."}</small></form></section>`;
        gate.querySelector("form").addEventListener("submit", event => {
          event.preventDefault();
          if (gate.querySelector("select").value !== quiz.answer) {
            if (worse) {
              chapter = 0;
              renderChapter();
              gate.querySelector("select").focus();
            }
            say(worse ? "Incorrect. All reading progress reset. Grandmother would like another word." : "Incorrect. The irrelevant family history needs another read.");
            return;
          }
          chapter++;
          renderChapter();
          gate.querySelector("select")?.focus();
          if (chapter < chapters.length) say(`Chapter ${chapter} approved. More context is mandatory.`);
        });
      };
      renderChapter();
      stage.querySelector("#jump-recipe").addEventListener("click", () => {
        detours++;
        gate.innerHTML = `<div class="recipe-ad"><span>SPONSORED SHORTCUT ${detours}</span><h3>You jumped! To an advertisement.</h3><p>Skipping the story requires reading the story. Your toast remains unavailable.</p><button class="demo-button" id="return-story">Continue to the story you tried to skip</button></div>`;
        if (worse) chapter = 0;
        gate.querySelector("button").addEventListener("click", () => {
          renderChapter();
          (gate.querySelector("select") || gate.querySelector("#actual-recipe")).focus();
        });
        gate.querySelector("button").focus();
        say(worse ? "Shortcut activated. Reading progress has also been reset." : "The skip button has successfully skipped the useful part.");
      });
    }
  } else if (id === "retro") {
    stage.innerHTML = `<div class="retro-demo"><div class="retro-banner">${fixed ? "Alex's little corner of the internet" : "★ WELCOME TO ALEX'S HOMEPAGE!!! ★"}</div><p class="retro-subtitle">${fixed ? "Space enthusiast. Cat appreciator. Website owner since 1997." : "Best viewed with your eyes • 800 × 600 • Internet Explorer 4.0"}</p><div class="retro-layout"><aside class="retro-sidebar"><span>${fixed ? "Make yourself at home" : "COOL LINKS!!"}</span><a href="#retro-about">About me</a><a href="#retro-favorites">My favorite things</a><a href="#retro-guestbook">Sign my guestbook</a><div class="retro-planet" aria-hidden="true">🪐</div><span class="visitor-counter">VISITOR #000042</span></aside><div class="retro-content"><section id="retro-about"><h2>${fixed ? "Hi, I'm Alex." : "Hello, fellow net surfer!!!"}</h2><p>This is my little corner of cyberspace. I like space, cats, and making websites. This page has been almost finished for 29 years.</p></section><section id="retro-favorites"><h3>My favorite things</h3><p>✦ Saturn's rings &nbsp; ✦ My cat, Pixel &nbsp; ✦ The World Wide Web</p></section>${!fixed ? `<div class="construction-large">🚧 UNDER CONSTRUCTION 🚧</div>` : ""}${worse ? `<div class="retro-extra">AWARD-WINNING WEBSITE*<br><span>~*~ WEBMASTER'S CHOICE ~*~</span><small>*Awarded by the webmaster's cat.</small></div>` : ""}<form id="retro-guestbook"><label for="guest-name">Leave your mark in the guestbook</label><div class="guestbook-controls"><input id="guest-name" placeholder="Your nickname" required maxlength="40"><button class="demo-button">Sign guestbook</button></div><small>Just for fun. Entries disappear when you leave or reset.</small></form>${status}<div id="guest-entries"></div></div></div><div class="retro-bottom">${fixed ? "Made with enthusiasm. Updated when I remember." : "✉ Email the webmaster (telepathically) ✉ · © 1997 FOREVER"}</div></div>`;
    let navigationClicks = 0;
    stage.querySelectorAll(".retro-sidebar a").forEach(link => link.addEventListener("click", event => {
      event.preventDefault();
      const destinations = ["#retro-about", "#retro-favorites", "#retro-guestbook"];
      navigationClicks++;
      const href = link.getAttribute("href");
      const destination = fixed ? href : destinations[(destinations.indexOf(href) + navigationClicks % 3) % 3];
      const target = stage.querySelector(destination);
      target.setAttribute("tabindex", "-1");
      target.scrollIntoView({ block: "center" });
      target.focus({ preventScroll: true });
      if (!fixed) say(destination === href ? "Third time's the charm. The menu accidentally went to the right place." : "The menu labels are only suggestions. Try again. Every third click works.");
    }));
    const guestForm = stage.querySelector("form");
    const nickname = stage.querySelector("#guest-name");
    let captchaRound = 0;
    let captchaOpen = false;
    let tiles = [];
    const captcha = document.createElement("fieldset");
    captcha.className = "retro-captcha";
    captcha.hidden = true;
    if (!fixed) {
      nickname.setAttribute("aria-describedby", "backwards-warning");
      guestForm.insertAdjacentHTML("afterbegin", `<small id="backwards-warning">BACKWARDS-COMPATIBLE KEYBOARD: your entire nickname reverses after every edit.${worse ? " Also, vowels are replaced with numbers. The webmaster considers this an upgrade" : ""}</small>`);
      nickname.addEventListener("input", event => {
        if (event.isComposing) return;
        const reversed = [...nickname.value].reverse().join("");
        nickname.value = worse ? reversed.replace(/[aeiou]/gi, vowel => ({ a: "4", e: "3", i: "1", o: "0", u: "8" })[vowel.toLowerCase()]) : reversed;
        say("Your nickname was reversed for backwards compatibility. No, that is not how compatibility works.");
      });
      guestForm.append(captcha);
    }
    const renderCaptcha = () => {
      tiles = shuffled([
        { animal: "Cat", icon: "🐈" }, { animal: "Cat", icon: "🐱" }, { animal: "Dog", icon: "🐕" },
        { animal: "Cat", icon: "😺" }, { animal: "Fox", icon: "🦊" }, { animal: "Cat", icon: "😸" },
        { animal: "Dog", icon: "🐶" }, { animal: "Cat", icon: "😹" }, { animal: "Fox", icon: "🦊" },
      ]);
      captcha.hidden = false;
      captcha.innerHTML = `<legend>PROVE YOU ARE NOT A WEBMASTER</legend><p>Select every cat. Round ${captchaRound + 1} of ${worse ? "2" : "1"}.${worse ? " Tiles rearrange after EVERY selection." : ""}</p><div class="captcha-grid">${tiles.map((tile, index) => `<label class="captcha-tile"><input type="checkbox" value="${index}" aria-label="${tile.animal}, tile ${index + 1}"><span aria-hidden="true">${tile.icon}</span></label>`).join("")}</div><button class="demo-button" type="submit">Verify cats &amp; sign guestbook</button>`;
      if (worse) {
        captcha.querySelectorAll("input").forEach(input => input.addEventListener("change", () => {
          const grid = captcha.querySelector(".captcha-grid");
          shuffled([...grid.children]).forEach(tile => grid.append(tile));
          input.focus({ preventScroll: true });
        }));
      }
      captcha.querySelector("input").focus();
    };
    guestForm.addEventListener("submit", event => {
      event.preventDefault();
      const input = nickname;
      if (!input.value.trim()) { say("Please enter a nickname first."); return; }
      if (!fixed) {
        if (!captchaOpen) {
          captchaOpen = true;
          renderCaptcha();
          say("Not so fast. Your nickname needs a cat inspection.");
          return;
        }
        const correct = [...captcha.querySelectorAll("input")].every(box => box.checked === (tiles[Number(box.value)].animal === "Cat"));
        if (!correct) {
          captchaRound = 0;
          renderCaptcha();
          say("Cat inspection failed. All selections and rounds reset.");
          return;
        }
        captchaRound++;
        if (worse && captchaRound < 2) {
          renderCaptcha();
          say("Correct! Unfortunately, we now require a second cat inspection.");
          return;
        }
      }
      const entry = document.createElement("p");
      entry.textContent = `${input.value.trim()} was here. Thanks for surfing by!`;
      stage.querySelector("#guest-entries").prepend(entry);
      say("Guestbook signed! Pixel the cat approves.");
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
      input.value = "";
      captcha.hidden = true;
      captchaOpen = false;
      captchaRound = 0;
      nickname.focus();
    });
  } else {
    cleanup = renderAdditionalExhibit({ id, stage, mode, shuffle: shuffled });
  }
}

function renderWordEditor(stage, mode) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const limit = 140;
  const characters = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,!?'-:;()\"\n"];
  let text = "";
  let selected = 0;
  const history = [];
  const future = [];
  stage.innerHTML = `<div class="word-editor-demo"><div class="word-editor-brand"><strong>Dropdown Office</strong><span>PRODUCTIVITY, MINUS THE PRODUCTIVITY.</span></div><div class="word-editor-intro"><span class="demo-kicker">UNTITLED DOCUMENT / EXHIBIT 04</span><h2>${fixed ? "The keyboard has been reinstated." : "Every letter is a menu."}</h2><p>${fixed ? "Type, paste, and edit your document normally." : `Choose a character from the empty dropdown to append it. Reopen any earlier dropdown to edit that character. Spaces, punctuation, and line breaks are menu items too.${worse ? " Every dropdown's options reshuffle after each edit. Muscle memory has been discontinued." : ""}`}</p></div><div class="word-editor-toolbar" role="group" aria-label="Document editing"><button type="button" class="plain-button" id="word-undo">↶ Undo</button><button type="button" class="plain-button" id="word-redo">↷ Redo</button>${fixed ? "" : `<button type="button" class="plain-button" id="word-delete">Delete selected letter</button>`}<span id="word-count"></span></div><div class="word-editor-page">${fixed ? `<label for="word-text">Your document</label><textarea id="word-text" maxlength="${limit}" placeholder="At last. A normal place to write."></textarea>` : `<div class="word-page-heading">COMPOSE YOUR DOCUMENT</div><div class="word-letters" id="word-letters" role="group" aria-label="One dropdown per character"></div><p class="word-editor-hint">Select an existing character before deleting it. With the empty dropdown selected, Delete removes the last character.</p>`}<div class="word-readable"><h3>Readable version</h3><p id="word-preview"></p></div></div><div class="word-editor-bottom"><button type="button" class="demo-button" id="word-finish">Finish demo document</button><small>Local and temporary. Your document is never sent or saved.</small></div><div class="demo-status" role="status" id="word-status"></div></div>`;
  const say = message => { stage.querySelector("#word-status").textContent = message; };
  const refresh = () => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    stage.querySelector("#word-count").textContent = `${text.length} / ${limit} characters · ${words} word${words === 1 ? "" : "s"}`;
    stage.querySelector("#word-preview").textContent = text || "Your unwritten masterpiece awaits.";
    stage.querySelector("#word-undo").disabled = history.length === 0;
    stage.querySelector("#word-redo").disabled = future.length === 0;
    if (!fixed) stage.querySelector("#word-delete").disabled = text.length === 0;
  };
  const commit = next => {
    if (next === text) return;
    history.push(text);
    if (history.length > 100) history.shift();
    future.length = 0;
    text = next;
    refresh();
  };
  const renderLetters = focusIndex => {
    const container = stage.querySelector("#word-letters");
    const fragment = document.createDocumentFragment();
    const count = Math.min(text.length + 1, limit);
    for (let index = 0; index < count; index++) {
      const entry = document.createElement("div");
      entry.className = "word-letter";
      const position = document.createElement("span");
      position.textContent = String(index + 1).padStart(2, "0");
      position.setAttribute("aria-hidden", "true");
      const menu = document.createElement("select");
      menu.dataset.character = String(index);
      menu.setAttribute("aria-label", index === text.length ? `Append character ${index + 1}` : `Edit character ${index + 1}`);
      if (index === text.length) {
        const placeholder = new Option("+", "");
        placeholder.disabled = true;
        menu.add(placeholder);
      }
      for (const character of worse ? shuffled(characters) : characters) {
        menu.add(new Option(character === " " ? "[space]" : character === "\n" ? "[enter]" : character, character));
      }
      menu.value = text[index] || "";
      menu.addEventListener("focus", () => { selected = index; });
      menu.addEventListener("change", () => {
        const replacement = menu.value;
        commit(text.slice(0, index) + replacement + text.slice(index + 1));
        const nextIndex = index === text.length - 1 ? Math.min(index + 1, count) : index;
        renderLetters(Math.min(nextIndex, limit - 1));
        say(worse ? "Character entered. Every menu has been reshuffled." : "Character entered. Another dropdown awaits.");
      });
      entry.append(position, menu);
      fragment.append(entry);
    }
    container.replaceChildren(fragment);
    if (focusIndex !== undefined) container.querySelector(`[data-character="${focusIndex}"]`)?.focus();
  };
  const syncEditor = () => {
    refresh();
    if (fixed) stage.querySelector("#word-text").value = text;
    else renderLetters(Math.min(selected, text.length, limit - 1));
  };
  if (fixed) {
    stage.querySelector("#word-text").addEventListener("input", event => commit(event.target.value));
  } else {
    stage.querySelector("#word-delete").addEventListener("click", () => {
      const index = Math.min(selected, text.length - 1);
      commit(text.slice(0, index) + text.slice(index + 1));
      selected = Math.min(index, text.length);
      syncEditor();
      say("Character deleted. Undo can bring it back.");
    });
    renderLetters();
  }
  stage.querySelector("#word-undo").addEventListener("click", () => {
    future.push(text);
    text = history.pop();
    syncEditor();
    say("Last text edit undone.");
  });
  stage.querySelector("#word-redo").addEventListener("click", () => {
    history.push(text);
    text = future.pop();
    syncEditor();
    say("Text edit restored.");
  });
  stage.querySelector("#word-finish").addEventListener("click", () => {
    say(text.trim() ? "Document complete. Nothing was sent or saved; admire your hard-earned words above." : "Write something first. Spaces alone do not make a masterpiece.");
    if (text.trim()) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  refresh();
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
