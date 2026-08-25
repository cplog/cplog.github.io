// A garden that becomes a QR code.
//
// 1433 elements, two arrangements. At rest they are a small garden turning
// under a weak perspective; on hover or tap they fold into the QR's dark
// modules, flatten, and drain to black.
//
// The drawing language is borrowed from ThreeUI's ConnectivityGraph, which is
// the best-looking thing in that library and does not need WebGL to be good.
// Three properties do the work there, and all three are cheap in 2D:
//
//   · elements are tapered STROKES, not dots. A stroke has direction, and
//     direction is what makes a canopy read as foliage rather than as gnats.
//   · every stroke carries a bright tip. The eye reads the tips as the objects
//     and the strokes as the structure holding them up.
//   · depth is hard fade plus width, not merely scale. Far things go thin and
//     pale rather than just small, which is what produces the sense of air
//     between the near and the far side of the scene.
//
// Two decisions that are mine rather than borrowed:
//
//   1. Elements never *are* the QR. They travel to its module grid and the
//      last stretch cross-fades to crisply drawn squares. Soft antialiased
//      marks do not scan, and a pretty morph that cannot be read is a failure
//      rather than a trade.
//
//   2. Colour is contained in the frame and drains to black as the scene
//      becomes the code. The garden is alive and the code is not, so losing
//      the colour IS the transition rather than an effect laid over one.

import { SIZE, BITS } from "./qr.js";

const QUIET = 4;               // modules of mandatory clear margin around a QR
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const rnd = (i) => {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/* Muted, because this sits beside black text on white. Greens carry the mass;
   warm tones are rationed to the flowers so the eye has one place to land. */
const PALETTE = [
  [ 68,  86,  58], [ 92, 114,  72], [122, 144,  92], [150, 168, 116],
  [ 88, 102,  68], [114, 130,  82], [104,  82,  60], [ 80,  63,  48],
  [198, 110,  84], [206, 150,  72], [178, 102, 120], [206, 200, 184],
];
// Tips run brighter than the stroke they cap. This pairing is what gives the
// borrowed look its glint, with no glow, no blur and no second pass.
const TIP = PALETTE.map(([r, g, b]) => [
  Math.min(255, r + 74), Math.min(255, g + 74), Math.min(255, b + 66),
]);

function qrTargets() {
  const out = [];
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++)
      if (BITS[y * SIZE + x] === "1") out.push([x, y]);
  return out;
}

/** Scene in normalised space: x,z in -1..1, y up, ground at -0.86.
    Each element is [x, y, z, colour, dx, dy, dz] where d is its stroke. */
function garden(n) {
  const P = [];
  const G = -0.86;
  const put = (x, y, z, c, dx, dy, dz) => P.push([x, y, z, c, dx, dy, dz]);

  const TREES = [
    { x: -0.62, z:  0.26, h: 0.80, r: 0.30 },
    { x:  0.12, z: -0.48, h: 1.00, r: 0.40 },
    { x:  0.68, z:  0.36, h: 0.66, r: 0.25 },
    { x: -0.20, z:  0.64, h: 0.50, r: 0.20 },
  ];

  // soil: the only elements with no direction, so they stay specks and read as
  // ground instead of competing with the planting
  for (let i = 0; i < Math.round(n * 0.11); i++) {
    const a = rnd(i) * 6.2832, r = Math.sqrt(rnd(i + 91)) * 1.06;
    put(Math.cos(a) * r, G + rnd(i + 17) * 0.02, Math.sin(a) * r,
        rnd(i + 5) > 0.7 ? 7 : 6, 0, 0, 0);
  }
  // grass: one leaning stroke each. Blades, not a scatter.
  for (let i = 0; i < Math.round(n * 0.22); i++) {
    const a = rnd(i + 200) * 6.2832, r = Math.sqrt(rnd(i + 300)) * 1.04;
    const hgt = 0.06 + rnd(i + 400) * 0.10;
    put(Math.cos(a) * r, G, Math.sin(a) * r, rnd(i + 600) > 0.5 ? 4 : 5,
        (rnd(i + 500) - 0.5) * 0.07, hgt, (rnd(i + 700) - 0.5) * 0.03);
  }
  // trunks: short vertical strokes stacked, narrowing as they climb
  const tp = Math.round(n * 0.07 / TREES.length);
  TREES.forEach((t, ti) => {
    for (let i = 0; i < tp; i++) {
      const k = i / tp, j = ti * 1000 + i, w = 0.03 * (1 - k * 0.5);
      put(t.x + (rnd(j) - 0.5) * w, G + k * t.h, t.z + (rnd(j + 7) - 0.5) * w,
          rnd(j + 3) > 0.55 ? 6 : 7, 0, (t.h / tp) * 1.4, 0);
    }
  });
  // canopy: strokes pointing OUTWARD from the tree's heart. This is the whole
  // trick — radial strokes with bright tips read instantly as foliage, where
  // the same points drawn as dots read as noise.
  const cp = Math.round(n * 0.44 / TREES.length);
  TREES.forEach((t, ti) => {
    const hy = G + t.h + t.r * 0.16;
    for (let i = 0; i < cp; i++) {
      const j = ti * 2000 + i;
      const shell = i % 3;
      const u = rnd(j) * 2 - 1, a = rnd(j + 3) * 6.2832;
      const s = Math.sqrt(1 - u * u);
      const rr = t.r * (0.40 + shell * 0.26) * (0.88 + rnd(j + 11) * 0.24);
      const ux = s * Math.cos(a), uy = u * 0.82, uz = s * Math.sin(a);
      const lit = (-ux + uy) * 0.5 + 0.5;                 // light from upper left
      const c = shell === 0 ? 0 : lit > 0.62 ? 3 : lit > 0.34 ? 2 : 1;
      const len = t.r * (0.20 + rnd(j + 21) * 0.24);
      put(t.x + ux * rr, hy + uy * rr, t.z + uz * rr, c, ux * len, uy * len, uz * len);
    }
  });
  // flowerbeds: clustered, because flowers grow in patches. A stem stroke and
  // three petals fanning out of its top.
  const beds = 6, per = Math.round((n * 0.13) / beds / 4);
  for (let b = 0; b < beds; b++) {
    const a = rnd(b + 700) * 6.2832, r = 0.44 + rnd(b + 800) * 0.56;
    const cx = Math.cos(a) * r, cz = Math.sin(a) * r;
    const hue = [8, 9, 10, 8][b % 4];
    for (let i = 0; i < per; i++) {
      const j = b * 300 + i;
      const fx = cx + (rnd(j) - 0.5) * 0.32, fz = cz + (rnd(j + 9) - 0.5) * 0.32;
      const fh = 0.11 + rnd(j + 19) * 0.15;
      put(fx, G, fz, 4, 0, fh, 0);                                  // stem
      for (let k = 0; k < 3; k++) {                                 // petals
        const pa = (k / 3) * 6.2832 + rnd(j) * 3;
        put(fx, G + fh, fz, hue, Math.cos(pa) * 0.05, 0.022, Math.sin(pa) * 0.05);
      }
    }
  }
  // pollen: faint motes, for air between the planting and the frame
  for (let i = 0; i < Math.round(n * 0.03); i++) {
    put((rnd(i + 900) - 0.5) * 2, G + 0.45 + rnd(i + 950) * 0.85,
        (rnd(i + 990) - 0.5) * 2, 11, 0, 0.016, 0);
  }
  while (P.length < n) {
    const i = P.length;
    put((rnd(i) - 0.5) * 2, G, (rnd(i + 5) - 0.5) * 2, 5,
        (rnd(i + 2) - 0.5) * 0.05, 0.05 + rnd(i + 4) * 0.05, 0);
  }
  return P.slice(0, n);
}

/* ── stage ─────────────────────────────────────────────────────────────── */

const BANDS = 3;   // depth bands per colour, so width and fade vary with z

export class Garden {
  constructor(canvas) {
    this.c = canvas;
    this.ctx = canvas.getContext("2d");
    this.t = 0; this.target = 0; this.spin = 0; this.raf = 0;
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mods = qrTargets();
    this.mods = mods;
    this.n = mods.length;
    const g = garden(this.n);

    const byAngle = (arr, cx, cy, get) =>
      arr.map((p, i) => { const [x, y] = get(p); return { i, a: Math.atan2(y - cy, x - cx) }; })
         .sort((u, v) => u.a - v.a).map((o) => o.i);
    const gi = byAngle(g, 0, -0.25, (p) => [p[0], p[1]]);
    const qi = byAngle(mods, (SIZE - 1) / 2, (SIZE - 1) / 2, (p) => [p[0], -p[1]]);

    this.pos = new Float32Array(this.n * 3);
    this.dir = new Float32Array(this.n * 3);
    this.qr = new Uint8Array(this.n * 2);
    this.col = new Uint8Array(this.n);
    for (let k = 0; k < this.n; k++) {
      const p = g[gi[k]], q = mods[qi[k]];
      this.pos[k * 3] = p[0]; this.pos[k * 3 + 1] = p[1]; this.pos[k * 3 + 2] = p[2];
      this.dir[k * 3] = p[4]; this.dir[k * 3 + 1] = p[5]; this.dir[k * 3 + 2] = p[6];
      this.col[k] = p[3];
      this.qr[k * 2] = q[0]; this.qr[k * 2 + 1] = q[1];
    }
    // scratch, reused every frame so the draw loop allocates nothing
    this.lanes = Array.from({ length: PALETTE.length * BANDS }, () => []);

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
    this.ctx.lineCap = "round";
    this.w = r.width; this.h = r.height;
    // the quiet zone must fit inside the frame or the code will not scan
    this.cell = Math.min(this.w, this.h) / (SIZE + QUIET * 2);
    const side = this.cell * SIZE;
    this.ox = (this.w - side) / 2;
    this.oy = (this.h - side) / 2;
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
      if (this.t < 0.999) this.spin += dt * 0.15 * (1 - this.t);
      this.draw();
      // a settled code is a still image and costs no frames
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
    const scale = Math.min(w, h) * 0.37;
    const fade = 1 - crisp;
    for (const l of this.lanes) l.length = 0;

    // Project once, then sort into colour x depth lanes, so a frame is a few
    // dozen batched paths rather than 1433 individual style writes.
    for (let k = 0; k < this.n; k++) {
      const x = this.pos[k * 3], y = this.pos[k * 3 + 1], z = this.pos[k * 3 + 2];
      const rx = x * cs - z * sn, rz = x * sn + z * cs;
      const p = 2.7 / (2.7 + rz);
      const sx = w / 2 + rx * scale * p;
      const sy = h / 2 - (y + 0.03) * scale * p;

      const dx = this.dir[k * 3], dy = this.dir[k * 3 + 1], dz = this.dir[k * 3 + 2];
      const erx = (x + dx) * cs - (z + dz) * sn, erz = (x + dx) * sn + (z + dz) * cs;
      const ep = 2.7 / (2.7 + erz);
      const ex = w / 2 + erx * scale * ep;
      const ey = h / 2 - (y + dy + 0.03) * scale * ep;

      const qx = this.ox + this.qr[k * 2] * this.cell + this.cell / 2;
      const qy = this.oy + this.qr[k * 2 + 1] * this.cell + this.cell / 2;

      // as it folds up every stroke retracts to a point on its module centre
      const ax = sx + (qx - sx) * t, ay = sy + (qy - sy) * t;
      const bx = ex + (qx - ex) * t, by = ey + (qy - ey) * t;
      const band = p < 0.86 ? 0 : p < 1.02 ? 1 : 2;      // 0 far .. 2 near
      this.lanes[this.col[k] * BANDS + band].push(ax, ay, bx, by);
    }

    for (let ci = 0; ci < PALETTE.length; ci++) {
      const [r, g, b] = PALETTE[ci];
      const [tr, tg, tb] = TIP[ci];
      for (let band = 0; band < BANDS; band++) {
        const lane = this.lanes[ci * BANDS + band];
        if (!lane.length) continue;
        // far strokes go thin AND pale; that pairing is what reads as air
        const depth = 0.42 + band * 0.29;
        ctx.globalAlpha = fade * depth * (1 - t * 0.15);
        ctx.strokeStyle = `rgb(${(r * (1 - t)) | 0},${(g * (1 - t)) | 0},${(b * (1 - t)) | 0})`;
        ctx.lineWidth = Math.max(0.35, (0.7 + band * 0.62) * (1 - t * 0.45));
        ctx.beginPath();
        for (let i = 0; i < lane.length; i += 4) {
          ctx.moveTo(lane[i], lane[i + 1]);
          ctx.lineTo(lane[i + 2], lane[i + 3]);
        }
        ctx.stroke();

        // The tip: one bright mark at the far end of every stroke. This is the
        // detail that separates "point cloud" from "drawing".
        const ts = Math.max(0.7, (0.9 + band * 0.55) * (1 - t * 0.3));
        ctx.globalAlpha = fade * Math.min(1, depth + 0.26);
        ctx.fillStyle = `rgb(${(tr * (1 - t)) | 0},${(tg * (1 - t)) | 0},${(tb * (1 - t)) | 0})`;
        for (let i = 0; i < lane.length; i += 4)
          ctx.fillRect(lane[i + 2] - ts / 2, lane[i + 3] - ts / 2, ts, ts);
      }
    }
    ctx.globalAlpha = 1;
  }
}
