import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

interface HeroCta {
  text: string;
  href?: string;
  onClick?: () => void;
}

interface AnimatedHeroProps {
  backgroundImageUrl?: string;
  backgroundVideoUrl?: string;
  logo?: React.ReactNode;
  navLinks?: NavLink[];
  topRightAction?: React.ReactNode;
  showHeader?: boolean;
  kicker?: string;
  title: string;
  description: React.ReactNode;
  ctaButton: HeroCta;
  secondaryCta?: HeroCta;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

const glassButtonClassName =
  "m3-hero-glass-btn bg-white/10 backdrop-blur-sm border border-white/20 text-primary-foreground hover:bg-white/20 transition-colors";

function HeroCtaButton({ cta, size = "lg" }: { cta: HeroCta; size?: "lg" | "default" }) {
  if (cta.href) {
    return (
      <Button asChild size={size} className={glassButtonClassName}>
        <a href={cta.href}>{cta.text}</a>
      </Button>
    );
  }

  return (
    <Button type="button" onClick={cta.onClick} size={size} className={glassButtonClassName}>
      {cta.text}
    </Button>
  );
}

export const AnimatedHero = ({
  backgroundImageUrl,
  backgroundVideoUrl,
  logo,
  navLinks = [],
  topRightAction,
  showHeader = false,
  kicker,
  title,
  description,
  ctaButton,
  secondaryCta,
  className,
}: AnimatedHeroProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    void video.play().catch(() => {
      /* autoplay blocked */
    });
  }, [backgroundVideoUrl]);

  return (
    <div
      className={cn(
        "relative flex min-h-[clamp(22rem,62vh,38rem)] w-full flex-col justify-center overflow-hidden bg-background md:min-h-[clamp(24rem,68vh,40rem)]",
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        {backgroundVideoUrl ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={backgroundVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl ?? ""})` }}
          />
        )}
        <div className="m3-hero-video-overlay absolute inset-0" aria-hidden="true" />
      </div>

      {showHeader && logo && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
          className="absolute top-0 z-20 flex h-20 w-full items-center justify-between px-6 text-white md:px-12"
        >
          <div className="flex items-center gap-2">{logo}</div>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">{topRightAction}</div>
        </motion.header>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full px-[clamp(1rem,4vw,1.5rem)]"
      >
        <div className="m3-hero-content mx-auto flex w-full max-w-[min(1180px,100%)] flex-col items-start justify-center text-left">
          {kicker ? (
            <motion.span
              variants={itemVariants}
              className="m3-hero-kicker mb-4 inline-flex max-w-full items-center border-l-4 border-[#e1a935] px-4 py-2 text-xs font-bold uppercase tracking-[0.11em] md:text-sm"
            >
              {kicker}
            </motion.span>
          ) : null}
          <motion.h1
            variants={itemVariants}
            className="m3-hero-title max-w-[20ch] text-[clamp(1.5rem,4.2vw,2.85rem)] font-bold leading-[1.12] tracking-tight sm:max-w-[28ch] md:max-w-none md:whitespace-nowrap"
          >
            {title}
          </motion.h1>
          <motion.div
            variants={itemVariants}
            className="m3-hero-description mt-5 max-w-2xl text-base leading-relaxed md:mt-6 md:text-lg"
          >
            {description}
          </motion.div>
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
            <HeroCtaButton cta={ctaButton} />
            {secondaryCta ? <HeroCtaButton cta={secondaryCta} /> : null}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
