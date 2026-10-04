# Exhibit development

## Architecture

`app.js` owns routing, the first-visit guide, shared page chrome, mode changes, and completion actions. Exhibit implementations live in behavior-based modules:

- `exhibits/forms-and-inputs.js`
- `exhibits/interaction-and-simulation.js`
- `exhibits/content-and-navigation.js`
- `exhibits/commerce-and-messaging.js`
- `exhibits/website-behavior.js`

`exhibits/shared.js` contains reusable rendering helpers. `exhibits/registry.js` is the ordered source of truth for the collection and dispatches rendering.

## Exhibit records

Each module exports exhibit records containing metadata, a `task` for the original and Hard modes, a `fixedTask` for Fix it, preview markup, a Hard-mode hint (`worseChange`), and a render function. The registry validates unique IDs, complete ordering, both tasks, previews, hints, and render functions. Tasks say what to do and how to finish without solving the challenge for the visitor or narrating upcoming obstacles. They appear outside the simulated website. Fix it has its own task because some simulations replace the original interaction entirely.

Add a new exhibit to the appropriate behavior module and to `exhibitOrder` in `exhibits/registry.js`. Add it to `newExhibitIds` only while it should display the **New** badge. Do not duplicate catalog metadata elsewhere in application code.

Render functions receive:

```js
{ stage, mode, shuffle }
```

They must return a cleanup function. Cleanup should remove listeners, cancel timers and animation frames, and stop any work that could survive reset, navigation, or a mode change.

## Completion

Use the shared helper only when the exhibit's task is complete:

```js
import { completeExhibit, resetExhibit } from "./shared.js";

completeExhibit(stage, "Draft ready: Meet at six.");
```

The helper dispatches a bubbling `exhibit-complete` event with a result message and outcome. The shared page controller shows a one-shot, inline completion panel and dismissible notification without changing mode, moving focus, or hiding the result. **Make it even worse** is the primary next action; **Fix it** is secondary. Hard completion offers the next exhibit. Invalid answers and intermediate milestones must not dispatch completion. Deliberately impossible endpoints use `completeExhibit(stage, message, "blocked")` and say **Goal blocked**, not **Task complete**. For deliberately endless experiences, choose and document a clear milestone that represents success.

Lock accepted forms and their editing controls so later edits cannot contradict the recorded result. Keep explicit retry controls available. A local retry must reset its own completion flags and restore appropriate controls, then call `resetExhibit(stage)`. The bubbling `exhibit-reset` event clears the shared completed marker, result text, and notification and re-arms completion for the next attempt. Merely dismissing a result must not reset it. Resuming a completed Tetris game or releasing a held Seesaw volume starts a new tracked attempt while retaining the stack or weights.

## Modes

- **Easy** should express the core bad-design idea while remaining completable.
- **Hard** should intensify that idea without becoming accidentally impossible. A deliberate impossibility must be part of the joke and clearly explained at its blocked endpoint, never presented as success.
- **Fix it** should remove the obstacle instead of merely restyling it.

The museum labels Easy **Original disaster** and Hard **Make it even worse**. Modes are always available without completing a task. Mode changes and restart must restore initial state, clear progress, and cancel pending work; disclose this behavior in the visitor instructions. Restart preserves the selected mode; selecting the already-active mode does not restart the simulation. Direct links still use `?mode=hard` and `?mode=fixed`; omitted or unrecognized values open the original disaster.

## Interaction and accessibility

### Visitor-facing copy

Explain the ordinary experience in plain language before offering one playful hint: entering a phone number, passing a website's human check, cancelling a subscription, reading a recipe, or using a shopping basket. Visitors should not need design or programming knowledge. Prefer "pop-up" to "modal" and "checking answers" to "validation"; briefly define technical terms when they are needed to operate a control. Longer explanations, such as how timestamps count milliseconds, belong in optional help beside that control.

Give each layer a distinct job. Collection descriptions establish familiar context; taglines offer a short hint. Tasks state the exact outcome, including required text, dates, quantities, or volume ranges. Demo introductions provide the context and basic operating instructions without announcing hidden escalation, surprise charges, solutions, or blocked endings. `worseChange` hints at increased difficulty instead of listing every Hard-mode trick. The collapsed curator's note and optional control help can explain the mechanics in full.

Keep the personality. This is not a requirement to flatten every sentence into plain language. Titles, previews, fictional sales pitches, and feedback can be playful. Keep intentionally confusing text when it is the interaction itself, such as the cancellation questions, corporate jargon, or fictional legal agreement. Safety warnings, keyboard/touch instructions, reduced-motion behavior, recovery controls, and the fact that switching modes clears progress must remain explicit and trustworthy; do not hide practical guidance to protect a joke.

Let the museum framing establish the satire. Tasks, buttons, previews, and results should speak naturally within each exhibit rather than repeatedly saying "demo," "fictional," "pretend," or "nothing was sent." Keep a brief made-up-details reminder in the first-visit guide, specific password warnings beside credential puzzles, a non-binding label on the terms, and limitations inside downloadable tickets and receipts. Report what the visitor achieved or what blocked them; do not append a generic disclaimer to every result.

Keep museum navigation controls stable and outside exhibit interference. The labeled exhibit frame separates the simulation from the sticky museum toolbar. The inline first-visit guide can be dismissed and reopened; only its dismissal is remembered in session storage for the current tab. Visitor inputs are never stored. Provide keyboard operation, a usable touch path, and reduced-motion behavior for animated interactions. Hidden tabs and abandoned exhibits must not continue time-sensitive work.

**Jump into the exhibit** focuses the stage while keeping the mission visible below the measured sticky toolbar. Escape exits only while focus is within the museum toolbar; respect local Escape handlers, prevented events, composition, and modifier keys. Exhibit inputs must not lose drafts to a global Escape shortcut.

Modal exhibits must contain focus and provide a safe route back to museum controls. Close the local dialog and restore any inert content before dispatching `stage.dispatchEvent(new CustomEvent("museum-controls", { bubbles: true }))`. The shell reveals the toolbar and focuses the selected mode without activating it, clearing progress, or completing the task. Local Escape dismissal must not accept an offer or silently resolve an unfinished negotiation.

Do not create browser traps, flashing effects, real purchases, real subscriptions, notification permission requests, device-volume changes, or external submission of visitor input. Provide supplied targets or recommend made-up personal details, and never encourage visitors to enter real secrets.

## Previews

Gallery previews must communicate the exhibit's premise without revealing its full payoff. Hint at the interface's attitude rather than showing the final failed order, a backward-progress reveal, or the exact unexpected rule. Interactive animation may enhance a preview, but its static state must remain understandable for reduced motion and share-image rendering. Keep previews within their card bounds at desktop and mobile widths.

After adding or changing an exhibit, update [the catalog](exhibits.md), regenerate or validate its share image, and run the smallest relevant checks described in [testing](testing.md).
