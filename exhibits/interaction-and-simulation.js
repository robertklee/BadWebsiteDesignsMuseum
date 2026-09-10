// Interaction & simulation: physical, timed, or game-like controls.
import { createStageShell, createDemoStatus } from "./shared.js";

export const exhibits = [
  { id: "unresponsive-buttons", name: "The Sometimes Button", category: "Interaction", color: "pink", tagline: "Nothing. Nothing. Eleven.", description: "Find the working part of a quantity button. Click impatiently and order far too much nothing.", lesson: "The button received several of your complaints and has processed them all as extra chairs. The working department has since moved to another part of the button.", fix: "The entire button now works, each click updates the quantity immediately, and five means five.", worseChange: "Smaller working areas and a longer silence before all your clicks arrive together.", preview: '<div class="thumb-scene thumb-sometimes"><span class="thumb-kicker">JUST FIVE CHAIRS. PLEASE.</span><div class="thumb-sometimes-counter"><span>−</span><strong>11<small>WANTED: 5</small></strong><span>+<i></i></span></div><small class="thumb-footer">Oh. Those clicks did go through.</small></div>', render: renderUnresponsiveButtons },
  { id: "runaway", name: "The Runaway Button", category: "Interaction", color: "lilac", tagline: "A call to action. A refusal to cooperate.", description: "Finally, a button with a healthy fear of commitment.", lesson: "The button has considered your request and chosen flight. It is currently exploring opportunities near the opposite edge of the box.", fix: "After extensive negotiations, the button has agreed to remain in one place.", worseChange: "The button brought decoys and a much stronger sense of self-preservation.", preview: `<div class="thumb-scene thumb-runaway"><span class="thumb-kicker">A CALL TO ACTION. A CHANGE OF PLANS.</span><div class="thumb-chase"><span class="thumb-button-shadow"></span><i class="thumb-chase-pointer" aria-hidden="true">↖</i><span class="thumb-chase-trail"></span><small>come back here.</small><span class="thumb-fleeing-button">Click me ↗</span></div></div>`, render: renderRunaway },
  { id: "loading", name: "The Loading Experience", category: "Interaction", color: "lilac", tagline: "Almost ready to start getting ready.", description: "An entire loading ceremony for one sentence. Please approve the wait.", lesson: "Nothing important is happening, but it is happening in ten impressive stages. Stage eleven is reflecting on the journey.", fix: "The sentence was ready the whole time. It has finally been allowed indoors.", worseChange: "The wait now requires your active participation.", preview: `<div class="thumb-scene thumb-loading"><span class="thumb-kicker">ALMOST THERE. PREVIOUSLY.</span><div class="thumb-progress-numbers"><s>99%</s><span>→</span><strong>12%</strong></div><div class="thumb-backward-bar"><i></i><b>←</b></div><span class="thumb-loading-status">Reconsidering the first 98%.</span><small class="thumb-footer">All this to load one sentence.</small></div>`, render: renderLoading },
  { id: "seismic-editor", name: "The Seismic Text Editor", category: "Interaction", color: "pink", tagline: "Every keystroke is a structural risk.", description: "Type carefully. The editor shakes, and your whole sentence might tumble.", lesson: "The sentence was built on ambitious foundations. Punctuation remains a known seismic risk, especially the excitable kind.", fix: "The editor passed inspection. Exclamation marks may now enter without a hard hat.", worseChange: "The editor is feeling every keystroke more intensely.", preview: `<div class="thumb-scene thumb-collapse"><span class="thumb-kicker">STRUCTURAL INTEGRITY: QUESTIONABLE</span><div class="thumb-collapse-page"><span>UNTITLED / UNSAVED / UNSTABLE</span><div class="thumb-broken-baseline"><i></i><b>!</b></div><div class="thumb-letter-rubble"><b>T</b><b>Y</b><b>P</b><b>E</b></div></div><small class="thumb-footer">One more letter. What could go wrong?</small></div>`, render: renderSeismicEditor },
  { id: "wind-volume", name: "The Windswept Volume Slider", category: "Interaction", color: "blue", tagline: "Forecast: scattered decibels.", description: "Drag a volume slider through a gale. Up is subject to weather.", lesson: "Today's forecast calls for shifting controls with a chance of accidental silence. Up may become down by evening.", fix: "The slider has been moved indoors, where the forecast is consistently 37 percent.", worseChange: "The forecast has worsened. The slider may lose its sense of up.", preview: `<div class="thumb-scene thumb-wind"><span class="thumb-kicker">FORECAST: SCATTERED DECIBELS</span><div class="thumb-weather"><div class="thumb-gusts" aria-hidden="true"><i></i><i></i><i></i></div><div class="thumb-wind-track"><b>+</b><i></i><b>−</b></div><div class="thumb-weather-reading"><span>WANTED</span><s>37%</s><strong>82%</strong><span>GUST HAPPENED.</span></div></div><small class="thumb-footer">Your volume is now weather-dependent.</small></div>`, render: renderWindVolume },
  { id: "tetris-volume", name: "The Tetris Volume Control", category: "Interaction", color: "blue", tagline: "Turn it up. Build it up.", description: "Stack blocks across a game board to adjust a completely silent volume slider.", lesson: "Sound levels are a construction project. Please occupy two-thirds of the site without accidentally finishing a row.", fix: "The building permit expired, leaving behind one ordinary volume slider.", worseChange: "Gravity has somewhere else to be.", preview: `<div class="thumb-scene thumb-tetris"><span class="thumb-kicker">JUST TURN IT UP A LITTLE</span><div class="thumb-tetris-console"><div class="thumb-block-board" aria-hidden="true"><i class="thumb-block-falling"></i><i class="thumb-block-left"></i><i class="thumb-block-right"></i><i class="thumb-block-row"></i></div><div class="thumb-volume-reading"><span>VOLUME</span><strong>40%</strong><span>ROW CLEARED</span><b>↓ 28%</b></div></div><small class="thumb-footer">Great move. Quieter now.</small></div>`, render: renderTetrisVolume },
  { id: "volume-seesaw", category: "Interaction", color: "blue", name: "The Volume Seesaw", tagline: "A delicate balance of unnecessary effort.", description: "Load weights onto a wobbling seesaw to set a silent volume slider.", lesson: "The ideal listening level is a delicate agreement between anvils and balloons. Pebbles are present in an advisory role.", fix: "The playground equipment was removed, revealing a slider underneath.", worseChange: "Balloons join the balance, and the weights may wander.", preview: '<div class="thumb-scene thumb-seesaw"><span class="thumb-kicker">VOLUME: SOME ASSEMBLY REQUIRED</span><div class="thumb-balance"><span class="thumb-balance-value">73<span>%</span></span><div class="thumb-beam"><i class="thumb-pebble"></i><i class="thumb-brick"></i><i class="thumb-brick thumb-brick-top"></i></div><div class="thumb-fulcrum"></div><span class="thumb-balance-minus">−</span><span class="thumb-balance-plus">+</span></div><small class="thumb-footer">Could you turn it down one brick?</small></div>', render: renderVolumeSeesaw },
  { id: "notification-swatter", category: "Interaction", color: "yellow", name: "The Notification Fly Swatter", tagline: "Please dismiss your way to productivity.", description: "Swat a swarm of fake alerts before they bury the form you are completing.", lesson: "Your focus is important to us, which is why twelve messages have arrived to discuss it. More may be scheduled.", fix: "The notifications have been shown the door. The form can finally hear itself think.", worseChange: "The swarm is faster, and missed clicks attract attention.", preview: '<div class="thumb-scene thumb-swatter"><span class="thumb-kicker">WE VALUE YOUR FOCUS</span><div class="thumb-alert-stack"><div class="thumb-form-under"><span>YOUR MESSAGE</span><b>Hello, I would like to</b><div class="fake-lines"></div></div><div class="thumb-alert thumb-alert-back"><b>A quick update</b><span>×</span><small>You have updates.</small></div><div class="thumb-alert thumb-alert-front"><b>One more thing</b><span>×</span><small>About that update.</small></div></div><small class="thumb-footer">There was a form here a moment ago.</small></div>', render: renderNotificationSwatter },
];

function renderUnresponsiveButtons({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  shell("SEATING ARRANGEMENTS, EVENTUALLY", "Reserve exactly five imaginary chairs.",
    fixed ? "The whole button works. One click, one chair, immediate feedback." : "Only a strip of each button works, and that strip moves after an update. Some clicks do nothing. Others arrive together after a suspicious silence. Clicking faster can overshoot five.",
    `<div class="sometimes-machine">
      <span class="demo-kicker">TARGET: 5 CHAIRS · NO REAL RESERVATION</span>
      <div class="sometimes-controls">
        <button type="button" class="sometimes-button" data-chair-step="-1" aria-label="Remove one chair"><span aria-hidden="true">−</span></button>
        <output class="sometimes-count" aria-label="Chair quantity" aria-live="polite">1</output>
        <button type="button" class="sometimes-button" data-chair-step="1" aria-label="Add one chair"><span aria-hidden="true">+</span></button>
      </div>
      <p class="sometimes-feedback">${fixed ? "Ready when you are." : "Did that click register? Give it a moment."}</p>
      ${fixed ? "" : '<button type="button" class="plain-button" id="sometimes-reveal" aria-pressed="false">Show working areas</button>'}
      <button type="button" class="demo-button" id="sometimes-confirm">Reserve five chairs →</button>
      <p class="sometimes-help">${fixed ? "No dead spots. No delayed pile-up." : "Try different parts, then wait for the quantity to settle. Use − to recover from an overshoot. Keyboard: Tab to a button and press Enter or Space; no aiming required."}</p>
    </div>`);
  const buttons = [...stage.querySelectorAll("[data-chair-step]")];
  const count = stage.querySelector(".sometimes-count");
  const feedback = stage.querySelector(".sometimes-feedback");
  const confirm = stage.querySelector("#sometimes-confirm");
  const listeners = new AbortController();
  const options = { signal: listeners.signal };
  const width = worse ? .24 : .42;
  const positions = [0, 1 - width, (1 - width) / 2];
  let quantity = 1;
  let phase = 0;
  let pending = [];
  let timer = null;
  let complete = false;
  const position = index => positions[(phase + index) % positions.length];
  function showAreas() {
    buttons.forEach((button, index) => {
      button.style.setProperty("--working-left", `${position(index) * 100}%`);
      button.style.setProperty("--working-width", `${width * 100}%`);
    });
  }
  function flush() {
    timer = null;
    const clicks = pending.length;
    for (const step of pending) quantity = Math.max(0, Math.min(99, quantity + step));
    pending = [];
    count.textContent = String(quantity);
    phase++;
    showAreas();
    feedback.textContent = `${clicks} click${clicks === 1 ? "" : "s"} processed. ${quantity > 5 ? "Too many chairs. Try removing some." : quantity === 5 ? "Five chairs. Now confirm your reservation." : "Not quite five yet."}`;
  }
  buttons.forEach((button, index) => {
    button.addEventListener("click", event => {
      if (complete) return;
      if (!fixed && event.detail !== 0) {
        const bounds = button.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        if (x < position(index) || x > position(index) + width || y < 0 || y > 1) return;
      }
      // Bound the backlog while preserving each accepted click in a burst.
      if (pending.length >= 20) return;
      pending.push(Number(button.dataset.chairStep));
      if (fixed) flush();
      else if (timer === null) timer = setTimeout(flush, worse ? 1600 : 900);
    }, options);
  });
  stage.querySelector("#sometimes-reveal")?.addEventListener("click", event => {
    const reveal = event.currentTarget.getAttribute("aria-pressed") !== "true";
    event.currentTarget.setAttribute("aria-pressed", String(reveal));
    event.currentTarget.textContent = reveal ? "Hide working areas" : "Show working areas";
    stage.querySelector(".sometimes-controls").classList.toggle("sometimes-revealed", reveal);
  }, options);
  confirm.addEventListener("click", () => {
    if (complete) return;
    if (pending.length) return say("Some clicks are still on their way. Wait for the quantity to settle before confirming.");
    if (quantity !== 5) return say(`You have ${quantity} imaginary chairs. Adjust the quantity to exactly five.`);
    complete = true;
    buttons.forEach(button => { button.disabled = true; });
    confirm.disabled = true;
    say("Reserved exactly five imaginary chairs. Nothing was purchased. You may sit down now.");
    stage.dispatchEvent(new CustomEvent("exhibit-complete"));
  }, options);
  showAreas();
  return () => {
    clearTimeout(timer);
    pending = [];
    listeners.abort();
  };
}

function renderRunaway({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { status, say } = createDemoStatus();
  let cleanup = () => {};
  stage.innerHTML = `<div class="demo-centered"><span class="demo-kicker">COMMITMENT ISSUES, AS A SERVICE</span><h2>${fixed ? "Your button is ready." : "One click. How hard can it be?"}</h2><p>${fixed ? "No chase. No tricks. Just a button." : worse ? "Catch the real button. It came prepared for this." : "Catch the button before it finds another excuse to leave."}</p><div class="chase-arena"><button class="demo-button runaway-button">Claim your prize →</button></div>${status}<small>Keyboard users: tab to the real button and press Enter. It never runs from the keyboard, and decoys never receive focus.<br>Reduced-motion preferences disable every kind of evasion, and Fix it removes the chase entirely.</small></div>`;
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
    // Keep the destination clear of the pointer because the browser dispatches the click to the
    // element under the pointer when it lifts.
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
  // Touch has no hover state, so use timed movement instead. Keyboard focus pauses movement to
  // preserve the accessible path.
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
  return cleanup;
}

function renderLoading({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  shell("LOADING AS AN END IN ITSELF", fixed ? "Here is your content." : "A premium waiting experience.",
    fixed ? "There is only one sentence. It can appear immediately." : `Press Start to load a single sentence through ten entirely fictional stages.${worse ? " Loading pauses for three mandatory approvals." : ""} Cancel or use the museum's Exit whenever you like.`,
    `<div class="loading-console"><div class="loading-orbit" aria-hidden="true"></div><output class="loading-percent" id="loading-percent">0%</output><progress id="loading-progress" max="100" value="0" aria-label="Simulated loading progress"></progress><p id="loading-phase" role="status">Waiting to begin waiting.</p><div class="new-actions"><button class="demo-button" id="loading-start">${fixed ? "Show the sentence" : "Start loading a sentence"}</button><button class="plain-button" id="loading-cancel" disabled>Cancel loading</button><button class="demo-button" id="loading-approve" hidden>Authorize more waiting</button></div><div class="loaded-sentence" id="loaded-sentence" hidden>The page contains this one sentence.</div></div>`);
  const phases = [
    ["Finding the loading animation", 3], ["Aligning pixels emotionally", 17],
    ["Consulting the progress committee", 39], ["Downloading the concept of readiness", 68],
    ["Polishing the final percent", 94], ["Almost definitely finished", 99],
    ["Reconsidering the first 98%", 43], ["Reassembling the same sentence", 76],
    ["Preparing to stop preparing", 99], ["Finished doing nothing", 100],
  ];
  let timer = null;
  let step = 0;
  let waiting = false;
  const approvals = new Set();
  const start = stage.querySelector("#loading-start");
  const cancel = stage.querySelector("#loading-cancel");
  const approve = stage.querySelector("#loading-approve");
  const phase = stage.querySelector("#loading-phase");
  const consolePanel = stage.querySelector(".loading-console");
  const setProgress = value => {
    stage.querySelector("#loading-percent").textContent = `${value}%`;
    stage.querySelector("#loading-progress").value = value;
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
    waiting = false;
    consolePanel.classList.remove("is-loading");
    cancel.disabled = true;
    approve.hidden = true;
    start.disabled = false;
  };
  const finish = () => {
    stop();
    setProgress(100);
    phase.textContent = "Your one sentence is ready.";
    stage.querySelector("#loaded-sentence").hidden = false;
    say(fixed ? "Instantly delivered. The loading screen was optional all along." : "Congratulations. All that waiting produced exactly one sentence.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  };
  start.addEventListener("click", () => {
    stop();
    step = 0;
    approvals.clear();
    setProgress(0);
    stage.querySelector("#loaded-sentence").hidden = true;
    if (fixed) { finish(); return; }
    start.disabled = true;
    cancel.disabled = false;
    consolePanel.classList.add("is-loading");
    phase.textContent = "Starting the preparation to prepare.";
    timer = setInterval(() => {
      if (waiting) return;
      if (worse && [2, 5, 8].includes(step) && !approvals.has(step)) {
        waiting = true;
        approve.hidden = false;
        phase.textContent = `Approval ${approvals.size + 1} of 3 required. Please authorize more waiting.`;
        return;
      }
      const [message, percentage] = phases[step++];
      phase.textContent = message;
      setProgress(percentage);
      if (step === phases.length) finish();
    }, worse ? 1200 : 800);
  });
  approve.addEventListener("click", () => {
    approvals.add(step);
    waiting = false;
    approve.hidden = true;
    phase.textContent = "Permission to wait received. Continuing to almost finish.";
    cancel.focus({ preventScroll: true });
  });
  cancel.addEventListener("click", () => {
    stop();
    phase.textContent = "Waiting cancelled. No real work was lost.";
    say("Loading cancelled. You can restart, or choose Fix it for immediate content.");
    start.focus({ preventScroll: true });
  });
  return stop;
}

function renderSeismicEditor({ stage, mode }) {
  const { shell, say } = createStageShell(stage);
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("THIS SENTENCE HAS NOT PASSED A BUILDING INSPECTION", fixed ? "Words on solid ground." : "Please type without causing a landslide.",
    fixed ? "Enter a sentence and finish it. Nothing shakes or falls." : `Write and finish a sentence before it loses structural integrity.${worse ? " The foundation is feeling unusually ambitious." : ""} If it falls, your text stays available to rebuild. Reduced-motion settings disable animation; the museum controls never shake.`,
    `<div class="quake-world"><label for="quake-input">Your structurally questionable sentence (maximum 80 characters)</label><input id="quake-input" type="text" maxlength="80" autocomplete="off" spellcheck="false" placeholder="${fixed ? "Type normally. The ground is stable." : "Every edit could be the one..."}"><div class="quake-dashboard"><label for="quake-stress">Structural stress <output id="quake-stress-value">0%</output></label><meter id="quake-stress" min="0" max="100" value="0"></meter><span id="quake-risk">Collapse risk: 0%</span><span id="quake-count">0 / 80 characters</span></div><div class="quake-chamber" id="quake-chamber" role="img" aria-label="Empty letter platform"><div id="quake-letters" aria-hidden="true"></div><span class="quake-empty" id="quake-empty">Your letters will stand here. Probably.</span><span class="quake-floor" aria-hidden="true">LOAD-BEARING PUNCTUATION</span></div><div class="new-actions"><button type="button" class="demo-button" id="quake-finish">Finish this sentence</button><button type="button" class="demo-button" id="quake-rebuild" hidden>Rebuild my text</button><button type="button" class="plain-button" id="quake-clear">Start over</button></div><p class="quake-safety">A collapse scatters the letters, not your data. Your original text stays in the field and can be rebuilt. Nothing is saved outside this page.</p></div>`);
  const input = stage.querySelector("#quake-input");
  const chamber = stage.querySelector("#quake-chamber");
  const letters = stage.querySelector("#quake-letters");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const animations = new Set();
  let lastText = "";
  let stress = 0;
  let risk = 0;
  let collapsed = false;
  let finished = false;
  let debris = [];
  let shakeAnimation = null;
  let lastEditTime = null;
  const stressPerCharacter = worse ? 12 : 6;
  const chance = value => value >= 100 ? 100 : Math.round(Math.min(worse ? 95 : 80, (worse ? 14 : 3) + value * (worse ? 0.9 : 0.6)));
  const animate = (element, frames, options) => {
    const animation = element.animate(frames, options);
    animations.add(animation);
    const forget = () => animations.delete(animation);
    animation.addEventListener("finish", forget, { once: true });
    animation.addEventListener("cancel", forget, { once: true });
    return animation;
  };
  const cancelAnimations = () => {
    for (const animation of animations) animation.cancel();
    animations.clear();
  };
  const shake = (speed, punctuation) => {
    if (fixed || motion.matches) return;
    if (shakeAnimation) shakeAnimation.cancel();
    const bounds = stage.getBoundingClientRect();
    const clearance = Math.max(0, Math.min(bounds.left, document.documentElement.clientWidth - bounds.right) - 2);
    const amount = Math.min(clearance, (2 + speed * 8 + punctuation) * (worse ? 1.5 : 1));
    shakeAnimation = animate(stage, [
      { transform: "translate(0, 0)", offset: 0 },
      { transform: `translate(${-amount}px, ${amount / 2}px)`, offset: 0.08 },
      { transform: `translate(${amount}px, ${-amount / 2}px)`, offset: 0.22 },
      { transform: `translate(${-amount * 0.7}px, ${amount / 3}px)`, offset: 0.4 },
      { transform: `translate(${amount * 0.4}px, ${-amount / 4}px)`, offset: 0.6 },
      { transform: `translate(${-amount * 0.2}px, ${amount / 6}px)`, offset: 0.8 },
      { transform: "translate(0, 0)", offset: 1 },
    ], { duration: (150 + speed * 100 + punctuation * 6) * (worse ? 1.2 : 1), easing: "ease-out" });
  };
  const renderLetters = (fall = false) => {
    const text = [...input.value];
    const width = chamber.clientWidth;
    const columns = Math.max(1, Math.floor((width - 32) / 30));
    const rows = Math.ceil(text.length / columns);
    const height = Math.max(260, rows * 36 + 78);
    chamber.style.height = `${height}px`;
    letters.replaceChildren();
    stage.querySelector("#quake-empty").hidden = text.length > 0;
    text.forEach((character, index) => {
      const tile = document.createElement("span");
      tile.className = "quake-letter";
      tile.textContent = character === " " ? "␣" : character;
      const left = 16 + (index % columns) * 30;
      const top = 24 + Math.floor(index / columns) * 36;
      tile.style.left = `${left}px`;
      tile.style.top = `${top}px`;
      if (collapsed) {
        const piece = debris[index];
        const targetX = Math.max(16, Math.min(width - 44, left + (piece.x - 0.5) * 20));
        const pileDepth = Math.min(48, Math.max(0, height - 64 - top - 24));
        const targetY = height - 64 - piece.y * pileDepth;
        const destination = `translate(${targetX - left}px, ${targetY - top}px) rotate(${piece.angle}deg)`;
        tile.style.transform = destination;
        letters.append(tile);
        if (fall && !motion.matches) {
          animate(tile, [
            { transform: "translate(0, 0) rotate(0deg)", offset: 0, easing: "ease-in" },
            { transform: `translate(0, ${targetY - top}px) rotate(${piece.angle * 0.8}deg)`, offset: 0.75, easing: "ease-out" },
            { transform: `translate(${(targetX - left) * 0.6}px, ${targetY - top - 8}px) rotate(${piece.angle * 1.1}deg)`, offset: 0.87, easing: "ease-in" },
            { transform: destination, offset: 1 },
          ], { duration: worse ? 850 : 650, delay: index % 8 * 18, fill: "backwards" });
        }
      } else {
        letters.append(tile);
      }
    });
    chamber.classList.toggle("collapsed", collapsed);
    chamber.setAttribute("aria-label", collapsed ? "The entire sentence has tumbled. Its original text is preserved in the input field." : `Stable letter platform with ${text.length} characters.`);
  };
  const paint = () => {
    stage.querySelector("#quake-stress").value = stress;
    stage.querySelector("#quake-stress-value").textContent = `${stress}%`;
    stage.querySelector("#quake-risk").textContent = fixed ? "Collapse risk: none" : `Last edit collapse risk: ${risk}%`;
    stage.querySelector("#quake-count").textContent = `${[...input.value].length} / 80 characters`;
    stage.querySelector("#quake-rebuild").hidden = !collapsed;
    stage.querySelector("#quake-finish").disabled = collapsed || finished;
    input.readOnly = collapsed || finished;
  };
  const evaluateEdit = () => {
    if (collapsed || finished || input.value === lastText) return;
    const added = Math.max(1, [...input.value].length - [...lastText].length);
    const now = performance.now();
    const speed = lastEditTime === null ? 0 : Math.max(0, Math.min(1, (800 - (now - lastEditTime)) / 700));
    // Isolate inserted/replaced text so old punctuation and deletions do not cause new jolts.
    let start = 0;
    while (start < lastText.length && start < input.value.length && lastText[start] === input.value[start]) start++;
    let oldEnd = lastText.length;
    let newEnd = input.value.length;
    while (oldEnd > start && newEnd > start && lastText[oldEnd - 1] === input.value[newEnd - 1]) { oldEnd--; newEnd--; }
    const punctuation = Math.min(20, [...input.value.slice(start, newEnd)].reduce((jolt, character) =>
      jolt + (/[\u0021\uFF01\u203C\u2757\u2755]/u.test(character) ? 12 : /\p{P}/u.test(character) ? 4 : 0), 0));
    lastEditTime = now;
    lastText = input.value;
    shake(speed, punctuation);
    if (!input.value) {
      lastEditTime = null;
      stress = 0;
      risk = 0;
      renderLetters();
      paint();
      say("The sentence is empty. The foundation is relieved.");
      return;
    }
    if (!fixed) {
      stress = Math.min(100, stress + added * stressPerCharacter);
      risk = chance(stress);
      collapsed = Math.random() * 100 < risk;
      if (collapsed) debris = [...input.value].map(() => ({ x: Math.random(), y: Math.random(), angle: Math.random() * 300 - 150 }));
    }
    renderLetters(collapsed);
    paint();
    say(collapsed ? "Structural failure! Every letter has tumbled. Your exact text is preserved above. Rebuild it to keep editing." : fixed ? "Text updated. No earthquakes required." : `It held. Stress is ${stress}%. The next edit is another gamble.`);
  };
  input.addEventListener("input", event => {
    if (!event.isComposing) evaluateEdit();
  });
  input.addEventListener("compositionend", evaluateEdit);
  stage.querySelector("#quake-rebuild").addEventListener("click", () => {
    cancelAnimations();
    collapsed = false;
    debris = [];
    lastEditTime = null;
    stress = 0;
    risk = 0;
    renderLetters();
    paint();
    say("Text rebuilt exactly as you entered it. Stress reset. You may keep typing or finish now.");
    input.focus({ preventScroll: true });
    input.setSelectionRange(input.value.length, input.value.length);
  });
  stage.querySelector("#quake-clear").addEventListener("click", () => {
    cancelAnimations();
    input.value = "";
    lastText = "";
    lastEditTime = null;
    collapsed = false;
    finished = false;
    debris = [];
    stress = 0;
    risk = 0;
    renderLetters();
    paint();
    say("Cleared. A fresh sentence and a suspiciously optimistic foundation.");
    input.focus({ preventScroll: true });
  });
  stage.querySelector("#quake-finish").addEventListener("click", () => {
    if (!input.value.trim()) { say("Enter a sentence before finishing. Your empty editor is ready when you are."); return; }
    cancelAnimations();
    finished = true;
    paint();
    say(fixed ? "Sentence finished. It stayed put, as text should." : "Sentence finished before another collapse. Your text is intact. Nothing was sent or saved.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  let lastWidth = chamber.clientWidth;
  const resize = new ResizeObserver(() => {
    if (lastWidth === chamber.clientWidth) return;
    lastWidth = chamber.clientWidth;
    cancelAnimations();
    renderLetters();
  });
  resize.observe(chamber);
  const handleMotionChange = () => {
    cancelAnimations();
    renderLetters();
  };
  motion.addEventListener("change", handleMotionChange);
  renderLetters();
  paint();
  return () => {
    resize.disconnect();
    motion.removeEventListener("change", handleMotionChange);
    cancelAnimations();
  };
}

function renderWindVolume({ stage, mode }) {
  const { shell, say } = createStageShell(stage);
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("AN ENTIRE WEATHER SYSTEM FOR ONE SETTING", fixed ? "Volume, indoors." : "Please adjust during a lull.",
    `${fixed ? "A sheltered slider. Up increases the value; down decreases it." : `Drag the handle up and down. Gusts twist the entire track beneath your pointer and keep shoving the pretend volume after you let go.${worse ? " Hurricane mode can flip the track upside down." : ""} Only Save shelters the setting from the weather.`} Aim for 37% (35-39% counts), then save. No audio plays and your device volume never changes.`,
    `<div class="wind-machine"><div class="wind-readout"><span id="wind-volume-label">PRETEND VOLUME</span><output id="wind-value">50%</output><span id="wind-weather"></span></div><div class="wind-field" id="wind-field"><div class="wind-streaks" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="wind-rotor" id="wind-slider" role="slider" tabindex="0" aria-labelledby="wind-volume-label" aria-describedby="wind-help" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-orientation="vertical"><span class="wind-end wind-high" aria-hidden="true">100</span><div class="wind-track" aria-hidden="true"></div><span class="wind-handle" id="wind-handle" aria-hidden="true"></span><span class="wind-end wind-low" aria-hidden="true">0</span></div><div class="wind-ground" aria-hidden="true">${fixed ? "CERTIFIED INDOOR AIR" : "DO NOT INSTALL CONTROLS OUTDOORS"}</div></div><p id="wind-help">Drag the handle, or focus it and use arrow keys. Page Up/Down adjust by 10; Home/End select the ends. Reduced motion keeps the track still, but gusts still affect the number.</p><button type="button" class="demo-button" id="wind-save">Save pretend volume</button></div>`);
  const slider = stage.querySelector("#wind-slider");
  const field = stage.querySelector("#wind-field");
  const handle = stage.querySelector("#wind-handle");
  const output = stage.querySelector("#wind-value");
  const weather = stage.querySelector("#wind-weather");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let volume = 50;
  let angle = 0;
  let force = 0;
  let pointer = null;
  let frame = null;
  let previousTime = 0;
  let saved = false;
  const phase = Math.random() * Math.PI * 2;
  const clamp = value => Math.max(0, Math.min(100, value));
  const displayedVolume = () => Math.round(volume);
  const draw = () => {
    const displayed = displayedVolume();
    slider.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    handle.style.top = `${20 + (100 - displayed) * 1.8}px`;
    output.textContent = `${displayed}%`;
    slider.setAttribute("aria-valuenow", String(displayed));
    slider.setAttribute("aria-valuetext", `${displayed} percent, simulated volume only`);
    weather.textContent = saved ? "Setting sheltered." : fixed ? "Wind: 0. Sensible." : `Wind: ${force < 0 ? "left" : "right"} ${Math.round(Math.abs(force) * (worse ? 110 : 65))} pretend km/h`;
    field.classList.toggle("wind-active", pointer !== null);
  };
  const gust = (now, dt) => {
    const time = now / 1000;
    force = Math.sin(time * (worse ? 3.3 : 2.1) + phase) * 0.7 + Math.sin(time * 5.1 + phase * 2) * 0.3;
    const target = force * (worse ? 165 : 75);
    angle = motion.matches ? 0 : angle + (target - angle) * (1 - Math.exp(-dt / 110));
  };
  const readPointer = () => {
    if (!pointer) return;
    const rect = field.getBoundingClientRect();
    const x = pointer.x - (rect.left + rect.width / 2);
    const y = pointer.y - (rect.top + rect.height / 2);
    const radians = angle * Math.PI / 180;
    // Project the pointer onto the twisting track, rather than treating screen-up as volume-up.
    volume = clamp(50 + (x * Math.sin(radians) - y * Math.cos(radians)) / 1.8 + force * (worse ? 18 : 8));
  };
  const tick = now => {
    const dt = Math.min(50, now - previousTime);
    gust(now, dt);
    previousTime = now;
    if (pointer) readPointer();
    else if (!fixed && !saved) volume = clamp(volume + force * (worse ? 18 : 8) * dt / 1000);
    draw();
    frame = requestAnimationFrame(tick);
  };
  const releasePointer = () => {
    const id = pointer?.id;
    pointer = null;
    if (id !== undefined && slider.hasPointerCapture(id)) slider.releasePointerCapture(id);
    draw();
  };
  const stopWeather = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    releasePointer();
  };
  const startWeather = () => {
    if (fixed || saved || frame !== null || document.hidden) return;
    previousTime = performance.now();
    frame = requestAnimationFrame(tick);
  };
  slider.addEventListener("pointerdown", event => {
    if (saved || pointer || event.button !== 0) return;
    event.preventDefault();
    slider.focus({ preventScroll: true });
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
    slider.setPointerCapture(event.pointerId);
    readPointer();
    draw();
    startWeather();
  });
  slider.addEventListener("pointermove", event => {
    if (!pointer || event.pointerId !== pointer.id) return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    readPointer();
    draw();
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach(type => slider.addEventListener(type, event => {
    if (pointer?.id === event.pointerId) releasePointer();
  }));
  slider.addEventListener("keydown", event => {
    const steps = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 10, PageDown: -10 };
    if (!(event.key in steps) && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    if (saved) return;
    releasePointer();
    if (!fixed) gust(performance.now(), 160);
    const requested = event.key === "Home" ? 0 : event.key === "End" ? 100 : volume + steps[event.key] * Math.cos(angle * Math.PI / 180);
    volume = clamp(requested + force * (worse ? 18 : 8));
    draw();
  });
  stage.querySelector("#wind-save").addEventListener("click", () => {
    releasePointer();
    const displayed = displayedVolume();
    if (displayed < 35 || displayed > 39) {
      say(`${displayed}% is not the target. Aim for 35-39% and save before the wind moves it again. Only this pretend number changes.`);
      return;
    }
    saved = true;
    stopWeather();
    slider.setAttribute("aria-disabled", "true");
    stage.querySelector("#wind-save").disabled = true;
    field.classList.add("wind-sheltered");
    draw();
    say(`Pretend volume sheltered at ${displayed}%. Your real volume was never touched. Reset to brave the weather again.`);
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  const handleMotion = () => {
    angle = 0;
    draw();
  };
  motion.addEventListener("change", handleMotion);
  const pauseWeather = () => stopWeather();
  const resumeWeather = () => startWeather();
  const visibility = () => document.hidden ? pauseWeather() : resumeWeather();
  window.addEventListener("blur", pauseWeather);
  window.addEventListener("focus", resumeWeather);
  document.addEventListener("visibilitychange", visibility);
  draw();
  startWeather();
  return () => {
    stopWeather();
    motion.removeEventListener("change", handleMotion);
    window.removeEventListener("blur", pauseWeather);
    window.removeEventListener("focus", resumeWeather);
    document.removeEventListener("visibilitychange", visibility);
  };
}

function renderTetrisVolume({ stage, mode, shuffle }) {
  const { shell, say } = createStageShell(stage);
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("DECIBELS REQUIRE STRUCTURAL SUPPORT", fixed ? "A slider. Not an arcade." : "Please construct your volume.",
    fixed ? "Adjust the pretend volume directly. No audio plays and your device volume never changes." : `Build the pretend volume by stacking blocks. Completed rows disappear and lower it; the board tracks your progress. Another block replaces the falling piece without changing your stack.${worse ? " Hard mode has turned up gravity." : ""} No audio plays and your device volume never changes.`,
    `<div class="tetris-machine"><label for="tetris-volume">Pretend volume${fixed ? "" : " (controlled by settled blocks)"}</label><output id="tetris-value" for="tetris-volume">${fixed ? 50 : 0}%</output><input type="range" id="tetris-volume" min="0" max="100" value="${fixed ? 50 : 0}" ${fixed ? "" : "disabled"}>${fixed ? "" : `<div class="tetris-summary"><span id="tetris-fill">0 / 80 cells for 100%</span><span id="tetris-piece-name"></span></div><div class="tetris-board" id="tetris-board" tabindex="0" role="group" aria-label="Falling block volume game" aria-describedby="tetris-help">${Array.from({ length: 120 }, (_, index) => `<span class="tetris-cell${index >= 40 ? " tetris-lower" : ""}" data-tetris-cell="${index}" aria-hidden="true"></span>`).join("")}</div><p id="tetris-help">With the board or any game button focused: Left/Right move, Up or R rotates, Down lowers. Space drops when the board is focused; on a button, Space activates that button. Completed rows disappear. Touch controls are below. Reduced motion uses manual drops only. Pause whenever you need to think.</p><div class="tetris-controls"><button type="button" class="plain-button" data-tetris-action="left" aria-label="Move block left">←</button><button type="button" class="plain-button" data-tetris-action="rotate" aria-keyshortcuts="ArrowUp r">Rotate (R / ↑)</button><button type="button" class="plain-button" data-tetris-action="right" aria-label="Move block right">→</button><button type="button" class="plain-button" data-tetris-action="down">Lower ↓</button><button type="button" class="demo-button" data-tetris-action="drop">Drop block</button></div><div class="new-actions"><button type="button" class="demo-button" id="tetris-play">Start game</button><button type="button" class="plain-button" id="tetris-another">Another block</button><button type="button" class="plain-button" id="tetris-empty">Empty speaker</button></div>`}</div>`);
  const volume = stage.querySelector("#tetris-volume");
  const output = stage.querySelector("#tetris-value");
  if (fixed) {
    volume.addEventListener("input", () => {
      output.textContent = `${volume.value}%`;
      if (Number(volume.value) === 100) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    });
    return () => {};
  }
  const board = stage.querySelector("#tetris-board");
  const cells = [...stage.querySelectorAll("[data-tetris-cell]")];
  const play = stage.querySelector("#tetris-play");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const shapes = [
    { name: "I", cells: [[0, 0], [1, 0], [2, 0], [3, 0]] },
    { name: "O", cells: [[0, 0], [1, 0], [0, 1], [1, 1]] },
    { name: "T", cells: [[1, 0], [0, 1], [1, 1], [2, 1]] },
    { name: "S", cells: [[1, 0], [2, 0], [0, 1], [1, 1]] },
    { name: "Z", cells: [[0, 0], [1, 0], [1, 1], [2, 1]] },
    { name: "J", cells: [[0, 0], [0, 1], [1, 1], [2, 1]] },
    { name: "L", cells: [[2, 0], [0, 1], [1, 1], [2, 1]] },
  ];
  let stack = Array(120).fill(null);
  let bag = [];
  let piece;
  let playing = false;
  let started = false;
  let jammed = false;
  let timer = null;
  const fits = (shape, x, y) => shape.every(([dx, dy]) => x + dx >= 0 && x + dx < 10 && y + dy >= 0 && y + dy < 12 && stack[(y + dy) * 10 + x + dx] === null);
  const paint = () => {
    const active = new Set(jammed ? [] : piece.cells.map(([x, y]) => (piece.y + y) * 10 + piece.x + x));
    cells.forEach((cell, index) => {
      const color = stack[index] || (active.has(index) ? piece.name : null);
      cell.className = `tetris-cell${index >= 40 ? " tetris-lower" : ""}${color ? ` tetris-${color}` : ""}${stack[index] ? " tetris-settled" : active.has(index) ? " tetris-active" : ""}`;
    });
    const filled = stack.filter(Boolean).length;
    volume.value = String(Math.min(100, Math.round(filled / 80 * 100)));
    output.textContent = `${volume.value}%`;
    stage.querySelector("#tetris-fill").textContent = `${filled} / 80 cells for 100%`;
    stage.querySelector("#tetris-piece-name").textContent = jammed ? "STACK JAMMED" : `${piece.name} block / ${playing ? motion.matches ? "manual gravity" : "falling" : "paused"}`;
    board.setAttribute("aria-label", `${piece.name} block at column ${piece.x + 1}, row ${piece.y + 1}. ${filled} settled cells; 80 reaches full volume. Pretend volume ${volume.value} percent. ${jammed ? "Stack jammed." : playing ? "Playing." : "Paused."}`);
    play.textContent = jammed ? "Stack jammed" : playing ? "Pause game" : started ? "Resume game" : "Start game";
    play.disabled = jammed;
    stage.querySelectorAll("[data-tetris-action]").forEach(button => { button.disabled = !playing; });
  };
  const stopTimer = () => { clearInterval(timer); timer = null; };
  const spawn = () => {
    if (!bag.length) bag = shuffle(shapes);
    const next = bag.shift();
    piece = { name: next.name, cells: next.cells, x: 3, y: 0 };
    if (!fits(piece.cells, piece.x, piece.y)) {
      jammed = true;
      playing = false;
      stopTimer();
      say("The speaker is stacked to the ceiling. Your pretend volume is held. Empty speaker to rebuild.");
    }
  };
  const clearCompletedRows = () => {
    const rows = Array.from({ length: 12 }, (_, row) => stack.slice(row * 10, row * 10 + 10));
    const remaining = rows.filter(row => row.some(cell => cell === null));
    const cleared = rows.length - remaining.length;
    if (cleared) stack = [...Array.from({ length: cleared }, () => Array(10).fill(null)), ...remaining].flat();
    return cleared;
  };
  const lock = () => {
    piece.cells.forEach(([x, y]) => { stack[(piece.y + y) * 10 + piece.x + x] = piece.name; });
    const cleared = clearCompletedRows();
    spawn();
    paint();
    if (!jammed) say(cleared ? `${cleared === 1 ? "A completed row disappeared, taking its filled cells with it" : `${cleared} completed rows disappeared, taking their filled cells with them`}. Pretend volume is now ${volume.value}%.` : `Block settled. Pretend volume is ${volume.value}%. Reach 80 settled cells for 100%.`);
    if (stack.filter(Boolean).length >= 80) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  };
  const lower = () => {
    if (fits(piece.cells, piece.x, piece.y + 1)) piece.y++;
    else lock();
    paint();
  };
  const action = name => {
    if (!playing) { say(jammed ? "Empty speaker to start a fresh stack." : "Start or resume the game before moving a block."); return; }
    if (name === "left" || name === "right") {
      const x = piece.x + (name === "left" ? -1 : 1);
      if (fits(piece.cells, x, piece.y)) piece.x = x;
    } else if (name === "rotate") {
      const turned = piece.cells.map(([x, y]) => [-y, x]);
      const minX = Math.min(...turned.map(([x]) => x));
      const minY = Math.min(...turned.map(([, y]) => y));
      const normalized = turned.map(([x, y]) => [x - minX, y - minY]);
      const kick = [0, -1, 1, -2, 2].find(offset => fits(normalized, piece.x + offset, piece.y));
      if (kick !== undefined) { piece.cells = normalized; piece.x += kick; }
    } else if (name === "down") lower();
    else if (name === "drop") {
      while (fits(piece.cells, piece.x, piece.y + 1)) piece.y++;
      lock();
    }
    paint();
  };
  const runTimer = () => {
    stopTimer();
    if (playing && !motion.matches) timer = setInterval(lower, worse ? 300 : 700);
  };
  const pause = () => {
    if (!playing) return;
    playing = false;
    stopTimer();
    paint();
    say("Game paused. Your blocks and pretend volume are held.");
  };
  play.addEventListener("click", () => {
    if (playing) { pause(); return; }
    playing = true;
    started = true;
    runTimer();
    paint();
    say(motion.matches ? "Manual gravity: use Lower or Drop block. No automatic falling." : "Blocks are falling. Stack 80 cells for 100%; completed rows disappear.");
    board.focus({ preventScroll: true });
  });
  stage.querySelector(".tetris-machine").addEventListener("keydown", event => {
    const controls = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "rotate", r: "rotate", ArrowDown: "down", " ": "drop" };
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (!(key in controls) || event.ctrlKey || event.metaKey || event.altKey) return;
    if (key === " " && event.target.closest("button")) return;
    event.preventDefault();
    action(controls[key]);
  });
  stage.querySelectorAll("[data-tetris-action]").forEach(button => button.addEventListener("click", () => action(button.dataset.tetrisAction)));
  stage.querySelector("#tetris-another").addEventListener("click", () => {
    if (jammed) { say("The stack is jammed. Empty speaker before requesting another block."); return; }
    spawn();
    paint();
    if (!jammed) say(`Fresh ${piece.name} block. The previous falling block was replaced; your settled stack stays put.`);
  });
  stage.querySelector("#tetris-empty").addEventListener("click", () => {
    stopTimer();
    playing = false;
    started = false;
    jammed = false;
    stack = Array(120).fill(null);
    bag = [];
    spawn();
    paint();
    say("Speaker emptied. Pretend volume is 0%. Start again when ready.");
  });
  const visibility = () => { if (document.hidden) pause(); };
  motion.addEventListener("change", pause);
  window.addEventListener("blur", pause);
  document.addEventListener("visibilitychange", visibility);
  spawn();
  paint();
  return () => {
    stopTimer();
    motion.removeEventListener("change", pause);
    window.removeEventListener("blur", pause);
    document.removeEventListener("visibilitychange", visibility);
  };
}

function renderVolumeSeesaw({ stage, mode }) {
  const { shell, say } = createStageShell(stage);
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("A BALANCING ACT FOR YOUR EARS", fixed ? "Volume without a counterweight." : "Please balance the pretend volume.",
    fixed ? "A stable slider. No audio plays and your device volume never changes." : `Add weights to either end. More weight on the right raises volume; more on the left lowers it. The beam wobbles before settling. Try reaching 65%, then hold the setting.${worse ? " Every third added weight rolls to the opposite end, and balloons pull upward with negative weight." : ""} No audio plays and your device volume never changes.`,
    `<div class="seesaw-machine"><label for="seesaw-volume">Pretend volume</label><output id="seesaw-value">50%</output><input type="range" id="seesaw-volume" min="0" max="100" value="50" ${fixed ? "" : "disabled"}>${fixed ? "" : `<div class="seesaw-scene"><div class="seesaw-pivot" aria-hidden="true"></div><div class="seesaw-beam" id="seesaw-beam"><div class="seesaw-pan seesaw-left" id="seesaw-left" aria-label="Left weight tray"></div><div class="seesaw-pan seesaw-right" id="seesaw-right" aria-label="Right weight tray"></div></div></div><p class="seesaw-masses" id="seesaw-masses"></p><label for="seesaw-weight">Choose a weight</label><select id="seesaw-weight"><option value="0">Pebble: +1</option><option value="1">Brick: +3</option><option value="2">Anvil: +5</option>${worse ? '<option value="3">Balloon: -2 (pulls upward)</option>' : ""}</select><div class="seesaw-controls"><button type="button" class="plain-button" id="seesaw-add-left">Add to left</button><button type="button" class="plain-button" id="seesaw-add-right">Add to right</button><button type="button" class="plain-button" id="seesaw-remove-left">Remove left weight</button><button type="button" class="plain-button" id="seesaw-remove-right">Remove right weight</button></div><div class="new-actions"><button type="button" class="demo-button" id="seesaw-hold">Hold this volume</button><button type="button" class="plain-button" id="seesaw-reset">Clear weights</button></div><p class="seesaw-note">Maximum 12 weights. Reduced motion settles immediately. Holding freezes the number and weights until released.</p>`}</div>`);
  const output = stage.querySelector("#seesaw-value");
  const slider = stage.querySelector("#seesaw-volume");
  if (fixed) {
    slider.addEventListener("input", () => {
      output.textContent = `${slider.value}%`;
      if (Number(slider.value) === 65) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    });
    return () => {};
  }
  const types = [{ name: "Pebble", mass: 1, symbol: "●" }, { name: "Brick", mass: 3, symbol: "■" }, { name: "Anvil", mass: 5, symbol: "▰" }, { name: "Balloon", mass: -2, symbol: "◯" }];
  const weights = { left: [], right: [] };
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const beam = stage.querySelector("#seesaw-beam");
  let angle = 0;
  let velocity = 0;
  let held = false;
  let additions = 0;
  let frame = null;
  let lastTime = 0;
  const mass = side => weights[side].reduce((sum, type) => sum + types[type].mass, 0);
  const equilibrium = () => Math.max(-28, Math.min(28, (mass("right") - mass("left")) * 2.8));
  const paint = () => {
    const volume = Math.max(0, Math.min(100, Math.round(50 + angle / 28 * 50)));
    beam.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    if (slider.value !== String(volume)) {
      output.textContent = `${volume}%`;
      slider.value = String(volume);
    }
    stage.querySelector("#seesaw-masses").textContent = `Left: ${mass("left")} / Right: ${mass("right")} / ${held ? "HELD" : "balancing"}`;
  };
  const paintWeights = () => {
    for (const side of ["left", "right"]) {
      const tray = stage.querySelector(`#seesaw-${side}`);
      tray.replaceChildren();
      for (const index of weights[side]) {
        const token = document.createElement("span");
        token.textContent = types[index].symbol;
        token.title = `${types[index].name}: ${types[index].mass}`;
        tray.append(token);
      }
      tray.setAttribute("aria-label", `${side} tray: ${weights[side].map(index => types[index].name).join(", ") || "empty"}. Total ${mass(side)}.`);
      stage.querySelector(`#seesaw-remove-${side}`).disabled = held || !weights[side].length;
      stage.querySelector(`#seesaw-add-${side}`).disabled = held || weights.left.length + weights.right.length >= 12;
    }
    stage.querySelector("#seesaw-weight").disabled = held;
    stage.querySelector("#seesaw-hold").textContent = held ? "Release volume" : "Hold this volume";
    paint();
  };
  const cancel = () => { if (frame !== null) cancelAnimationFrame(frame); frame = null; };
  const tick = now => {
    const dt = Math.min(0.04, (now - lastTime) / 1000);
    lastTime = now;
    velocity += ((equilibrium() - angle) * 14 - velocity * 4.5) * dt;
    angle = Math.max(-32, Math.min(32, angle + velocity * dt));
    if (Math.abs(equilibrium() - angle) < 0.015 && Math.abs(velocity) < 0.015) {
      angle = equilibrium();
      velocity = 0;
      frame = null;
      paint();
      return;
    }
    paint();
    frame = requestAnimationFrame(tick);
  };
  const settle = () => {
    if (held) return;
    if (motion.matches) {
      cancel();
      angle = equilibrium();
      velocity = 0;
      paint();
    } else if (frame === null) {
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    }
  };
  for (const side of ["left", "right"]) {
    stage.querySelector(`#seesaw-add-${side}`).addEventListener("click", () => {
      const type = Number(stage.querySelector("#seesaw-weight").value);
      weights[side].push(type);
      additions++;
      if (worse && additions % 3 === 0) {
        weights[side === "left" ? "right" : "left"].push(weights[side].shift());
        say("A loose weight rolled across to the other end! The balance has changed.");
      } else say(`${types[type].name} added to the ${side}. Only the pretend volume changes.`);
      paintWeights();
      settle();
    });
    stage.querySelector(`#seesaw-remove-${side}`).addEventListener("click", () => {
      weights[side].pop();
      paintWeights();
      settle();
      say(`One weight removed from the ${side}.`);
    });
  }
  stage.querySelector("#seesaw-hold").addEventListener("click", () => {
    held = !held;
    cancel();
    velocity = 0;
    paintWeights();
    if (!held) settle();
    say(held ? `Pretend volume held at ${slider.value}%. No real volume changed.` : "Volume released. The weights are in charge again.");
    if (held && Number(slider.value) === 65) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  stage.querySelector("#seesaw-reset").addEventListener("click", () => {
    cancel();
    weights.left.length = 0;
    weights.right.length = 0;
    held = false;
    additions = 0;
    angle = 0;
    velocity = 0;
    paintWeights();
    say("Weights cleared. Pretend volume is back to 50%.");
  });
  const pause = () => {
    if (frame === null) return;
    held = true;
    cancel();
    velocity = 0;
    paintWeights();
    say("Seesaw paused. Release volume when you are ready to continue.");
  };
  const visibility = () => { if (document.hidden) pause(); };
  const motionChange = () => { cancel(); settle(); };
  window.addEventListener("blur", pause);
  document.addEventListener("visibilitychange", visibility);
  motion.addEventListener("change", motionChange);
  paintWeights();
  return () => {
    cancel();
    window.removeEventListener("blur", pause);
    document.removeEventListener("visibilitychange", visibility);
    motion.removeEventListener("change", motionChange);
  };
}

function renderNotificationSwatter({ stage, mode }) {
  const { shell, say } = createStageShell(stage);
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const fields = [
    { id: "name", label: "Full name", type: "text", placeholder: "Alex Example", limit: 40 },
    { id: "email", label: "Email address", type: "email", placeholder: "alex@example.test", limit: 80 },
    { id: "company", label: "Organization", type: "text", placeholder: "Cloud City Studio", limit: 60 },
    { id: "subject", label: "Subject", type: "text", placeholder: "A quiet request", limit: 80 },
    { id: "message", label: "Message", placeholder: "Please let me finish this form.", limit: 160 },
    { id: "code", label: "Confirmation code: type QUIET", type: "text", placeholder: "QUIET", limit: 20 },
  ];
  shell("YOUR ATTENTION HAS 17 UNREAD MESSAGES", fixed ? "A moment of notification-free peace." : "Swat first. Form later.",
    fixed ? "Complete the six-field demo form in peace. Use fictional details; no messages are sent." : `The swarm starts automatically with your first keystroke or paste. Complete all six fields with fictional information, enter the code QUIET, then clear the alerts and finish. Click alerts to swat them, or use the keyboard.${worse ? " Alerts arrive faster, and clicking empty space creates an alert about your accuracy." : ""} Pause and Swat one stay outside the swarm. These are page elements, not system notifications.`,
    `<div class="fly-machine">${fixed ? "" : '<div class="fly-tools"><button type="button" class="demo-button" id="fly-toggle" disabled>Starts when you type</button><button type="button" class="plain-button" id="fly-swat">Swat one</button><span id="fly-count">0 alerts / 0 swatted</span></div>'}<div class="fly-arena${fixed ? " fly-quiet" : ""}" id="fly-arena"><div class="fly-form-scroll"><form id="fly-form" novalidate>${fields.map(field => `<div class="fly-field${field.id === "message" ? " fly-wide" : ""}"><label for="fly-${field.id}">${field.label}</label>${field.type ? `<input type="${field.type}" id="fly-${field.id}" maxlength="${field.limit}" placeholder="${field.placeholder}" autocomplete="off" required>` : `<textarea id="fly-${field.id}" maxlength="${field.limit}" placeholder="${field.placeholder}" required></textarea>`}</div>`).join("")}<button class="demo-button" id="fly-finish">Finish demo form</button></form></div>${fixed ? "" : '<div class="fly-layer" id="fly-layer"></div>'}</div></div>`);
  const arena = stage.querySelector("#fly-arena");
  const inputs = fields.map(field => stage.querySelector(`#fly-${field.id}`));
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const flies = new Map();
  const messages = ["An alert about your alerts", "Limited-time distraction", "You have unread interruptions", "Please enable more alerts", "Your form misses you", "A notification has arrived"];
  let timer = null;
  let running = false;
  let started = fixed;
  let finished = false;
  let serial = 0;
  let swatted = 0;
  const paint = () => {
    if (fixed) return;
    stage.querySelector("#fly-count").textContent = `${flies.size} alerts / ${swatted} swatted`;
    stage.querySelector("#fly-toggle").textContent = running ? "Pause swarm" : started ? "Resume swarm" : "Starts when you type";
    stage.querySelector("#fly-toggle").disabled = finished || !started;
    stage.querySelector("#fly-swat").disabled = finished || flies.size === 0;
  };
  const position = node => {
    node.style.left = `${8 + Math.random() * Math.max(0, arena.clientWidth - node.offsetWidth - 16)}px`;
    node.style.top = `${8 + Math.random() * Math.max(0, arena.clientHeight - node.offsetHeight - 16)}px`;
  };
  const swat = id => {
    const node = flies.get(id);
    if (!node) return;
    const focused = document.activeElement === node;
    node.remove();
    flies.delete(id);
    swatted++;
    paint();
    if (focused) (flies.values().next().value || stage.querySelector("#fly-name")).focus({ preventScroll: true });
    say(`Notification swatted. ${flies.size} left. Your form entries are unchanged.`);
  };
  const spawn = message => {
    if (flies.size >= (worse ? 12 : 8) || finished) return;
    const id = ++serial;
    const node = document.createElement("button");
    node.type = "button";
    node.className = "fly-notification";
    node.textContent = `✉ ${message || messages[(id - 1) % messages.length]} ×`;
    node.setAttribute("aria-label", `Swat notification ${id}: ${message || messages[(id - 1) % messages.length]}`);
    node.addEventListener("click", () => swat(id));
    flies.set(id, node);
    stage.querySelector("#fly-layer").append(node);
    position(node);
    paint();
  };
  const pause = () => {
    clearInterval(timer);
    timer = null;
    running = false;
    paint();
  };
  if (!fixed) {
    const start = () => {
      running = true;
      if (!started) {
        started = true;
        for (let index = 0; index < (worse ? 5 : 3); index++) spawn();
      }
      timer = setInterval(() => {
        if (!motion.matches) {
          const oldest = flies.values().next().value;
          if (oldest) position(oldest);
        }
        spawn();
      }, worse ? 750 : 1700);
      paint();
      say("Your typing woke the swarm. Complete the six fields and swat the alerts, or pause whenever you need.");
    };
    inputs.forEach(input => input.addEventListener("input", () => {
      if (!started && !finished) start();
    }));
    stage.querySelector("#fly-toggle").addEventListener("click", () => {
      if (running) { pause(); say("Swarm paused. You can still swat alerts and complete the form."); return; }
      start();
    });
    stage.querySelector("#fly-swat").addEventListener("click", () => {
      const id = flies.keys().next().value;
      if (id !== undefined) swat(id);
    });
    arena.addEventListener("click", event => {
      if (!started || finished || event.target.closest("form, button, input, label")) return;
      if (worse) { spawn("New alert: alerts about missed alerts"); say("Missed. We created an alert about that missed alert."); }
      else say("Missed. Click a notification to swat it; the form itself is not a target.");
    });
  }
  stage.querySelector("#fly-form").addEventListener("submit", event => {
    event.preventDefault();
    const missing = inputs.findIndex(input => input.value.trim().length < 2);
    if (missing >= 0) {
      say(`Complete ${fields[missing].label.toLowerCase()} with at least two characters. Use fictional information.`);
      inputs[missing].focus();
      return;
    }
    if (stage.querySelector("#fly-email").validity.typeMismatch || stage.querySelector("#fly-code").value.trim().toUpperCase() !== "QUIET") {
      say("Use a valid demo email address and enter QUIET as the confirmation code.");
      return;
    }
    if (flies.size) { say(`Swat the remaining ${flies.size} notifications before finishing. Your entries are preserved.`); return; }
    finished = true;
    pause();
    inputs.forEach(input => { input.readOnly = true; });
    stage.querySelector("#fly-finish").disabled = true;
    say("Form complete. The alerts are gone, your entries survived, and nothing was sent or saved.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  const visibility = () => { if (document.hidden && running) { pause(); say("Swarm paused while the tab is hidden."); } };
  const resize = new ResizeObserver(() => {
    for (const node of flies.values()) {
      node.style.left = `${Math.max(8, Math.min(parseFloat(node.style.left), arena.clientWidth - node.offsetWidth - 8))}px`;
      node.style.top = `${Math.max(8, Math.min(parseFloat(node.style.top), arena.clientHeight - node.offsetHeight - 8))}px`;
    }
  });
  resize.observe(arena);
  document.addEventListener("visibilitychange", visibility);
  paint();
  return () => {
    clearInterval(timer);
    resize.disconnect();
    document.removeEventListener("visibilitychange", visibility);
  };
}
