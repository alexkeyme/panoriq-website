import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG: drop your Vimeo video ID here once the demo is uploaded.
// Find it at the end of your Vimeo URL, e.g. https://vimeo.com/123456789 → "123456789"
// Leave as "" while you don't have a video yet — the play button will warn in console.
const VIMEO_ID = "1187686744";
// ─────────────────────────────────────────────────────────────────────────────

// Click-to-load Vimeo facade for the demo section.
// Why a facade? It avoids loading Vimeo's player JS on initial page load
// (faster paint, no third-party tracking until the user actually clicks play).
(() => {
  const btn = document.getElementById("demoPlay");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (!VIMEO_ID) {
      console.info("[panoriq] Set VIMEO_ID at the top of js/main.js to enable the demo.");
      return;
    }
    const wrapper = btn.parentElement;
    const iframe = document.createElement("iframe");
    iframe.src =
      `https://player.vimeo.com/video/${VIMEO_ID}` +
      `?autoplay=1&title=0&byline=0&portrait=0&dnt=1&color=1FC4C4`;
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.className = "absolute inset-0 w-full h-full";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("title", "Panoriq demo");
    wrapper.replaceChild(iframe, btn);
  });
})();

// Ambient point-cloud background for the hero.
// Tuned to sit behind the brand grid + wave-mark without competing.
(() => {
  const canvas = document.getElementById("point-cloud");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  // ~6500 points sampled from a torus knot + scatter.
  // Reads as a structured 3D scan with depth, layering, and parallax.
  const COUNT = 6500;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);

  // Brand palette
  const cAccent = new THREE.Color(0x1fc4c4); // brand cyan
  const cMid = new THREE.Color(0x1f6b6b);    // mid teal
  const cDeep = new THREE.Color(0x0d4a4a);   // deep teal

  for (let i = 0; i < COUNT; i++) {
    const t = (i / COUNT) * Math.PI * 2;
    const p = 2;
    const q = 3;
    const r = 2 + Math.cos(q * t);
    let x = r * Math.cos(p * t);
    let y = r * Math.sin(p * t);
    let z = -Math.sin(q * t) * 1.4;

    const scatter = 0.55;
    x += (Math.random() - 0.5) * scatter * 2;
    y += (Math.random() - 0.5) * scatter * 2;
    z += (Math.random() - 0.5) * scatter;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const depth = (z + 2) / 4;
    const c = new THREE.Color().lerpColors(cDeep, cAccent, depth);
    if (Math.random() < 0.18) c.lerp(cMid, 0.5);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.018,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Mouse parallax
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener("mousemove", (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 0.6;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 0.4;
  }, { passive: true });

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();

  // Pause when offscreen
  let inView = true;
  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
  }, { threshold: 0.01 });
  io.observe(canvas);

  function tick() {
    const dt = Math.min(clock.getDelta(), 0.05);

    if (inView) {
      if (!prefersReducedMotion) {
        points.rotation.y += dt * 0.07;
        points.rotation.x += dt * 0.025;
      }

      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      camera.position.x = mouse.x * 1.0;
      camera.position.y = -mouse.y * 0.7;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  }
  tick();
})();
