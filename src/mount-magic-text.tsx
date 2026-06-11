import React from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { MagicText } from "@/components/ui/magic-text";
import "./magic-text-section.css";

const QUOTE_TEXT =
  "We stay beside you — not parachute in with a deck and vanish — from first calls to the conversations that shape your company.";

function MagicTextSection() {
  return (
    <div className="m3-magic-text-root w-full">
      <section
        className="m3-magic-text-section"
        id="journey"
        aria-labelledby="journey-heading"
      >
        <h2 id="journey-heading" className="visually-hidden">
          How we work
        </h2>
        <div className="m3-magic-text-inner">
          <div className="m3-magic-text-mark" aria-hidden="true">
            <span className="m3-magic-text-mark__quote">&ldquo;</span>
            <span className="m3-magic-text-mark__accent" />
          </div>
          <div className="m3-magic-text-body">
            <MagicText text={QUOTE_TEXT} />
            <p className="m3-magic-text-note">
              Skin in the game. Not slides on a screen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


function mountAll() {
  document.querySelectorAll("[data-magic-text]").forEach((el) => {
    if (el.getAttribute("data-mounted") === "true") return;
    el.setAttribute("data-mounted", "true");
    const root = createRoot(el);
    root.render(
      <React.StrictMode>
        <MotionConfig reducedMotion="user">
          <MagicTextSection />
        </MotionConfig>
      </React.StrictMode>
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountAll);
} else {
  mountAll();
}
