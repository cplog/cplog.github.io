import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.181.0/build/three.module.js";

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// The portrait is a depth-displaced relief, not a flat plane. A monocular
// depth map (Depth Anything V2, generated once and committed) pushes the
// vertices of a subdivided quad along z, so the child stands forward of the
// rampart and the sky falls away behind it. That is what makes the parallax
// read as depth rather than as the picture sliding.
//
// It is a relief, not a model: there is no data behind the child, so past
// roughly 25 degrees the disocclusion starts to smear. The camera range below
// is set to stay inside that. Ember bands sit in front of and behind the
// relief, and everything drifts on its own, because a touch device has no
// pointer and would otherwise see a static picture.
const EMBERS = 150;
const NEAR = -0.55; // ember band nearest the camera, in front of the portrait
const FAR = 1.35;   // furthest band, behind it
const SPAN = 3.2;   // vertical distance an ember travels before it respawns
const RELIEF = 0.62; // world units between the furthest and nearest depth

const portraitVertex = /* glsl */ `
  uniform sampler2D uDepth;
  uniform float uRelief;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Depth map: 1 is near, 0 is far. Centred so the relief grows around the
    // plane rather than pushing the whole image at the camera.
    float d = texture2D(uDepth, uv).r;
    vec3 p = position;
    p.z += (d - 0.5) * uRelief;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const portraitFragment = /* glsl */ `
  uniform sampler2D uMap;
  varying vec2 vUv;
  void main() {
    gl_FragColor = texture2D(uMap, vUv);
    #include <colorspace_fragment>
  }
`;

const emberVertex = /* glsl */ `
  attribute float aSeed;
  attribute float aSpeed;
  attribute float aSize;
  attribute float aSway;
  uniform float uTime;
  uniform float uScale;
  varying float vHeat;
  varying float vFade;

  void main() {
    vec3 p = position;
    // Rise and wrap. mod() respawns each ember at the bottom without any
    // CPU-side bookkeeping, so the whole field is one draw call.
    float y = mod(p.y + uTime * aSpeed + aSeed * SPAN_C, SPAN_C) - SPAN_C * 0.5;
    p.x += sin(uTime * aSway + aSeed * 6.2831) * 0.18;
    p.y = y;

    // Flicker, and fade out over the top third of the rise so embers die
    // rather than vanishing at a hard edge.
    vHeat = 0.55 + 0.45 * sin(uTime * (2.4 + aSway * 3.0) + aSeed * 21.7);
    float life = (y + SPAN_C * 0.5) / SPAN_C;
    vFade = smoothstep(0.0, 0.14, life) * (1.0 - smoothstep(0.62, 1.0, life));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`.replace(/SPAN_C/g, SPAN.toFixed(4));

const emberFragment = /* glsl */ `
  varying float vHeat;
  varying float vFade;
  void main() {
    // Soft round sprite from point coordinates: no texture to download.
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.02, d);
    a *= a;
    vec3 cool = vec3(0.78, 0.22, 0.06);
    vec3 hot  = vec3(1.0, 0.72, 0.32);
    gl_FragColor = vec4(mix(cool, hot, vHeat), a * vFade * (0.18 + 0.42 * vHeat));
    #include <colorspace_fragment>
  }
`;

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
    const loader = new THREE.TextureLoader();
    // Both maps must be present before the relief means anything, so the
    // fallback <img> stays up until the pair has landed.
    Promise.all([
      loader.loadAsync("./assets/hero/siege-baby.webp"),
      loader.loadAsync("./assets/hero/siege-depth.webp"),
    ]).then(([colour, depth]) => {
      colour.colorSpace = THREE.SRGBColorSpace;
      colour.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
      // The depth map is data, not colour: no sRGB decode, and linear filtering
      // so the displacement is smooth between texels.
      depth.colorSpace = THREE.NoColorSpace;
      depth.minFilter = THREE.LinearFilter;
      depth.magFilter = THREE.LinearFilter;
      depth.generateMipmaps = false;

      this.portraitUniforms = {
        uMap: { value: colour },
        uDepth: { value: depth },
        uRelief: { value: RELIEF },
      };
      // A unit quad, subdivided so there are vertices for the depth map to
      // move, then cover-fitted in resize(). The old fixed 2x3 flat plane
      // showed only 78% of the art at this frustum and cropped the rest.
      this.portrait = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, 96, 144),
        new THREE.ShaderMaterial({
          uniforms: this.portraitUniforms,
          vertexShader: portraitVertex,
          fragmentShader: portraitFragment,
        }),
      );
      this.portraitAspect = colour.image.width / colour.image.height;
      this.scene.add(this.portrait);
      this.resize();
      onReady?.();
      this.render();
    }).catch(() => { /* The semantic <img> remains visible if either map fails. */ });
  }

  addEmbers() {
    const positions = new Float32Array(EMBERS * 3);
    const seeds = new Float32Array(EMBERS);
    const speeds = new Float32Array(EMBERS);
    const sizes = new Float32Array(EMBERS);
    const sways = new Float32Array(EMBERS);
    for (let i = 0; i < EMBERS; i++) {
      // Fixed arithmetic rather than Math.random: every deploy has the same art
      // direction instead of a page that changes character on each refresh.
      const a = (i * 0.61803398875) % 1;
      const b = (i * 0.37135) % 1;
      const c = (i * 0.19731) % 1;
      // Three depth bands. The near band parallaxes hardest against the
      // portrait and is what actually reads as depth.
      const band = i % 3;
      const z = band === 0 ? NEAR + c * 0.35
              : band === 1 ? 0.15 + c * 0.35
              : FAR - c * 0.5;
      positions[i * 3] = (a - 0.5) * 4.4;
      positions[i * 3 + 1] = (b - 0.5) * SPAN;
      positions[i * 3 + 2] = z;
      seeds[i] = a;
      // Nearer embers rise faster: another depth cue, and it stops the field
      // moving as one sheet.
      speeds[i] = (band === 0 ? 0.5 : band === 1 ? 0.33 : 0.2) * (0.7 + b * 0.6);
      // World units, not pixels: gl_PointSize = aSize * (0.5 * bufferHeight) / -mv.z.
      // These land at roughly 6 / 4 / 2.5 CSS px per band.
      sizes[i] = (band === 0 ? 0.098 : band === 1 ? 0.055 : 0.029) * (0.6 + c * 0.8);
      sways[i] = 0.25 + b * 0.55;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aSway", new THREE.BufferAttribute(sways, 1));

    this.emberUniforms = { uTime: { value: 0 }, uScale: { value: 300 } };
    this.embers = new THREE.Points(geometry, new THREE.ShaderMaterial({
      uniforms: this.emberUniforms,
      vertexShader: emberVertex,
      fragmentShader: emberFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
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

    // Cover-fit the portrait to the frame, plus overscan so the parallax has
    // somewhere to travel without exposing an edge.
    if (this.portrait) {
      const vh = 2 * this.camera.position.z * Math.tan((this.camera.fov * Math.PI) / 360);
      const vw = vh * this.camera.aspect;
      // Sized empirically at full pointer deflection: the relief's receded
      // half shrinks toward the camera's far distance, the keystone trims a
      // little more, and 1.2 left the left edge showing the backing.
      const overscan = 1.36;
      const scale = Math.max(vw / this.portraitAspect, vh) * overscan;
      // Scale x and y only. Scaling z would multiply the relief with the
      // frame size and make the depth breathe as the window resizes.
      this.portrait.scale.set(scale * this.portraitAspect, scale, 1);
    }
    this.emberUniforms.uScale.value = 0.5 * this.renderer.domElement.height;
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
    const t = this.reduced ? 6 : this.clock.getElapsedTime();
    this.emberUniforms.uTime.value = t;

    // Ambient drift on two periods that do not divide into each other, so the
    // scene never visibly loops. This is the whole of the motion on a touch
    // device, so it carries the shot rather than decorating it.
    const driftX = this.reduced ? 0 : Math.sin(t * 0.21) * 0.55 + Math.sin(t * 0.09) * 0.25;
    const driftY = this.reduced ? 0 : Math.cos(t * 0.17) * 0.35;

    this.pointer.lerp(this.target, this.reduced ? 1 : 0.075);
    const x = this.pointer.x + driftX;
    const y = this.pointer.y + driftY;

    this.camera.position.x = x * 0.62;
    this.camera.position.y = -y * 0.42;
    this.camera.lookAt(0, 0, 0);
    if (this.portrait) {
      // Counter-move the portrait a little so it lags the camera. The embers
      // do not, which is what separates them in depth.
      // No counter-move. The relief supplies the depth, so sliding the plane
      // as well only fights that parallax and spends frame coverage.
      this.portrait.position.set(0, 0, 0);
    }
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    cancelAnimationFrame(this.frame);
    this.observer?.disconnect();
    removeEventListener("resize", this.onResize);
    this.host.removeEventListener("pointermove", this.onPointerMove);
    this.host.removeEventListener("pointerleave", this.onPointerLeave);
    this.embers?.geometry.dispose();
    this.embers?.material.dispose();
    this.portrait?.geometry.dispose();
    this.portraitUniforms?.uMap.value.dispose();
    this.portraitUniforms?.uDepth.value.dispose();
    this.portrait?.material.dispose();
    this.renderer?.dispose();
  }
}
