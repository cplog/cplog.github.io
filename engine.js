// A dependency-free ASCII renderer.
//
// One character grid, one luminance ramp, one rAF loop. Scenes are pure
// functions of (x, y, t) returning 0..1, or they draw into the buffer directly
// when they need structure rather than a field.
//
// Two things decide whether this reads as craft or as a screensaver:
//   1. Cell aspect. A monospace cell is about 0.55 as wide as it is tall, so
//      field maths must scale y or every circle renders as an egg.
//   2. The ramp must be perceptually even. Jumps in apparent density band the
//      image exactly the way a bad gradient does.

export const RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

// The 70-step ramp above is built for photographic dithering: dense, and its
// middle is all letterforms. Put sparse line art through it and indices 20-45
// come back as `{Z$Z{` -- the image reads as corrupted text rather than as a
// drawing. Anything structural uses this instead: eight steps, no letters, and
// weight that rises monotonically without any glyph calling attention to itself.
export const RAMP_SOFT = " .·:-=+*";

export class AsciiStage {
  constructor(el, { cols = 150, fps = 30 } = {}) {
    this.el = el;
    this.cols = cols;
    this.fps = fps;
    this.rows = 0;
    this.buf = [];
    this.scene = null;
    this.t0 = 0;
    this.raf = 0;
    this.last = 0;
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.resize();
    this._onResize = () => this.resize();
    addEventListener("resize", this._onResize, { passive: true });
  }

  resize() {
    const box = this.el.getBoundingClientRect();
    // derive rows from the real cell metrics so the grid always fills the frame
    const probe = document.createElement("span");
    probe.textContent = "M";
    probe.style.cssText = "position:absolute;visibility:hidden;font:inherit";
    this.el.appendChild(probe);
    const cw = probe.getBoundingClientRect().width || 8;
    const ch = probe.getBoundingClientRect().height || 14;
    probe.remove();
    this.cellRatio = cw / ch;
    this.cols = Math.max(40, Math.floor(box.width / cw));
    this.rows = Math.max(16, Math.floor(box.height / ch));
  }

  setScene(scene) {
    this.scene = scene;
    this.t0 = performance.now();
    if (this.reduced) this.drawOnce(scene.still ?? 2.4);
  }

  drawOnce(t) { this.el.textContent = this.render(t); }

  render(t) {
    const { cols, rows, scene, cellRatio } = this;
    const grid = new Float32Array(cols * rows);
    // literal characters win over the ramp wherever a scene writes them, so a
    // scene can put real words on top of a field without faking a bitmap font
    const chars = new Array(cols * rows).fill(null);
    const ctx = { cols, rows, t, cellRatio, grid, chars, pointer: this.pointer || null,
      text(x, y, str, dim) {
        x = Math.round(x); y = Math.round(y);
        if (y < 0 || y >= rows) return;
        for (let i = 0; i < str.length; i++) {
          const cx = x + i;
          if (cx < 0 || cx >= cols) continue;
          chars[y * cols + cx] = dim ? { c: str[i], dim } : { c: str[i] };
        }
      },
      put(x, y, v) {
        x = Math.round(x); y = Math.round(y);
        if (x < 0 || y < 0 || x >= cols || y >= rows) return;
        const i = y * cols + x;
        if (v > grid[i]) grid[i] = v;
      },
      /**
       * A line drawn as line characters. The glyph follows the segment's real
       * visual slope (cells are ~0.55 as wide as tall, so raw dy lies), which
       * is what makes a run of them read as one stroke instead of as a column
       * of unrelated punctuation.
       *
       * Weakness is expressed as gaps rather than as a fainter glyph. Dotting
       * is the honest ASCII idiom for "less certain", and it keeps every mark
       * on the page at one ink weight.
       */
      stroke(x0, y0, x1, y1, strength) {
        const dxv = x1 - x0, dyv = (y1 - y0) / cellRatio;
        const a = Math.abs(Math.atan2(dyv, dxv));
        const g = a < 0.3927 || a > 2.7489 ? "-"
                : a < 1.1781 ? (dyv * dxv < 0 ? "/" : "\\")
                : a < 1.9635 ? "|"
                : (dyv * dxv < 0 ? "/" : "\\");
        const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) | 0;
        // 1 = solid, 0 = nothing; between them the stroke thins to a dotted rule
        const every = strength > 0.55 ? 1 : strength > 0.34 ? 2 : strength > 0.16 ? 3 : 4;
        for (let s = 1; s < steps; s++) {
          if (s % every) continue;
          const k = s / steps;
          const cx = Math.round(x0 + (x1 - x0) * k), cy = Math.round(y0 + (y1 - y0) * k);
          if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue;
          const i = cy * cols + cx;
          if (!chars[i]) chars[i] = { c: g };
        }
      },
      line(x0, y0, x1, y1, v) {
        const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) | 0;
        for (let s = 0; s <= steps; s++) {
          const k = steps ? s / steps : 0;
          ctx.put(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k, typeof v === "function" ? v(k) : v);
        }
      } };

    if (scene.field) {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // normalise to -1..1 with the cell aspect folded in, so shapes are true
          const nx = (x / cols - 0.5) * 2;
          const ny = (y / rows - 0.5) * 2 * (rows / cols) / cellRatio;
          grid[y * cols + x] = scene.field(nx, ny, t, x, y);
        }
      }
    }
    if (scene.draw) scene.draw(ctx);

    const ramp = scene.ramp || RAMP;
    const n = ramp.length - 1;
    let out = "";
    for (let y = 0; y < rows; y++) {
      let line = "";
      for (let x = 0; x < cols; x++) {
        const lit = chars[y * cols + x];
        if (lit) { line += lit.c; continue; }
        const v = grid[y * cols + x];
        line += ramp[Math.max(0, Math.min(n, Math.round((v > 1 ? 1 : v < 0 ? 0 : v) * n)))];
      }
      out += line + "\n";
    }
    return out;
  }

  start() {
    if (this.reduced || this.raf) return;
    const frame = (now) => {
      this.raf = requestAnimationFrame(frame);
      if (now - this.last < 1000 / this.fps) return;
      this.last = now;
      this.drawOnce((now - this.t0) / 1000);
    };
    this.raf = requestAnimationFrame(frame);
  }

  stop() { cancelAnimationFrame(this.raf); this.raf = 0; }

  destroy() { this.stop(); removeEventListener("resize", this._onResize); }
}
