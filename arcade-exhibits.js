const arcadeExhibits = [
  { id: "password-crane", number: "26", category: "Forms", color: "lilac", name: "The Password Crane Game", tagline: "Your next character is just out of reach.", description: "Steer a claw across all 128 ASCII characters to construct a fictional password.", lesson: "Secure characters must be won through dexterity. Control codes are stored beside the plush toys for convenience.", fix: "The crane was retired. A normal field now accepts invented passwords without tokens." },
  { id: "physics-cart", number: "27", category: "Commerce", color: "orange", name: "The Physics Shopping Cart", tagline: "Your basket has checkout momentum.", description: "Every product makes a wheeled cart roll faster toward an entirely imaginary purchase.", lesson: "Every purchase has momentum, especially downhill. Adding a second item is considered informed acceleration.", fix: "The basket has been fitted with brakes and a separate checkout button." },
];

function arcadePreview(id) {
  if (id === "password-crane") return '<div class="new-preview arcade-preview-crane"><span>PLEASE GRAB YOUR PASSWORD</span><strong>┬<br>⋔</strong><div><b>A</b><b>a</b><b>9</b><b>!</b></div><small>One claw. 128 characters. No dignity.</small></div>';
  if (id === "physics-cart") return '<div class="new-preview arcade-preview-cart"><span>CHECKOUT IS A DOWNHILL SPORT</span><strong>▱ → →</strong><div>○ &nbsp; ○ &nbsp; BUY NOW*</div><small>*Imaginary purchases. Actual momentum.</small></div>';
}

function renderArcadeExhibit({ id, stage, mode = "bad", shell, say }) {
  const arcadeDrafts = { password: "", quantities: [0, 0, 0] };
  const fixed = mode === "fixed";
  const worse = mode === "worse";
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

  if (id === "password-crane") {
    const target = "Claw_M00n!42";
    const limit = 80;
    const bankSize = 8;
    const chute = bankSize;
    const letters = Array.from({ length: 128 }, (_, code) => String.fromCharCode(code));
    const controlNames = ["NUL", "SOH", "STX", "ETX", "EOT", "ENQ", "ACK", "BEL", "BS", "TAB", "LF", "VT", "FF", "CR", "SO", "SI", "DLE", "DC1", "DC2", "DC3", "DC4", "NAK", "SYN", "ETB", "CAN", "EM", "SUB", "ESC", "FS", "GS", "RS", "US"];
    const tileLabel = character => controlNames[character.charCodeAt(0)] || (character === " " ? "SPACE" : character.charCodeAt(0) === 127 ? "DEL" : character);
    const showPassword = text => [...text].map(character => {
      const code = character.charCodeAt(0);
      return code < 32 || code === 127 ? `[${tileLabel(character)}]` : character;
    }).join("");
    shell("THE CREDENTIAL CLAW", fixed ? "Type. Don't operate heavy machinery." : "A password, one precarious tile at a time.",
      fixed ? "Use an invented demo phrase of at least 4 characters. This is not a real password or a strength evaluator. Nothing is sent or stored."
        : `Goal: assemble ${target} in the visible DEMO password. All 128 ASCII characters are available in 16 banks, including lowercase, digits, punctuation, space, and named control characters. Never enter a real password. Hoppers refill forever.${worse ? " Worn grip: every third grab takes the next ASCII character instead. Return it and retry; progress is never erased." : ""}`,
      `<section class="arcade-exhibit arcade-crane">
        ${fixed ? `<form id="arcade-phrase-form"><label for="arcade-phrase">Invented demo phrase (4–${limit} characters; visible)</label><input id="arcade-phrase" type="text" minlength="4" maxlength="${limit}" required autocomplete="off" spellcheck="false"><button class="demo-button">Use demo phrase</button></form>` : `
        <p id="arcade-crane-help" class="arcade-instructions">Choose an ASCII bank, move over a tile, and Grab. Carry it to DROP and release. With the cabinet or a crane button focused: <kbd>←</kbd>/<kbd>→</kbd> move, <kbd>Page Up</kbd>/<kbd>Page Down</kbd> switch banks, and <kbd>Home</kbd>/<kbd>End</kbd> jump to the first tile/chute. <kbd>Space</kbd> grabs or drops on the cabinet and activates focused buttons normally. Held tiles travel between banks unchanged.</p>
        <div class="arcade-bank"><label for="arcade-bank">ASCII character bank</label><select id="arcade-bank"></select><div class="new-actions"><button type="button" class="plain-button" id="arcade-bank-prev">Previous bank</button><button type="button" class="plain-button" id="arcade-bank-next">Next bank</button></div></div>
        <div id="arcade-cabinet" class="arcade-cabinet" tabindex="0" role="group" aria-label="Password claw controls" aria-describedby="arcade-crane-help arcade-claw-state">
          <div class="arcade-crane-rail" aria-hidden="true"><div id="arcade-claw" class="arcade-claw"><span class="arcade-claw-rope"></span><span class="arcade-claw-jaw">⋔</span><b id="arcade-held-tile"></b></div></div>
          <div class="arcade-hoppers" aria-hidden="true">${Array.from({ length: bankSize }, () => '<div class="arcade-hopper"><b></b><small></small></div>').join("")}<div class="arcade-chute">DROP<small>9</small></div></div>
        </div>
        <p id="arcade-claw-state" class="arcade-readout"></p>
        <div class="new-actions arcade-controls"><button class="plain-button" id="arcade-left">← Left</button><button class="plain-button" id="arcade-right">Right →</button><button class="demo-button" id="arcade-grab">Grab tile</button><button class="demo-button" id="arcade-drop">Drop in password</button><button class="plain-button" id="arcade-return">Return held tile</button></div>
        <div class="arcade-password"><span>Visible DEMO password · goal: ${target}</span><output id="arcade-password"></output><small id="arcade-password-count"></small><small>Control characters appear as [NUL], [TAB], etc.; each token is one actual ASCII character. Spaces are preserved.</small></div>
        <div class="new-actions"><button class="plain-button" id="arcade-undo">Undo last letter</button><button class="demo-button" id="arcade-check">Check demo password</button></div>`}
        <div class="new-actions"><button class="plain-button" id="arcade-crane-reset">Reset demo password</button></div>
      </section>`);
    if (fixed) {
      const input = $("#arcade-phrase");
      input.value = arcadeDrafts.password;
      on(input, "input", () => { arcadeDrafts.password = input.value; });
      on($("#arcade-phrase-form"), "submit", event => {
        event.preventDefault();
        say(input.value.trim().length >= 4 ? "Demo phrase accepted. No account was created and nothing was sent." : "Use at least 4 non-padding characters in your invented phrase.");
        if (input.value.trim().length >= 4) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
      });
      on($("#arcade-crane-reset"), "click", () => {
        arcadeDrafts.password = "";
        input.value = "";
        say("Demo phrase cleared.");
      });
      return cleanup;
    }
    const bankSelect = $("#arcade-bank");
    for (let index = 0; index < letters.length / bankSize; index++) {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = `ASCII ${String(index * bankSize).padStart(3, "0")}-${String(index * bankSize + bankSize - 1).padStart(3, "0")} (${tileLabel(letters[index * bankSize])} to ${tileLabel(letters[index * bankSize + bankSize - 1])})`;
      bankSelect.append(option);
    }
    let bank = 8;
    let lane = 0;
    let held = "";
    let grabs = 0;
    const update = () => {
      bankSelect.value = String(bank);
      $("#arcade-bank-prev").disabled = bank === 0;
      $("#arcade-bank-next").disabled = bank === letters.length / bankSize - 1;
      stage.querySelectorAll(".arcade-hopper").forEach((hopper, index) => {
        const code = bank * bankSize + index;
        hopper.querySelector("b").textContent = tileLabel(letters[code]);
        hopper.querySelector("small").textContent = String(code).padStart(3, "0");
        hopper.classList.toggle("arcade-selected", lane === index);
      });
      $(".arcade-chute").classList.toggle("arcade-selected", lane === chute);
      $("#arcade-claw").style.left = `${(lane + 0.5) / (bankSize + 1) * 100}%`;
      $("#arcade-held-tile").textContent = held ? tileLabel(held) : "";
      $("#arcade-claw-state").textContent = `Bank ${bank + 1}/16. Position ${lane + 1} of ${bankSize + 1}: ${lane === chute ? "DROP chute" : `${tileLabel(letters[bank * bankSize + lane])} (ASCII ${bank * bankSize + lane})`}. Holding: ${held ? tileLabel(held) : "nothing"}. Grabs: ${grabs}.`;
      $("#arcade-password").textContent = arcadeDrafts.password ? showPassword(arcadeDrafts.password) : "(empty)";
      $("#arcade-password-count").textContent = `${arcadeDrafts.password.length} / ${limit} characters`;
      $("#arcade-left").disabled = lane === 0;
      $("#arcade-right").disabled = lane === chute;
      $("#arcade-grab").disabled = Boolean(held) || lane === chute;
      $("#arcade-drop").disabled = !held || lane !== chute || arcadeDrafts.password.length >= limit;
      $("#arcade-return").disabled = !held;
      $("#arcade-undo").disabled = !arcadeDrafts.password;
    };
    const move = direction => {
      lane = Math.max(0, Math.min(chute, lane + direction));
      update();
    };
    const changeBank = value => {
      bank = Math.max(0, Math.min(letters.length / bankSize - 1, value));
      update();
    };
    on(bankSelect, "change", () => changeBank(Number(bankSelect.value)));
    on($("#arcade-bank-prev"), "click", () => changeBank(bank - 1));
    on($("#arcade-bank-next"), "click", () => changeBank(bank + 1));
    const grab = () => {
      if (held || lane === chute) { say(held ? "Already holding a tile. Drop it at the chute, or return it." : "This is the chute. Move left to a character hopper."); return; }
      grabs++;
      const slipped = worse && grabs % 3 === 0;
      held = letters[(bank * bankSize + lane + (slipped ? 1 : 0)) % letters.length];
      if (!motion.matches) {
        const animation = $("#arcade-claw").animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(50px)", offset: 0.5 }, { transform: "translateY(0)" }],
          { duration: 420, easing: "ease-in-out" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
      say(slipped ? `The worn claw slipped sideways and grabbed ${tileLabel(held)}. Return it to retry, or keep it.` : `Grabbed ${tileLabel(held)}. Move to DROP at position ${chute + 1}, then release.`);
      update();
    };
    const drop = () => {
      if (!held || lane !== chute) { say(`Hold a tile and move to the DROP chute at position ${chute + 1} first.`); return; }
      if (arcadeDrafts.password.length >= limit) { say(`The demo holds ${limit} characters. Undo a character before adding another.`); return; }
      arcadeDrafts.password += held;
      held = "";
      update();
      say(arcadeDrafts.password === target ? `${target} assembled! Check demo password to finish.` : "Tile added. Undo always removes the last character.");
    };
    on($("#arcade-left"), "click", () => move(-1));
    on($("#arcade-right"), "click", () => move(1));
    on($("#arcade-grab"), "click", grab);
    on($("#arcade-drop"), "click", drop);
    on($("#arcade-return"), "click", () => { held = ""; update(); say("Tile returned. Your assembled password is unchanged."); });
    on($("#arcade-undo"), "click", () => {
      arcadeDrafts.password = arcadeDrafts.password.slice(0, -1);
      update();
      say("Last letter removed.");
    });
    on($("#arcade-check"), "click", () => {
      say(arcadeDrafts.password === target
        ? `Success! The fictional password is ${target}. No real credentials were used or saved.`
        : `Not ${target} yet. Use Undo to remove unwanted characters, or reset and try again.`);
      if (arcadeDrafts.password === target) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    });
    on($(".arcade-crane"), "keydown", event => {
      if (event.target.closest("select, input, textarea")) return;
      if (!["ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End", " "].includes(event.key) || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === " " && event.target.closest("button")) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") move(-1);
      else if (event.key === "ArrowRight") move(1);
      else if (event.key === "PageUp") changeBank(bank - 1);
      else if (event.key === "PageDown") changeBank(bank + 1);
      else if (event.key === "Home") move(-chute);
      else if (event.key === "End") move(chute);
      else if (!event.repeat) { if (held) drop(); else grab(); }
    });
    on($("#arcade-crane-reset"), "click", () => {
      animations.forEach(animation => animation.cancel());
      animations.clear();
      arcadeDrafts.password = "";
      bank = 8;
      lane = 0;
      held = "";
      grabs = 0;
      update();
      say(`Cabinet reset. Goal: ${target}. All 128 ASCII characters are available across the banks.`);
    });
    on(motion, "change", () => {
      if (motion.matches) {
        animations.forEach(animation => animation.cancel());
        animations.clear();
      }
    });
    update();
    return cleanup;
  }

  if (id === "physics-cart") {
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
    const quantities = arcadeDrafts.quantities;
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
  return cleanup;
}
