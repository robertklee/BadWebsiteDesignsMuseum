// Commerce & messaging: marketing copy, checkout, and subscription flows.
import { createStageShell, createDemoStatus, completeExhibit, matchesDemoText } from "./shared.js";

export const exhibits = [
  { id: "layout-checkout", task: "Review the bench order and complete checkout.", fixedTask: "Review the bench order and select Checkout.", name: "Your Button Has Moved", category: "Commerce", color: "orange", tagline: "You're buying a bench. The shop would like a word.", description: "One bench for the garden. The shop has been thinking about your order.", lesson: "Online checkout sometimes feels like a negotiation: extra products, another offer, a total that keeps changing. This shop turns that experience into a conversation with Dave and his excess cushion stock.", fix: "Checkout keeps the bench, price, and delivery choice clear, without pushing extra products into the order.", worseChange: "The shop has more suggestions for your perfectly ordinary bench order.", preview: '<div class="new-preview checkout-thumbnail"><span class="checkout-thumb-brand">THE SITTING ROOM / YOUR BASKET</span><div class="checkout-thumb-stage"><div class="checkout-thumb-product"><img src="/assets/bench.jpg" alt="" width="250" height="167"><div><b>Just a bench.</b><strong>$24</strong></div></div><div class="checkout-thumb-offer"><span>WAIT. ONE MORE THING.</span><div><i class="checkout-thumb-cushion"></i><b>Something else<br>perhaps? <em>Take a look</em></b></div></div><div class="checkout-thumb-button">Checkout <span>→</span></div><span class="checkout-thumb-cursor">↖</span></div><small class="checkout-thumb-punchline">Just a bench.<br>That must be everything.</small><span class="checkout-thumb-fiction">THE SITTING ROOM / CUSTOMER CARE</span></div>', render: renderLayoutCheckout },
  { id: "ai-store", task: "Get an umbrella for a rainy day and add it to the basket.", fixedTask: "Add an umbrella to the basket at its one-time price.", name: "The AI Everything Store", category: "Commerce", color: "blue", tagline: "Buy an umbrella. Apparently, rain needs an AI strategy.", description: "An umbrella for a rainy day. The store sees considerable untapped potential.", lesson: "You've seen products add AI, an account, and a subscription to things that already worked. This store applies that upgrade to a spoon. Soup apparently needs a product roadmap now.", fix: "Ordinary objects have ordinary one-time prices, with no prompts or subscription setup.", worseChange: "The shop has more questions about your very ordinary purchase.", preview: `<div class="thumb-scene thumb-ai"><span class="thumb-kicker">THE SPOON, REIMAGINED.</span><div class="thumb-spoon-product"><div class="thumb-silver-spoon" role="img" aria-label="An ordinary silver spoon"><i></i><b></b></div><div class="thumb-spoon-offer"><span>SPOON + AI</span><strong>$19.99</strong><small>/ month*</small><b>Calibration<br>required</b></div></div><small class="thumb-footer">Soup not included.</small><span class="thumb-fictional-plan">*SOUP SOLD SEPARATELY.</span></div>`, render: renderAiStore },
  { id: "shrinking-unsubscribe", task: "Select Cancel subscription to end the plan.", fixedTask: "Select Cancel subscription to end the plan.", name: "The Shrinking Unsubscribe Button", category: "Commerce", color: "pink", tagline: "End your subscription. A small request.", description: "A subscription you no longer need. Retention would prefer a smaller conversation.", lesson: "Cancelling can already mean hunting for a tiny link. This version makes that link shrink further whenever you approach. The subscription stays full-size; only your way out gets smaller.", fix: "The cancel button stays readable, reachable, and still.", worseChange: "Retention has revised the scale of your request.", preview: `<div class="thumb-scene thumb-shrinking"><span class="thumb-kicker">YOUR PLAN STAYS FULL-SIZE</span><strong class="thumb-plan-price">$49<span>/ month*</span></strong><div class="thumb-exit-trail"><span class="thumb-exit-ghost">Unsubscribe</span><span class="thumb-exit-smaller">Unsubscribe</span><span class="thumb-exit-tiny">Unsubscribe</span><i aria-hidden="true">↖</i></div><small class="thumb-footer">*Your continued interest is appreciated.</small></div>`, render: renderShrinkingUnsubscribe },
  { id: "physics-cart", task: "Add products, review your basket, and select Checkout when you're ready to buy.", fixedTask: "Add products, review your basket, and select Checkout when ready.", category: "Commerce", color: "orange", name: "The Physics Shopping Cart", tagline: "Review your basket. Shopping has picked up momentum.", description: "A basket of things you might buy. Momentum Market appreciates decisive shoppers.", lesson: "An online cart normally waits while you decide what to buy. This one takes 'moving toward checkout' literally. Adding products gives it more momentum, not more patience.", fix: "The basket stays still until you explicitly choose the checkout button.", worseChange: "The market has extended its downhill section.", preview: '<div class="thumb-scene thumb-cart"><span class="thumb-kicker">THE MOMENTUM MARKET</span><div class="thumb-cart-hill"><div class="thumb-cart-slope"></div><div class="thumb-rolling-cart"><div class="thumb-cart-basket"><b></b><b></b></div><i></i><i></i></div><span class="thumb-cart-speed" aria-hidden="true">→ →</span><span class="thumb-checkout-zone">BUY<br>NOW*</span><span class="thumb-brake-label">BRAKE!</span></div><small class="thumb-footer">*All downhill from here.</small></div>', render: renderPhysicsCart },
  { id: "corporate", task: "Try to open the sample task board by selecting Unlock your potential and following setup.", fixedTask: "Select Try the sample task board to open the product directly.", name: "The Corporate Fog Machine", category: "Copywriting", color: "blue", tagline: "You're almost ready to get ready.", description: "A task board for your team. First, a few questions about your potential.", lesson: "You sign up for a service and spend longer answering setup questions than using it. This exhibit combines that endless onboarding with corporate language that says very little. 'Almost finished' is the product.", fix: "The page explains what the product does and lets you open a sample task board directly.", worseChange: "Your potential has been reassessed upward.", preview: `<div class="thumb-scene thumb-corporate"><span class="thumb-kicker">SYNERGIA / GETTING STARTED</span><div class="thumb-onboarding"><span class="thumb-onboarding-checks">✓ &nbsp; ✓ &nbsp; ✓ &nbsp; ✓</span><strong>Almost ready*</strong><div class="thumb-next-setup"><span>UP NEXT</span><b>Your potential.</b><i>→</i></div></div><small class="thumb-footer">*Getting ready to get ready.</small></div>`, render: renderCorporate },
  { id: "cancel", task: "Choose the answers that end the subscription, working through each confirmation.", fixedTask: "Select Cancel subscription to end the subscription.", name: "The Cancellation Labyrinth", category: "Copywriting", color: "lilac", tagline: "Cancel your subscription. Let's be sure we're unsure.", description: "A subscription you meant to cancel last month. Just confirm that that's what you don't not want.", lesson: "Cancelling a subscription often means confirming the same choice several times. Here each confirmation adds another layer of 'don't' and 'not'. The difficulty is the wording, not your decision.", fix: "One clearly labeled cancellation button replaces the confirmation maze.", worseChange: "Cancellation has more questions and fewer straightforward answers.", preview: `<div class="thumb-scene thumb-cancel"><span class="thumb-kicker">BEFORE YOU DON'T GO...</span><div class="thumb-cancel-dialog"><div class="thumb-cancel-title"><span>Confirm cancellation</span><b>×</b></div><strong>Don't not stop<br>not staying.</strong><div class="thumb-cancel-choices"><span>Yes, don't</span><span>No, also don't</span></div></div><small class="thumb-footer">Your subscription awaits your decision.</small></div>`, render: renderCancel },
  { id: "fonts", task: "Prepare an event notice: write Library open until 9 pm and select Save draft.", fixedTask: "Write Library open until 9 pm and select Save draft.", name: "The Font Buffet", category: "Typography", color: "pink", tagline: "Every font wants to make an announcement.", description: "A library notice with a few fonts to choose from. Everyone on the committee had a favourite.", lesson: "A page can look busy before you've even read it. This exhibit gives each word a competing font and style, so a simple sentence starts to feel like several advertisements arguing.", fix: "One consistent font and size make the sentence easier to read.", worseChange: "More of the typography wants a speaking part.", preview: `<div class="thumb-scene thumb-fonts"><span class="thumb-kicker">THE CREATIVE COMMITTEE</span><div class="thumb-type-poster"><div><b>One</b><i>more</i></div><strong>FONT.</strong></div><small class="thumb-footer">Every opinion represented.</small></div>`, render: renderFonts },
];

function renderLayoutCheckout({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  shell("THE SITTING ROOM", "Your bench order.",
    fixed ? "You're buying a bench. Review the $24 total and select Checkout."
      : "Review your bench order, then select Checkout. We'd be happy to help with anything else.",
    `<div class="marketing-exhibit checkout-exhibit ${fixed ? "checkout-fixed" : ""}">
      <div class="marketing-viewport checkout-viewport" id="checkout-viewport">
        <div class="checkout-document" id="checkout-document">
          <header class="checkout-masthead"><div><span class="demo-kicker">THE SITTING ROOM / GARDEN COLLECTION</span><h3>PLEASE BE SEATED.</h3><p>Room for two. Or one person who likes their space.</p></div><span class="checkout-basket-count" id="checkout-basket-count">1 item</span></header>
          <div class="checkout-promotions" id="checkout-promotions" aria-label="Store offers">${fixed ? '<p class="checkout-placeholder">Free standard delivery. Take a seat. We\'ll do the lifting.</p>' : ""}</div>
          <section class="checkout-summary" id="checkout-summary" aria-labelledby="checkout-summary-title">
            <div class="checkout-receipt-heading"><h3 id="checkout-summary-title">Your basket</h3><span>No. 000024</span></div>
            <div class="checkout-product"><img class="checkout-product-image" src="/assets/bench.jpg" alt="A wooden park bench" width="250" height="167"><div><strong>The Ordinary Bench</strong><small>Natural wood finish. Seats two.</small><span class="checkout-product-tag">In stock. Very in stock.</span><small id="checkout-no-cushion-option" hidden>No cushion added, cost $6</small></div><strong>$24.00</strong></div>
            <div class="checkout-item checkout-unwanted-item" id="checkout-cushion" hidden><span><b>ADDED TO CART</b><br>Emotional Support Cushion<small>Soft filling. Firm recommendation.</small></span><strong>+$6.00</strong></div>
            <div class="checkout-item"><div>${worse ? '<label for="checkout-delivery">Delivery</label><select id="checkout-delivery"><option value="standard">Standard - free</option><option value="dave">Dave - $12</option></select><small id="checkout-delivery-note" role="status">3-5 working days. Dave is available much sooner.</small>' : '<span>Standard delivery</span><small>3-5 working days. Dave doesn\'t count Mondays.</small>'}</div><strong id="checkout-delivery-price">$0.00</strong></div>
            ${fixed ? "" : `<details class="checkout-coupon" id="checkout-coupon"><summary>Have a promo code?</summary><p>A little apology from Dave: <b>SORRYDAVE</b></p><form id="checkout-coupon-form"><label for="checkout-coupon-code">Promo code</label><div class="checkout-coupon-controls"><input id="checkout-coupon-code" name="coupon" autocomplete="off" maxlength="40" required><button class="plain-button" type="submit" id="checkout-coupon-apply">Apply</button><button class="plain-button" type="button" id="checkout-coupon-remove" hidden>Remove</button></div></form><p id="checkout-coupon-status" role="status"></p></details><div id="checkout-coupon-charges" hidden><div class="checkout-item"><span>SORRYDAVE discount</span><strong>-$2.00</strong></div><div class="checkout-item"><span>Promotion processing<small>Your savings have been successfully processed.</small></span><strong>+$3.00</strong></div></div>`}
            <p class="checkout-total">Total <strong id="checkout-total">$24.00</strong></p>
            <p class="checkout-receipt-note">${fixed ? "Free delivery included. Ready when you are." : "Need anything else? We're fairly sure you do."}</p>
          </section>
          <div class="checkout-recommendations" id="checkout-recommendations" hidden></div>
          <div class="checkout-action" id="checkout-action">
            <button type="button" class="demo-button" id="checkout-confirm">Checkout</button>
            <section class="checkout-cart-change checkout-upsell-dialog" id="checkout-cushion-offer" role="dialog" aria-modal="true" aria-labelledby="checkout-cushion-title" hidden>
              <strong class="checkout-change-title" id="checkout-cushion-title">Most customers buy this add-on.</strong>
              <p>Emotional Support Cushion <b>+$6.00</b></p>
              <p>A softer seat for just $6. Your future self has already said yes.</p>
              <button type="button" class="demo-button" id="checkout-add-cushion">Add to cart - $6.00</button>
              <button type="button" class="plain-button" id="checkout-refuse-cushion">No thanks, just the bench</button>
              <button type="button" class="plain-button" id="checkout-museum-controls">Museum controls: Restart, Fix, Exit</button>
              <small>Escape closes this offer without choosing an extra.</small>
              <p id="checkout-cushion-reply" role="status"></p>
            </section>
            <div class="checkout-cart-change" id="checkout-cart-change" role="status" aria-live="polite" aria-atomic="true"></div>
          </div>
          <footer class="checkout-footer">THE SITTING ROOM<span>Customer care, Monday-Friday. Dave may answer.</span><small>Photo: <a href="https://commons.wikimedia.org/wiki/File:Wooden_bench_in_G_Ross_Lord_Park_14.jpg" target="_blank" rel="noopener noreferrer">Fabian Roudra Baroi</a> / <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></small></footer>
        </div>
      </div>
    </div>`);
  const viewport = stage.querySelector("#checkout-viewport");
  const documentArea = stage.querySelector("#checkout-document");
  const promotions = stage.querySelector("#checkout-promotions");
  const summary = stage.querySelector("#checkout-summary");
  const recommendations = stage.querySelector("#checkout-recommendations");
  const action = stage.querySelector("#checkout-action");
  const footer = stage.querySelector(".checkout-footer");
  const confirm = stage.querySelector("#checkout-confirm");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let arrivals = 0;
  let completed = false;
  let upsellResolved = false;
  let cushionAdded = false;
  let refusalFee = 0;
  let deliveryFee = 0;
  let couponApplied = false;
  let pendingOffer = false;
  let lastApproach = 0;
  const updateTotal = () => {
    const total = 2400 + (cushionAdded ? 600 : 0) + refusalFee + deliveryFee + (couponApplied ? -200 + 300 : 0);
    stage.querySelector("#checkout-total").textContent = `$${(total / 100).toFixed(2)}`;
    stage.querySelector("#checkout-delivery-price").textContent = `$${(deliveryFee / 100).toFixed(2)}`;
  };
  const delivery = stage.querySelector("#checkout-delivery");
  delivery?.addEventListener("change", () => {
    if (completed) return;
    deliveryFee = delivery.value === "dave" ? 1200 : 0;
    stage.querySelector("#checkout-delivery-note").textContent = deliveryFee ? "Dave brings it personally. He's already put his shoes on." : "Standard delivery selected. Dave is taking his shoes off.";
    updateTotal();
  });
  if (!fixed) {
    const couponInput = stage.querySelector("#checkout-coupon-code");
    const applyCoupon = stage.querySelector("#checkout-coupon-apply");
    const removeCoupon = stage.querySelector("#checkout-coupon-remove");
    const couponStatus = stage.querySelector("#checkout-coupon-status");
    stage.querySelector("#checkout-coupon-form").addEventListener("submit", event => {
      event.preventDefault();
      if (completed || couponApplied) return;
      if (couponInput.value.trim().toUpperCase() !== "SORRYDAVE") {
        couponStatus.textContent = "Code not recognised. Dave's apology is case-insensitive, but otherwise quite specific.";
        return;
      }
      couponApplied = true;
      couponInput.disabled = true;
      applyCoupon.hidden = true;
      removeCoupon.hidden = false;
      stage.querySelector("#checkout-coupon-charges").hidden = false;
      couponStatus.textContent = "Discount applied: $2 off, plus a $3 promotion-processing fee.";
      updateTotal();
      removeCoupon.focus({ preventScroll: true });
    });
    removeCoupon.addEventListener("click", () => {
      if (completed) return;
      couponApplied = false;
      couponInput.disabled = false;
      applyCoupon.hidden = false;
      removeCoupon.hidden = true;
      stage.querySelector("#checkout-coupon-charges").hidden = true;
      couponStatus.textContent = "Discount and processing fee removed. We'll let Dave down gently.";
      updateTotal();
      couponInput.focus({ preventScroll: true });
    });
  }
  const messages = [
    { title: "Hang on. Where will your feet sit?", copy: "On the ground? Outside? We have a second bench for that.", decline: "My feet are fine" },
    { title: "Someone near you is looking at this bench.", copy: "Do you really want them to buy it before you? You might miss out.", decline: "I'll take my chances" },
    { title: "Fine. One bench. But what if a third person comes?", copy: "You'd have to say 'there's no room'. Out loud. To a guest.", decline: "They can stand" },
    { title: "Dave says we have to ask once more.", copy: "Dave ordered 900 benches. He remains confident about the garden market.", decline: "Who is Dave?" },
  ];
  if (worse) messages.splice(2, 0, {
    title: "A message from customer care.",
    copy: "We noticed you had trouble buying a second bench for your feet. Dave has reopened your case. You didn't open a case? That's the trouble we noticed.",
    decline: "My feet are still fine",
  });
  const limit = messages.length;
  const loadArrival = () => {
    if (completed || pendingOffer || arrivals >= limit) return false;
    const focused = document.activeElement;
    const previousButton = confirm.getBoundingClientRect();
    arrivals++;
    const deliveryUpgraded = worse && (arrivals === 1 || arrivals === 4);
    const previousDeliveryFee = deliveryFee;
    const previousTotal = stage.querySelector("#checkout-total").textContent;
    if (deliveryUpgraded) {
      deliveryFee = 1200;
      delivery.value = "dave";
      stage.querySelector("#checkout-delivery-note").textContent = arrivals === 1 ? "Upgraded to personal delivery. He's already put his shoes on." : "Personal delivery restored. Dave thought the free option was a misclick.";
      updateTotal();
    }
    const message = messages[arrivals - 1];
    const heading = document.createElement("strong");
    heading.textContent = message.title;
    const copy = document.createElement("span");
    copy.textContent = message.copy;
    if (fixed) {
      promotions.replaceChildren(heading, copy);
    } else {
      pendingOffer = true;
      confirm.hidden = true;
      recommendations.hidden = false;
      const decline = document.createElement("button");
      decline.type = "button";
      decline.className = "plain-button checkout-decline";
      decline.textContent = message.decline;
      decline.addEventListener("click", () => {
        pendingOffer = false;
        recommendations.hidden = true;
        confirm.hidden = false;
        confirm.focus({ preventScroll: true });
      }, { once: true });
      recommendations.replaceChildren(heading, copy, decline);
      if (deliveryUpgraded) {
        const notice = document.createElement("div");
        notice.className = "checkout-delivery-change";
        notice.setAttribute("role", "status");
        const title = document.createElement("strong");
        title.textContent = previousDeliveryFee === 0 ? "We've upgraded your delivery." : "Dave is still delivering.";
        const price = document.createElement("p");
        price.textContent = previousDeliveryFee === 0 ? "Standard: FREE → Dave: $12.00" : "Personal delivery: $12.00";
        const total = document.createElement("p");
        total.textContent = `Order total: ${previousTotal} → ${stage.querySelector("#checkout-total").textContent}`;
        const explanation = document.createElement("small");
        explanation.textContent = arrivals === 1 ? "He's already put his shoes on." : "You chose free delivery. Dave assumed your finger slipped.";
        notice.append(title, price, total, explanation);
        recommendations.prepend(notice);
      }
      recommendations.dataset.arrival = String(arrivals);
      if (arrivals % 2) {
        documentArea.insertBefore(recommendations, summary);
        documentArea.insertBefore(action, summary);
      } else {
        documentArea.insertBefore(recommendations, footer);
        documentArea.insertBefore(action, footer);
      }
      if (focused === confirm) decline.focus({ preventScroll: true });
      recommendations.scrollIntoView({ block: "nearest", behavior: "instant" });
      const refusalBounds = decline.getBoundingClientRect();
      if (refusalBounds.top < previousButton.bottom && refusalBounds.bottom > previousButton.top) {
        decline.style.marginTop = `${24 + previousButton.bottom - refusalBounds.top + 16}px`;
      }
    }
    // Reparenting a focused action can blur it; restore focus without scrolling the document.
    if (fixed && focused === confirm) confirm.focus({ preventScroll: true });
    return true;
  };
  viewport.addEventListener("pointermove", event => {
    if (fixed || !upsellResolved || motion.matches || event.pointerType !== "mouse" || confirm.matches(":focus-visible")) return;
    const bounds = confirm.getBoundingClientRect();
    const near = event.clientX >= bounds.left - 50 && event.clientX <= bounds.right + 50 && event.clientY >= bounds.top - 65 && event.clientY <= bounds.bottom + 30;
    const now = performance.now();
    if (near && now - lastApproach > 650) {
      lastApproach = now;
      loadArrival();
    }
  });
  let cushionRefusals = 0;
  const offer = stage.querySelector("#checkout-cushion-offer");
  const addCushion = stage.querySelector("#checkout-add-cushion");
  const refuseCushion = stage.querySelector("#checkout-refuse-cushion");
  const overlay = document.createElement("div");
  overlay.className = "checkout-upsell-overlay";
  overlay.hidden = true;
  overlay.append(offer);
  viewport.append(overlay);
  const closeUpsell = (resolved = false) => {
    if (resolved) upsellResolved = true;
    offer.hidden = true;
    overlay.hidden = true;
    documentArea.inert = false;
    confirm.hidden = false;
    updateTotal();
    documentArea.dataset.daveFeelingsRefusalFee = String(refusalFee);
    confirm.focus({ preventScroll: true });
  };
  refuseCushion.addEventListener("click", () => {
    if (upsellResolved || offer.hidden) return;
    const replies = [
      "Your bench is ready. Are you sure you want to leave it this uncomfortable?",
      "Dave has reviewed your request for just a bench. He recommends a cushion.",
      "Fine. No cushion. Dave says he's fine too.",
      "Dave ordered too many cushions for his warehouse. Help a friend out.",
    ];
    if (cushionRefusals === replies.length) {
      refusalFee = 600;
      stage.querySelector("#checkout-no-cushion-option").hidden = false;
      closeUpsell(true);
      return;
    }
    stage.querySelector("#checkout-cushion-title").textContent = "Are you sure about just the bench?";
    stage.querySelector("#checkout-cushion-reply").textContent = replies[cushionRefusals++];
    refuseCushion.textContent = cushionRefusals === replies.length ? "Not today" : "Still no thanks";
  });
  addCushion.addEventListener("click", () => {
    if (upsellResolved || offer.hidden) return;
    cushionAdded = true;
    stage.querySelector("#checkout-cushion").hidden = false;
    stage.querySelector("#checkout-basket-count").textContent = "2 items";
    stage.querySelector("#checkout-cart-change").innerHTML = `<strong class="checkout-change-title">Cushion added. Dave can breathe again.</strong><div class="checkout-added-product"><strong>Emotional Support Cushion</strong><strong>+$6.00</strong></div><p>2 items in your basket.</p>`;
    closeUpsell(true);
  });
  const museumControls = stage.querySelector("#checkout-museum-controls");
  museumControls.addEventListener("click", () => {
    closeUpsell();
    stage.dispatchEvent(new CustomEvent("museum-controls", { bubbles: true }));
  });
  offer.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeUpsell();
      return;
    }
    if (event.key !== "Tab") return;
    event.preventDefault();
    const controls = [addCushion, refuseCushion, museumControls];
    const index = controls.indexOf(document.activeElement);
    controls[(index + (event.shiftKey ? controls.length - 1 : 1)) % controls.length].focus();
  });
  confirm.addEventListener("click", () => {
    if (completed || pendingOffer || !offer.hidden) return;
    if (!fixed && !upsellResolved) {
      confirm.hidden = true;
      offer.hidden = false;
      documentArea.inert = true;
      overlay.style.top = `${viewport.scrollTop}px`;
      overlay.hidden = false;
      addCushion.focus({ preventScroll: true });
      return;
    }
    confirm.textContent = "Checkout";
    if (!fixed && loadArrival()) {
      return;
    }
    completed = true;
    confirm.textContent = "Order placed";
    confirm.disabled = true;
    summary.querySelectorAll("input, select, button").forEach(control => { control.disabled = true; });
    say(fixed ? "Thank you. Your order is confirmed." : cushionAdded ? "Order confirmed. Dave sends his personal thanks." : "Order confirmed. Dave sends his regards. Just regards.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  return () => {};
}

function renderAiStore({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  const products = [
    { id: "spoon", name: "Spoon", icon: "🥄", price: 2, plan: 19.99, keyword: "soup", description: "Moves food from a bowl to your mouth.", generated: "Soup trajectory optimized. Your spoon is now emotionally available." },
    { id: "umbrella", name: "Umbrella", icon: "☂", price: 12, plan: 29.99, keyword: "rain", description: "Keeps rain off your head.", generated: "Rain identified as wet. Umbrella confidence: unnecessarily high." },
    { id: "rock", name: "Rock", icon: "🪨", price: 1, plan: 9.99, keyword: "door", description: "A heavy object. Can hold a door open.", generated: "Door-retention model deployed. The rock continues to sit there." },
  ];
  shell("OBJECTGPT / EVERYDAY INTELLIGENCE", fixed ? "Everyday objects." : "Intelligence for everyday life.",
    fixed ? "Add an umbrella to your basket for $12, paid once." : "Rain in the forecast? Choose an umbrella and complete its setup to add it to your basket.",
    `<div class="ai-products">${products.map(product => `<article class="ai-product"><span class="ai-product-icon" aria-hidden="true">${product.icon}</span><span class="ai-product-badge">${fixed ? "ONE-TIME PURCHASE" : "AI-POWERED"}</span><h3>${product.name}${fixed ? "" : "GPT"}</h3><p>${fixed ? product.description : `A new generation of intelligent ${product.name.toLowerCase()}.`}</p><strong>$${(fixed ? product.price : product.plan).toFixed(2)}<small>${fixed ? "one time" : "per month, per object"}</small></strong><button class="demo-button" data-ai-product="${product.id}">${fixed ? "Add to basket" : "Set up this product →"}</button></article>`).join("")}</div><section class="ai-setup" id="ai-setup" aria-label="Product setup" hidden></section><div class="ai-basket"><h3>Your basket</h3><ul id="ai-basket-items"></ul><p id="ai-total">Your basket is empty.</p></div>`);
  let total = 0;
  let count = 0;
  const basketProducts = new Set();
  const drafts = new Map();
  const setup = stage.querySelector("#ai-setup");
  const addProduct = product => {
    const firstUmbrella = product.id === "umbrella" && !basketProducts.has("umbrella");
    basketProducts.add(product.id);
    const item = document.createElement("li");
    item.textContent = `${product.name}${fixed ? "" : "GPT"} — $${(fixed ? product.price : product.plan).toFixed(2)}${fixed ? " once" : "/month"}`;
    stage.querySelector("#ai-basket-items").append(item);
    total += Math.round((fixed ? product.price : product.plan) * 100);
    count++;
    stage.querySelector("#ai-total").textContent = `${count} object${count === 1 ? "" : "s"}: $${(total / 100).toFixed(2)}${fixed ? " one time" : " every month"}.`;
    say(product.id === "umbrella"
      ? fixed ? "Umbrella added for your rainy-day visit at a one-time price." : "Umbrella added for your rainy-day visit. Your $29.99/month plan is active."
      : basketProducts.has("umbrella")
        ? `${product.name} added. Your umbrella is already in the basket; the rainy-day task remains complete.`
        : `${product.name} added, but you still need an umbrella for your rainy-day visit.`);
    if (firstUmbrella) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  };
  stage.querySelectorAll("[data-ai-product]").forEach(button => button.addEventListener("click", () => {
    const product = products.find(item => item.id === button.dataset.aiProduct);
    if (fixed) { addProduct(product); return; }
    const required = worse ? 3 : 1;
    if (!drafts.has(product.id)) drafts.set(product.id, {
      prompt: "",
      refinements: 0,
      response: `Setup: 0 / ${required} rounds.`,
    });
    const draft = drafts.get(product.id);
    setup.hidden = false;
    setup.innerHTML = `<span class="demo-kicker">REQUIRED PRODUCT SETUP</span><h3>Brief your ${product.name.toLowerCase()}.</h3><form id="ai-prompt-form"><label for="ai-prompt">Describe your intention in at least 12 characters.</label><textarea id="ai-prompt" maxlength="200" minlength="12" required placeholder="For example: I want this for ${product.keyword}."></textarea><small>Include the letters “${product.keyword}”, even inside another word. Unfinished setup is kept separately for each product.</small><button class="demo-button">Generate product profile</button></form><p id="ai-response" role="status"></p><button class="plain-button" id="ai-activate" disabled>Activate $${product.plan.toFixed(2)}/month plan</button>`;
    const form = setup.querySelector("form");
    const promptInput = setup.querySelector("textarea");
    const generate = form.querySelector("button");
    const response = setup.querySelector("#ai-response");
    const activate = setup.querySelector("#ai-activate");
    const updateSetup = () => {
      response.textContent = draft.response;
      const ready = draft.refinements === required;
      promptInput.readOnly = ready;
      generate.disabled = ready;
      activate.disabled = !ready;
    };
    promptInput.value = draft.prompt;
    promptInput.addEventListener("input", () => { draft.prompt = promptInput.value; });
    updateSetup();
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (draft.refinements === required) return;
      draft.prompt = promptInput.value;
      const prompt = draft.prompt.trim();
      if (prompt.length < 12 || !prompt.toLowerCase().includes(product.keyword)) {
        draft.response = `Not accepted. Use at least 12 characters and include the letters ${product.keyword}, even inside another word.`;
        updateSetup();
        return;
      }
      draft.refinements++;
      draft.response = `${product.generated} Setup: ${draft.refinements} / ${required} rounds.${draft.refinements < required ? " Please resubmit. We need to think about it again." : " Ready to activate the plan."}`;
      updateSetup();
      if (draft.refinements === required) activate.focus();
    });
    activate.addEventListener("click", () => {
      if (draft.refinements !== required || !drafts.has(product.id)) return;
      addProduct(product);
      drafts.delete(product.id);
      setup.hidden = true;
      button.textContent = "Set up another of this product →";
      button.focus();
    });
    (draft.refinements === required ? activate : promptInput).focus();
  }));
  return () => {};
}

function renderShrinkingUnsubscribe({ stage, mode }) {
  const { shell, say } = createStageShell(stage);
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("PREMIUM / PLAN MANAGEMENT", fixed ? "Manage your subscription." : "We value your continued membership.",
    `Select Cancel subscription to end the plan.${fixed ? "" : " Keyboard focus and reduced-motion settings keep it still."}`,
    `<div class="shrink-plan"><span>PREMIUM NONSENSE</span><strong id="shrink-plan-status">Subscription: ACTIVE</strong><p>Your monthly plan renews automatically.</p><div class="shrink-arena" id="shrink-arena"><button type="button" class="demo-button shrink-target" id="shrink-cancel">Cancel subscription</button></div><div class="shrink-dashboard"><span id="shrink-size">Button size: 100%</span><span id="shrink-jumps">Escape attempts: 0</span></div><p class="shrink-fine">${fixed ? "Cancel subscription ends the plan." : "We'd hate to see you go."}</p></div>`);
  const arena = stage.querySelector("#shrink-arena");
  const button = stage.querySelector("#shrink-cancel");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = matchMedia("(hover: none), (pointer: coarse)");
  let cancelled = false;
  let scale = 1;
  let jumps = 0;
  let shrinking = null;
  let dodging = null;
  let dodgedAt = -Infinity;
  let directHits = 0;
  let approaches = 0;
  let surrendered = false;
  // Hard ceiling on flinches, so cancelling is guaranteed to succeed in bounded time.
  const flinchLimit = 8;
  const flinches = [
    "You hit it. Retention hit back.",
    "Cancellation attempt logged, then declined.",
    "That was a direct hit. It relocated anyway.",
    "Confirmed contact. Unconfirmed cancellation.",
    "It saw the tap coming and left.",
    "Technically you got it. Technically it moved.",
    "So close. Retention was closer.",
    "That one almost worked.",
  ];
  // Each escape restores the button at a slightly smaller scale.
  const resetScale = () => Math.max(0.55, 1 - jumps * 0.05);
  // Nobody should scroll down to find the button already shrunk to nothing, so the timer only
  // runs while the arena is actually on screen.
  let onscreen = false;
  const watcher = new IntersectionObserver(([entry]) => { onscreen = entry.isIntersecting; }, { threshold: 0.4 });
  let position = { x: 0, y: 0 };
  const history = [];
  const limits = () => ({
    x: Math.max(12, arena.clientWidth - button.offsetWidth - 12),
    y: Math.max(12, arena.clientHeight - button.offsetHeight - 12),
  });
  const paint = () => {
    button.style.left = `${position.x}px`;
    button.style.top = `${position.y}px`;
    button.style.transform = `scale(${scale})`;
    stage.querySelector("#shrink-size").textContent = `Button size: ${Math.round(scale * 100)}%`;
    stage.querySelector("#shrink-jumps").textContent = `Escape attempts: ${jumps}`;
  };
  const center = () => {
    const max = limits();
    position = { x: (12 + max.x) / 2, y: (12 + max.y) / 2 };
    scale = 1;
    paint();
  };
  const relocate = (x, y) => {
    const max = limits();
    let best = position;
    let bestScore = -1;
    let bestFar = null;
    let bestFarScore = -1;
    for (let index = 0; index < 32; index++) {
      const candidate = { x: 12 + Math.random() * (max.x - 12), y: 12 + Math.random() * (max.y - 12) };
      const distance = Math.hypot(candidate.x + button.offsetWidth / 2 - x, candidate.y + button.offsetHeight / 2 - y);
      const novelty = Math.min(...[position, ...history].map(previous => Math.hypot(candidate.x - previous.x, candidate.y - previous.y)));
      const score = distance + novelty * 0.7;
      if (score > bestScore) { best = candidate; bestScore = score; }
      // Reappearing under the finger would count as a tap on the button and end the game for free.
      if (distance > 130 && score > bestFarScore) { bestFar = candidate; bestFarScore = score; }
    }
    history.push(position);
    if (history.length > 5) history.shift();
    position = bestFar || best;
    jumps++;
    scale = resetScale();
    paint();
  };
  arena.addEventListener("pointermove", event => {
    if (fixed || cancelled || motion.matches || surrendered || dodging || button.matches(":focus-visible")) return;
    const touch = event.pointerType !== "mouse";
    // Dragging a finger toward the button is treated exactly like an approaching mouse.
    if (touch && !(event.buttons || event.pressure > 0)) return;
    const rect = arena.getBoundingClientRect();
    const x = event.clientX - rect.left - arena.clientLeft;
    const y = event.clientY - rect.top - arena.clientTop;
    const distance = Math.hypot(x - position.x - button.offsetWidth / 2, y - position.y - button.offsetHeight / 2);
    const radius = worse ? 250 : 165;
    scale = Math.min(scale, Math.max(0.12, distance / radius));
    if (distance >= (worse ? 65 : 28)) { paint(); return; }
    relocate(x, y);
    // The proximity shrink always keeps the button smaller than your distance from its centre, so
    // a pointer can never quite land on it. Retention therefore gives up after enough approaches,
    // which keeps the mouse path bounded the same way the touch flinch is.
    approaches++;
    if (approaches < flinchLimit) return;
    surrendered = true;
    stopShrinking();
    scale = 1;
    paint();
    say("The cancel button has stopped moving. You can select it now to end the plan.");
  });
  // Touch cannot trigger a proximity shrink, so the button shrinks on a schedule instead and
  // relocates at full size once it runs out of room. Keyboard focus pauses the whole routine.
  const startShrinking = () => {
    if (shrinking || fixed || cancelled || surrendered || motion.matches) return;
    const floor = worse ? 0.18 : 0.3;
    const step = worse ? 0.055 : 0.03;
    shrinking = setInterval(() => {
      if (document.hidden || !onscreen || cancelled || dodging || button.matches(":focus-visible")) return;
      scale = Math.max(floor, scale - step);
      if (scale > floor) { paint(); return; }
      relocate(position.x + button.offsetWidth / 2, position.y + button.offsetHeight / 2);
      say(`It shrank out of reach and reappeared elsewhere, slightly smaller than last time. Escape attempts: ${jumps}.`);
    }, 90);
  };
  const stopShrinking = () => {
    clearInterval(shrinking);
    shrinking = null;
    clearTimeout(dodging);
    dodging = null;
    button.classList.remove("shrink-dodging");
  };
  arena.addEventListener("pointerdown", event => {
    if (fixed || cancelled || surrendered || motion.matches || event.pointerType === "mouse") return;
    startShrinking();
    // Ignore taps during the dodge animation to prevent overlapping transitions.
    if (dodging) return;
    // The guard only ever applies to the tap that caused a dodge, so rapid tapping still wins.
    dodgedAt = -Infinity;
    const rect = arena.getBoundingClientRect();
    const x = event.clientX - rect.left - arena.clientLeft;
    const y = event.clientY - rect.top - arena.clientTop;
    if (!event.target.closest("#shrink-cancel")) {
      const distance = Math.hypot(x - position.x - button.offsetWidth / 2, y - position.y - button.offsetHeight / 2);
      if (distance >= (worse ? 150 : 100)) return;
      relocate(x, y);
      dodgedAt = performance.now();
      say(`A near miss, which it interpreted as a threat. Escape attempts: ${jumps}.`);
      return;
    }
    // Landing a clean tap makes retention flinch rather than give up, but its nerve decays with
    // every hit and runs out entirely, so cancelling always succeeds in bounded time.
    const nerve = directHits === 0 ? 1
      : directHits >= flinchLimit ? 0
      : (worse ? 0.65 : 0.4) * Math.pow(0.6, directHits - 1);
    directHits++;
    if (Math.random() >= nerve) return;
    // Collapse under the pointer before relocating so the dodge reads as intentional rather than
    // as an unregistered tap.
    dodgedAt = performance.now();
    button.classList.add("shrink-dodging");
    scale = 0.04;
    paint();
    dodging = setTimeout(() => {
      button.classList.remove("shrink-dodging");
      dodging = null;
      if (cancelled) return;
      relocate(x, y);
      say(`${flinches[(directHits - 1) % flinches.length]} Direct hits: ${directHits}.`);
    }, 190);
  });
  if (coarse.matches) startShrinking();
  button.addEventListener("focus", () => { scale = 1; paint(); });
  button.addEventListener("click", event => {
    // Safari snaps a near miss onto the closest button, which would skip the chase entirely.
    if (!fixed && performance.now() - dodgedAt < 350) { event.preventDefault(); return; }
    cancelled = true;
    scale = 1;
    stopShrinking();
    button.textContent = "Cancelled";
    button.disabled = true;
    stage.querySelector("#shrink-plan-status").textContent = "Subscription: CANCELLED";
    arena.classList.add("shrink-cancelled");
    center();
    say("Subscription cancelled. Renewal is off.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  const resize = new ResizeObserver(center);
  resize.observe(arena);
  watcher.observe(arena);
  const remotion = () => { if (motion.matches) stopShrinking(); else if (coarse.matches) startShrinking(); center(); };
  motion.addEventListener("change", remotion);
  center();
  return () => {
    resize.disconnect();
    watcher.disconnect();
    stopShrinking();
    motion.removeEventListener("change", remotion);
  };
}

function renderPhysicsCart({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const listeners = [];
  const animations = new Set();
  let frame = 0;
  let disposed = false;
  const on = (element, type, callback) => {
    element.addEventListener(type, callback);
    listeners.push(() => element.removeEventListener(type, callback));
  };
  const $ = selector => stage.querySelector(selector);
  const cleanup = () => {
    disposed = true;
    cancelAnimationFrame(frame);
    animations.forEach(animation => animation.cancel());
    listeners.forEach(remove => remove());
  };
  const products = [
    { name: "Cloud sponge", mass: 1, price: 3 },
    { name: "Moon melon", mass: 3, price: 7 },
    { name: "Pocket planet", mass: 6, price: 12 },
  ];
  shell("THE MOMENTUM MARKET", fixed ? "Your shopping basket." : "Caution: shopping on an incline.",
    fixed ? "Use the shopping basket as usual: add items, review the total, and choose Checkout when you're ready."
      : "Add products and review your basket before selecting Checkout. Brake, Pull back, Pause rolling, and Return to start let you hold the cart without losing your items.",
    `<section class="arcade-exhibit arcade-shop">
      <div class="arcade-products">${products.map((product, i) => `<article class="arcade-product"><h3>${product.name}</h3><p>${product.mass} kg · ${product.price} credits</p><div class="arcade-quantity"><button class="plain-button" data-remove="${i}" aria-label="Remove one ${product.name}">−</button><output id="arcade-quantity-${i}" aria-label="${product.name} quantity">0</output><button class="plain-button" data-add="${i}" aria-label="Add one ${product.name}">+</button></div></article>`).join("")}</div>
      <p class="arcade-readout" id="arcade-basket-total"></p>
      ${fixed ? `<button class="demo-button" id="arcade-checkout">Checkout</button>` : `
      <p id="arcade-track-help" class="arcade-instructions">Use the stationary controls below. Brake stays on until released. Pull back moves 12% uphill. Pause freezes time. In reduced motion, use “Advance ½ second” for a static, manual equivalent.</p>
      <div class="arcade-track" aria-hidden="true"><div class="arcade-track-slope"></div><div class="arcade-buy-zone">BUY<br>NOW</div><div class="arcade-cart" id="arcade-cart"><span id="arcade-cart-load">0 kg</span><i></i><i></i></div>${worse ? '<div class="arcade-speed-bump">BUMP</div>' : ""}</div>
      <p class="arcade-readout" id="arcade-cart-state"></p>
      <div class="new-actions arcade-controls" role="group" aria-label="Cart controls" aria-describedby="arcade-track-help"><button class="demo-button" id="arcade-start">Start rolling</button><button class="plain-button" id="arcade-brake" aria-pressed="false">Brake: OFF</button><button class="plain-button" id="arcade-pull">← Pull back 12%</button><button class="plain-button" id="arcade-step">Advance ½ second</button><button class="plain-button" id="arcade-park">Return to start (keep items)</button></div>`}
      <div class="new-actions"><button class="plain-button" id="arcade-empty">Empty basket &amp; reset</button></div>
    </section>`);
  let x = 4;
  let velocity = 0;
  let running = false;
  let autoStart = true;
  let brake = false;
  let arrived = false;
  let completed = false;
  let bumpUsed = false;
  let bumpLift = 0;
  let bumpVelocity = 0;
  let bumpPulse = 0;
  let lastTime = 0;
  let lastReadout = 0;
  const quantities = [0, 0, 0];
  const totals = () => products.reduce((total, product, i) => ({
    count: total.count + quantities[i],
    mass: total.mass + product.mass * quantities[i],
    credits: total.credits + product.price * quantities[i],
  }), { count: 0, mass: 0, credits: 0 });
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
  };
  const paint = (readout = true) => {
    const total = totals();
    if (fixed) return;
    const cart = $("#arcade-cart");
    cart.style.left = `calc(${x}% - ${x * 0.64}px)`;
    cart.style.top = `${30 + x * 0.65}px`;
    cart.style.transform = bumpLift > 0 ? `translateY(${-bumpLift}px) rotate(${-Math.min(16, bumpLift * 0.65)}deg)` : "";
    cart.classList.toggle("arcade-cart-bumping", bumpPulse > 0);
    stage.querySelector(".arcade-speed-bump")?.classList.toggle("arcade-bump-hit", bumpPulse > 0);
    $("#arcade-cart-load").textContent = `${total.mass} kg`;
    if (readout) $("#arcade-cart-state").textContent = `${bumpPulse > 0 ? "BUMP! " : ""}${completed ? "Intentional checkout confirmed" : arrived ? "Accidental checkout — return to start to recover" : running ? "Rolling" : "Paused"} · position ${Math.round(x)}% · speed ${velocity.toFixed(1)}%/s · brake ${brake ? "ON" : "OFF"}.${motion.matches ? " Reduced motion: manual steps only." : ""}`;
    $("#arcade-start").textContent = running ? "Pause rolling" : "Start rolling";
    $("#arcade-start").disabled = completed || motion.matches || arrived || !total.count;
    $("#arcade-step").disabled = completed || running || arrived || !total.count;
    $("#arcade-brake").setAttribute("aria-pressed", String(brake));
    $("#arcade-brake").textContent = `Brake: ${brake ? "ON" : "OFF"}`;
  };
  const updateBasket = () => {
    const total = totals();
    products.forEach((product, i) => {
      $(`#arcade-quantity-${i}`).textContent = String(quantities[i]);
      $(`[data-remove="${i}"]`).disabled = quantities[i] === 0;
      $(`[data-add="${i}"]`).disabled = quantities[i] >= 9;
    });
    $("#arcade-basket-total").textContent = `${total.count} items · ${total.mass} kg · ${total.credits} credits. Limit: 9 of each item.`;
    if (!total.count) { stop(); velocity = 0; }
    $("#arcade-checkout").disabled = completed || !total.count;
    paint();
  };
  const advance = seconds => {
    if (arrived || !totals().count) return;
    // Small fixed substeps bound integration, including the manual half-second step.
    let remaining = Math.min(seconds, 0.5);
    while (remaining > 0 && !arrived) {
      const dt = Math.min(remaining, 1 / 120);
      const acceleration = (worse ? 4 : 2) + Math.min(totals().mass, 80) * (worse ? 0.4 : 0.22);
      velocity = Math.max(0, Math.min(38, velocity + (brake ? -90 : acceleration - 0.14 * velocity) * dt));
      x = Math.min(90, Math.max(0, x + velocity * dt));
      if (worse && !bumpUsed && x >= 50) {
        bumpUsed = true;
        velocity = brake ? 0 : Math.max(3, velocity * 0.45);
        bumpVelocity = motion.matches ? 0 : brake ? 55 : 105;
        bumpPulse = 0.85;
        say(brake ? "The brake absorbed the speed bump and stopped the cart." : "Speed bump at 50%: the cart jumped and lost more than half its speed.");
      }
      if (bumpLift > 0 || bumpVelocity > 0) {
        bumpLift += bumpVelocity * dt;
        bumpVelocity -= 240 * dt;
        if (bumpLift <= 0 && bumpVelocity < 0) {
          bumpLift = 0;
          bumpVelocity = 0;
        }
      }
      bumpPulse = Math.max(0, bumpPulse - dt);
      if (x >= 90) {
        arrived = true;
        velocity = 0;
        stop();
        say(`Accidental checkout for ${totals().credits} credits. Your task is still incomplete. Pull back or Return to start, review your basket, then select Checkout.`);
      }
      remaining -= dt;
    }
  };
  const tick = time => {
    if (disposed || !running) return;
    if (lastTime) advance(Math.min((time - lastTime) / 1000, 0.05));
    lastTime = time;
    const readout = time - lastReadout >= 150 || !running;
    paint(readout);
    if (readout) lastReadout = time;
    if (running) frame = requestAnimationFrame(tick);
  };
  const park = () => {
    stop();
    autoStart = false;
    x = 4;
    velocity = 0;
    arrived = false;
    bumpUsed = false;
    bumpLift = 0;
    bumpVelocity = 0;
    bumpPulse = 0;
    brake = false;
    paint();
  };
  products.forEach((product, i) => {
    on($(`[data-add="${i}"]`), "click", () => {
      quantities[i] = Math.min(9, quantities[i] + 1);
      updateBasket();
      if (!fixed && autoStart && !motion.matches && !arrived && !running) {
        running = true;
        lastTime = 0;
        frame = requestAnimationFrame(tick);
        paint();
      }
      say(`${product.name} added.${fixed ? " The basket stays still." : running ? " The cart is rolling! More mass means more acceleration." : motion.matches ? " Reduced motion: use Advance half a second to move the cart." : " The cart remains held. Resume when ready."}`);
    });
    on($(`[data-remove="${i}"]`), "click", () => {
      quantities[i] = Math.max(0, quantities[i] - 1);
      updateBasket();
      say(`${product.name} removed. ${totals().count ? "Basket updated." : "Empty basket; cart stopped."}`);
    });
  });
  if (!fixed) stage.querySelector(".arcade-shop").insertAdjacentHTML("beforeend", '<button class="demo-button" id="arcade-checkout">Checkout</button>');
  on($("#arcade-checkout"), "click", () => {
    if (completed) return;
    if (!totals().count) { say("Add a product before checking out."); return; }
    if (arrived) { say("That checkout was accidental. Return to start or pull back before choosing your own checkout."); return; }
    completed = true;
    stop();
    velocity = 0;
    paint();
    stage.querySelectorAll("button").forEach(button => { button.disabled = true; });
    say(`Checkout confirmed: ${totals().count} items, ${totals().credits} credits.`);
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  if (!fixed) {
    on($("#arcade-start"), "click", () => {
      if (running) { autoStart = false; stop(); say("Paused. Items and position preserved."); }
      else if (!motion.matches && !arrived && totals().count) {
        autoStart = true;
        running = true;
        lastTime = 0;
        frame = requestAnimationFrame(tick);
        say(brake ? "Cart held with the brake on. Release it to roll." : "Cart rolling. Brake stays available below the track.");
      }
      paint();
    });
    on($("#arcade-brake"), "click", () => { brake = !brake; paint(); say(brake ? "Brake engaged. The cart decelerates and stays stopped." : "Brake released."); });
    on($("#arcade-pull"), "click", () => {
      x = Math.max(0, x - 12);
      velocity = Math.max(0, velocity - 12);
      arrived = false;
      paint();
      say("Pulled uphill by up to 12%. Basket preserved.");
    });
    on($("#arcade-step"), "click", () => {
      if (running) return;
      const hadUsedBump = bumpUsed;
      advance(0.5);
      paint();
      if (!arrived) say(bumpUsed && !hadUsedBump
        ? `Advanced across the speed bump. The cart lost more than half its speed and is now at ${Math.round(x)}%.`
        : `Advanced half a second. Position ${Math.round(x)}%, speed ${velocity.toFixed(1)}% per second.`);
    });
    on($("#arcade-park"), "click", () => { park(); say("Cart returned to start. Basket preserved; press Start or advance manually."); });
    on(motion, "change", () => { autoStart = false; stop(); paint(); say("Motion preference changed. Cart paused; manual advance remains available."); });
    on(document, "visibilitychange", () => {
      if (document.hidden) { autoStart = false; stop(); paint(); }
    });
  }
  on($("#arcade-empty"), "click", () => {
    quantities.fill(0);
    park();
    autoStart = true;
    updateBasket();
    say("Basket emptied and cart returned to start.");
  });
  updateBasket();
  return cleanup;
}

function renderCorporate({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { status, say } = createDemoStatus();
  stage.innerHTML = `<div class="corporate-demo"><div class="corporate-nav"><strong>◈ ${fixed ? "Clearboard" : "SYNERGIA"}</strong><span>${fixed ? "Project planning for small teams" : "VISION. VELOCITY. VALUE."}</span></div><div class="corporate-content"><span class="demo-kicker">${fixed ? "LESS ADMIN. MORE MAKING." : "YOUR POTENTIAL STARTS HERE."}</span><p>${fixed ? "Open the sample task board to explore Clearboard." : "Your team's next chapter starts with alignment. Select Unlock your potential to begin setup for the task board."}</p><h2>${fixed ? "Plan your team's work.<br>In one shared place." : worse ? "Hyper-synergize your<br>meta-potentiality." : "Tomorrow.<br>But more."}</h2><p>${fixed ? "Clearboard is a shared task board for small teams. Assign tasks, set due dates, and see what's ready to ship. $8 per person, per month." : worse ? "An AI-native, paradigm-agnostic ecosystem empowering the operationalization of your organization's next-generation potentiality at unprecedented scale." : "We empower forward-thinking innovators to unlock transformative possibilities through a next-generation ecosystem of purposeful synergy."}</p><button class="demo-button">${fixed ? "Try the sample task board →" : "Unlock your potential ↗"}</button>${status}</div><div class="corporate-orb" aria-hidden="true"></div></div>`;
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
    onboarding.innerHTML = `<span class="demo-kicker">REQUIRED ACCOUNT SETUP</span><h3>Step ${onboardingStep} of ${totalSteps}</h3><progress value="${onboardingStep}" max="${totalSteps}" aria-label="Onboarding progress"></progress><form><label for="paradigm">${questions[(onboardingStep - 1) % questions.length]}</label><select id="paradigm" required><option value="">Please operationalize a choice</option>${shuffle(["Synergistically adjacent", "Post-disruptive", "Horizontally vertical"]).map(choice => `<option>${choice}</option>`).join("")}</select>${worse ? `<label class="obstacle-check"><input type="checkbox" required> I authorize a meeting to authorize the next meeting.</label>` : ""}<button class="demo-button">Continue to almost finished →</button><button type="button" class="plain-button" id="onboarding-back">Go back</button></form><small>Your readiness is being assessed continuously.</small>`;
    onboarding.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      onboardingStep++;
      totalSteps += worse ? 3 : 2;
      if (onboardingStep === 5) {
        onboarding.innerHTML = `<h3>Product still unavailable</h3><p>You finished the original four steps, but the website added ${totalSteps - onboardingStep + 1} more. The task board is still out of reach. Fix it opens the product directly.</p>`;
        const message = "Onboarding blocked access to the task board. Four finished steps produced more setup instead of the product.";
        say(message);
        completeExhibit(stage, message, "blocked");
        return;
      }
      renderOnboarding();
      say(`Step completed, but more steps were added. ${totalSteps - onboardingStep} steps now remain.`);
      onboarding.querySelector("select").focus();
    });
    onboarding.querySelector("#onboarding-back").addEventListener("click", () => {
      onboardingStep = 1;
      renderOnboarding();
      say("Go back restarted setup from step one. Your previous answers have been discarded.");
      onboarding.querySelector("select").focus();
    });
  };
  stage.querySelector("button").addEventListener("click", () => {
    stage.querySelector(".corporate-content > button").disabled = true;
    if (fixed) {
      stage.querySelector("#demo-status").innerHTML = `Sample board <span class="sample-tasks"><span>To do: Draft homepage</span><span>In progress: Build navigation</span><span>Done: Choose readable fonts</span></span>`;
      completeExhibit(stage, "Sample task board opened. You can see the product without an account or extra setup.");
    } else {
      stage.querySelector(".corporate-content").append(onboarding);
      renderOnboarding();
      onboarding.querySelector("select").focus();
      say("Setup started. Choose an answer to continue.");
    }
  });
  return () => {};
}

function renderCancel({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  shell("YOUR SUBSCRIPTION TO NOTHING", fixed ? "Cancel your subscription." : "Are you sure you're not unsure?",
    fixed ? "You want to cancel. Select Cancel subscription to end the plan; there are no extra confirmations." : "To end your subscription, confirm your choice at each checkpoint. Translate this question is available if you need help. Your plan remains active until the status reads CANCELLED.",
    `<div class="cancellation-machine" id="cancel-maze"></div>`);
  const maze = stage.querySelector("#cancel-maze");
  const openingQuestion = {
    question: "Do you want to cancel your subscription?",
    cancel: "Yes, cancel my subscription", keep: "No, keep my subscription",
    translation: "Do you want to end the subscription?",
    explanation: 'Cancelling means ending the subscription. Choosing yes continues cancellation; choosing no keeps you subscribed.',
  };
  const baseQuestions = [
    {
      question: "Do you want to stop not cancelling?",
      cancel: "Yes, stop not cancelling", keep: "No, continue not cancelling",
      translation: "Do you want to cancel?",
      explanation: '"Not cancelling" means keeping the subscription. Stopping that means cancelling it.',
    },
    {
      question: "Should we disable renewal prevention?",
      cancel: "No, keep renewal prevention", keep: "Yes, disable renewal prevention",
      translation: "Should we turn automatic renewal back on?",
      explanation: '"Renewal prevention" stops the next renewal. Keeping it continues cancellation; disabling it lets the subscription renew.',
    },
    {
      question: "Would you decline the option to remain?",
      cancel: "Yes, decline remaining", keep: "No, do not decline remaining",
      translation: "Do you want to turn down staying subscribed?",
      explanation: '"Remain" means stay subscribed. Declining that option means leaving.',
    },
    {
      question: "Do not undo your cancellation?",
      cancel: "Correct, do not undo it", keep: "Incorrect, undo the cancellation",
      translation: "Should we leave your cancellation in place?",
      explanation: 'Undoing cancellation keeps the subscription. "Do not undo it" keeps cancellation going.',
    },
  ];
  const hardQuestions = [
    {
      question: "Do you decline to refuse our offer not to cancel?",
      cancel: "No, I refuse the offer not to cancel", keep: "Yes, I decline to refuse it",
      translation: "Do you accept our offer to stay subscribed?",
      explanation: 'The offer is to keep the subscription. Refusing it continues cancellation; declining to refuse it accepts staying.',
    },
    {
      question: "Should we not prevent your request to stop renewal?",
      cancel: "Yes, do not prevent stopping renewal", keep: "No, prevent stopping renewal",
      translation: "Should we let your request to stop renewal go ahead?",
      explanation: 'Preventing the request keeps renewal active. Not preventing it lets cancellation continue.',
    },
    {
      question: "Would you refuse to reject the decision not to renew?",
      cancel: "Yes, I refuse to reject not renewing", keep: "No, I reject the decision not to renew",
      translation: "Do you stand by your decision to stop renewal?",
      explanation: '"Not to renew" means ending the subscription. Refusing to reject that decision keeps cancellation going; rejecting it keeps renewal active.',
    },
    {
      question: "Should we undo the reversal of your decision to cancel?",
      cancel: "Yes, undo the reversal of cancelling", keep: "No, keep the reversal of cancelling",
      translation: "Should we restore your decision to cancel?",
      explanation: 'Reversing cancellation means staying subscribed. Undoing that reversal restores cancellation.',
    },
  ];
  let questions = [openingQuestion, ...(worse ? shuffle([...baseQuestions, ...hardQuestions]) : baseQuestions)];
  let step = 0;
  let mistakes = 0;
  const total = fixed ? 1 : questions.length;
  const render = () => {
    if (step === total) {
      maze.innerHTML = `<div class="cancelled-stamp">CANCELLED</div><p>Subscription ended. Renewal is off. No more confirmations.</p>`;
      const message = `Subscription cancelled. Renewal is off.${fixed ? "" : ` You escaped after ${total} checkpoints and ${mistakes} wrong turns.`}`;
      say(message);
      completeExhibit(stage, message);
      return;
    }
    const question = questions[step];
    const options = fixed ? [{ text: "Cancel subscription", correct: true }] : [
      { text: question.cancel, correct: true }, { text: question.keep, correct: false },
    ];
    maze.innerHTML = `<p class="cancel-plan-status">Subscription: ACTIVE &mdash; not cancelled yet.</p>${fixed ? "" : `<span class="demo-kicker" id="cancel-progress">CHECKPOINT ${step + 1} / ${total} &middot; WRONG TURNS: ${mistakes}</span><h3 id="cancel-question" tabindex="-1" aria-describedby="cancel-progress">${question.question}</h3><details class="cancel-help"><summary>Translate this question</summary><p>${question.translation}</p><p>${question.explanation}</p><p>To continue cancellation, choose <strong>&ldquo;${question.cancel}&rdquo;</strong></p></details>`}<div class="cancel-options">${(!fixed ? shuffle(options) : options).map(option => `<button type="button" class="demo-button" data-cancel-correct="${option.correct}">${option.text}</button>`).join("")}</div><div class="cancel-feedback" id="cancel-feedback" hidden></div>`;
    maze.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
      if (button.dataset.cancelCorrect === "true") {
        step++;
        render();
        if (step < total) {
          say(`That answer continues cancellation. ${step} of ${total} checkpoints cleared; the subscription is still active. Choose an answer at checkpoint ${step + 1}.`);
          maze.querySelector("#cancel-question").focus({ preventScroll: true });
          maze.scrollIntoView({ block: "start", behavior: "instant" });
        }
      } else {
        mistakes++;
        maze.querySelector("#cancel-progress").textContent = `CHECKPOINT ${step + 1} / ${total} \u00b7 WRONG TURNS: ${mistakes}`;
        const nextStep = worse ? 0 : Math.max(0, step - 1);
        const penalty = worse ? "All checkpoint progress is lost, and the questions will be reshuffled."
          : step === 0 ? "You are still at the first checkpoint." : "You go back one checkpoint.";
        maze.querySelectorAll(".cancel-options button").forEach(option => { option.disabled = true; });
        const feedback = maze.querySelector("#cancel-feedback");
        feedback.innerHTML = `<h4 id="cancel-feedback-title" tabindex="-1">This choice keeps you subscribed.</h4><p>You chose <strong>&ldquo;${question.keep}&rdquo;</strong></p><p>${question.explanation}</p><p>To continue cancellation, choose <strong>&ldquo;${question.cancel}&rdquo;</strong> when this question appears again.</p><p>${penalty} Select Return to checkpoint ${nextStep + 1} to try again.</p><button type="button" class="demo-button" id="cancel-retry">Return to checkpoint ${nextStep + 1}</button>`;
        feedback.hidden = false;
        say(`Not cancelled. ${penalty} Read the explanation, then select Return to checkpoint ${nextStep + 1}.`);
        feedback.querySelector("#cancel-retry").addEventListener("click", () => {
          step = nextStep;
          if (worse) questions = [openingQuestion, ...shuffle(questions.slice(1))];
          render();
          say(`Try checkpoint ${step + 1} of ${total}. Choose the answer that continues cancellation, or open Translate this question for help.`);
          maze.querySelector("#cancel-question").focus({ preventScroll: true });
          maze.scrollIntoView({ block: "start", behavior: "instant" });
        });
        feedback.querySelector("h4").focus({ preventScroll: true });
        feedback.scrollIntoView({ block: "start", behavior: "instant" });
      }
    }));
  };
  render();
  return () => {};
}

function renderFonts({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  shell("NOTICE / CREATIVE COMMITTEE", fixed ? "Let the words do the work." : "Welcome to the font buffet.",
    fixed ? "Write the event notice Library open until 9 pm, then select Save draft." : "Write the event notice Library open until 9 pm, then select Save draft. Shuffle styles offers another arrangement without changing your words.",
    `<label class="type-label" for="type-input">Event notice: Library open until 9 pm</label><input id="type-input" type="text" maxlength="100" placeholder="Library open until 9 pm" autocomplete="off"><div class="new-actions"><button class="demo-button" id="type-remix">${fixed ? "Apply readable typography" : "Shuffle styles"}</button><button class="plain-button" id="type-approve">Save draft</button></div><div class="type-output" id="type-output" aria-label="Typography preview"></div><p class="type-revision" id="type-revision"></p>`);
  const families = ["Georgia, serif", "'Courier New', monospace", "'Comic Sans MS', cursive", "Impact, fantasy", "'Trebuchet MS', sans-serif", "Arial, sans-serif"];
  const colors = ["#74305d", "#204e80", "#3d5e34", "#8b361c", "#443269", "#272d32"];
  const input = stage.querySelector("#type-input");
  const output = stage.querySelector("#type-output");
  output.setAttribute("role", "img");
  let revision = 0;
  const render = () => {
    output.replaceChildren();
    output.setAttribute("aria-label", input.value || "Empty typography preview");
    revision++;
    if (fixed) output.textContent = input.value;
    else {
      const pieces = worse ? [...input.value] : input.value.split(/(\s+)/);
      pieces.forEach(piece => {
        if (/^\s+$/.test(piece)) { output.append(document.createTextNode(piece)); return; }
        const span = document.createElement("span");
        span.className = "type-fragment";
        span.textContent = piece;
        span.setAttribute("aria-hidden", "true");
        span.style.fontFamily = families[Math.floor(Math.random() * families.length)];
        span.style.fontSize = `${(worse ? 14 : 19) + Math.floor(Math.random() * (worse ? 37 : 17))}px`;
        span.style.color = colors[Math.floor(Math.random() * colors.length)];
        span.style.fontWeight = Math.random() < 0.5 ? "400" : "900";
        span.style.fontStyle = Math.random() < 0.4 ? "italic" : "normal";
        span.style.transform = `rotate(${Math.floor(Math.random() * (worse ? 25 : 9)) - (worse ? 12 : 4)}deg)`;
        if (worse) span.style.letterSpacing = `${Math.floor(Math.random() * 5)}px`;
        output.append(span);
      });
    }
    stage.querySelector("#type-revision").textContent = fixed ? "One font and size." : `Design revision ${revision}. ${worse ? "Every character" : "Every word"} has been assigned a different opinion.`;
  };
  input.addEventListener("input", render);
  stage.querySelector("#type-remix").addEventListener("click", () => {
    render();
    say(fixed ? "Readable type applied." : "Styles shuffled. The words stayed the same; save the notice when it is ready.");
  });
  stage.querySelector("#type-approve").addEventListener("click", () => {
    if (!matchesDemoText(input.value, "Library open until 9 pm")) { say("Write the event notice Library open until 9 pm before saving your draft."); return; }
    input.readOnly = true;
    stage.querySelector("#type-remix").disabled = true;
    stage.querySelector("#type-approve").disabled = true;
    say("Event notice ready: Library open until 9 pm.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  render();
  return () => {};
}
