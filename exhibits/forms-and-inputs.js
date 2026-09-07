// Forms & inputs: text entry, dial, dropdown, and puzzle-style controls.
import { createStageShell, createDemoStatus } from "./shared.js";

export const exhibits = [
  { id: "dropdown", name: "The Character Bureaucracy", category: "Forms", color: "pink", tagline: "Every letter needs a permit.", description: "Tune a precision dial. File the paperwork. Earn one character.", lesson: "One letter is a serious administrative event. Please allow three to five stamps for processing.", fix: "The paperwork was archived. A text box is now handling the letters.", worseChange: "Requires five approval stamps, changes frequency offsets, destroys incorrect permits, and makes Undo remove two characters.", preview: `<div class="preview-dropdown"><span class="form-label">Apply for one letter.</span><div class="preview-dial">H <small>2496 Hz</small><div>━━━━●━━━━</div></div><span class="permit-stamp">APPROVAL PENDING</span><span class="dropdown-note">now file the paperwork.</span></div>`, render: renderDropdown },
  { id: "word-editor", name: "The Dropdown Word Processor", category: "Forms", color: "orange", tagline: "A whole document. One dropdown per character.", description: "Write, edit, and regret every letter you select from a menu.", lesson: "Typing was alarmingly efficient, so every character now gets its own tiny meeting. Minutes will be distributed one letter at a time.", fix: "The keyboard has been reinstated and is eager to put this behind it.", worseChange: "Reshuffles every character menu after each edit.", preview: `<div class="preview-word-editor"><span>UNTITLED DOCUMENT</span><div class="preview-word-toolbar">File &nbsp; Edit &nbsp; Suffer</div><strong><span>H ⌄</span><span>e ⌄</span><span>l ⌄</span><span>l ⌄</span><span>o ⌄</span></strong><div class="fake-lines"></div><small>5 letters. 5 dropdowns.</small></div>`, render: renderWordEditor },
  { id: "alphabet", name: "The Alphabet Shuffle", category: "Forms", color: "pink", tagline: "A slider with no alphabetic loyalties.", description: "Find a letter. Add it. The entire slider order changes.", lesson: "The alphabet has entered its experimental phase. Familiar order was rejected as creatively limiting.", fix: "The letters have returned to their assigned seats, and the keyboard handles introductions.", worseChange: "Also reshuffles the alphabet whenever you commit a slider adjustment.", preview: `<div class="new-preview preview-alphabet"><span>THE ALPHABET, RECONSIDERED</span><strong>Q &nbsp; A &nbsp; Z &nbsp; ?</strong><div class="preview-track"><i></i></div><small>Same slider. New alphabet.</small></div>`, render: renderAlphabet },
  { id: "phone", name: "The Phone Number Casino", category: "Forms", color: "orange", tagline: "Your number is somewhere in these odds.", description: "Roll each digit. Lock it. Hope the next roll respects it.", lesson: "Your phone number is in there somewhere. The house remains confident that persistence is statistically similar to typing.", fix: "The reels are closed. The whole number can now be entered without placing a bet.", worseChange: "Rerolls and unlocks the digit immediately to the left after each roll.", preview: `<div class="new-preview preview-phone"><span>PLEASE GAMBLE YOUR NUMBER</span><div class="preview-reels"><b>5</b><b>?</b><b>3</b></div><small>Roll. Lock. Regret. ↻</small></div>`, render: renderPhone },
  { id: "calendar", name: "The Calendar Treadmill", category: "Forms", color: "blue", tagline: "A date picker with no sense of direction.", description: "Book an appointment, one painfully small calendar step at a time.", lesson: "Every journey begins with a single day. Unfortunately, this one also continues with several thousand more.", fix: "The calendar now permits dates to be selected before everyone involved grows older.", worseChange: "Makes Forward alternate between jumping seven days ahead and moving six days back.", preview: `<div class="new-preview preview-calendar"><span>JANUARY 2000</span><strong>01</strong><small>← Yesterday &nbsp; Tomorrow? →</small><i>Appointment: January 12</i></div>`, render: renderCalendar },
  { id: "cookies", name: "The Cookie Switchboard", category: "Forms", color: "yellow", tagline: "Your preferences. Our creative interpretation.", description: "Turn one cookie off. Watch another turn on. Try to reject them all.", lesson: "The switches are a close-knit community and refuse to make decisions alone. Your preferences have been noted as a group suggestion.", fix: "Each switch has agreed to mind its own business.", worseChange: "Flips three switches per click and reverses what their labels mean.", preview: `<div class="new-preview preview-cookies"><span>WE RESPECT YOUR CHOICES*</span><div><b>Analytics</b><i>ON</i></div><div><b>Marketing</b><i>OFF?</i></div><small>*Not independently.</small></div>`, render: renderCookies },
  { id: "unix-birthday", name: "The Unix Birthday Picker", category: "Forms", color: "green", tagline: "Happy 631152000000 to you.", description: "Slide through milliseconds since 1970. Snap your birthday to midnight.", lesson: "Birthdays are more festive when expressed as very large integers. Candles may be counted from the Unix epoch.", fix: "The computer keeps the milliseconds to itself and shows everyone else a date.", worseChange: "Removes the slider and midnight helper, leaving one raw millisecond timestamp field.", preview: `<div class="new-preview preview-unix"><span>WHEN WERE YOU BORN?</span><strong>631152000000</strong><small>January 1, 1990. In computer.</small><div>YYYY? MM? NO. MILLISECONDS.</div></div>`, render: renderUnixBirthday },
  { id: "password-gym", name: "The Password Gym", category: "Forms", color: "orange", tagline: "Twenty rules. Or thirty-two and no way out.", description: "Rules unlock as you type. Worse mode eventually contradicts itself.", lesson: "Your password is almost strong enough to lift a car. It only needs a color, an apology, the moon, and several incompatible beliefs.", fix: "The password field now asks for length instead of a complete personality.", worseChange: "Expands to 32 rules and ends with a rule that contradicts the earlier requirements.", preview: `<div class="new-preview preview-password"><span>RULE 8 OF ALMOST FINISHED</span><strong>••••••••</strong><div>✓ Has a number<br>✕ Has not apologized</div><small>Try adding “sorry.” Seriously.</small></div>`, render: renderPasswordGym },
  { id: "cat-captcha", name: "The CAT-PCHA", category: "Forms", color: "yellow", tagline: "Prove you're human. Be a mouse.", description: "Collect the cheese and escape a hunting cat to pass a pretend CAPTCHA.", lesson: "Humanity is best demonstrated by rodent strategy under feline pressure. The cheese is part of the standard verification process.", fix: "The cat has been reassigned. A checkbox now handles the investigation.", worseChange: "Six cheeses, two-step cat sprints every eighth turn, and a rejected first exit: pay a seventh cheese at the top left, then reach the relocated top-right hole. Cheese pickups distract the cat for one turn.", preview: `<div class="new-preview preview-cat"><span>PROVE YOU ARE NOT A ROBOT</span><strong>🐈 &nbsp; 🐭</strong><div>FIRST, BE A RODENT.</div><small>Verification requires cheese.</small></div>`, render: renderCatCaptcha },
  { id: "checkbox-ecosystem", name: "The Checkbox Ecosystem", category: "Forms", color: "green", tagline: "Your preferences require watering.", description: "Feed your checked boxes before they wilt, wander, and uncheck themselves.", lesson: "Preferences are living things and cannot survive on clicks alone. Please provide regular snacks and adequate roaming space.", fix: "The checkboxes are now inanimate and appear to be thriving.", worseChange: "Drains health faster and creates a checked offspring box after every third feeding.", preview: `<div class="new-preview preview-ecosystem"><span>PREFERENCES ARE LIVING THINGS</span><strong>🌱 ☑ 🌱</strong><div>Analytics needs watering.</div><small>Your dark mode is wilting.</small></div>`, render: renderCheckboxEcosystem },
  { id: "elevator-date", name: "The Elevator Date Picker", category: "Forms", color: "lilac", tagline: "Your date is on another floor.", description: "Ride between years, then transfer to month and day elevators.", lesson: "Your birthday is waiting on another floor. Service to February may require a transfer and sensible shoes.", fix: "The elevators were replaced with a calendar. Travel time is now negligible.", worseChange: "Skips three floors per departure unless you request a stop.", preview: `<div class="new-preview preview-elevator"><span>PLEASE MIND THE DATE GAP</span><strong>↑ 1992 ↓</strong><div>MONTHS: CHANGE AT LOBBY</div><small>Express service skips your birthday.</small></div>`, render: renderElevatorDate },
  { id: "password-crane", category: "Forms", color: "lilac", name: "The Password Crane Game", tagline: "Your next character is just out of reach.", description: "Steer a claw across all 128 ASCII characters to construct a fictional password.", lesson: "Secure characters must be won through dexterity. Control codes are stored beside the plush toys for convenience.", fix: "The crane was retired. A normal field now accepts invented passwords without tokens.", worseChange: "Grabs the next ASCII character instead of the selected one on every third attempt.", preview: '<div class="new-preview arcade-preview-crane"><span>PLEASE GRAB YOUR PASSWORD</span><strong>┬<br>⋔</strong><div><b>A</b><b>a</b><b>9</b><b>!</b></div><small>One claw. 128 characters. No dignity.</small></div>', render: renderPasswordCrane },
  { id: "email-auction", category: "Forms", color: "orange", name: "The Email Address Auction", tagline: "Going once. Going twice. Going @.", description: "Bid for letters, digits, and symbols, then assemble any email from your winnings.", lesson: "The market opened strong on vowels, while the @ remains a premium asset. Analysts recommend holding at least two lowercase e's.", fix: "The exchange has closed. Email addresses may now be typed at face value.", worseChange: "Raises reserve prices, adds two rival bids to every lot, and gives @ a third rival.", preview: '<div class="new-preview preview-auction"><span>LOT 06: ONE VERY RARE SYMBOL</span><strong>@</strong><div>CURRENT BID: 12 FAKE COINS</div><small>Vowels attract competitive interest.</small></div>', render: renderEmailAuction },
  { id: "address-jigsaw", category: "Forms", color: "yellow", name: "The Address Jigsaw", tagline: "Some assembly required. Including your street.", description: "Reassemble a fictional address from scattered puzzle pieces.", lesson: "Your postcode was last seen beneath the sofa. The apartment number may have joined a different address.", fix: "The pieces were glued together into one surprisingly useful address field.", worseChange: "Adds four decoy pieces and reshuffles the unused tray after every edit.", preview: '<div class="new-preview preview-jigsaw"><span>DELIVERY REQUIRES ASSEMBLY</span><div><b>Lane,</b><b>42</b><b>Waffle</b></div><small>Your postcode is under the sofa.</small></div>', render: renderAddressJigsaw },
  { id: "expanding-form", category: "Forms", color: "lilac", name: "The Expanding Form", tagline: "Every answer creates more distance.", description: "Typing pushes the next field farther away. Long answers fold the form.", lesson: "Thank you for your detailed answer. The next question has moved somewhere quieter to process it.", fix: "The fields have reconciled and are once again willing to stand near each other.", worseChange: "Makes every gap grow faster, triples the distance caps, and folds longer answers.", preview: '<div class="new-preview preview-expanding"><span>JUST ONE MORE QUICK QUESTION</span><div>Name: ______</div><strong>↕</strong><div>Next field: somewhere below.</div></div>', render: renderExpandingForm },
  { id: "correcting-search", category: "Forms", color: "pink", name: "The Self-Correcting Search Bar", tagline: "We know what you meant. Unfortunately.", description: "Your query keeps becoming something else. Defend your original words.", lesson: "The search bar knows what you meant because it briefly considered what you typed. Appeals must include a short explanation.", fix: "The search bar has agreed to search for the words it was given.", worseChange: "Requires five rejected corrections instead of three, plus an explanation for every rejection.", preview: '<div class="new-preview preview-correcting"><span>HELPFULLY REWRITING YOUR INTENT</span><s>quiet cafes</s><strong>quiet cages</strong><small>Obviously you wanted bird supplies.</small></div>', render: renderCorrectingSearch },
];

// Real dictionary words selected as plausible but unhelpful alternatives to common search terms.
// Nouns are stored in base form; the stemmer pluralises them on demand. Verbs and adjectives are 
// kept separate so that only they get -ing, -ed, or -est.
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

// A comparative ending requires a valid adjective stem. For example, "dapper" must not be parsed
// as "dap" plus a suffix, which would produce invalid forms such as "dappest".
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
  let scannedWords = 0;
  for (const match of query.matchAll(/\p{L}+/gu)) {
    if (scannedWords++ >= 10) break;
    const original = match[0];
    const word = original.toLowerCase();
    if (!/^[a-z]+$/.test(word)) continue;
    const maxDistance = correctionBudget(word.length);
    const { stem: wordStem, suffix: wordSuffix } = correctionStem(word);
    // Stems are shorter than the words they came from, so they get a slightly roomier budget
    // than a raw comparison would allow, but never more than the whole word is worth.
    const stemBudget = Math.min(maxDistance, correctionBudget(wordStem.length) + 1);
    // Only verbs may answer an -ing query and only adjectives may answer an -est one, so
    // restrict inflected matches by part of speech so suggestions remain real words even when
    // their meaning is deliberately unhelpful.
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
      choices.push({ query: changed, index: match.index, original, replacement: cased, distance: correctionDistance(word, replacement), viaStem, rank });
    };
    correctionWords.forEach((candidate, candidateIndex) => {
      if (candidate === word) return;
      const candidateStem = correctionStems[candidateIndex];
      // Exclude candidates that reduce to the same stem, such as "results" and "result".
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
  const start = groups.length ? Math.floor(Math.random() * groups.length) : 0;
  for (let rank = 0; selected.length < limit && groups.some(group => rank < group.length); rank++) {
    for (let offset = 0; offset < groups.length; offset++) {
      const group = groups[(start + offset) % groups.length];
      if (group[rank]) selected.push(group[rank]);
      if (selected.length === limit) break;
    }
  }
  return selected.map(({ rank, ...choice }) => choice);
}

function renderDropdown({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { status, say } = createDemoStatus();
  stage.innerHTML = `<div class="form-demo"><span class="demo-kicker">DEPARTMENT OF INDIVIDUAL CHARACTER APPROVAL</span><h2>${fixed ? "Tell us something." : "Apply for one letter."}</h2><p>${fixed ? "A message should take seconds, not geological eras." : `Find a character's frequency. Tune to the exact integer. Lock it. Obtain ${worse ? "five" : "three"} approvals in the specified order. Repeat for every letter, space, and punctuation mark.`}</p><form id="message-form">${fixed ? "" : `<div id="character-machine" class="character-machine"><span class="demo-kicker">01 / TUNE YOUR CHARACTER</span><details class="frequency-directory"><summary>Character frequency directory (not clickable, naturally)</summary><div id="frequency-directory"></div></details><label for="letter-dial">Character tuner: 0–9999 Hz</label><input id="letter-dial" type="range" min="0" max="9999" step="1" value="5000" aria-describedby="tuner-help"><div class="dial-readout"><strong id="tuned-letter">?</strong><output id="frequency-value" for="letter-dial">5000 Hz</output><span id="signal-quality"></span></div><p id="tuner-help">Drag to get close. Use arrow keys or the ±1 buttons for precision. Only the exact frequency is accepted.</p><div class="letter-controls"><button type="button" class="plain-button" id="dial-down" aria-label="Decrease frequency by one">−1 Hz</button><button type="button" class="plain-button" id="dial-up" aria-label="Increase frequency by one">+1 Hz</button><button type="button" class="demo-button" id="lock-letter">Lock character</button></div><div id="character-permit" hidden></div></div>`}<label for="message">${fixed ? "Your message" : "Your painstakingly assembled message"}</label><textarea id="message" maxlength="280" ${fixed ? "required" : "readonly"} placeholder="${fixed ? "Type something nice. Or constructive." : "The empty page awaits its first approved character."}"></textarea><div class="form-bottom"><span id="letter-count">0 / 280 characters</span>${!fixed ? `<button type="button" class="plain-button" id="undo-letter">${worse ? "Undo (deletes TWO)" : "Undo"}</button>` : ""}<button class="demo-button" type="submit">Send message →</button></div></form>${status}<small>${!fixed ? `The alphabet is reshuffled after every character.${worse ? " Frequencies change too. Incorrect paperwork destroys the permit." : ""}<br>` : ""}Demo only. Your message is never sent or saved.</small></div>`;
  const message = stage.querySelector("#message");
  const update = () => { stage.querySelector("#letter-count").textContent = `${message.value.length} / 280 characters`; };
  message.addEventListener("input", update);
  if (!fixed) {
    const dial = stage.querySelector("#letter-dial");
    const permit = stage.querySelector("#character-permit");
    const lock = stage.querySelector("#lock-letter");
    let frequencies = [];
    let selected = null;
    let locked = null;
    let approvals = [];
    let approved = 0;
    const label = letter => letter === " " ? "[space]" : letter;
    const tune = () => {
      const value = Number(dial.value);
      selected = frequencies.find(item => item.frequency === value) || null;
      const nearest = frequencies.reduce((best, item) => Math.abs(item.frequency - value) < Math.abs(best.frequency - value) ? item : best);
      stage.querySelector("#tuned-letter").textContent = selected ? label(selected.letter) : "≈ " + label(nearest.letter);
      stage.querySelector("#frequency-value").textContent = `${value} Hz`;
      stage.querySelector("#signal-quality").textContent = selected ? "SIGNAL LOCKED. Now request a permit." : `${Math.abs(nearest.frequency - value)} Hz away from ${label(nearest.letter)}. Not acceptable.`;
      dial.setAttribute("aria-valuetext", `${value} hertz. ${selected ? label(selected.letter) : "No exact character"}`);
      lock.disabled = !selected || locked !== null;
    };
    const scramble = () => {
      const offset = worse ? 20 + Math.floor(Math.random() * 280) : 137;
      frequencies = shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ .!").map((letter, index) => ({ letter, frequency: offset + index * 337 }));
      stage.querySelector("#frequency-directory").textContent = frequencies.map(item => `${label(item.letter)} = ${item.frequency}`).join("   /   ");
      dial.value = "5000";
      locked = null;
      permit.hidden = true;
      dial.disabled = false;
      stage.querySelector("#dial-down").disabled = false;
      stage.querySelector("#dial-up").disabled = false;
      tune();
    };
    const renderPermit = () => {
      permit.hidden = false;
      permit.innerHTML = `<span class="demo-kicker">02 / CHARACTER PERMIT: ${label(locked)}</span><p>Obtain stamps in this order: <strong>${approvals.join(" → ")}</strong></p><p>${approved} / ${approvals.length} approvals. A wrong stamp ${worse ? "destroys this permit" : "resets all approvals"}.</p><div class="permit-stamps">${shuffle(approvals).map(stamp => `<button type="button" class="plain-button" data-stamp="${stamp}">${stamp}</button>`).join("")}</div><button type="button" class="demo-button" id="add-letter" ${approved < approvals.length ? "disabled" : ""}>03 / Append approved character</button>`;
      permit.querySelectorAll("[data-stamp]").forEach(button => button.addEventListener("click", () => {
        if (button.dataset.stamp !== approvals[approved]) {
          approved = 0;
          if (worse) {
            scramble();
            say("Incorrect stamp. Permit shredded. Frequencies reassigned. Start this character again.");
            dial.focus();
            return;
          }
          say("Wrong department. All approvals have been reset.");
        } else {
          approved++;
          say(`Stamp ${approved} of ${approvals.length} obtained.`);
        }
        renderPermit();
        if (approved === approvals.length) permit.querySelector("#add-letter").focus();
        else permit.querySelector("[data-stamp]").focus();
      }));
      if (approved === approvals.length) permit.querySelectorAll("[data-stamp]").forEach(button => { button.disabled = true; });
      permit.querySelector("#add-letter").addEventListener("click", () => {
        if (message.value.length >= 280) { say("The 280-character limit has been reached. Your approved text is preserved."); return; }
        message.value += locked;
        update();
        scramble();
        say("ONE character approved. All frequencies reassigned. Please apply again.");
        dial.focus();
      });
    };
    dial.addEventListener("input", tune);
    for (const [id, delta] of [["dial-down", -1], ["dial-up", 1]]) {
      stage.querySelector(`#${id}`).addEventListener("click", () => {
        dial.value = String(Math.max(0, Math.min(9999, Number(dial.value) + delta)));
        tune();
      });
    }
    lock.addEventListener("click", () => {
      locked = selected.letter;
      approved = 0;
      approvals = shuffle(worse ? ["Legal", "Finance", "Vowels", "Compliance", "Management"] : ["Legal", "Vowels", "Management"]);
      dial.disabled = true;
      stage.querySelector("#dial-down").disabled = true;
      stage.querySelector("#dial-up").disabled = true;
      lock.disabled = true;
      renderPermit();
      permit.querySelector("[data-stamp]").focus();
    });
    stage.querySelector("#undo-letter").addEventListener("click", () => {
      const count = worse ? 2 : 1;
      if (!message.value) { say("There is nothing to undo. The bureaucracy has already achieved that."); return; }
      message.value = message.value.slice(0, -count);
      update();
      say(`Removed up to ${count} character${count === 1 ? "" : "s"}. Their paperwork cannot be recovered.`);
    });
    scramble();
  }
  stage.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    say(message.value.trim() ? "Message admired! This is a demo, so nothing was sent." : "Add a message first. Even this form needs something to work with.");
    if (message.value.trim()) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  return () => {};
}

function renderWordEditor({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const limit = 140;
  const characters = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,!?'-:;()\"\n"];
  let text = "";
  let selected = 0;
  const history = [];
  const future = [];
  stage.innerHTML = `<div class="word-editor-demo"><div class="word-editor-brand"><strong>Dropdown Office</strong><span>PRODUCTIVITY, MINUS THE PRODUCTIVITY.</span></div><div class="word-editor-intro"><span class="demo-kicker">UNTITLED DOCUMENT / EXHIBIT 04</span><h2>${fixed ? "The keyboard has been reinstated." : "Every letter is a menu."}</h2><p>${fixed ? "Type, paste, and edit your document normally." : `Choose a character from the empty dropdown to append it. Reopen any earlier dropdown to edit that character. Spaces, punctuation, and line breaks are menu items too.${worse ? " Every dropdown's options reshuffle after each edit. Muscle memory has been discontinued." : ""}`}</p></div><div class="word-editor-toolbar" role="group" aria-label="Document editing"><button type="button" class="plain-button" id="word-undo">↶ Undo</button><button type="button" class="plain-button" id="word-redo">↷ Redo</button>${fixed ? "" : `<button type="button" class="plain-button" id="word-delete">Delete selected letter</button>`}<span id="word-count"></span></div><div class="word-editor-page">${fixed ? `<label for="word-text">Your document</label><textarea id="word-text" maxlength="${limit}" placeholder="At last. A normal place to write."></textarea>` : `<div class="word-page-heading">COMPOSE YOUR DOCUMENT</div><div class="word-letters" id="word-letters" role="group" aria-label="One dropdown per character"></div><p class="word-editor-hint">Select an existing character before deleting it. With the empty dropdown selected, Delete removes the last character.</p>`}<div class="word-readable"><h3>Readable version</h3><p id="word-preview"></p></div></div><div class="word-editor-bottom"><button type="button" class="demo-button" id="word-finish">Finish demo document</button><small>Local and temporary. Your document is never sent or saved.</small></div><div class="demo-status" role="status" id="word-status"></div></div>`;
  const say = message => { stage.querySelector("#word-status").textContent = message; };
  const refresh = () => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    stage.querySelector("#word-count").textContent = `${text.length} / ${limit} characters · ${words} word${words === 1 ? "" : "s"}`;
    stage.querySelector("#word-preview").textContent = text || "Your unwritten masterpiece awaits.";
    stage.querySelector("#word-undo").disabled = history.length === 0;
    stage.querySelector("#word-redo").disabled = future.length === 0;
    if (!fixed) stage.querySelector("#word-delete").disabled = text.length === 0;
  };
  const commit = next => {
    if (next === text) return;
    history.push(text);
    if (history.length > 100) history.shift();
    future.length = 0;
    text = next;
    refresh();
  };
  const renderLetters = focusIndex => {
    const container = stage.querySelector("#word-letters");
    const fragment = document.createDocumentFragment();
    const count = Math.min(text.length + 1, limit);
    for (let index = 0; index < count; index++) {
      const entry = document.createElement("div");
      entry.className = "word-letter";
      const position = document.createElement("span");
      position.textContent = String(index + 1).padStart(2, "0");
      position.setAttribute("aria-hidden", "true");
      const menu = document.createElement("select");
      menu.dataset.character = String(index);
      menu.setAttribute("aria-label", index === text.length ? `Append character ${index + 1}` : `Edit character ${index + 1}`);
      if (index === text.length) {
        const placeholder = new Option("+", "");
        placeholder.disabled = true;
        menu.add(placeholder);
      }
      for (const character of worse ? shuffle(characters) : characters) {
        menu.add(new Option(character === " " ? "[space]" : character === "\n" ? "[enter]" : character, character));
      }
      menu.value = text[index] || "";
      menu.addEventListener("focus", () => { selected = index; });
      menu.addEventListener("change", () => {
        const replacement = menu.value;
        commit(text.slice(0, index) + replacement + text.slice(index + 1));
        const nextIndex = index === text.length - 1 ? Math.min(index + 1, count) : index;
        renderLetters(Math.min(nextIndex, limit - 1));
        say(worse ? "Character entered. Every menu has been reshuffled." : "Character entered. Another dropdown awaits.");
      });
      entry.append(position, menu);
      fragment.append(entry);
    }
    container.replaceChildren(fragment);
    if (focusIndex !== undefined) container.querySelector(`[data-character="${focusIndex}"]`)?.focus();
  };
  const syncEditor = () => {
    refresh();
    if (fixed) stage.querySelector("#word-text").value = text;
    else renderLetters(Math.min(selected, text.length, limit - 1));
  };
  if (fixed) {
    stage.querySelector("#word-text").addEventListener("input", event => commit(event.target.value));
  } else {
    stage.querySelector("#word-delete").addEventListener("click", () => {
      const index = Math.min(selected, text.length - 1);
      commit(text.slice(0, index) + text.slice(index + 1));
      selected = Math.min(index, text.length);
      syncEditor();
      say("Character deleted. Undo can bring it back.");
    });
    renderLetters();
  }
  stage.querySelector("#word-undo").addEventListener("click", () => {
    future.push(text);
    text = history.pop();
    syncEditor();
    say("Last text edit undone.");
  });
  stage.querySelector("#word-redo").addEventListener("click", () => {
    history.push(text);
    text = future.pop();
    syncEditor();
    say("Text edit restored.");
  });
  stage.querySelector("#word-finish").addEventListener("click", () => {
    say(text.trim() ? "Document complete. Nothing was sent or saved; admire your hard-earned words above." : "Write something first. Spaces alone do not make a masterpiece.");
    if (text.trim()) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  refresh();
  return () => {};
}

function renderAlphabet({ stage, mode, shuffle }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
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
      // Rotate an identical shuffle so each revision produces a new order.
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
    if (message.value.trim()) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  return () => {};
}

function renderPhone({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  const target = "2025550107";
  const formattedTarget = `${target.slice(0, 3)} ${target.slice(3, 6)} ${target.slice(6)}`;
  shell("DIAL BY CHANCE", fixed ? "Enter the demo number." : "Your phone number, probably.",
    `Task: enter the fictional number ${target}.${fixed ? " Type or paste it below." : ` Roll individual digits until they match, then lock them.${worse ? " Rolling a digit also rerolls and unlocks its left neighbor. Solve from the right if you want to keep your progress." : ""}`}`,
    `<div class="task-target">DEMO NUMBER: <strong>${formattedTarget}</strong></div>${fixed ? `<form id="phone-form"><label for="phone-number">${target.length}-digit demo phone number</label><input id="phone-number" type="tel" inputmode="numeric" pattern="[0-9]{${target.length}}" maxlength="${target.length}" required autocomplete="off"><button class="demo-button">Confirm demo number</button></form>` : `<div class="phone-reels">${[...target].map((_, index) => `<div class="phone-reel"><label>Digit ${index + 1}</label><output id="phone-digit-${index}">?</output><button class="plain-button" data-roll="${index}" aria-label="Roll digit ${index + 1}">↻ Roll</button><button class="demo-button" data-lock="${index}" aria-label="Lock digit ${index + 1}" aria-pressed="false">Lock</button></div>`).join("")}</div><button class="demo-button" id="confirm-phone">Confirm this unlikely number</button>`}`);
  if (fixed) {
    stage.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      say(stage.querySelector("#phone-number").value === target ? "Number accepted. No call or message will be sent." : `Use the fictional demo number ${target}, not your real number.`);
      if (stage.querySelector("#phone-number").value === target) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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
      if (digits.every(digit => digit !== null) && digits.join("") === target) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    });
    paint();
  }
  return () => {};
}

function renderCalendar({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  shell("TRAVEL THROUGH TIME, INEFFICIENTLY", fixed ? "Choose an appointment date." : "Please advance to January 12.",
    `Task: select January 12, 2000.${fixed ? " Direct date entry is allowed again." : ` We begin on January 1. There is no month picker and no typing.${worse ? " Forward alternates between +7 days and −6 days. Back always moves one day backwards." : " Only one-day steps. Holding a button does nothing."}`}`,
    `${fixed ? `<form id="date-form"><label for="appointment-date">Appointment date</label><input type="date" id="appointment-date" value="2000-01-01" required><button class="demo-button">Book fictional appointment</button></form>` : `<div class="calendar-machine"><span>JANUARY? EVENTUALLY.</span><output id="calendar-date" aria-live="polite"></output><div class="new-actions"><button class="plain-button" id="date-back">← Back one day</button><button class="demo-button" id="date-forward">Forward →</button></div><p id="date-step"></p></div><button class="demo-button" id="confirm-date">Book the date shown</button>`}`);
  const confirm = date => {
    say(date === "2000-01-12" ? "January 12 booked in our fictional calendar. No real appointment was created." : "Wrong date. The fictional appointment must be January 12, 2000.");
    if (date === "2000-01-12") stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  };
  if (fixed) {
    stage.querySelector("form").addEventListener("submit", event => { event.preventDefault(); confirm(stage.querySelector("#appointment-date").value); });
  } else {
    const date = new Date("2000-01-01T12:00:00Z");
    let clicks = 0;
    const paint = () => {
      stage.querySelector("#calendar-date").textContent = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
      stage.querySelector("#date-step").textContent = worse ? `Next “Forward” step: ${clicks % 2 ? "−6" : "+7"} days. Arithmetic not included.` : "There are no shortcuts. That is the design.";
    };
    stage.querySelector("#date-forward").addEventListener("click", () => {
      date.setUTCDate(date.getUTCDate() + (worse ? (clicks++ % 2 ? -6 : 7) : 1));
      paint();
    });
    stage.querySelector("#date-back").addEventListener("click", () => { date.setUTCDate(date.getUTCDate() - 1); paint(); });
    stage.querySelector("#confirm-date").addEventListener("click", () => confirm(date.toISOString().slice(0, 10)));
    paint();
  }
  return () => {};
}

function renderCookies({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  const names = ["Analytics", "Marketing", "Personalization", "Partner sharing"];
  // Generic IDs such as cookie-1 and cookie-2 are hidden by cookie-blocker lists.
  // Use museum-specific IDs so content blockers do not hide the demo controls.
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
    if (fixed || enabled.every(value => !value)) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  };
  stage.querySelector("#save-cookies").addEventListener("click", save);
  stage.querySelector("#reject-all")?.addEventListener("click", () => { enabled = enabled.map(() => false); paint(); save(); });
  paint();
  return () => {};
}

function renderUnixBirthday({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
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
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  };
  if (worse) input.addEventListener("input", checkBirthday);
  stage.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    checkBirthday();
  });
  return () => {};
}

function renderPasswordGym({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
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
    `Invent a throwaway phrase. NEVER enter a real password.${fixed ? " There is one requirement, shown upfront and checked as you type." : ` There are ${rules.length} rules. Meeting all visible requirements automatically reveals the next one, including when you paste.${worse ? " This mode is deliberately impossible: its final requirement contradicts earlier ones. Fix it and Exit remain available." : " The default challenge is long but solvable."}`} This is a design puzzle, not security advice or a password-strength test.`,
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
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    } else {
      const failing = results.slice(0, revealed).findIndex(result => !result);
      say(`Rule ${failing + 1} is unmet: ${rules[failing].text} All earlier requirements remain active.`);
    }
  };
  input.addEventListener("input", evaluate);
  stage.querySelector("form").addEventListener("submit", event => { event.preventDefault(); evaluate(); });
  evaluate();
  return () => {};
}

function renderCatCaptcha({ stage, mode }) {
  const { shell, say } = createStageShell(stage);
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  if (fixed) {
    shell("VERIFICATION WITHOUT PREDATION", "One checkbox. Zero cats.",
      "This is a pretend verification widget, not a real CAPTCHA or security measure.",
      `<form id="cat-simple-form"><label class="cat-simple-label"><input type="checkbox" id="cat-simple-check" required> I am here for the demo, not the cheese.</label><button class="demo-button">Verify demo</button></form>`);
    stage.querySelector("#cat-simple-form").addEventListener("submit", event => {
      event.preventDefault();
      say("Demo verified. No chase, no cheese, and no real security check.");
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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
    if (success) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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

function renderCheckboxEcosystem({ stage, mode }) {
  const { shell, say } = createStageShell(stage);
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
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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

function renderElevatorDate({ stage, mode }) {
  const { shell, say } = createStageShell(stage);
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("VERTICAL TRANSPORT FOR TEMPORAL DATA", fixed ? "Pick a date. Stay on this floor." : "Your date requires two transfers.",
    fixed ? "Choose a fictional date directly. Nothing is booked or saved." : `Ride to a year, request a stop, then transfer to the month and day elevators. Try July 16, 1992, or choose your own fictional date.${worse ? " Express service jumps three floors unless you request a stop before the next departure." : " Request stop brings you to the next floor."} Only stopped elevators let you select a floor. No booking is made.`,
    fixed ? '<form id="lift-form"><label for="lift-date">Demo date</label><input type="date" id="lift-date" min="1900-01-01" max="2100-12-31" required><button class="demo-button">Choose demo date</button></form>' : `<div class="lift-machine"><div class="lift-route" id="lift-route">YEAR → MONTH → DAY</div><div class="lift-shaft"><div class="lift-cabin" id="lift-cabin"><span id="lift-service">YEAR ELEVATOR</span><output id="lift-floor">2000</output><span id="lift-state">Doors open</span></div></div><div class="lift-controls"><button type="button" class="plain-button" id="lift-down">↓ Ride down</button><button type="button" class="plain-button" id="lift-stop" disabled>Request stop</button><button type="button" class="plain-button" id="lift-up">↑ Ride up</button></div><div class="new-actions"><button type="button" class="demo-button" id="lift-select">Use this year</button><button type="button" class="plain-button" id="lift-restart">Return to year lobby</button></div><p class="lift-itinerary" id="lift-itinerary">Selected date: ---- / -- / --</p></div>`);
  if (fixed) {
    stage.querySelector("#lift-form").addEventListener("submit", event => {
      event.preventDefault();
      say(`Demo date chosen: ${stage.querySelector("#lift-date").value}. Nothing was booked or saved.`);
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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
      stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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

function renderPasswordCrane({ stage, mode }) {
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
  let password = "";
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
    input.value = password;
    on(input, "input", () => { password = input.value; });
    on($("#arcade-phrase-form"), "submit", event => {
      event.preventDefault();
      say(input.value.trim().length >= 4 ? "Demo phrase accepted. No account was created and nothing was sent." : "Use at least 4 non-padding characters in your invented phrase.");
      if (input.value.trim().length >= 4) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
    });
    on($("#arcade-crane-reset"), "click", () => {
      password = "";
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
    $("#arcade-password").textContent = password ? showPassword(password) : "(empty)";
    $("#arcade-password-count").textContent = `${password.length} / ${limit} characters`;
    $("#arcade-left").disabled = lane === 0;
    $("#arcade-right").disabled = lane === chute;
    $("#arcade-grab").disabled = Boolean(held) || lane === chute;
    $("#arcade-drop").disabled = !held || lane !== chute || password.length >= limit;
    $("#arcade-return").disabled = !held;
    $("#arcade-undo").disabled = !password;
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
    if (password.length >= limit) { say(`The demo holds ${limit} characters. Undo a character before adding another.`); return; }
    password += held;
    held = "";
    update();
    say(password === target ? `${target} assembled! Check demo password to finish.` : "Tile added. Undo always removes the last character.");
  };
  on($("#arcade-left"), "click", () => move(-1));
  on($("#arcade-right"), "click", () => move(1));
  on($("#arcade-grab"), "click", grab);
  on($("#arcade-drop"), "click", drop);
  on($("#arcade-return"), "click", () => { held = ""; update(); say("Tile returned. Your assembled password is unchanged."); });
  on($("#arcade-undo"), "click", () => {
    password = password.slice(0, -1);
    update();
    say("Last letter removed.");
  });
  on($("#arcade-check"), "click", () => {
    say(password === target
      ? `Success! The fictional password is ${target}. No real credentials were used or saved.`
      : `Not ${target} yet. Use Undo to remove unwanted characters, or reset and try again.`);
    if (password === target) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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
    password = "";
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

function renderEmailAuction({ stage, mode }) {
  const { shell, say } = createStageShell(stage);
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  shell("CONTACT DETAILS SOLD SEPARATELY", fixed ? "An email address, not an auction." : "Please bid for your email address.",
    fixed ? "Type or paste any valid email address. This demo sends and stores nothing." : `No address needed upfront. Bid on any lowercase or uppercase letter, digit, or punctuation mark, then assemble your own or a fictional email from the characters you win. Choose 1-20 copies per bid, and buy the same character again whenever needed.${worse ? " Every lot attracts two rival bids, and @ attracts three." : " Vowels attract rival bids; @ has a reserve price."} Only winning bids spend imaginary coins. Nothing is stored or sent.`,
    fixed ? `<form id="auction-setup"><label for="auction-email">Email address</label><input id="auction-email" type="email" maxlength="254" required autocomplete="off" spellcheck="false" placeholder="mouse@example.test"><button class="demo-button" id="auction-open">Use email in demo</button></form>` : `<div class="auction-house auction-market" id="auction-market"><div class="auction-ledger"><span id="auction-wallet"></span><span id="auction-progress"></span></div><h3>All offered character lots</h3><p class="auction-instructions">The same full catalog is available to everyone. Pick a character and the number of copies to bid on.</p><label for="auction-filter">Show characters</label><select id="auction-filter"><option value="all">All characters</option><option value="lower">Lowercase a-z</option><option value="upper">Uppercase A-Z</option><option value="digits">Digits 0-9</option><option value="symbols">Punctuation and symbols</option></select><div class="auction-lots" id="auction-lots" role="group" aria-label="Available character lots"></div><div class="auction-lot"><span>SELECTED LOT</span><output id="auction-character">?</output><p id="auction-price">Choose a character lot above.</p></div><form id="auction-form" novalidate><label for="auction-quantity">Copies in this bid</label><select id="auction-quantity" disabled>${Array.from({ length: 20 }, (_, index) => `<option value="${index + 1}">${index + 1}</option>`).join("")}</select><label for="auction-bid">Bid for the entire selected bundle (imaginary coins)</label><input type="number" id="auction-bid" min="1" step="1" required disabled><div class="new-actions"><button class="demo-button" id="auction-place" disabled>Place bid</button><button type="button" class="plain-button" id="auction-minimum" disabled>Bid the minimum</button><button type="button" class="plain-button" id="auction-retry" disabled>Restart this lot</button></div></form><h3>Your won characters</h3><p class="auction-instructions">Click a won character to append it. Click an assembled character to return it, or drag assembled characters to reorder them. Maximum 254 characters.</p><p id="auction-inventory-empty">No winnings yet. Bid on any character to begin.</p><div class="auction-inventory" id="auction-inventory"></div><div class="auction-address"><span>ASSEMBLE YOUR EMAIL</span><div class="auction-assembly" id="auction-assembly" aria-label="Assembled email characters"></div><output id="auction-address">(empty)</output></div><div class="new-actions"><button type="button" class="demo-button" id="auction-check">Confirm assembled email</button><button type="button" class="plain-button" id="auction-undo">Undo last character</button><button type="button" class="plain-button" id="auction-clear">Return all to tray</button></div><div class="new-actions"><button type="button" class="plain-button" id="auction-reset">Restart entire auction</button></div></div>`);
  if (fixed) {
    stage.querySelector("#auction-setup").addEventListener("submit", event => {
      event.preventDefault();
      say(`Email accepted for this demo: ${stage.querySelector("#auction-email").value.trim()}. Nothing was sent or saved.`);
      if (stage.querySelector("#auction-email").validity.valid) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  open();
  return () => {};
}

function renderAddressJigsaw({ stage, mode, shuffle }) {
  const { shell, say } = createStageShell(stage);
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
      const correct = stage.querySelector("#jigsaw-input").value.trim().replace(/\s+/g, " ") === target;
      say(correct ? "Demo address accepted. Nothing was shipped or saved." : `Use the fictional address ${target}.`);
      if (correct) stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
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

function renderExpandingForm({ stage, mode }) {
  const { shell, say } = createStageShell(stage);
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
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  const motionChange = () => { if (!finished) paint(); else cards.forEach(card => { card.style.transform = "none"; }); };
  motion.addEventListener("change", motionChange);
  paint();
  return () => motion.removeEventListener("change", motionChange);
}

function renderCorrectingSearch({ stage, mode }) {
  const { shell, say } = createStageShell(stage);
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const rounds = worse ? 5 : 3;
  shell("YOUR INTENT, REVISED BY COMMITTEE", fixed ? "Search exactly what you typed." : "Did you mean something completely different?",
    fixed ? "Try quiet cafes, weather, museum hours, accessible forms, or cat pictures. Results are fictional and local; nothing is sent to a search service." : `After you stop typing, the bar swaps words for nearby spellings from a large and unnecessarily enthusiastic vocabulary. It starts at a random replaceable word among the first ten, then rotates across them instead of obsessing over the first one. Reject up to ${rounds} unsolicited corrections to search your original words.${worse ? " Each rejection also needs an explanation of at least 8 characters. It is a silly length check, not AI." : ""} Matching uses edit distance with adjacent letter swaps, plus a small stemmer: plurals and -ing endings are matched on their base word and handed back re-conjugated, so "searching" becomes "starching" rather than "starch". No big dictionary download or external service. Words with no close match stay unchanged.`,
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
      const change = stage.querySelector("#correcting-change");
      const replacement = document.createElement("mark");
      replacement.className = "correcting-word";
      replacement.textContent = correction.replacement;
      change.replaceChildren(
        document.createTextNode(correction.query.slice(0, correction.index)),
        replacement,
        document.createTextNode(correction.query.slice(correction.index + correction.replacement.length)),
      );
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
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  const visibility = () => { if (document.hidden) clearTimer(); else schedule(); };
  document.addEventListener("visibilitychange", visibility);
  paint();
  return () => {
    clearTimer();
    document.removeEventListener("visibilitychange", visibility);
  };
}
