import { createStageShell } from "./shared.js";

export const exhibits = [
  { id: "validation-afterthought", name: "The Validation Afterthought", category: "Forms", color: "blue", tagline: "Four fields. One error. Start over.", description: "One answer was wrong. We deleted the rest. You're welcome.", lesson: "The form knew the requirements all along. Apparently that information was on a need-to-fail basis.", fix: "Requirements are visible, errors belong to their fields, and your other answers stay put.", worseChange: "Useful guidance has been replaced by one cryptic complaint.", preview: `<div class="new-preview preview-validation-rejection"><span class="validation-preview-kicker">APPLICATION / NOT EVEN CLOSE</span><strong class="validation-preview-verdict">INVALID.</strong><div class="validation-preview-question"><b>Which field?</b><span>That's a secret.</span></div><div class="validation-preview-answers"><span>NAME <s>Alex Example</s></span><span>EMAIL <s>alex@example.test</s></span><b>ANSWERS DELETED</b></div><small class="validation-preview-footer">Start over. Guess better.</small></div>`, render: renderValidationAfterthought },
  { id: "scroll-modal", name: "The Scroll-Through Modal", category: "Interaction", color: "lilac", tagline: "You're scrolling. Just not the dialog.", description: "Save one day for $5,000. Free delivery? Keep scrolling. Wrong window.", lesson: "Two scroll containers entered. The one you couldn't use got every gesture.", fix: "The active dialog owns its scrolling, and the background stays still.", worseChange: "Shipping speed requires a third dialog, opened from the bottom of the second. Each gesture randomly scrolls one, two, or all three layers, sometimes in opposite directions.", preview: `<div class="new-preview preview-scroll-checkout"><div class="scroll-preview-back"><span>YOUR ORDER</span><span>Delivery: still deciding</span></div><div class="scroll-preview-front"><span class="scroll-preview-title">DELIVERY OPTIONS <b aria-hidden="true">&times;</b></span><span class="scroll-preview-offer">SAVE ONE DAY.</span><strong>$5,000</strong><small>One day. Five grand.</small><span class="scroll-preview-free">Free? Further down.</span><i class="scroll-preview-rail" aria-hidden="true"></i></div><span class="scroll-preview-punchline">YOU SCROLLED THE WRONG WINDOW.</span></div>`, render: renderScrollModal },
];

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
