# Exhibit catalog

Each exhibit turns a familiar task into a deliberately frustrating interface. **Easy** presents the original idea, **Hard** intensifies it, and **Fix it** replaces the obstacle with a usable control. Add `?mode=hard` or `?mode=fixed` to an exhibit URL to open that mode directly.

This catalog explains each experience and its major mode differences without duplicating every timing constant or test case. The exhibit source and focused browser tests remain authoritative for exact mechanics.

## The CAT-PCHA

**Route:** `/exhibit/cat-captcha`

Collect cheese and reach the mouse hole while a cat moves toward you after every turn. The game supports arrow keys, WASD, direction buttons, and taps on adjacent squares.

Hard adds more cheese, occasional two-step cat turns, and an exit that changes after the first apparent success. Fix it replaces the chase with a simple demo checkbox. This is a puzzle, not a real security check.

## The Runaway Button

**Route:** `/exhibit/runaway`

Catch a button that chooses one of four weaknesses: delayed reactions, exhaustion after repeated escapes, tolerance for slow approaches, or movement that can be cornered. The selected weakness is revealed through a hint after the opening chase.

Hard makes the target smaller and more sensitive and introduces decoys. Touch and pen use a direct-hit challenge, while keyboard input, reduced motion, and Fix it provide non-evasive paths. Reset chooses a fresh behavior.

## The Password Gym

**Route:** `/exhibit/password-gym`

Build a fictional password while new rules appear and all earlier rules remain in force. Easy contains 20 progressively revealed requirements and can be solved.

Hard expands the workout to 32 rules and ends with a deliberate contradiction, which the exhibit explains when reached. Fix it uses one visible length requirement. Never enter a real password or reuse a puzzle answer for an account.

## The Self-Correcting Search Bar

**Route:** `/exhibit/correcting-search`

Pause while typing and the search bar replaces a word with a plausible but unwanted alternative. It preserves punctuation and inflection where possible, highlights the correction, and lets the visitor reject suggestions to recover the original query.

Hard offers more corrections and requires short explanations for rejection. Unmatched words remain searchable, and Fix it searches the entered text directly. Suggestions are generated locally without an external search service.

## Your Button Has Moved

**Route:** `/exhibit/layout-checkout`

Complete a fictional checkout while promotional offers, recommendations, and sales copy compete with the intended action. The checkout remains a simulation and never accepts a real order or payment.

Hard adds more personalized interruptions and less stable presentation. Fix it reserves space and keeps the checkout action predictable. Keyboard, touch, and reduced-motion alternatives remain available.

## The Layout Earthquake

**Route:** `/exhibit/layout-earthquake`

Find and open a library story in a newspaper layout while ads expand into its position. Early attempts insert sponsored blocks instead of opening the link, and live updates continue to shift the article.

On narrow screens, live placements expand and collapse together at viewport-scaled sizes, so their movements do not cancel out. The newspaper retains its scrollable height during updates to keep shrinking ads from silently holding the reader in place at the bottom. Reduced-motion users advance these changes manually.

Hard buries the story deeper, intercepts more attempts, and adds more aggressive layout changes. Dismissed ads can return. Fix it places the story first, opens it immediately, and reserves space so surrounding content remains stable.

## The Scroll-Through Modal

**Route:** `/exhibit/scroll-modal`

Choose a delivery option in a dialog where scrolling may move the checkout underneath instead. The deliberately poor offer compares very expensive two-day delivery with free three-day delivery.

Hard adds a third shipping-speed dialog and lets each gesture affect different layers, sometimes in opposite directions. Native scrollbars and labeled controls remain reliable. Fix it uses one normally scrolling dialog over a stationary page.

## The Validation Afterthought

**Route:** `/exhibit/validation-afterthought`

Register for a fictional open house using four fields. A failed submission reveals only the first unmet rule and clears the other answers, forcing requirements to be discovered one at a time.

Hard makes the error message less specific. Fix it shows requirements before submission, validates next to each field, and preserves valid input. All modes accept the same reachable solution, and nothing is submitted or stored.

## The Hover Dependency

**Route:** `/exhibit/hover-menu`

Navigate nested department menus to find a desk lamp's specifications. Pointer users must cross narrow safe corridors before the menus close; touch users work against submenu deadlines.

Hard adds another submenu and twisting paths. Repeated failures reveal a hold-open option, while keyboard navigation has no deadline and reduced motion enables the bypass automatically. Fix it uses persistent click-open menus.

## The Notification Fly Swatter

**Route:** `/exhibit/notification-swatter`

Complete a six-field form while fake in-page notifications multiply over it. Pause holds the swarm while answers are edited, and Swat one provides a reliable alternative to clicking individual alerts.

Hard spawns alerts faster and creates more after misses. Completion and navigation stop the swarm; Fix it removes alerts entirely. The exhibit never requests browser notification permission.

## The Tetris Volume Control

**Route:** `/exhibit/tetris-volume`

Move, rotate, and drop tetrominoes on a compact board. Settled cells control a pretend volume value, while completed rows disappear and can lower it again.

Hard accelerates gravity. The game can be paused, supports keyboard controls, and uses manual drops for reduced motion. Fix it restores a normal slider; the exhibit never plays audio or changes device volume.

## The Phone Number Casino

**Route:** `/exhibit/phone`

Roll and lock ten independent digits until they form the fictional target number `2025550107`. Progress depends on repeated chance rather than ordinary text entry.

Hard also rerolls and unlocks the digit to the left, making a right-to-left strategy more effective. Fix it provides conventional phone-number input.

## Terms & Conditions: The Game

**Route:** `/exhibit/terms-game`

Scroll through an 80-clause fictional agreement before taking an eight-question open-book exam. Acceptance unlocks only after every answer is correct, while declining is always available.

Hard doubles the agreement, adds questions, limits hints, and reshuffles the exam after wrong answers. Fix it offers a short summary and immediate accept or decline controls. No real agreement is created.

## The Font Buffet

**Route:** `/exhibit/fonts`

Edit a sentence whose words receive competing fonts, sizes, colors, and rotations. The apparent repair action simply remixes the disagreement.

Hard styles every character independently. Fix it uses consistent typography and a predictable editing experience.

## The Unix Birthday Picker

**Route:** `/exhibit/unix-birthday`

Choose a birthday by moving through Unix timestamps in milliseconds while a live UTC date preview translates the number. An alignment control snaps the current value to UTC midnight.

Hard removes the slider and expects a timestamp to be entered manually, while still explaining whether it represents a valid birthday. Fix it uses a native date field.

## The Cancellation Labyrinth

**Route:** `/exhibit/cancel`

Cancel a fictional subscription by navigating a sequence of double-negative confirmations. Each screen tests whether the visitor can determine which answer continues cancellation.

Hard adds checkpoints, more confusing language, shuffled button positions, and a reset after a wrong choice. Fix it provides one direct cancellation action.

## The Recipe Odyssey

**Route:** `/exhibit/recipe`

Read a long personal story and answer six comprehension questions before the toast recipe becomes available. The fake skip action leads to an advertisement instead.

Hard resets reading progress after wrong answers or skip attempts. Fix it presents the short recipe without the compulsory journey.

## The Expanding Form

**Route:** `/exhibit/expanding-form`

Fill out an ordinary contact form whose spacing grows exponentially with every character. Longer answers move later fields—and especially the submit button—farther away.

Hard makes the growth faster, raises its limits, and folds long sections of the form. Compress temporarily removes the gaps without deleting answers. Fix it keeps conventional spacing.

## The Radio Text Receiver

**Route:** `/exhibit/dropdown`

Tune a frequency dial to the exact station assigned to a letter, space, or punctuation mark. Receiving a character appends it to the message and resets the dial.

Hard reassigns station locations after every character. Undo removes mistakes, and Fix it restores a normal text box. The directory is informational rather than a shortcut.

## The Seismic Text Editor

**Route:** `/exhibit/seismic-editor`

Every edit shakes the writing area and adds stress. Rapid typing, pastes, and punctuation increase the risk that the sentence will collapse into letter tiles, though the exact input remains preserved.

Hard builds stress faster and shakes more strongly. Rebuild restores editing, reduced motion disables shaking and collapse, and Fix it behaves like a stable editor.

## The Volume Seesaw

**Route:** `/exhibit/volume-seesaw`

Place pebbles, bricks, and anvils on a wobbling beam whose angle controls a pretend volume slider. The setting can be held, or weights can be removed to rebalance it.

Hard introduces buoyant balloons and occasionally moves a weight to the opposite side. Reduced motion settles the beam immediately, and Fix it uses a normal slider. No audio or device setting is changed.

## The Windswept Volume Slider

**Route:** `/exhibit/wind-volume`

Drag a rotating vertical slider while simulated gusts continue moving its value. Saving shelters a narrow target range rather than merely accepting the current handle position.

Hard brings stronger gusts and may turn the control upside down. Keyboard input remains available, reduced motion freezes rotation while retaining interference, and Fix it provides a stable slider. No audio plays.

## The Checkbox Ecosystem

**Route:** `/exhibit/checkbox-ecosystem`

Selected preferences behave like living creatures: they lose health, wander around their habitat, and uncheck themselves if they are not fed. Save succeeds only when the requested combination is alive and selected.

Hard increases decay and lets fed preferences produce checked offspring. Pause freezes the habitat, reduced motion stops wandering, and Fix it provides stable independent checkboxes.

## The Password Crane Game

**Route:** `/exhibit/password-crane`

Steer an arcade claw across banks containing all 128 ASCII characters and drop selections into a fictional password. The target phrase is visible, and undo, return, and reset controls recover from mistakes.

Hard occasionally grabs a neighboring character. Keyboard controls cover movement, bank changes, and claw operation. Fix it uses a normal invented-password field; never enter real credentials.

## The Physics Shopping Cart

**Route:** `/exhibit/physics-cart`

Adding a fictional product starts a wheeled cart rolling downhill toward a pretend Buy now zone. More weight increases its cartoon acceleration, while braking, pulling back, pausing, and returning to the start preserve the basket.

Hard steepens the slope and adds a speed bump that disrupts the cart. Reduced motion keeps the gameplay consequence without the jump animation. Fix it uses a stationary basket and explicit simulated checkout.

## The Email Address Auction

**Route:** `/exhibit/email-auction`

Bid imaginary coins on printable characters, collect winning copies, and arrange them into a valid fictional email address. Characters can be filtered, bought more than once, returned, and reordered.

Hard raises prices and competition, especially for useful characters such as `@`. Restarting a lot preserves winnings, while a full reset starts over. Fix it uses a normal email field, and no address, money, or request leaves the browser.

## The Elevator Date Picker

**Route:** `/exhibit/elevator-date`

Ride to a year floor, then transfer to separate month and day elevators. Stops must be requested before the desired floor can be selected.

Hard uses express service that skips floors unless stopped at the right time. Travel pauses when the tab is hidden. Fix it uses a conventional date field.

## The Shrinking Unsubscribe Button

**Route:** `/exhibit/shrinking-unsubscribe`

Approaching the cancellation button makes it shrink and relocate. Touch interaction uses timed movement and evasive reactions instead of relying on pointer hover.

Both paths eventually exhaust the button's ability to escape, so cancellation remains possible. Hard shrinks sooner and moves more aggressively. Keyboard focus, reduced motion, and Fix it provide stable cancellation paths; only local demo state changes.

## The Dropdown Word Processor

**Route:** `/exhibit/word-editor`

Compose a document using a separate dropdown for every character, including spaces, punctuation, and line breaks. Existing characters can be replaced or deleted, and edits support undo and redo.

Hard reshuffles each menu after every edit. Fix it restores ordinary text entry.

## The Cookie Preference Overlay

**Route:** `/exhibit/cookies`

A miniature website hides behind an enormous Accept all button. Rejecting optional cookies requires navigating categories, vendors, and a final confirmation.

Hard adds absurd rejection-confirmation overlays. Fix it gives Accept, Reject, and Customize equal prominence and retains choices when preferences are reopened. This replaces the Cookie Switchboard at the existing route. The exhibit does not set real cookies.

## The Address Jigsaw

**Route:** `/exhibit/address-jigsaw`

Assemble the fictional address `42 Waffle Lane, Apt 7B, Cloud City, CA 90210` from shuffled pieces. Pieces can be placed with taps or the keyboard, returned from filled slots, or dragged to swap positions.

Hard adds decoy pieces and reshuffles the tray after edits. Fix it allows normal typing and pasting. Nothing is shipped or stored.

## The Retro Personal Homepage

**Route:** `/exhibit/retro`

Explore a deliberately broken personal homepage where navigation opens the wrong section, nickname input reverses itself, and the guestbook requires a cat CAPTCHA.

Hard replaces vowels, rearranges CAPTCHA tiles after each choice, and requires another round. Fix it restores dependable navigation and input.

## The AI Everything Store

**Route:** `/exhibit/ai-store`

Choose an ordinary spoon, umbrella, or rock, then complete unnecessary scripted AI onboarding before activating its fictional subscription.

Hard requires additional calibration rounds. Fix it sells the same objects with clear one-time prices. Responses are local scripts rather than output from an AI service.

## The Mystery Meat Menu

**Route:** `/exhibit/mystery-menu`

Navigate six unlabeled symbols with unhelpful tooltips to find a shipping policy and retrieve a fictional receipt.

Hard reshuffles the destinations after every navigation choice. Fix it supplies stable, descriptive labels.

## The Alphabet Shuffle

**Route:** `/exhibit/alphabet`

Use a slider containing a randomly ordered alphabet to select and append one character at a time. The visible preview always shows what the current action will add.

Easy reshuffles after each appended character; Hard also reshuffles after committed slider adjustments. Fix it uses ordinary text input.

## The Corporate Fog Machine

**Route:** `/exhibit/corporate`

Complete mandatory onboarding steps that generate more mandatory onboarding. Going backward discards progress, and the experience is intentionally open-ended.

Finishing the initial onboarding sequence counts as Easy completion before Hard continues the joke with more steps. Fix it presents a finite, direct process.

## The Loading Experience

**Route:** `/exhibit/loading`

Wait through ten fake progress stages—including backward progress near completion—to reveal one sentence. Loading can be cancelled, and timers stop on reset or navigation.

Hard interrupts the wait with approval prompts. Fix it reveals the sentence immediately.

## Before You Read Literally Anything

**Route:** `/exhibit/newsletter`

Read a short article without subscribing. A newsletter interrupts the headline, then returns at the next paragraph wearing a fake moustache.

Hard adds a bounded sequence of discounts, guilt trips, and last chances. Fix it puts a dismissible, optional invitation after the full article. No email is collected and no subscription is created.

## Shared behavior

Every exhibit includes a reset control, curator's note, and persistent mode toolbar. Completing Easy starts a short countdown to Hard; **Stay here** keeps the current result. Hard and Fix it do not advance automatically.

The museum's Exit, Reset, and Fix it controls remain trustworthy even when the exhibit is not. Tasks support keyboard operation and provide touch and reduced-motion behavior where relevant. Simulated orders, payments, subscriptions, messages, and personal details never leave the browser; use invented information in form-based exhibits.
