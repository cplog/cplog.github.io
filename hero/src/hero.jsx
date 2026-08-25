// The hero field, mounted into the hand-written index.html.
//
// The page stays vanilla: this is the only built artefact, and it attaches to
// one element. Nothing else on the site knows React exists.
import React from "react";
import { createRoot } from "react-dom/client";
import { ConnectivityGraph } from "@designcodeio/threeui/components/ConnectivityGraph";
import "@designcodeio/threeui/style.css";

const reduced = () =>
  typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

function Field() {
  const [slow, setSlow] = React.useState(reduced);
  React.useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const on = (e) => setSlow(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return (
    <ConnectivityGraph
      mode="light"
      // reduced motion slows the field rather than blanking it: the graph is
      // the hero's only image, so removing it would leave a hole
      speed={slow ? 0.1 : 0.62}
      density={1.15}
      gap={2.2}
      strokeWidth={0.9}
      opacity={0.92}
      // Monochrome, and lifted to the page's own tint. The component's "light"
      // mode ships a mid-grey ground that reads as a slab against a near-white
      // page; measured mean pixel goes 211 -> 245 at 1.16, which is exactly
      // var(--tint), while the strokes stay at 67 and keep their contrast.
      saturation={0}
      brightness={1.16}
    />
  );
}

const el = document.getElementById("hero-3d");
if (el) createRoot(el).render(<Field />);
