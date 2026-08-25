# hero

Source for the one built artefact on the site: the hero field, a ThreeUI
`ConnectivityGraph` mounted into `#hero-3d` in the hand-written `index.html`.

Everything else on the site is vanilla and has no build step. This exists
because ThreeUI is a React + Three.js library and there is no other way to
consume it.

## Build

    cd hero && npm install && npm run build

Output goes to `../assets/hero/` (`hero.js` + `hero.css`), which **is**
committed — the site is served straight off the branch by GitHub Pages, so the
built files have to be in the repo. `node_modules/` is not.

## Notes

- `define: { "process.env.NODE_ENV": '"production"' }` is required. Vite's
  library mode does not set it, and without it React ships its dev build, which
  throws `process is not defined` in the browser.
- Library mode emits `hero.css` but never loads it. `index.html` injects the
  stylesheet itself, next to the dynamic import.
- `brightness={1.16}` is measured, not guessed: ThreeUI's `light` mode ships a
  mid-grey ground that reads as a slab on a near-white page. 1.16 puts the mean
  pixel at 245, which is exactly `var(--tint)`, while strokes stay at 67.
