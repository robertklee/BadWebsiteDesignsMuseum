// Commerce & messaging: marketing copy, checkout, and subscription flows.
import { createStageShell, createDemoStatus } from "./shared.js";

export const exhibits = [
  { id: "newsletter", name: "Before You Read Literally Anything", category: "Commerce", color: "pink", tagline: "A newsletter with a fake moustache is still a newsletter.", description: "Read a short article without subscribing while increasingly desperate newsletter boxes negotiate your attention.", lesson: "An unread article is apparently the perfect moment to ask for a lifelong relationship. Dismissing the newsletter only makes it come back wearing a moustache.", fix: "The whole article comes first. An optional invitation waits at the end, and no means no.", worseChange: "Dismissal starts a bounded bargaining sequence: discounts, guilt, and one last thing before the disguised newsletter returns.", preview: '<div class="new-preview marketing-preview marketing-preview-newsletter"><span>BEFORE YOU READ LITERALLY ANYTHING</span><strong>WAIT!<br>Join our newsletter.</strong><div>〰 Definitely a different newsletter.</div><small>Read the article? Radical.</small></div>', render: renderNewsletter },
  { id: "layout-checkout", name: "Your Button Has Moved", category: "Commerce", color: "orange", tagline: "You wanted a bench. Dave ordered 900.", description: "A fictional checkout interrupts you with a cushion offer. Add it or negotiate your way out, then survive the sales pitches. There's a coupon, but Dave wrote the terms.", lesson: "You came to buy a bench. Now you're negotiating over a cushion and managing Dave's emotions. Repeated interruptions and unexplained totals make checkout impossible to trust.", fix: "Just the bench means just the bench. No compulsory extras, surprise fees, or negotiations with Dave.", worseChange: "Dave suggests personalized delivery options.", preview: '<div class="new-preview checkout-thumbnail"><span class="checkout-thumb-brand">THE SITTING ROOM / YOUR BASKET</span><div class="checkout-thumb-stage"><div class="checkout-thumb-product"><img src="/assets/bench.jpg" alt="" width="250" height="167"><div><b>Just a bench.</b><strong>$24</strong></div></div><div class="checkout-thumb-offer"><span>WAIT. ONE MORE THING.</span><div><i class="checkout-thumb-cushion"></i><b>Emotional support<br>cushion <em>+$6</em></b></div></div><div class="checkout-thumb-button">Checkout <span>→</span></div><span class="checkout-thumb-cursor">↖</span></div><small class="checkout-thumb-punchline">You moved to checkout.<br>Checkout moved on.</small><span class="checkout-thumb-fiction">FICTIONAL SHOP. REAL DETOUR.</span></div>', render: renderLayoutCheckout },
  { id: "ai-store", name: "The AI Everything Store", category: "Commerce", color: "blue", tagline: "Your spoon now requires a prompt.", description: "Buy ordinary objects through unnecessary AI onboarding and subscriptions.", lesson: "The spoon was already good at soup, but it lacked a growth strategy. It now has onboarding, calibration, and recurring revenue.", fix: "The spoon is a spoon again. It appears relieved.", worseChange: "The object would like to get to know you. Repeatedly.", preview: `<div class="thumb-scene thumb-ai"><span class="thumb-kicker">THE SPOON, REIMAGINED.</span><div class="thumb-spoon-product"><div class="thumb-silver-spoon" role="img" aria-label="An ordinary silver spoon"><i></i><b></b></div><div class="thumb-spoon-offer"><span>SPOON + AI</span><strong>$19.99</strong><small>/ month*</small><b>Calibration<br>required</b></div></div><small class="thumb-footer">Soup not included.</small><span class="thumb-fictional-plan">*FICTIONAL PLAN. ORDINARY SPOON.</span></div>`, render: renderAiStore },
  { id: "shrinking-unsubscribe", name: "The Shrinking Unsubscribe Button", category: "Commerce", color: "pink", tagline: "Your subscription grows. Your exit shrinks.", description: "A fictional subscription with a cancel button that shrinks and relocates as you approach.", lesson: "The cancellation button is shy and needs space. Unfortunately, it interprets the pointer as direct eye contact.", fix: "The button completed a confidence workshop and can now be approached safely.", worseChange: "The exit gets smaller, faster, and increasingly committed to not being found.", preview: `<div class="thumb-scene thumb-shrinking"><span class="thumb-kicker">YOUR PLAN STAYS FULL-SIZE</span><strong class="thumb-plan-price">$49<span>/ month*</span></strong><div class="thumb-exit-trail"><span class="thumb-exit-ghost">Unsubscribe</span><span class="thumb-exit-smaller">Unsubscribe</span><span class="thumb-exit-tiny">Unsubscribe</span><i aria-hidden="true">↖</i></div><small class="thumb-footer">*Pretend plan. Disappearing exit.</small></div>`, render: renderShrinkingUnsubscribe },
  { id: "physics-cart", category: "Commerce", color: "orange", name: "The Physics Shopping Cart", tagline: "Your basket has checkout momentum.", description: "Every product makes a wheeled cart roll faster toward an entirely imaginary purchase.", lesson: "Every purchase has momentum, especially downhill. Adding a second item is considered informed acceleration.", fix: "The basket has been fitted with brakes and a separate checkout button.", worseChange: "The hill gets steeper. Something inconvenient has appeared halfway down.", preview: '<div class="thumb-scene thumb-cart"><span class="thumb-kicker">YOUR CART IS CHECKING ITSELF OUT</span><div class="thumb-cart-hill"><div class="thumb-cart-slope"></div><div class="thumb-rolling-cart"><div class="thumb-cart-basket"><b></b><b></b></div><i></i><i></i></div><span class="thumb-cart-speed" aria-hidden="true">→ →</span><span class="thumb-checkout-zone">BUY<br>NOW*</span><span class="thumb-brake-label">BRAKE!</span></div><small class="thumb-footer">*Pretend checkout. Real downhill energy.</small></div>', render: renderPhysicsCart },
  { id: "corporate", name: "The Corporate Fog Machine", category: "Copywriting", color: "blue", tagline: "Onboarding without the onboarded part.", description: "Every completed step unlocks more mandatory steps.", lesson: "Each completed step creates exciting opportunities for additional steps. Progress is strongest when nobody can quite locate it.", fix: "The product now says what it is and asks one question. Several committees are resting.", worseChange: "Every answer opens more doors, all leading to more onboarding.", preview: `<div class="thumb-scene thumb-corporate"><span class="thumb-kicker">SYNERGIA / GETTING STARTED</span><div class="thumb-onboarding"><span class="thumb-onboarding-checks">✓ &nbsp; ✓ &nbsp; ✓ &nbsp; ✓</span><strong>All set*</strong><div class="thumb-next-setup"><span>UP NEXT</span><b>More setup.</b><i>→</i></div></div><small class="thumb-footer">*For the next setup.</small></div>`, render: renderCorporate },
  { id: "cancel", name: "The Cancellation Labyrinth", category: "Copywriting", color: "lilac", tagline: "Don't not stop not uncancelling your subscription.", description: "Escape a fictional subscription through a maze of weaponized double negatives.", lesson: "You may already have not failed to cancel, unless you declined not to remain unrenewed. Legal approved this sentence and the cancellation rate has disappeared overnight.", fix: "Cancel now means cancel. Seven negatives have been removed.", worseChange: "The maze adds triple negatives, shuffled answers, and a full reset for understanding anything incorrectly.", preview: `<div class="thumb-scene thumb-cancel"><span class="thumb-kicker">BEFORE YOU DON'T GO...</span><div class="thumb-cancel-dialog"><div class="thumb-cancel-title"><span>Confirm cancellation</span><b>×</b></div><strong>Don't not stop<br>not staying.</strong><div class="thumb-cancel-choices"><span>Yes, don't</span><span>No, also don't</span></div></div><small class="thumb-footer">Your fictional subscription awaits.</small></div>`, render: renderCancel },
  { id: "fonts", name: "The Font Buffet", category: "Typography", color: "pink", tagline: "Every word has a different art director.", description: "Type a sentence. Watch its fonts, sizes, and styles disagree.", lesson: "Every word arrived with a vision and none of them shared a mood board. The sentence is currently pursuing several directions.", fix: "One typeface was chosen. The others have promising solo careers.", worseChange: "The creative disagreement reaches every single character.", preview: `<div class="thumb-scene thumb-fonts"><span class="thumb-kicker">CONSISTENCY IS OVERRATED</span><div class="thumb-type-poster"><div><b>One</b><i>more</i></div><strong>FONT.</strong></div><small class="thumb-footer">Legibility left the chat.</small></div>`, render: renderFonts },
];

function renderNewsletter({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  const paragraphs = [
    "A bench is a remarkably complete product. It offers somewhere to sit, requires no onboarding, and has never asked anyone to verify an email address.",
    "The best bench in the park faces a tree. Its designers reserved enough room for people to pass, rather than inserting a promotional shrub directly in front of them.",
    "Good design can be this quiet: let people do the thing they came to do. Sometimes the entire feature list is a place to rest and a clear way to leave.",
  ];
  shell("THE DAILY INTERRUPTION", "Before You Read Literally Anything",
    `Goal: read all three paragraphs without subscribing. ${fixed ? "The complete article is available immediately; the invitation at the end is optional." : `Dismiss ${worse ? "six" : "two"} interruptions in total, then finish the article. Escape also declines the current offer.`} No email fields, subscriptions, or data collection.`,
    `<div class="marketing-exhibit newsletter-exhibit"><div class="marketing-viewport newsletter-viewport"><div class="newsletter-reading" id="newsletter-reading"><article aria-labelledby="newsletter-headline"><span class="demo-kicker">A TWO-MINUTE IDEA, IN THREE PARAGRAPHS</span><h3 id="newsletter-headline" tabindex="-1">In praise of a very ordinary bench</h3><div id="newsletter-paragraphs">${paragraphs.slice(0, fixed ? 3 : 1).map((text, index) => `<p><b>${index + 1}.</b> ${text}</p>`).join("")}</div></article><div class="marketing-actions"><button type="button" class="demo-button" id="newsletter-next" ${fixed ? "hidden" : ""}>Read next paragraph</button><button type="button" class="demo-button" id="newsletter-finish" ${fixed ? "" : "hidden"}>Finish reading without subscribing</button></div>${fixed ? '<aside class="newsletter-optional" id="newsletter-optional" aria-label="Optional newsletter invitation"><h4>Enjoyed the whole article?</h4><p>Our imaginary newsletter is optional. Reading never depends on joining.</p><button type="button" class="plain-button" id="newsletter-dismiss-optional">No thanks — dismiss invitation</button><button type="button" class="plain-button" id="newsletter-preview">Preview a sample (no signup)</button><p id="newsletter-sample" hidden>This month: three excellent benches. This is a sample, not a subscription.</p></aside>' : ""}</div><div class="newsletter-overlay" id="newsletter-overlay" hidden><section class="newsletter-dialog" role="dialog" aria-labelledby="newsletter-offer-title" aria-describedby="newsletter-offer-copy"><span class="demo-kicker" id="newsletter-offer-count"></span><span class="newsletter-moustache" id="newsletter-moustache" aria-hidden="true" hidden>〰</span><h3 id="newsletter-offer-title"></h3><p id="newsletter-offer-copy"></p><p class="newsletter-fiction">Fictional offer. No signup is available or required.</p><button type="button" class="demo-button" id="newsletter-decline">No thanks — let me read</button></section></div></div><p class="marketing-progress" id="newsletter-progress" role="status">${fixed ? "All three paragraphs available." : "Paragraph 1 of 3. The headline is under a sales pitch."}</p></div>`);
  const reading = stage.querySelector("#newsletter-reading");
  const overlay = stage.querySelector("#newsletter-overlay");
  const next = stage.querySelector("#newsletter-next");
  const finish = stage.querySelector("#newsletter-finish");
  const decline = stage.querySelector("#newsletter-decline");
  const progress = stage.querySelector("#newsletter-progress");
  let paragraph = fixed ? 3 : 1;
  let refusals = 0;
  let completed = false;
  let offers = [];
  let returnFocus = null;
  const baseOffer = { title: "Before you read literally anything…", copy: "Subscribe to The Daily Interruption! You have not read a word, but surely you are ready to commit." };
  const disguise = { title: "Hello! A completely different newsletter.", copy: "I am The Weekly Bench Digest. The moustache proves we have never asked you this before.", moustache: true };
  const lastOffer = { title: "One last thing. Actually the last thing.", copy: "Would a ceremonial final invitation change your mind? Decline and this box really will close." };
  const paintOffer = () => {
    const offer = offers[0];
    stage.querySelector("#newsletter-offer-title").textContent = offer.title;
    stage.querySelector("#newsletter-offer-copy").textContent = offer.copy;
    stage.querySelector("#newsletter-moustache").hidden = !offer.moustache;
    stage.querySelector("#newsletter-offer-count").textContent = `INTERRUPTION ${refusals + 1} OF ${worse ? 6 : 2}`;
    decline.focus({ preventScroll: true });
  };
  const openOffers = (queue, target) => {
    offers = queue;
    returnFocus = target;
    reading.inert = true;
    overlay.hidden = false;
    paintOffer();
  };
  const refuse = () => {
    if (overlay.hidden) return;
    refusals++;
    offers.shift();
    if (offers.length) {
      paintOffer();
      return;
    }
    overlay.hidden = true;
    reading.inert = false;
    returnFocus?.focus({ preventScroll: true });
    progress.textContent = `Paragraph ${paragraph} of 3. ${refusals} of ${worse ? 6 : 2} interruptions dismissed.`;
  };
  decline.addEventListener("click", refuse);
  // The local dialog makes only the article inert; the museum's escape controls remain usable.
  overlay.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      refuse();
    }
  });
  next.addEventListener("click", () => {
    if (!overlay.hidden || paragraph >= 3) return;
    const text = document.createElement("p");
    text.textContent = `${paragraph + 1}. ${paragraphs[paragraph]}`;
    stage.querySelector("#newsletter-paragraphs").append(text);
    paragraph++;
    progress.textContent = `Paragraph ${paragraph} of 3. Read at your own pace.`;
    if (paragraph === 2) openOffers(worse ? [disguise, lastOffer] : [disguise], next);
    if (paragraph === 3) {
      next.hidden = true;
      finish.hidden = false;
      finish.focus({ preventScroll: true });
    }
  });
  finish.addEventListener("click", () => {
    if (completed || paragraph !== 3 || !overlay.hidden) return;
    completed = true;
    finish.disabled = true;
    progress.textContent = "Article finished. Subscriptions: zero.";
    say("You read the whole article without subscribing. Nothing was collected or sent.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  if (fixed) {
    stage.querySelector("#newsletter-dismiss-optional").addEventListener("click", () => {
      stage.querySelector("#newsletter-optional").hidden = true;
      finish.focus({ preventScroll: true });
      say("Invitation dismissed. It will not return during this visit.");
    });
    stage.querySelector("#newsletter-preview").addEventListener("click", () => {
      stage.querySelector("#newsletter-sample").hidden = false;
      say("Sample displayed. You have not subscribed.");
    });
  } else {
    openOffers(worse ? [
      baseOffer,
      { title: "What about 40% off absolutely nothing?", copy: "The newsletter was already free. This discount still somehow needs its own interruption." },
      { title: "Our imaginary marketing team will be so sad.", copy: "Their feelings are not your reading assignment. You can still say no." },
      lastOffer,
    ] : [baseOffer], stage.querySelector("#newsletter-headline"));
  }
  return () => { reading.inert = false; };
}

function renderLayoutCheckout({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  shell("THE SITTING ROOM", "Your Button Has Moved",
    "A little more comfort. A little less room in the warehouse.",
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
            <section class="checkout-cart-change checkout-upsell-dialog" id="checkout-cushion-offer" role="dialog" aria-labelledby="checkout-cushion-title" hidden>
              <strong class="checkout-change-title" id="checkout-cushion-title">Most customers buy this add-on.</strong>
              <p>Emotional Support Cushion <b>+$6.00</b></p>
              <p>A softer seat for just $6. Your future self has already said yes.</p>
              <button type="button" class="demo-button" id="checkout-add-cushion">Add to cart - $6.00</button>
              <button type="button" class="plain-button" id="checkout-refuse-cushion">No thanks, just the bench</button>
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
      couponStatus.textContent = "You saved $2. Processing your savings cost $3. You're welcome.";
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
    { title: "Dave says we have to ask once more.", copy: "Dave ordered 900 benches for our warehouse that we need to sell. This isn't a recommendation anymore. He doesn't let us leave the office.", decline: "Who is Dave?" },
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
  const closeUpsell = () => {
    upsellResolved = true;
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
      closeUpsell();
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
    closeUpsell();
  });
  offer.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    event.preventDefault();
    (document.activeElement === addCushion ? refuseCushion : addCushion).focus();
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
  shell("THE FUTURE OF COMPLETELY ORDINARY OBJECTS", fixed ? "Useful objects. Nothing extra." : "Everything is AI now.",
    fixed ? "Choose an ordinary object at a straightforward one-time price." : `Select a product. Explain your intentions to it. Subscribe before it will perform its one obvious function.${worse ? " Three rounds of prompt refinement are mandatory." : ""} This is a scripted parody, not a real AI service.`,
    `<div class="ai-products">${products.map(product => `<article class="ai-product"><span class="ai-product-icon" aria-hidden="true">${product.icon}</span><span class="ai-product-badge">${fixed ? "NO CHARGER REQUIRED" : "AI-POWERED, FOR SOME REASON"}</span><h3>${product.name}${fixed ? "" : "GPT"}</h3><p>${fixed ? product.description : `The world's most unnecessarily intelligent ${product.name.toLowerCase()}.`}</p><strong>$${(fixed ? product.price : product.plan).toFixed(2)}<small>${fixed ? "one time" : "per month, per object"}</small></strong><button class="demo-button" data-ai-product="${product.id}">${fixed ? "Add to demo basket" : "Initialize product →"}</button></article>`).join("")}</div><section class="ai-setup" id="ai-setup" aria-label="Product setup" hidden></section><div class="ai-basket"><h3>Demo basket</h3><ul id="ai-basket-items"></ul><p id="ai-total">Nothing added. A financially sound decision.</p></div>`);
  let total = 0;
  let count = 0;
  const setup = stage.querySelector("#ai-setup");
  const addProduct = product => {
    const item = document.createElement("li");
    item.textContent = `${product.name}${fixed ? "" : "GPT"} — $${(fixed ? product.price : product.plan).toFixed(2)}${fixed ? " once" : "/month"}`;
    stage.querySelector("#ai-basket-items").append(item);
    total += Math.round((fixed ? product.price : product.plan) * 100);
    count++;
    stage.querySelector("#ai-total").textContent = `${count} object${count === 1 ? "" : "s"}: $${(total / 100).toFixed(2)}${fixed ? " one time" : " every month"}. Demo only; no checkout or charges.`;
    say(fixed ? "Added to the demo basket. No account, prompt, or payment needed." : "You have subscribed to an object's basic function. Fictionally. No charges or real subscription.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  };
  stage.querySelectorAll("[data-ai-product]").forEach(button => button.addEventListener("click", () => {
    const product = products.find(item => item.id === button.dataset.aiProduct);
    if (fixed) { addProduct(product); return; }
    let refinements = 0;
    const required = worse ? 3 : 1;
    setup.hidden = false;
    setup.innerHTML = `<span class="demo-kicker">MANDATORY OBJECT ONBOARDING</span><h3>Brief your ${product.name.toLowerCase()}.</h3><form id="ai-prompt-form"><label for="ai-prompt">Describe your intention in at least 12 characters.</label><textarea id="ai-prompt" maxlength="200" minlength="12" required placeholder="For example: I want this for ${product.keyword}."></textarea><small>Include the word “${product.keyword}”. The future is keyword matching.</small><button class="demo-button">Generate unnecessary intelligence</button></form><p id="ai-response" role="status">Calibration: 0 / ${required} rounds.</p><button class="plain-button" id="ai-activate" disabled>Activate $${product.plan.toFixed(2)}/month demo plan</button>`;
    setup.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      const prompt = setup.querySelector("textarea").value.trim();
      if (prompt.length < 12 || !prompt.toLowerCase().includes(product.keyword)) {
        setup.querySelector("#ai-response").textContent = `Insufficient synergy. Use at least 12 characters and mention ${product.keyword}.`;
        return;
      }
      refinements = Math.min(required, refinements + 1);
      setup.querySelector("#ai-response").textContent = `${product.generated} Calibration: ${refinements} / ${required}.${refinements < required ? " Please resubmit. We need to think about it again." : " Ready to monetize."}`;
      setup.querySelector("#ai-activate").disabled = refinements < required;
    });
    setup.querySelector("#ai-activate").addEventListener("click", () => {
      addProduct(product);
      setup.hidden = true;
      button.focus();
    });
    setup.querySelector("textarea").focus();
  }));
  return () => {};
}

function renderShrinkingUnsubscribe({ stage, mode }) {
  const { shell, say } = createStageShell(stage);
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("RETENTION THROUGH TARGET REDUCTION", fixed ? "Leave whenever you like." : "You have been fictionally subscribed.",
    `Welcome to Premium Nonsense: $49 in imaginary money per month. No real subscription, account, or charge exists.${fixed ? " Cancel the demo with one click." : ` The Cancel button would prefer you stayed. Catch it before it disappears again.${worse ? " It has taken retention training very seriously." : ""} Keyboard focus and reduced motion keep it still.`}`,
    `<div class="shrink-plan"><span>PREMIUM NONSENSE</span><strong id="shrink-plan-status">Fictional subscription: ACTIVE</strong><p>Benefits include this cancellation experience.</p><div class="shrink-arena" id="shrink-arena"><button type="button" class="demo-button shrink-target" id="shrink-cancel">Cancel subscription</button></div><div class="shrink-dashboard"><span id="shrink-size">Button size: 100%</span><span id="shrink-jumps">Escape attempts: 0</span></div><p class="shrink-fine">Nothing was purchased or saved. Only the pretend subscription above can be cancelled.</p></div>`);
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
    say("Retention has run out of ideas. The button will hold still now. Cancel away.");
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
    stage.querySelector("#shrink-plan-status").textContent = "Fictional subscription: CANCELLED";
    arena.classList.add("shrink-cancelled");
    center();
    say("Your fictional subscription is cancelled. No real account, subscription, or payment was involved.");
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
  shell("THE MOMENTUM MARKET", fixed ? "A basket that waits for you." : "Caution: shopping on an incline.",
    fixed ? "Add or remove fictional items, review the total, and deliberately simulate checkout. There are no payments."
      : `Add a fictional product and the cart immediately starts rolling. Cartoon physics: more mass means more downhill acceleration. At 90% it enters the pretend BUY NOW zone. Brake or pull it back to resist.${worse ? " Worse: a steeper slope and a speed bump at 50%." : ""} Pause holds the cart even while you edit the basket. No money, orders, or payments exist here.`,
    `<section class="arcade-exhibit arcade-shop">
      <div class="arcade-products">${products.map((product, i) => `<article class="arcade-product"><h3>${product.name}</h3><p>${product.mass} pretend kg · ${product.price} demo credits</p><div class="arcade-quantity"><button class="plain-button" data-remove="${i}" aria-label="Remove one ${product.name}">−</button><output id="arcade-quantity-${i}" aria-label="${product.name} quantity">0</output><button class="plain-button" data-add="${i}" aria-label="Add one ${product.name}">+</button></div></article>`).join("")}</div>
      <p class="arcade-readout" id="arcade-basket-total"></p>
      ${fixed ? `<button class="demo-button" id="arcade-checkout">Simulate checkout — no payment</button>` : `
      <p id="arcade-track-help" class="arcade-instructions">Use the stationary controls below. Brake stays on until released. Pull back moves 12% uphill. Pause freezes time. In reduced motion, use “Advance ½ second” for a static, manual equivalent.</p>
      <div class="arcade-track" aria-hidden="true"><div class="arcade-track-slope"></div><div class="arcade-buy-zone">BUY<br>NOW*<small>*pretend</small></div><div class="arcade-cart" id="arcade-cart"><span id="arcade-cart-load">0 kg</span><i></i><i></i></div>${worse ? '<div class="arcade-speed-bump">BUMP</div>' : ""}</div>
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
    if (readout) $("#arcade-cart-state").textContent = `${bumpPulse > 0 ? "BUMP! " : ""}${arrived ? "Pretend checkout zone reached" : running ? "Rolling" : "Paused"} · position ${Math.round(x)}% · speed ${velocity.toFixed(1)}%/s · brake ${brake ? "ON" : "OFF"}.${motion.matches ? " Reduced motion: manual steps only." : ""}`;
    $("#arcade-start").textContent = running ? "Pause rolling" : "Start rolling";
    $("#arcade-start").disabled = motion.matches || arrived || !total.count;
    $("#arcade-step").disabled = running || arrived || !total.count;
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
    $("#arcade-basket-total").textContent = `${total.count} items · ${total.mass} pretend kg · ${total.credits} demo credits. Limit: 9 of each item. No payments.`;
    if (!total.count) { stop(); velocity = 0; }
    if (fixed) $("#arcade-checkout").disabled = !total.count;
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
        say(`Pretend BUY NOW triggered for ${totals().credits} demo credits. This was deliberately bad design, not a purchase. Nothing was charged. Pull back or return to start to try again.`);
        stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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
  if (fixed) {
    on($("#arcade-checkout"), "click", () => {
      say(`Intentional demo checkout: ${totals().count} items, ${totals().credits} demo credits. No payment or order was made. Your basket remains available to edit.`);
      if (totals().count) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    });
  } else {
    on($("#arcade-start"), "click", () => {
      if (running) { autoStart = false; stop(); say("Paused. Items and position preserved."); }
      else if (!motion.matches && !arrived && totals().count) {
        autoStart = true;
        running = true;
        lastTime = 0;
        frame = requestAnimationFrame(tick);
        say(brake ? "Simulation started with the brake on. Release it to roll." : "Cart rolling. Brake stays available below the track.");
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
    on(motion, "change", () => { autoStart = false; stop(); paint(); say("Motion preference changed. Simulation paused; manual advance remains available."); });
    on(document, "visibilitychange", () => {
      if (document.hidden) { autoStart = false; stop(); paint(); }
    });
  }
  on($("#arcade-empty"), "click", () => {
    quantities.fill(0);
    park();
    autoStart = true;
    updateBasket();
    say("Basket emptied and simulation reset.");
  });
  updateBasket();
  return cleanup;
}

function renderCorporate({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { status, say } = createDemoStatus();
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
    onboarding.innerHTML = `<span class="demo-kicker">MANDATORY PRE-ONBOARDING</span><h3>Step ${onboardingStep} of ${totalSteps}</h3><progress value="${onboardingStep}" max="${totalSteps}" aria-label="Onboarding progress"></progress><form><label for="paradigm">${questions[(onboardingStep - 1) % questions.length]}</label><select id="paradigm" required><option value="">Please operationalize a choice</option>${shuffle(["Synergistically adjacent", "Post-disruptive", "Horizontally vertical"]).map(choice => `<option>${choice}</option>`).join("")}</select>${worse ? `<label class="obstacle-check"><input type="checkbox" required> I authorize a meeting to authorize the next meeting.</label>` : ""}<button class="demo-button">Continue to almost finished →</button><button type="button" class="plain-button" id="onboarding-back">Go back</button></form><small>Every completed step adds ${worse ? "three more" : "two more"}. There is no product at the end. “Fix it” ends the nonsense.</small>`;
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
  return () => {};
}

function renderCancel({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  shell("YOUR FICTIONAL SUBSCRIPTION TO NOTHING", fixed ? "Leaving should be easy." : "Are you sure you're not unsure?",
    fixed ? "Cancel this fictional subscription with one clear action." : `Task: cancel a subscription that never existed. Choose carefully.${worse ? " A wrong answer resets all progress, and button positions shuffle at every step." : " A wrong answer sends you back one step."}`,
    `<div class="cancellation-machine" id="cancel-maze"></div>`);
  const maze = stage.querySelector("#cancel-maze");
  const baseQuestions = [
    { question: "Do you want to stop not cancelling?", yes: "Yes, stop not cancelling", no: "No, continue not cancelling" },
    { question: "Should we disable renewal prevention?", yes: "No, keep renewal prevention", no: "Yes, disable renewal prevention" },
    { question: "Would you decline the option to remain?", yes: "Yes, decline remaining", no: "No, do not decline remaining" },
    { question: "Do not undo your cancellation?", yes: "Correct, do not undo it", no: "Incorrect, undo the cancellation" },
  ];
  const hardQuestions = [
    { question: "Must we not avoid declining your refusal to reject cancellation?", yes: "Don't avoid declining the refusal to reject it", no: "Avoid not declining my unrefusal" },
    { question: "Final provisional confirmation: do not fail to prevent us from not ceasing to discontinue renewal?", yes: "Confirmed: don't fail to prevent not discontinuing it", no: "Unconfirmed: cease preventing the failure not to continue" },
    { question: "Would you object if we didn't refuse not to disregard your request to stop staying?", yes: "Yes, I object to not refusing to disregard it", no: "No, don't not disregard my continued staying" },
    { question: "Should the Department of Uncancellation refrain from not reversing your non-renewal reversal?", yes: "Yes, refrain from not reversing the reversal", no: "No, reverse the refusal not to unrefrain" },
  ];
  let questions = worse ? shuffle([...baseQuestions, ...hardQuestions]) : baseQuestions;
  let step = 0;
  let mistakes = 0;
  const visits = new Map();
  const total = fixed ? 1 : questions.length;
  const render = () => {
    if (step === total) {
      maze.innerHTML = `<div class="cancelled-stamp">CANCELLED</div><p>Fictional subscription ended. No account or billing system was involved.</p>`;
      say(`You escaped${fixed ? "." : ` after ${total} confirmations and ${mistakes} wrong turns.`}`);
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
      return;
    }
    const question = questions[step];
    visits.set(question, (visits.get(question) || 0) + 1);
    const options = fixed ? [{ text: "Cancel my fictional subscription", correct: true }] : [
      { text: question.yes, correct: true }, { text: question.no, correct: false },
    ];
    maze.innerHTML = `${fixed ? "" : `<span class="demo-kicker">RETENTION CHECKPOINT ${step + 1} / ${total}</span><h3>${question.question}</h3>`}<div class="cancel-options">${(!fixed ? shuffle(options) : options).map(option => `<button class="demo-button${!fixed && visits.get(question) > 1 && option.correct ? " cancel-answer-hint" : ""}" data-cancel-correct="${option.correct}">${option.text}</button>`).join("")}</div>`;
    maze.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
      if (button.dataset.cancelCorrect === "true") {
        step++;
        say(worse ? "Your non-intention not to remain has been provisionally misunderstood. Continue." : "Your intention to leave remains insufficiently overconfirmed.");
      } else {
        mistakes++;
        step = worse ? 0 : Math.max(0, step - 1);
        if (worse) questions = shuffle(questions);
        say(worse ? "We couldn't fail to interpret that as not leaving. All non-retention progress has been retained at zero." : "Wrong turn. You have successfully remained subscribed to nothing. Back one checkpoint.");
      }
      render();
      if (step < total) maze.querySelector("button").focus();
    }));
  };
  render();
  return () => {};
}

function renderFonts({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  shell("ONE SENTENCE. SEVERAL CREATIVE DISAGREEMENTS.", fixed ? "Let the words do the work." : "Welcome to the font buffet.",
    fixed ? "Edit the sample. Every word stays readable and consistent." : `Type a sentence and watch its typography disagree. “Make fonts agree” does the opposite.${worse ? " Now every single character gets its own font, size, spacing, and rotation." : " Every word gets its own competing style."}`,
    `<label class="type-label" for="type-input">Your sample sentence (maximum 100 characters)</label><input id="type-input" type="text" maxlength="100" value="A simple sentence should not need six fonts." autocomplete="off"><div class="new-actions"><button class="demo-button" id="type-remix">${fixed ? "Apply readable typography" : "Make fonts agree"}</button><button class="plain-button" id="type-approve">Approve this design</button></div><div class="type-output" id="type-output" aria-label="Typography preview"></div><p class="type-revision" id="type-revision"></p>`);
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
    stage.querySelector("#type-revision").textContent = fixed ? "One family. One size. A little peace." : `Design revision ${revision}. ${worse ? "Every character" : "Every word"} has been assigned a different opinion.`;
  };
  input.addEventListener("input", render);
  stage.querySelector("#type-remix").addEventListener("click", () => {
    render();
    say(fixed ? "Readable type applied." : "We interpreted “agree” as “audition several more fonts.”");
  });
  stage.querySelector("#type-approve").addEventListener("click", () => {
    say(input.value.trim() ? fixed ? "Approved. Your reader's eyes thank you." : "Approved by all six art directors. None of them read it." : "Add a sample sentence before approving it.");
    if (input.value.trim()) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  render();
  return () => {};
}
