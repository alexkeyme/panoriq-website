import * as THREE from "three";

// ---------- POINT-CLOUD HERO ANIMATION ----------
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

  // Generate ~7000 points: a torus knot perturbed by noise.
  // Reads as a structured 3D scan — depth, layering, parallax.
  const COUNT = 7000;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);

  // Brand palette in linear space
  const cAccent = new THREE.Color(0x1fc4c4); // brand cyan
  const cDeep = new THREE.Color(0x0d4a4a); // deep teal
  const cMid = new THREE.Color(0x1f6b6b); // mid teal

  for (let i = 0; i < COUNT; i++) {
    const t = (i / COUNT) * Math.PI * 2;
    const p = 2;
    const q = 3;
    const r = 2 + Math.cos(q * t);
    let x = r * Math.cos(p * t);
    let y = r * Math.sin(p * t);
    let z = -Math.sin(q * t) * 1.4;

    // Scatter so it reads as a point cloud rather than a tidy curve
    const scatter = 0.55;
    x += (Math.random() - 0.5) * scatter * 2;
    y += (Math.random() - 0.5) * scatter * 2;
    z += (Math.random() - 0.5) * scatter;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Color gradient by depth
    const depth = (z + 2) / 4; // 0..1
    const c = new THREE.Color().lerpColors(cDeep, cAccent, depth);
    if (Math.random() < 0.15) c.lerp(cMid, 0.5);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.022,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
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

  // Pause when offscreen to save battery
  let inView = true;
  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
  }, { threshold: 0.01 });
  io.observe(canvas);

  function tick() {
    const dt = Math.min(clock.getDelta(), 0.05);

    if (inView) {
      if (!prefersReducedMotion) {
        points.rotation.y += dt * 0.08;
        points.rotation.x += dt * 0.03;
      }

      // Smoothed parallax
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      camera.position.x = mouse.x * 1.2;
      camera.position.y = -mouse.y * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

// ---------- SCROLL REVEAL ----------
(() => {
  const els = document.querySelectorAll("[data-reveal]");
  if (!els.length || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );
  els.forEach((el) => io.observe(el));
})();
