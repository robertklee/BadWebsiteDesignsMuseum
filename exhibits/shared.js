export function createStageShell(stage) {
  const status = '<div class="demo-status" role="status" id="extra-status"></div>';
  const say = text => { stage.querySelector("#extra-status").textContent = text; };
  const shell = (kicker, title, intro, content) => {
    stage.innerHTML = `<div class="new-demo"><span class="demo-kicker">${kicker}</span><h2>${title}</h2><p class="new-demo-intro">${intro}</p>${content}${status}<small class="simulation-note">Museum simulation only. Nothing is sent, purchased, saved, or played aloud.</small></div>`;
  };
  return { shell, say };
}

export function createDemoStatus() {
  const status = '<div class="demo-status" role="status" id="demo-status"></div>';
  const say = text => { document.querySelector("#demo-status").textContent = text; };
  return { status, say };
}
