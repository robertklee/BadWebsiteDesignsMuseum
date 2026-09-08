import { createStageShell } from "./shared.js";

export const exhibits = [
  { id: "hover-menu", name: "The Hover Dependency", category: "Navigation", color: "pink", tagline: "I wanted a lamp. Not a mouse exam.", description: "One desk lamp. Several menus. Apparently you need the hands of a surgeon.", lesson: "The designer drew the menu open. Nobody asked how a person would get there.", fix: "Click-open menus stay open across gaps, touch gestures, and moments of hesitation.", worseChange: "The bridges now take a tiny twisting detour. So does your shopping trip.", preview: `<div class="new-preview preview-hover-tightrope"><span class="hover-preview-kicker">ONLINE SHOPPING / MOTOR SKILLS EXAM</span><strong>I JUST WANTED<br>A LAMP.</strong><div class="hover-preview-course" aria-hidden="true"><span class="hover-preview-shop">Shop +</span><i class="hover-preview-wire"></i><span class="hover-preview-destination">Desk lamps</span><b class="hover-preview-cursor">&#8598;</b><span class="hover-preview-fall">1 pixel later...</span></div><div class="hover-preview-verdict"><b>Menu closed.</b><span>Try being a surgeon.</span></div></div>`, render: renderHoverDependency },
  { id: "layout-earthquake", name: "The Layout Earthquake", category: "Content", color: "green", tagline: "The link was right there a second ago.", description: "Read the news while oversized ads push the story and its bookmark out of reach.", lesson: "Nobody reserved space for the content. Unfortunately, your click already had a reservation.", fix: "The ads have their own space. Your story stays where you left it.", worseChange: "The library story is further down, the ads are harder to shake, and even the columns won't sit still.", preview: `<div class="new-preview preview-earthquake-paper"><span class="earthquake-preview-masthead">THE DAILY DISPLACEMENT</span><strong>Just one quick article.</strong><img src="/assets/library.jpg" alt="" width="1200" height="800"><div class="earthquake-preview-ad"><span>BREAKING: SPONSORED CONTENT</span><b>THIS AD HAS<br>RIGHT OF WAY.</b><small>Your article can take the stairs.</small></div><span class="earthquake-preview-link">Read arti&hellip; <i aria-hidden="true">&#8595;</i></span><span class="earthquake-preview-pointer" aria-hidden="true">&#8598;</span><small class="earthquake-preview-punchline">You clicked here.<br>The article didn't.</small></div>`, render: renderLayoutEarthquake },
  { id: "validation-afterthought", name: "The Validation Afterthought", category: "Forms", color: "blue", tagline: "Four fields. One error. Start over.", description: "Hidden registration rules arrive one rejection at a time, taking the rest with them.", lesson: "The form knew the requirements all along. Apparently that information was on a need-to-fail basis.", fix: "Requirements are visible, errors belong to their fields, and your other answers stay put.", worseChange: "Useful guidance has been replaced by one cryptic complaint.", preview: `<div class="new-preview preview-validation-rejection"><span class="validation-preview-kicker">APPLICATION / NOT EVEN CLOSE</span><strong class="validation-preview-verdict">INVALID.</strong><div class="validation-preview-question"><b>Which field?</b><span>That's a secret.</span></div><div class="validation-preview-answers"><span>NAME <s>Alex Example</s></span><span>EMAIL <s>alex@example.test</s></span><b>ANSWERS DELETED</b></div><small class="validation-preview-footer">Start over. Guess better.</small></div>`, render: renderValidationAfterthought },
  { id: "scroll-modal", name: "The Scroll-Through Modal", category: "Interaction", color: "lilac", tagline: "You're scrolling. Just not the dialog.", description: "Save one day for $5,000. Free delivery? Keep scrolling. Wrong window.", lesson: "Two scroll containers entered. The one you couldn't use got every gesture.", fix: "The active dialog owns its scrolling, and the background stays still.", worseChange: "Shipping speed requires a third dialog, opened from the bottom of the second. Each gesture randomly scrolls one, two, or all three layers, sometimes in opposite directions.", preview: `<div class="new-preview preview-scroll-checkout"><div class="scroll-preview-back"><span>YOUR ORDER</span><span>Delivery: still deciding</span></div><div class="scroll-preview-front"><span class="scroll-preview-title">DELIVERY OPTIONS <b aria-hidden="true">&times;</b></span><span class="scroll-preview-offer">SAVE ONE DAY.</span><strong>$5,000</strong><small>One day. Five grand.</small><span class="scroll-preview-free">Free? Further down.</span><i class="scroll-preview-rail" aria-hidden="true"></i></div><span class="scroll-preview-punchline">YOU SCROLLED THE WRONG WINDOW.</span></div>`, render: renderScrollModal },
];

function renderLayoutEarthquake({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const { shell, say } = createStageShell(stage);
  shell("THE DAILY DISPLACEMENT", "News that won't stay put.", "Find the article 'The public library opens late' and bookmark it.",
    `<div class="web-demo earthquake-paper"><div class="web-tools news-tools"><button class="demo-button" id="edition-open">Load live edition</button><button class="plain-button" id="edition-pause" disabled>Pause loading</button><button class="plain-button" id="edition-step" hidden>Load next section</button><output id="edition-state">Edition ready</output></div><div class="web-viewport news-viewport" tabindex="0" aria-label="Newspaper"><header class="news-masthead"><div class="news-edition"><span>INDEPENDENT SINCE THIS MORNING</span><span>VOL. 01 / CITY EDITION</span></div><h3>The Daily Displacement</h3><div class="news-sections"><span>LOCAL</span><span>CULTURE</span><span>TRANSPORT</span><span class="news-live">LIVE EDITION</span></div></header><div id="news-feed"><div class="news-insert" data-slot="0"></div><div class="news-front"><article class="news-lead"><span class="news-category">NEIGHBORHOOD / THE BIG READ</span><h3>The public library opens late</h3><p>More time for the next chapter. The reading room is keeping its lights on until nine.</p><figure class="news-photo"><img src="/assets/library.jpg" alt="Rows of books and reading tables inside a public library" width="1200" height="800"><figcaption>A longer evening between the shelves. / City desk</figcaption></figure><div class="news-insert" data-slot="1"></div><div class="news-byline"><span>By the City Desk / 3 min read</span><button class="demo-button" data-article="library">Read library article</button></div></article><aside class="news-briefs" aria-label="More headlines"><span class="news-column-label">ELSEWHERE TODAY</span><article><span class="news-category">TRANSPORT</span><h3>A new timetable. Eventually.</h3><p>The last bus is running late. So is the announcement.</p><button class="plain-button" data-article="transport">Read transport report</button></article><article><span class="news-category">CULTURE</span><h3>A museum of questionable decisions</h3><p>Critics describe the new collection as deeply inconvenient.</p><button class="plain-button" data-article="museum">Read museum article</button></article><div class="news-insert" data-slot="2"></div></aside></div><footer class="news-footer">ALL THE NEWS THAT FITS. PLUS THE ADS THAT DON'T.</footer></div><section id="news-story" tabindex="-1" hidden></section></div></div>`);
  const feed = stage.querySelector("#news-feed");
  const story = stage.querySelector("#news-story");
  const pause = stage.querySelector("#edition-pause");
  const step = stage.querySelector("#edition-step");
  const state = stage.querySelector("#edition-state");
  const viewport = stage.querySelector(".news-viewport");
  if (!fixed) {
    const front = stage.querySelector(".news-front");
    const briefs = stage.querySelector(".news-briefs");
    front.classList.add("news-buried-library");
    front.insertBefore(briefs, front.firstElementChild);
    if (worse) {
      front.classList.add("news-deep-library");
      briefs.insertAdjacentHTML("beforeend", `<article><span class="news-category">CITY LIFE</span><h3>The queue for the new cafe now has its own postcode.</h3><p>Residents are advised to bring a book. And possibly a second book.</p><button class="plain-button" data-article="cafe">Read cafe report</button></article><article><span class="news-category">WEATHER</span><h3>Tomorrow's forecast delayed by today's weather.</h3><p>The outlook remains uncertain, but the statement is confidently formatted.</p><button class="plain-button" data-article="weather">Read weather report</button></article>`);
    }
  }
  if (worse) {
    feed.insertAdjacentHTML("afterbegin", '<div class="news-insert news-extra" data-slot="3"></div>');
    stage.querySelector(".news-lead .news-photo").insertAdjacentHTML("beforebegin", '<div class="news-insert news-extra" data-slot="4"></div>');
    stage.querySelector(".news-byline").insertAdjacentHTML("beforebegin", '<div class="news-insert news-extra" data-slot="5"></div>');
  }
  const slots = [...stage.querySelectorAll("[data-slot]")];
  const heights = worse ? [[300, 0, 0, 140, 0, 0], [300, 340, 0, 0, 240, 0], [0, 340, 240, 160, 0, 220], [360, 0, 240, 0, 280, 0], [0, 380, 0, 140, 0, 260], [320, 0, 260, 0, 240, 0], [0, 340, 260, 180, 0, 220], [360, 340, 0, 0, 280, 0], [0, 0, 260, 160, 0, 260], [300, 320, 240, 0, 240, 0]] : fixed ? [[160, 0, 0], [160, 180, 0], [220, 180, 0], [220, 180, 160], [240, 220, 160], [240, 220, 180]] : [[160, 0, 0], [160, 180, 0], [0, 180, 160], [220, 0, 160], [0, 220, 0], [240, 0, 180]];
  const reserved = [240, 220, 180];
  const dismissed = new Set();
  let timer;
  let started = false;
  let paused = false;
  let updates = 0;
  let complete = false;
  let intercepted = 0;
  const interceptionLimit = fixed ? 0 : worse ? 4 : 2;
  const stop = () => { clearInterval(timer); timer = undefined; };
  const paintInsert = (slot, index, height) => {
    const hidden = dismissed.has(index);
    slot.style.height = `${fixed ? reserved[index] : hidden ? 0 : height}px`;
    slot.classList.toggle("news-insert-reserved", fixed && (!height || hidden));
    if (!height || hidden) { slot.innerHTML = fixed ? '<span class="news-reserved-label">ADVERTISEMENT</span>' : ""; return; }
    if (index >= 3) {
      const [label, title, description] = [
        ["BREAKING / CITY DESK", "An update before your update.", "The city has issued another statement about an upcoming statement."],
        ["THE DAILY EMAIL", "Make room in your inbox.", "Every headline. Every morning. Every available inch of this page."],
        ["READ THIS NEXT", "Three more stories. Right here.", "Your next read has arrived before you finished this one."],
      ][index - 3];
      slot.innerHTML = `<div class="news-ad-copy"><span>${label}</span><strong>${title}</strong><p>${description}</p></div><button class="plain-button news-dismiss" type="button" data-dismiss="${index}" aria-label="Dismiss ${label}" title="Dismiss placement">&#215;</button>`;
      return;
    }
    slot.innerHTML = index === 2
      ? `<img src="/share/museum.png" alt="Really Bad Design Museum" width="1200" height="630">`
      : `<div class="news-ad-copy"><span>PAID PLACEMENT / ${index ? "RECOMMENDED FOR YOU" : "A WORD FROM OUR SPONSOR"}</span><strong>${index ? "Before you read on.<br>A word about premium." : "Your attention.<br>Now available to rent."}</strong><p>${index ? "The story can wait. This offer apparently cannot." : "An announcement with an unusually large footprint."}</p></div><button class="plain-button news-dismiss" type="button" data-dismiss="${index}" aria-label="Dismiss ${index ? "recommendation" : "sponsor"}" title="Dismiss advertisement">&#215;</button>`;
  };
  const paint = () => {
    const sizes = updates ? heights[(updates - 1) % heights.length] : [0, 0, 0, 0, 0, 0];
    viewport.classList.toggle("news-squeezed", worse && updates > 0 && updates % 3 !== 0);
    slots.forEach(slot => {
      const index = Number(slot.dataset.slot);
      paintInsert(slot, index, sizes[index]);
    });
    story.querySelectorAll("[data-story-slot]").forEach(slot => {
      const index = Number(slot.dataset.storySlot);
      paintInsert(slot, index, sizes[index]);
    });
  };
  const advance = () => {
    if (!started || paused || complete || (fixed && updates >= heights.length)) return;
    if (worse) dismissed.clear();
    updates++;
    paint();
    state.textContent = fixed ? updates === heights.length ? "All sections loaded" : `Loading section ${updates} / ${heights.length}` : `Live update ${updates}`;
    if (fixed && updates === heights.length) { stop(); pause.disabled = true; step.disabled = true; }
  };
  const schedule = () => {
    stop();
    step.hidden = !reduced.matches || !started;
    step.disabled = paused || complete || (fixed && updates >= heights.length);
    if (started && !paused && !complete && !reduced.matches && (!fixed || updates < heights.length)) timer = setInterval(() => {
      if (!document.hidden) advance();
    }, worse ? 1100 : 1800);
  };
  const start = () => {
    if (started || complete) return;
    started = true;
    stage.querySelector("#edition-open").disabled = true;
    pause.disabled = false;
    state.textContent = "Loading images and recommendations";
    schedule();
  };
  stage.querySelector("#edition-open").addEventListener("click", start);
  const startEvents = ["pointerenter", "pointerdown", "focusin", "keydown", "wheel", "scroll"];
  startEvents.forEach(type => viewport.addEventListener(type, start, { passive: true }));
  stage.querySelector(".news-viewport").addEventListener("click", event => {
    const dismiss = event.target.closest("[data-dismiss]");
    if (!dismiss) return;
    dismissed.add(Number(dismiss.dataset.dismiss));
    const focusTarget = story.hidden ? stage.querySelector('[data-article="library"]') : story.querySelector("#news-bookmark");
    paint();
    focusTarget.focus({ preventScroll: true });
    say(worse && !complete ? "Ad closed. Don't get too comfortable." : "Ad closed. Back to the news.");
  });
  pause.addEventListener("click", () => {
    paused = !paused;
    pause.textContent = paused ? "Resume loading" : "Pause loading";
    pause.setAttribute("aria-pressed", String(paused));
    schedule();
  });
  step.addEventListener("click", advance);
  stage.querySelectorAll("[data-article]").forEach(button => button.addEventListener("click", () => {
    start();
    if (button.dataset.article === "library" && intercepted < interceptionLimit) {
      intercepted++;
      const intrusion = document.createElement("section");
      intrusion.className = `news-click-intrusion${worse ? " news-click-intrusion-large" : ""}`;
      intrusion.tabIndex = -1;
      intrusion.setAttribute("aria-label", "Advertisement before the article");
      const messages = ["You clicked. We monetized.", "One more thing before your one thing.", "This space was your article.", "Your patience is valuable ad inventory."];
      intrusion.innerHTML = `<span>A WORD FROM OUR SPONSOR</span><h3>${messages[intercepted - 1]}</h3><p>${worse ? "Our sponsor asked for more room. We gave them yours." : "The article was here a moment ago. This announcement needed the spot."}</p><button type="button" class="plain-button news-click-dismiss">Close ad</button>`;
      const scrollTop = viewport.scrollTop;
      button.before(intrusion);
      viewport.scrollTop = scrollTop;
      intrusion.focus({ preventScroll: true });
      intrusion.querySelector("button").addEventListener("click", () => {
        intrusion.remove();
        button.focus({ preventScroll: true });
      });
      say(intercepted === interceptionLimit ? "That was the last ad. Your story is just below it." : "You asked for the story. Our sponsor answered first.");
      return;
    }
    feed.hidden = true;
    story.hidden = false;
    const library = button.dataset.article === "library";
    story.innerHTML = `<button class="plain-button" id="news-back">Back to headlines</button><div class="news-insert" data-story-slot="0"></div><div class="news-story-copy"><span class="news-category">${library ? "NEIGHBORHOOD" : "CITY DESK"} / TODAY</span><h3>${library ? "The public library opens late" : button.dataset.article === "museum" ? "A museum of questionable decisions" : "A new timetable. Eventually."}</h3><p class="news-standfirst">${library ? "An extra chapter for the city: the reading room will stay open until 9 pm from Monday." : "An interesting development, but not the library story you came to bookmark."}</p><span class="news-story-byline">THE CITY DESK / 3 MIN READ</span>${library ? `<figure class="news-photo"><img src="/assets/library.jpg" alt="Library shelves and reading tables" width="1200" height="800"><figcaption>More room in the day for a good book.</figcaption></figure><p>Evening visitors will have access to the reading room and lending desk. The new hours give commuters a chance to stop by after work, without racing the closing announcement.</p><p>The change follows requests from residents for a quiet place to read in the evening. Entry remains free, and no appointment is needed.</p>` : `<p>The full report is available in today's edition. The library opening-hours announcement is under Neighborhood.</p>`}<div class="news-insert" data-story-slot="1"></div><div class="news-story-end"><span>KEEP THIS STORY FOR LATER</span><button class="demo-button" id="news-bookmark">Bookmark article</button></div></div>`;
    if (!library) {
      story.querySelector(".news-story-copy>h3").textContent = button.closest("article").querySelector("h3").textContent;
    }
    if (worse) {
      story.querySelector(".news-story-copy").insertAdjacentHTML("afterbegin", '<div class="news-insert news-extra" data-story-slot="3"></div>');
      story.querySelector(".news-story-byline").insertAdjacentHTML("afterend", '<div class="news-insert news-extra" data-story-slot="4"></div>');
      story.querySelector(".news-story-end").insertAdjacentHTML("beforebegin", '<div class="news-insert news-extra" data-story-slot="5"></div>');
    }
    paint();
    viewport.scrollTop = 0;
    story.focus();
    story.querySelector("#news-back").addEventListener("click", () => { story.hidden = true; feed.hidden = false; button.focus(); });
    story.querySelector("#news-bookmark").addEventListener("click", event => {
      if (!library) { say("Not the library story. Have another look at the headlines."); return; }
      if (complete) return;
      complete = true;
      stop();
      pause.disabled = true;
      step.disabled = true;
      state.textContent = "Edition settled";
      event.currentTarget.disabled = true;
      say("You found the library story. Even the ads have gone quiet.");
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    });
  }));
  paint();
  reduced.addEventListener("change", schedule);
  return () => {
    stop();
    reduced.removeEventListener("change", schedule);
    startEvents.forEach(type => viewport.removeEventListener(type, start));
  };
}

function renderHoverDependency({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const { shell, say } = createStageShell(stage);
  const path = ["Shop", "Home", "Lighting", ...(worse ? ["Desk lamps"] : []), "Pivot desk lamp"];
  shell("ATELIER / OBJECTS FOR EVERYDAY", "A lamp, several menus away.", "Open the Pivot desk lamp product page.",
    `<div class="web-demo hover-shop ${worse ? "hover-hostile" : ""}"><div class="web-tools"><label><input type="checkbox" id="menu-hold" ${reduced.matches ? "checked" : ""}> Hold menu open</label><button class="plain-button" id="menu-close" aria-label="Close product menus" title="Close product menus">&#215;</button></div><nav class="hover-navigation" aria-label="Product categories">${path.map((name, index) => `<div class="hover-level" data-level="${index}" ${index ? "hidden" : ""}><button class="${index === path.length - 1 ? "demo-button" : "plain-button"}" data-depth="${index}" ${index < path.length - 1 ? `aria-expanded="false" aria-controls="hover-level-${index + 1}"` : ""}>${name}${index < path.length - 1 ? " +" : ""}</button>${index ? `<button class="plain-button" data-other="${index}">${["", "Outdoor", "Textiles", "Ceiling lights", "Studio lamp"][index]}</button>` : ""}</div>`).join("")}</nav><div class="hover-merch"><span>THE EVERYDAY COLLECTION</span><div class="web-lamp" role="img" aria-label="Pivot desk lamp"><i></i><b></b></div><h3>Light. Within reach, allegedly.</h3></div><section id="hover-product" tabindex="-1" hidden><h3>Pivot desk lamp</h3><p>Adjustable arm. Warm light. $48. No purchase required.</p></section></div>`);
  const levels = [...stage.querySelectorAll("[data-level]")];
  levels.forEach((level, index) => {
    level.id = `hover-level-${index}`;
    if (index) {
      const bridge = document.createElement("div");
      bridge.className = "hover-bridge";
      bridge.setAttribute("aria-hidden", "true");
      bridge.innerHTML = "<span></span>".repeat(worse ? 5 : 1);
      level.prepend(bridge);
    }
  });
  const hold = stage.querySelector("#menu-hold");
  const navigation = stage.querySelector(".hover-navigation");
  let deadline;
  let gap;
  let complete = false;
  let open = false;
  let pointerNavigation = true;
  const clear = () => { clearTimeout(deadline); clearTimeout(gap); };
  const close = () => {
    clear();
    open = false;
    const restoreFocus = levels.slice(1).some(level => level.contains(document.activeElement));
    levels.slice(1).forEach(level => { level.hidden = true; });
    navigation.querySelectorAll("[aria-expanded]").forEach(button => button.setAttribute("aria-expanded", "false"));
    if (restoreFocus) levels[0].querySelector("button").focus({ preventScroll: true });
  };
  const arm = () => {
    clearTimeout(deadline);
    if (pointerNavigation && !fixed && !hold.checked && !complete && open && !document.hidden) deadline = setTimeout(() => { close(); say("Navigation expired. The shop is still at the top."); }, worse ? 2200 : 4000);
  };
  const expand = depth => {
    if (complete) return;
    if (depth === path.length - 1) {
      complete = true;
      clear();
      stage.querySelector(".hover-merch").hidden = true;
      stage.querySelector("#hover-product").hidden = false;
      stage.querySelector("#hover-product").focus();
      say("Pivot desk lamp found. No purchase made.");
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
      return;
    }
    open = true;
    levels.forEach((level, index) => { if (index <= depth + 1) level.hidden = false; });
    navigation.querySelectorAll("[aria-expanded]").forEach(button => button.setAttribute("aria-expanded", String(!levels[Number(button.dataset.depth) + 1].hidden)));
    arm();
  };
  navigation.addEventListener("pointerdown", event => {
    pointerNavigation = event.pointerType === "mouse";
    clear();
  });
  navigation.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (button?.hasAttribute("data-depth")) expand(Number(button.dataset.depth));
    else if (button) { close(); say("That department doesn't contain the Pivot desk lamp."); }
  });
  levels.forEach(level => {
    level.addEventListener("pointerenter", () => { clearTimeout(gap); });
    level.addEventListener("pointerleave", event => {
      if (event.pointerType !== "mouse" || !pointerNavigation || fixed || hold.checked || complete || !open) return;
      gap = setTimeout(() => { close(); say("You left the menu. So did the menu."); }, worse ? 45 : 130);
    });
  });
  navigation.addEventListener("pointerover", event => {
    const button = event.target.closest("[data-depth]");
    if (!fixed && event.pointerType === "mouse" && button && Number(button.dataset.depth) < path.length - 1) {
      pointerNavigation = true;
      expand(Number(button.dataset.depth));
    }
  });
  navigation.addEventListener("focusin", arm);
  navigation.addEventListener("keydown", event => {
    pointerNavigation = false;
    clear();
    if (event.key === "Escape" && open) { event.stopPropagation(); close(); }
  });
  hold.addEventListener("change", () => { clear(); arm(); });
  stage.querySelector("#menu-close").addEventListener("click", close);
  const visibility = () => { clear(); if (!document.hidden) arm(); };
  document.addEventListener("visibilitychange", visibility);
  return () => { clear(); document.removeEventListener("visibilitychange", visibility); };
}

function renderValidationAfterthought({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  const fields = [
    { id: "name", label: "Guest name", rule: "Use at least two words, such as Alex Example.", valid: value => value.trim().split(/\s+/).length >= 2 },
    { id: "email", label: "Demo email", rule: "Use an address ending in .test, such as alex@example.test.", valid: value => /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.test$/i.test(value.trim()) },
    { id: "reference", label: "Booking reference", rule: "Use EVT- followed by exactly four digits, such as EVT-2048.", valid: value => /^EVT-\d{4}$/.test(value) },
    { id: "seats", label: "Seats", rule: "Use a single digit from 1 to 4.", valid: value => /^[1-4]$/.test(value) },
  ];
  shell("OPEN HOUSE / GUEST REGISTRATION", "Reserve your imaginary place.", "Register for a fictional studio open house. Use invented details only.",
    `<div class="web-demo registration-site"><header class="web-masthead">STUDIO OPEN HOUSE <small>SATURDAY / ADMISSION IS FICTIONAL</small></header><form id="afterthought-form" novalidate autocomplete="off"><div id="registration-error" class="registration-error" role="alert" hidden></div>${fields.map(field => `<div class="registration-field"><label for="registration-${field.id}">${field.label}</label><input id="registration-${field.id}" name="${field.id}" type="text" maxlength="100" ${fixed ? `aria-describedby="rule-${field.id} error-${field.id}"` : ""}><small id="rule-${field.id}" ${fixed ? "" : "hidden"}>${field.rule}</small><span class="registration-field-error" id="error-${field.id}"></span></div>`).join("")}<button class="demo-button" type="submit">Reserve demo place</button></form></div>`);
  const form = stage.querySelector("form");
  const banner = stage.querySelector("#registration-error");
  let complete = false;
  const mark = field => {
    const input = form.elements.namedItem(field.id);
    const valid = field.valid(input.value);
    input.setAttribute("aria-invalid", String(!valid));
    stage.querySelector(`#error-${field.id}`).textContent = valid ? "" : field.rule;
    return valid;
  };
  if (fixed) fields.forEach(field => form.elements.namedItem(field.id).addEventListener("input", () => mark(field)));
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (complete) return;
    const invalid = fields.find(field => !field.valid(form.elements.namedItem(field.id).value));
    if (invalid) {
      if (fixed) {
        fields.forEach(mark);
        form.elements.namedItem(invalid.id).focus();
      } else {
        const rejected = form.elements.namedItem(invalid.id).value;
        form.reset();
        form.elements.namedItem(invalid.id).value = rejected;
        banner.hidden = false;
        banner.textContent = `${worse ? "Registration unsuccessful." : `${invalid.label} rejected.`} ${invalid.rule} Other answers have been cleared.`;
        if (!worse) form.elements.namedItem(invalid.id).focus();
        say("Registration not submitted. Your other answers were discarded.");
      }
      return;
    }
    complete = true;
    banner.hidden = true;
    form.querySelector("button").disabled = true;
    say("Your fictional place is reserved. Nothing was sent or stored.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  return () => {};
}

function renderScrollModal({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  shell("ATELIER / DELIVERY", worse ? "One parcel. Three scrollbars." : "One parcel. Two scrollbars.", "Choose free Standard delivery for a fictional order.",
    `<div class="web-demo"><div class="web-tools"><button class="demo-button" id="delivery-open">Choose delivery</button><output id="delivery-background">Order page: 0 px</output></div><div class="delivery-host"><div class="delivery-background" tabindex="0" aria-label="Fictional order page"><header class="web-masthead">YOUR ORDER <small>ONE PIVOT DESK LAMP / $48</small></header>${["Order summary", "Packaging", "Dispatch", "Returns", "More from Atelier", "Even more from Atelier"].map((title, index) => `<section><span>0${index + 1}</span><h3>${title}</h3><p>${index ? "Your parcel will exist only in this demonstration. There is no payment or shipment." : "Pivot desk lamp. Brushed steel. Warm light. Delivery not yet selected."}</p></section>`).join("")}</div><div class="delivery-overlay" hidden><section class="delivery-dialog" role="dialog" aria-label="Delivery options"><header><h3 id="delivery-heading" tabindex="-1">Delivery options</h3><button class="plain-button" id="delivery-close" aria-label="Close delivery dialog" title="Close delivery dialog">&#215;</button></header><div class="delivery-scroll-layout"><div class="delivery-body" tabindex="0" aria-label="Delivery information"></div><input id="delivery-scroll" type="range" min="0" max="100" value="0" aria-label="Dialog scroll position" aria-orientation="vertical" ${fixed ? "hidden" : ""}></div></section></div></div></div>`);
  const background = stage.querySelector(".delivery-background");
  const overlay = stage.querySelector(".delivery-overlay");
  const body = stage.querySelector(".delivery-body");
  const heading = stage.querySelector("#delivery-heading");
  const slider = stage.querySelector("#delivery-scroll");
  const trigger = stage.querySelector("#delivery-open");
  stage.querySelector("#delivery-background").remove();
  stage.querySelector(".web-tools").remove();
  const checkout = document.createElement("section");
  checkout.className = "delivery-checkout";
  checkout.innerHTML = `<h3>Ready for checkout</h3><dl class="catalog-specs"><dt>Pivot desk lamp</dt><dd>$48.00</dd><dt>Quantity</dt><dd>1</dd><dt>Delivery</dt><dd>Not selected</dd><dt>Subtotal</dt><dd>$48.00</dd></dl>`;
  checkout.append(trigger);
  const checkoutFooter = document.createElement("footer");
  checkoutFooter.className = "delivery-checkout-footer";
  checkoutFooter.innerHTML = `<p>Delivery options are confirmed before payment. Prices are in imaginary dollars; this demo will never request a card or place an order.</p><h4>ATELIER / CUSTOMER CARE</h4><p>Returns within 30 fictional days. Packaging considered carefully. Questions answered eventually.</p><small>Privacy &nbsp; / &nbsp; Returns &nbsp; / &nbsp; Contact<br>Atelier demonstration store. All orders are fictional.</small>`;
  background.append(checkout, checkoutFooter);
  const dialog = stage.querySelector(".delivery-dialog");
  const notice = document.createElement("section");
  notice.className = "delivery-notice delivery-dialog";
  notice.setAttribute("role", "dialog");
  notice.setAttribute("aria-label", "Before we deliver");
  notice.hidden = true;
  notice.innerHTML = `<header><h3 tabindex="-1">Before we deliver</h3><button class="plain-button" id="delivery-notice-close" aria-label="Close delivery notice" title="Close delivery notice">&#215;</button></header><div class="delivery-scroll-layout"><div class="delivery-notice-body delivery-body" tabindex="0" aria-label="Delivery notice information"><p>One last note about your imaginary parcel.</p>${["A place for your parcel", "A little extra care", "A change of plans", "Our delivery promise"].map(title => `<section><h4>${title}</h4><p>Our fictional courier may leave your parcel at the agreed location. Keep the entrance clear and the delivery instructions up to date. No real address is needed, and nothing will be shipped.</p></section>`).join("")}<button class="demo-button" id="delivery-notice-done">Back to delivery choices</button></div><input id="delivery-notice-scroll" type="range" min="0" max="100" value="0" aria-label="Notice scroll position" aria-orientation="vertical"></div>`;
  if (worse) overlay.append(notice);
  const noticeBody = notice.querySelector(".delivery-notice-body");
  noticeBody.classList.remove("delivery-body");
  const noticeSlider = notice.querySelector("#delivery-notice-scroll");
  const speedChoices = `<fieldset class="delivery-speeds"><legend>Shipping speed</legend><label><input type="radio" name="delivery-service" value="express"> Fastest / 2 days / $5,000<small>One day faster than free delivery.</small></label><label><input type="radio" name="delivery-service" value="standard"> ${fixed ? "Standard delivery" : "I'm OK waiting an extra day"} / 3 days / Free</label></fieldset>`;
  const speedDone = notice.querySelector("#delivery-notice-done");
  notice.setAttribute("aria-label", "Choose shipping speed");
  notice.querySelector("h3").textContent = "Choose shipping speed";
  notice.querySelector("#delivery-notice-close").setAttribute("aria-label", "Close shipping speed choices");
  noticeBody.setAttribute("aria-label", "Shipping speed information");
  speedDone.insertAdjacentHTML("beforebegin", speedChoices);
  speedDone.textContent = "Confirm shipping speed";
  speedDone.disabled = true;
  noticeBody.querySelectorAll('input[name="delivery-service"]').forEach(input => input.addEventListener("change", () => { speedDone.disabled = false; }));
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const bounces = new Map();
  const stopBounces = () => {
    bounces.forEach(animation => animation.cancel());
    bounces.clear();
  };
  const scrollWithBounce = (element, delta) => {
    const maximum = Math.max(0, element.scrollHeight - element.clientHeight);
    const requested = element.scrollTop + delta;
    element.scrollTop = Math.max(0, Math.min(maximum, requested));
    if (requested >= 0 && requested <= maximum) return;
    if (reducedMotion.matches || bounces.get(element)?.playState === "running") return;
    const distance = -Math.sign(delta) * Math.min(24, 8 + Math.abs(delta) * 0.12);
    const animation = element.animate([
      { transform: "translateY(0)", offset: 0 },
      { transform: `translateY(${distance}px)`, offset: 0.25 },
      { transform: `translateY(${-distance * 0.18}px)`, offset: 0.65 },
      { transform: "translateY(0)", offset: 1 },
    ], { duration: 420, easing: "ease-out" });
    bounces.set(element, animation);
    animation.onfinish = () => { bounces.delete(element); };
  };
  let scrollTargets = null;
  let lastWheel = -Infinity;
  const combinations = [];
  for (const pageDirection of [-1, 0, 1]) {
    for (const dialogDirection of [-1, 0, 1]) {
      for (const noticeDirection of [-1, 0, 1]) {
        if (pageDirection || dialogDirection || noticeDirection) combinations.push([pageDirection, dialogDirection, noticeDirection]);
      }
    }
  }
  const startGesture = () => {
    const available = notice.hidden ? combinations.filter(directions => directions[2] === 0) : combinations;
    scrollTargets = worse ? available[Math.floor(Math.random() * available.length)] : [1, 0, 0];
  };
  const routeScroll = delta => {
    if (!scrollTargets) startGesture();
    [background, body, noticeBody].forEach((element, index) => {
      if (scrollTargets[index]) scrollWithBounce(element, delta * scrollTargets[index]);
    });
  };
  let nested = false;
  let savedScroll = 0;
  let selected = "";
  let complete = false;
  const sync = () => {
    const maximum = body.scrollHeight - body.clientHeight;
    slider.value = maximum > 0 ? String(Math.round(body.scrollTop / maximum * 100)) : "0";
    slider.setAttribute("aria-valuetext", `${slider.value} percent through delivery dialog`);
  };
  const closeNotice = () => {
    stopBounces();
    notice.hidden = true;
    dialog.inert = false;
    overlay.classList.remove("delivery-stacked");
    scrollTargets = null;
    lastWheel = -Infinity;
    (body.querySelector("#delivery-details") || heading).focus({ preventScroll: true });
  };
  const openNotice = () => {
    stopBounces();
    notice.hidden = false;
    dialog.inert = true;
    overlay.classList.add("delivery-stacked");
    scrollTargets = null;
    lastWheel = -Infinity;
    noticeBody.scrollTop = 0;
    noticeSlider.value = "0";
    noticeSlider.setAttribute("aria-valuetext", "0 percent through delivery notice");
    noticeBody.querySelectorAll('input[name="delivery-service"]').forEach(input => { input.checked = input.value === selected; });
    speedDone.disabled = !selected;
    notice.querySelector("h3").focus({ preventScroll: true });
  };
  notice.querySelector("#delivery-notice-close").addEventListener("click", closeNotice);
  speedDone.addEventListener("click", () => {
    const choice = noticeBody.querySelector('input[name="delivery-service"]:checked');
    if (!choice) return;
    selected = choice.value;
    body.querySelector("#delivery-speed-summary").textContent = selected === "standard" ? "I'm OK waiting an extra day / 3 days / Free" : "Fastest / 2 days / $5,000";
    body.querySelector("#delivery-confirm").disabled = false;
    closeNotice();
  });
  noticeSlider.addEventListener("input", () => { noticeBody.scrollTop = Number(noticeSlider.value) / 100 * (noticeBody.scrollHeight - noticeBody.clientHeight); });
  noticeBody.addEventListener("scroll", () => {
    const maximum = noticeBody.scrollHeight - noticeBody.clientHeight;
    noticeSlider.value = maximum > 0 ? String(Math.round(noticeBody.scrollTop / maximum * 100)) : "0";
    noticeSlider.setAttribute("aria-valuetext", `${noticeSlider.value} percent through delivery notice`);
  });
  const close = () => { stopBounces(); notice.hidden = true; dialog.inert = false; overlay.classList.remove("delivery-stacked"); overlay.hidden = true; background.inert = false; trigger.focus({ preventScroll: true }); };
  const delivery = () => {
    stopBounces();
    nested = false;
    heading.textContent = "Delivery options";
    body.innerHTML = `<p class="delivery-intro">A little information before your parcel goes nowhere.</p>${["Dispatch times", "Packaging standards", "Delivery area", "Missed deliveries"].map(title => `<section><h4>${title}</h4><p>Orders are prepared on fictional business days. Packaging is recyclable in theory. There is no real parcel, address, carrier, charge, or delivery.</p></section>`).join("")}<button class="plain-button" id="delivery-details">${worse ? "Choose shipping speed" : "Delivery details"}</button>${worse ? `<p id="delivery-speed-summary">${selected === "standard" ? "I'm OK waiting an extra day / 3 days / Free" : selected === "express" ? "Fastest / 2 days / $5,000" : "Shipping speed not selected"}</p>` : speedChoices}<button class="demo-button" id="delivery-confirm" ${worse && !selected ? "disabled" : ""}>Use this delivery</button>`;
    body.scrollTop = savedScroll;
    sync();
    body.querySelectorAll("input").forEach(input => {
      input.checked = input.value === selected;
      input.addEventListener("change", () => { selected = input.value; });
    });
    body.querySelector("#delivery-details").addEventListener("click", () => {
      if (worse) { openNotice(); return; }
      stopBounces();
      savedScroll = body.scrollTop;
      nested = true;
      heading.textContent = "Delivery details";
      body.innerHTML = `<h4>Standard service</h4><p>Free. Three fictional days. No signature, payment, or address required for this demonstration.</p><h4>Fastest service</h4><p>$5,000 imaginary dollars. Two fictional days: just one day faster than free delivery.</p><button class="plain-button" id="delivery-return">Back to delivery options</button>`;
      body.scrollTop = 0;
      sync();
      heading.focus({ preventScroll: true });
      body.querySelector("button").addEventListener("click", () => { delivery(); heading.focus({ preventScroll: true }); });
    });
    body.querySelector("#delivery-confirm").addEventListener("click", () => {
      if (selected !== "standard") { say("Choose the free three-day delivery. The fastest service costs $5,000 for just one day saved."); return; }
      if (complete) return;
      complete = true;
      close();
      trigger.disabled = true;
      say("Standard delivery selected. No parcel dispatched or payment taken.");
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    });
  };
  trigger.addEventListener("click", () => {
    savedScroll = 0;
    scrollTargets = null;
    lastWheel = -Infinity;
    overlay.hidden = false;
    background.inert = true;
    delivery();
    heading.focus({ preventScroll: true });
  });
  stage.querySelector("#delivery-close").addEventListener("click", () => {
    if (nested) { delivery(); heading.focus({ preventScroll: true }); } else close();
  });
  overlay.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.stopPropagation();
      if (!notice.hidden) closeNotice();
      else if (nested) { delivery(); heading.focus({ preventScroll: true }); } else close();
    } else if (!fixed && [body, noticeBody].includes(event.target) && ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "End", "Home"].includes(event.key)) {
      event.preventDefault();
      if (!event.repeat) startGesture();
      routeScroll(["ArrowUp", "PageUp", "Home"].includes(event.key) ? -180 : 180);
    }
  });
  overlay.addEventListener("wheel", event => {
    if (fixed || event.ctrlKey) return;
    event.preventDefault();
    if (!event.deltaY) return;
    const now = performance.now();
    if (now - lastWheel > 250) startGesture();
    lastWheel = now;
    routeScroll(event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? background.clientHeight : 1));
  }, { passive: false });
  let touchY = null;
  for (const surface of [body, noticeBody]) {
    surface.style.touchAction = fixed ? "auto" : "none";
    surface.addEventListener("pointerdown", event => {
      if (!fixed && event.pointerType === "touch") { touchY = event.clientY; startGesture(); }
    });
    surface.addEventListener("pointermove", event => {
      if (touchY === null || event.pointerType !== "touch") return;
      routeScroll(touchY - event.clientY);
      touchY = event.clientY;
    });
    const release = () => { touchY = null; };
    surface.addEventListener("pointerup", release);
    surface.addEventListener("pointercancel", release);
    surface.addEventListener("pointerleave", release);
  }
  slider.addEventListener("input", () => { body.scrollTop = Number(slider.value) / 100 * (body.scrollHeight - body.clientHeight); });
  body.addEventListener("scroll", sync);
  reducedMotion.addEventListener("change", stopBounces);
  return () => { stopBounces(); reducedMotion.removeEventListener("change", stopBounces); };
}
