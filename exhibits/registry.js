import { exhibits as formsExhibits } from "./forms-and-inputs.js";
import { exhibits as interactionExhibits } from "./interaction-and-simulation.js";
import { exhibits as contentExhibits } from "./content-and-navigation.js";
import { exhibits as commerceExhibits } from "./commerce-and-messaging.js";
import { exhibits as websiteExhibits } from "./website-behavior.js";

// The single ordered, validated source of truth for every exhibit. Each domain module
// contributes its own records (metadata + preview + render); this registry only orders,
// validates, and dispatches -- it owns no exhibit-specific content itself.
const exhibitOrder = [
  "cat-captcha",
  "runaway",
  "password-gym",
  "correcting-search",
  "layout-checkout",
  "layout-earthquake",
  "scroll-modal",
  "validation-afterthought",
  "hover-menu",
  "notification-swatter",
  "tetris-volume",
  "phone",
  "terms-game",
  "fonts",
  "unix-birthday",
  "cancel",
  "recipe",
  "expanding-form",
  "dropdown",
  "seismic-editor",
  "volume-seesaw",
  "wind-volume",
  "checkbox-ecosystem",
  "password-crane",
  "physics-cart",
  "email-auction",
  "elevator-date",
  "shrinking-unsubscribe",
  "word-editor",
  "cookies",
  "address-jigsaw",
  "retro",
  "ai-store",
  "mystery-menu",
  "alphabet",
  "corporate",
  "loading",
  "newsletter",
];

const newExhibitIds = new Set([
  "layout-earthquake",
  "scroll-modal",
  "validation-afterthought",
  "hover-menu",
  "layout-checkout",
]);

const allExhibits = [...formsExhibits, ...interactionExhibits, ...contentExhibits, ...commerceExhibits, ...websiteExhibits];

const exhibitsById = new Map(allExhibits.map(exhibit => [exhibit.id, exhibit]));
if (exhibitsById.size !== allExhibits.length) {
  throw new Error("Duplicate exhibit id detected across the domain modules.");
}
if (new Set(exhibitOrder).size !== exhibitOrder.length) {
  throw new Error("The collection order lists an exhibit more than once.");
}
if (exhibitOrder.length !== allExhibits.length) {
  throw new Error(`The collection order lists ${exhibitOrder.length} exhibits but ${allExhibits.length} are registered.`);
}
for (const id of exhibitOrder) {
  if (!exhibitsById.has(id)) throw new Error(`Unknown exhibit in collection order: ${id}`);
}
for (const exhibit of allExhibits) {
  if (!exhibitOrder.includes(exhibit.id)) throw new Error(`Exhibit ${exhibit.id} is missing from the collection order.`);
  if (!exhibit.worseChange) throw new Error(`Exhibit ${exhibit.id} needs a Worse-mode change summary.`);
  if (typeof exhibit.preview !== "string" || !exhibit.preview) throw new Error(`Exhibit ${exhibit.id} needs a preview.`);
  if (typeof exhibit.render !== "function") throw new Error(`Exhibit ${exhibit.id} needs a render function.`);
}

const catalog = exhibitOrder.map((id, index) => ({
  ...exhibitsById.get(id),
  number: String(index + 1).padStart(2, "0"),
  new: newExhibitIds.has(id),
}));
const catalogById = new Map(catalog.map(exhibit => [exhibit.id, exhibit]));

export function getCatalog() {
  return catalog;
}

export function getExhibit(id) {
  return catalogById.get(id);
}

export function getPreview(id) {
  return catalogById.get(id)?.preview;
}

export function renderExhibitContent({ id, stage, mode, shuffle }) {
  const exhibit = catalogById.get(id);
  if (!exhibit) return () => {};
  return exhibit.render({ stage, mode, shuffle }) || (() => {});
}
