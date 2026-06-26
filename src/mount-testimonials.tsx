import React from "react";
import { createRoot } from "react-dom/client";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import "./testimonials-section.css";

function mountAll() {
  document.querySelectorAll<HTMLElement>("[data-testimonials]").forEach((el) => {
    if (el.getAttribute("data-mounted") === "true") return;
    el.setAttribute("data-mounted", "true");

    const root = createRoot(el);
    root.render(
      <React.StrictMode>
        <div className="m3-testimonials-root">
          <div className="container container--wide">
            <div className="m3-testimonials-header">
              <p className="m3-testimonials-kicker">Client Testimonials</p>
              <h2 className="m3-testimonials-heading">What our partners say</h2>
            </div>
            <StaggerTestimonials />
          </div>
        </div>
      </React.StrictMode>
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountAll);
} else {
  mountAll();
}
