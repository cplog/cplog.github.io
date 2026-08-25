# gardenbuild

Source for the hero: a garden that becomes a QR code, in WebGL.

    cd gardenbuild && npm install && npm run build

Output is `../assets/card/garden.js`, which **is** committed — GitHub Pages
serves straight off the branch.

## Why WebGL, after two 2D attempts

The 2D canvas versions never looked like the thing they were imitating.
Reading ThreeUI's own Sylva scene settled why: it imports no 3D models at all
— it is `ShaderMaterial`, procedural noise, fog, additive sprites and bloom.
The gap was the pipeline, not the drawing. Canvas 2D has no per-pixel shading,
no depth buffer and no additive accumulation, so no amount of tuning arrives.

## Things that bit, worth not relearning

- **Additive blending needs a dark ground.** The first WebGL pass painted the
  scene onto the page's white panel and it blew out to a white cloud within
  one frame. Every Sylva scene is dark for this reason. The panel is now dark
  and resolves to a white card as the code takes over.
- **`gl_PointSize` is in device pixels**, so the dpr belongs in the scale
  uniform. Without it sprites were ~15px and the scene was a single blob.
- **A uniform read in both stages needs matching precision.** `uT` was
  implicitly highp in the vertex shader and mediump in the fragment, which
  fails link validation with no useful error.
- **The scene budget must sum to 1.0.** Grass pushes three sprites per blade,
  so its loop count is the share divided by three. Iterating the full share
  spent 60% of the budget, overflowed the total to ~140%, and `slice(0, n)`
  then silently dropped whatever was built last — two of the four canopies.
  Nothing errored; the trees just had no crowns.
- **Additive light has no ceiling.** One dense clump saturates to white, so
  the fragment shader clamps.

The QR is never rendered in WebGL. Soft additive sprites are the opposite of
what a camera needs, so the crisp code is drawn on a plain 2D canvas stacked
on top and the two cross-fade. Verified by decoding with jsQR, not by eye.
