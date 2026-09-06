const puzzleExhibits = [
  { id: "email-auction", number: "30", category: "Forms", color: "orange", name: "The Email Address Auction", tagline: "Going once. Going twice. Going @.", description: "Bid for letters, digits, and symbols, then assemble any email from your winnings.", lesson: "The market opened strong on vowels, while the @ remains a premium asset. Analysts recommend holding at least two lowercase e's.", fix: "The exchange has closed. Email addresses may now be typed at face value." },
  { id: "address-jigsaw", number: "31", category: "Forms", color: "yellow", name: "The Address Jigsaw", tagline: "Some assembly required. Including your street.", description: "Reassemble a fictional address from scattered puzzle pieces.", lesson: "Your postcode was last seen beneath the sofa. The apartment number may have joined a different address.", fix: "The pieces were glued together into one surprisingly useful address field." },
  { id: "volume-seesaw", number: "32", category: "Interaction", color: "blue", name: "The Volume Seesaw", tagline: "A delicate balance of unnecessary effort.", description: "Load weights onto a wobbling seesaw to set a silent volume slider.", lesson: "The ideal listening level is a delicate agreement between anvils and balloons. Pebbles are present in an advisory role.", fix: "The playground equipment was removed, revealing a slider underneath." },
  { id: "expanding-form", number: "33", category: "Forms", color: "lilac", name: "The Expanding Form", tagline: "Every answer creates more distance.", description: "Typing pushes the next field farther away. Long answers fold the form.", lesson: "Thank you for your detailed answer. The next question has moved somewhere quieter to process it.", fix: "The fields have reconciled and are once again willing to stand near each other." },
  { id: "notification-swatter", number: "34", category: "Interaction", color: "yellow", name: "The Notification Fly Swatter", tagline: "Please dismiss your way to productivity.", description: "Swat a swarm of fake alerts before they bury the form you are completing.", lesson: "Your focus is important to us, which is why twelve messages have arrived to discuss it. More may be scheduled.", fix: "The notifications have been shown the door. The form can finally hear itself think." },
  { id: "correcting-search", number: "35", category: "Forms", color: "pink", name: "The Self-Correcting Search Bar", tagline: "We know what you meant. Unfortunately.", description: "Your query keeps becoming something else. Defend your original words.", lesson: "The search bar knows what you meant because it briefly considered what you typed. Appeals must include a short explanation.", fix: "The search bar has agreed to search for the words it was given." },
];

function puzzlePreview(id) {
  const previews = {
    "email-auction": '<div class="new-preview preview-auction"><span>LOT 06: ONE VERY RARE SYMBOL</span><strong>@</strong><div>CURRENT BID: 12 FAKE COINS</div><small>Vowels attract competitive interest.</small></div>',
    "address-jigsaw": '<div class="new-preview preview-jigsaw"><span>DELIVERY REQUIRES ASSEMBLY</span><div><b>Lane,</b><b>42</b><b>Waffle</b></div><small>Your postcode is under the sofa.</small></div>',
    "volume-seesaw": '<div class="new-preview preview-seesaw"><span>PLEASE BALANCE THE DECIBELS</span><strong>■ ━━━━━ ●</strong><div>▲</div><small>One more brick should fix it.</small></div>',
    "expanding-form": '<div class="new-preview preview-expanding"><span>JUST ONE MORE QUICK QUESTION</span><div>Name: ______</div><strong>↕</strong><div>Next field: somewhere below.</div></div>',
    "notification-swatter": '<div class="new-preview preview-swatter"><span>NEW ALERT ABOUT YOUR ALERTS</span><strong>✉ × ✉</strong><div>3 messages about your 2 messages.</div><small>Your form is underneath these.</small></div>',
    "correcting-search": '<div class="new-preview preview-correcting"><span>HELPFULLY REWRITING YOUR INTENT</span><s>quiet cafes</s><strong>quiet cages</strong><small>Obviously you wanted bird supplies.</small></div>',
  };
  return previews[id];
}

function renderPuzzleExhibit(context) {
  if (context.id === "email-auction") return renderEmailAuction(context);
  if (context.id === "address-jigsaw") return renderAddressJigsaw(context);
  if (context.id === "volume-seesaw") return renderVolumeSeesaw(context);
  if (context.id === "expanding-form") return renderExpandingForm(context);
  if (context.id === "notification-swatter") return renderNotificationSwatter(context);
  if (context.id === "correcting-search") return renderCorrectingSearch(context);
  return () => {};
}

function renderEmailAuction({ stage, mode, shell, say }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("CONTACT DETAILS SOLD SEPARATELY", fixed ? "An email address, not an auction." : "Please bid for your email address.",
    fixed ? "Type or paste any valid email address. This demo sends and stores nothing." : `No address needed upfront. Bid on any lowercase or uppercase letter, digit, or punctuation mark, then assemble your own or a fictional email from the characters you win. Choose 1-20 copies per bid, and buy the same character again whenever needed.${worse ? " Every lot attracts two rival bids, and @ attracts three." : " Vowels attract rival bids; @ has a reserve price."} Only winning bids spend imaginary coins. Nothing is stored or sent.`,
    fixed ? `<form id="auction-setup"><label for="auction-email">Email address</label><input id="auction-email" type="email" maxlength="254" required autocomplete="off" spellcheck="false" placeholder="mouse@example.test"><button class="demo-button" id="auction-open">Use email in demo</button></form>` : `<div class="auction-house auction-market" id="auction-market"><div class="auction-ledger"><span id="auction-wallet"></span><span id="auction-progress"></span></div><h3>All offered character lots</h3><p class="auction-instructions">The same full catalog is available to everyone. Pick a character and the number of copies to bid on.</p><label for="auction-filter">Show characters</label><select id="auction-filter"><option value="all">All characters</option><option value="lower">Lowercase a-z</option><option value="upper">Uppercase A-Z</option><option value="digits">Digits 0-9</option><option value="symbols">Punctuation and symbols</option></select><div class="auction-lots" id="auction-lots" role="group" aria-label="Available character lots"></div><div class="auction-lot"><span>SELECTED LOT</span><output id="auction-character">?</output><p id="auction-price">Choose a character lot above.</p></div><form id="auction-form" novalidate><label for="auction-quantity">Copies in this bid</label><select id="auction-quantity" disabled>${Array.from({ length: 20 }, (_, index) => `<option value="${index + 1}">${index + 1}</option>`).join("")}</select><label for="auction-bid">Bid for the entire selected bundle (imaginary coins)</label><input type="number" id="auction-bid" min="1" step="1" required disabled><div class="new-actions"><button class="demo-button" id="auction-place" disabled>Place bid</button><button type="button" class="plain-button" id="auction-minimum" disabled>Bid the minimum</button><button type="button" class="plain-button" id="auction-retry" disabled>Restart this lot</button></div></form><h3>Your won characters</h3><p class="auction-instructions">Click a won character to append it. Click an assembled character to return it, or drag assembled characters to reorder them. Maximum 254 characters.</p><p id="auction-inventory-empty">No winnings yet. Bid on any character to begin.</p><div class="auction-inventory" id="auction-inventory"></div><div class="auction-address"><span>ASSEMBLE YOUR EMAIL</span><div class="auction-assembly" id="auction-assembly" aria-label="Assembled email characters"></div><output id="auction-address">(empty)</output></div><div class="new-actions"><button type="button" class="demo-button" id="auction-check">Confirm assembled email</button><button type="button" class="plain-button" id="auction-undo">Undo last character</button><button type="button" class="plain-button" id="auction-clear">Return all to tray</button></div><div class="new-actions"><button type="button" class="plain-button" id="auction-reset">Restart entire auction</button></div></div>`);
  if (fixed) {
    stage.querySelector("#auction-setup").addEventListener("submit", event => {
      event.preventDefault();
      say(`Email accepted for this demo: ${stage.querySelector("#auction-email").value.trim()}. Nothing was sent or saved.`);
    });
    return () => {};
  }
  const limit = 254;
  const characters = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", ...Array.from({ length: 94 }, (_, index) => String.fromCharCode(index + 33)).filter(character => !/[a-z0-9]/i.test(character))];
  let lots = [];
  let assembled = [];
  let selected = null;
  let wallet = 0;
  let finished = false;
  const input = stage.querySelector("#auction-bid");
  const raise = worse ? 4 : 2;
  const reserve = character => character === "@" ? (worse ? 25 : 12) : /[aeiou]/i.test(character) ? (worse ? 10 : 5) : (worse ? 4 : 2);
  const competition = character => worse ? (character === "@" ? 3 : 2) : /[aeiou]/i.test(character) ? 1 : 0;
  const quantity = stage.querySelector("#auction-quantity");
  const filter = stage.querySelector("#auction-filter");
  const remaining = lot => lot.owned - assembled.filter(character => character === lot.character).length;
  const restoreFocus = () => {
    (stage.querySelector("#auction-inventory button:not(:disabled)") || stage.querySelector("#auction-check")).focus({ preventScroll: true });
  };
  const paint = () => {
    stage.querySelector("#auction-wallet").textContent = `Wallet: ${wallet} imaginary coins`;
    const owned = lots.reduce((total, lot) => total + lot.owned, 0);
    stage.querySelector("#auction-progress").textContent = `${owned} characters won; ${assembled.length} / ${limit} placed`;
    stage.querySelector("#auction-inventory-empty").hidden = owned > 0;
    for (const lot of lots) {
      lot.button.disabled = finished;
      const category = /[a-z]/.test(lot.character) ? "lower" : /[A-Z]/.test(lot.character) ? "upper" : /\d/.test(lot.character) ? "digits" : "symbols";
      lot.button.hidden = filter.value !== "all" && filter.value !== category;
      lot.button.classList.toggle("auction-lot-selected", selected === lot);
      lot.button.setAttribute("aria-pressed", String(selected === lot));
      lot.button.querySelector("small").textContent = `${lot.quantity} ${lot.quantity === 1 ? "copy" : "copies"} / ${lot.minimum} coins`;
      lot.inventory.textContent = `${lot.character} × ${remaining(lot)}`;
      lot.inventory.setAttribute("aria-label", `Append ${lot.character}: ${remaining(lot)} won copies available`);
      lot.inventory.hidden = lot.owned === 0;
      lot.inventory.disabled = finished || remaining(lot) === 0 || assembled.length >= limit;
    }
    stage.querySelector("#auction-character").textContent = selected ? selected.character : "?";
    stage.querySelector("#auction-price").textContent = selected ? `${selected.quantity} copies / Minimum bid: ${selected.minimum} coins${selected.character === "@" ? " / premium @ reserve" : ""}` : "Choose any character to buy copies, or assemble your winnings below.";
    quantity.disabled = !selected || finished;
    quantity.value = String(selected?.quantity || 1);
    input.disabled = !selected || finished;
    input.min = String(selected?.minimum || 1);
    input.max = String(wallet);
    input.value = selected ? String(selected.minimum) : "";
    for (const id of ["auction-place", "auction-minimum", "auction-retry"]) stage.querySelector(`#${id}`).disabled = !selected || finished;
    stage.querySelector("#auction-address").textContent = assembled.join("") || "(empty)";
    const assembly = stage.querySelector("#auction-assembly");
    assembly.replaceChildren();
    assembled.forEach((character, index) => {
      const token = document.createElement("button");
      token.type = "button";
      token.className = "auction-letter";
      token.textContent = character;
      token.dataset.index = index;
      token.disabled = finished;
      token.draggable = !finished;
      token.setAttribute("aria-label", `Position ${index + 1}: ${character}. Activate to return to tray.`);
      token.addEventListener("click", () => {
        assembled.splice(index, 1);
        paint();
        lots.find(lot => lot.character === character).inventory.focus({ preventScroll: true });
        say(`${character} returned to your won-character tray. No coins lost.`);
      });
      token.addEventListener("dragstart", event => {
        event.dataTransfer.setData("application/x-rbm-email-character", String(index));
        event.dataTransfer.effectAllowed = "move";
      });
      token.addEventListener("dragover", event => { if (!finished) event.preventDefault(); });
      token.addEventListener("drop", event => {
        event.preventDefault();
        const value = event.dataTransfer.getData("application/x-rbm-email-character");
        if (finished || !/^\d+$/.test(value) || Number(value) >= assembled.length) { say("Drag an assembled character from this email."); return; }
        const [moved] = assembled.splice(Number(value), 1);
        assembled.splice(index, 0, moved);
        paint();
        stage.querySelector("#auction-assembly").children[index].focus({ preventScroll: true });
        say(`Character moved to position ${index + 1}.`);
      });
      assembly.append(token);
    });
    stage.querySelector("#auction-check").disabled = finished;
    stage.querySelector("#auction-undo").disabled = finished || assembled.length === 0;
    stage.querySelector("#auction-clear").disabled = finished || assembled.length === 0;
  };
  const bid = amount => {
    if (!selected || finished) { say("Choose an available character lot before bidding."); return; }
    if (!Number.isSafeInteger(amount) || amount < selected.minimum || amount > wallet) {
      say(wallet < selected.minimum ? "You cannot afford this lot. Restart this lot to reset rival bids, or restart the auction to restore the budget." : `Bid a whole number from ${selected.minimum} to ${wallet}. Invalid bids spend nothing.`);
      return;
    }
    if (selected.rivals > 0) {
      selected.rivals--;
      selected.minimum = amount + raise;
      paint();
      say(`A fictional rival outbid you for ${selected.character}. No coins spent. This lot now needs ${selected.minimum} coins; you may bid on another lot meanwhile.`);
      return;
    }
    const won = selected;
    won.owned += won.quantity;
    wallet -= amount;
    const purchased = won.quantity;
    won.minimum = reserve(won.character) * won.quantity;
    won.rivals = competition(won.character);
    selected = null;
    paint();
    restoreFocus();
    say(`Won ${purchased} copies of ${won.character} for ${amount} imaginary coins. Assemble them from your tray, or bid for more copies.`);
  };
  stage.querySelector("#auction-form").addEventListener("submit", event => {
    event.preventDefault();
    bid(Number(input.value));
  });
  stage.querySelector("#auction-minimum").addEventListener("click", () => bid(selected?.minimum));
  quantity.addEventListener("change", () => {
    if (!selected) return;
    selected.quantity = Number(quantity.value);
    selected.minimum = reserve(selected.character) * selected.quantity;
    selected.rivals = competition(selected.character);
    paint();
    say("Bundle size changed. This lot's bids restarted for the new quantity; previous winnings are preserved.");
  });
  filter.addEventListener("change", paint);
  stage.querySelector("#auction-retry").addEventListener("click", () => {
    if (!selected) { say("Choose a lot to restart."); return; }
    selected.minimum = reserve(selected.character) * selected.quantity;
    selected.rivals = competition(selected.character);
    paint();
    say("This lot restarted at its reserve price. Won characters, your assembly, other lots, and your remaining budget are preserved.");
  });
  const open = () => {
    assembled = [];
    selected = null;
    finished = false;
    const grid = stage.querySelector("#auction-lots");
    const inventory = stage.querySelector("#auction-inventory");
    grid.replaceChildren();
    inventory.replaceChildren();
    lots = characters.map(character => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "auction-character-lot";
      button.dataset.character = character;
      const symbol = document.createElement("strong");
      symbol.textContent = character;
      button.append(symbol, document.createElement("small"));
      const owned = document.createElement("button");
      owned.type = "button";
      owned.className = "plain-button";
      owned.dataset.character = character;
      const lot = { character, quantity: 1, minimum: reserve(character), rivals: competition(character), owned: 0, button, inventory: owned };
      button.addEventListener("click", () => { selected = lot; paint(); say(`Selected ${character}. Choose how many copies to buy, or bid on any other character.`); });
      owned.addEventListener("click", () => {
        assembled.push(character);
        paint();
        if (remaining(lot) === 0) (stage.querySelector("#auction-inventory button:not(:disabled)") || stage.querySelector("#auction-check")).focus({ preventScroll: true });
        say(`${character} appended. Reorder assembled characters by dragging, or return any character to try again.`);
      });
      grid.append(button);
      inventory.append(owned);
      return lot;
    });
    wallet = worse ? 6000 : 2000;
    filter.value = "all";
    paint();
    say("All letters, digits, and punctuation are available. No email is requested upfront. Buy what you need and assemble it below.");
  };
  stage.querySelector("#auction-reset").addEventListener("click", open);
  stage.querySelector("#auction-undo").addEventListener("click", () => {
    assembled.pop();
    paint();
    say("Last character returned to your tray. All winnings are preserved.");
  });
  stage.querySelector("#auction-clear").addEventListener("click", () => {
    assembled = [];
    paint();
    say("All assembled characters returned to the tray. You still own them.");
  });
  stage.querySelector("#auction-check").addEventListener("click", () => {
    const address = assembled.join("");
    const validator = document.createElement("input");
    validator.type = "email";
    validator.required = true;
    validator.value = address;
    if (!validator.validity.valid || address.length > limit) { say("Assemble a valid email address, such as name@example.test, using your won characters. You can return or reorder mistakes without losing your winnings."); return; }
    finished = true;
    paint();
    say(`Email assembled: ${address}. No email, payment, storage, or external request was made.`);
  });
  open();
  return () => {};
}

function renderAddressJigsaw({ stage, mode, shuffle, shell, say }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const words = ["42", "Waffle", "Lane,", "Apt", "7B,", "Cloud", "City,", "CA", "90210"];
  const target = words.join(" ");
  shell("POSTAL SERVICE, NOW WITH PUZZLES", fixed ? "An address you can simply type." : "Your address arrived in pieces.",
    `${fixed ? "Type or paste" : "Assemble"} this fictional address: ${target}.${!fixed && worse ? " Four pieces belong to other addresses, and the tray reshuffles after every edit." : ""} Nothing is shipped or saved.`,
    fixed ? `<form id="jigsaw-simple"><label for="jigsaw-input">Fictional address</label><input id="jigsaw-input" type="text" required autocomplete="off"><button class="demo-button">Use demo address</button></form>` : `<div class="jigsaw-table"><p class="jigsaw-target" id="jigsaw-target"></p><p id="jigsaw-help">Tap a piece to fill the first empty slot. Tap a filled slot to return its piece. You can also drag pieces into specific slots; dragging between filled slots swaps them. Every piece and slot works with Tab and Enter.</p><div class="jigsaw-slots" id="jigsaw-slots" aria-label="Address slots"></div><h3>Scattered pieces</h3><div class="jigsaw-tray" id="jigsaw-tray" aria-label="Available address pieces"></div><output id="jigsaw-output" class="jigsaw-output">(empty)</output><div class="new-actions"><button type="button" class="demo-button" id="jigsaw-check">Confirm assembled address</button><button type="button" class="plain-button" id="jigsaw-reset">Scatter again</button></div></div>`);
  if (fixed) {
    stage.querySelector("#jigsaw-simple").addEventListener("submit", event => {
      event.preventDefault();
      say(stage.querySelector("#jigsaw-input").value.trim().replace(/\s+/g, " ") === target ? "Demo address accepted. Nothing was shipped or saved." : `Use the fictional address ${target}.`);
    });
    return () => {};
  }
  stage.querySelector("#jigsaw-target").textContent = `TARGET: ${target}`;
  const pieces = [...words, ...(worse ? ["24", "Pancake", "9C,", "10001"] : [])];
  const tray = stage.querySelector("#jigsaw-tray");
  let slots = Array(words.length).fill(null);
  let solved = false;
  const pieceButtons = pieces.map((text, id) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "jigsaw-piece";
    button.dataset.piece = id;
    button.textContent = text;
    button.draggable = true;
    button.setAttribute("aria-label", `Address piece: ${text}`);
    button.addEventListener("click", () => {
      const empty = slots.indexOf(null);
      if (empty < 0) { say("All slots are filled. Return an unwanted piece first, or drag this piece onto a slot to replace it."); return; }
      place(id, empty);
      slotButtons[empty].focus({ preventScroll: true });
    });
    return button;
  });
  const slotButtons = words.map((word, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "jigsaw-slot";
    button.dataset.slot = index;
    button.addEventListener("click", () => {
      const piece = slots[index];
      if (piece === null) { say("Choose a piece from the tray, or drag one into this empty slot."); return; }
      slots[index] = null;
      paint();
      pieceButtons[piece].focus({ preventScroll: true });
      say("Piece returned to the tray.");
    });
    stage.querySelector("#jigsaw-slots").append(button);
    return button;
  });
  const shuffleTray = () => shuffle(pieceButtons).forEach(button => tray.append(button));
  const paint = () => {
    pieceButtons.forEach((button, id) => {
      button.hidden = slots.includes(id);
      button.disabled = solved;
      button.draggable = !solved;
    });
    slotButtons.forEach((button, index) => {
      const id = slots[index];
      button.textContent = `${index + 1}. ${id === null ? "____" : pieces[id]}`;
      button.setAttribute("aria-label", `Slot ${index + 1}: ${id === null ? "empty" : pieces[id] + ". Activate to return piece."}`);
      button.disabled = solved;
      button.draggable = !solved && id !== null;
      if (id === null) delete button.dataset.piece;
      else button.dataset.piece = id;
    });
    stage.querySelector("#jigsaw-output").textContent = slots.every(id => id === null) ? "(empty)" : slots.map(id => id === null ? "____" : pieces[id]).join(" ");
    stage.querySelector("#jigsaw-check").disabled = solved;
    if (worse && !solved) shuffleTray();
  };
  const place = (id, destination) => {
    if (solved) { say("Address already assembled. Scatter again to start a new puzzle."); return; }
    if (!Number.isInteger(id) || id < 0 || id >= pieces.length) { say("Use one of the address pieces in this puzzle."); return; }
    const origin = slots.indexOf(id);
    if (origin >= 0) slots[origin] = slots[destination];
    slots[destination] = id;
    paint();
    say(`Placed ${pieces[id]} in slot ${destination + 1}.`);
  };
  stage.querySelector(".jigsaw-table").addEventListener("dragstart", event => {
    const piece = event.target.closest("[data-piece]");
    if (!piece || solved) { event.preventDefault(); return; }
    event.dataTransfer.setData("text/plain", piece.dataset.piece);
    event.dataTransfer.effectAllowed = "move";
  });
  for (const button of slotButtons) {
    button.addEventListener("dragover", event => { if (!solved) event.preventDefault(); });
    button.addEventListener("drop", event => {
      event.preventDefault();
      const value = event.dataTransfer.getData("text/plain");
      if (!/^\d+$/.test(value)) { say("Drop an address piece from this puzzle."); return; }
      place(Number(value), Number(button.dataset.slot));
    });
  }
  stage.querySelector("#jigsaw-check").addEventListener("click", () => {
    const incorrect = slots.findIndex((id, index) => id === null || pieces[id] !== words[index]);
    if (incorrect >= 0) { say(`Slot ${incorrect + 1} does not match the target yet. Your other pieces are preserved.`); return; }
    solved = true;
    paint();
    say(`Address assembled: ${target}. Nothing was shipped or saved.`);
  });
  stage.querySelector("#jigsaw-reset").addEventListener("click", () => {
    solved = false;
    slots = Array(words.length).fill(null);
    shuffleTray();
    paint();
    say("Pieces scattered. Your fictional address needs assembling again.");
  });
  shuffleTray();
  paint();
  return () => {};
}

function renderExpandingForm({ stage, mode, shell, say }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const fields = [
    { name: "Full name", placeholder: "Alex Example", type: "text", limit: 80 },
    { name: "Email address", placeholder: "alex@example.test", type: "email", limit: 80 },
    { name: "Subject", placeholder: "How can we help?", type: "text", limit: 80 },
    { name: "Message", placeholder: "Tell us a little more about your request.", limit: 160 },
  ];
  shell("GROWTH IS OUR ONLY METRIC", fixed ? "A form that respects personal space." : "Your answer has expanded our horizons.",
    fixed ? "Fill in the four demo fields. Their spacing stays put, and nothing is sent or saved." : `It starts as an ordinary contact form. Every answer rapidly creates an exponential gulf. The final Message field expands even faster, sending the Send button much farther away.${worse ? " Worse mode has an even steeper growth curve and folds longer answers." : ""} Scrolling stays inside the form, with a safety cap on each gap. Use fictional information. Compress form preserves your answers; the next edit expands it again.`,
    `<div class="expanding-machine">${fixed ? "" : '<div class="expanding-tools"><span id="expanding-distance">Extra distance: 0 px</span><button type="button" class="plain-button" id="expanding-compress">Compress form</button></div>'}<div class="expanding-viewport${fixed ? " expanding-stable" : ""}" id="expanding-viewport" tabindex="0" role="group" aria-label="Contact form"><header class="expanding-header"><span>SUPPORT</span><h3>Contact us</h3><p>Send our team a message. All fields are required.</p></header><form id="expanding-form" novalidate>${fields.map((field, index) => `<div class="expanding-section"><label for="expanding-field-${index}">${field.name} <span aria-hidden="true">*</span></label>${index === 3 ? `<textarea id="expanding-field-${index}" maxlength="${field.limit}" placeholder="${field.placeholder}" required></textarea>` : `<input id="expanding-field-${index}" type="${field.type}" maxlength="${field.limit}" placeholder="${field.placeholder}" required autocomplete="off">`}</div><div class="expanding-gap" aria-hidden="true"><span>${index === fields.length - 1 ? "The Send button" : "The next field"} is still down here.</span></div>`).join("")}<button class="demo-button" id="expanding-submit">Send message</button><p class="expanding-privacy">Museum demo only. Your message is not sent or saved.</p></form></div></div>`);
  const inputs = fields.map((_, index) => stage.querySelector(`#expanding-field-${index}`));
  const gaps = [...stage.querySelectorAll(".expanding-gap")];
  const cards = [...stage.querySelectorAll(".expanding-section")];
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let compressed = false;
  let finished = false;
  const paint = () => {
    let total = 0;
    inputs.forEach((input, index) => {
      const length = [...input.value].length;
      const finalField = index === inputs.length - 1;
      const scale = finalField ? (worse ? 2 : 3) : (worse ? 3 : 5);
      const cap = (worse ? 180000 : 60000) * (finalField ? 6 : 1);
      const growth = fixed || compressed ? 0 : Math.min(cap, Math.round((finalField ? 128 : 32) * Math.expm1(length * Math.LN2 / scale)));
      total += growth;
      gaps[index].style.height = `${growth}px`;
      gaps[index].classList.toggle("expanding-gap-open", growth >= 80);
      cards[index].style.transform = worse && !compressed && !motion.matches && length > 16 ? `perspective(700px) rotateX(${Math.min(18, length / 3)}deg) rotate(${(index % 2 ? -1 : 1) * Math.min(3, length / 20)}deg)` : "none";
    });
    if (!fixed) stage.querySelector("#expanding-distance").textContent = `Extra distance: ${total} px`;
  };
  inputs.forEach(input => input.addEventListener("input", () => { compressed = false; paint(); }));
  if (!fixed) stage.querySelector("#expanding-compress").addEventListener("click", () => {
    compressed = true;
    paint();
    say("Form compressed. All answers are preserved. The next edit will expand the spacing again.");
  });
  stage.querySelector("#expanding-form").addEventListener("submit", event => {
    event.preventDefault();
    const missing = inputs.findIndex(input => input.value.trim().length < 2);
    if (missing >= 0) {
      say(`Enter at least two non-padding characters for ${fields[missing].name.toLowerCase()}. Your other answers are preserved.`);
      inputs[missing].focus();
      return;
    }
    if (inputs[1].validity.typeMismatch) {
      say("Enter a valid demo email address, such as alex@example.test. Your other answers are preserved.");
      inputs[1].focus();
      return;
    }
    finished = true;
    inputs.forEach(input => { input.readOnly = true; });
    stage.querySelector("#expanding-submit").disabled = true;
    say("All four answers survived. Demo form complete; nothing was sent or saved.");
  });
  const motionChange = () => { if (!finished) paint(); else cards.forEach(card => { card.style.transform = "none"; }); };
  motion.addEventListener("change", motionChange);
  paint();
  return () => motion.removeEventListener("change", motionChange);
}

function renderNotificationSwatter({ stage, mode, shell, say }) {
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
      if (worse) { spawn("Your swatting accuracy needs attention"); say("Missed. We created an alert about that missed alert."); }
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

// Real dictionary words, chosen because they are unhelpful neighbours of the words people
// actually type into a search bar. Nouns are stored in base form; the stemmer pluralises them
// on demand. Verbs and adjectives are kept separate so that only they get -ing, -ed, or -est.
const correctionNouns = `quilt cages sweater medium horse oven worms costume snail scone actress
passport sittings seedlings colander bequest pickle coffin wetsuit
mutton spider rookies amount candle summit massage contract piracy downland quest rat manger
lotion legion column receipt thicket trouser bunion seance chestnut serviette puncture
downpour accord contest shopper prince prize pride
kelp yelp tablet fable crate fate gate sage cave wave farm foam fort worm firm stable catch uphold
badger beaver ferret rabbit pigeon possum llama alpaca otter goose moose moth bees beetle lobster
sardine donkey pony yak penguin walrus hamster turtle chicken parrot raccoon
aardvark armadillo axolotl capybara chinchilla pangolin platypus narwhal quokka wombat meerkat
mongoose marmot lemur tapir okapi ibex emu kiwi dodo puffin toucan flamingo pelican cormorant
albatross kestrel magpie starling wren finch newt gecko iguana chameleon salamander tadpole
guppy kipper anchovy haddock halibut mackerel sturgeon plankton krill urchin barnacle
mollusk squid octopus jellyfish seahorse weasel stoat vole shrew hedgehog wallaby
waffle noodles biscuit banana turnip potato tomato tacos pizza pasta bagel muffin custard
mustard avocado pretzel burrito radish pancake dumpling oatmeal sausage coconut
crumpet flapjack fritter strudel cruller marzipan nougat truffle brittle toffee fudge sherbet
meringue macaron eclair cannoli gnocchi ravioli linguine farfalle couscous quinoa falafel hummus
gazpacho goulash paella risotto polenta chowder gumbo bisque kimchi wasabi paprika saffron
oregano nutmeg cinnamon vanilla licorice rhubarb gooseberry kumquat lychee papaya guava apricot
plantain zucchini broccoli cauliflower asparagus artichoke parsnip rutabaga kohlrabi arugula
teapot toaster helmet bucket ladder carpet curtain pillow socks slipper trumpet shovel fridge
kettle spoon umbrella wheelbarrow suitcase lamp broom mailbox stapler gazebo
doorknob doorbell dustpan spatula sieve ladle tureen decanter thermos canteen satchel
knapsack valise hamper barrel cask flagon tankard goblet chalice saucer mantel banister
threshold awning gutter chimney weathervane sundial hourglass metronome abacus telescope
microscope periscope kaleidoscope gramophone accordion bagpipes harmonica ukulele banjo
tambourine xylophone kazoo tuba oboe bassoon cello harp
wizard goblin dragon ghost vampire unicorn mermaid moon comet rocket robot pirate castle dungeon
potion wand crown spaceship asteroid galaxy monster detective
gargoyle griffin phoenix kraken yeti gnome troll ogre imp sprite pixie banshee wraith
sorcerer alchemist cauldron talisman amulet scepter chariot catapult drawbridge portcullis
meeting memo spreadsheet printer calendar invoice password manager button slider form email phone
address search settings submit message contact profile privacy download upload browser website
cafe museum weather hours tickets recipe volume login account cancel shipping shopping birthday
date price help book table save request result support service checkout
garden garage kitchen library airport station hotel office school beach forest mountain river island
basement attic hallway rooftop tunnel village bakery aquarium
bazaar bodega apothecary haberdashery delicatessen patisserie brasserie tavern hostel chalet
cottage bungalow manor chateau citadel fortress monastery observatory planetarium arboretum
conservatory greenhouse boathouse lighthouse windmill quarry meadow marsh fjord tundra savanna
oasis lagoon atoll isthmus plateau canyon geyser glacier
music movie camera picture coffee sandwich bicycle train airplane taxi package parcel letter number
color window chair blanket guitar radio newspaper
kerfuffle brouhaha hullabaloo malarkey poppycock balderdash flapdoodle codswallop
rigmarole shenanigans tomfoolery skullduggery doohickey thingamajig widget gizmo gadget
contraption whatnot nincompoop nitwit blunderbuss curmudgeon ragamuffin scallywag
whippersnapper rapscallion gumption moxie pizzazz panache aplomb verve chutzpah collywobbles tizzy
yesterday tomorrow`;

// Verbs only. These are the words allowed to answer an -ing or -ed query, so irregular pasts
// like "caught" and "upheld" are deliberately left out of this list.
const correctionVerbs = `starch scorch march parch hatch patch latch snatch thatch scratch
skip whip chip shop sip trip grip clip flip slip snip drip plod prod wade fade trade grade
board hoard cook hook look rock block shave pave rave snort sport store falter blister
wipe pipe swap swipe squash squelch bake simmer sprinkle marinate garnish whisk knit stitch
hammer polish scrub wander wonder blunder plunder squander flounder resign profane
unload accost bamboozle discombobulate flabbergast lollygag dillydally gallivant canoodle
cavort waddle wobble bumble fumble mumble grumble snuggle squabble meander saunter amble traipse
trudge scamper scurry skedaddle vamoose abscond pilfer filch purloin wrangle finagle wheedle
cajole pester harangue bloviate pontificate dither vacillate procrastinate ruminate cogitate
ponder brood schmooze kibitz toast undress`;

// Adjectives only. These are the words allowed to answer an -er, -est, or -ly query.
const correctionAdjectives = `quiet noisy awkward wobbly tiny giant windy broken confused suspicious
urgent premium fictional local remote shiny dusty soggy crooked invisible sideways backwards indoor
bewildered flustered befuddled perplexed nonplussed harried frazzled peckish chuffed gormless
dodgy wonky murky dingy drab dowdy frumpy garish gaudy tacky quaint plucky jaunty dapper natty
spiffy snazzy swanky posh cushy comfy snug humdrum mundane banal insipid vapid turgid bloated
sprawling labyrinthine byzantine arcane cryptic opaque cantankerous obstreperous rambunctious
bombastic pompous verbose loquacious garrulous taciturn lackadaisical persnickety
slow quick loud soft warm cool damp crisp bland grim glum smug daft dim
happy sad angry polite curious sleepy hungry fancy plain strange normal random exact
never always secretly probably`;

const correctionWords = [...new Set(`${correctionNouns} ${correctionVerbs} ${correctionAdjectives}`.split(/\s+/))];
const correctionVerbSet = new Set(correctionVerbs.split(/\s+/));
const correctionAdjectiveSet = new Set(correctionAdjectives.split(/\s+/));
// Adjectives do not pluralise, so they sit out the -s round rather than suggesting "louds".
const correctionPluralSet = new Set(correctionWords.filter(word => !correctionAdjectiveSet.has(word)));

// A deliberately small suffix stripper. It exists so the bar can notice that "searching" and
// "starching" are the same shape of word, then hand back a correction with the same ending.
function correctionUndouble(stem) {
  return /([^aeiou])\1$/.test(stem) && !/(?:ll|ss|ff|zz)$/.test(stem) ? stem.slice(0, -1) : stem;
}

function correctionRestoreY(stem) {
  return stem.length > 2 && stem.endsWith("i") ? `${stem.slice(0, -1)}y` : stem;
}

// A comparative ending needs a believable adjective in front of it. "dapper" is not "dap" plus
// a suffix, and treating it that way is how a search bar starts recommending "dappest".
function correctionEnding(word, stem, suffix) {
  return stem.length >= 4 ? { stem, suffix } : { stem: word, suffix: "" };
}

function correctionStem(word) {
  if (word.length > 4 && word.endsWith("ies")) return { stem: `${word.slice(0, -3)}y`, suffix: "s" };
  if (word.length > 4 && word.endsWith("ily")) return { stem: `${word.slice(0, -3)}y`, suffix: "ly" };
  if (word.length > 5 && word.endsWith("ing")) return { stem: correctionUndouble(word.slice(0, -3)), suffix: "ing" };
  if (word.length > 5 && word.endsWith("est")) return correctionEnding(word, correctionRestoreY(correctionUndouble(word.slice(0, -3))), "est");
  if (word.length > 4 && word.endsWith("ed")) return { stem: correctionRestoreY(correctionUndouble(word.slice(0, -2))), suffix: "ed" };
  if (word.length > 4 && word.endsWith("ly")) return correctionEnding(word, word.slice(0, -2), "ly");
  if (word.length > 4 && word.endsWith("er")) return correctionEnding(word, correctionRestoreY(correctionUndouble(word.slice(0, -2))), "er");
  if (word.length > 4 && /(?:ch|sh|ss|x|z|o)es$/.test(word)) return { stem: word.slice(0, -2), suffix: "s" };
  if (word.length > 3 && /[^su]s$/.test(word)) return { stem: word.slice(0, -1), suffix: "s" };
  return { stem: word, suffix: "" };
}

function correctionInflect(stem, suffix) {
  if (!suffix) return stem;
  if (suffix === "ing" || suffix === "ed" || suffix === "er" || suffix === "est") {
    if (stem.endsWith("e") && !stem.endsWith("ee")) return stem.slice(0, -1) + suffix;
    if (/[^aeiou]y$/.test(stem) && suffix !== "ing") return `${stem.slice(0, -1)}i${suffix}`;
    if (stem.length > 2 && /^[^aeiou]*[aeiou][^aeiouwxy]$/.test(stem)) return stem + stem.slice(-1) + suffix;
    return stem + suffix;
  }
  if (suffix === "ly") {
    if (/[^aeiou]y$/.test(stem)) return `${stem.slice(0, -1)}ily`;
    if (stem.endsWith("le")) return `${stem.slice(0, -1)}y`;
    return `${stem}ly`;
  }
  if (/(?:ch|sh|ss|x|z)$/.test(stem) || /(?:potato|tomato|hero|echo)$/.test(stem)) return `${stem}es`;
  if (/[^aeiou]y$/.test(stem)) return `${stem.slice(0, -1)}ies`;
  return `${stem}s`;
}

// Candidates are stored in base form, so only strip an ending the word could genuinely have.
// Without this, the noun "request" stems to "requ" and starts offering "requs".
const correctionStems = correctionWords.map(word => {
  const { stem, suffix } = correctionStem(word);
  if ((suffix === "ing" || suffix === "ed") && !correctionVerbSet.has(word)) return word;
  if ((suffix === "er" || suffix === "est" || suffix === "ly") && !correctionAdjectiveSet.has(word)) return word;
  return stem;
});

function correctionBudget(length) {
  return length >= 6 ? 3 : length >= 5 ? 2 : 1;
}

function correctionDistance(a, b) {
  const rows = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      // Adjacent swaps count as one edit, so "quiet" and "quite" are close neighbors.
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) rows[i][j] = Math.min(rows[i][j], rows[i - 2][j - 2] + 1);
    }
  }
  return rows[a.length][b.length];
}

function findQueryCorrections(query, limit) {
  const groups = [];
  const seen = new Set();
  for (const match of query.matchAll(/\p{L}+/gu)) {
    const original = match[0];
    const word = original.toLowerCase();
    if (!/^[a-z]+$/.test(word)) continue;
    const maxDistance = correctionBudget(word.length);
    const { stem: wordStem, suffix: wordSuffix } = correctionStem(word);
    // Stems are shorter than the words they came from, so they get a slightly roomier budget
    // than a raw comparison would allow, but never more than the whole word is worth.
    const stemBudget = Math.min(maxDistance, correctionBudget(wordStem.length) + 1);
    // Only verbs may answer an -ing query and only adjectives may answer an -est one, so the
    // bar stays confidently wrong instead of confidently inventing words like "seancing".
    const stemPool = wordSuffix === "s" ? correctionPluralSet
      : wordSuffix === "ing" || wordSuffix === "ed" ? correctionVerbSet
      : correctionAdjectiveSet;
    const choices = [];
    const offer = (replacement, rank, viaStem) => {
      if (replacement === word) return;
      const cased = original === original.toUpperCase() && original.length > 1 ? replacement.toUpperCase()
        : original[0] === original[0].toUpperCase() ? replacement[0].toUpperCase() + replacement.slice(1)
        : replacement;
      const changed = query.slice(0, match.index) + cased + query.slice(match.index + original.length);
      if (changed.length > 80 || seen.has(changed)) return;
      seen.add(changed);
      choices.push({ query: changed, original, replacement: cased, distance: correctionDistance(word, replacement), viaStem, rank });
    };
    correctionWords.forEach((candidate, candidateIndex) => {
      if (candidate === word) return;
      const candidateStem = correctionStems[candidateIndex];
      // "results" to "result" is not a correction, it is the same word wearing a different hat.
      if (candidateStem === wordStem) return;
      // A stem match keeps the grammar intact, so it is offered ahead of an equally close
      // literal match: "searching" deserves "starching", not "starch".
      if (wordSuffix && stemPool.has(candidate) && Math.abs(candidateStem.length - wordStem.length) <= stemBudget) {
        const stemDistance = correctionDistance(wordStem, candidateStem);
        if (stemDistance <= stemBudget) offer(correctionInflect(candidateStem, wordSuffix), stemDistance - 0.5 + candidateIndex / 1e6, true);
      }
      if (Math.abs(candidate.length - word.length) > maxDistance) return;
      const distance = correctionDistance(word, candidate);
      if (distance <= maxDistance) offer(candidate, distance + candidateIndex / 1e6, false);
    });
    choices.sort((a, b) => a.rank - b.rank);
    if (choices.length) groups.push(choices);
  }
  const selected = [];
  for (let rank = 0; selected.length < limit && groups.some(group => rank < group.length); rank++) {
    for (const group of groups) {
      if (group[rank]) selected.push(group[rank]);
      if (selected.length === limit) break;
    }
  }
  return selected.map(({ rank, ...choice }) => choice);
}

function renderCorrectingSearch({ stage, mode, shell, say }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const rounds = worse ? 5 : 3;
  shell("YOUR INTENT, REVISED BY COMMITTEE", fixed ? "Search exactly what you typed." : "Did you mean something completely different?",
    fixed ? "Try quiet cafes, weather, museum hours, accessible forms, or cat pictures. Results are fictional and local; nothing is sent to a search service." : `After you stop typing, the bar swaps words for nearby spellings from a large and unnecessarily enthusiastic vocabulary. Suggestions rotate across the words in your query instead of obsessing over the first one. Reject up to ${rounds} unsolicited corrections to search your original words.${worse ? " Each rejection also needs an explanation of at least 8 characters. It is a silly length check, not AI." : ""} Matching uses edit distance with adjacent letter swaps, plus a small stemmer: plurals and -ing endings are matched on their base word and handed back re-conjugated, so "searching" becomes "starching" rather than "starch". No big dictionary download or external service. Words with no close match stay unchanged.`,
    `<div class="correcting-machine"><form id="correcting-form" novalidate><label for="correcting-input">Your search query</label><input type="text" id="correcting-input" maxlength="80" autocomplete="off" placeholder="quiet cafes" required>${fixed ? "" : '<div class="correcting-original"><span>WHAT YOU ACTUALLY TYPED</span><output id="correcting-original">(empty)</output></div>'}<button class="demo-button" id="correcting-submit" ${fixed ? "" : "disabled"}>Search local demo</button></form>${fixed ? "" : `<div class="correcting-review" id="correcting-review" hidden><span>OUR UNREQUESTED IMPROVEMENT</span><strong id="correcting-change"></strong><p id="correcting-distance"></p>${worse ? '<label for="correcting-reason">Explain why your original words were correct (8+ characters)</label><input type="text" id="correcting-reason" maxlength="120" autocomplete="off">' : ""}<button type="button" class="plain-button" id="correcting-reject">Reject correction</button></div><p class="correcting-progress" id="correcting-progress">Type a query to begin defending it.</p>`}<div class="correcting-results" id="correcting-results"></div></div>`);
  const input = stage.querySelector("#correcting-input");
  const submit = stage.querySelector("#correcting-submit");
  let intended = "";
  let rejected = 0;
  let pending = false;
  let timer = null;
  let corrections = [];
  const clearTimer = () => { clearTimeout(timer); timer = null; };
  const paint = () => {
    if (fixed) return;
    stage.querySelector("#correcting-original").textContent = intended || "(empty)";
    stage.querySelector("#correcting-review").hidden = !pending;
    stage.querySelector("#correcting-progress").textContent = !intended ? "Type a query to begin defending it." : corrections.length === 0 ? "No nearby words in the small word list. Your query stays unchanged and can be searched." : `${rejected} / ${corrections.length} corrections rejected${rejected === corrections.length ? ". Your original query is ready to search." : "."}`;
    submit.disabled = !intended || rejected < corrections.length;
  };
  const schedule = () => {
    clearTimer();
    if (fixed || pending || !intended || rejected >= corrections.length || document.hidden) return;
    timer = setTimeout(() => {
      timer = null;
      const correction = corrections[rejected];
      input.value = correction.query;
      pending = true;
      stage.querySelector("#correcting-change").textContent = input.value;
      stage.querySelector("#correcting-distance").textContent = `${correction.original} → ${correction.replacement} / ${correction.distance} edit${correction.distance === 1 ? "" : "s"} apart${correction.viaStem ? " · matched by word stem, then helpfully re-conjugated" : ""}`;
      paint();
      say("Your query was replaced without permission. Reject the correction to restore your original words.");
    }, worse ? 450 : 700);
  };
  const updateQuery = () => {
    clearTimer();
    intended = input.value.trim();
    rejected = 0;
    pending = false;
    corrections = fixed ? [] : findQueryCorrections(intended, rounds);
    stage.querySelector("#correcting-results").replaceChildren();
    if (worse) stage.querySelector("#correcting-reason").value = "";
    paint();
    schedule();
  };
  input.addEventListener("compositionstart", clearTimer);
  input.addEventListener("input", event => { if (!event.isComposing) updateQuery(); });
  input.addEventListener("compositionend", updateQuery);
  if (!fixed) stage.querySelector("#correcting-reject").addEventListener("click", () => {
    if (worse && stage.querySelector("#correcting-reason").value.trim().length < 8) {
      say("Defend your wording with an explanation of at least 8 characters. Your original query is still preserved.");
      stage.querySelector("#correcting-reason").focus();
      return;
    }
    rejected++;
    pending = false;
    input.value = intended;
    if (worse) stage.querySelector("#correcting-reason").value = "";
    paint();
    say(rejected === corrections.length ? "All corrections rejected. You may finally search the exact words you typed." : "Original query restored. Unfortunately, another correction is on its way.");
    if (rejected === corrections.length) submit.focus({ preventScroll: true });
    else input.focus({ preventScroll: true });
    schedule();
  });
  stage.querySelector("#correcting-form").addEventListener("submit", event => {
    event.preventDefault();
    const query = fixed ? input.value.trim() : intended;
    if (!query) { say("Enter a query first."); return; }
    if (!fixed && rejected < corrections.length) { say("Reject the unsolicited corrections before searching your original query."); return; }
    clearTimer();
    const catalog = [
      { title: "Quiet cafes", words: ["quiet", "cafe", "cafes", "coffee"], text: "Three imaginary cafes where silence is included in the price." },
      { title: "Weather forecast", words: ["weather", "forecast", "rain"], text: "Fictional forecast: cloudy with no surprise subscriptions." },
      { title: "Museum opening hours", words: ["museum", "hours", "opening"], text: "This local demo museum is open whenever the page is open." },
      { title: "Accessible forms", words: ["accessible", "forms", "form"], text: "A pretend guide to stable controls and optional suggestions." },
      { title: "Cat pictures", words: ["cat", "cats", "pictures"], text: "An imaginary gallery of cats who respect your search query." },
    ];
    const tokens = query.toLowerCase().match(/[a-z]+/g) || [];
    const matches = catalog.filter(item => item.words.some(word => tokens.includes(word)));
    const results = stage.querySelector("#correcting-results");
    results.replaceChildren();
    const heading = document.createElement("h3");
    heading.textContent = `Local demo results for "${query}"`;
    results.append(heading);
    for (const match of matches) {
      const item = document.createElement("p");
      const title = document.createElement("strong");
      title.textContent = match.title;
      item.append(title, document.createTextNode(`: ${match.text}`));
      results.append(item);
    }
    if (!matches.length) {
      const empty = document.createElement("p");
      empty.textContent = "No matching entries in this small fictional catalog. Try quiet cafes, weather, museum hours, accessible forms, or cat pictures.";
      results.append(empty);
    }
    say(`Searched "${query}" without changing it. ${matches.length} local demo results. No external search was performed.`);
  });
  const visibility = () => { if (document.hidden) clearTimer(); else schedule(); };
  document.addEventListener("visibilitychange", visibility);
  paint();
  return () => {
    clearTimer();
    document.removeEventListener("visibilitychange", visibility);
  };
}
function renderVolumeSeesaw({ stage, mode, shell, say }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("A BALANCING ACT FOR YOUR EARS", fixed ? "Volume without a counterweight." : "Please balance the pretend volume.",
    fixed ? "A stable slider. No audio plays and your device volume never changes." : `Add weights to either end. More weight on the right raises volume; more on the left lowers it. The beam wobbles before settling. Try reaching 65%, then hold the setting.${worse ? " Every third added weight rolls to the opposite end, and balloons pull upward with negative weight." : ""} No audio plays and your device volume never changes.`,
    `<div class="seesaw-machine"><label for="seesaw-volume">Pretend volume</label><output id="seesaw-value">50%</output><input type="range" id="seesaw-volume" min="0" max="100" value="50" ${fixed ? "" : "disabled"}>${fixed ? "" : `<div class="seesaw-scene"><div class="seesaw-pivot" aria-hidden="true"></div><div class="seesaw-beam" id="seesaw-beam"><div class="seesaw-pan seesaw-left" id="seesaw-left" aria-label="Left weight tray"></div><div class="seesaw-pan seesaw-right" id="seesaw-right" aria-label="Right weight tray"></div></div></div><p class="seesaw-masses" id="seesaw-masses"></p><label for="seesaw-weight">Choose a weight</label><select id="seesaw-weight"><option value="0">Pebble: +1</option><option value="1">Brick: +3</option><option value="2">Anvil: +5</option>${worse ? '<option value="3">Balloon: -2 (pulls upward)</option>' : ""}</select><div class="seesaw-controls"><button type="button" class="plain-button" id="seesaw-add-left">Add to left</button><button type="button" class="plain-button" id="seesaw-add-right">Add to right</button><button type="button" class="plain-button" id="seesaw-remove-left">Remove left weight</button><button type="button" class="plain-button" id="seesaw-remove-right">Remove right weight</button></div><div class="new-actions"><button type="button" class="demo-button" id="seesaw-hold">Hold this volume</button><button type="button" class="plain-button" id="seesaw-reset">Clear weights</button></div><p class="seesaw-note">Maximum 12 weights. Reduced motion settles immediately. Holding freezes the number and weights until released.</p>`}</div>`);
  const output = stage.querySelector("#seesaw-value");
  const slider = stage.querySelector("#seesaw-volume");
  if (fixed) {
    slider.addEventListener("input", () => { output.textContent = `${slider.value}%`; });
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
