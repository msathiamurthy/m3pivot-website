import React, { useState, useEffect, useRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  common: string;
  binomial: string;
  href?: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
  /** Optional scroll container; defaults to window. */
  scrollRoot?: HTMLElement | null;
  /** Tall page section: rotation follows window scroll through this element. */
  scrollSectionRef?: React.RefObject<HTMLElement | null>;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      radius = 600,
      autoRotateSpeed = 0.02,
      scrollRoot = null,
      scrollSectionRef,
      ...props
    },
    ref
  ) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        let scrollProgress = 0;
        const section = scrollSectionRef?.current ?? null;

        if (section) {
          const rect = section.getBoundingClientRect();
          const scrollable = section.offsetHeight - window.innerHeight;
          if (scrollable > 0) {
            scrollProgress = Math.min(1, Math.max(0, -rect.top / scrollable));
          }
        } else if (scrollRoot) {
          const scrollableHeight =
            scrollRoot.scrollHeight - scrollRoot.clientHeight;
          scrollProgress =
            scrollableHeight > 0 ? scrollRoot.scrollTop / scrollableHeight : 0;
        } else {
          const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          scrollProgress =
            scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        }

        setRotation(scrollProgress * 360);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [scrollRoot, scrollSectionRef]);

    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) {
          setRotation((prev) => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full h-full flex items-center justify-center",
          className
        )}
        style={{ perspective: "2000px" }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
            );
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

            const card = (
              <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-border bg-card/70 backdrop-blur-lg">
                <img
                  src={item.photo.url}
                  alt={item.photo.text}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: item.photo.pos || "center" }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h2 className="text-xl font-bold">{item.common}</h2>
                  <em className="text-sm italic opacity-80">{item.binomial}</em>
                  <p className="text-xs mt-2 opacity-70">
                    Photo by: {item.photo.by}
                  </p>
                </div>
              </div>
            );

            return (
              <div
                key={`${item.common}-${item.photo.url}`}
                role="group"
                aria-label={item.common}
                className="circular-gallery__item absolute"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%",
                  top: "50%",
                  opacity,
                  transition: "opacity 0.3s linear",
                }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#034285]"
                    aria-label={`Visit ${item.common}`}
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
