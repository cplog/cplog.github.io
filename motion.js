// A spring, and nothing else.
//
// No dependency, because the page has none and one spring is ~40 lines. The
// two knobs are Apple's, not the physics triplet: `bounce` (0 = critically
// damped, no overshoot) and `response` (seconds to reach the target, which is
// not a duration — a spring has no fixed end).
//
// The three properties that matter here:
//   1. It animates from the CURRENT value, so an interrupt never jumps.
//   2. Re-targeting mid-flight carries the existing velocity through, so a
//      reversal has no brick wall in it.
//   3. It is always interruptible: `to()` at any time, from any state.

export class Spring {
  constructor(value = 0, { bounce = 0, response = 0.4, onChange } = {}) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.onChange = onChange;
    this.setParams({ bounce, response });
    this.raf = 0;
    this.last = 0;
  }

  setParams({ bounce, response }) {
    if (response !== undefined) this.response = Math.max(0.05, response);
    if (bounce !== undefined) this.damping = 1 - Math.min(0.9, Math.max(0, bounce));
  }

  /** Re-target. Velocity is preserved, which is what makes a reversal smooth. */
  to(target, velocity) {
    this.target = target;
    if (velocity !== undefined) this.velocity = velocity;
    this.start();
  }

  /** Jump without animating, for reduced motion and for initial state. */
  set(value) {
    this.stop();
    this.value = this.target = value;
    this.velocity = 0;
    this.onChange?.(this.value);
  }

  start() {
    if (this.raf) return;
    this.last = performance.now();
    const step = (now) => {
      // clamp dt: a backgrounded tab returns a huge delta and the spring explodes
      const dt = Math.min((now - this.last) / 1000, 1 / 30);
      this.last = now;
      const w = (2 * Math.PI) / this.response;
      const a = -(w * w) * (this.value - this.target) - 2 * this.damping * w * this.velocity;
      this.velocity += a * dt;
      this.value += this.velocity * dt;
      this.onChange?.(this.value);
      if (Math.abs(this.value - this.target) < 0.0008 && Math.abs(this.velocity) < 0.0008) {
        this.value = this.target;
        this.velocity = 0;
        this.onChange?.(this.value);
        this.raf = 0;
        return;
      }
      this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }
}

export const reducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Press feedback on pointer-DOWN, not on click. Waiting for the release is the
 * single most common way a web interface reads as dead: the button is already
 * pressed and nothing has happened yet.
 */
export function pressable(el, { scale = 0.97 } = {}) {
  if (reducedMotion()) return;
  const s = new Spring(1, {
    bounce: 0,
    response: 0.22,
    onChange: (v) => { el.style.transform = `scale(${v})`; },
  });
  const down = () => s.to(scale);
  const up = () => s.to(1);
  el.addEventListener("pointerdown", down, { passive: true });
  el.addEventListener("pointerup", up, { passive: true });
  el.addEventListener("pointercancel", up, { passive: true });
  el.addEventListener("pointerleave", up, { passive: true });
  // a keyboard activation gets the same acknowledgement as a press
  el.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") down(); });
  el.addEventListener("keyup", up);
}
