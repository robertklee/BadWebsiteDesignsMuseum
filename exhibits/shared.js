export function createStageShell(stage) {
  const status = '<div class="demo-status" role="status" id="extra-status"></div>';
  const say = text => { stage.querySelector("#extra-status").textContent = text; };
  const shell = (kicker, title, intro, content) => {
    stage.innerHTML = `<div class="new-demo"><span class="demo-kicker">${kicker}</span><h2>${title}</h2><p class="new-demo-intro">${intro}</p>${content}${status}<small class="simulation-note">Just a demo. Nothing you enter is sent or stored, no purchases are made, and no audio plays.</small></div>`;
  };
  return { shell, say };
}

export function createDemoStatus() {
  const status = '<div class="demo-status" role="status" id="demo-status"></div>';
  const say = text => { document.querySelector("#demo-status").textContent = text; };
  return { status, say };
}

export function completeExhibit(stage, message, outcome = "success") {
  stage.dispatchEvent(new CustomEvent("exhibit-complete", {
    bubbles: true,
    detail: { message, outcome },
  }));
}

export function resetExhibit(stage) {
  stage.dispatchEvent(new CustomEvent("exhibit-reset", { bubbles: true }));
}

export function matchesDemoText(value, target) {
  return value.trim().toLowerCase() === target.toLowerCase();
}

export function downloadDemoFile(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
