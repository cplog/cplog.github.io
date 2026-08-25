// A garden that becomes a QR code — WebGL.
//
// The 2D version of this was drawn with flat fills and hand-tuned alpha bands,
// and it never looked like the thing it was imitating. Reading ThreeUI's own
// Sylva scene settled why: no imported models anywhere, just ShaderMaterial,
// procedural noise, fog, additive sprites and bloom. The gap was never craft
// in the drawing, it was the pipeline. Canvas 2D has no per-pixel shading, no
// depth buffer and no bloom, so no amount of tuning gets there.
//
// So: real WebGL, but only the parts that carry the look.
//
//   · One Points cloud, one ShaderMaterial. The morph happens on the GPU --
//     every vertex knows both its garden position and its QR module, and a
//     single uniform slides between them. Nothing is recomputed on the CPU.
//   · Glow comes from ADDITIVE blending against a soft radial sprite built in
//     the fragment shader, not from a post-processing bloom pass. Overlapping
//     sprites accumulate, which is what makes dense foliage read as lit. A
//     real bloom pass would need EffectComposer and two extra render targets
//     for an effect nobody would be able to pick out at this size.
//   · Fog is computed in the vertex shader and folded into alpha, so distance
//     costs nothing and far growth genuinely recedes.
//
// The QR itself is never rendered in WebGL. Additive soft sprites are the
// opposite of what a camera needs, so the crisp code is drawn on a plain 2D
// canvas stacked on top, and the two cross-fade. The pretty half and the
// functional half are kept apart on purpose.

import {
  Scene, PerspectiveCamera, WebGLRenderer, BufferGeometry, BufferAttribute,
  Points, ShaderMaterial, AdditiveBlending, Color,
} from "three";
import { SIZE, BITS } from "./qr.js";

const QUIET = 4;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const rnd = (i) => {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/* Muted greens carry the mass; warm tones are rationed to the flowers. These
   are additive, so they read lighter on screen than they look here. */
const PAL = {
  deep: [0.26, 0.44, 0.20], mid: [0.40, 0.62, 0.28], lit: [0.58, 0.82, 0.40],
  sun: [0.76, 0.96, 0.54], grass: [0.30, 0.52, 0.22], grassLit: [0.46, 0.72, 0.32],
  bark: [0.62, 0.44, 0.26], barkDark: [0.44, 0.31, 0.19],
  coral: [1.00, 0.44, 0.30], amber: [1.00, 0.70, 0.24], rose: [0.94, 0.40, 0.54],
  pale: [0.92, 0.92, 0.82],
};

function qrTargets() {
  const out = [];
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++)
      if (BITS[y * SIZE + x] === "1") out.push([x, y]);
  return out;
}

/** The scene. Ground at y=-0.86, everything in -1..1. */
function build(n) {
  const P = [];
  const G = -0.86;
  const put = (x, y, z, c, size, glow) => P.push([x, y, z, c, size, glow]);

  const TREES = [
    { x: -0.74, z:  0.06, h: 0.72, r: 0.29 },
    { x: -0.16, z: -0.26, h: 0.98, r: 0.40 },
    { x:  0.42, z:  0.14, h: 0.80, r: 0.33 },
    { x:  0.88, z: -0.04, h: 0.58, r: 0.24 },
  ];

  for (let i = 0; i < Math.round(n * 0.10); i++) {          // soil
    const a = rnd(i) * 6.2832, r = Math.sqrt(rnd(i + 91)) * 1.06;
    put(Math.cos(a) * r, G + rnd(i + 17) * 0.02, Math.sin(a) * r,
        rnd(i + 5) > 0.7 ? PAL.barkDark : PAL.bark, 0.5, 0.3);
  }
  // NB: three sprites per blade, so the loop count is the share DIVIDED by
  // three. Iterating the full share here spent 60% of the budget on grass,
  // overflowed the total to ~140%, and slice(0, n) then silently dropped
  // whatever was built last -- which was two of the four tree canopies.
  for (let i = 0; i < Math.round(n * 0.18 / 3); i++) {       // grass
    const a = rnd(i + 200) * 6.2832, r = Math.sqrt(rnd(i + 300)) * 1.04;
    const bx = Math.cos(a) * r, bz = Math.sin(a) * r;
    const hgt = 0.05 + rnd(i + 400) * 0.11, lean = (rnd(i + 500) - 0.5) * 0.06;
    // three points up each blade: a stroke made of sprites, so it still reads
    // as a blade but every piece of it can glow and be fogged independently
    for (let k = 1; k <= 3; k++) {
      const u = k / 3;
      put(bx + lean * u * u, G + hgt * u, bz,
          rnd(i + 600) > 0.5 ? PAL.grass : PAL.grassLit, 0.55 + u * 0.25, 0.35 + u * 0.4);
    }
  }
  const tp = Math.round(n * 0.10 / TREES.length);           // trunks
  TREES.forEach((t, ti) => {
    for (let i = 0; i < tp; i++) {
      const k = i / tp, j = ti * 1000 + i, w = 0.026 * (1 - k * 0.5);
      put(t.x + (rnd(j) - 0.5) * w, G + k * t.h, t.z + (rnd(j + 7) - 0.5) * w,
          rnd(j + 3) > 0.55 ? PAL.bark : PAL.barkDark, 0.95, 0.55);
    }
  });
  // Canopy: clumped, not evenly spread over a shell. Real crowns are lumpy,
  // and clumping is also what lets additive blending pile up into bright cores
  // instead of an even wash.
  const cp = Math.round(n * 0.44 / TREES.length);
  TREES.forEach((t, ti) => {
    const hy = G + t.h + t.r * 0.16;
    const CLUMPS = 9;
    for (let i = 0; i < cp; i++) {
      const j = ti * 2000 + i;
      const cl = i % CLUMPS;
      const cu = rnd(ti * 77 + cl) * 2 - 1, ca = rnd(ti * 91 + cl + 3) * 6.2832;
      const cs = Math.sqrt(1 - cu * cu);
      const cr = t.r * (0.34 + rnd(ti * 55 + cl) * 0.42);
      const bx = t.x + cs * Math.cos(ca) * cr;
      const by = hy + cu * cr * 0.62;
      const bz = t.z + cs * Math.sin(ca) * cr;
      const sp = t.r * 0.40;
      const px = bx + (rnd(j) - 0.5) * sp;
      const py = by + (rnd(j + 3) - 0.5) * sp * 0.8;
      const pz = bz + (rnd(j + 7) - 0.5) * sp;
      const lit = ((px - t.x) * -1 + (py - hy) * 1.4) / t.r * 0.5 + 0.5;
      const c = lit > 0.72 ? PAL.sun : lit > 0.52 ? PAL.lit : lit > 0.3 ? PAL.mid : PAL.deep;
      put(px, py, pz, c, 0.7 + rnd(j + 11) * 0.7, 0.45 + lit * 0.55);
    }
  });
  const beds = 6, per = Math.round((n * 0.15) / beds / 4);  // flowerbeds
  for (let b = 0; b < beds; b++) {
    const a = rnd(b + 700) * 6.2832, r = 0.44 + rnd(b + 800) * 0.56;
    const cx = Math.cos(a) * r, cz = Math.sin(a) * r;
    const hue = [PAL.coral, PAL.amber, PAL.rose, PAL.coral][b % 4];
    for (let i = 0; i < per; i++) {
      const j = b * 300 + i;
      const fx = cx + (rnd(j) - 0.5) * 0.32, fz = cz + (rnd(j + 9) - 0.5) * 0.32;
      const fh = 0.11 + rnd(j + 19) * 0.15;
      put(fx, G + fh * 0.5, fz, PAL.grass, 0.5, 0.3);
      for (let k = 0; k < 3; k++) {
        const pa = (k / 3) * 6.2832 + rnd(j) * 3;
        put(fx + Math.cos(pa) * 0.035, G + fh, fz + Math.sin(pa) * 0.035, hue, 0.9, 1.0);
      }
    }
  }
  for (let i = 0; i < Math.round(n * 0.03); i++) {          // pollen
    put((rnd(i + 900) - 0.5) * 2, G + 0.45 + rnd(i + 950) * 0.85,
        (rnd(i + 990) - 0.5) * 2, PAL.pale, 0.5, 0.9);
  }
  while (P.length < n) {
    const i = P.length;
    put((rnd(i) - 0.5) * 2, G + rnd(i + 2) * 0.08, (rnd(i + 5) - 0.5) * 2, PAL.grass, 0.55, 0.35);
  }
  return P.slice(0, n);
}

const VERT = `
  attribute vec3 aQR;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aGlow;
  attribute float aSeed;
  uniform mediump float uT;
  uniform float uTime;
  uniform float uScale;
  varying vec3 vColor;
  varying float vGlow;
  varying float vFog;

  void main() {
    // a slow idle sway, fading out as the scene folds into the code
    vec3 g = position;
    float sway = (1.0 - uT) * 0.02;
    g.x += sin(uTime * 0.6 + aSeed * 6.28) * sway * (g.y + 1.0);
    g.z += cos(uTime * 0.5 + aSeed * 5.13) * sway * (g.y + 1.0);

    vec3 p = mix(g, aQR, uT);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // fog in the vertex shader: distance costs nothing and far growth recedes
    float d = -mv.z;
    vFog = 1.0 - clamp((d - 2.0) / 2.6, 0.0, 0.72);
    vFog = mix(vFog, 1.0, uT);

    vColor = aColor;
    vGlow = aGlow;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uScale * (1.0 + uT * 0.7) / max(0.35, d);
  }
`;

const FRAG = `
  precision mediump float;
  varying vec3 vColor;
  varying float vGlow;
  varying float vFog;
  uniform mediump float uT;

  void main() {
    // soft radial sprite, made in the shader -- no texture to load, and the
    // falloff is what lets overlapping sprites accumulate into a bright core
    vec2 d = gl_PointCoord - 0.5;
    float r = length(d);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.06, r);
    a *= a;

    // the glow term is additive headroom: bright elements push past 1.0 where
    // they overlap, which is where the bloom-like core comes from
    vec3 c = vColor * (0.30 + vGlow * 0.42);
    // colour drains as the garden becomes the code
    c = min(c, vec3(0.82));
    c = mix(c, vec3(0.0), uT);
    gl_FragColor = vec4(c, a * vFog * (1.0 - uT * 0.55));
  }
`;

export class Garden {
  constructor(glCanvas, flatCanvas) {
    this.gl = glCanvas;
    this.flat = flatCanvas;
    this.fx = flatCanvas.getContext("2d");
    this.t = 0; this.target = 0; this.raf = 0; this.clock = 0;
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mods = qrTargets();
    this.mods = mods;
    const n = (this.n = mods.length);
    const pts = build(n);

    // pair by angle around each set's centroid, so the swarm unwinds rather
    // than every element crossing the frame
    const byAngle = (arr, cx, cy, get) =>
      arr.map((p, i) => { const [x, y] = get(p); return { i, a: Math.atan2(y - cy, x - cx) }; })
         .sort((u, v) => u.a - v.a).map((o) => o.i);
    const gi = byAngle(pts, 0, -0.25, (p) => [p[0], p[1]]);
    const qi = byAngle(mods, (SIZE - 1) / 2, (SIZE - 1) / 2, (p) => [p[0], -p[1]]);

    const pos = new Float32Array(n * 3), qr = new Float32Array(n * 3);
    const col = new Float32Array(n * 3), size = new Float32Array(n);
    const glow = new Float32Array(n), seed = new Float32Array(n);
    // QR modules live in the same world space, sized so the code fills the view
    const span = 1.72, cell = span / SIZE;
    for (let k = 0; k < n; k++) {
      const p = pts[gi[k]], q = mods[qi[k]];
      pos[k * 3] = p[0]; pos[k * 3 + 1] = p[1]; pos[k * 3 + 2] = p[2];
      qr[k * 3] = -span / 2 + (q[0] + 0.5) * cell;
      qr[k * 3 + 1] = span / 2 - (q[1] + 0.5) * cell;
      qr[k * 3 + 2] = 0;
      col[k * 3] = p[3][0]; col[k * 3 + 1] = p[3][1]; col[k * 3 + 2] = p[3][2];
      size[k] = p[4]; glow[k] = p[5]; seed[k] = rnd(k * 13 + 7);
    }

    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(pos, 3));
    geo.setAttribute("aQR", new BufferAttribute(qr, 3));
    geo.setAttribute("aColor", new BufferAttribute(col, 3));
    geo.setAttribute("aSize", new BufferAttribute(size, 1));
    geo.setAttribute("aGlow", new BufferAttribute(glow, 1));
    geo.setAttribute("aSeed", new BufferAttribute(seed, 1));

    this.mat = new ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { uT: { value: 0 }, uTime: { value: 0 }, uScale: { value: 300 } },
      transparent: true, depthWrite: false, blending: AdditiveBlending,
    });

    this.scene = new Scene();
    this.cloud = new Points(geo, this.mat);
    this.scene.add(this.cloud);
    this.cam = new PerspectiveCamera(46, 1, 0.1, 20);
    this.cam.position.set(0, 0.10, 2.55);
    this.cam.lookAt(0, -0.06, 0);

    try {
      this.r = new WebGLRenderer({ canvas: glCanvas, antialias: true, alpha: true });
    } catch (e) { this.failed = true; return; }
    this.r.setClearColor(new Color(0, 0, 0), 0);

    this.resize();
    this._on = () => this.resize();
    addEventListener("resize", this._on, { passive: true });
    if (this.reduced) { this.t = this.target = 1; this.render(); } else this.start();
  }

  resize() {
    const box = this.gl.parentElement.getBoundingClientRect();
    if (!box.width) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.w = box.width; this.h = box.height;
    this.r.setPixelRatio(dpr);
    this.r.setSize(this.w, this.h, false);
    this.cam.aspect = this.w / this.h;
    this.cam.updateProjectionMatrix();
    // gl_PointSize is in device pixels, so the dpr belongs in the scale. The
    // first pass used 0.62 and every sprite came out ~15px, which additively
    // blended the whole scene into a white cloud.
    this.mat.uniforms.uScale.value = Math.min(this.w, this.h) * 0.052 * dpr;

    this.flat.width = Math.round(this.w * dpr);
    this.flat.height = Math.round(this.h * dpr);
    this.fx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // the quiet zone must fit inside the frame or the code will not scan
    this.cell = Math.min(this.w, this.h) / (SIZE + QUIET * 2);
    const side = this.cell * SIZE;
    this.ox = (this.w - side) / 2;
    this.oy = (this.h - side) / 2;
    this.render();
  }

  to(v) { this.target = v; this.start(); }

  start() {
    if (this.raf || this.reduced || this.failed) return;
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      this.clock += dt;
      this.t += (this.target - this.t) * Math.min(1, dt * 5.5);
      if (Math.abs(this.target - this.t) < 0.0015) this.t = this.target;
      if (this.t < 0.995) this.cloud.rotation.y += dt * 0.16 * (1 - this.t);
      this.render();
      // a settled code is a still image and costs no frames
      this.raf = this.t === 1 && this.target === 1 ? 0 : requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  destroy() { cancelAnimationFrame(this.raf); removeEventListener("resize", this._on); }

  render() {
    if (this.failed || !this.w) return;
    const t = clamp(this.t, 0, 1);
    this.mat.uniforms.uT.value = t;
    this.mat.uniforms.uTime.value = this.clock;
    this.r.render(this.scene, this.cam);

    // The scannable half. Additive soft sprites are the opposite of what a
    // camera wants, so past 88% the crisp code takes over on its own canvas.
    const crisp = clamp((t - 0.88) / 0.12, 0, 1);
    this.fx.clearRect(0, 0, this.w, this.h);
    if (crisp <= 0) return;
    // The code needs a white ground to scan against, and the garden needs a
    // dark one for additive light to accumulate. So the panel resolves from
    // one to the other: the white card is painted here, over the fading
    // garden, and the modules go on top of it.
    this.fx.globalAlpha = crisp;
    this.fx.fillStyle = "#fff";
    this.fx.fillRect(0, 0, this.w, this.h);
    this.fx.fillStyle = "#000";
    const c = Math.ceil(this.cell);
    for (const [mx, my] of this.mods)
      this.fx.fillRect(Math.floor(this.ox + mx * this.cell), Math.floor(this.oy + my * this.cell), c, c);
    this.fx.globalAlpha = 1;
  }
}
