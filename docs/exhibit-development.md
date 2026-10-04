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

Each module exports exhibit records containing metadata, a `task` for the original and Hard modes, a `fixedTask` for Fix it, preview markup, a Hard-mode change summary, and a render function. The registry validates unique IDs, complete ordering, both tasks, previews, summaries, and render functions. Tasks say what to do and how to finish without solving the challenge for the visitor. They appear outside the simulated website. Fix it has its own task because some simulations replace the original interaction entirely.

Add a new exhibit to the appropriate behavior module and to `exhibitOrder` in `exhibits/registry.js`. Add it to `newExhibitIds` only while it should display the **New** badge. Do not duplicate catalog metadata elsewhere in application code.

Render functions receive:

```js
{ stage, mode, shuffle }
```

They must return a cleanup function. Cleanup should remove listeners, cancel timers and animation frames, and stop any work that could survive reset, navigation, or a mode change.

## Completion

Dispatch a bubbling event from the stage only when the exhibit's task is complete:

```js
stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
```

The shared page controller shows a one-shot, inline completion panel without changing mode, moving focus, or hiding the result. **Make it even worse** is the primary next action; **Fix it** is secondary. Hard completion offers the next exhibit. Invalid answers and intermediate milestones must not dispatch completion. For deliberately endless experiences, choose and document a clear milestone that represents success.

## Modes

- **Easy** should express the core bad-design idea while remaining completable.
- **Hard** should intensify that idea without becoming accidentally impossible. A deliberate impossibility must be part of the joke and clearly explained.
- **Fix it** should remove the obstacle instead of merely restyling it.

The museum labels Easy **Original disaster** and Hard **Make it even worse**. Modes are always available without completing a task. Mode changes and restart must restore initial state and cancel pending work. Restart preserves the selected mode; selecting the already-active mode does not restart the simulation. Direct links still use `?mode=hard` and `?mode=fixed`; omitted or unrecognized values open the original disaster.

## Interaction and accessibility

### Visitor-facing copy

Frame each exhibit around an experience visitors recognize before introducing the absurd change: entering a phone number, checking a CAPTCHA, cancelling a subscription, reading a recipe, or using a shopping basket. Explain technical terms in that context rather than assuming design or programming knowledge.

Keep the personality. This is not a requirement to flatten every sentence into plain language. Titles, previews, fictional sales pitches, and feedback can be playful, but instructions should establish the familiar task, the twist, and what to try. Describe mode changes concretely. Keep intentionally confusing text when it is the interaction itself, such as the cancellation questions, corporate jargon, or fictional legal agreement; explain that premise outside the challenge.

Keep museum navigation controls stable and outside exhibit interference. The labeled exhibit frame separates the simulation from the sticky museum toolbar. The inline first-visit guide can be dismissed and reopened; only its dismissal is remembered in session storage for the current tab. Visitor inputs are never stored. Provide keyboard operation, a usable touch path, and reduced-motion behavior for animated interactions. Hidden tabs and abandoned exhibits must not continue time-sensitive work.

Do not create browser traps, flashing effects, real purchases, real subscriptions, notification permission requests, device-volume changes, or external submission of visitor input. Clearly label fictional credentials and personal details, and never encourage visitors to enter real secrets.

## Previews

Gallery previews must communicate the exhibit's joke without requiring interaction. Interactive animation may enhance a preview, but its static state must remain understandable for reduced motion and share-image rendering. Keep previews within their card bounds at desktop and mobile widths.

After adding or changing an exhibit, update [the catalog](exhibits.md), regenerate or validate its share image, and run the smallest relevant checks described in [testing](testing.md).
