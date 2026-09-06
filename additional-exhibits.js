const additionalExhibits = [
  { id: "alphabet", name: "The Alphabet Shuffle", category: "Forms", number: "07", color: "pink", tagline: "A slider with no alphabetic loyalties.", description: "Find a letter. Add it. The entire slider order changes.", lesson: "The alphabet has entered its experimental phase. Familiar order was rejected as creatively limiting.", fix: "The letters have returned to their assigned seats, and the keyboard handles introductions." },
  { id: "phone", name: "The Phone Number Casino", category: "Forms", number: "08", color: "orange", tagline: "Your number is somewhere in these odds.", description: "Roll each digit. Lock it. Hope the next roll respects it.", lesson: "Your phone number is in there somewhere. The house remains confident that persistence is statistically similar to typing.", fix: "The reels are closed. The whole number can now be entered without placing a bet." },
  { id: "calendar", name: "The Calendar Treadmill", category: "Forms", number: "09", color: "blue", tagline: "A date picker with no sense of direction.", description: "Book an appointment, one painfully small calendar step at a time.", lesson: "Every journey begins with a single day. Unfortunately, this one also continues with several thousand more.", fix: "The calendar now permits dates to be selected before everyone involved grows older." },
  { id: "volume", name: "The Volume Gym", category: "Interaction", number: "10", color: "green", tagline: "Turn it up. Do some math. Start again.", description: "A volume control that requires modular arithmetic and physical effort.", lesson: "Volume is a privilege earned through arithmetic. Please stretch before attempting 37 percent.", fix: "The slider now moves directly to the requested number. No warm-up required." },
  { id: "cookies", name: "The Cookie Switchboard", category: "Forms", number: "11", color: "yellow", tagline: "Your preferences. Our creative interpretation.", description: "Turn one cookie off. Watch another turn on. Try to reject them all.", lesson: "The switches are a close-knit community and refuse to make decisions alone. Your preferences have been noted as a group suggestion.", fix: "Each switch has agreed to mind its own business." },
  { id: "cancel", name: "The Cancellation Labyrinth", category: "Copywriting", number: "12", color: "lilac", tagline: "Don't not stop uncancelling your subscription.", description: "Escape a fictional subscription through a maze of double negatives.", lesson: "You may already have cancelled, unless you declined not to remain. Legal is checking the grammar and will return shortly.", fix: "Cancel now means cancel. The double negatives have been released back into the wild." },
  { id: "ai-store", name: "The AI Everything Store", category: "Commerce", number: "13", color: "blue", tagline: "Your spoon now requires a prompt.", description: "Buy ordinary objects through unnecessary AI onboarding and subscriptions.", lesson: "The spoon was already good at soup, but it lacked a growth strategy. It now has onboarding, calibration, and recurring revenue.", fix: "The spoon is a spoon again. It appears relieved." },
  { id: "unix-birthday", name: "The Unix Birthday Picker", category: "Forms", number: "14", color: "green", tagline: "Happy 631152000000 to you.", description: "Slide through milliseconds since 1970. Snap your birthday to midnight.", lesson: "Birthdays are more festive when expressed as very large integers. Candles may be counted from the Unix epoch.", fix: "The computer keeps the milliseconds to itself and shows everyone else a date." },
  { id: "loading", name: "The Loading Experience", category: "Interaction", number: "15", color: "lilac", tagline: "Almost ready to start getting ready.", description: "An entire loading ceremony for one sentence. Please approve the wait.", lesson: "Nothing important is happening, but it is happening in ten impressive stages. Stage eleven is reflecting on the journey.", fix: "The sentence was ready the whole time. It has finally been allowed indoors." },
  { id: "fonts", name: "The Font Buffet", category: "Typography", number: "16", color: "pink", tagline: "Every word has a different art director.", description: "Type a sentence. Watch its fonts, sizes, and styles disagree.", lesson: "Every word arrived with a vision and none of them shared a mood board. The sentence is currently pursuing several directions.", fix: "One typeface was chosen. The others have promising solo careers." },
  { id: "horizontal", name: "The Horizontal Lifestyle", category: "Navigation", number: "17", color: "yellow", tagline: "Your next section is somewhere to the right.", description: "A sideways website with vertical navigation and directionally confused arrows.", lesson: "The page has rejected the traditional concept of down. Your mouse wheel is invited to broaden its horizons.", fix: "Down once again means down. Navigation historians are calling it a classic." },
  { id: "mystery-menu", name: "The Mystery Meat Menu", category: "Navigation", number: "18", color: "blue", tagline: "Six icons. Zero useful clues.", description: "Find a shipping policy and a receipt behind meaningless symbols.", lesson: "Labels would spoil the surprise. Each icon is a tiny adventure with paperwork hidden at the end.", fix: "The icons now have names. Their mysterious era was brief but influential." },
  { id: "password-gym", name: "The Password Gym", category: "Forms", number: "19", color: "orange", tagline: "Twenty rules. Or thirty-two and no way out.", description: "Rules unlock as you type. Worse mode eventually contradicts itself.", lesson: "Your password is almost strong enough to lift a car. It only needs a color, an apology, the moon, and several incompatible beliefs.", fix: "The password field now asks for length instead of a complete personality." },
  { id: "terms-game", name: "Terms & Conditions: The Game", category: "Content", number: "20", color: "lilac", tagline: "You clicked “I read it.” Defend your thesis.", description: "An absurdly long agreement. Buried facts. A compulsory reading exam.", lesson: "By continuing, you confirm that you remember Clause 47 and its emotional arc. The oral defense has been postponed.", fix: "The agreement has become a short summary with two buttons and no final exam." },
  { id: "seismic-editor", name: "The Seismic Text Editor", category: "Interaction", number: "21", color: "pink", tagline: "Every keystroke is a structural risk.", description: "Type carefully. The editor shakes, and your whole sentence might tumble.", lesson: "The sentence was built on ambitious foundations. Punctuation remains a known seismic risk, especially the excitable kind.", fix: "The editor passed inspection. Exclamation marks may now enter without a hard hat." },
  { id: "wind-volume", name: "The Windswept Volume Slider", category: "Interaction", number: "22", color: "blue", tagline: "Forecast: scattered decibels.", description: "Drag a volume slider through a gale. Up is subject to weather.", lesson: "Today's forecast calls for shifting controls with a chance of accidental silence. Up may become down by evening.", fix: "The slider has been moved indoors, where the forecast is consistently 37 percent." },
  { id: "cat-captcha", name: "The CAT-PCHA", category: "Forms", number: "23", color: "yellow", tagline: "Prove you're human. Be a mouse.", description: "Collect the cheese and escape a hunting cat to pass a pretend CAPTCHA.", lesson: "Humanity is best demonstrated by rodent strategy under feline pressure. The cheese is part of the standard verification process.", fix: "The cat has been reassigned. A checkbox now handles the investigation." },
  { id: "tetris-volume", name: "The Tetris Volume Control", category: "Interaction", number: "24", color: "blue", tagline: "Turn it up. Build it up.", description: "Stack blocks across a game board to adjust a completely silent volume slider.", lesson: "Sound levels are a construction project. Please occupy two-thirds of the site without accidentally finishing a row.", fix: "The building permit expired, leaving behind one ordinary volume slider." },
  { id: "shrinking-unsubscribe", name: "The Shrinking Unsubscribe Button", category: "Commerce", number: "25", color: "pink", tagline: "Your subscription grows. Your exit shrinks.", description: "A fictional subscription with a cancel button that shrinks and relocates as you approach.", lesson: "The cancellation button is shy and needs space. Unfortunately, it interprets the pointer as direct eye contact.", fix: "The button completed a confidence workshop and can now be approached safely." },
  ...arcadeExhibits,
  { id: "checkbox-ecosystem", name: "The Checkbox Ecosystem", category: "Forms", number: "28", color: "green", tagline: "Your preferences require watering.", description: "Feed your checked boxes before they wilt, wander, and uncheck themselves.", lesson: "Preferences are living things and cannot survive on clicks alone. Please provide regular snacks and adequate roaming space.", fix: "The checkboxes are now inanimate and appear to be thriving." },
  { id: "elevator-date", name: "The Elevator Date Picker", category: "Forms", number: "29", color: "lilac", tagline: "Your date is on another floor.", description: "Ride between years, then transfer to month and day elevators.", lesson: "Your birthday is waiting on another floor. Service to February may require a transfer and sensible shoes.", fix: "The elevators were replaced with a calendar. Travel time is now negligible." },
  ...puzzleExhibits,
];

function additionalPreview(id) {
  const previews = {
    alphabet: `<div class="new-preview preview-alphabet"><span>THE ALPHABET, RECONSIDERED</span><strong>Q &nbsp; A &nbsp; Z &nbsp; ?</strong><div class="preview-track"><i></i></div><small>Same slider. New alphabet.</small></div>`,
    phone: `<div class="new-preview preview-phone"><span>PLEASE GAMBLE YOUR NUMBER</span><div class="preview-reels"><b>5</b><b>?</b><b>3</b></div><small>Roll. Lock. Regret. ↻</small></div>`,
    calendar: `<div class="new-preview preview-calendar"><span>JANUARY 2000</span><strong>01</strong><small>← Yesterday &nbsp; Tomorrow? →</small><i>Appointment: January 12</i></div>`,
    volume: `<div class="new-preview preview-volume"><span>SET VOLUME TO 37%</span><strong>36<span>%</span></strong><div class="preview-volume-buttons">+7 &nbsp; −3 &nbsp; WHY?</div><small>No sound. Just suffering.</small></div>`,
    cookies: `<div class="new-preview preview-cookies"><span>WE RESPECT YOUR CHOICES*</span><div><b>Analytics</b><i>ON</i></div><div><b>Marketing</b><i>OFF?</i></div><small>*Not independently.</small></div>`,
    cancel: `<div class="new-preview preview-cancel"><span>BEFORE YOU GO...</span><strong>Don't not<br>stay subscribed.</strong><small>Yes, don't &nbsp; / &nbsp; No, do</small></div>`,
    "ai-store": `<div class="new-preview preview-ai"><span>INTELLIGENCE SOLD SEPARATELY</span><strong>🥄 + AI</strong><div>THE SPOON, REIMAGINED.</div><small>$19.99/month. Soup not included.</small></div>`,
    "unix-birthday": `<div class="new-preview preview-unix"><span>WHEN WERE YOU BORN?</span><strong>631152000000</strong><small>January 1, 1990. In computer.</small><div>YYYY? MM? NO. MILLISECONDS.</div></div>`,
    loading: `<div class="new-preview preview-loading"><span>PREPARING TO ALMOST FINISH</span><div class="preview-loader-ring"></div><strong>99%</strong><small>Reconsidering the first 98%.</small></div>`,
    fonts: `<div class="new-preview preview-fonts"><span>CONSISTENCY IS OVERRATED</span><strong><b>One</b> <i>more</i><br><em>FONT.</em></strong><small>Legibility left the chat.</small></div>`,
    horizontal: `<div class="new-preview preview-horizontal"><span>SCROLL DOWN TO GO RIGHT</span><div><b>01</b><b>02</b><b>03</b><i>→</i></div><small>This page took a wrong turn.</small></div>`,
    "mystery-menu": `<div class="new-preview preview-mystery"><span>YOU KNOW WHAT THESE MEAN. RIGHT?</span><div>⌘ &nbsp; ◇ &nbsp; ✳<br>◌ &nbsp; ⧉ &nbsp; ⌁</div><small>Tooltip: “The other thing.”</small></div>`,
    "password-gym": `<div class="new-preview preview-password"><span>RULE 8 OF ALMOST FINISHED</span><strong>••••••••</strong><div>✓ Has a number<br>✕ Has not apologized</div><small>Try adding “sorry.” Seriously.</small></div>`,
    "terms-game": `<div class="new-preview preview-terms"><span>JUST A FEW QUICK TERMS</span><strong>§ 74.2(b)</strong><div class="fake-lines"></div><div class="fake-lines"></div><small>There will be an exam.</small></div>`,
    "seismic-editor": `<div class="new-preview preview-seismic"><span>STRUCTURAL INTEGRITY: QUESTIONABLE</span><div><b>T</b><b>Y</b><b>P</b><b>E</b></div><small>One more letter. What could go wrong?</small><i>CAUTION: UNSTABLE WORDS</i></div>`,
    "wind-volume": `<div class="new-preview preview-wind"><span>VOLUME ADVISORY IN EFFECT</span><strong>~~~ / ~~~</strong><div>37% &nbsp; 82% &nbsp; 4%?</div><small>The slider is experiencing weather.</small></div>`,
    "cat-captcha": `<div class="new-preview preview-cat"><span>PROVE YOU ARE NOT A ROBOT</span><strong>🐈 &nbsp; 🐭</strong><div>FIRST, BE A RODENT.</div><small>Verification requires cheese.</small></div>`,
    "tetris-volume": `<div class="new-preview preview-tetris"><span>BUILD YOUR OWN DECIBELS</span><strong>▟ ▙ ▟</strong><div class="preview-track"><i></i></div><small>Full rows vanish. So does the volume.</small></div>`,
    "shrinking-unsubscribe": `<div class="new-preview preview-shrinking"><span>THANKS FOR ACCIDENTALLY JOINING</span><strong>$49 / month*</strong><div>Unsubscribe</div><small>*Imaginary money. Real frustration.</small></div>`,
    "checkbox-ecosystem": `<div class="new-preview preview-ecosystem"><span>PREFERENCES ARE LIVING THINGS</span><strong>🌱 ☑ 🌱</strong><div>Analytics needs watering.</div><small>Your dark mode is wilting.</small></div>`,
    "elevator-date": `<div class="new-preview preview-elevator"><span>PLEASE MIND THE DATE GAP</span><strong>↑ 1992 ↓</strong><div>MONTHS: CHANGE AT LOBBY</div><small>Express service skips your birthday.</small></div>`,
  };
  return previews[id] || arcadePreview(id) || puzzlePreview(id);
}

function renderAdditionalExhibit({ id, stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const status = '<div class="demo-status" role="status" id="extra-status"></div>';
  const say = text => { stage.querySelector("#extra-status").textContent = text; };
  const shell = (kicker, title, intro, content) => {
    stage.innerHTML = `<div class="new-demo"><span class="demo-kicker">${kicker}</span><h2>${title}</h2><p class="new-demo-intro">${intro}</p>${content}${status}<small class="simulation-note">Museum simulation only. Nothing is sent, purchased, saved, or played aloud.</small></div>`;
  };

  if (id === "alphabet") {
    shell("NO TWO ALPHABETS ALIKE", fixed ? "Just type your message." : "Slide to spell.",
      fixed ? "The alphabet has stopped moving the goalposts." : `Slide to find a character, then append it. The order reshuffles after EVERY character.${worse ? " It also reshuffles whenever you release the slider or finish an arrow-key adjustment. The new preview is what gets appended." : ""}`,
      `${fixed ? "" : `<div class="alphabet-machine"><label for="alphabet-slider">Choose a character</label><div class="alphabet-readout"><output id="alphabet-character" for="alphabet-slider"></output><span id="alphabet-position"></span></div><input id="alphabet-slider" type="range" min="0" max="28" step="1" value="0"><div class="alphabet-order" id="alphabet-order" aria-label="Current slider order"></div><button class="demo-button" id="append-character">Append this character</button><small id="shuffle-count"></small></div>`}<form id="alphabet-form"><label for="alphabet-message">Your message (maximum 140 characters)</label><textarea id="alphabet-message" maxlength="140" ${fixed ? "required" : "readonly"} placeholder="${fixed ? "Type normally. What a concept." : "Earn each character using the slider."}"></textarea><div class="new-actions"><button type="button" class="plain-button" id="alphabet-undo">Undo last character</button><button class="demo-button">Send demo message</button></div></form>`);
    const message = stage.querySelector("#alphabet-message");
    if (!fixed) {
      const characters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ .!"];
      const slider = stage.querySelector("#alphabet-slider");
      let order = [];
      let shuffles = 0;
      const display = () => {
        const index = Number(slider.value);
        const letter = order[index];
        stage.querySelector("#alphabet-character").textContent = letter === " " ? "[space]" : letter;
        stage.querySelector("#alphabet-position").textContent = `Position ${index + 1} of ${order.length}`;
        slider.setAttribute("aria-valuetext", letter === " " ? "Space" : letter);
        stage.querySelectorAll(".alphabet-order span").forEach((item, i) => item.classList.toggle("selected", i === index));
      };
      const randomize = () => {
        const previous = order.join("");
        order = shuffle(characters);
        // Guarantee a changed order even if the random permutation repeats.
        if (order.join("") === previous) order.push(order.shift());
        shuffles++;
        stage.querySelector("#alphabet-order").innerHTML = order.map(letter => `<span>${letter === " " ? "␣" : letter}</span>`).join("");
        stage.querySelector("#shuffle-count").textContent = `Alphabet revision ${shuffles}. Previous positions are now useless.`;
        display();
      };
      slider.addEventListener("input", display);
      if (worse) slider.addEventListener("change", () => {
        randomize();
        say("You finished adjusting the slider. We reassigned every position. Check the new preview.");
      });
      stage.querySelector("#append-character").addEventListener("click", () => {
        if (message.value.length >= 140) { say("The 140-character limit has been reached. Your message is preserved."); return; }
        message.value += order[Number(slider.value)];
        randomize();
        say("One character added. The alphabet has been shuffled again.");
      });
      randomize();
    }
    stage.querySelector("#alphabet-undo").addEventListener("click", () => {
      if (!message.value) { say("There is nothing to undo."); return; }
      message.value = message.value.slice(0, -1);
      say("Last character removed. For once, a button did what it said.");
    });
    stage.querySelector("#alphabet-form").addEventListener("submit", event => {
      event.preventDefault();
      say(message.value.trim() ? "Your message has survived. Demo only: nothing was sent." : "Compose a message before sending it.");
    });
  } else if (id === "phone") {
    const target = "2025550107";
    const formattedTarget = `${target.slice(0, 3)} ${target.slice(3, 6)} ${target.slice(6)}`;
    shell("DIAL BY CHANCE", fixed ? "Enter the demo number." : "Your phone number, probably.",
      `Task: enter the fictional number ${target}.${fixed ? " Type or paste it below." : ` Roll individual digits until they match, then lock them.${worse ? " Rolling a digit also rerolls and unlocks its left neighbor. Solve from the right if you want to keep your progress." : ""}`}`,
      `<div class="task-target">DEMO NUMBER: <strong>${formattedTarget}</strong></div>${fixed ? `<form id="phone-form"><label for="phone-number">${target.length}-digit demo phone number</label><input id="phone-number" type="tel" inputmode="numeric" pattern="[0-9]{${target.length}}" maxlength="${target.length}" required autocomplete="off"><button class="demo-button">Confirm demo number</button></form>` : `<div class="phone-reels">${[...target].map((_, index) => `<div class="phone-reel"><label>Digit ${index + 1}</label><output id="phone-digit-${index}">?</output><button class="plain-button" data-roll="${index}" aria-label="Roll digit ${index + 1}">↻ Roll</button><button class="demo-button" data-lock="${index}" aria-label="Lock digit ${index + 1}" aria-pressed="false">Lock</button></div>`).join("")}</div><button class="demo-button" id="confirm-phone">Confirm this unlikely number</button>`}`);
    if (fixed) {
      stage.querySelector("form").addEventListener("submit", event => {
        event.preventDefault();
        say(stage.querySelector("#phone-number").value === target ? "Number accepted. No call or message will be sent." : `Use the fictional demo number ${target}, not your real number.`);
      });
    } else {
      const digits = Array(target.length).fill(null);
      const locks = Array(target.length).fill(false);
      let rolls = 0;
      const paint = () => {
        digits.forEach((digit, index) => {
          stage.querySelector(`#phone-digit-${index}`).textContent = digit === null ? "?" : digit;
          stage.querySelector(`[data-roll="${index}"]`).disabled = locks[index];
          const lock = stage.querySelector(`[data-lock="${index}"]`);
          lock.disabled = digit === null;
          lock.setAttribute("aria-pressed", String(locks[index]));
          lock.textContent = locks[index] ? "Unlock" : "Lock";
        });
      };
      stage.querySelectorAll("[data-roll]").forEach(button => button.addEventListener("click", () => {
        const index = Number(button.dataset.roll);
        digits[index] = Math.floor(Math.random() * 10);
        rolls++;
        if (worse && index > 0) {
          digits[index - 1] = Math.floor(Math.random() * 10);
          locks[index - 1] = false;
        }
        paint();
        say(`Roll ${rolls}.${worse && index > 0 ? " The digit to the left was also rerolled and unlocked." : " Your odds remain unnecessarily poor."}`);
      }));
      stage.querySelectorAll("[data-lock]").forEach(button => button.addEventListener("click", () => {
        const index = Number(button.dataset.lock);
        locks[index] = !locks[index];
        paint();
        say(`Digit ${index + 1} ${locks[index] ? "locked" : "unlocked"}.`);
      }));
      stage.querySelector("#confirm-phone").addEventListener("click", () => {
        say(digits.every(digit => digit !== null) && digits.join("") === target ? `Number accepted after ${rolls} rolls. No call or message will be sent.` : `That is not ${target}. Keep rolling. You are not allowed to type.`);
      });
      paint();
    }
  } else if (id === "calendar") {
    shell("TRAVEL THROUGH TIME, INEFFICIENTLY", fixed ? "Choose an appointment date." : "Please advance to January 12.",
      `Task: select January 12, 2000.${fixed ? " Direct date entry is allowed again." : ` We begin on January 1. There is no month picker and no typing.${worse ? " Forward alternates between +7 days and −6 days. Back always moves one day backwards." : " Only one-day steps. Holding a button does nothing."}`}`,
      `${fixed ? `<form id="date-form"><label for="appointment-date">Appointment date</label><input type="date" id="appointment-date" value="2000-01-01" required><button class="demo-button">Book fictional appointment</button></form>` : `<div class="calendar-machine"><span>JANUARY? EVENTUALLY.</span><output id="calendar-date" aria-live="polite"></output><div class="new-actions"><button class="plain-button" id="date-back">← Back one day</button><button class="demo-button" id="date-forward">Forward →</button></div><p id="date-step"></p></div><button class="demo-button" id="confirm-date">Book the date shown</button>`}`);
    const confirm = date => say(date === "2000-01-12" ? "January 12 booked in our fictional calendar. No real appointment was created." : "Wrong date. The fictional appointment must be January 12, 2000.");
    if (fixed) {
      stage.querySelector("form").addEventListener("submit", event => { event.preventDefault(); confirm(stage.querySelector("#appointment-date").value); });
    } else {
      const date = new Date("2000-01-01T12:00:00Z");
      let clicks = 0;
      const paint = () => {
        stage.querySelector("#calendar-date").textContent = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
        stage.querySelector("#date-step").textContent = worse ? `Next “Forward” step: ${clicks % 2 ? "−6" : "+7"} days. Arithmetic is your problem.` : "There are no shortcuts. That is the design.";
      };
      stage.querySelector("#date-forward").addEventListener("click", () => {
        date.setUTCDate(date.getUTCDate() + (worse ? (clicks++ % 2 ? -6 : 7) : 1));
        paint();
      });
      stage.querySelector("#date-back").addEventListener("click", () => { date.setUTCDate(date.getUTCDate() - 1); paint(); });
      stage.querySelector("#confirm-date").addEventListener("click", () => confirm(date.toISOString().slice(0, 10)));
      paint();
    }
  } else if (id === "volume") {
    shell("FITNESS FOR YOUR FINGERTIPS", fixed ? "Set the volume. Leave it there." : "Lift your way to 37%.",
      `Task: set the simulated volume to exactly 37%. No sound will play.${fixed ? "" : worse ? " Pump adds 17, release subtracts 11, and the value loses 1 every two seconds after your first adjustment. It wraps around at 0 and 100." : " Pump adds 7. Release subtracts 3. Go past 100 and it wraps to 0. Obviously."}`,
      `<div class="volume-machine"><output id="volume-value" aria-live="off">0%</output><meter id="volume-meter" min="0" max="100" value="0" aria-label="Simulated volume"></meter>${fixed ? `<label for="volume-slider">Volume percentage</label><input id="volume-slider" type="range" min="0" max="100" value="0">` : `<div class="new-actions"><button class="demo-button" id="volume-up">Pump +${worse ? 17 : 7}</button><button class="plain-button" id="volume-down">Release −${worse ? 11 : 3}</button></div>`}</div><button class="demo-button" id="apply-volume">Apply exactly 37%</button>`);
    let volume = 0;
    let timer = null;
    let complete = false;
    const paint = () => {
      stage.querySelector("#volume-value").textContent = `${volume}%`;
      stage.querySelector("#volume-meter").value = volume;
      if (fixed) stage.querySelector("#volume-slider").setAttribute("aria-valuetext", `${volume} percent`);
    };
    const adjust = delta => {
      volume = (volume + delta + 101) % 101;
      paint();
      if (worse && timer === null && !complete) timer = setInterval(() => { volume = Math.max(0, volume - 1); paint(); }, 2000);
    };
    if (fixed) stage.querySelector("#volume-slider").addEventListener("input", event => { volume = Number(event.target.value); paint(); });
    else {
      stage.querySelector("#volume-up").addEventListener("click", () => adjust(worse ? 17 : 7));
      stage.querySelector("#volume-down").addEventListener("click", () => adjust(worse ? -11 : -3));
    }
    stage.querySelector("#apply-volume").addEventListener("click", () => {
      if (volume !== 37) { say(`That is ${volume}%, not 37%. Keep ${fixed ? "adjusting" : "doing unnecessary arithmetic"}.`); return; }
      complete = true;
      clearInterval(timer);
      timer = null;
      say("Exactly 37%. Setting accepted; any decay has stopped. Still no sound.");
    });
    paint();
    return () => clearInterval(timer);
  } else if (id === "cookies") {
    const names = ["Analytics", "Marketing", "Personalization", "Partner sharing"];
    // Generic IDs such as cookie-1 and cookie-2 are hidden by cookie-blocker lists.
    shell("WE TAKE YOUR PREFERENCES PERSONALLY", fixed ? "Your cookies. Your choice." : "Try to turn everything off.",
      fixed ? "Essential cookies are not needed in this demo. Optional preferences are independent." : `Task: disable all four optional categories. Every switch also flips the next ${worse ? "TWO switches" : "switch"}, wrapping around to the top.${worse ? " The labels are negated: ON means “disabled.” All four switches must show ON to reject everything." : ""}`,
      `<div class="cookie-machine">${names.map((name, index) => `<div class="cookie-row"><label for="rbm-switchboard-option-${index}">${worse ? "Disable " : ""}${name}</label><button type="button" class="preference-switch" role="switch" aria-checked="true" id="rbm-switchboard-option-${index}" data-cookie="${index}">ON</button></div>`).join("")}</div><div class="new-actions">${fixed ? `<button class="demo-button" id="reject-all">Reject all optional cookies</button>` : ""}<button class="${fixed ? "plain-button" : "demo-button"}" id="save-cookies">Save preferences</button></div><div id="cookie-summary"></div>`);
    let enabled = [true, true, true, true];
    const paint = () => {
      stage.querySelectorAll("[data-cookie]").forEach((button, index) => {
        const on = worse ? !enabled[index] : enabled[index];
        button.setAttribute("aria-checked", String(on));
        button.textContent = on ? "ON" : "OFF";
      });
    };
    stage.querySelectorAll("[data-cookie]").forEach(button => button.addEventListener("click", () => {
      const index = Number(button.dataset.cookie);
      for (let offset = 0; offset < (fixed ? 1 : worse ? 3 : 2); offset++) {
        const target = (index + offset) % enabled.length;
        enabled[target] = !enabled[target];
      }
      paint();
      say(fixed ? "Only that preference changed." : `One click changed ${worse ? 3 : 2} preferences. Perfectly normal.`);
    }));
    const save = () => {
      stage.querySelector("#cookie-summary").textContent = "Actual optional settings: " + names.map((name, index) => `${name}: ${enabled[index] ? "enabled" : "disabled"}`).join("; ") + ".";
      say(enabled.every(value => !value) ? "All optional cookies rejected. Puzzle solved. No actual cookies were set." : fixed ? "Your selected preferences are shown below. No actual cookies were set." : "Some optional categories are still enabled. The goal is to reject all four.");
    };
    stage.querySelector("#save-cookies").addEventListener("click", save);
    stage.querySelector("#reject-all")?.addEventListener("click", () => { enabled = enabled.map(() => false); paint(); save(); });
    paint();
  } else if (id === "cancel") {
    shell("YOUR FICTIONAL SUBSCRIPTION TO NOTHING", fixed ? "Leaving should be easy." : "Are you sure you're not unsure?",
      fixed ? "Cancel this fictional subscription with one clear action." : `Task: cancel a subscription that never existed. Choose carefully.${worse ? " A wrong answer resets all progress, and button positions shuffle at every step." : " A wrong answer sends you back one step."}`,
      `<div class="cancellation-machine" id="cancel-maze"></div>`);
    const maze = stage.querySelector("#cancel-maze");
    const questions = [
      { question: "Do you want to stop not cancelling?", yes: "Yes, stop not cancelling", no: "No, continue not cancelling" },
      { question: "Should we disable renewal prevention?", yes: "No, keep renewal prevention", no: "Yes, disable renewal prevention" },
      { question: "Would you decline the option to remain?", yes: "Yes, decline remaining", no: "No, do not decline remaining" },
      { question: "Do not undo your cancellation?", yes: "Correct, do not undo it", no: "Incorrect, undo the cancellation" },
      { question: "Refuse to reject your request to leave?", yes: "Yes, refuse to reject it", no: "No, reject my request to leave" },
      { question: "Confirm that retaining me is not what I want.", yes: "Confirmed: I do not want retention", no: "Not confirmed: keep retaining me" },
    ];
    let step = 0;
    let mistakes = 0;
    const total = fixed ? 1 : worse ? 6 : 4;
    const render = () => {
      if (step === total) {
        maze.innerHTML = `<div class="cancelled-stamp">CANCELLED</div><p>Fictional subscription ended. No account or billing system was involved.</p>`;
        say(`You escaped${fixed ? "." : ` after ${total} confirmations and ${mistakes} wrong turns.`}`);
        return;
      }
      const question = questions[step];
      const options = fixed ? [{ text: "Cancel my fictional subscription", correct: true }] : [
        { text: question.yes, correct: true }, { text: question.no, correct: false },
      ];
      maze.innerHTML = `${fixed ? "" : `<span class="demo-kicker">RETENTION CHECKPOINT ${step + 1} / ${total}</span><h3>${question.question}</h3>`}<div class="cancel-options">${(worse ? shuffle(options) : options).map(option => `<button class="demo-button" data-cancel-correct="${option.correct}">${option.text}</button>`).join("")}</div>`;
      maze.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
        if (button.dataset.cancelCorrect === "true") {
          step++;
          say("Your intention to leave requires further clarification.");
        } else {
          mistakes++;
          step = worse ? 0 : Math.max(0, step - 1);
          say(worse ? "We interpreted that as staying. All cancellation progress reset." : "Wrong turn. Back to the previous checkpoint.");
        }
        render();
        if (step < total) maze.querySelector("button").focus();
      }));
    };
    render();
  } else {
    return renderLatestExhibit({ id, stage, mode, shuffle, shell, say });
  }
  return () => {};
}

function renderLatestExhibit({ id, stage, mode, shuffle, shell, say }) {
  if (puzzleExhibits.some(exhibit => exhibit.id === id)) return renderPuzzleExhibit({ id, stage, mode, shuffle, shell, say });
  if (id === "password-crane" || id === "physics-cart") return renderArcadeExhibit({ id, stage, mode, shell, say });
  if (id === "checkbox-ecosystem") return renderCheckboxEcosystem({ stage, mode, shell, say });
  if (id === "elevator-date") return renderElevatorDate({ stage, mode, shell, say });
  if (id === "tetris-volume") return renderTetrisVolume({ stage, mode, shuffle, shell, say });
  if (id === "shrinking-unsubscribe") return renderShrinkingUnsubscribe({ stage, mode, shell, say });
  if (id === "cat-captcha") return renderCatCaptcha({ stage, mode, shell, say });
  if (id === "wind-volume") return renderWindVolume({ stage, mode, shell, say });
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  if (id === "seismic-editor") return renderSeismicEditor({ stage, mode, shell, say });
  if (id === "ai-store") {
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
  } else if (id === "unix-birthday") {
    const today = new Date();
    const latest = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    const earliest = Date.UTC(1900, 0, 1);
    const isoToday = new Date(latest).toISOString().slice(0, 10);
    shell("HUMAN DATES ARE A LEGACY FORMAT", fixed ? "When is your birthday?" : "Date of birth, in milliseconds.",
      `Use a made-up birthday; this is a local demo.${fixed ? " Choose a date normally." : worse ? " Type the signed integer number of milliseconds since 1970-01-01 at 00:00:00 UTC. The preview converts your entry to a real UTC date and time as you type. Use midnight UTC for your birthday; no confirmation needed." : " Slide through Unix milliseconds to choose a date, then align it to UTC midnight with the small button. Arrow keys adjust one hour at a time."}`,
      `<form class="epoch-form" id="epoch-form" novalidate><label for="epoch-input">${fixed ? "Birthday" : "Birthday as a Unix timestamp in milliseconds"}</label><input id="epoch-input" type="${fixed ? "date" : worse ? "text" : "range"}" ${fixed ? `min="1900-01-01" max="${isoToday}"` : worse ? 'inputmode="text" maxlength="17" spellcheck="false" autocomplete="off" placeholder="631152000000" aria-describedby="epoch-readout"' : `min="${earliest}" max="${latest}" step="3600000" value="631152000000" aria-describedby="epoch-readout"`} required>${!fixed && !worse ? '<button type="button" class="plain-button epoch-align" id="epoch-align">Align to UTC midnight</button>' : ""}<div class="epoch-readout" id="epoch-readout">${fixed ? "Your birthday doesn't need a calculator." : "Calendar preview will appear here."}</div>${worse ? "" : '<button class="demo-button">Confirm demo birthday</button>'}</form>${fixed ? "" : `<details class="epoch-help"><summary>Request a small amount of human-readable help</summary><p>One day = 86,400,000 milliseconds. January 1, 1990 = 631152000000. Dates before 1970 use negative timestamps. Seconds are not milliseconds.</p><p>Supported range: January 1, 1900 through today. All dates use UTC so they do not shift with your computer's timezone.</p></details>`}`);
    const input = stage.querySelector("#epoch-input");
    const parse = (requireMidnight = true) => {
      const value = input.value.trim();
      if (!value) return { error: "Enter a demo birthday first." };
      if (!fixed && !/^-?\d+$/.test(value)) return { error: "Use a signed whole number of milliseconds. No dates, decimals, commas, or scientific notation." };
      const timestamp = fixed ? Date.parse(`${value}T00:00:00Z`) : Number(value);
      if (!Number.isSafeInteger(timestamp) || Math.abs(timestamp) > 8640000000000000) return { error: "That timestamp is outside the supported calendar range." };
      if (requireMidnight && (timestamp < earliest || timestamp > latest)) return { error: "Choose a birthday from January 1, 1900 through today. Check your units: milliseconds, not seconds." };
      if (requireMidnight && timestamp % 86400000 !== 0) return { error: `That is not midnight UTC. ${worse ? "Use milliseconds (not seconds) for the start of your birthday." : "Use Align to UTC midnight for the start of the selected date."}` };
      return { timestamp, date: new Date(timestamp).toISOString().slice(0, 10) };
    };
    const preview = () => {
      const result = parse(false);
      stage.querySelector("#epoch-readout").textContent = result.error || (fixed ? `Calendar date: ${result.date} (UTC)` : `${new Date(result.timestamp).toISOString().replace("T", " ").replace("Z", " UTC")} · ${result.timestamp} ms${result.timestamp % 86400000 === 0 ? " · Aligned to midnight." : " · Alignment needed."}`);
      if (!fixed && !worse && !result.error) input.setAttribute("aria-valuetext", `${new Date(result.timestamp).toISOString()} (${result.timestamp} milliseconds)`);
    };
    input.addEventListener("input", preview);
    if (!fixed && !worse) {
      stage.querySelector("#epoch-align").addEventListener("click", () => {
        const result = parse(false);
        if (result.error) { say(result.error); return; }
        input.value = String(Math.floor(result.timestamp / 86400000) * 86400000);
        preview();
        say(`Aligned to ${result.date} at 00:00:00 UTC. Ready to confirm.`);
      });
      preview();
    }
    const checkBirthday = () => {
      const result = parse();
      if (result.error) { say(result.error); return; }
      say(`Demo birthday accepted: ${result.date} (UTC). ${result.timestamp} milliseconds since the Unix epoch. Nothing was saved.`);
    };
    if (worse) input.addEventListener("input", checkBirthday);
    stage.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      checkBirthday();
    });
  } else if (id === "loading") {
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
  } else if (id === "fonts") {
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
    });
    render();
  } else if (id === "horizontal") {
    const sections = ["Welcome", "Our work", "Our process", "Contact"];
    shell("A WEBSITE THAT TOOK A WRONG TURN", fixed ? "Down is down again." : "Live life sideways.",
      fixed ? "A normal page flows vertically. Navigate to Contact and request a fictional quote." : `Find Contact at the far end of the sideways website. Use the section buttons, arrows, a trackpad, or swipe.${worse ? " The arrow buttons and vertical mouse wheel run backwards." : " Scrolling down inside the panels moves you right."} At the ends, ordinary page scrolling still works.`,
      `<div class="sideways-site"><nav class="sideways-nav" aria-label="Exhibit sections">${(worse ? shuffle(sections.map((name, index) => ({ name, index }))) : sections.map((name, index) => ({ name, index }))).map(item => `<button class="plain-button" data-side-panel="${item.index}">${item.name}</button>`).join("")}</nav><div class="sideways-track" id="sideways-track" tabindex="0" role="region" aria-label="${fixed ? "Website sections" : "Horizontally scrolling website; use left and right arrow keys"}"><section class="sideways-panel"><span>01 / WELCOME</span><h3>We're not like<br>other websites.</h3><p>Other websites put the next section below this one. We saw an opportunity to disagree.</p><strong class="sideways-big-arrow" aria-hidden="true">${fixed ? "↓" : "→"}</strong></section><section class="sideways-panel"><span>02 / OUR WORK</span><h3>We moved<br>the goalposts.</h3><p>Then the page. Then the contact form. Our portfolio includes websites that could have been one normal page.</p><div class="sideways-project">SELECTED WORK<br><strong>A very long rectangle.</strong></div></section><section class="sideways-panel"><span>03 / OUR PROCESS</span><h3>Think outside<br>the viewport.</h3><p>Discover. Disorient. Deliver the next section somewhere unexpected.</p><p>The contact form is ${fixed ? "below" : "one more panel to the right"}.</p></section><section class="sideways-panel"><span>04 / CONTACT</span><h3>You found us.</h3><form id="sideways-form"><label for="sideways-project">What would you like us to make?</label><select id="sideways-project" required><option value="">Choose a fictional project</option><option value="normal">A normal website, please</option><option value="sideways">An even wider website</option></select><button class="demo-button">Request demo quote</button><p id="sideways-result" role="status"></p></form></section></div></div>${fixed ? "" : `<div class="sideways-controls"><button class="plain-button" id="sideways-back">← Previous</button><span id="sideways-position">Panel 1 / 4</span><button class="plain-button" id="sideways-next">Next →</button></div>`}`);
    const track = stage.querySelector("#sideways-track");
    const panels = [...track.querySelectorAll(".sideways-panel")];
    const motion = () => matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    const navigate = index => {
      if (fixed) panels[index].scrollIntoView({ block: "start", behavior: motion() });
      else track.scrollTo({ left: panels[index].offsetLeft - panels[0].offsetLeft, behavior: motion() });
    };
    stage.querySelectorAll("[data-side-panel]").forEach(button => button.addEventListener("click", () => {
      const index = Number(button.dataset.sidePanel);
      navigate(index);
      panels[index].setAttribute("tabindex", "-1");
      panels[index].focus({ preventScroll: true });
    }));
    if (!fixed) {
      const index = () => Math.max(0, Math.min(3, Math.round(track.scrollLeft / track.clientWidth)));
      const update = () => {
        const current = index();
        stage.querySelector("#sideways-position").textContent = `Panel ${current + 1} / 4`;
        stage.querySelector("#sideways-back").disabled = worse ? current === 3 : current === 0;
        stage.querySelector("#sideways-next").disabled = worse ? current === 0 : current === 3;
      };
      stage.querySelector("#sideways-back").addEventListener("click", () => navigate(Math.max(0, Math.min(3, index() + (worse ? 1 : -1)))));
      stage.querySelector("#sideways-next").addEventListener("click", () => navigate(Math.max(0, Math.min(3, index() + (worse ? -1 : 1)))));
      track.addEventListener("scroll", update);
      track.addEventListener("wheel", event => {
        if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
        const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? track.clientWidth : 1;
        const delta = event.deltaY * scale * (worse ? -1 : 1);
        const canMove = delta > 0 ? track.scrollLeft < track.scrollWidth - track.clientWidth - 1 : track.scrollLeft > 1;
        if (canMove) {
          event.preventDefault();
          track.scrollLeft += delta;
        }
      }, { passive: false });
      track.addEventListener("keydown", event => {
        if (event.target !== track || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        navigate(Math.max(0, Math.min(3, index() + (event.key === "ArrowRight" ? 1 : -1))));
      });
      update();
    }
    stage.querySelector("#sideways-form").addEventListener("submit", event => {
      event.preventDefault();
      stage.querySelector("#sideways-result").textContent = "Demo quote requested. No message was sent. We recommend the normal website.";
      say("You reached the contact form. A considerable journey for one dropdown.");
    });
  } else if (id === "mystery-menu") {
    const destinations = [
      { id: "home", name: "Home", description: "Welcome to a site that considers words an unnecessary navigation expense." },
      { id: "shipping", name: "Shipping policy", description: "Demo orders travel by imaginary carrier pigeon. Delivery takes three fictional business days." },
      { id: "offers", name: "Special offers", description: "Today's offer: ten percent more navigation confusion. No purchase necessary or possible." },
      { id: "receipts", name: "Receipts", description: "Your fictional receipt lives here, assuming you have already checked the shipping policy." },
      { id: "settings", name: "Settings", description: "Your settings are set to mysterious. This is not a configurable preference." },
      { id: "help", name: "Help", description: "To find something, click the icon that leads to it. We hope this comprehensive advice helps." },
    ];
    const symbols = ["⌘", "◇", "✳", "◌", "⧉", "⌁"];
    let mapping = fixed ? [...destinations] : shuffle(destinations);
    let progress = 0;
    let clicks = 0;
    shell("NAVIGATION BY PURE INTUITION", fixed ? "A menu with actual names." : "What could these possibly mean?",
      `Task: find and acknowledge the shipping policy, then retrieve your demo receipt.${fixed ? " The destinations are labeled below." : ` The menu consists of six unrelated symbols and useless tooltips.${worse ? " The icon-to-destination mappings reshuffle after every navigation click." : ""}`}`,
      `<div class="mystery-task" id="mystery-task">0 / 2 tasks complete</div><nav class="mystery-nav" id="mystery-nav" aria-label="Demo website menu"></nav><section class="mystery-destination" id="mystery-destination" aria-live="polite"><h3>Where would you like to go?</h3><p>${fixed ? "Choose Shipping policy to begin." : "We removed the labels to make room for elegance. Good luck."}</p></section>`);
    const menu = stage.querySelector("#mystery-nav");
    const panel = stage.querySelector("#mystery-destination");
    const updateProgress = () => {
      stage.querySelector("#mystery-task").textContent = `${progress} / 2 tasks complete · ${clicks} navigation clicks`;
    };
    const open = destination => {
      clicks++;
      panel.innerHTML = `<span class="demo-kicker">YOU FOUND: ${destination.name.toUpperCase()}</span><h3>${destination.name}</h3><p>${destination.description}</p>`;
      if (destination.id === "shipping") {
        panel.insertAdjacentHTML("beforeend", `<button class="demo-button" id="mystery-shipping">Acknowledge shipping policy</button>`);
        panel.querySelector("button").addEventListener("click", () => {
          progress = Math.max(progress, 1);
          updateProgress();
          say("Shipping policy acknowledged. Now find Receipts.");
        });
      } else if (destination.id === "receipts") {
        panel.insertAdjacentHTML("beforeend", `<button class="demo-button" id="mystery-receipt">Retrieve demo receipt</button><p id="mystery-receipt-text"></p>`);
        panel.querySelector("button").addEventListener("click", () => {
          if (progress < 1) { say("First find and acknowledge the shipping policy. Then return here."); return; }
          progress = 2;
          panel.querySelector("#mystery-receipt-text").textContent = "RECEIPT DEMO-0001 · 1 imaginary delivery · Total: $0.00. No order was placed.";
          updateProgress();
          say("Both tasks complete. Clear labels would have made that considerably easier.");
        });
      }
      updateProgress();
    };
    const renderMenu = () => {
      menu.innerHTML = mapping.map((destination, index) => `<button type="button" class="mystery-link" data-mystery-destination="${destination.id}" aria-label="${fixed ? destination.name : `Mystery menu icon ${index + 1}`}" title="${fixed ? destination.name : "Probably the thing you are looking for"}">${fixed ? destination.name : `<span aria-hidden="true">${symbols[index]}</span><span class="mystery-tooltip" aria-hidden="true">The other thing.</span>`}</button>`).join("");
      menu.querySelectorAll("button").forEach((button, index) => button.addEventListener("click", () => {
        open(mapping[index]);
        if (worse) {
          const before = mapping.map(item => item.id).join(",");
          mapping = shuffle(mapping);
          if (mapping.map(item => item.id).join(",") === before) mapping.push(mapping.shift());
          renderMenu();
          menu.querySelectorAll("button")[index].focus({ preventScroll: true });
        }
      }));
    };
    renderMenu();
  } else if (id === "password-gym") {
    const rules = fixed ? [
      { text: "Use at least 12 characters, excluding outer spaces. Pasting is welcome.", passes: value => [...value.trim()].length >= 12 },
    ] : [
      { text: "Use at least 8 characters.", passes: value => [...value].length >= 8 },
      { text: "Include an uppercase letter.", passes: value => /[A-Z]/.test(value) },
      { text: "Include a lowercase letter.", passes: value => /[a-z]/.test(value) },
      { text: "Include a digit.", passes: value => /\d/.test(value) },
      { text: "Include a punctuation mark.", passes: value => /[!@#$%^&*(),.?":{}|<>_\-+=;/\\]/.test(value) },
      { text: "Your individual digits must add up to 25.", passes: value => [...value].reduce((total, character) => total + (/\d/.test(character) ? Number(character) : 0), 0) === 25 },
      { text: "Mention the weather. Include the word fragment “rain”.", passes: value => /rain/i.test(value) },
      { text: "Apologize. Include the word fragment “sorry”.", passes: value => /sorry/i.test(value) },
      { text: "Include the Roman numeral VII, in uppercase.", passes: value => /VII/.test(value) },
      { text: "Include the word fragment “monday”.", passes: value => /monday/i.test(value) },
      { text: "End the entire phrase with an exclamation mark.", passes: value => value.endsWith("!") },
      { text: "Actually, use at least 24 characters.", passes: value => [...value].length >= 24 },
      { text: "Ask politely. Include the word fragment “please”.", passes: value => /please/i.test(value) },
      { text: "Include the hexadecimal color #c0ffee. Its zero counts toward the digit rules.", passes: value => /#c0ffee/i.test(value) },
      { text: "Use at least three whitespace-separated words.", passes: value => value.trim().split(/\s+/).length >= 3 },
      { text: "Include the year 2026. Its digits still count toward the total of 25.", passes: value => value.includes("2026") },
      { text: "Mention the word fragment “moon”.", passes: value => /moon/i.test(value) },
      { text: "Include the word fragment “cat” to supervise the moon.", passes: value => /cat/i.test(value) },
      { text: "Include an empty pair of parentheses: ().", passes: value => value.includes("()") },
      { text: "Include at least three exclamation marks. One was insufficient enthusiasm.", passes: value => (value.match(/!/g) || []).length >= 3 },
      ...(worse ? [
        { text: "Begin the phrase with Rain, with that exact capitalization.", passes: value => value.startsWith("Rain") },
        { text: "Include the word fragment “banana”.", passes: value => /banana/i.test(value) },
        { text: "Include the word fragment “robot”.", passes: value => /robot/i.test(value) },
        { text: "The robot needs tea. Include the word fragment “tea”.", passes: value => /tea/i.test(value) },
        { text: "Include an empty pair of square brackets: [].", passes: value => value.includes("[]") },
        { text: "Include a plus sign: +.", passes: value => value.includes("+") },
        { text: "Include an underscore: _.", passes: value => value.includes("_") },
        { text: "Include a question mark to express your doubts.", passes: value => value.includes("?") },
        { text: "Use at least 100 characters. This is now a short essay.", passes: value => [...value].length >= 100 },
        { text: "Include “left” before “right”, ignoring capitalization.", passes: value => value.toLowerCase().indexOf("left") >= 0 && value.toLowerCase().indexOf("right") > value.toLowerCase().indexOf("left") },
        { text: "Include the exact phrase “I agree”. Agreement with these rules is not implied.", passes: value => value.includes("I agree") },
        { text: "Use NO digits at all. Rules 4, 6, 14, and 16 still apply.", passes: value => !/\d/.test(value) },
      ] : []),
    ];
    let revealed = 1;
    shell("STRENGTH TRAINING FOR A COMPLETELY FAKE PASSWORD", fixed ? "A passphrase, without the obstacle course." : "Your password needs more reps.",
      `Invent a throwaway phrase. NEVER enter a real password.${fixed ? " There is one requirement, shown upfront and checked as you type." : ` There are ${rules.length} rules. Meeting all visible requirements automatically reveals the next one, including when you paste. No submit button. Earlier rules never stop applying.${worse ? " This mode is deliberately impossible: its final requirement contradicts earlier ones. Fix it and Exit remain available." : " The default challenge is long but solvable."}`} This is a design puzzle, not security advice or a password-strength test.`,
      `<div class="gym-warning">DEMO ONLY — do not reuse a real password here or use this puzzle's solution for a real account.</div><form class="gym-form" id="gym-form"><label for="gym-phrase">Invented demo phrase (visible text)</label><input id="gym-phrase" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="240" aria-describedby="gym-warning-text"><small id="gym-warning-text">Live evaluation. Your phrase stays in this page; nothing is sent to a server.</small><p class="gym-progress" id="gym-progress"></p><ol class="gym-rules" id="gym-rules" tabindex="0" aria-label="Revealed password requirements"></ol></form>`);
    const input = stage.querySelector("#gym-phrase");
    const evaluate = () => {
      const results = rules.map(rule => rule.passes(input.value));
      const previous = revealed;
      while (revealed < rules.length && results.slice(0, revealed).every(Boolean)) revealed++;
      const ruleList = stage.querySelector("#gym-rules");
      ruleList.innerHTML = rules.slice(0, revealed).map((rule, index) => `<li class="${results[index] ? "satisfied" : "unsatisfied"}"><span>${results[index] ? "✓" : "×"}</span>${rule.text}</li>`).join("");
      if (revealed > previous) ruleList.scrollTop = ruleList.scrollHeight;
      const satisfied = results.slice(0, revealed).filter(Boolean).length;
      stage.querySelector("#gym-progress").textContent = `${revealed} / ${rules.length} rules revealed · ${satisfied} currently satisfied · checked automatically`;
      if (worse && revealed === rules.length) {
        say("Impossible by design: rule 32 forbids all digits, while rule 4 requires a digit and rule 6 requires their sum to be 25. Removing digits only breaks the earlier rules. Use Fix it or Exit to escape.");
      } else if (revealed === rules.length && satisfied === rules.length) {
        say(`Demo phrase accepted. All ${rules.length} requirement${rules.length === 1 ? "" : "s"} met automatically. No account was created; never reuse this phrase.`);
      } else {
        const failing = results.slice(0, revealed).findIndex(result => !result);
        say(`Rule ${failing + 1} is unmet: ${rules[failing].text} All earlier requirements remain active.`);
      }
    };
    input.addEventListener("input", evaluate);
    stage.querySelector("form").addEventListener("submit", event => { event.preventDefault(); evaluate(); });
    evaluate();
  } else if (id === "terms-game") {
    const contract = buildMuseumTerms(worse);
    shell("CONSENT, NOW WITH A COMPREHENSION EXAM", fixed ? "Terms a human can actually read." : "Please read every exceedingly important word.",
      fixed ? "This is a fictional exhibit. Here is everything you actually need to know." : `Read the ${contract.sections.length}-clause fictional agreement below. Reach the end to unlock an open-book exam about ${contract.facts.length} buried details.${worse ? " Clause references are withheld. You have five hints to reveal them, because apparently directions are a limited resource. A wrong answer resets the entire exam and shuffles its questions, but does not refund hints." : " Incorrect answers must be corrected before you can continue."} Scrolling alone is not proof: you must answer the questions. You may decline at any time.`,
      fixed ? `<div class="terms-summary"><h3>The actual summary</h3><ul><li>This is a pretend agreement for a design game, not a real contract.</li><li>Your answers stay in this page. Nothing is sent or stored.</li><li>You can decline or leave with no penalty.</li></ul><div class="new-actions"><button class="demo-button" id="terms-accept">Accept demo terms</button><button class="plain-button" id="terms-decline">Decline demo terms</button></div></div>` : `<div class="terms-document-meta"><span id="terms-word-count"></span><span>FICTIONAL · NON-BINDING · UNNECESSARILY LONG</span></div><article class="terms-document" id="terms-document" tabindex="0" aria-label="Full fictional terms and conditions"><h3>Agreement for the Provisional Use of Absolutely Nothing</h3><p>This entire document is a parody. It grants no rights, imposes no real obligations, and exists only to demonstrate an unnecessarily difficult interface. All named people, committees, objects, fees, and procedures are imaginary.</p>${contract.sections.join("")}<p class="terms-end">END OF AGREEMENT. The paperwork is over. The exam is not.</p></article><div class="terms-exam-actions"><p id="terms-reading-status" role="status">Scroll to the end of the document to unlock the reading exam. Keyboard users can focus the document and use End.</p><button class="demo-button" id="terms-start" disabled>Prove I read it</button><button class="plain-button" id="terms-decline">Decline demo terms</button></div><section class="terms-exam" id="terms-exam" aria-label="Reading comprehension exam" hidden></section>`);
    let ended = false;
    const accept = () => {
      ended = true;
      stage.querySelector("#terms-accept").disabled = true;
      stage.querySelector("#terms-decline").disabled = true;
      say(fixed ? "Demo terms accepted. No real agreement was created." : "Reading exam passed. Demo terms accepted. No real agreement was created.");
    };
    stage.querySelector("#terms-decline").addEventListener("click", () => {
      ended = true;
      const exam = stage.querySelector("#terms-exam");
      if (exam) exam.hidden = true;
      const start = stage.querySelector("#terms-start");
      if (start) start.disabled = true;
      const acceptButton = stage.querySelector("#terms-accept");
      if (acceptButton) acceptButton.disabled = true;
      stage.querySelector("#terms-decline").disabled = true;
      say("Demo terms declined. No agreement, penalty, or real-world effect. You are free to leave.");
    });
    if (fixed) {
      stage.querySelector("#terms-accept").addEventListener("click", accept);
    } else {
      const documentPanel = stage.querySelector("#terms-document");
      const start = stage.querySelector("#terms-start");
      const exam = stage.querySelector("#terms-exam");
      const wordCount = documentPanel.textContent.trim().split(/\s+/).length;
      stage.querySelector("#terms-word-count").textContent = `${wordCount.toLocaleString("en-US")} words · approximately ${Math.ceil(wordCount / 220)} minutes of regrettable reading`;
      let unlocked = false;
      let question = 0;
      let questions = worse ? shuffle(contract.facts) : [...contract.facts];
      const hintedClauses = new Set();
      const hintLimit = 5;
      const normalize = value => value.trim().toLowerCase().replace(/\s+/g, " ");
      const checkScroll = () => {
        if (ended || unlocked) return;
        if (documentPanel.scrollTop + documentPanel.clientHeight >= documentPanel.scrollHeight - 4) {
          unlocked = true;
          start.disabled = false;
          stage.querySelector("#terms-reading-status").textContent = "End reached. Now prove comprehension. The document remains available during the exam.";
        }
      };
      documentPanel.addEventListener("scroll", checkScroll);
      const renderQuestion = () => {
        if (question === questions.length) {
          exam.innerHTML = `<h3>Reading exam passed.</h3><p>You answered all ${questions.length} questions. You may now accept this entirely fictional agreement, or decline it.</p><button class="demo-button" id="terms-accept">Accept demo terms</button>`;
          exam.querySelector("#terms-accept").addEventListener("click", accept);
          exam.querySelector("button").focus();
          return;
        }
        const fact = questions[question];
        const clauseHelp = () => !worse || hintedClauses.has(fact.clause)
          ? `Consult clause ${fact.clause} in the document above. Answers are case-insensitive.`
          : "The answer is somewhere in the document above. How very helpful. Answers are case-insensitive.";
        exam.innerHTML = `<span class="demo-kicker">QUESTION ${question + 1} / ${questions.length}${worse ? "" : ` · CLAUSE ${fact.clause}`}</span><h3>${fact.question}</h3><p id="terms-clause-help" role="status">${clauseHelp()}</p>${worse ? '<div class="new-actions"><button type="button" class="plain-button" id="terms-hint"></button></div>' : ""}<form id="terms-answer-form"><label for="terms-answer">Your answer</label><input id="terms-answer" type="text" maxlength="100" required autocomplete="off"><button class="demo-button">Submit reading evidence</button></form>`;
        if (worse) {
          const hintButton = exam.querySelector("#terms-hint");
          const updateHint = () => {
            const revealed = hintedClauses.has(fact.clause);
            const remaining = hintLimit - hintedClauses.size;
            hintButton.disabled = revealed || remaining === 0;
            hintButton.textContent = `${revealed ? "Clause revealed" : remaining === 0 ? "No hints left" : "Reveal clause"} (${remaining} hint${remaining === 1 ? "" : "s"} left)`;
            exam.querySelector("#terms-clause-help").textContent = clauseHelp();
          };
          hintButton.addEventListener("click", () => {
            if (hintedClauses.has(fact.clause) || hintedClauses.size >= hintLimit) return;
            hintedClauses.add(fact.clause);
            updateHint();
          });
          updateHint();
        }
        exam.querySelector("form").addEventListener("submit", event => {
          event.preventDefault();
          if (normalize(exam.querySelector("input").value) !== normalize(fact.answer)) {
            if (worse) {
              question = 0;
              questions = shuffle(contract.facts);
              renderQuestion();
            }
            say(worse ? "Incorrect. The whole exam has restarted with a new question order. The document has not changed." : `Incorrect. Read clause ${fact.clause} again; your previous correct answers are retained.`);
            return;
          }
          question++;
          renderQuestion();
          say(question === questions.length ? "All reading evidence accepted. The final acceptance button is now available." : `${question} correct answer${question === 1 ? "" : "s"}. More evidence is required.`);
        });
        exam.querySelector("input").focus();
      };
      start.addEventListener("click", () => {
        start.disabled = true;
        exam.hidden = false;
        renderQuestion();
      });
    }
  }
  return () => {};
}

function renderCheckboxEcosystem({ stage, mode, shell, say }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("CONSENT IS A DELICATE HOUSEPLANT", fixed ? "Preferences, not pets." : "Your checkboxes are alive.",
    fixed ? "Choose any demo preferences and save. Nothing decays, moves, reproduces, or gets sent anywhere." : `Task: enable Security alerts, Delivery updates, and Dark mode, with every other box off. Checking a box feeds it. Feed checked boxes before their health runs out, or they uncheck themselves.${worse ? " Every third feeding also creates a checked offspring. This counts as another preference to manage." : ""} The habitat starts on your first change; you can pause it. Nothing changes real settings.`,
    `<div class="eco-habitat"><div class="eco-grid" id="eco-grid"></div><div class="new-actions">${fixed ? "" : '<button type="button" class="plain-button" id="eco-pause">Start habitat</button>'}<button type="button" class="demo-button" id="eco-save">Save demo preferences</button></div><p id="eco-summary" class="eco-summary"></p></div>`);
  const grid = stage.querySelector("#eco-grid");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const preferences = [];
  let timer = null;
  let running = false;
  let paused = false;
  let saved = false;
  let feedings = 0;
  const paint = () => {
    for (const pet of preferences) {
      pet.input.checked = pet.checked;
      pet.input.disabled = saved;
      if (!fixed) {
        pet.healthMeter.value = pet.health;
        pet.healthText.textContent = pet.checked ? `Health: ${pet.health}%` : "Dormant (unchecked)";
        pet.feed.disabled = saved || !pet.checked;
        pet.card.style.transform = motion.matches || !running ? "none" : `translate(${pet.x}px, ${pet.y}px)`;
      }
    }
    if (!fixed) {
      stage.querySelector("#eco-pause").textContent = running ? "Pause habitat" : "Start habitat";
      stage.querySelector("#eco-pause").disabled = saved;
    }
    stage.querySelector("#eco-summary").textContent = `${preferences.filter(pet => pet.checked).length} checked / ${preferences.length} preferences${fixed ? "" : ` / ${saved ? "saved and stable" : running ? "habitat awake" : "habitat paused"}`}`;
  };
  const addPet = (name, required = false, checked = false) => {
    const id = preferences.length;
    const card = document.createElement("div");
    card.className = "eco-card";
    card.innerHTML = `<label for="rbm-eco-choice-${id}"><input type="checkbox" id="rbm-eco-choice-${id}"><span></span></label>${fixed ? "" : `<div class="eco-health"><meter min="0" max="100" value="100" aria-label="Checkbox health"></meter><small></small></div><button type="button" class="plain-button">Feed 🌱</button>`}`;
    card.querySelector("label span").textContent = name;
    const pet = { name, required, checked, health: 100, x: 0, y: 0, card, input: card.querySelector("input"), healthMeter: card.querySelector("meter"), healthText: card.querySelector("small"), feed: card.querySelector("button") };
    pet.input.addEventListener("change", () => {
      pet.checked = pet.input.checked;
      if (!fixed) {
        start();
        if (pet.checked) feed(pet);
      }
      paint();
    });
    if (pet.feed) pet.feed.addEventListener("click", () => { start(); feed(pet); paint(); });
    preferences.push(pet);
    grid.append(card);
  };
  const feed = pet => {
    pet.health = 100;
    pet.x = 0;
    pet.y = 0;
    feedings++;
    if (worse && feedings % 3 === 0 && preferences.length < 12) {
      addPet(`Offspring preference ${preferences.length - 5}`, false, true);
      say("Your checkbox reproduced. The new preference is already checked. Uncheck it before saving the requested settings.");
    } else say(`${pet.name} fed. Its preference is safe until it gets hungry again.`);
  };
  const tick = () => {
    const wilted = [];
    for (const pet of preferences) {
      if (pet.checked) {
        pet.health = Math.max(0, pet.health - (worse ? 24 : 12));
        if (pet.health === 0) { pet.checked = false; wilted.push(pet.name); }
      }
      if (!pet.checked || pet.health < 50) {
        pet.x = Math.random() * 12 - 6;
        pet.y = Math.random() * 10 - 5;
      }
    }
    paint();
    if (wilted.length) say(`${wilted.join(", ")} wilted and unchecked. Check them again to restore the preferences.`);
  };
  const start = () => {
    if (fixed || running || paused || saved) return;
    running = true;
    timer = setInterval(tick, 1000);
  };
  const pause = () => {
    clearInterval(timer);
    timer = null;
    running = false;
    paused = true;
    paint();
  };
  [["Security alerts", true], ["Delivery updates", true], ["Dark mode", true], ["Marketing emails", false], ["Partner offers", false], ["Daily fun facts", false]].forEach(([name, required]) => addPet(name, required));
  if (!fixed) stage.querySelector("#eco-pause").addEventListener("click", () => {
    if (running) { pause(); say("Habitat paused. All preferences and health levels are held."); }
    else { paused = false; start(); paint(); say("Habitat awake. Remember to feed your checked boxes."); }
  });
  stage.querySelector("#eco-save").addEventListener("click", () => {
    if (!fixed && preferences.some(pet => pet.checked !== pet.required)) {
      say("Enable only Security alerts, Delivery updates, and Dark mode. All other preferences, including offspring, must be off.");
      return;
    }
    saved = true;
    pause();
    stage.querySelector("#eco-save").disabled = true;
    say(`Demo preferences saved: ${preferences.filter(pet => pet.checked).map(pet => pet.name).join(", ") || "none"}. They will no longer decay. No real settings were changed.`);
  });
  const visibility = () => {
    if (document.hidden && running) { pause(); say("Habitat paused while the tab is hidden. Your preferences are held."); }
  };
  const motionChange = () => paint();
  document.addEventListener("visibilitychange", visibility);
  motion.addEventListener("change", motionChange);
  paint();
  return () => {
    clearInterval(timer);
    document.removeEventListener("visibilitychange", visibility);
    motion.removeEventListener("change", motionChange);
  };
}

function renderElevatorDate({ stage, mode, shell, say }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("VERTICAL TRANSPORT FOR TEMPORAL DATA", fixed ? "Pick a date. Stay on this floor." : "Your date requires two transfers.",
    fixed ? "Choose a fictional date directly. Nothing is booked or saved." : `Ride to a year, request a stop, then transfer to the month and day elevators. Try July 16, 1992, or choose your own fictional date.${worse ? " Express service jumps three floors unless you request a stop before the next departure." : " Request stop brings you to the next floor."} Only stopped elevators let you select a floor. No booking is made.`,
    fixed ? '<form id="lift-form"><label for="lift-date">Demo date</label><input type="date" id="lift-date" min="1900-01-01" max="2100-12-31" required><button class="demo-button">Choose demo date</button></form>' : `<div class="lift-machine"><div class="lift-route" id="lift-route">YEAR → MONTH → DAY</div><div class="lift-shaft"><div class="lift-cabin" id="lift-cabin"><span id="lift-service">YEAR ELEVATOR</span><output id="lift-floor">2000</output><span id="lift-state">Doors open</span></div></div><div class="lift-controls"><button type="button" class="plain-button" id="lift-down">↓ Ride down</button><button type="button" class="plain-button" id="lift-stop" disabled>Request stop</button><button type="button" class="plain-button" id="lift-up">↑ Ride up</button></div><div class="new-actions"><button type="button" class="demo-button" id="lift-select">Use this year</button><button type="button" class="plain-button" id="lift-restart">Return to year lobby</button></div><p class="lift-itinerary" id="lift-itinerary">Selected date: ---- / -- / --</p></div>`);
  if (fixed) {
    stage.querySelector("#lift-form").addEventListener("submit", event => {
      event.preventDefault();
      say(`Demo date chosen: ${stage.querySelector("#lift-date").value}. Nothing was booked or saved.`);
    });
    return () => {};
  }
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const cabin = stage.querySelector("#lift-cabin");
  const units = ["year", "month", "day"];
  const selection = [];
  let level = 0;
  let floor = 2000;
  let direction = 0;
  let requested = false;
  let finished = false;
  let timer = null;
  let animation = null;
  const range = () => level === 0 ? [1900, 2100] : level === 1 ? [1, 12] : [1, new Date(Date.UTC(selection[0], selection[1], 0)).getUTCDate()];
  const paint = () => {
    const [min, max] = range();
    stage.querySelector("#lift-service").textContent = `${units[level].toUpperCase()} ELEVATOR${worse ? " / EXPRESS" : ""}`;
    stage.querySelector("#lift-floor").textContent = floor;
    stage.querySelector("#lift-state").textContent = finished ? "Trip complete" : direction ? requested ? "Stopping at the next numbered floor" : `Travelling ${direction > 0 ? "up" : "down"}` : "Doors open";
    stage.querySelector("#lift-down").disabled = finished || direction !== 0 || floor <= min;
    stage.querySelector("#lift-up").disabled = finished || direction !== 0 || floor >= max;
    stage.querySelector("#lift-stop").disabled = direction === 0 || requested;
    stage.querySelector("#lift-select").disabled = direction !== 0 || finished;
    stage.querySelector("#lift-select").textContent = level === 2 ? "Choose this date" : `Use this ${units[level]} and transfer`;
    stage.querySelector("#lift-route").textContent = units.map((unit, index) => index === level ? `[${unit.toUpperCase()}]` : unit.toUpperCase()).join(" → ");
    stage.querySelector("#lift-itinerary").textContent = `Selected date: ${selection[0] || "----"} / ${selection[1] ? String(selection[1]).padStart(2, "0") : "--"} / ${selection[2] ? String(selection[2]).padStart(2, "0") : "--"}`;
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
    direction = 0;
    requested = false;
    if (animation) animation.cancel();
    animation = null;
    paint();
  };
  const advance = () => {
    const [min, max] = range();
    floor = Math.max(min, Math.min(max, floor + direction * (worse && !requested ? 3 : 1)));
    if (animation) animation.cancel();
    if (!motion.matches) animation = cabin.animate([
      { transform: `translateY(${direction * 10}px)` },
      { transform: "translateY(0)" },
    ], { duration: 220, easing: "ease-out" });
    if (requested || floor === min || floor === max) {
      stop();
      say(`Doors open at ${units[level]} ${floor}. Select this floor or ride again.`);
    } else paint();
  };
  const ride = value => {
    direction = value;
    requested = false;
    timer = setInterval(advance, worse ? 350 : 650);
    paint();
    say(`Riding ${value > 0 ? "up" : "down"}. Request a stop before the next departure to reach the next numbered floor.`);
  };
  stage.querySelector("#lift-up").addEventListener("click", () => ride(1));
  stage.querySelector("#lift-down").addEventListener("click", () => ride(-1));
  stage.querySelector("#lift-stop").addEventListener("click", () => {
    requested = true;
    paint();
    say("Stop requested. The next departure moves one floor, then opens the doors.");
  });
  stage.querySelector("#lift-select").addEventListener("click", () => {
    selection[level] = floor;
    if (level === 2) {
      finished = true;
      paint();
      say(`Demo date chosen: ${selection[0]}-${String(selection[1]).padStart(2, "0")}-${String(selection[2]).padStart(2, "0")}. Three elevators, one date. Nothing was booked or saved.`);
    } else {
      level++;
      floor = 1;
      paint();
      say(`Transfer complete. Welcome to the ${units[level]} elevator.`);
    }
  });
  stage.querySelector("#lift-restart").addEventListener("click", () => {
    stop();
    selection.length = 0;
    level = 0;
    floor = 2000;
    finished = false;
    paint();
    say("Back at the year lobby. Your date selection has been cleared.");
  });
  const pauseRide = () => {
    if (direction) { stop(); say("Elevator paused at the current floor. Continue when ready."); }
  };
  const visibility = () => { if (document.hidden) pauseRide(); };
  const motionChange = () => { if (animation) animation.cancel(); };
  window.addEventListener("blur", pauseRide);
  document.addEventListener("visibilitychange", visibility);
  motion.addEventListener("change", motionChange);
  paint();
  return () => {
    clearInterval(timer);
    if (animation) animation.cancel();
    window.removeEventListener("blur", pauseRide);
    document.removeEventListener("visibilitychange", visibility);
    motion.removeEventListener("change", motionChange);
  };
}

function renderTetrisVolume({ stage, mode, shuffle, shell, say }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("DECIBELS REQUIRE STRUCTURAL SUPPORT", fixed ? "A slider. Not an arcade." : "Please construct your volume.",
    fixed ? "Adjust the pretend volume directly. No audio plays and your device volume never changes." : `Each settled block raises the pretend volume; 80 blocks, or two-thirds of the board, reaches 100%. Complete rows disappear and take their volume with them. Click Another block to replace the falling piece without changing your stack.${worse ? " Worse mode drops blocks more than twice as fast." : ""} No audio plays and your device volume never changes.`,
    `<div class="tetris-machine"><label for="tetris-volume">Pretend volume${fixed ? "" : " (controlled by settled blocks)"}</label><output id="tetris-value" for="tetris-volume">${fixed ? 50 : 0}%</output><input type="range" id="tetris-volume" min="0" max="100" value="${fixed ? 50 : 0}" ${fixed ? "" : "disabled"}>${fixed ? "" : `<div class="tetris-summary"><span id="tetris-fill">0 / 80 cells for 100%</span><span id="tetris-piece-name"></span></div><div class="tetris-board" id="tetris-board" tabindex="0" role="group" aria-label="Falling block volume game" aria-describedby="tetris-help">${Array.from({ length: 120 }, (_, index) => `<span class="tetris-cell${index >= 40 ? " tetris-lower" : ""}" data-tetris-cell="${index}" aria-hidden="true"></span>`).join("")}</div><p id="tetris-help">With the board or any game button focused: Left/Right move, Up or R rotates, Down lowers. Space drops when the board is focused; on a button, Space activates that button. Completed rows disappear. Touch controls are below. Reduced motion uses manual drops only. Pause whenever you need to think.</p><div class="tetris-controls"><button type="button" class="plain-button" data-tetris-action="left" aria-label="Move block left">←</button><button type="button" class="plain-button" data-tetris-action="rotate" aria-keyshortcuts="ArrowUp r">Rotate (R / ↑)</button><button type="button" class="plain-button" data-tetris-action="right" aria-label="Move block right">→</button><button type="button" class="plain-button" data-tetris-action="down">Lower ↓</button><button type="button" class="demo-button" data-tetris-action="drop">Drop block</button></div><div class="new-actions"><button type="button" class="demo-button" id="tetris-play">Start game</button><button type="button" class="plain-button" id="tetris-another">Another block</button><button type="button" class="plain-button" id="tetris-empty">Empty speaker</button></div>`}</div>`);
  const volume = stage.querySelector("#tetris-volume");
  const output = stage.querySelector("#tetris-value");
  if (fixed) {
    volume.addEventListener("input", () => { output.textContent = `${volume.value}%`; });
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

function renderShrinkingUnsubscribe({ stage, mode, shell, say }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("RETENTION THROUGH TARGET REDUCTION", fixed ? "Leave whenever you like." : "You have been fictionally subscribed.",
    `Welcome to Premium Nonsense: $49 in imaginary money per month. No real subscription, account, or charge exists.${fixed ? " Cancel the demo with one click." : ` Try to cancel below. The button shrinks as your mouse gets closer, then reappears somewhere else. A finger has nothing to approach, so on touch it shrinks on a timer, dodges near misses, and squirms out of a clean tap by collapsing to nothing and turning up elsewhere, as though you never touched it. Every escape brings it back slightly smaller.${worse ? " Worse mode starts shrinking sooner, shrinks smaller, jumps away earlier, runs the touch timer almost twice as fast, and squirms away more stubbornly." : ""} Retention gives up after eight escapes, so this always ends. Keyboard users can focus the button and cancel immediately; reduced motion keeps the button still.`}`,
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
  // Every escape brings it back a little smaller than before, because of course it does.
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
    // Ignore taps mid-dodge; it is busy pretending it was never there.
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
    // Squirm out of your grip: collapse to nothing under the finger, then turn up elsewhere as
    // though the tap never happened. Instantly teleporting read as a dropped tap instead of a joke.
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

function renderCatCaptcha({ stage, mode, shell, say }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  if (fixed) {
    shell("VERIFICATION WITHOUT PREDATION", "One checkbox. Zero cats.",
      "This is a pretend verification widget, not a real CAPTCHA or security measure.",
      `<form id="cat-simple-form"><label class="cat-simple-label"><input type="checkbox" id="cat-simple-check" required> I am here for the demo, not the cheese.</label><button class="demo-button">Verify demo</button></form>`);
    stage.querySelector("#cat-simple-form").addEventListener("submit", event => {
      event.preventDefault();
      say("Demo verified. No chase, no cheese, and no real security check.");
    });
    return () => {};
  }
  const maze = [".........", ".##.#.##.", "....#....", ".#.....#.", ".#.###.#.", ".........", "..#...#.."];
  const columns = maze[0].length;
  const directions = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
  const cheeseLocations = [0, 21, 52, 58, ...(worse ? [8, 54] : [])];
  let exit;
  let audited;
  shell("CAT-PCHA / RODENT-BASED AUTHENTICATION", "Prove you're human. Become a mouse.",
    `Collect all ${cheeseLocations.length} cheeses, then reach the mouse hole at the bottom right. The cat hunts you after EVERY move.${worse ? " Every eighth move, it takes TWO steps. Collecting cheese distracts it for that turn, even during a sprint. Your first completed exit attempt will be rejected: expect a new cheese fee and a relocated exit. Apparently the cat wrote the terms." : ""} Getting caught means starting over. This chase is turn-based: take as long as you like to think. This is a pretend CAPTCHA, not a real security check.`,
    `<div class="cat-machine"><div class="cat-dashboard"><strong id="cat-verdict">UNVERIFIED</strong><span id="cat-cheese-count"></span><span id="cat-turn"></span></div><div class="cat-board" id="cat-board" tabindex="0" role="group" aria-label="Cat and mouse maze" aria-describedby="cat-help"><div class="cat-grid" aria-hidden="true">${maze.flatMap((row, y) => [...row].map((cell, x) => `<div class="cat-cell${cell === "#" ? " cat-wall" : ""}" data-cat-cell="${y * columns + x}"></div>`)).join("")}</div><span class="cat-piece cat-player" id="cat-player" aria-hidden="true">🐭</span><span class="cat-piece cat-hunter" id="cat-hunter" aria-hidden="true">🐈</span></div><p id="cat-help">You are the mouse. Use arrow keys or WASD while the maze is focused, tap a neighboring square, or use the buttons below. Walls block both of you. The cat does not move while you think.</p><div class="cat-directions" aria-label="Move the mouse"><button type="button" class="plain-button" data-cat-direction="3" aria-label="Move mouse up">↑</button><button type="button" class="plain-button" data-cat-direction="1" aria-label="Move mouse left">←</button><button type="button" class="plain-button" data-cat-direction="2" aria-label="Move mouse down">↓</button><button type="button" class="plain-button" data-cat-direction="0" aria-label="Move mouse right">→</button></div><div class="new-actions"><button type="button" class="demo-button" id="cat-retry">Restart chase</button><span class="cat-legend">🐭 You &nbsp; 🐈 Cat &nbsp; 🧀 Cheese &nbsp; ◠ Mouse hole</span></div></div>`);
  const board = stage.querySelector("#cat-board");
  if (worse) {
    board.insertAdjacentHTML("afterend", '<p class="cat-policy" id="cat-policy"></p>');
  }
  const cells = [...stage.querySelectorAll("[data-cat-cell]")];
  let mouse;
  let cat;
  let cheese;
  let moves;
  let ended;
  const neighbors = position => {
    const x = position % columns;
    const y = Math.floor(position / columns);
    return directions.map(direction => ({ x: x + direction.x, y: y + direction.y }))
      .filter(point => point.x >= 0 && point.x < columns && point.y >= 0 && point.y < maze.length && maze[point.y][point.x] !== "#")
      .map(point => point.y * columns + point.x);
  };
  const coordinates = position => `column ${position % columns + 1}, row ${Math.floor(position / columns) + 1}`;
  const paint = () => {
    cells.forEach((cell, position) => {
      cell.textContent = cheese.has(position) ? "🧀" : position === exit ? "EXIT" : "";
      cell.classList.toggle("cat-hole", position === exit);
      cell.classList.toggle("cat-hole-open", position === exit && cheese.size === 0);
    });
    for (const [id, position] of [["cat-player", mouse], ["cat-hunter", cat]]) {
      const piece = stage.querySelector(`#${id}`);
      piece.style.left = `${(position % columns + 0.5) / columns * 100}%`;
      piece.style.top = `${(Math.floor(position / columns) + 0.5) / maze.length * 100}%`;
    }
    const total = cheeseLocations.length + (audited ? 1 : 0);
    const sprintNext = worse && (moves + 1) % 8 === 0;
    stage.querySelector("#cat-cheese-count").textContent = `Cheese: ${total - cheese.size}/${total}`;
    stage.querySelector("#cat-turn").textContent = ended ? `${moves} moves` : `Move ${moves} / Cat ${sprintNext ? "SPRINTS next (2 steps)" : "moves next"}`;
    board.classList.toggle("cat-sprint-warning", sprintNext && !ended);
    if (worse) {
      stage.querySelector("#cat-policy").textContent = audited
        ? `EXIT RELOCATED: top right. ${cheese.size ? "One processing-fee cheese is waiting at the top left." : "Processing fee paid. Now reach the new exit."} The original hole is now a decorative hole.`
        : "EXIT APPROVAL: provisional. Six cheeses buy you the right to be rejected once. Cheese pickups distract the cat; use them to dodge its eighth-turn sprints.";
    }
    stage.querySelectorAll("[data-cat-direction]").forEach(button => { button.disabled = ended; });
    board.setAttribute("aria-label", `Maze: mouse at ${coordinates(mouse)}. Cat at ${coordinates(cat)}. ${cheese.size} cheeses left${cheese.size ? ` at ${[...cheese].map(coordinates).join("; ")}` : ""}. Exit at ${coordinates(exit)}.${sprintNext && !ended ? " Warning: the cat takes two steps next turn unless you collect cheese." : ""}`);
  };
  const chase = () => {
    const queue = [{ position: cat, first: cat }];
    const visited = new Set([cat]);
    for (let index = 0; index < queue.length; index++) {
      const { position, first } = queue[index];
      for (const next of neighbors(position)) {
        if (visited.has(next)) continue;
        const step = position === cat ? next : first;
        if (next === mouse) { cat = step; return; }
        visited.add(next);
        queue.push({ position: next, first: step });
      }
    }
  };
  const finish = success => {
    ended = true;
    board.classList.add(success ? "cat-escaped" : "cat-caught");
    stage.querySelector("#cat-verdict").textContent = success ? "DEMO VERIFIED" : "CAUGHT. STILL SUSPICIOUS.";
    paint();
    say(success ? `You escaped with all the cheese in ${moves} moves. Demo verified! No real security check took place.` : "The cat tagged you! Verification denied on grounds of being delicious. Restart the chase to try again, or use Fix it to skip the game.");
  };
  const move = destination => {
    if (ended) { say("This chase is over. Restart to play again, or use Fix it for the simple demo."); return; }
    if (!neighbors(mouse).includes(destination)) { say("Move one square up, down, left, or right. Walls and diagonal moves do not count; the cat waits."); return; }
    mouse = destination;
    moves++;
    if (mouse === cat) { finish(false); return; }
    const collected = cheese.delete(mouse);
    let notice = "";
    if (mouse === exit && cheese.size === 0) {
      if (!worse || audited) { finish(true); return; }
      audited = true;
      exit = 8;
      cheese.add(0);
      stage.querySelector("#cat-verdict").textContent = "DENIED. MISSING CHEESEWORK.";
      notice = "Verification rejected! A seventh cheese has appeared at the top left as a processing fee. The exit has relocated to the top right. No, your previous cheese does not cover this. ";
    }
    const distracted = worse && collected;
    const catSteps = distracted ? 0 : worse && moves % 8 === 0 ? 2 : 1;
    for (let step = 0; step < catSteps; step++) {
      chase();
      if (mouse === cat) { finish(false); return; }
    }
    paint();
    say(`${notice}${collected ? "Cheese collected! " : ""}${distracted ? "The cat pauses to inspect your cheese receipt. " : catSteps === 2 ? "The cat took TWO steps. Premium predation. " : ""}${mouse === exit ? "The hole needs all the cheese first. " : ""}Mouse at ${coordinates(mouse)}; cat at ${coordinates(cat)}. ${cheese.size} cheeses left.`);
  };
  const step = direction => {
    const vector = directions[direction];
    const x = mouse % columns + vector.x;
    const y = Math.floor(mouse / columns) + vector.y;
    move(x >= 0 && x < columns && y >= 0 && y < maze.length ? y * columns + x : -1);
  };
  board.addEventListener("keydown", event => {
    const keys = { ArrowRight: 0, d: 0, ArrowLeft: 1, a: 1, ArrowDown: 2, s: 2, ArrowUp: 3, w: 3 };
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (!(key in keys) || event.ctrlKey || event.metaKey || event.altKey) return;
    event.preventDefault();
    step(keys[key]);
  });
  board.addEventListener("click", event => {
    const cell = event.target.closest("[data-cat-cell]");
    if (!cell) return;
    board.focus({ preventScroll: true });
    move(Number(cell.dataset.catCell));
  });
  stage.querySelectorAll("[data-cat-direction]").forEach(button => button.addEventListener("click", () => step(Number(button.dataset.catDirection))));
  const reset = () => {
    mouse = 46;
    cat = 7;
    cheese = new Set(cheeseLocations);
    exit = 62;
    audited = false;
    moves = 0;
    ended = false;
    board.classList.remove("cat-caught", "cat-escaped");
    stage.querySelector("#cat-verdict").textContent = "UNVERIFIED";
    paint();
    say("The mouse is at column 2, row 6. The cat is at column 8, row 1. Collect the cheese and escape. Take your time.");
  };
  stage.querySelector("#cat-retry").addEventListener("click", () => {
    reset();
    board.focus({ preventScroll: true });
  });
  reset();
  return () => {};
}

function renderWindVolume({ stage, mode, shell, say }) {
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

function renderSeismicEditor({ stage, mode, shell, say }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("THIS SENTENCE HAS NOT PASSED A BUILDING INSPECTION", fixed ? "Words on solid ground." : "Please type without causing a landslide.",
    fixed ? "Enter a sentence and finish it. Nothing shakes or falls." : `Every edit shakes the exhibit and raises the chance of your entire sentence collapsing into a heap. Type slowly for gentle tremors; rapid typing shakes harder. Punctuation adds a jolt, especially exclamation marks! Pasting adds stress for every added character.${worse ? " Worse mode builds stress twice as fast and shakes harder." : ""} Finish before it falls, or rebuild your preserved text after a collapse. Reduced-motion settings disable animation; the museum controls never shake.`,
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

function buildMuseumTerms(worse) {
  const facts = [
    { clause: 8, question: "Which animal is the official spokesperson?", answer: "capybara", sentence: "The official spokesperson for all ceremonial communications is a capybara." },
    { clause: 17, question: "On which weekday are emergency meetings held?", answer: "Thursday", sentence: "Emergency meetings are held on Thursday, regardless of when the emergency was invented." },
    { clause: 26, question: "What is the approved ink color?", answer: "aubergine", sentence: "The approved ink color for all non-binding annotations is aubergine." },
    { clause: 35, question: "In what currency are imaginary refunds issued?", answer: "paperclips", sentence: "Imaginary refunds are issued exclusively in paperclips; no real money changes hands." },
    { clause: 44, question: "How long is the ceremonial waiting period?", answer: "17 business naps", sentence: "The ceremonial waiting period is 17 business naps, which are not recognized units of time." },
    { clause: 53, question: "What is the committee's ceremonial passphrase?", answer: "waffle parliament", sentence: "The committee's ceremonial passphrase is waffle parliament. It is fictional and must never be used to secure a real account." },
    { clause: 62, question: "In which direction must the ceremonial spoon point?", answer: "north-northeast", sentence: "The ceremonial spoon must point north-northeast when placed on an imaginary table." },
    { clause: 74, question: "What is the name of the font auditor?", answer: "Professor Crumb", sentence: "The font auditor is Professor Crumb, an imaginary person with no jurisdiction over your typography." },
    { clause: 82, question: "What sound announces a procedural alarm?", answer: "polite kazoo", sentence: "A procedural alarm is announced with a polite kazoo. No actual sound will be played." },
    { clause: 101, question: "What is the fictional record-retention ceiling?", answer: "42 imaginary minutes", sentence: "The fictional record-retention ceiling is 42 imaginary minutes. In reality, this exhibit stores no records." },
    { clause: 122, question: "Which archive box holds the ceremonial forms?", answer: "B-19", sentence: "Ceremonial forms are assigned to archive box B-19, a box that does not exist." },
    { clause: 151, question: "What farewell phrase closes an official meeting?", answer: "cordially bewildered", sentence: "Every official meeting concludes with the farewell phrase cordially bewildered." },
  ].slice(0, worse ? 12 : 8);
  const themes = [
    ["The status of a chair", "A chair shall be considered provisionally seated upon only after the Committee for Sitting has acknowledged that a person may eventually contemplate sitting. Standing next to the chair does not constitute a reservation. Looking at the chair creates no entitlement to its cushion. The chair retains its imaginary right to remain furniture throughout these proceedings."],
    ["The emotional condition of stationery", "Stationery may be described as enthusiastic, reserved, or administratively overwhelmed. Such descriptions do not alter its physical properties or confer the ability to process requests. A pencil remains a pencil even when assigned a leadership role. Erasers may attend planning meetings but may not erase the meeting itself, its agenda, or the existence of a competing pencil."],
    ["The custody of biscuits", "Biscuits placed near a meeting shall be classified as discussion-adjacent provisions. Classification does not imply that a meeting must occur, that anyone must attend, or that the biscuit is edible. Crumbs are independent subsidiaries of the original biscuit for the purposes of this entirely fictional document. No participant is required to count, name, or negotiate with them."],
    ["The scheduling of unnecessary meetings", "A meeting to arrange a meeting shall not be confused with the meeting that is eventually arranged. Each may have a separate agenda describing the agenda of the other. If the two agendas become identical, a further meeting may be imagined to appreciate the coincidence. Nothing in this provision creates an actual calendar invitation or an obligation to attend."],
    ["The direction of ambient enthusiasm", "Enthusiasm is expected to travel in a generally constructive direction without obstructing the imaginary corridors. Participants may express moderate interest without submitting evidence of excitement. Excessive enthusiasm may be placed in a metaphorical drawer until the next ceremonial interval. That drawer has no physical location, and the museum does not expect visitors to search their actual homes for it."],
    ["The classification of small clouds", "Clouds visible through a hypothetical window may resemble objects without acquiring their responsibilities. A cloud that resembles a teapot is not responsible for serving tea. A cloud that resembles a lawyer does not provide legal advice. Any resemblance between a cloud and a pending form shall be attributed to imagination rather than an outstanding administrative requirement."],
    ["The maintenance of imaginary corridors", "Corridors described by this agreement are literary conveniences rather than navigable spaces. A visitor cannot become lost in them, reserve them, or submit a repair request concerning their carpets. References to the end of a corridor indicate the end of a sentence unless the sentence continues. In that case, the corridor has been extended solely for the convenience of the writer."],
    ["The interpretation of decorative arrows", "An arrow printed beside a statement is not automatically a promise that the statement will lead anywhere useful. In a sensible interface, arrows should nevertheless behave predictably. This fictional committee has elected to hold a discussion about predictability rather than implement it. The discussion has been recorded only in these words and creates no further administrative work for the reader."],
    ["The storage of unused adjectives", "Adjectives not currently attached to a noun may wait in an imaginary holding area. They may not describe themselves as essential merely to obtain priority placement. The words innovative, transformative, and seamless have been asked to remain seated until a concrete benefit can be identified. No adjective can claim ownership of a product, a person, or a reasonable expectation."],
    ["The ceremonial opening of envelopes", "An envelope may be ceremonially opened whether or not it contains an imaginary letter. The absence of a letter does not invalidate the opening ceremony, but it substantially reduces the amount of reading required afterward. Reopening an already open envelope is considered an advanced technique. It is not a prerequisite for accessing any part of this website or leaving this exhibit."],
    ["The distribution of honorary titles", "Honorary titles may be bestowed upon inanimate office objects for entertainment purposes. A stapler appointed Deputy Coordinator of Alignment does not gain managerial powers. A ruler appointed Head of Measurement remains exactly as long as before. These appointments carry no salary, benefits, duties, or real-world meaning. Visitors are not expected to address their belongings by these titles."],
    ["The retirement of obsolete footnotes", "Footnotes that no longer clarify anything may retire to a quiet paragraph at the end of the document. Retirement does not imply that the footnote ever clarified anything in the first place. A retired footnote may write a memoir, provided the memoir is also fictional. There is no obligation to read that memoir, fund its publication, or invite it to dinner."],
  ];
  const sections = Array.from({ length: worse ? 160 : 80 }, (_, index) => {
    const clause = index + 1;
    const [title, paragraph] = themes[index % themes.length];
    const fact = facts.find(item => item.clause === clause);
    return `<section class="terms-clause" id="museum-terms-clause-${clause}"><h4>Clause ${clause}. ${title}</h4><p>For the avoidance of entirely imaginary doubt, this clause is to be read alongside clause ${Math.max(1, clause - 3)} and any later clause that appears to disagree with it. All references to a participant mean a fictional participant in a fictional procedure. This text does not create a contract, collect consent for tracking, or require any real action.</p><p>${paragraph}</p>${fact ? `<p class="terms-buried-fact">${fact.sentence}</p>` : ""}<p>Administrative note ${clause}.1: an acknowledgment of this paragraph acknowledges only that the paragraph exists. It is not an endorsement of its length, usefulness, or relationship to the task you actually wanted to complete. Where an ambiguity remains, the imaginary committee recommends reading the same sentence again with a more bureaucratic expression. This recommendation is optional and deliberately unhelpful.</p></section>`;
  });
  return { sections, facts };
}
