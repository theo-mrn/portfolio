"use client";

import React from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressBarType {
  type?: "circle" | "bar";
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  color?: string;
  strokeSize?: number;
  showPercentage?: boolean;
}

export default function ScrollProgressBar({
  type = "circle",
  position = "bottom-right",
  color = "hsl(var(--primary))",
  strokeSize = 2,
  showPercentage = false,
}: ScrollProgressBarType) {
  const { scrollYProgress } = useScroll();
  
  // Smoother spring animation with lower stiffness and higher damping
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 40,
    restDelta: 0.0001,
    mass: 0.8
  });

  const scrollPercentage = useTransform(scaleX, [0, 1], [0, 100]);

  const [percentage, setPercentage] = React.useState(0);

  useMotionValueEvent(scrollPercentage, "change", (latest) => {
    setPercentage(Math.round(latest));
  });

  if (type === "bar") {
    return (
      <motion.div
        className="fixed start-0 end-0 top-0 pointer-events-none"
        style={{ height: `${strokeSize + 2}px` }}
      >
        <motion.span
          className="bg-primary h-full block origin-left"
          style={{
            backgroundColor: color,
            scaleX,
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ 
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("fixed flex items-center justify-center", {
        "top-0 end-0": position === "top-right",
        "bottom-0 end-0": position === "bottom-right",
        "top-0 start-0": position === "top-left",
        "bottom-0 start-0": position === "bottom-left",
      })}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: percentage > 0 ? 1 : 0, scale: percentage > 0 ? 1 : 0.8 }}
      transition={{ 
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }}
    >
      {percentage > 0 && (
        <>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              strokeWidth={strokeSize}
              className="opacity-20"
              stroke={color}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              stroke={color}
              fill="none"
              strokeDashoffset="0"
              strokeWidth={strokeSize}
              style={{ pathLength: scaleX }}
              transition={{ 
                type: "spring",
                stiffness: 45,
                damping: 40,
                mass: 0.8
              }}
            />
          </svg>
          {showPercentage && (
            <motion.span 
              className="text-sm absolute ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {percentage}%
            </motion.span>
          )}
        </>
      )}
    </motion.div>
  );
}
