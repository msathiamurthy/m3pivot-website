import React from "react";
import { createRoot } from "react-dom/client";
import { CtaCard } from "@/components/ui/cta-card";
import "./cta-section.css";

// Professional boardroom/meeting — suits a VC advisory firm
const CTA_IMAGE =
  "https://images.unsplash.com/photo-1543269664-56d93c851db5?auto=format&fit=crop&w=1400&q=80";

function mountAll() {
  document.querySelectorAll<HTMLElement>("[data-cta]").forEach((el) => {
    if (el.getAttribute("data-mounted") === "true") return;
    el.setAttribute("data-mounted", "true");

    const kicker = el.dataset.kicker ?? "Get in touch";
    const title = el.dataset.title ?? "Ready to start a conversation?";
    const description = el.dataset.description ?? "";
    const buttonText = el.dataset.buttonText ?? "Get in touch";
    const buttonHref = el.dataset.buttonHref ?? "contact.html";
    const imageSrc = el.dataset.imageSrc ?? CTA_IMAGE;

    const root = createRoot(el);
    root.render(
      <React.StrictMode>
        <div className="m3-cta-root">
          <div className="container container--wide">
            <CtaCard
              kicker={kicker}
              title={title}
              description={description}
              buttonText={buttonText}
              buttonHref={buttonHref}
              imageSrc={imageSrc}
            />
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
