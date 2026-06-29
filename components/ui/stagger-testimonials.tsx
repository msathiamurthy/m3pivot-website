"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

/**
 * Testimonial cards for the Home, Startups, and Investors pages.
 *
 * HOW TO ADD A NEW TESTIMONIAL
 * ----------------------------
 * 1. Append a new object to the `testimonials` array below.
 * 2. Fields:
 *    - tempId   — unique number (increment from the last entry)
 *    - testimonial — quote text (shown inside the card)
 *    - by       — attribution, e.g. "Jane Doe, Acme Corp"
 *    - imgSrc   — path under /assets/… or a full image URL
 *    - isLogo   — (optional) set true for company logos; uses contain sizing
 *                  instead of a circular headshot crop
 * 3. Rebuild the bundle:  npm run build:testimonials
 * 4. The updated cards appear on every page with a [data-testimonials] mount point.
 *
 * Example:
 *   {
 *     tempId: 1,
 *     testimonial: "Their guidance helped us ship faster.",
 *     by: "Jane Doe, Acme Corp",
 *     imgSrc: "/assets/images/portfolio/acme-logo.png",
 *     isLogo: true,
 *   },
 */
const testimonials = [
  {
    tempId: 0,
    testimonial: "We got some valuable feedback from M3 Pivot team, and it really opened our eyes. Since our product is unique and new to the Indian market, they helped us truly understand how the market looks at what we're doing and where we can improve. Their advice was incredibly practical, straightforward, and easy for our team to put into action.",
    by: "Skye Team, Skye Devices",
    imgSrc: "/assets/images/portfolio/skye-devices-logo.png",
    isLogo: true,
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
  interactive?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
  interactive = true,
}) => {
  const isCenter = position === 0;
  return (
    <div
      onClick={() => interactive && handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 border-2 p-8 transition-all duration-500 ease-in-out",
        interactive && "cursor-pointer",
        isCenter
          ? "z-10 bg-primary text-primary-foreground border-primary"
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        className={cn(
          "mb-3 flex-shrink-0",
          (testimonial as any).isLogo
            ? "h-10 w-auto max-w-[120px] object-contain bg-white rounded px-1 py-1"
            : "h-14 w-12 bg-muted object-cover object-top"
        )}
        style={(testimonial as any).isLogo ? {} : { boxShadow: "3px 3px 0px hsl(var(--background))" }}
      />
      <div
        className="overflow-y-auto pr-1 flex-1"
        style={{ maxHeight: cardSize - 210, scrollbarWidth: "thin" }}
      >
        <h3 className={cn(
          "text-base sm:text-xl font-medium",
          isCenter ? "text-primary-foreground" : "text-foreground"
        )}>
          "{testimonial.testimonial}"
        </h3>
      </div>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        — {testimonial.by}
      </p>
    </div>
  );
};

function getCardPosition(index: number, total: number): number {
  if (total <= 1) return 0;
  return total % 2
    ? index - (total + 1) / 2
    : index - total / 2;
}

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const hasMultiple = testimonialsList.length > 1;

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="m3-testimonials-carousel relative w-full overflow-hidden bg-muted/30"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.tempId}
          testimonial={testimonial}
          handleMove={hasMultiple ? handleMove : () => {}}
          position={getCardPosition(index, testimonialsList.length)}
          cardSize={cardSize}
          interactive={hasMultiple}
        />
      ))}
      {hasMultiple && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          <button
            onClick={() => handleMove(-1)}
            className={cn(
              "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
              "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => handleMove(1)}
            className={cn(
              "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
              "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};
