// Interaction & simulation: physical, timed, or game-like controls.
import { createStageShell, createDemoStatus, matchesDemoText, downloadDemoFile, resetExhibit } from "./shared.js";

export const exhibits = [
  { id: "unresponsive-buttons", task: "Set the quantity to exactly 2, wait for any pending clicks, then select Reserve tickets.", fixedTask: "Set the quantity to 2 and select Reserve tickets.", name: "The Eventually Responsive Buttons", category: "Interaction", color: "green", tagline: "You click again because nothing happened. Now you've booked twelve.", description: "Reserve two tickets with buttons that respond late and only in the right spot. Every impatient retry still counts.", lesson: "A button gives no feedback, so you click again. Then all the clicks arrive at once. This ticket form turns that familiar uncertainty into an accidental group booking.", fix: "The entire button responds immediately, so you can see the effect of each click before clicking again.", worseChange: "The working part of each button is smaller, changes sides after each batch, and takes longer to respond.", preview: '<div class="thumb-scene thumb-eventually"><span class="thumb-kicker">JUST TWO TICKETS, PLEASE</span><div class="thumb-eventually-label">GENERAL ADMISSION</div><div class="thumb-eventually-stepper"><span>−</span><strong>12</strong><span class="thumb-eventually-plus">+</span></div><div class="thumb-eventually-receipt">Group booking detected.</div><small class="thumb-footer">Oh. Those clicks did count.</small></div>', render: renderUnresponsiveButtons },
  { id: "runaway", task: "Download your museum ticket using the Download ticket button.", fixedTask: "Select Download ticket to get your demo museum ticket.", name: "The Runaway Button", category: "Interaction", color: "lilac", tagline: "You go to click a button. The button leaves.", description: "Download a museum ticket with a button that moves away whenever you get close.", lesson: "You've probably missed a button because it was too small or moved at the wrong moment. This one treats every click as something to escape. Even a single action becomes a chase.", fix: "The button stays where you expect it and responds to the first click.", worseChange: "The real button is smaller, moves more aggressively, and is joined by look-alike buttons that don't award the prize.", preview: `<div class="thumb-scene thumb-runaway"><span class="thumb-kicker">TRY CLICKING THIS BUTTON</span><div class="thumb-chase"><span class="thumb-button-shadow"></span><i class="thumb-chase-pointer" aria-hidden="true">↖</i><span class="thumb-chase-trail"></span><small>come back here.</small><span class="thumb-fleeing-button">Click me ↗</span></div></div>`, render: renderRunaway },
  { id: "loading", task: "Open your booking confirmation and wait for the message. You can cancel at any time.", fixedTask: "Select Open booking confirmation to read the message immediately.", name: "The Loading Experience", category: "Interaction", color: "lilac", tagline: "Wait for a page that has almost nothing to load.", description: "Open a one-sentence booking confirmation through ten loading stages and a progress bar that goes backward.", lesson: "A loading bar promises you're getting closer to the content. Here it reaches almost finished, goes backward, and makes a ceremony out of showing one sentence. The wait is the entire experience.", fix: "The sentence appears immediately, without the loading ceremony.", worseChange: "Loading pauses three times and asks you to approve more waiting.", preview: `<div class="thumb-scene thumb-loading"><span class="thumb-kicker">ALMOST THERE. PREVIOUSLY.</span><div class="thumb-progress-numbers"><s>99%</s><span>→</span><strong>12%</strong></div><div class="thumb-backward-bar"><i></i><b>←</b></div><span class="thumb-loading-status">Reconsidering the first 98%.</span><small class="thumb-footer">All this to load one sentence.</small></div>`, render: renderLoading },
  { id: "seismic-editor", task: "Write the reminder Bring a notebook and select Save draft. Rebuild my text restores collapsed letters.", fixedTask: "Write Bring a notebook and select Save draft.", name: "The Seismic Text Editor", category: "Interaction", color: "pink", tagline: "You're writing a sentence. The letters start falling apart.", description: "Typing should keep your words in place. This editor shakes with every change and can collapse the sentence into scattered letters.", lesson: "Losing your place while writing is frustrating enough. This editor turns every edit into a small earthquake. Your words are preserved, but keeping them on the page becomes extra work.", fix: "The editor stays still and keeps the letters in place as you type.", worseChange: "Typing builds stress faster and makes the editor shake more strongly.", preview: `<div class="thumb-scene thumb-collapse"><span class="thumb-kicker">JUST TRY TO WRITE A SENTENCE</span><div class="thumb-collapse-page"><span>UNTITLED / UNSAVED / UNSTABLE</span><div class="thumb-broken-baseline"><i></i><b>!</b></div><div class="thumb-letter-rubble"><b>T</b><b>Y</b><b>P</b><b>E</b></div></div><small class="thumb-footer">One more letter. What could go wrong?</small></div>`, render: renderSeismicEditor },
  { id: "wind-volume", task: "Set the video player volume to 37% (35-39% counts), then select Save volume.", fixedTask: "Set the video player volume to 37% (35-39% counts), then select Save volume.", name: "The Windswept Volume Slider", category: "Interaction", color: "blue", tagline: "Set the volume before a gust changes it again.", description: "Try to drag a volume slider while wind rotates it and pushes the setting around, even after you let go.", lesson: "A slider should stay where you put it. This one behaves as if it's outdoors in bad weather: the control turns, the number drifts, and choosing a volume becomes a race against the next gust.", fix: "The slider stays upright and the value stays put until you change it.", worseChange: "Stronger gusts move the value more aggressively and can turn the slider upside down.", preview: `<div class="thumb-scene thumb-wind"><span class="thumb-kicker">VOLUME WITH A CHANCE OF WIND</span><div class="thumb-weather"><div class="thumb-gusts" aria-hidden="true"><i></i><i></i><i></i></div><div class="thumb-wind-track"><b>+</b><i></i><b>−</b></div><div class="thumb-weather-reading"><span>WANTED</span><s>37%</s><strong>82%</strong><span>GUST HAPPENED.</span></div></div><small class="thumb-footer">Your volume is now weather-dependent.</small></div>`, render: renderWindVolume },
  { id: "tetris-volume", task: "Set the video player volume to 60% (58-62% counts). Settled blocks control the volume.", fixedTask: "Set the video player volume to 60% (58-62% counts) using the slider.", name: "The Tetris Volume Control", category: "Interaction", color: "blue", tagline: "Want it louder? Build a bigger stack of blocks.", description: "Instead of dragging a volume slider, play a falling-block game. More stacked blocks mean more volume; clearing a row turns it down.", lesson: "Adjusting sound usually takes one quick movement. Here it requires a game of Tetris-style falling blocks. A good move that clears a row is, inconveniently, a bad move for volume.", fix: "An ordinary slider replaces the game. It changes only the demo number, not your device's volume.", worseChange: "Blocks fall faster, giving you less time to build the volume you want.", preview: `<div class="thumb-scene thumb-tetris"><span class="thumb-kicker">JUST TURN IT UP A LITTLE</span><div class="thumb-tetris-console"><div class="thumb-block-board" aria-hidden="true"><i class="thumb-block-falling"></i><i class="thumb-block-left"></i><i class="thumb-block-right"></i><i class="thumb-block-row"></i></div><div class="thumb-volume-reading"><span>VOLUME</span><strong>40%</strong><span>ROW CLEARED</span><b>↓ 28%</b></div></div><small class="thumb-footer">Great move. Quieter now.</small></div>`, render: renderTetrisVolume },
  { id: "volume-seesaw", task: "Set the video player volume to 65%, then select Hold this volume. Balance the weights to reach the required level.", fixedTask: "Set the video player volume to 65% using the slider.", category: "Interaction", color: "blue", name: "The Volume Seesaw", tagline: "Turn the volume up by putting a brick on a seesaw.", description: "A sound setting becomes a balancing act. Add weights to a seesaw instead of moving a slider.", lesson: "You know how quickly you can turn sound up or down with a slider. Here the same setting depends on balancing pebbles, bricks, and anvils. Your listening level now has a weight limit.", fix: "A normal slider replaces the seesaw and weights. Your device's actual volume is unchanged.", worseChange: "Balloons pull upward, and every third addition makes the oldest weight on that side roll across to the opposite side.", preview: '<div class="thumb-scene thumb-seesaw"><span class="thumb-kicker">VOLUME: SOME ASSEMBLY REQUIRED</span><div class="thumb-balance"><span class="thumb-balance-value">73<span>%</span></span><div class="thumb-beam"><i class="thumb-pebble"></i><i class="thumb-brick"></i><i class="thumb-brick thumb-brick-top"></i></div><div class="thumb-fulcrum"></div><span class="thumb-balance-minus">−</span><span class="thumb-balance-plus">+</span></div><small class="thumb-footer">Could you turn it down one brick?</small></div>', render: renderVolumeSeesaw },
  { id: "notification-swatter", task: "Send a support request using made-up contact details. Dismiss or pause alerts if they get in your way.", fixedTask: "Fill in the support form with made-up details and select Send request.", category: "Interaction", color: "yellow", name: "The Notification Fly Swatter", tagline: "You're filling in a form. The alerts won't leave you alone.", description: "Send a support request while notification boxes multiply over the form. Closing one barely makes room for the next.", lesson: "An update, a reminder, another update about the reminder. You came to complete a form, but dismissing notifications becomes a second job. Here they even cover the answers you're typing.", fix: "The notifications are removed, leaving you free to complete the form.", worseChange: "Alerts arrive faster, and missed clicks create more alerts.", preview: '<div class="thumb-scene thumb-swatter"><span class="thumb-kicker">WE VALUE YOUR FOCUS</span><div class="thumb-alert-stack"><div class="thumb-form-under"><span>YOUR MESSAGE</span><b>Hello, I would like to</b><div class="fake-lines"></div></div><div class="thumb-alert thumb-alert-back"><b>A quick update</b><span>×</span><small>You have updates.</small></div><div class="thumb-alert thumb-alert-front"><b>One more thing</b><span>×</span><small>About that update.</small></div></div><small class="thumb-footer">There was a form here a moment ago.</small></div>', render: renderNotificationSwatter },
];

function renderUnresponsiveButtons({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  shell("EVENTUALLY TICKETS / BOX OFFICE", "Two tickets. One quiet afternoon.",
    fixed ? "Reserve two demo tickets using the quantity buttons, then select Reserve tickets. Each click updates the number immediately."
      : `You're booking tickets for yourself and a friend. The quantity buttons seem unresponsive, so it's tempting to click again. But only part of each button works, and accepted clicks arrive after a delay.${worse ? " The working part also changes sides after each batch." : ""} Set the quantity to exactly 2, wait for the count to settle, then reserve. No payment is made.`,
    `<section class="eventually-booking${fixed ? " eventually-fixed" : ""}" aria-label="Ticket reservation">
      <div class="eventually-heading"><div><span class="demo-kicker">GENERAL ADMISSION</span><h3>The permanent backlog</h3></div><span class="eventually-price">$12 / person</span></div>
      <div class="eventually-order"><span>Visitors</span><span>Requested party: <b>2 people</b></span></div>
      <div class="eventually-stepper" role="group" aria-label="Number of tickets">
        <button type="button" class="eventually-adjust" data-delta="-1" aria-label="Remove one ticket" title="Remove one ticket"><span aria-hidden="true">−</span></button>
        <output class="eventually-count" aria-label="Ticket quantity" aria-live="polite">1</output>
        <button type="button" class="eventually-adjust" data-delta="1" aria-label="Add one ticket" title="Add one ticket"><span aria-hidden="true">+</span></button>
      </div>
      <p class="eventually-caption">A solo visit. Your friend will understand.</p>
      <div class="eventually-total"><span>Total (pretend money)</span><strong>$12</strong></div>
      <button type="button" class="demo-button eventually-reserve">Reserve tickets</button>
      <small class="eventually-policy">All retries are treated as expressions of enthusiasm.</small>
    </section>`);
  const controls = [...stage.querySelectorAll(".eventually-adjust")];
  const count = stage.querySelector(".eventually-count");
  const caption = stage.querySelector(".eventually-caption");
  const total = stage.querySelector(".eventually-total strong");
  const reserve = stage.querySelector(".eventually-reserve");
  const controller = new AbortController();
  const pending = [];
  let quantity = 1;
  let timer = null;
  let burst = 0;
  let complete = false;
  let disposed = false;

  function setPatches() {
    controls.forEach(button => {
      const right = (Number(button.dataset.delta) === 1) !== (worse && burst % 2 === 1);
      button.dataset.side = right ? "right" : "left";
      button.style.setProperty("--eventually-patch", worse ? "40%" : "50%");
    });
  }

  function updateQuantity(delta) {
    quantity = Math.max(0, Math.min(99, quantity + delta));
    count.textContent = quantity;
    total.textContent = `$${quantity * 12}`;
    caption.textContent = quantity === 0 ? "An admirably affordable day out. Nobody is going."
      : quantity === 1 ? "A solo visit. Your friend will understand."
        : quantity === 2 ? "Two people. A socially manageable amount."
          : quantity < 6 ? "Your plus-one has brought plus-ones."
            : quantity < 12 ? "A committee. We will arrange a clipboard."
              : "Group booking detected. Your coach driver gets in free.";
  }

  function drain() {
    timer = null;
    if (disposed || complete || document.hidden) return;
    updateQuantity(pending.shift());
    if (pending.length) {
      timer = setTimeout(drain, worse ? 240 : 180);
    } else {
      burst++;
      setPatches();
      say(quantity > 2 ? "All your clicks have arrived. Thank you for growing the arts sector."
        : "Availability updated. We appreciate your patience, including the extra clicks.");
    }
  }

  controls.forEach(button => button.addEventListener("click", event => {
    if (disposed || complete || document.hidden) return;
    if (!fixed && event.detail !== 0) {
      const bounds = button.getBoundingClientRect();
      const horizontal = (event.clientX - bounds.left) / bounds.width;
      const vertical = (event.clientY - bounds.top) / bounds.height;
      const patch = worse ? 0.4 : 0.5;
      const inside = horizontal >= 0 && horizontal <= 1 && vertical >= 0 && vertical <= 1
        && (button.dataset.side === "right" ? horizontal >= 1 - patch : horizontal <= patch);
      if (!inside) {
        say("Your click is important to us. This part of the button is not currently staffed.");
        return;
      }
    }
    const delta = Number(button.dataset.delta);
    if (fixed) {
      updateQuantity(delta);
      say("Quantity updated. Immediately. We also found this surprising.");
      return;
    }
    if (pending.length >= 99) return;
    pending.push(delta);
    if (timer === null) timer = setTimeout(drain, worse ? 1800 : 1100);
  }, { signal: controller.signal }));

  reserve.addEventListener("click", () => {
    if (complete || disposed || document.hidden) return;
    if (pending.length) {
      say("Your quantity is still being negotiated with your previous clicks.");
    } else if (quantity !== 2) {
      say(quantity > 2 ? `That is ${quantity - 2} unexpected guests. Your friend requested quality time, not a conference.`
        : "The booking is for two. Your friend has already cleared their afternoon.");
    } else {
      complete = true;
      controls.forEach(button => { button.disabled = true; });
      reserve.disabled = true;
      say("Two tickets reserved. The school trip has been averted. Nothing was charged.");
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    }
  }, { signal: controller.signal });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden || !pending.length) return;
    clearTimeout(timer);
    timer = null;
    pending.length = 0;
    say("Unprocessed clicks expired while the box office was unattended. Your displayed quantity is unchanged.");
  }, { signal: controller.signal });
  setPatches();
  return () => {
    disposed = true;
    controller.abort();
    clearTimeout(timer);
    pending.length = 0;
  };
}

function renderRunaway({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { status, say } = createDemoStatus();
  const behaviors = ["reaction", "exhaustion", "sneak", "corner"];
  const behavior = fixed ? "fixed" : behaviors[Math.floor(Math.random() * behaviors.length)];
  const rules = worse
    ? { warmup: 20000, warmupEscapes: 20, reaction: 180, escapes: 8, rest: 600, speed: 140, radius: 65, step: 140, trapped: 3 }
    : { warmup: 10000, warmupEscapes: 10, reaction: 250, escapes: 5, rest: 900, speed: 300, radius: 0, step: 90, trapped: 12 };
  const hints = {
    reaction: "It hesitates before fleeing. Click before it makes up its mind.",
    exhaustion: "Even this button gets tired. Chase it until it needs a breather.",
    sneak: "It can smell panic. Approach slowly, then click.",
    corner: "It can run, but it cannot teleport. Herd it into a corner.",
  };
  stage.innerHTML = `<div class="demo-centered"><span class="demo-kicker">A BUTTON THAT DODGES YOUR CLICK</span><h2>${fixed ? "Your button is ready." : "One click. How hard can it be?"}</h2><p>${fixed ? "Click Download ticket for your museum visit. The button stays still." : "Clicking a button should take one movement. This one keeps escaping. Catch and activate Download ticket to finish."}</p><div class="chase-arena"><button class="demo-button runaway-button">Download ticket →</button></div>${status}<small>Keyboard users: tab to the real button and press Enter. It never runs from the keyboard, and decoys never receive focus.<br>Reduced-motion preferences disable every kind of evasion, and Fix it removes the chase entirely.</small></div>`;
  const button = stage.querySelector(".runaway-button");
  const arena = stage.querySelector(".chase-arena");
  const intro = stage.querySelector(".demo-centered > p");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = matchMedia("(hover: none), (pointer: coarse)");
  let input = coarse.matches ? "touch" : "mouse";
  arena.dataset.behavior = behavior;
  if (!fixed) stage.querySelector(".demo-kicker").textContent = worse
    ? "HARD MODE — NOW IT'S PERSONAL"
    : "EASY MODE — CONSIDER THIS A WARM-UP";
  let attempts = 0;
  let lastMove = -Infinity;
  let directHits = 0;
  let touchHit = false;
  let mouseEscapes = 0;
  let warmingUp = !fixed;
  let warmupEscapes = 0;
  let warmupRemaining = rules.warmup;
  let warmupStartedAt = null;
  let warmupTimer = null;
  let reactionTimer = null;
  let restTimer = null;
  let cornered = false;
  let latestMouse = null;
  let mouseSample = null;
  let lastMousePosition = null;
  let disposed = false;
  const contacts = new Set();
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
  function updateHint() {
    arena.dataset.input = input;
    arena.dataset.phase = fixed ? "fixed" : warmingUp ? "warmup" : "challenge";
    if (caught) return;
    intro.textContent = "Normally you click a button and you're done. " + (fixed
      ? "This version works that way: select Download ticket."
      : motion.matches ? "With reduced motion enabled, this button stays put too. Click or tap to catch it."
        : input === "touch" ? "This one moves away instead. Tap the real button repeatedly; only direct hits count."
          : warmingUp ? "This one runs away. Keep trying to catch it; a hint will reveal how to outsmart it."
            : `This one needs a different approach. ${hints[behavior]}`);
  }
  function canEvade() {
    return !disposed && !fixed && !caught && !motion.matches && !document.hidden && !button.matches(":focus-visible");
  }
  function clearMouseTimers() {
    pauseWarmup();
    clearTimeout(reactionTimer);
    clearTimeout(restTimer);
    reactionTimer = null;
    restTimer = null;
    cornered = false;
    if (!caught) {
      button.dataset.state = "ready";
    }
  }
  function pauseWarmup() {
    if (warmupStartedAt !== null) {
      warmupRemaining = Math.max(0, warmupRemaining - (performance.now() - warmupStartedAt));
    }
    warmupStartedAt = null;
    clearTimeout(warmupTimer);
    warmupTimer = null;
  }
  function finishWarmup() {
    if (!warmingUp || input !== "mouse" || !canEvade() || (warmupRemaining > 0 && warmupEscapes < rules.warmupEscapes)) return;
    pauseWarmup();
    warmingUp = false;
    updateHint();
    say(`It is running out of excuses. ${hints[behavior]}`);
  }
  function warmupEscape(pointer) {
    if (!canEvade() || input !== "mouse") return;
    if (warmupRemaining > 0 && warmupTimer === null) {
      warmupStartedAt = performance.now();
      warmupTimer = setTimeout(() => {
        pauseWarmup();
        finishWarmup();
      }, warmupRemaining);
    }
    if (performance.now() - lastMove < 100) return;
    if (escape(local(pointer))) warmupEscapes++;
    finishWarmup();
  }
  function stopDrift() {
    clearInterval(drift);
    drift = null;
  }
  function setInput(next) {
    if (next === input || caught || disposed) return;
    clearMouseTimers();
    stopDrift();
    input = next;
    latestMouse = null;
    mouseSample = null;
    mouseEscapes = 0;
    updateHint();
    if (input === "touch") startDrift();
  }
  function escape(pointer, note, herd = false) {
    if (!canEvade()) return false;
    if (worse) button.style.width = `${Math.max(100, 190 - (attempts + 1) * 9)}px`;
    const maxX = Math.max(0, arena.clientWidth - button.offsetWidth);
    const maxY = Math.max(0, arena.clientHeight - button.offsetHeight);
    const old = { x: button.offsetLeft, y: button.offsetTop };
    const from = pointer || { x: old.x + button.offsetWidth / 2, y: old.y + button.offsetHeight / 2 };
    let destination;
    if (herd) {
      const dx = old.x + button.offsetWidth / 2 - from.x;
      const dy = old.y + button.offsetHeight / 2 - from.y;
      const distance = Math.hypot(dx, dy);
      destination = {
        x: Math.max(0, Math.min(maxX, old.x + (distance ? dx / distance : 1) * rules.step)),
        y: Math.max(0, Math.min(maxY, old.y + (distance ? dy / distance : 0) * rules.step)),
      };
      if (Math.hypot(destination.x - old.x, destination.y - old.y) <= rules.trapped) {
        cornered = true;
        button.dataset.state = "cornered";
        say("Nowhere left to run. Download ticket.");
        return false;
      }
    } else {
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
      const pick = candidates.filter(candidate => candidate.pointerDistance > 140);
      destination = (pick.length ? pick : candidates).reduce((best, candidate) => candidate.score > best.score ? candidate : best);
    }
    lastMove = performance.now();
    attempts++;
    history.push(destination);
    if (history.length > 8) history.shift();
    if (worse) {
      const decoy = document.createElement("span");
      decoy.className = "runaway-decoy";
      decoy.textContent = "Download ticket →";
      decoy.setAttribute("aria-hidden", "true");
      decoy.style.left = `${old.x}px`;
      decoy.style.top = `${old.y}px`;
      decoy.addEventListener("click", () => {
        if (!caught && (input === "mouse" || !touchHit)) say("That was a decoy. The real button has already left.");
      });
      arena.append(decoy);
      if (arena.querySelectorAll(".runaway-decoy").length > 5) arena.querySelector(".runaway-decoy").remove();
    }
    button.style.left = `${destination.x}px`;
    button.style.top = `${destination.y}px`;
    say(note || `Escape ${attempts}. ${worse ? "Smaller target. More impostors. Same absolutely nothing." : "A new destination. Another missed opportunity."}`);
    return true;
  }
  function flee(event, note) {
    if (performance.now() - lastMove < 100) return;
    escape(local(event), note);
  }
  function local(event) {
    const bounds = arena.getBoundingClientRect();
    return { x: event.clientX - bounds.left - arena.clientLeft, y: event.clientY - bounds.top - arena.clientTop };
  }
  function gap(event) {
    const rect = button.getBoundingClientRect();
    return Math.hypot(Math.max(rect.left - event.clientX, 0, event.clientX - rect.right), Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom));
  }
  // Touch has no hover state, so use timed movement instead. Keyboard focus pauses movement to
  // preserve the accessible path.
  function startDrift() {
    if (drift !== null || input !== "touch" || fixed || caught || disposed || motion.matches || document.hidden) return;
    drift = setInterval(() => {
      if (!canEvade() || !onscreen) return;
      escape(null, `It moved on its own. Escape ${attempts + 1}. ${worse ? "It will not wait for you." : "Tap it before it goes again."}`);
    }, worse ? 900 : 1400);
  }
  function reactToMouse(speed = Infinity) {
    if (input !== "mouse" || !latestMouse || !canEvade() || restTimer !== null || cornered) return;
    if (gap(latestMouse) > rules.radius) {
      clearTimeout(reactionTimer);
      reactionTimer = null;
      button.dataset.state = "ready";
      return;
    }
    if (warmingUp) {
      warmupEscape(latestMouse);
      return;
    }
    if (behavior === "reaction") {
      if (reactionTimer !== null) return;
      button.dataset.state = "hesitating";
      say("It hesitated. Click before it changes its mind.");
      reactionTimer = setTimeout(() => {
        reactionTimer = null;
        button.dataset.state = "ready";
        if (input === "mouse" && latestMouse && gap(latestMouse) <= rules.radius) escape(local(latestMouse));
      }, rules.reaction);
      return;
    }
    if (behavior === "sneak" && speed <= rules.speed) return;
    if (performance.now() - lastMove < 100) return;
    if (!escape(local(latestMouse), undefined, behavior === "corner")) return;
    if (behavior === "exhaustion" && ++mouseEscapes >= rules.escapes) {
      mouseEscapes = 0;
      button.dataset.state = "resting";
      say("It needs a breather. Catch it while it rests!");
      restTimer = setTimeout(() => {
        restTimer = null;
        button.dataset.state = "ready";
        say("Breather over. The chase is back on.");
        reactToMouse();
      }, rules.rest);
    }
  }
  // Only actual mouse movement or a mouse press restores cursor play. Pointer entry can be
  // synthesized after touch or a layout change and must not revive a stale mouse strategy.
  function trackPointer(event) {
    if (caught || disposed) return;
    if (event.pointerType !== "mouse") {
      if (event.type === "pointerdown") contacts.add(event.pointerId);
      if (event.type === "pointerdown" || event.buttons || event.pressure > 0) setInput("touch");
      return;
    }
    if (contacts.size || event.sourceCapabilities?.firesTouchEvents) return;
    const position = { clientX: event.clientX, clientY: event.clientY };
    if (event.type === "pointermove") {
      const moved = !lastMousePosition || position.clientX !== lastMousePosition.clientX || position.clientY !== lastMousePosition.clientY;
      if (input === "touch" && !moved && !event.movementX && !event.movementY) return;
      setInput("mouse");
      const now = performance.now();
      // Cap idle time so waiting, then jumping onto the button, is not mistaken for sneaking.
      const speed = mouseSample
        ? Math.hypot(position.clientX - mouseSample.clientX, position.clientY - mouseSample.clientY) * 1000 / Math.max(1, Math.min(80, now - mouseSample.at))
        : Infinity;
      mouseSample = { ...position, at: now };
      latestMouse = position;
      lastMousePosition = position;
      reactToMouse(speed);
    } else {
      setInput("mouse");
    }
  }
  function releasePointer(event) {
    contacts.delete(event.pointerId);
  }
  document.addEventListener("pointermove", trackPointer, true);
  document.addEventListener("pointerdown", trackPointer, true);
  document.addEventListener("pointerup", releasePointer, true);
  document.addEventListener("pointercancel", releasePointer, true);
  updateHint();
  startDrift();
  arena.addEventListener("pointerdown", event => {
    if (fixed || caught || motion.matches || event.button !== 0) return;
    if (event.pointerType === "mouse") {
      if (input === "mouse" && event.target === button) {
        if (warmingUp) warmupEscape(event);
        else win("pointer");
      }
      return;
    }
    touchHit = event.target === button;
    startDrift();
    if (event.target !== button) {
      // Near misses scare it off, so a touch has to be accurate and not merely present.
      if (gap(event) >= (worse ? 130 : 90)) return;
      flee(event);
      return;
    }
    directHits++;
    if (directHits >= requiredHits) {
      win("direct hit");
      return;
    }
    escape(local(event), `${flinches[(directHits - 1) % flinches.length]} Direct hits: ${directHits}.`);
  });
  arena.addEventListener("pointermove", event => {
    if (event.pointerType === "mouse" || !(event.buttons || event.pressure > 0)) return;
    if (gap(event) < 90) flee(event);
  });
  function suspend() {
    clearMouseTimers();
    stopDrift();
    latestMouse = null;
    mouseSample = null;
  }
  function preferencesChanged() {
    suspend();
    updateHint();
    startDrift();
  }
  function visibilityChanged() {
    suspend();
    contacts.clear();
    if (!document.hidden) startDrift();
  }
  function blur() {
    suspend();
    contacts.clear();
  }
  button.addEventListener("focus", () => {
    if (button.matches(":focus-visible")) clearMouseTimers();
  });
  window.addEventListener("blur", blur);
  window.addEventListener("focus", startDrift);
  document.addEventListener("visibilitychange", visibilityChanged);
  motion.addEventListener("change", preferencesChanged);
  const resize = new ResizeObserver(() => {
    if (fixed || !attempts) return;
    button.style.left = `${Math.min(button.offsetLeft, Math.max(0, arena.clientWidth - button.offsetWidth))}px`;
    button.style.top = `${Math.min(button.offsetTop, Math.max(0, arena.clientHeight - button.offsetHeight))}px`;
  });
  resize.observe(arena);
  watcher.observe(arena);
  const cleanup = () => {
    disposed = true;
    resize.disconnect();
    watcher.disconnect();
    suspend();
    document.removeEventListener("pointermove", trackPointer, true);
    document.removeEventListener("pointerdown", trackPointer, true);
    document.removeEventListener("pointerup", releasePointer, true);
    document.removeEventListener("pointercancel", releasePointer, true);
    window.removeEventListener("blur", blur);
    window.removeEventListener("focus", startDrift);
    document.removeEventListener("visibilitychange", visibilityChanged);
    motion.removeEventListener("change", preferencesChanged);
    document.body.classList.remove("runaway-won");
  };
  function win(method = "pointer") {
    if (caught) return;
    caught = true;
    downloadDemoFile("museum-demo-ticket.txt", "REALLY BAD DESIGN MUSEUM\nDemo admission ticket\nNot valid for entry to a real event. No reservation or payment was made.\n");
    suspend();
    watcher.disconnect();
    arena.querySelectorAll(".runaway-decoy").forEach(decoy => decoy.remove());
    document.body.classList.add("runaway-won");
    button.textContent = "Caught! ✓";
    button.dataset.state = "caught";
    button.disabled = true;
    stage.querySelector("h2").textContent = "You caught it!";
    stage.querySelector(".demo-centered > p").textContent = "Your demo museum ticket is ready. No real ticket was issued.";
    const difficulty = worse ? "Hard" : fixed ? "Fix it" : "Easy";
    const stats = method === "direct hit"
      ? `${difficulty} mode · ${directHits} direct hits · ${attempts} escapes`
      : `${difficulty} mode · ${method === "keyboard" ? "keyboard catch" : method === "reduced motion" ? "reduced-motion catch" : fixed ? "stable-button catch" : "pointer catch"} · ${attempts} escapes`;
    say(`Demo museum ticket downloaded! ${stats}. Button stopped. No real ticket was issued.`);
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  }
  button.addEventListener("click", event => {
    if (fixed || motion.matches) {
      win(fixed ? "fixed" : "reduced motion");
    } else if (event.detail === 0 && event.pointerType !== "touch" && event.pointerType !== "pen") {
      win("keyboard");
    } else {
      // Pointer catches are settled on down. In particular, Safari's near-miss click snapping
      // must not turn a touch miss (or an earlier direct hit) into a completed round.
      event.preventDefault();
    }
  });
  return cleanup;
}

function renderLoading({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  shell("LOADING AS AN END IN ITSELF", fixed ? "Here is your content." : "A premium waiting experience.",
    fixed ? "Open your booking confirmation to see the message immediately, without the wait." : `You've watched a progress bar reach almost 100% and stay there. This one goes further: ten loading stages, backward progress, and just one sentence at the end. Select Open booking confirmation to check the time of your museum visit.${worse ? " You'll also have to approve three requests to keep waiting." : ""} Cancel or Exit whenever you've had enough.`,
    `<div class="loading-console"><div class="loading-orbit" aria-hidden="true"></div><output class="loading-percent" id="loading-percent">0%</output><progress id="loading-progress" max="100" value="0" aria-label="Simulated loading progress"></progress><p id="loading-phase" role="status">Waiting to begin waiting.</p><div class="new-actions"><button class="demo-button" id="loading-start">${fixed ? "Open booking confirmation" : "Open booking confirmation"}</button><button class="plain-button" id="loading-cancel" disabled>Cancel loading</button><button class="demo-button" id="loading-approve" hidden>Authorize more waiting</button></div><div class="loaded-sentence" id="loaded-sentence" hidden>Your demo museum visit is confirmed for Saturday at 2 pm. No real reservation was made.</div></div>`);
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
    say("Booking confirmation opened: Saturday at 2 pm. This is fictional; no reservation was made.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  };
  start.addEventListener("click", () => {
    stop();
    resetExhibit(stage);
    say("");
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
    fixed ? "Write the reminder Bring a notebook and select Save draft. A final period, question mark, or exclamation mark is fine. The editor stays still while you write." : `Imagine a text editor that shakes every time you type. Write the reminder Bring a notebook and save the draft before the letters collapse. A final period, question mark, or exclamation mark is fine.${worse ? " Each edit builds stress faster in this version." : ""} If they fall, Rebuild my text restores the same words so you can continue. Your original text stays in the field. Reduced-motion settings disable the shaking and collapse.`,
    `<div class="quake-world"><label for="quake-input">Your sentence (maximum 80 characters)</label><input id="quake-input" type="text" maxlength="80" autocomplete="off" spellcheck="false" placeholder="${fixed ? "Type normally. The ground is stable." : "Type a sentence and watch the letters"}"><div class="quake-dashboard"><label for="quake-stress">Structural stress <output id="quake-stress-value">0%</output></label><meter id="quake-stress" min="0" max="100" value="0"></meter><span id="quake-risk">Collapse risk: 0%</span><span id="quake-count">0 / 80 characters</span></div><div class="quake-chamber" id="quake-chamber" role="img" aria-label="Empty letter platform"><div id="quake-letters" aria-hidden="true"></div><span class="quake-empty" id="quake-empty">Your letters will stand here. Probably.</span><span class="quake-floor" aria-hidden="true">LOAD-BEARING PUNCTUATION</span></div><div class="new-actions"><button type="button" class="demo-button" id="quake-finish">Save draft</button><button type="button" class="demo-button" id="quake-rebuild" hidden>Rebuild my text</button><button type="button" class="plain-button" id="quake-clear">Start over</button></div><p class="quake-safety">A collapse scatters the letters, not your data. Your original text stays in the field and can be rebuilt. Nothing is saved outside this page.</p></div>`);
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
    stage.querySelector("#quake-risk").textContent = fixed || motion.matches ? "Collapse risk: none" : `Last edit collapse risk: ${risk}%`;
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
    if (!fixed && !motion.matches) {
      stress = Math.min(100, stress + added * stressPerCharacter);
      risk = chance(stress);
      collapsed = Math.random() * 100 < risk;
      if (collapsed) debris = [...input.value].map(() => ({ x: Math.random(), y: Math.random(), angle: Math.random() * 300 - 150 }));
    }
    renderLetters(collapsed);
    paint();
    say(collapsed ? "Structural failure! Every letter has tumbled. Your exact text is preserved above. Rebuild it to keep editing." : fixed || motion.matches ? "Text updated. No earthquakes required." : `It held. Stress is ${stress}%. The next edit is another gamble.`);
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
    say("Text rebuilt exactly as you entered it. Stress reset. You may keep typing or save your draft now.");
    input.focus({ preventScroll: true });
    input.setSelectionRange(input.value.length, input.value.length);
  });
  stage.querySelector("#quake-clear").addEventListener("click", () => {
    cancelAnimations();
    resetExhibit(stage);
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
    if (!matchesDemoText(input.value.trim().replace(/[.!?…]+$/u, ""), "Bring a notebook")) { say("Write the reminder Bring a notebook before saving. A final period, question mark, or exclamation mark is fine. Your draft is preserved."); return; }
    cancelAnimations();
    finished = true;
    paint();
    say("Draft saved in this demo: Bring a notebook. Your text is intact; nothing was stored outside this page.");
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
    if (motion.matches) {
      collapsed = false;
      debris = [];
      lastEditTime = null;
      stress = 0;
      risk = 0;
      if (!finished) say("Reduced motion enabled. Your text is intact; shaking and collapse are disabled.");
    }
    renderLetters();
    paint();
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
    `${fixed ? "Use the volume slider as usual: up increases the number and down decreases it." : `Adjusting a volume slider should be one quick movement. This one acts as if it's out in the wind: gusts rotate the control and change the number even after you let go.${worse ? " It can also turn upside down." : ""} Drag the handle, then save before the next gust.`} Aim for 37% (35-39% counts). This is a silent demo; your device's volume never changes.`,
    `<div class="wind-machine"><div class="wind-readout"><span id="wind-volume-label">PRETEND VOLUME</span><output id="wind-value">50%</output><span id="wind-weather"></span></div><div class="wind-field" id="wind-field"><div class="wind-streaks" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="wind-rotor" id="wind-slider" role="slider" tabindex="0" aria-labelledby="wind-volume-label" aria-describedby="wind-help" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-orientation="vertical"><span class="wind-end wind-high" aria-hidden="true">100</span><div class="wind-track" aria-hidden="true"></div><span class="wind-handle" id="wind-handle" aria-hidden="true"></span><span class="wind-end wind-low" aria-hidden="true">0</span></div><div class="wind-ground" aria-hidden="true">${fixed ? "CERTIFIED INDOOR AIR" : "DO NOT INSTALL CONTROLS OUTDOORS"}</div></div><p id="wind-help">Drag the handle, or focus it and use arrow keys. Page Up/Down adjust by 10; Home/End select the ends. Reduced motion keeps the track still, but gusts still affect the number.</p><button type="button" class="demo-button" id="wind-save">Save volume</button></div>`);
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
    say(`Video player volume set to ${displayed}%. Target reached; setting saved in this demo. Your real volume was never touched.`);
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
    fixed ? "Set the video player volume to 60% (58-62% counts) using the slider. No sound plays or device settings change." : `Instead of dragging a volume slider, play a Tetris-style game: move and rotate falling blocks to build a stack. More filled squares mean more volume; complete rows disappear and turn it down. Set the video player to 60% (58-62% counts), rather than maximum volume. Another block swaps only the falling piece.${worse ? " Blocks fall faster in this version." : ""} This demo is silent and never changes your device's volume.`,
    `<div class="tetris-machine"><label for="tetris-volume">Video player volume${fixed ? "" : " (controlled by settled blocks)"}</label><output id="tetris-value" for="tetris-volume">${fixed ? 50 : 0}%</output><input type="range" id="tetris-volume" min="0" max="100" value="${fixed ? 50 : 0}" ${fixed ? "" : "disabled"}>${fixed ? "" : `<div class="tetris-summary"><span id="tetris-fill">Target: 60% / 58-62% accepted</span><span id="tetris-piece-name"></span></div><div class="tetris-board" id="tetris-board" tabindex="0" role="group" aria-label="Falling block volume game" aria-describedby="tetris-help">${Array.from({ length: 120 }, (_, index) => `<span class="tetris-cell${index >= 40 ? " tetris-lower" : ""}" data-tetris-cell="${index}" aria-hidden="true"></span>`).join("")}</div><p id="tetris-help">With the board or any game button focused: Left/Right move, Up or R rotates, Down lowers. Space drops when the board is focused; on a button, Space activates that button. Completed rows disappear. Touch controls are below. Reduced motion uses manual drops only. Pause whenever you need to think.</p><div class="tetris-controls"><button type="button" class="plain-button" data-tetris-action="left" aria-label="Move block left">←</button><button type="button" class="plain-button" data-tetris-action="rotate" aria-keyshortcuts="ArrowUp r">Rotate (R / ↑)</button><button type="button" class="plain-button" data-tetris-action="right" aria-label="Move block right">→</button><button type="button" class="plain-button" data-tetris-action="down">Lower ↓</button><button type="button" class="demo-button" data-tetris-action="drop">Drop block</button></div><div class="new-actions"><button type="button" class="demo-button" id="tetris-play">Start game</button><button type="button" class="plain-button" id="tetris-another">Another block</button><button type="button" class="plain-button" id="tetris-empty">Empty speaker</button></div>`}</div>`);
  const volume = stage.querySelector("#tetris-volume");
  const output = stage.querySelector("#tetris-value");
  let achieved = false;
  if (fixed) {
    volume.addEventListener("input", () => {
      output.textContent = `${volume.value}%`;
      if (Number(volume.value) >= 58 && Number(volume.value) <= 62 && !achieved) {
        achieved = true;
        volume.disabled = true;
        say(`Video player volume set to ${volume.value}%. Target reached. No real sound or device setting changed.`);
        stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
      }
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
    stage.querySelector("#tetris-fill").textContent = `${filled} settled cells / target: 60% (58-62% counts)`;
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
      say(achieved ? "Stack jammed. Empty speaker to start a new attempt." : "Stack jammed before reaching the target. Empty speaker to try again; the goal is 60% (58-62% counts).");
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
    if (!jammed) say(cleared ? `${cleared === 1 ? "A completed row disappeared, taking its filled cells with it" : `${cleared} completed rows disappeared, taking their filled cells with them`}. Pretend volume is now ${volume.value}%.` : `Block settled. Pretend volume is ${volume.value}%. The target is 60% (58-62% counts).`);
    if (Number(volume.value) >= 58 && Number(volume.value) <= 62 && !achieved) {
      achieved = true;
      playing = false;
      stopTimer();
      paint();
      say(`Video player volume set to ${volume.value}%. Target reached; game paused. Resume starts a new attempt with this stack; Empty speaker starts fresh. No real sound played.`);
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    }
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
    if (achieved) {
      achieved = false;
      resetExhibit(stage);
    }
    playing = true;
    started = true;
    runTimer();
    paint();
    say(motion.matches ? "Manual gravity: use Lower or Drop block to reach 60% (58-62% counts)." : "Blocks are falling. Reach 60% (58-62% counts); completed rows disappear and lower the volume.");
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
    resetExhibit(stage);
    achieved = false;
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
    fixed ? "Set the video player volume to 65% using the slider. No sound plays or device settings change." : `You want to turn the sound up or down, but the slider has been replaced by a seesaw. Add weights to the right to raise the volume or to the left to lower it. Let the beam settle, then select Hold this volume. The required level is 65%.${worse ? " Every third addition makes the oldest weight on that side roll across to the opposite side, and balloons pull upward instead of weighing down." : ""} Release a completed volume to begin a new attempt, or Clear weights to start fresh. Only the demo number changes; no sound plays.`,
    `<div class="seesaw-machine"><label for="seesaw-volume">Video player volume</label><output id="seesaw-value">50%</output><input type="range" id="seesaw-volume" min="0" max="100" value="50" ${fixed ? "" : "disabled"}>${fixed ? "" : `<div class="seesaw-scene"><div class="seesaw-pivot" aria-hidden="true"></div><div class="seesaw-beam" id="seesaw-beam"><div class="seesaw-pan seesaw-left" id="seesaw-left" aria-label="Left weight tray"></div><div class="seesaw-pan seesaw-right" id="seesaw-right" aria-label="Right weight tray"></div></div></div><p class="seesaw-masses" id="seesaw-masses"></p><label for="seesaw-weight">Choose a weight</label><select id="seesaw-weight"><option value="0">Pebble: +1</option><option value="1">Brick: +3</option><option value="2">Anvil: +5</option>${worse ? '<option value="3">Balloon: -2 (pulls upward)</option>' : ""}</select><div class="seesaw-controls"><button type="button" class="plain-button" id="seesaw-add-left">Add to left</button><button type="button" class="plain-button" id="seesaw-add-right">Add to right</button><button type="button" class="plain-button" id="seesaw-remove-left">Remove left weight</button><button type="button" class="plain-button" id="seesaw-remove-right">Remove right weight</button></div><div class="new-actions"><button type="button" class="demo-button" id="seesaw-hold">Hold this volume</button><button type="button" class="plain-button" id="seesaw-reset">Clear weights</button></div><p class="seesaw-note">Maximum 12 weights. Reduced motion settles immediately. Holding freezes the number and weights until released.</p>`}</div>`);
  const output = stage.querySelector("#seesaw-value");
  const slider = stage.querySelector("#seesaw-volume");
  let achieved = false;
  if (fixed) {
    slider.addEventListener("input", () => {
      output.textContent = `${slider.value}%`;
      if (Number(slider.value) === 65 && !achieved) {
        achieved = true;
        slider.disabled = true;
        say("Video player volume set to 65%. Target reached. No real sound or device setting changed.");
        stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
      }
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
        say("The oldest weight on that side rolled across to the other end! The balance has changed.");
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
    if (!held && achieved) {
      achieved = false;
      resetExhibit(stage);
    }
    cancel();
    velocity = 0;
    paintWeights();
    if (!held) settle();
    say(held ? `Volume held at ${slider.value}%. ${Number(slider.value) === 65 ? "Target reached." : "The target is 65%; release the volume and adjust the weights."} No real volume changed.` : "Volume released. The weights are in charge again.");
    if (held && Number(slider.value) === 65 && !achieved) {
      achieved = true;
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    }
  });
  stage.querySelector("#seesaw-reset").addEventListener("click", () => {
    cancel();
    resetExhibit(stage);
    achieved = false;
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
    { id: "company", label: "Organization (optional)", type: "text", placeholder: "Cloud City Studio", limit: 60, optional: true },
    { id: "subject", label: "Subject", type: "text", placeholder: "A quiet request", limit: 80 },
    { id: "message", label: "Message", placeholder: "Please let me finish this form.", limit: 160 },
  ];
  shell("YOUR ATTENTION HAS 17 UNREAD MESSAGES", fixed ? "A moment of notification-free peace." : "Swat first. Form later.",
    fixed ? "Send a support request with a made-up name, email, subject, and message. Organization is optional. No alerts interrupt you, and nothing is actually sent." : `Send a support request using a made-up name, email, subject, and message. Organization is optional. Notification boxes start appearing when you type or paste and cover the form. Dismiss alerts that get in your way, or use Pause swarm and Swat one; you do not have to clear every alert to send.${worse ? " Alerts arrive faster, and a missed click creates another." : ""} These are part of the demo, not notifications from your device.`,
    `<div class="fly-machine">${fixed ? "" : '<div class="fly-tools"><button type="button" class="demo-button" id="fly-toggle" disabled>Starts when you type</button><button type="button" class="plain-button" id="fly-swat">Swat one</button><span id="fly-count">0 alerts / 0 swatted</span></div>'}<div class="fly-arena${fixed ? " fly-quiet" : ""}" id="fly-arena"><div class="fly-form-scroll"><form id="fly-form" novalidate>${fields.map(field => `<div class="fly-field${field.id === "message" ? " fly-wide" : ""}"><label for="fly-${field.id}">${field.label}</label>${field.type ? `<input type="${field.type}" id="fly-${field.id}" maxlength="${field.limit}" placeholder="${field.placeholder}" autocomplete="off" ${field.optional ? "" : "required"}>` : `<textarea id="fly-${field.id}" maxlength="${field.limit}" placeholder="${field.placeholder}" required></textarea>`}</div>`).join("")}<button class="demo-button" id="fly-finish">Send request</button></form></div>${fixed ? "" : '<div class="fly-layer" id="fly-layer"></div>'}</div></div>`);
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
      say("Your typing woke the swarm. Complete the required fields; swat alerts that obstruct the form, or pause whenever you need. Organization is optional; you do not have to clear every alert to send.");
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
    const missing = inputs.findIndex((input, index) => !fields[index].optional && input.value.trim().length < 2);
    if (missing >= 0) {
      say(`Complete ${fields[missing].label.toLowerCase()} with at least two characters. Use fictional information.`);
      inputs[missing].focus();
      return;
    }
    if (stage.querySelector("#fly-email").validity.typeMismatch) {
      say("Use a valid made-up email address, such as alex@example.test.");
      return;
    }
    finished = true;
    pause();
    flies.forEach(node => node.remove());
    flies.clear();
    paint();
    inputs.forEach(input => { input.readOnly = true; });
    stage.querySelector("#fly-finish").disabled = true;
    say("Support request sent in the demo. Your entries survived, and notifications have stopped. Nothing was actually sent or stored.");
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
