"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="h-[100vh] overflow-y-auto flex justify-center relative space-x-20 px-4 bg-zinc-900/20 backdrop-blur-sm"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="w-[600px]">
          {content.map((item, index) => (
            <div key={item.title + index} className="min-h-screen flex items-center">
              <div className="w-full bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-12 shadow-[0_0_25px_-12px_rgba(0,0,0,0.3)]">
                <motion.h2
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-4xl font-bold text-slate-100 mb-10"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-xl text-slate-300 max-w-xl mb-16"
                >
                  {item.description}
                </motion.p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        className={cn(
          "hidden lg:block sticky top-0 h-screen w-[600px] overflow-hidden flex items-center",
          contentClassName
        )}
      >
        <div className="h-full w-full flex items-center justify-center">
          {content[activeCard].content}
        </div>
      </motion.div>
    </motion.div>
  );
};