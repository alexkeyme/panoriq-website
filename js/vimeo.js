// CONFIG: Vimeo IDs for each video. Loaded by index.html and training.html.
const VIMEO_IDS = {
  glacier:      "1212004912",
  cloudCompare: "1200804594",
  pointCloud:   "1187686744",
  facade:       "1197400606",
  // TODO: the workshop recording. An empty ID leaves the facade inert.
  training:     "",
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
      `?autoplay=1&title=0&byline=0&portrait=0&dnt=1&color=1FC4C4`;
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.className = "absolute inset-0 w-full h-full";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("title", title);
    wrapper.replaceChild(iframe, btn);
  });
}

initVimeoFacade("demoPlayGlacier",      VIMEO_IDS.glacier,      "Panoriq glacier change demo");
initVimeoFacade("demoPlayCloudCompare", VIMEO_IDS.cloudCompare, "Panoriq CloudCompare integration demo");
initVimeoFacade("demoPlay",             VIMEO_IDS.pointCloud,   "Panoriq point-cloud demo");
initVimeoFacade("demoPlayFacade",       VIMEO_IDS.facade,       "Panoriq facade analysis demo");
initVimeoFacade("trainingPlay",         VIMEO_IDS.training,     "Claude Code for geo data processing - workshop preview");
