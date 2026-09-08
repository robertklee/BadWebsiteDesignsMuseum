// Content & navigation: reading, browsing, and wayfinding exhibits.
import { createStageShell, createDemoStatus } from "./shared.js";

export const exhibits = [
  { id: "recipe", name: "The Recipe Odyssey", category: "Content", color: "green", tagline: "Two ingredients. Six compulsory quizzes.", description: "Prove you read the memoir before you're allowed to make toast.", lesson: "Toast should never be attempted without a full understanding of the author's childhood summers. The bread can wait.", fix: "The ingredients have been moved above the memoir. Breakfast may now proceed.", worseChange: "The memoir has a long memory, especially when you get an answer wrong.", preview: `<div class="preview-recipe"><span class="recipe-blog">a pinch of patience</span><strong>It all began<br>with my grandmother...</strong><div class="fake-lines"></div><div class="fake-lines short"></div><span class="recipe-distance">↓ Recipe: 6 quizzes away</span></div>`, render: renderRecipe },
  { id: "terms-game", name: "Terms & Conditions: The Game", category: "Content", color: "lilac", tagline: "You clicked “I read it.” Defend your thesis.", description: "An absurdly long agreement. Buried facts. A compulsory reading exam.", lesson: "By continuing, you confirm that you remember Clause 47 and its emotional arc. The oral defense has been postponed.", fix: "The agreement has become a short summary with two buttons and no final exam.", worseChange: "The fine print has expanded, and the exam is no longer feeling generous.", preview: `<div class="new-preview preview-terms"><span>JUST A FEW QUICK TERMS</span><strong>§ 74.2(b)</strong><div class="fake-lines"></div><div class="fake-lines"></div><small>There will be an exam.</small></div>`, render: renderTermsGame },
  { id: "horizontal", name: "The Horizontal Lifestyle", category: "Navigation", color: "yellow", tagline: "Your next section is somewhere to the right.", description: "A sideways website with vertical navigation and directionally confused arrows.", lesson: "The page has rejected the traditional concept of down. Your mouse wheel is invited to broaden its horizons.", fix: "Down once again means down. Navigation historians are calling it a classic.", worseChange: "Reverses the arrow buttons and the direction of vertical mouse-wheel scrolling.", preview: `<div class="new-preview preview-horizontal"><span>SCROLL DOWN TO GO RIGHT</span><div><b>01</b><b>02</b><b>03</b><i>→</i></div><small>This page took a wrong turn.</small></div>`, render: renderHorizontal },
  { id: "mystery-menu", name: "The Mystery Meat Menu", category: "Navigation", color: "blue", tagline: "Six icons. Zero useful clues.", description: "Find a shipping policy and a receipt behind meaningless symbols.", lesson: "Labels would spoil the surprise. Each icon is a tiny adventure with paperwork hidden at the end.", fix: "The icons now have names. Their mysterious era was brief but influential.", worseChange: "The icons refuse to stay loyal to any destination.", preview: `<div class="new-preview preview-mystery"><span>YOU KNOW WHAT THESE MEAN. RIGHT?</span><div>⌘ &nbsp; ◇ &nbsp; ✳<br>◌ &nbsp; ⧉ &nbsp; ⌁</div><small>Tooltip: “The other thing.”</small></div>`, render: renderMysteryMenu },
  { id: "retro", name: "The Retro Personal Homepage", category: "Nostalgia", color: "yellow", tagline: "The guestbook requires a typing license.", description: "A backwards keyboard and a very suspicious cat CAPTCHA.", lesson: "The early web had room for stars, counters, guestbooks, and at least one unexplained planet. It also had opinions about your vowels.", fix: "The personality survived. The guestbook has stopped fighting visitors.", worseChange: "The keyboard and cat inspection have both become less cooperative.", preview: `<div class="preview-retro"><span class="retro-stars">✦ &nbsp; ☆ &nbsp; ✧ &nbsp; ☆ &nbsp; ✦</span><strong>WELCOME TO<br>MY HOMEPAGE!</strong><span class="retro-globe">◎</span><span class="construction">🚧 UNDER CONSTRUCTION 🚧</span><span class="visitor">YOU ARE VISITOR 000042</span></div>`, render: renderRetro },
];

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
  const recitals = [
    clause => `For the avoidance of entirely imaginary doubt, this clause is to be read alongside clause ${Math.max(1, clause - 3)} and any later clause that appears to disagree with it. All references to a participant mean a fictional participant in a fictional procedure. This text does not create a contract, collect consent for tracking, or require any real action.`,
    clause => `Whereas clause ${Math.max(1, clause - 1)} may have raised a question nobody was asking, the parties hereby agree to raise two more. “Parties” includes anyone standing near a party, thinking about a party, or holding a napkin marked Party A. Attendance remains both unnecessary and insufficient.`,
    clause => `Subject to the provisions of subsection ${clause}.0(a), which has been omitted for tidiness, the following words shall carry their ordinary meanings except on alternate Tuesdays. Any Tuesday occurring on another weekday must be reported to the Calendar Liaison in triplicate and then politely ignored.`,
    clause => `This clause supersedes no fewer than zero prior arrangements and is subordinate to clause ${Math.min(worse ? 160 : 80, clause + 7)}, unless that clause is facing the other way. Headings are provided for confusion only. Singular nouns may travel in groups but must buy separate tickets.`,
    clause => `In consideration of the ceremonial sum of one hypothetical coin, receipt of which has been misplaced, the Committee records minute ${clause}-B. The minute lasted considerably longer than sixty seconds and ended without a decision, a biscuit, or evidence that it had begun.`,
    clause => `Without limiting the generality of the extremely specific nonsense below, this provision applies throughout the known filing cabinet. Drawers left ajar are deemed to be thinking. Drawers closed firmly are deemed to have declined to comment, subject always to the hinge's right of reply.`,
  ];
  const administrativeNotes = [
    clause => `Administrative note ${clause}.1: an acknowledgment of this paragraph acknowledges only that the paragraph exists. It is not an endorsement of its length, usefulness, or relationship to the task you actually wanted to complete. Where an ambiguity remains, the imaginary committee recommends reading the same sentence again with a more bureaucratic expression.`,
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
  const story = chapters.map(([title, text], index) => `<section class="story-chapter"><span>CHAPTER ${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p>${worse ? `<div class="recipe-ad">ADVERTISEMENT<br><strong>This space could have been the recipe.</strong><p>Instead, here's a thoughtful pause for a product that doesn't exist.</p></div><p>${text}</p>` : ""}</section>`).join("");
  stage.innerHTML = `<div class="recipe-demo"><div class="blog-masthead">a pinch of patience<span>FOOD. FAMILY. EXCESSIVE CONTEXT.</span></div><div class="recipe-intro"><span class="demo-kicker">THE SIMPLE THINGS</span><h2>The perfect buttered toast.</h2><p>By Olivia · 5 minute recipe · ${fixed ? "No expedition required" : "Recipe locked behind 6 mandatory reading-comprehension quizzes"}</p>${fixed ? "" : `<button class="plain-button" id="jump-recipe">Jump to recipe ↓</button><small>The exhibit's skip button lies. The museum's “Fix it” and Exit controls don't.</small>`}</div>${fixed ? `${recipe}<details class="optional-story"><summary>The story behind the toast (optional)</summary>${story}</details>` : `<div id="story-gate"></div>${status}`}</div>`;
  if (!fixed) {
    const gate = stage.querySelector("#story-gate");
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
    stage.querySelector("#jump-recipe").addEventListener("click", () => {
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
  }
  return () => {};
}

function renderTermsGame({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  const contract = buildMuseumTerms(worse);
  shell("CONSENT, NOW WITH A COMPREHENSION EXAM", fixed ? "Terms a human can actually read." : "Please read every exceedingly important word.",
    fixed ? "This is a fictional exhibit. Here is everything you actually need to know." : `This fictional agreement is long and hiding details you will need later. Reach the end, then pass an open-book exam.${worse ? " Hints are limited, and mistakes are expensive." : " You can correct mistakes as you go."} You may decline at any time.`,
    fixed ? `<div class="terms-summary"><h3>The actual summary</h3><ul><li>This is a pretend agreement for a design game, not a real contract.</li><li>Your answers stay in this page. Nothing is sent or stored.</li><li>You can decline or leave with no penalty.</li></ul><div class="new-actions"><button class="demo-button" id="terms-accept">Accept demo terms</button><button class="plain-button" id="terms-decline">Decline demo terms</button></div></div>` : `<div class="terms-document-meta"><span id="terms-word-count"></span><span>FICTIONAL · NON-BINDING · UNNECESSARILY LONG</span></div><article class="terms-document" id="terms-document" tabindex="0" aria-label="Full fictional terms and conditions"><h3>Agreement for the Provisional Use of Absolutely Nothing</h3><p>This entire document is a parody. It grants no rights, imposes no real obligations, and exists only to demonstrate an unnecessarily difficult interface. All named people, committees, objects, fees, and procedures are imaginary.</p>${contract.sections.join("")}<p class="terms-end">END OF AGREEMENT. The paperwork is over. The exam is not.</p></article><div class="terms-exam-actions"><p id="terms-reading-status" role="status">Scroll to the end of the document to unlock the reading exam. Keyboard users can focus the document and use End.</p><button class="demo-button" id="terms-start" disabled>Prove I read it</button><button class="plain-button" id="terms-decline">Decline demo terms</button></div><section class="terms-exam" id="terms-exam" aria-label="Reading comprehension exam" hidden></section>`);
  let ended = false;
  const accept = () => {
    ended = true;
    stage.querySelector("#terms-accept").disabled = true;
    stage.querySelector("#terms-decline").disabled = true;
    say(fixed ? "Demo terms accepted. No real agreement was created." : "Reading exam passed. Demo terms accepted. No real agreement was created.");
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
        : "The answer is somewhere in the document above. No clause number this time. Answers are case-insensitive.";
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
  return () => {};
}

function renderHorizontal({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
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
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  return () => {};
}

function renderMysteryMenu({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
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
    `<div class="mystery-task" id="mystery-task">0 / 2 tasks complete</div><nav class="mystery-nav" id="mystery-nav" aria-label="Demo website menu"></nav><section class="mystery-destination" id="mystery-destination" aria-live="polite"><h3>Where would you like to go?</h3><p>${fixed ? "Choose Shipping policy to begin." : "We removed the labels to make room for elegance. The elegance is now the only clue."}</p></section>`);
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
  stage.innerHTML = `<div class="retro-demo"><div class="retro-banner">${fixed ? "Alex's little corner of the internet" : "★ WELCOME TO ALEX'S HOMEPAGE!!! ★"}</div><p class="retro-subtitle">${fixed ? "Space enthusiast. Cat appreciator. Website owner since 1997." : "Best viewed with your eyes • 800 × 600 • Internet Explorer 4.0"}</p><div class="retro-layout"><aside class="retro-sidebar"><span>${fixed ? "Make yourself at home" : "COOL LINKS!!"}</span><a href="#retro-about">About me</a><a href="#retro-favorites">My favorite things</a><a href="#retro-guestbook">Sign my guestbook</a><div class="retro-planet" aria-hidden="true">🪐</div><span class="visitor-counter">VISITOR #000042</span></aside><div class="retro-content"><section id="retro-about"><h2>${fixed ? "Hi, I'm Alex." : "Hello, fellow net surfer!!!"}</h2><p>This is my little corner of cyberspace. I like space, cats, and making websites. This page has been almost finished for 29 years.</p></section><section id="retro-favorites"><h3>My favorite things</h3><p>✦ Saturn's rings &nbsp; ✦ My cat, Pixel &nbsp; ✦ The World Wide Web</p></section>${!fixed ? `<div class="construction-large">🚧 UNDER CONSTRUCTION 🚧</div>` : ""}${worse ? `<div class="retro-extra">AWARD-WINNING WEBSITE*<br><span>~*~ WEBMASTER'S CHOICE ~*~</span><small>*Awarded by the webmaster's cat.</small></div>` : ""}<form id="retro-guestbook"><label for="guest-name">Leave your mark in the guestbook</label><div class="guestbook-controls"><input id="guest-name" placeholder="Your nickname" required maxlength="40"><button class="demo-button">Sign guestbook</button></div><small>Just for fun. Entries disappear when you leave or reset.</small></form>${status}<div id="guest-entries"></div></div></div><div class="retro-bottom">${fixed ? "Made with enthusiasm. Updated when I remember." : "✉ Email the webmaster (telepathically) ✉ · © 1997 FOREVER"}</div></div>`;
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
      say("Your nickname was reversed. Backwards compatibility has been interpreted very literally.");
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
    captcha.innerHTML = `<legend>PROVE YOU ARE NOT A WEBMASTER</legend><p>Select every cat. Round ${captchaRound + 1} of ${worse ? "2" : "1"}.${worse ? " Tiles rearrange after EVERY selection." : ""}</p><div class="captcha-grid">${tiles.map((tile, index) => `<label class="captcha-tile"><input type="checkbox" value="${index}" aria-label="${tile.animal}, tile ${index + 1}"><span aria-hidden="true">${tile.icon}</span></label>`).join("")}</div><button class="demo-button" type="submit">Verify cats &amp; sign guestbook</button>`;
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
        say("Not so fast. Your nickname needs a cat inspection.");
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
