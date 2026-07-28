// CONFIG: Vimeo IDs for each video. Loaded by index.html and training.html.
const VIMEO_IDS = {
  glacier:      "1212004912",
  cloudCompare: "1200804594",
  pointCloud:   "1187686744",
  facade:       "1197400606",
  training:     "1213557993",
};
// Click-to-load Vimeo facade shared by each play button.
function initVimeoFacade(buttonId, vimeoId, title) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (!vimeoId) return;
    const wrapper = btn.parentElement;
    const iframe = document.createElement("iframe");
    iframe.src =
      `https://player.vimeo.com/video/${vimeoId}` +
      `?autoplay=1&title=0&byline=0&portrait=0&dnt=1&color=1FC4C4&outro=nothing`;
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.className = "absolute inset-0 w-full h-full";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("title", title);
    wrapper.replaceChild(iframe, btn);
    restoreFacadeOnEnd(wrapper, iframe, btn);
  });
}

// Free Vimeo accounts ignore outro=nothing and show a "More from" grid of other videos when
// playback finishes. Swapping the poster back in at the "ended" event replaces that grid, and
// leaves the click-to-load state exactly as it started. Talks to the player through its
// postMessage API, so no Vimeo script is loaded on the page.
function restoreFacadeOnEnd(wrapper, iframe, btn) {
  const ORIGIN = "https://player.vimeo.com";
  const post = (method) =>
    iframe.contentWindow.postMessage(JSON.stringify({ method, value: "ended" }), ORIGIN);

  function onMessage(event) {
    if (event.origin !== ORIGIN || event.source !== iframe.contentWindow) return;
    let data = event.data;
    if (typeof data === "string") {
      try { data = JSON.parse(data); } catch { return; }
    }
    if (data.event === "ready") post("addEventListener");
    if (data.event === "ended") {
      window.removeEventListener("message", onMessage);
      if (iframe.parentElement === wrapper) wrapper.replaceChild(btn, iframe);
    }
  }

  window.addEventListener("message", onMessage);
}

initVimeoFacade("demoPlayGlacier",      VIMEO_IDS.glacier,      "Panoriq glacier change demo");
initVimeoFacade("demoPlayCloudCompare", VIMEO_IDS.cloudCompare, "Panoriq CloudCompare integration demo");
initVimeoFacade("demoPlay",             VIMEO_IDS.pointCloud,   "Panoriq point-cloud demo");
initVimeoFacade("demoPlayFacade",       VIMEO_IDS.facade,       "Panoriq facade analysis demo");
initVimeoFacade("trainingPlay",         VIMEO_IDS.training,     "Three things you can try with Claude Code today");
