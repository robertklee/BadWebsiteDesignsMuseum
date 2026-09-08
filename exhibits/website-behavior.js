import { createStageShell } from "./shared.js";

export const exhibits = [
  { id: "validation-afterthought", name: "The Validation Afterthought", category: "Forms", color: "blue", tagline: "Four fields. One error. Start over.", description: "Hidden registration rules arrive one rejection at a time, taking your answers with them.", lesson: "The form knew the requirements all along. Apparently that information was on a need-to-fail basis.", fix: "Requirements are visible, errors belong to their fields, and your other answers stay put.", worseChange: "Useful guidance has been replaced by one cryptic complaint.", preview: `<div class="new-preview preview-web-validation"><span>REGISTRATION UNSUCCESSFUL</span><div>Name: __________<br>Email: __________</div><strong>Something is wrong.</strong><small>Your other answers have been cleared.</small></div>`, render: renderValidationAfterthought },
];

function renderValidationAfterthought({ stage, mode }) {
  const fixed = mode === "fixed";
  const worse = mode === "worse";
  const { shell, say } = createStageShell(stage);
  const fields = [
    { id: "name", label: "Guest name", rule: "Use at least two words, such as Alex Example.", valid: value => value.trim().split(/\s+/).length >= 2 },
    { id: "email", label: "Demo email", rule: "Use an address ending in .test, such as alex@example.test.", valid: value => /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.test$/i.test(value.trim()) },
    { id: "reference", label: "Booking reference", rule: "Use EVT- followed by exactly four digits, such as EVT-2048.", valid: value => /^EVT-\d{4}$/.test(value) },
    { id: "seats", label: "Seats", rule: "Use a single digit from 1 to 4.", valid: value => /^[1-4]$/.test(value) },
  ];
  shell("OPEN HOUSE / GUEST REGISTRATION", "Reserve your imaginary place.", "Register for a fictional studio open house. Use invented details only.",
    `<div class="web-demo registration-site"><header class="web-masthead">STUDIO OPEN HOUSE <small>SATURDAY / ADMISSION IS FICTIONAL</small></header><form id="afterthought-form" novalidate autocomplete="off"><div id="registration-error" class="registration-error" role="alert" hidden></div>${fields.map(field => `<div class="registration-field"><label for="registration-${field.id}">${field.label}</label><input id="registration-${field.id}" name="${field.id}" type="text" maxlength="100" ${fixed ? `aria-describedby="rule-${field.id} error-${field.id}"` : ""}><small id="rule-${field.id}" ${fixed ? "" : "hidden"}>${field.rule}</small><span class="registration-field-error" id="error-${field.id}"></span></div>`).join("")}<button class="demo-button" type="submit">Reserve demo place</button></form></div>`);
  const form = stage.querySelector("form");
  const banner = stage.querySelector("#registration-error");
  let complete = false;
  const mark = field => {
    const input = form.elements.namedItem(field.id);
    const valid = field.valid(input.value);
    input.setAttribute("aria-invalid", String(!valid));
    stage.querySelector(`#error-${field.id}`).textContent = valid ? "" : field.rule;
    return valid;
  };
  if (fixed) fields.forEach(field => form.elements.namedItem(field.id).addEventListener("input", () => mark(field)));
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (complete) return;
    const invalid = fields.find(field => !field.valid(form.elements.namedItem(field.id).value));
    if (invalid) {
      if (fixed) {
        fields.forEach(mark);
        form.elements.namedItem(invalid.id).focus();
      } else {
        const rejected = form.elements.namedItem(invalid.id).value;
        form.reset();
        form.elements.namedItem(invalid.id).value = rejected;
        banner.hidden = false;
        banner.textContent = `${worse ? "Registration unsuccessful." : `${invalid.label} rejected.`} ${invalid.rule} Other answers have been cleared.`;
        if (!worse) form.elements.namedItem(invalid.id).focus();
        say("Registration not submitted. Your other answers were discarded.");
      }
      return;
    }
    complete = true;
    banner.hidden = true;
    form.querySelector("button").disabled = true;
    say("Your fictional place is reserved. Nothing was sent or stored.");
    stage.dispatchEvent(new Event("exhibit-complete", { bubbles: true }));
  });
  return () => {};
}
