import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.181.0/build/three.module.js";

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// A deliberately small Three.js scene: the generated portrait is a textured
// plane and the depth comes from separate ember particles and pointer parallax.
// It degrades to the <img> below the canvas if either WebGL or the CDN fails.
export class SiegeScene {
  constructor(canvas, { onReady } = {}) {
    this.canvas = canvas;
    this.host = canvas.parentElement;
    this.reduced = reducedMotion();
    this.pointer = new THREE.Vector2();
    this.target = new THREE.Vector2();
    this.clock = new THREE.Clock();
    this.frame = 0;
    this.visible = true;

    try {
      this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    } catch {
      this.failed = true;
      return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(28, 2 / 3, 0.1, 20);
    this.camera.position.set(0, 0, 4.7);

    this.addEmbers();
    this.loadPortrait(onReady);
    this.resize();

    this.onPointerMove = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      this.target.set(
        ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      );
    };
    this.onPointerLeave = () => this.target.set(0, 0);
    this.host.addEventListener("pointermove", this.onPointerMove, { passive: true });
    this.host.addEventListener("pointerleave", this.onPointerLeave, { passive: true });
    this.onResize = () => this.resize();
    addEventListener("resize", this.onResize, { passive: true });
    this.observer = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible && !this.reduced) this.start();
    }, { threshold: 0.05 });
    this.observer.observe(this.host);

    this.render();
    if (!this.reduced) this.start();
  }

  loadPortrait(onReady) {
    new THREE.TextureLoader().load(
      "./assets/hero/siege-baby.png",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        this.portrait = new THREE.Mesh(new THREE.PlaneGeometry(2, 3), material);
        this.scene.add(this.portrait);
        onReady?.();
        this.render();
      },
      undefined,
      () => { /* The semantic <img> remains visible if the texture cannot load. */ },
    );
  }

  addEmbers() {
    const count = 96;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Fixed arithmetic gives each deploy the same art direction, rather than
      // a page that changes character on every refresh.
      const seed = (i * 0.61803398875) % 1;
      positions[i * 3] = (seed - 0.5) * 3.2;
      positions[i * 3 + 1] = (((i * 0.371) % 1) - 0.5) * 4.2;
      positions[i * 3 + 2] = -0.4 + ((i * 0.197) % 1) * 1.8;
      sizes[i] = 0.015 + ((i * 0.137) % 1) * 0.045;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    this.embers = new THREE.Points(geometry, new THREE.PointsMaterial({
      color: 0xff6b35,
      size: 0.045,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    }));
    this.scene.add(this.embers);
  }

  resize() {
    const { width, height } = this.host.getBoundingClientRect();
    if (!width || !height) return;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.render();
  }

  start() {
    if (this.frame || !this.visible) return;
    const tick = () => {
      this.frame = requestAnimationFrame(tick);
      if (!this.visible) {
        cancelAnimationFrame(this.frame);
        this.frame = 0;
        return;
      }
      this.render();
    };
    this.frame = requestAnimationFrame(tick);
  }

  render() {
    if (this.failed) return;
    const elapsed = this.clock.getElapsedTime();
    this.pointer.lerp(this.target, this.reduced ? 1 : 0.045);
    this.camera.position.x = this.pointer.x * 0.09;
    this.camera.position.y = -this.pointer.y * 0.06;
    this.camera.lookAt(0, 0, 0);
    if (this.portrait) {
      this.portrait.rotation.y = this.pointer.x * -0.035;
      this.portrait.rotation.x = this.pointer.y * 0.018;
    }
    this.embers.rotation.z = this.reduced ? 0 : elapsed * 0.018;
    this.embers.position.y = this.reduced ? 0 : Math.sin(elapsed * 0.6) * 0.035;
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    cancelAnimationFrame(this.frame);
    this.observer?.disconnect();
    removeEventListener("resize", this.onResize);
    this.host.removeEventListener("pointermove", this.onPointerMove);
    this.host.removeEventListener("pointerleave", this.onPointerLeave);
    this.renderer?.dispose();
  }
}
