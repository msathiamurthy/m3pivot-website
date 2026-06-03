import React from "react";
import { createRoot } from "react-dom/client";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
import { portfolioCarouselImages } from "./portfolio-data";
import "./index.css";

function PortfolioGalleryApp() {
  return (
    <div className="m3-portfolio-gallery-root w-full">
      <FeatureCarousel
        images={portfolioCarouselImages}
        autoPlayMs={4500}
        className="w-full rounded-2xl bg-background/40"
      />
    </div>
  );
}

function mountAll() {
  document.querySelectorAll("[data-portfolio-gallery]").forEach((el) => {
    if (el.getAttribute("data-mounted") === "true") return;
    el.setAttribute("data-mounted", "true");
    const root = createRoot(el);
    root.render(
      <React.StrictMode>
        <PortfolioGalleryApp />
      </React.StrictMode>
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountAll);
} else {
  mountAll();
}
