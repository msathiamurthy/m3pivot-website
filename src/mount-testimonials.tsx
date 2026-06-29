import React from "react";
import { createRoot } from "react-dom/client";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import "./testimonials-section.css";

/**
 * Mounts the testimonials section on any element with [data-testimonials].
 * Place the mount point as a direct child of a full-width <section> (outside
 * .container) so the carousel can span the viewport. Card data lives in
 * components/ui/stagger-testimonials.tsx — see the comment block there.
 */
function mountAll() {
  document.querySelectorAll<HTMLElement>("[data-testimonials]").forEach((el) => {
    if (el.getAttribute("data-mounted") === "true") return;
    el.setAttribute("data-mounted", "true");

    const root = createRoot(el);
    root.render(
      <React.StrictMode>
        <div className="m3-testimonials-root">
          <div className="m3-testimonials-header-wrap">
            <div className="m3-testimonials-header">
              <p className="m3-testimonials-kicker">Client Testimonials</p>
              <h2 className="m3-testimonials-heading">What our partners say</h2>
            </div>
          </div>
          <StaggerTestimonials />
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
