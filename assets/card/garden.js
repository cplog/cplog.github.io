// A garden that becomes a QR code.
//
// One set of points, two arrangements. In the rest state they are a small 3D
// garden -- ground, three trees, some flowers -- turning slowly under a weak
// perspective. On hover or tap they fly to the centres of the QR's dark
// modules and the drawing flattens to two dimensions.
//
// Two decisions carry the whole thing:
//
//   1. The particles never *are* the QR. They travel to its module grid, and
//      the last stretch cross-fades into crisply drawn squares. Soft dots with
//      antialiased edges and a missing quiet zone do not scan reliably, and a
//      pretty morph that cannot be read is a failure, not a trade-off.
//
//   2. Points are paired to modules by angle around the centroid. Pairing by
//      index makes every particle cross the frame and the morph reads as
//      static; a radial unwind keeps neighbours together and reads as one
//      object folding up.

import { SIZE, BITS } from "./qr.js";

const QUIET = 4;               // modules of mandatory clear margin around a QR
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// deterministic noise, so the garden is the same garden on every load
function rnd(i) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/* ── the two arrangements ──────────────────────────────────────────────── */

function qrTargets() {
  const out = [];
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++)
      if (BITS[y * SIZE + x] === "1") out.push([x, y]);
  return out;
}

/** A garden in normalised space: x,y in -1..1, z in -1..1, y positive is up. */
function garden(n) {
  const pts = [];
  const TREES = [
    { x: -0.52, z: 0.18, h: 0.92, r: 0.34 },
    { x: 0.14, z: -0.42, h: 1.18, r: 0.42 },
    { x: 0.62, z: 0.3, h: 0.76, r: 0.28 },
  ];
  const share = { ground: 0.3, trunk: 0.1, canopy: 0.44, flower: 0.16 };
  const take = (k) => Math.round(n * share[k]);

  // ground: a scattered ellipse, denser toward the middle
  for (let i = 0; i < take("ground"); i++) {
    const a = rnd(i) * Math.PI * 2;
    const r = Math.sqrt(rnd(i + 91)) * 1.05;
    pts.push([Math.cos(a) * r, -0.86 + rnd(i + 17) * 0.05, Math.sin(a) * r]);
  }
  // trunks
  const per = Math.round(take("trunk") / TREES.length);
  TREES.forEach((t, ti) => {
    for (let i = 0; i < per; i++) {
      const k = i / per;
      const j = ti * 1000 + i;
      pts.push([t.x + (rnd(j) - 0.5) * 0.05, -0.86 + k * t.h, t.z + (rnd(j + 7) - 0.5) * 0.05]);
    }
  });
  // canopies: points on a slightly squashed sphere shell, not a solid ball --
  // a filled sphere reads as a blob, a shell reads as foliage
  const cper = Math.round(take("canopy") / TREES.length);
  TREES.forEach((t, ti) => {
    for (let i = 0; i < cper; i++) {
      const j = ti * 2000 + i;
      const u = rnd(j) * 2 - 1, a = rnd(j + 3) * Math.PI * 2;
      const s = Math.sqrt(1 - u * u), rr = t.r * (0.82 + rnd(j + 11) * 0.18);
      pts.push([
        t.x + s * Math.cos(a) * rr,
        -0.86 + t.h + u * rr * 0.82,
        t.z + s * Math.sin(a) * rr,
      ]);
    }
  });
  // flowers: a short stem with a head, scattered on the ground
  const fl = take("flower"), heads = Math.round(fl / 4);
  for (let i = 0; i < heads; i++) {
    const a = rnd(i + 400) * Math.PI * 2, r = 0.35 + rnd(i + 500) * 0.62;
    const fx = Math.cos(a) * r, fz = Math.sin(a) * r, fh = 0.16 + rnd(i + 600) * 0.16;
    pts.push([fx, -0.86 + fh, fz]);
    for (let k = 1; k <= 3; k++) {
      const ang = (k / 3) * Math.PI * 2 + rnd(i);
      pts.push([fx + Math.cos(ang) * 0.035, -0.86 + fh + 0.02, fz + Math.sin(ang) * 0.035]);
    }
  }
  while (pts.length < n) pts.push([(rnd(pts.length) - 0.5) * 1.9, -0.86, (rnd(pts.length + 5) - 0.5) * 1.9]);
  return pts.slice(0, n);
}

/* ── the stage ─────────────────────────────────────────────────────────── */

export class Card {
  constructor(canvas) {
    this.c = canvas;
    this.ctx = canvas.getContext("2d");
    this.t = 0;             // 0 = garden, 1 = QR
    this.target = 0;
    this.spin = 0;
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mods = qrTargets();
    this.n = mods.length;
    const g = garden(this.n);

    // pair by angle around each set's own centroid, so the swarm unwinds
    // instead of every point crossing the frame
    const byAngle = (arr, cx, cy, get) =>
      arr
        .map((p, i) => ({ i, a: Math.atan2(get(p)[1] - cy, get(p)[0] - cx) }))
        .sort((u, v) => u.a - v.a)
        .map((o) => o.i);
    const gi = byAngle(g, 0, -0.2, (p) => [p[0], p[1]]);
    const qi = byAngle(mods, (SIZE - 1) / 2, (SIZE - 1) / 2, (p) => [p[0], -p[1]]);

    this.a = new Float32Array(this.n * 3);   // garden
    this.b = new Float32Array(this.n * 2);   // QR, in module coords
    for (let k = 0; k < this.n; k++) {
      const gp = g[gi[k]], qp = mods[qi[k]];
      this.a[k * 3] = gp[0]; this.a[k * 3 + 1] = gp[1]; this.a[k * 3 + 2] = gp[2];
      this.b[k * 2] = qp[0]; this.b[k * 2 + 1] = qp[1];
    }
    this.mods = mods;

    this.resize();
    addEventListener("resize", () => this.resize(), { passive: true });
    if (this.reduced) { this.t = this.target = 1; this.draw(); } else this.start();
  }

  resize() {
    const r = this.c.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.c.width = Math.round(r.width * dpr);
    this.c.height = Math.round(r.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = r.width; this.h = r.height;
    // the QR must fit its quiet zone inside the frame or it will not scan
    this.cell = Math.floor(Math.min(this.w, this.h) / (SIZE + QUIET * 2));
    this.side = this.cell * SIZE;
    this.ox = (this.w - this.side) / 2;
    this.oy = (this.h - this.side) / 2;
    if (this.reduced) this.draw();
  }

  to(v) { this.target = v; this.start(); }

  start() {
    if (this.raf || this.reduced) return;
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      // critically damped: the card should arrive, not wobble
      this.t += (this.target - this.t) * Math.min(1, dt * 6.5);
      if (Math.abs(this.target - this.t) < 0.0015) this.t = this.target;
      if (this.t < 0.999) this.spin += dt * 0.22 * (1 - this.t);
      this.draw();
      const settled = this.t === this.target && (this.t === 1 || false);
      this.raf = settled ? 0 : requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  draw() {
    const { ctx, w, h } = this;
    const t = ease(clamp(this.t, 0, 1));
    ctx.clearRect(0, 0, w, h);

    // Past 88% the particles have essentially arrived, so hand over to real
    // drawn squares. This is the part that has to be scannable.
    const crisp = clamp((t - 0.88) / 0.12, 0, 1);
    if (crisp > 0) {
      ctx.globalAlpha = crisp;
      ctx.fillStyle = "#000";
      for (const [mx, my] of this.mods)
        ctx.fillRect(this.ox + mx * this.cell, this.oy + my * this.cell, this.cell, this.cell);
      ctx.globalAlpha = 1;
      if (crisp === 1) return;
    }

    const cs = Math.cos(this.spin), sn = Math.sin(this.spin);
    const scale = Math.min(w, h) * 0.34;
    ctx.globalAlpha = 1 - crisp;
    ctx.fillStyle = "#000";
    for (let k = 0; k < this.n; k++) {
      const ax = this.a[k * 3], ay = this.a[k * 3 + 1], az = this.a[k * 3 + 2];
      // rotate about Y, then a weak perspective: enough to read as depth,
      // not enough to make the garden lurch when it turns
      const rx = ax * cs - az * sn, rz = ax * sn + az * cs;
      const p = 2.6 / (2.6 + rz);
      const gx = w / 2 + rx * scale * p;
      const gy = h / 2 - ay * scale * p;
      const gr = (1.15 + p * 0.75) * (1 - t * 0.35);

      const qx = this.ox + (this.b[k * 2] + 0.5) * this.cell;
      const qy = this.oy + (this.b[k * 2 + 1] + 0.5) * this.cell;

      const x = gx + (qx - gx) * t;
      const y = gy + (qy - gy) * t;
      const r = gr + (this.cell * 0.5 - gr) * t;
      ctx.beginPath();
      ctx.arc(x, y, Math.max(0.4, r), 0, 6.2832);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}
