import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  src: string;
  alt: string;
  href?: string;
  /** Logo slides use padding so the mark fits inside the card */
  variant?: "logo" | "photo";
}

interface FeatureCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[];
  /** Auto-advance interval in ms; 0 disables */
  autoPlayMs?: number;
}

export const FeatureCarousel = React.forwardRef<
  HTMLDivElement,
  FeatureCarouselProps
>(({ images, autoPlayMs = 4000, className, ...props }, ref) => {
  const [currentIndex, setCurrentIndex] = React.useState(
    () => Math.floor(images.length / 2) || 0
  );
  const [slideOffsetPercent, setSlideOffsetPercent] = React.useState(45);

  React.useEffect(() => {
    const narrow = window.matchMedia("(max-width: 479px)");
    const update = () => setSlideOffsetPercent(narrow.matches ? 36 : 45);
    update();
    narrow.addEventListener("change", update);
    return () => narrow.removeEventListener("change", update);
  }, []);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = React.useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  React.useEffect(() => {
    if (autoPlayMs <= 0 || images.length < 2) return;
    const timer = setInterval(handleNext, autoPlayMs);
    return () => clearInterval(timer);
  }, [handleNext, autoPlayMs, images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full flex flex-col items-center justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-[-15%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(3,66,133,0.18),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 right-[-15%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(225,169,53,0.2),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 w-full h-[min(36vh,260px)] min-h-[200px] flex items-center justify-center">
        <div
          className="relative w-full h-full flex items-center justify-center [perspective:1000px]"
          role="region"
          aria-label="Portfolio carousel"
          aria-roledescription="carousel"
        >
          {images.map((image, index) => {
            const offset = index - currentIndex;
            const total = images.length;
            let pos = (offset + total) % total;
            if (pos > Math.floor(total / 2)) {
              pos = pos - total;
            }

            const isCenter = pos === 0;
            const isAdjacent = Math.abs(pos) === 1;

            const isLogo = image.variant === "logo";
            const slide = (
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-foreground/10 shadow-2xl",
                  isLogo ? "bg-white p-2 sm:p-3" : "bg-muted/40"
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={cn(
                    "object-contain object-center",
                    isLogo
                      ? "h-full w-full max-h-full max-w-full"
                      : "h-full w-full max-h-full max-w-full"
                  )}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            );

            return (
              <div
                key={`${image.src}-${index}`}
                className={cn(
                  "absolute w-[9.25rem] h-[10.25rem] sm:w-52 sm:h-[188px] md:w-60 md:h-[208px] lg:w-64 lg:h-[220px]",
                  "transition-all duration-500 ease-in-out flex items-center justify-center"
                )}
                style={{
                  transform: `
                    translateX(${pos * slideOffsetPercent}%)
                    scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7})
                    rotateY(${pos * -10}deg)
                  `,
                  zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                  opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
                  filter: isCenter ? "blur(0px)" : "blur(3px)",
                  visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
                }}
                aria-hidden={!isCenter}
              >
                {image.href ? (
                  <a
                    href={image.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      !isCenter && "pointer-events-none"
                    )}
                    tabIndex={isCenter ? 0 : -1}
                    aria-label={isCenter ? `Visit ${image.alt}` : undefined}
                  >
                    {slide}
                  </a>
                ) : (
                  slide
                )}
              </div>
            );
          })}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 rounded-full h-9 w-9 sm:h-10 sm:w-10 z-20 bg-background/80 backdrop-blur-sm shadow-md"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 rounded-full h-9 w-9 sm:h-10 sm:w-10 z-20 bg-background/80 backdrop-blur-sm shadow-md"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
});

FeatureCarousel.displayName = "FeatureCarousel";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  subtitle: string;
  images: CarouselImage[];
}

export const HeroSection = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ title, subtitle, images, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-background text-foreground p-4",
          className
        )}
        {...props}
      >
        <div className="z-10 flex w-full flex-col items-center text-center space-y-8 md:space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter max-w-4xl">
              {title}
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              {subtitle}
            </p>
          </div>
          <FeatureCarousel
            images={images}
            className="w-full max-w-6xl"
          />
        </div>
      </div>
    );
  }
);

HeroSection.displayName = "HeroSection";
