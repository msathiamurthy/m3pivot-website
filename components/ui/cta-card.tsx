"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CtaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  kicker?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageSrc: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 90, damping: 14 },
  },
};

const CtaCard = React.forwardRef<HTMLDivElement, CtaCardProps>(
  ({ className, kicker, title, description, buttonText, buttonHref, imageSrc, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("m3-cta-card relative w-full overflow-hidden", className)}
        {...props}
      >
        {/* Background image */}
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        {/* Theme-aware overlay */}
        <div className="m3-cta-overlay absolute inset-0" aria-hidden="true" />

        {/* Content */}
        <motion.div
          className="relative z-10 m3-cta-inner"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="m3-cta-text">
            {kicker && (
              <motion.p className="m3-cta-kicker" variants={itemVariants}>
                {kicker}
              </motion.p>
            )}
            <motion.h2 className="m3-cta-title" variants={itemVariants}>
              {title}
            </motion.h2>
            <motion.p className="m3-cta-desc" variants={itemVariants}>
              {description}
            </motion.p>
          </div>

          <motion.div className="m3-cta-action" variants={itemVariants}>
            <a href={buttonHref} className="m3-cta-btn">
              {buttonText}
              <ArrowRight className="m3-cta-btn__icon" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    );
  }
);

CtaCard.displayName = "CtaCard";
export { CtaCard };
