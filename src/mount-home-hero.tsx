import React from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import "./home-hero.css";

function HomeHeroApp() {
  return (
    <div className="m3-home-hero-root w-full">
      <AnimatedHero
        backgroundVideoUrl="/assets/videos/hero.mp4"
        kicker="Pivot with a purpose"
        title="We don't just advise. We travel with you."
        description={
          <>
            Hands-on partners for India&apos;s pre-seed and seed stage —{" "}
            <strong className="font-semibold text-white">Money, Market &amp; Management</strong>.
          </>
        }
        ctaButton={{ text: "Talk to us", href: "contact.html" }}
      />
    </div>
  );
}

function mountAll() {
  document.querySelectorAll("[data-home-hero]").forEach((el) => {
    if (el.getAttribute("data-mounted") === "true") return;
    el.setAttribute("data-mounted", "true");
    const root = createRoot(el);
    root.render(
      <React.StrictMode>
        <MotionConfig reducedMotion="user">
          <HomeHeroApp />
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
