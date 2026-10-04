# Exhibit catalog

Each exhibit starts with a recognizable online experience, then introduces an absurd obstacle. Visitor-facing copy gives plain-language context and a playful hint, leaving escalation and punchlines to the interaction. Tasks, safety guidance, and recovery controls remain explicit. Optional help and curator's notes explain the mechanics when requested. **Original disaster** (Easy) presents the original idea, **Make it even worse** (Hard) intensifies the joke, and the smaller **Fix it** option offers a break from the nonsense. Add `?mode=hard` or `?mode=fixed` to an exhibit URL to open that mode directly. The descriptions below use Easy and Hard as shorthand for these modes.

This developer catalog deliberately explains each experience and its major mode differences in full; it is not the spoiler-light public introduction. The exhibit source and focused browser tests remain authoritative for exact mechanics.

Goals describe ordinary outcomes, not the obstacles: send a message, save a note, find a receipt, or choose a setting. Supplied text and dates give the character-entry and date puzzles a bounded mission. Text comparisons ignore capitalization and outer whitespace; dates and the supplied test-account password must match their stated targets.

Accepted forms lock their values and editing controls. Explicit local retries clear the result and start a new tracked attempt; museum Restart and mode changes also clear progress. Dismissing feedback alone preserves completion.

## The CAT-PCHA

**Route:** `/exhibit/cat-captcha`

A CAPTCHA is the familiar human check a website presents before letting you continue, often as a checkbox or picture puzzle. This version replaces that check with a cat-and-mouse game: collect cheese and reach the mouse hole while a cat moves toward you after every turn. The game supports arrow keys, WASD, direction buttons, and taps on adjacent squares.

Hard adds more cheese, occasional two-step cat turns, and an exit that changes after the first apparent success. Fix it replaces the chase with a simple demo checkbox. This is a puzzle, not a real security check.

## The Runaway Button

**Route:** `/exhibit/runaway`

Download a fictional museum ticket using a button that chooses one of four weaknesses: delayed reactions, exhaustion after repeated escapes, tolerance for slow approaches, or movement that can be cornered. The selected weakness is revealed through a hint after the opening chase. Success downloads a small text ticket explicitly marked as invalid for real admission.

Hard makes the target smaller and more sensitive and introduces decoys. Touch and pen use a direct-hit challenge, while keyboard input, reduced motion, and Fix it provide non-evasive paths. Reset chooses a fresh behavior.

## The Password Gym

**Route:** `/exhibit/password-gym`

Build a fictional password while new rules appear and all earlier rules remain in force. Easy contains 20 progressively revealed requirements and can be solved.

Hard expands the workout to 32 rules and ends with a deliberate contradiction. Reaching it finishes the exhibit with **Goal blocked**, not a successful password. Successful phrases and the blocked endpoint stop evaluation. Fix it uses one visible length requirement; meeting it keeps the phrase editable until **Create password** explicitly accepts it. Never enter a real password or reuse a puzzle answer for an account.

## The Self-Correcting Search Bar

**Route:** `/exhibit/correcting-search`

Find somewhere to meet a friend by searching for **quiet cafes**. Pause while typing and the search bar replaces a word with a plausible but unwanted alternative. It preserves punctuation and inflection where possible, highlights the correction, and lets the visitor reject suggestions to recover the original query.

Hard offers more corrections and requires short explanations for rejection. Other queries remain editable, but **quiet cafe** or **quiet cafes**, ignoring capitalization and extra whitespace, completes the mission when the cafe result is shown. Accepted results remain locked until Restart. Fix it searches the required words directly. Suggestions and results are local; no external search is performed.

## Your Button Has Moved

**Route:** `/exhibit/layout-checkout`

Complete a fictional checkout while promotional offers, recommendations, and sales copy compete with the intended action. The checkout remains a simulation and never accepts a real order or payment.

Hard adds more personalized interruptions and less stable presentation. Offer dialogs contain keyboard focus and provide **Museum controls** to close the dialog and focus the toolbar without accepting an offer or losing checkout progress. Escape dismisses only the local offer, preserving the unresolved negotiation. Fix it reserves space and keeps the checkout action predictable. Keyboard, touch, and reduced-motion alternatives remain available.

## The Layout Earthquake

**Route:** `/exhibit/layout-earthquake`

You're planning a weekday library visit after finishing work at 6 pm. Find and open "The public library opens late" in a newspaper layout, then select **View library opening hours** at the end of the story. This reveals the weekday and weekend schedule and confirms that the library closes at 9 pm on weekdays. Viewing the hours completes the task and stops live updates; opening an unrelated story does not.

Ads expand into the story's position. Early attempts insert sponsored blocks instead of opening the link, and live updates continue to shift the article and its opening-hours control.

On narrow screens, live placements expand and collapse together at viewport-scaled sizes, so their movements do not cancel out. The newspaper retains its scrollable height during updates to keep shrinking ads from silently holding the reader in place at the bottom. Reduced-motion users advance these changes manually.

Hard buries the story deeper, intercepts more attempts, and adds more aggressive layout changes. Dismissed ads can return. Fix it places the story first, opens it immediately, and reserves space so surrounding content remains stable.

## The Scroll-Through Modal

**Route:** `/exhibit/scroll-modal`

Choose a delivery option in a dialog where scrolling may move the checkout underneath instead. The deliberately poor offer compares very expensive two-day delivery with free three-day delivery.

Hard adds a third shipping-speed dialog and lets each gesture affect different layers, sometimes in opposite directions. Native scrollbars and labeled controls remain reliable. Choosing **Standard** updates both the chooser and checkout summary. Fix it uses one normally scrolling dialog over a stationary page.

## The Validation Afterthought

**Route:** `/exhibit/validation-afterthought`

Register for a fictional open house using four fields. A failed submission reveals only the first unmet rule and clears the other answers, forcing requirements to be discovered one at a time.

Hard makes the error message less specific. Fix it shows requirements before submission, validates next to each field, and preserves valid input. All modes accept the same reachable solution; successful registration clears old errors and locks the accepted fields. Nothing is submitted or stored.

## The Hover Dependency

**Route:** `/exhibit/hover-menu`

Navigate nested department menus to find a desk lamp's specifications. Pointer users must cross narrow safe corridors before the menus close; touch users work against submenu deadlines.

Hard adds another submenu and twisting paths. The instructions disclose that two failed crossings reveal a hold-open option, and its arrival is announced. Keyboard navigation has no deadline and reduced motion enables the bypass automatically. Fix it uses persistent click-open menus.

## The Notification Fly Swatter

**Route:** `/exhibit/notification-swatter`

Send a support request with fictional contact details while fake in-page notifications multiply over the form. Name, email, subject, and message are required; organization is optional. There is no arbitrary confirmation code or requirement to dismiss every alert before sending. Pause holds the swarm while answers are edited, and Swat one provides a reliable alternative to clicking individual alerts.

Hard spawns alerts faster and creates more after misses. Completion and navigation stop the swarm; Fix it removes alerts entirely. The exhibit never requests browser notification permission.

## The Tetris Volume Control

**Route:** `/exhibit/tetris-volume`

Set a fictional video player's volume to **60%**, with **58-62%** accepted in every mode. Move, rotate, and drop tetrominoes on a compact board. Settled cells control the value, while completed rows disappear and can lower it again. Reaching the target pauses the game and explicitly records success. Resume starts a fresh tracked attempt while retaining the stack; Empty speaker starts again with an empty board.

Hard accelerates gravity. The game can be paused, supports keyboard controls, and uses manual drops for reduced motion. Fix it restores a normal slider; the exhibit never plays audio or changes device volume.

## The Phone Number Casino

**Route:** `/exhibit/phone`

Roll ten independent digits until they form the fictional target number `2025550107`, then confirm. Locking digits is optional help, not an extra success requirement. Progress depends on repeated chance rather than ordinary text entry.

Hard also rerolls and unlocks the digit to the left, making a right-to-left strategy more effective. Fix it provides conventional phone-number input and accepts spaces, hyphens, and parentheses without truncating formatted entry.

## Terms & Conditions: The Game

**Route:** `/exhibit/terms-game`

Scroll through an 80-clause fictional agreement before taking an eight-question open-book exam. Acceptance unlocks only after every answer is correct, while declining is always available.

Hard doubles the agreement, adds questions, limits hints, and reshuffles the exam after wrong answers. Fix it offers a short summary and immediate accept or decline controls. Either decision completes the interaction with its actual outcome; declining is never treated as an error. No real agreement is created.

## The Font Buffet

**Route:** `/exhibit/fonts`

Prepare an event notice saying **Library open until 9 pm**, then select **Save draft**. Its words receive competing fonts, sizes, colors, and rotations. **Shuffle styles** is optional and makes no promise to repair the typography. A blank or unrelated notice does not complete the task.

Hard styles every character independently. Fix it uses consistent typography and a predictable editing experience.

## The Unix Birthday Picker

**Route:** `/exhibit/unix-birthday`

Set Alex's fictional profile birthday to **July 16, 1992**. Instead of choosing it from a calendar, move through Unix timestamps: numbers counting milliseconds from January 1, 1970. A millisecond is one thousandth of a second. A live calendar preview translates the number using UTC, the standard world time. Hour/day adjustment buttons provide touch-friendly precision after a coarse slider move, and an alignment control snaps the value to midnight. Every mode requires confirming the stated date; another valid date is not a win.

Hard removes the slider and expects a timestamp to be entered manually, while still explaining whether it represents a valid birthday. Fix it uses a native date field and gives date-specific range errors rather than timestamp-unit advice.

## The Cancellation Labyrinth

**Route:** `/exhibit/cancel`

Cancel a fictional subscription, starting with a straightforward **Do you want to cancel your subscription?** before four double-negative confirmations. The introduction acknowledges how cancelling seems to get harder even when signing up takes seconds. The goal, current checkpoint, and active subscription state stay explicit. Each question has optional **Translate this question** help with its plain-language meaning and the answer that continues cancellation.

Wrong choices keep the failed question visible, lock its answers, and explain both the selected answer and the cancellation answer. An explicit **Return to checkpoint** button resumes the maze: Original disaster goes back one checkpoint (or stays at the first), while Hard resets its nine checkpoints and reshuffles the eight questions after the simple opener. Both keep shuffled answer positions and logically consistent wording; Hard adds more nested negatives. Correct answers report progress but do not end the subscription until every checkpoint is cleared. Fix it provides one direct cancellation action.

## The Recipe Odyssey

**Route:** `/exhibit/recipe`

Find the ingredients and method for buttered toast. The website obstructs that simple goal with a personal story and six comprehension questions before making the recipe available. Before completion, the fake skip action leads to an advertisement instead. Once unlocked, the shortcut reliably reveals and focuses the recipe without relocking it or recording another completion.

Hard resets reading progress after wrong answers or skip attempts. Fix it presents the short recipe and records **Recipe ready** immediately, without adding a contrived acknowledgment button.

## The Expanding Form

**Route:** `/exhibit/expanding-form`

Send a support message using an ordinary contact form whose spacing grows exponentially with every character. Longer answers move later fields—and especially the submit button—farther away. Reaching Send is not enough: submitting the valid form completes the task.

Hard makes the growth faster, raises its limits, and folds long sections of the form. Compress temporarily removes the gaps without deleting answers. Name, subject, and message must be nonempty; a valid demo email is required. One-character text answers are allowed, and errors identify the field without clearing other answers. Fix it keeps conventional spacing.

## The Radio Text Receiver

**Route:** `/exhibit/dropdown`

Tell a friend **ON MY WAY**, then send the message. Tune a frequency dial to the exact station assigned to each letter or space. Receiving a character appends it to the message and resets the dial. An unrelated or one-letter message does not complete the mission.

Hard reassigns station locations after every character. Undo removes mistakes, and Fix it restores a normal text box. The directory is informational rather than a shortcut.

## The Eventually Responsive Buttons

**Route:** `/exhibit/unresponsive-buttons`

Reserve exactly two fictional museum tickets. Only the subtly darker part of each quantity button accepts pointer clicks, and accepted clicks wait before updating the count. Impatient retries queue up and arrive individually, overshooting into an accidental group booking. Subtraction suffers from the same problem, but always allows recovery.

Hard shrinks the working patches, swaps their sides after each completed burst, and delays feedback longer. Keyboard activation bypasses spatial hit testing but keeps the delayed queue. Touch uses the same tall working patches; there is no motion-dependent challenge. Fix it makes the whole button respond immediately.

Completion requires explicitly reserving exactly two tickets with no updates pending. Reset, navigation, and mode changes discard pending clicks. Hiding the tab cancels unprocessed clicks without changing the displayed quantity. No purchase or payment occurs.

## The Seismic Text Editor

**Route:** `/exhibit/seismic-editor`

Write the reminder **Bring a notebook**, then select **Save draft**. Harmless terminal punctuation is accepted. Every edit shakes the writing area and adds stress. Rapid typing, pastes, and punctuation increase the risk that the note will collapse into letter tiles, though the exact input remains preserved. Rebuild restores that text before saving.

Hard builds stress faster and shakes more strongly. Rebuild restores editing, reduced motion disables shaking and collapse even when enabled during a session, and Fix it behaves like a stable editor. Start over clears the result and begins a fresh draft.

## The Volume Seesaw

**Route:** `/exhibit/volume-seesaw`

Set a fictional video player's volume to **65%**, required in every mode. Place pebbles, bricks, and anvils on a wobbling beam whose angle controls the slider, then select **Hold this volume**. Holding another level gives explicit guidance but does not count as success.

Hard introduces buoyant balloons; every third addition moves the oldest weight on that side to the opposite side. Release starts a new tracked attempt with the weights retained, while Clear weights starts empty. Reduced motion settles the beam immediately, and Fix it uses a normal slider. No audio or device setting is changed.

## The Windswept Volume Slider

**Route:** `/exhibit/wind-volume`

Drag a rotating vertical slider while simulated gusts continue moving its value. Saving shelters a narrow target range rather than merely accepting the current handle position.

Hard brings stronger gusts and may turn the control upside down. Keyboard input remains available, reduced motion freezes rotation while retaining interference, and Fix it provides a stable slider. No audio plays.

## The Checkbox Ecosystem

**Route:** `/exhibit/checkbox-ecosystem`

Selected preferences behave like living creatures: they lose health, wander around their habitat, and uncheck themselves if they are not fed. Save succeeds only when **Security alerts, Delivery updates, and Dark mode** are selected, with all other preferences off. Fix it keeps exactly the same objective.

Hard increases decay and lets fed preferences produce checked offspring. Pause freezes the habitat, reduced motion stops wandering, and Fix it provides stable independent checkboxes.

## The Password Crane Game

**Route:** `/exhibit/password-crane`

Enter the supplied throwaway phrase **Claw_M00n!42** for a fictional test account in every mode. Steer an arcade claw across banks containing all 128 ASCII characters and drop selections into the password. The target phrase is visible, and undo, return, and reset controls recover from mistakes.

Hard occasionally grabs a neighboring character. Keyboard controls cover movement, bank changes, and claw operation. Fix it uses a normal field for the same supplied phrase; never enter real credentials.

## The Physics Shopping Cart

**Route:** `/exhibit/physics-cart`

Add products, review the basket, and choose **Checkout** when ready. Adding a fictional product starts a wheeled cart rolling downhill toward a pretend Buy now zone. More weight increases its cartoon acceleration, while braking, pulling back, pausing, and returning to the start preserve the basket. Reaching Buy now accidentally is an unwanted outcome, not success; return or pull back before checking out intentionally.

Hard steepens the slope and adds a speed bump that disrupts the cart. Reduced motion keeps the gameplay consequence without the jump animation. Fix it uses a stationary basket and explicit simulated checkout.

## The Email Address Auction

**Route:** `/exhibit/email-auction`

Bid imaginary coins on printable characters, collect winning copies, and arrange them into a valid fictional email address. Characters can be filtered, bought more than once, returned, and reordered.

Hard raises prices and competition, especially for useful characters such as `@`. Restarting a lot preserves winnings, while a full reset starts over. Fix it uses a normal email field, and no address, money, or request leaves the browser.

## The Elevator Date Picker

**Route:** `/exhibit/elevator-date`

Set Alex's fictional profile birthday to **July 16, 1992**, the same target as the Unix Birthday Picker. Ride to the required year floor, then transfer to separate month and day elevators. Stops must be requested before a floor can be selected, and an incorrect floor does not advance the task.

Hard uses express service that skips floors unless stopped at the right time. Travel pauses when the tab is hidden. Fix it uses a conventional date field.

## The Shrinking Unsubscribe Button

**Route:** `/exhibit/shrinking-unsubscribe`

Approaching the cancellation button makes it shrink and relocate. Touch interaction uses timed movement and evasive reactions instead of relying on pointer hover.

Both paths eventually exhaust the button's ability to escape, so cancellation remains possible. Hard shrinks sooner and moves more aggressively. Keyboard focus, reduced motion, and Fix it provide stable cancellation paths; only local demo state changes.

## The Dropdown Word Processor

**Route:** `/exhibit/word-editor`

Write the note **Meet at six** and select **Save draft**, using a separate dropdown for every character, including spaces. Existing characters can be replaced or deleted, and edits support undo and redo. A one-letter document does not satisfy the mission.

Hard reshuffles each menu after every edit. Fix it restores ordinary text entry.

## The Cookie Switchboard

**Route:** `/exhibit/cookies`

Reject four optional cookie categories using coupled switches: changing one preference may change another. The puzzle remains solvable in every mode.

Hard changes several switches at once and uses negated labels. The current-settings summary updates after every change, including coupled changes. Fix it provides independent controls. The exhibit does not set real cookies.

## The Address Jigsaw

**Route:** `/exhibit/address-jigsaw`

Assemble the fictional address `42 Waffle Lane, Apt 7B, Cloud City, CA 90210` from shuffled pieces. Pieces can be placed with taps or the keyboard, returned from filled slots, or dragged to swap positions.

Hard adds decoy pieces and reshuffles the tray after edits. Fix it allows normal typing and pasting. Nothing is shipped or stored.

## The Retro Personal Homepage

**Route:** `/exhibit/retro`

Personal homepages often had guestbooks where visitors left a name or message, before social profiles became common. This deliberately broken version sends menu links to the wrong section, reverses the visitor's nickname, and requires a cat-picture CAPTCHA to sign the guestbook.

Hard replaces vowels, rearranges CAPTCHA tiles after each choice, and requires another round. Fix it restores dependable navigation and input.

## The AI Everything Store

**Route:** `/exhibit/ai-store`

Get an umbrella for a rainy-day visit. The shop forces unnecessary scripted AI onboarding and a fictional monthly plan before adding it to the basket. Other products remain browsable but do not complete the umbrella mission.

Hard requires additional calibration rounds. Each product retains its own setup draft when reopened or switched away from; the crude script matches the letters in its keyword, even inside another word, as disclosed in the instructions. After buying an umbrella, optional shopping remains available without claiming the umbrella is still missing or recording duplicate wins. Fix it sells the same objects with clear one-time prices. Responses are local scripts rather than output from an AI service.

## The Mystery Meat Menu

**Route:** `/exhibit/mystery-menu`

Find a receipt for an expense claim using six unlabeled symbols with unhelpful tooltips. **Download receipt** produces a fictional text receipt explicitly marked as invalid for a real claim. No shipping-policy acknowledgment is required.

Hard reshuffles the destinations after every navigation choice. Fix it supplies stable, descriptive labels.

## The Alphabet Shuffle

**Route:** `/exhibit/alphabet`

Send a friend **HELLO** using a slider containing a randomly ordered alphabet to select and append one character at a time. The visible preview always shows what the current action will add. The stated greeting, not any nonempty string, completes the mission.

Easy reshuffles after each appended character; Hard also reshuffles after committed slider adjustments. Fix it uses ordinary text input.

## The Corporate Fog Machine

**Route:** `/exhibit/corporate`

Try to open a sample task board while mandatory onboarding generates more mandatory onboarding. Going backward discards progress.

After four completed steps, Easy and Hard reach a finite **goal blocked** endpoint: more setup was added instead of access to the product. Fix it opens the sample board directly and records successful task completion.

## The Loading Experience

**Route:** `/exhibit/loading`

Open a fictional booking confirmation showing the time of a museum visit. Wait through ten fake progress stages—including backward progress near completion—to reveal that one sentence. Loading can be cancelled, and timers stop on reset or navigation.

Hard interrupts the wait with approval prompts. Opening the confirmation again starts a fresh tracked attempt. Fix it reveals the sentence immediately.

## Shared behavior

Every exhibit has a labeled exhibit frame, a visitor mission, a collapsible curator's note, and a sticky museum toolbar outside the exhibit website. A short first-visit guide explains the setup and can be reopened at any time; its dismissal is remembered only for the current tab. Public copy relies on the museum context rather than repeating simulation disclaimers. Credential safety guidance and limitations in downloaded documents remain explicit.

Completing a task records its actual outcome in the task frame and shows a dismissible, on-screen result notification without moving focus. The notification links to the full result and manual next options; dismissing it does not erase the completed marker. Deliberately impossible endpoints say **Goal blocked**, not **Task complete**. Initially available content such as the fixed recipe can complete during rendering because completion listeners are installed first.

The inline result offers **Make it even worse**, with a smaller **Fix it** option. Nothing advances automatically, and modes never require completion to unlock. Completing Hard offers the next exhibit. **Restart** clears the current experience and its outcome without changing the mode; switching modes starts a fresh attempt and also clears progress. The frame footer begins with **Exhibit in progress**, changes to **Task complete** or **Goal blocked by the website** for a result, and resets when a new attempt starts.

The museum's Exit, Restart, and Fix it controls remain trustworthy even when the exhibit is not. Jump keeps the mission visible below the toolbar while focusing the simulation. Escape exits only from the museum toolbar; inside an exhibit it belongs to the current input or pop-up. Tasks support keyboard operation and provide touch and reduced-motion behavior where relevant. Simulated orders, payments, subscriptions, messages, and personal details never leave the browser; use invented information in form-based exhibits.
