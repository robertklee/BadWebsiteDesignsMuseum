// Content & navigation: reading, browsing, and wayfinding exhibits.
import { createStageShell, createDemoStatus, completeExhibit, downloadDemoFile } from "./shared.js";

export const exhibits = [
  { id: "recipe", task: "Find the ingredients and method for buttered toast.", fixedTask: "Find the buttered-toast ingredients and method. They are available immediately.", name: "The Recipe Odyssey", category: "Content", color: "green", tagline: "Find a toast recipe. First, a little context.", description: "You need the ingredients and instructions for buttered toast. The food blog would like to start a little further back.", lesson: "You search for a quick recipe and find the author's entire family history first. This version goes further: it checks that you read the story before letting you reach two ingredients and a toaster.", fix: "The recipe comes first. The story is still there for anyone who wants to read it.", worseChange: "The blog is taking its family history even more seriously.", preview: `<div class="thumb-scene thumb-recipe"><span class="thumb-kicker">A PINCH OF PATIENCE</span><div class="thumb-toast-intro"><div class="thumb-toast" aria-hidden="true"><i></i></div><div><strong>Toast.</strong><span>2 ingredients.<br>A little backstory.</span></div></div><div class="thumb-recipe-gate"><span>BEFORE WE COOK</span><b>It began with Grandma.</b><small>First, a little context.</small></div></div>`, render: renderRecipe },
  { id: "terms-game", task: "Review the agreement and decide whether to accept it.", fixedTask: "Read the summary and choose Accept terms or Decline terms.", name: "Terms & Conditions: The Game", category: "Content", color: "lilac", tagline: "Of course you read them.", description: "The terms and conditions we all pretend to read. This website has its doubts.", lesson: "Most people recognize the checkbox saying they've read the terms and conditions. Here the website takes that claim literally and tests your memory. Signing up has become homework.", fix: "A short summary replaces the long document and exam. Accept or decline without a reading exam.", worseChange: "The committee has issued a revised agreement.", preview: `<div class="thumb-scene thumb-terms"><span class="thumb-kicker">BEFORE YOU CONTINUE</span><div class="thumb-terms-check">☑ I have read the terms</div><div class="thumb-exam"><span>TERMS / REVISION 4.2</span><strong>All read?<br>Lovely.</strong><div class="fake-lines"></div></div><small class="thumb-footer">We'll take your word for it. For now.</small></div>`, render: renderTermsGame },
  { id: "mystery-menu", task: "Find your receipt for an expense claim. Open Receipts and select Download receipt.", fixedTask: "Open Receipts and select Download receipt for your expense claim.", name: "The Mystery Meat Menu", category: "Navigation", color: "blue", tagline: "Find your receipt. The menu prefers pictures.", description: "Find your receipt using a website menu that would rather let its symbols do the talking than name its links.", lesson: "You've probably stared at an unfamiliar icon wondering what it does. This menu removes every label, so even finding and downloading an expense receipt becomes trial and error.", fix: "The menu shows clear destination names that stay in the same places, so you can find and download the receipt.", worseChange: "The menu is even less predictable. Your goal is still to download the receipt.", preview: `<div class="thumb-scene thumb-mystery"><span class="thumb-kicker">YOUR RECEIPT IS ONE OF THESE</span><div class="thumb-symbol-menu"><span>⌘</span><span>◇</span><span>✳</span><span>◌</span><span class="thumb-mystery-active">⧉</span><span>⌁</span></div><div class="thumb-useless-tooltip">The other thing.</div><small class="thumb-footer">Six icons. A small paperwork adventure.</small></div>`, render: renderMysteryMenu },
  { id: "retro", task: "Enter a made-up nickname and sign the guestbook.", fixedTask: "Enter a made-up nickname and select Sign guestbook.", name: "The Retro Personal Homepage", category: "Nostalgia", color: "yellow", tagline: "It's 1997. Everything is nearly working.", description: "Before social profiles, personal websites had guestbooks for visitors to sign. Leave a nickname on this blast from the past.", lesson: "Before social profiles, personal homepages often had a guestbook where visitors left a name or message. This one brings back the stars and visitor counters, then adds links and typing that fight back.", fix: "The nostalgic look stays, but links go where they say and the guestbook accepts ordinary typing.", worseChange: "The homepage has acquired a few more questionable upgrades.", preview: `<div class="thumb-scene thumb-retro"><span class="thumb-kicker">WELCOME TO MY HOMEPAGE!</span><div class="thumb-retro-site"><div class="thumb-retro-marquee">✦ SIGN MY GUESTBOOK ✦</div><span class="thumb-retro-intent">LEAVE YOUR NICKNAME</span><div class="thumb-retro-input"><span>NICKNAME</span><b>Alex<span>|</span></b></div><div class="thumb-retro-construction">UNDER CONSTRUCTION</div><span class="thumb-retro-counter">YOU ARE VISITOR 000042</span></div><small class="thumb-footer">Nearly working since 1997.</small></div>`, render: renderRetro },
];

function buildMuseumTerms(worse) {
  const facts = [
    { clause: 8, question: "Which animal is the official spokesperson?", answer: "capybara", sentence: "The official spokesperson for all ceremonial communications is a capybara." },
    { clause: 17, question: "On which weekday are emergency meetings held?", answer: "Thursday", sentence: "Emergency meetings are held on Thursday, regardless of when the emergency was invented." },
    { clause: 26, question: "What is the approved ink color?", answer: "aubergine", sentence: "The approved ink color for all official annotations is aubergine." },
    { clause: 35, question: "In what currency are ceremonial refunds issued?", answer: "paperclips", sentence: "Ceremonial refunds are issued exclusively in paperclips. Bent paperclips require a separate application." },
    { clause: 44, question: "How long is the ceremonial waiting period?", answer: "17 business naps", sentence: "The ceremonial waiting period is 17 business naps, which are not recognized units of time." },
    { clause: 53, question: "What is the committee's ceremonial passphrase?", answer: "waffle parliament", sentence: "The committee's ceremonial passphrase is waffle parliament. Please whisper it near the filing cabinet." },
    { clause: 62, question: "In which direction must the ceremonial spoon point?", answer: "north-northeast", sentence: "The ceremonial spoon must point north-northeast when placed on an imaginary table." },
    { clause: 74, question: "What is the name of the font auditor?", answer: "Professor Crumb", sentence: "The font auditor is Professor Crumb, whose findings are always submitted in an inappropriate font." },
    { clause: 82, question: "What sound announces a procedural alarm?", answer: "polite kazoo", sentence: "A procedural alarm is announced with a polite kazoo. Earplugs must be filed separately." },
    { clause: 101, question: "What is the record-retention ceiling?", answer: "42 imaginary minutes", sentence: "The record-retention ceiling is 42 imaginary minutes. The Records Office reserves the right to dispute when a minute begins." },
    { clause: 122, question: "Which archive box holds the ceremonial forms?", answer: "B-19", sentence: "Ceremonial forms are assigned to archive box B-19, which is currently awaiting permission to be a box." },
    { clause: 151, question: "What farewell phrase closes an official meeting?", answer: "cordially bewildered", sentence: "Every official meeting concludes with the farewell phrase cordially bewildered." },
  ].slice(0, worse ? 12 : 8);
  const themes = [
    ["The status of a chair", "A chair shall be considered provisionally seated upon only after the Committee for Sitting has acknowledged that a person may eventually contemplate sitting. Standing next to the chair does not constitute a reservation. Looking at the chair creates no entitlement to its cushion. The chair retains its inalienable right to remain furniture throughout these proceedings."],
    ["The emotional condition of stationery", "Stationery may be described as enthusiastic, reserved, or administratively overwhelmed. Such descriptions do not alter its physical properties or confer the ability to process requests. A pencil remains a pencil even when assigned a leadership role. Erasers may attend planning meetings but may not erase the meeting itself, its agenda, or the existence of a competing pencil."],
    ["The custody of biscuits", "Biscuits placed near a meeting shall be classified as discussion-adjacent provisions. Classification does not imply that a meeting must occur, that anyone must attend, or that the biscuit is edible. Crumbs are independent subsidiaries of the original biscuit for the purposes of this agreement. No participant is required to count, name, or negotiate with them."],
    ["The scheduling of unnecessary meetings", "A meeting to arrange a meeting shall not be confused with the meeting that is eventually arranged. Each may have a separate agenda describing the agenda of the other. If the two agendas become identical, a further meeting may be imagined to appreciate the coincidence. Invitations to either meeting must be discussed at a third meeting before being sent."],
    ["The direction of ambient enthusiasm", "Enthusiasm is expected to travel in a generally constructive direction without obstructing the administrative corridors. Participants may express moderate interest without submitting evidence of excitement. Excessive enthusiasm may be placed in a metaphorical drawer until the next ceremonial interval. The drawer's location is available upon completion of the Enthusiasm Location Request Form."],
    ["The classification of small clouds", "Clouds visible through a hypothetical window may resemble objects without acquiring their responsibilities. A cloud that resembles a teapot is not responsible for serving tea. A cloud that resembles a lawyer does not provide legal advice. Any resemblance between a cloud and a pending form shall be attributed to imagination rather than an outstanding administrative requirement."],
    ["The maintenance of corridors", "Corridors must remain open to authorized paperwork at all times. Participants wishing to stand in a corridor must first confirm that they are not obstructing a sentence. References to the end of a corridor indicate the end of a sentence unless the sentence continues. In that case, the corridor has been extended solely for the convenience of the writer."],
    ["The interpretation of decorative arrows", "An arrow printed beside a statement shall indicate a direction approved by the Directional Advisory Panel. Approval of a direction does not imply approval of a destination. Arrows wishing to point elsewhere must submit a request facing the currently approved direction. Requests pointing toward their own supporting documentation will be considered circular."],
    ["The storage of unused adjectives", "Adjectives not currently attached to a noun may wait in a temporary holding area. They may not describe themselves as essential merely to obtain priority placement. The words innovative, transformative, and seamless have been asked to remain seated until a concrete benefit can be identified. No adjective can claim ownership of a product, a person, or a reasonable expectation."],
    ["The ceremonial opening of envelopes", "An envelope may be ceremonially opened whether or not it contains a letter. The absence of a letter does not invalidate the opening ceremony, but it substantially reduces the amount of reading required afterward. Reopening an already open envelope is considered an advanced technique. It should not be attempted until the envelope has acknowledged its first opening in writing."],
    ["The distribution of honorary titles", "Honorary titles may be bestowed upon inanimate office objects following a brief nomination ceremony. A stapler appointed Deputy Coordinator of Alignment does not gain managerial powers. A ruler appointed Head of Measurement remains exactly as long as before. These appointments carry no salary, but do entitle the object to a prominently placed desk plaque. Promotions must be discussed out of earshot of the pencil sharpener."],
    ["The retirement of obsolete footnotes", "Footnotes that no longer clarify anything may retire to a quiet paragraph at the end of the document. Retirement does not imply that the footnote ever clarified anything in the first place. A retired footnote may write a memoir, provided the memoir includes footnotes. There is no obligation to read that memoir, fund its publication, or invite it to dinner."],
  ];
  const recitals = [
    clause => `For the avoidance of insufficiently administrative doubt, this clause is to be read alongside clause ${Math.max(1, clause - 3)} and any later clause that appears to disagree with it. All references to a participant include their designated deputy, stationery custodian, and anyone who accidentally attended the same meeting. Please refer unresolved doubts to the Subcommittee for Further Doubt.`,
    clause => `Whereas clause ${Math.max(1, clause - 1)} may have raised a question nobody was asking, the parties hereby agree to raise two more. “Parties” includes anyone standing near a party, thinking about a party, or holding a napkin marked Party A. Attendance remains both unnecessary and insufficient.`,
    clause => `Subject to the provisions of subsection ${clause}.0(a), which has been omitted for tidiness, the following words shall carry their ordinary meanings except on alternate Tuesdays. Any Tuesday occurring on another weekday must be reported to the Calendar Liaison in triplicate and then politely ignored.`,
    clause => `This clause supersedes no fewer than zero prior arrangements and is subordinate to clause ${Math.min(worse ? 160 : 80, clause + 7)}, unless that clause is facing the other way. Headings are provided for confusion only. Singular nouns may travel in groups but must buy separate tickets.`,
    clause => `In consideration of the ceremonial sum of one hypothetical coin, receipt of which has been misplaced, the Committee records minute ${clause}-B. The minute lasted considerably longer than sixty seconds and ended without a decision, a biscuit, or evidence that it had begun.`,
    clause => `Without limiting the generality of the extremely specific nonsense below, this provision applies throughout the known filing cabinet. Drawers left ajar are deemed to be thinking. Drawers closed firmly are deemed to have declined to comment, subject always to the hinge's right of reply.`,
  ];
  const administrativeNotes = [
    clause => `Administrative note ${clause}.1: an acknowledgment of this paragraph acknowledges only that the paragraph exists. Acknowledgments must be filed separately from notices acknowledging receipt of those acknowledgments. Where an ambiguity remains, the committee recommends reading the same sentence again with a more bureaucratic expression.`,
    clause => `Compliance memorandum ${clause}-Q: no compliance is requested, available, or measurable. Completed forms should be placed beneath an incomplete form so that both may learn from the experience. The Records Office is open whenever its sign says otherwise.`,
    clause => `Interpretive addendum ${clause}.purple: should this clause make sense, the reader must notify the Department of Accidental Clarity before understanding it further. Clarity will be wrapped in archival tissue, assigned a temporary surname, and returned within six to eight imaginary seasons.`,
    clause => `Procedural afterthought ${clause}: objections may be submitted verbally to an unattended coat rack. The coat rack is not authorized to respond, retain the objection, or wear a hat during business hours. Silence shall be treated as neither acceptance nor particularly good conversation.`,
    clause => `Form ${clause}-AND-A-HALF is incorporated here by reference despite having never been designed. Please complete boxes seven through custard using an approved writing gesture. Illegible answers will be enlarged until they become confidently illegible.`,
    clause => `Finality notice ${clause}.9: this is the definitive provisional draft of the temporary permanent guidance. It remains effective until replaced, forgotten, folded into a paper hat, or reviewed by the Subcommittee for Things That Seemed Important Before Lunch.`,
  ];
  const sections = Array.from({ length: worse ? 160 : 80 }, (_, index) => {
    const clause = index + 1;
    const [title, paragraph] = themes[index % themes.length];
    const fact = facts.find(item => item.clause === clause);
    const recital = recitals[index % recitals.length](clause);
    const administrativeNote = administrativeNotes[(index * 5 + Math.floor(index / themes.length)) % administrativeNotes.length](clause);
    return `<section class="terms-clause" id="museum-terms-clause-${clause}"><h4>Clause ${clause}. ${title}</h4><p>${recital}</p><p>${paragraph}</p>${fact ? `<p class="terms-buried-fact">${fact.sentence}</p>` : ""}<p>${administrativeNote}</p></section>`;
  });
  return { sections, facts };
}

function renderRecipe({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { status, say } = createDemoStatus();
  const recipe = `<section class="actual-recipe" id="actual-recipe" tabindex="-1"><span class="demo-kicker">YOU MADE IT. LET'S MAKE TOAST.</span><h3>Butter on toast</h3><div class="recipe-stats">2 ingredients <span>5 minutes</span> Serves 1</div><h4>Ingredients</h4><ul><li>1 slice of bread</li><li>1 teaspoon of butter</li></ul><h4>Method</h4><ol><li>Toast the bread until golden.</li><li>Spread the butter on it. Eat while warm.</li></ol></section>`;
  const chapters = [
    ["It all began with my grandmother.", "She was a remarkable woman. She owned a toaster. But before we get to that, you need to understand the village, the wind, and the particular shade of beige in her kitchen."],
    ["A brief history of the kitchen window.", "It faced east. Or perhaps west. We spent many summers debating this. The bread waited patiently, as bread is known to do. You're probably here for a recipe. We're getting there."],
    ["The summer we almost bought a spoon.", "Father said we already had a spoon. Mother said that wasn't the point. In many ways, that conversation shaped the person I am today. It did not, however, affect the toast."],
    ["What bread means to me.", "Some say bread is flour, water, and yeast. I say it's a journey. A journey that requires at least six paragraphs before mentioning that you should put it in a toaster."],
    ["A note on butter, and belonging.", "The butter was butter. But spiritually, it was so much more. It was a reminder that the simplest things in life can be made unnecessarily complicated by a food blog."],
    ["Before we begin, a few final thoughts.", "Thank you for being part of this community. Thank you for scrolling. Most of all, thank you for your commitment to finding a recipe that is, in fact, just butter on toast."],
  ];
  const story = chapters.map(([title, text], index) => `<section class="story-chapter"><span>CHAPTER ${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p>${worse ? `<div class="recipe-ad">ADVERTISEMENT<br><strong>This space could have been the recipe.</strong><p>Instead, here's a thoughtful pause for something you did not come here to buy.</p></div><p>${text}</p>` : ""}</section>`).join("");
  stage.innerHTML = `<div class="recipe-demo"><div class="blog-masthead">a pinch of patience<span>FOOD. FAMILY. EXCESSIVE CONTEXT.</span></div><div class="recipe-intro"><span class="demo-kicker">THE SIMPLE THINGS</span><h2>The perfect buttered toast.</h2><p>${fixed ? "The recipe is right below. Read the ingredients and method; the family story is optional." : "You need the ingredients and instructions for buttered toast. The food blog would like to start a little further back. Read the chapters and answer their questions to continue."}</p><p>By Olivia · 5 minute recipe · ${fixed ? "No expedition required" : "A little background before breakfast"}</p>${fixed ? "" : `<button class="plain-button" id="jump-recipe">Jump to recipe ↓</button><small>The blog has its own ideas. The museum's “Fix it” and Exit controls always work.</small>`}</div>${fixed ? `${recipe}<details class="optional-story"><summary>The story behind the toast (optional)</summary>${story}</details>` : `<div id="story-gate"></div>${status}`}</div>`;
  if (!fixed) {
    const gate = stage.querySelector("#story-gate");
    const jump = stage.querySelector("#jump-recipe");
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
        jump.nextElementSibling.textContent = "Recipe unlocked. The shortcut finally tells the truth.";
        gate.querySelector("#actual-recipe").focus();
        say("Six quizzes later: put butter on toast. That was the entire recipe.");
        stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
        return;
      }
      const quiz = quizzes[chapter];
      gate.innerHTML = `<div class="reading-progress">RECIPE ACCESS: ${chapter} / 6 CHAPTERS APPROVED</div><section class="story-chapter"><span>MANDATORY CHAPTER ${chapter + 1}</span><h3>${chapters[chapter][0]}</h3><p>${chapters[chapter][1]}</p>${worse ? `<div class="recipe-ad">SPONSORED INTERRUPTION<strong>This could have been the recipe.</strong></div>` : ""}<form class="reading-quiz"><label for="reading-answer">${quiz.question}</label><select id="reading-answer" required><option value="">Prove you read it</option>${shuffle(quiz.options).map(option => `<option>${option}</option>`).join("")}</select>${worse ? `<label class="obstacle-check"><input type="checkbox" required> I certify that this paragraph changed my relationship with toast.</label>` : ""}<button class="demo-button">Unlock the next paragraph →</button><small>${worse ? "Wrong answer? Back to chapter one." : "The recipe is not accessible until every quiz is passed."}</small></form></section>`;
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
    jump.addEventListener("click", () => {
      if (chapter === chapters.length) {
        gate.querySelector("#actual-recipe").focus();
        return;
      }
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
  } else completeExhibit(stage, "Recipe ready: one slice of bread, one teaspoon of butter. Toast the bread, then spread the butter. The family story is optional.");
  return () => {};
}

function renderTermsGame({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  const contract = buildMuseumTerms(worse);
  shell("TERMS / REVISION 4.2", "Terms & conditions.",
    fixed ? "Review the terms summary below." : "Please review the agreement before continuing. We appreciate your customary thoroughness.",
    fixed ? `<div class="terms-summary"><h3>Summary</h3><ul><li>The official spokesperson is a capybara.</li><li>Emergency meetings take place on Thursday.</li><li>Ceremonial refunds are issued in paperclips.</li></ul><div class="new-actions"><button class="demo-button" id="terms-accept">Accept terms</button><button class="plain-button" id="terms-decline">Decline terms</button></div></div>` : `<div class="terms-document-meta"><span id="terms-word-count"></span><span>${contract.sections.length} CLAUSES · REVISION 4.2</span></div><article class="terms-document" id="terms-document" tabindex="0" aria-label="Full terms and conditions"><h3>Agreement for the Provisional Use of Absolutely Nothing</h3><p>These terms govern the provisional use of absolutely nothing. Please consult every clause before forming an opinion. Opinions submitted prematurely will be returned for additional consideration.</p>${contract.sections.join("")}<p class="terms-end">END OF AGREEMENT.</p></article><div class="terms-exam-actions"><p id="terms-reading-status" role="status">Read to the end to continue. Keyboard: focus the document and press End.</p><button class="demo-button" id="terms-start" disabled>I have read the terms</button><button class="plain-button" id="terms-decline">Decline terms</button></div><section class="terms-exam" id="terms-exam" aria-label="Reading verification" hidden></section>`);
  let ended = false;
  const accept = () => {
    ended = true;
    stage.querySelector("#terms-accept").disabled = true;
    stage.querySelector("#terms-decline").disabled = true;
    say(fixed ? "Terms accepted." : "Terms accepted. The committee is impressed.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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
    say("Terms declined. The committee will have to cope.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  if (fixed) {
    stage.querySelector("#terms-accept").addEventListener("click", accept);
  } else {
    const documentPanel = stage.querySelector("#terms-document");
    const start = stage.querySelector("#terms-start");
    const exam = stage.querySelector("#terms-exam");
    const wordCount = documentPanel.textContent.trim().split(/\s+/).length;
    stage.querySelector("#terms-word-count").textContent = `${wordCount.toLocaleString("en-US")} words · ${Math.ceil(wordCount / 220)} min read`;
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
        stage.querySelector("#terms-reading-status").textContent = "End of agreement reached.";
      }
    };
    documentPanel.addEventListener("scroll", checkScroll);
    const renderQuestion = () => {
      if (question === questions.length) {
        exam.innerHTML = `<h3>Review complete.</h3><p>${questions.length} answers recorded.</p><button class="demo-button" id="terms-accept">Accept terms</button>`;
        exam.querySelector("#terms-accept").addEventListener("click", accept);
        exam.querySelector("button").focus();
        return;
      }
      const fact = questions[question];
      const clauseHelp = () => !worse || hintedClauses.has(fact.clause)
        ? `Refer to clause ${fact.clause}. Answers are case-insensitive.`
        : "Refer to the agreement above. Answers are case-insensitive.";
      exam.innerHTML = `<span class="demo-kicker">QUESTION ${question + 1} / ${questions.length}${worse ? "" : ` · CLAUSE ${fact.clause}`}</span><h3>${fact.question}</h3><p id="terms-clause-help" role="status">${clauseHelp()}</p>${worse ? '<div class="new-actions"><button type="button" class="plain-button" id="terms-hint"></button></div>' : ""}<form id="terms-answer-form"><label for="terms-answer">Your answer</label><input id="terms-answer" type="text" maxlength="100" required autocomplete="off"><button class="demo-button">Submit answer</button></form>`;
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
        say(question === questions.length ? "Review complete." : `${question} / ${questions.length} answers recorded.`);
      });
      exam.querySelector("input").focus();
    };
    start.addEventListener("click", () => {
      start.disabled = true;
      exam.hidden = false;
      renderQuestion();
    });
  }
  return () => {};
}

function renderMysteryMenu({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  const destinations = [
    { id: "home", name: "Home", description: "Welcome to a site that considers words an unnecessary navigation expense." },
    { id: "shipping", name: "Shipping policy", description: "Orders travel by carrier pigeon. Allow three business days, plus any time spent admiring a statue." },
    { id: "offers", name: "Special offers", description: "Today's offer: ten percent more navigation confusion. The offer expires whenever you find the right page." },
    { id: "receipts", name: "Receipts", description: "Your receipt is ready. Select Download receipt to collect it." },
    { id: "settings", name: "Settings", description: "Your settings are set to mysterious. This is not a configurable preference." },
    { id: "help", name: "Help", description: "To find something, click the icon that leads to it. We hope this comprehensive advice helps." },
  ];
  const symbols = ["⌘", "◇", "✳", "◌", "⧉", "⌁"];
  let mapping = fixed ? [...destinations] : shuffle(destinations);
  let progress = 0;
  let clicks = 0;
  shell("NAVIGATION BY PURE INTUITION", fixed ? "A menu with actual names." : "What could these possibly mean?",
    `You need your receipt for an expense claim.${fixed ? " The menu names each page: open Receipts, then select Download receipt." : " Website menus usually tell you where each link goes. This one would rather let its symbols do the talking. Explore the icons to find Receipts, then select Download receipt."}`,
    `<div class="mystery-task" id="mystery-task">Receipt not yet downloaded</div><nav class="mystery-nav" id="mystery-nav" aria-label="Website menu"></nav><section class="mystery-destination" id="mystery-destination" aria-live="polite"><h3>Where would you like to go?</h3><p>${fixed ? "Open Receipts to find your expense-claim document." : "We removed the labels to make room for elegance. The elegance is now the only clue."}</p></section>`);
  const menu = stage.querySelector("#mystery-nav");
  const panel = stage.querySelector("#mystery-destination");
  const updateProgress = () => {
    stage.querySelector("#mystery-task").textContent = `${progress ? "Receipt downloaded" : "Receipt not yet downloaded"} · ${clicks} navigation clicks`;
  };
  const open = destination => {
    clicks++;
    panel.innerHTML = `<span class="demo-kicker">YOU FOUND: ${destination.name.toUpperCase()}</span><h3>${destination.name}</h3><p>${destination.description}</p>`;
    if (destination.id === "receipts") {
      panel.insertAdjacentHTML("beforeend", `<button class="demo-button" id="mystery-receipt">Download receipt</button><p id="mystery-receipt-text"></p>`);
      panel.querySelector("button").addEventListener("click", () => {
        const receipt = "RECEIPT DEMO-0001\n1 imaginary delivery\nTotal: $0.00\nNot valid for a real expense claim. No order was placed.";
        downloadDemoFile("museum-demo-receipt.txt", receipt);
        panel.querySelector("#mystery-receipt-text").textContent = receipt;
        if (progress) return;
        progress = 1;
        updateProgress();
        say("Receipt downloaded. The paperwork was easier to find than the menu was to read.");
        stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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
  return () => {};
}

function renderRetro({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { status, say } = createDemoStatus();
  stage.innerHTML = `<div class="retro-demo"><div class="retro-banner">${fixed ? "Alex's little corner of the internet" : "★ WELCOME TO ALEX'S HOMEPAGE!!! ★"}</div><p class="retro-subtitle">${fixed ? "A guestbook is where visitors to a personal homepage leave a name or message. Enter a made-up nickname and sign this one." : "Before social profiles, personal homepages had guestbooks where visitors left a name or message. Try signing this one with a made-up nickname. It is 1997, and everything is nearly working."}</p><p class="retro-subtitle">${fixed ? "Space enthusiast. Cat appreciator. Website owner since 1997." : "Best viewed with your eyes • 800 × 600 • Internet Explorer 4.0"}</p><div class="retro-layout"><aside class="retro-sidebar"><span>${fixed ? "Make yourself at home" : "COOL LINKS!!"}</span><a href="#retro-about">About me</a><a href="#retro-favorites">My favorite things</a><a href="#retro-guestbook">Sign my guestbook</a><div class="retro-planet" aria-hidden="true">🪐</div><span class="visitor-counter">VISITOR #000042</span></aside><div class="retro-content"><section id="retro-about"><h2>${fixed ? "Hi, I'm Alex." : "Hello, fellow net surfer!!!"}</h2><p>This is my little corner of cyberspace. I like space, cats, and making websites. This page has been almost finished for 29 years.</p></section><section id="retro-favorites"><h3>My favorite things</h3><p>✦ Saturn's rings &nbsp; ✦ My cat, Pixel &nbsp; ✦ The World Wide Web</p></section>${!fixed ? `<div class="construction-large">🚧 UNDER CONSTRUCTION 🚧</div>` : ""}${worse ? `<div class="retro-extra">AWARD-WINNING WEBSITE*<br><span>~*~ WEBMASTER'S CHOICE ~*~</span><small>*Awarded by the webmaster's cat.</small></div>` : ""}<form id="retro-guestbook"><label for="guest-name">Leave your mark in the guestbook</label><div class="guestbook-controls"><input id="guest-name" placeholder="Your nickname" required maxlength="40"><button class="demo-button">Sign guestbook</button></div><small>Pixel the cat reads every entry. Eventually.</small></form>${status}<div id="guest-entries"></div></div></div><div class="retro-bottom">${fixed ? "Made with enthusiasm. Updated when I remember." : "✉ Email the webmaster (telepathically) ✉ · © 1997 FOREVER"}</div></div>`;
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
      say("Your nickname was reversed after that edit. Apparently typing it once was too convenient.");
    });
    guestForm.append(captcha);
  }
  const renderCaptcha = () => {
    tiles = shuffle([
      { animal: "Cat", icon: "🐈" }, { animal: "Cat", icon: "🐱" }, { animal: "Dog", icon: "🐕" },
      { animal: "Cat", icon: "😺" }, { animal: "Fox", icon: "🦊" }, { animal: "Cat", icon: "😸" },
      { animal: "Dog", icon: "🐶" }, { animal: "Cat", icon: "😹" }, { animal: "Fox", icon: "🦊" },
    ]);
    captcha.hidden = false;
    captcha.innerHTML = `<legend>HUMAN CHECK / SELECT THE CATS</legend><p>Select every cat. Round ${captchaRound + 1} of ${worse ? "2" : "1"}.${worse ? " Tiles rearrange after EVERY selection." : ""}</p><div class="captcha-grid">${tiles.map((tile, index) => `<label class="captcha-tile"><input type="checkbox" value="${index}" aria-label="${tile.animal}, tile ${index + 1}"><span aria-hidden="true">${tile.icon}</span></label>`).join("")}</div><button class="demo-button" type="submit">Verify cats &amp; sign guestbook</button>`;
    if (worse) {
      captcha.querySelectorAll("input").forEach(input => input.addEventListener("change", () => {
        const grid = captcha.querySelector(".captcha-grid");
        shuffle([...grid.children]).forEach(tile => grid.append(tile));
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
        say("Before signing, complete the CAPTCHA: select every cat picture to pass the human check.");
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
  return () => {};
}
