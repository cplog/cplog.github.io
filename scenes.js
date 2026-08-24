// Three scenes. Each one has a reason to exist rather than being an effect.

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/* 1 - FIELD ---------------------------------------------------------------
   Layered interference with a warped domain. The warp is what stops this
   reading as wallpaper: straight sine layers repeat visibly within a screen,
   a warped one never quite does. */
export const field = {
  id: "field",
  name: "Interference",
  note: "Three sine layers over a warped domain. The warp is why it never quite repeats.",
  still: 3.1,
  field(nx, ny, t) {
    const wx = nx + 0.32 * Math.sin(ny * 2.1 + t * 0.21);
    const wy = ny + 0.32 * Math.cos(nx * 1.7 - t * 0.17);
    const r = Math.sqrt(wx * wx + wy * wy);
    const a =
      Math.sin(wx * 3.4 - t * 0.9) *
      Math.sin(wy * 3.1 + t * 0.6) +
      Math.sin(r * 5.2 - t * 1.35) * 0.85;
    // pull the edges down so the frame holds the image instead of clipping it
    // ny is aspect-scaled and small, so a radius built from it barely vignettes.
    // Use the raw normalised coords for falloff and keep the mean low enough
    // that real black space survives between the bright bands.
    const rr = Math.sqrt(nx * nx + (ny * 2.4) * (ny * 2.4));
    const vig = clamp(1.18 - rr * 0.62);
    return clamp((a * 0.30 + 0.20) * vig);
  },
};

/* 2 - GRAPH ---------------------------------------------------------------
   Nodes drift, edges exist only while two nodes are close enough, and edge
   brightness falls with distance. It is the same claim the writing makes:
   the interesting part is which things are connected and how much you trust
   the edge. */
const NODES = 17;
const seeded = (i) => {
  const s = Math.sin(i * 127.1) * 43758.5453;
  return s - Math.floor(s);
};
export const graph = {
  id: "graph",
  name: "Connectivity",
  note: "Edges exist while two nodes are close, and fade with distance. Trust falls off the same way.",
  still: 6.0,
  draw(ctx) {
    const { cols, rows, t } = ctx;
    const pts = [];
    for (let i = 0; i < NODES; i++) {
      // independent frequency AND phase per axis, or every node traces the same
      // Lissajous band and the field reads as one arc instead of a graph
      const fx = 0.13 + seeded(i) * 0.19, fy = 0.11 + seeded(i + 31) * 0.17;
      const px = seeded(i + 99) * 6.283, py = seeded(i + 57) * 6.283;
      let x = (0.5 + 0.42 * Math.sin(t * fx + px)) * (cols - 1);
      let y = (0.5 + 0.44 * Math.sin(t * fy + py)) * (rows - 1);
      // the pointer pushes nodes away, which is the page's one real interaction
      if (ctx.pointer) {
        const pxp = ctx.pointer.x * (cols - 1), pyp = ctx.pointer.y * (rows - 1);
        const dx = x - pxp, dy = (y - pyp) / ctx.cellRatio / 1.75;
        const d = Math.hypot(dx, dy), R = cols * 0.16;
        if (d < R && d > 0.001) {
          const push = (1 - d / R) * cols * 0.075;
          x += (dx / d) * push;
          y += (dy / d) * push * ctx.cellRatio * 1.75;
        }
      }
      pts.push([x, y]);
    }
    const reach = cols * 0.17;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i][0] - pts[j][0];
        // correct for cell aspect or "close" means something different vertically
        const dy = (pts[i][1] - pts[j][1]) / ctx.cellRatio / 1.75;
        const d = Math.hypot(dx, dy);
        if (d > reach) continue;
        const strength = 1 - d / reach;
        ctx.line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], (k) => {
          // brightest at the ends, so nodes read as anchors and edges as inference
          const ends = Math.abs(k - 0.5) * 2;
          return strength * (0.30 + ends * 0.34);
        });
      }
    }
    // nodes read as anchors: full weight, with a short shoulder either side
    for (const [x, y] of pts) {
      ctx.put(x, y, 1);
      ctx.put(x + 1, y, 0.7); ctx.put(x - 1, y, 0.7);
      ctx.put(x + 2, y, 0.34); ctx.put(x - 2, y, 0.34);
    }
  },
};

/* 3 - REVISION ------------------------------------------------------------
   The site's signature move, in one dimension. A claim is set, struck, and
   replaced. Literal characters, no field. */
const PAIRS = [
  ["the weakest isolation of anything we run", "the strongest isolation of anything we run"],
  ["enforced by convention", "enforced by the database"],
  ["a decision you can revisit later", "a decision you cannot take back"],
];
export const revision = {
  id: "revision",
  name: "Revision",
  note: "A claim is set, struck, and reset. The superseded version stays legible.",
  still: 3.4,
  draw(ctx) {
    const { cols, rows, t } = ctx;
    const cycle = 7.2;
    const idx = Math.floor(t / cycle) % PAIRS.length;
    const p = (t % cycle) / cycle;
    const [was, now] = PAIRS[idx];
    const midY = Math.floor(rows / 2);
    const x = Math.max(2, Math.floor((cols - Math.max(was.length, now.length)) / 2));

    // faint ground so the frame is never empty while a phase changes
    for (let y = 0; y < rows; y++)
      for (let cx = 0; cx < cols; cx++)
        ctx.grid[y * cols + cx] = Math.max(0, 0.012 + 0.016 * Math.sin(cx * 0.09 + y * 0.21 + t * 0.5));

    const typed = Math.min(was.length, Math.floor((p / 0.28) * was.length));
    ctx.text(x, midY - 2, was.slice(0, typed));

    if (p > 0.34) {
      const k = Math.min(1, (p - 0.34) / 0.16);
      ctx.text(x, midY - 2, "-".repeat(Math.floor(was.length * k)));
      ctx.text(x, midY - 1, was.slice(0, Math.floor(was.length * k)));
    }
    if (p > 0.54) {
      const k = Math.min(1, (p - 0.54) / 0.22);
      ctx.text(x, midY + 1, now.slice(0, Math.floor(now.length * k)));
    }
    if (p > 0.84) ctx.text(x, midY + 3, "checked, and corrected".slice(0, Math.floor((p - 0.84) / 0.16 * 22)));
  },
};

export const SCENES = [graph, field, revision];
