// A garden that becomes a QR code.
//
// One set of 1433 points, two arrangements. At rest they are a small 3D garden
// -- soil, grass, four trees, flowerbeds, drifting pollen -- turning slowly
// under a weak perspective. On hover or tap they fly to the centres of the
// QR's dark modules, the scene flattens, and the colour drains to black.
//
// Colour is contained: it lives inside the framed scene and never leaks into
// the page around it, which is what lets a garden sit inside a monochrome
// document without wrecking it. It also has a job -- the garden is alive and
// the code is not, so draining the colour *is* the transition.
//
// Three decisions carry the whole thing:
//
//   1. The particles never *are* the QR. They travel to its module grid, and
//      the last stretch cross-fades into crisply drawn squares. Soft dots with
//      antialiased edges do not scan, and a pretty morph that cannot be read is
//      a failure rather than a trade.
//
//   2. Points are paired to modules by angle around each set's centroid. Pair
//      by index and every particle crosses the frame, which reads as noise; a
//      radial unwind keeps neighbours together and reads as one object folding.
//
//   3. Colours are quantised into buckets and drawn bucket by bucket. 1433
//      per-particle `fillStyle` writes per frame is the difference between
//      60fps and a slideshow.

import { SIZE, BITS } from "./qr.js";

const QUIET = 4;               // modules of mandatory clear margin around a QR
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// deterministic noise, so it is the same garden on every load
const rnd = (i) => {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/* ── palette ───────────────────────────────────────────────────────────────
   Muted and slightly desaturated: this sits next to black text on white, and
   a saturated garden would read as a toy. Greens carry the mass, warm tones
   are rationed to the flowers so the eye has somewhere to land. */
const PALETTE = [
  [ 74,  92,  62], // deep foliage
  [ 96, 118,  74], // mid foliage
  [124, 146,  92], // light foliage
  [148, 166, 112], // sunlit leaf
  [ 92, 106,  70], // grass
  [116, 132,  82], // grass, lit
  [107,  84,  62], // trunk
  [ 84,  66,  50], // trunk, shaded
  [196, 112,  86], // coral flower
  [206, 152,  74], // amber flower
  [178, 104, 122], // rose flower
  [212, 206, 190], // pale flower / pollen
];

function qrTargets() {
  const out = [];
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++)
      if (BITS[y * SIZE + x] === "1") out.push([x, y]);
  return out;
}

/** The scene, in normalised space: x,z in -1..1, y up, ground at -0.86. */
function garden(n) {
  const P = [];                                   // [x, y, z, paletteIndex]
  const G = -0.86;
  const push = (x, y, z, c) => P.push([x, y, z, c]);

  const TREES = [
    { x: -0.60, z:  0.24, h: 0.86, r: 0.32, tilt: -0.04 },
    { x:  0.10, z: -0.46, h: 1.02, r: 0.42, tilt:  0.03 },
    { x:  0.66, z:  0.34, h: 0.72, r: 0.27, tilt:  0.05 },
    { x: -0.18, z:  0.62, h: 0.54, r: 0.21, tilt: -0.02 },
  ];

  // soil: a scattered ellipse, denser toward the middle
  for (let i = 0; i < Math.round(n * 0.14); i++) {
    const a = rnd(i) * Math.PI * 2, r = Math.sqrt(rnd(i + 91)) * 1.08;
    push(Math.cos(a) * r, G + rnd(i + 17) * 0.03, Math.sin(a) * r, rnd(i + 5) > 0.7 ? 7 : 6);
  }
  // grass: short blades, not dots -- a blade is 3 points climbing and leaning,
  // which is what stops the ground reading as static noise
  const blades = Math.round(n * 0.16 / 3);
  for (let i = 0; i < blades; i++) {
    const a = rnd(i + 200) * Math.PI * 2, r = Math.sqrt(rnd(i + 300)) * 1.05;
    const bx = Math.cos(a) * r, bz = Math.sin(a) * r;
    const hgt = 0.05 + rnd(i + 400) * 0.09, lean = (rnd(i + 500) - 0.5) * 0.05;
    const c = rnd(i + 600) > 0.5 ? 4 : 5;
    for (let k = 1; k <= 3; k++) {
      const u = k / 3;
      push(bx + lean * u * u, G + hgt * u, bz, c);
    }
  }
  // trunks, tapering and slightly tilted
  const tp = Math.round(n * 0.08 / TREES.length);
  TREES.forEach((t, ti) => {
    for (let i = 0; i < tp; i++) {
      const k = i / tp, j = ti * 1000 + i, w = 0.045 * (1 - k * 0.5);
      push(t.x + t.tilt * k + (rnd(j) - 0.5) * w, G + k * t.h,
           t.z + (rnd(j + 7) - 0.5) * w, rnd(j + 3) > 0.55 ? 6 : 7);
    }
  });
  // canopies: three nested shells per tree, darkest inside. A solid ball reads
  // as a blob; shells read as foliage with light falling on the outside.
  const cp = Math.round(n * 0.46 / TREES.length);
  TREES.forEach((t, ti) => {
    for (let i = 0; i < cp; i++) {
      const j = ti * 2000 + i;
      const shell = i % 3;                                  // 0 inner .. 2 outer
      const u = rnd(j) * 2 - 1, a = rnd(j + 3) * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const rr = t.r * (0.56 + shell * 0.22) * (0.9 + rnd(j + 11) * 0.2);
      const y = G + t.h + t.r * 0.15 + u * rr * 0.8;
      // lit from upper left, so the same shell is brighter on one side
      const lit = (-Math.cos(a) * s + u) * 0.5 + 0.5;
      const c = shell === 0 ? 0 : lit > 0.62 ? 3 : lit > 0.34 ? 2 : 1;
      push(t.x + t.tilt + s * Math.cos(a) * rr, y, t.z + s * Math.sin(a) * rr, c);
    }
  });
  // flowerbeds: clustered, not evenly scattered -- flowers grow in patches
  const beds = 6;
  const perBed = Math.round(n * 0.15 / beds);
  for (let b = 0; b < beds; b++) {
    const a = rnd(b + 700) * Math.PI * 2, r = 0.42 + rnd(b + 800) * 0.58;
    const cx = Math.cos(a) * r, cz = Math.sin(a) * r;
    const hue = [8, 9, 10, 11][b % 4];
    for (let i = 0; i < perBed / 5; i++) {
      const j = b * 300 + i;
      const fx = cx + (rnd(j) - 0.5) * 0.30, fz = cz + (rnd(j + 9) - 0.5) * 0.30;
      const fh = 0.10 + rnd(j + 19) * 0.14;
      push(fx, G + fh * 0.5, fz, 4);                        // stem
      push(fx, G + fh, fz, 11);                             // pale centre
      for (let k = 0; k < 3; k++) {                         // petals
        const pa = (k / 3) * Math.PI * 2 + rnd(j);
        push(fx + Math.cos(pa) * 0.032, G + fh + 0.012, fz + Math.sin(pa) * 0.032, hue);
      }
    }
  }
  // pollen: a few motes above everything, to give the air some depth
  for (let i = 0; i < Math.round(n * 0.03); i++) {
    push((rnd(i + 900) - 0.5) * 2, G + 0.5 + rnd(i + 950) * 0.9,
         (rnd(i + 990) - 0.5) * 2, 11);
  }
  while (P.length < n) {
    const i = P.length;
    push((rnd(i) - 0.5) * 2, G + rnd(i + 3) * 0.02, (rnd(i + 5) - 0.5) * 2, 6);
  }
  return P.slice(0, n);
}

/* ── the stage ─────────────────────────────────────────────────────────── */

export class Garden {
  constructor(canvas) {
    this.c = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });
    this.t = 0;
    this.target = 0;
    this.spin = 0;
    this.raf = 0;
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mods = qrTargets();
    this.mods = mods;
    this.n = mods.length;
    const g = garden(this.n);

    const byAngle = (arr, cx, cy, get) =>
      arr.map((p, i) => { const [x, y] = get(p); return { i, a: Math.atan2(y - cy, x - cx) }; })
         .sort((u, v) => u.a - v.a)
         .map((o) => o.i);
    const gi = byAngle(g, 0, -0.25, (p) => [p[0], p[1]]);
    const qi = byAngle(mods, (SIZE - 1) / 2, (SIZE - 1) / 2, (p) => [p[0], -p[1]]);

    this.a = new Float32Array(this.n * 3);
    this.b = new Uint8Array(this.n * 2);
    this.col = new Uint8Array(this.n);
    for (let k = 0; k < this.n; k++) {
      const gp = g[gi[k]], qp = mods[qi[k]];
      this.a[k * 3] = gp[0]; this.a[k * 3 + 1] = gp[1]; this.a[k * 3 + 2] = gp[2];
      this.col[k] = gp[3];
      this.b[k * 2] = qp[0]; this.b[k * 2 + 1] = qp[1];
    }
    // draw order grouped by colour, so fillStyle is set once per bucket
    this.buckets = PALETTE.map(() => []);
    for (let k = 0; k < this.n; k++) this.buckets[this.col[k]].push(k);

    this.resize();
    this._r = () => this.resize();
    addEventListener("resize", this._r, { passive: true });
    if (this.reduced) { this.t = this.target = 1; this.draw(); } else this.start();
  }

  resize() {
    const r = this.c.getBoundingClientRect();
    if (!r.width) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.c.width = Math.round(r.width * dpr);
    this.c.height = Math.round(r.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = r.width; this.h = r.height;
    // the QR must fit its quiet zone inside the frame or it will not scan
    this.cell = Math.min(this.w, this.h) / (SIZE + QUIET * 2);
    this.side = this.cell * SIZE;
    this.ox = (this.w - this.side) / 2;
    this.oy = (this.h - this.side) / 2;
    this.draw();
  }

  to(v) { this.target = v; this.start(); }

  start() {
    if (this.raf || this.reduced) return;
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      this.t += (this.target - this.t) * Math.min(1, dt * 6);
      if (Math.abs(this.target - this.t) < 0.0015) this.t = this.target;
      // the garden keeps turning; the code does not
      if (this.t < 0.999) this.spin += dt * 0.17 * (1 - this.t);
      this.draw();
      // park the loop once fully resolved -- a still QR costs no frames
      this.raf = this.t === 1 && this.target === 1 ? 0 : requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  destroy() { cancelAnimationFrame(this.raf); removeEventListener("resize", this._r); }

  draw() {
    const { ctx, w, h } = this;
    if (!w) return;
    const t = ease(clamp(this.t, 0, 1));
    ctx.clearRect(0, 0, w, h);

    // past 90% the particles have arrived; hand over to real squares, which is
    // the only form of this that a camera can actually read
    const crisp = clamp((t - 0.9) / 0.1, 0, 1);
    if (crisp > 0) {
      ctx.globalAlpha = crisp;
      ctx.fillStyle = "#000";
      const c = Math.ceil(this.cell);
      for (const [mx, my] of this.mods)
        ctx.fillRect(Math.floor(this.ox + mx * this.cell), Math.floor(this.oy + my * this.cell), c, c);
      ctx.globalAlpha = 1;
      if (crisp === 1) return;
    }

    const cs = Math.cos(this.spin), sn = Math.sin(this.spin);
    // The scene spans roughly y -0.86..0.80, so it centres near y=0 and only
    // needs a small nudge. An offset in fractions of the frame height pushed it
    // into the bottom third and left the top empty.
    const scale = Math.min(w, h) * 0.375;
    const fade = 1 - crisp;

    for (let bi = 0; bi < PALETTE.length; bi++) {
      const list = this.buckets[bi];
      if (!list.length) continue;
      const [pr, pg, pb] = PALETTE[bi];
      // colour drains to black as the scene becomes the code
      const R = Math.round(pr * (1 - t)), G = Math.round(pg * (1 - t)), B = Math.round(pb * (1 - t));
      ctx.fillStyle = `rgb(${R},${G},${B})`;
      ctx.globalAlpha = fade;
      for (let li = 0; li < list.length; li++) {
        const k = list[li];
        const ax = this.a[k * 3], ay = this.a[k * 3 + 1], az = this.a[k * 3 + 2];
        const rx = ax * cs - az * sn, rz = ax * sn + az * cs;
        // weak perspective: enough to read as depth, not enough to lurch
        const p = 2.7 / (2.7 + rz);
        const gx = w / 2 + rx * scale * p;
        const gy = h / 2 - (ay + 0.03) * scale * p;
        const gr = (1.15 + p * 1.0);

        const qx = this.ox + this.b[k * 2] * this.cell;
        const qy = this.oy + this.b[k * 2 + 1] * this.cell;

        const size = gr + (this.cell - gr) * t;
        const x = gx - gr / 2 + (qx - (gx - gr / 2)) * t;
        const y = gy - gr / 2 + (qy - (gy - gr / 2)) * t;
        ctx.fillRect(x, y, size, size);
      }
    }
    ctx.globalAlpha = 1;
  }
}
