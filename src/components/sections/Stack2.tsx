"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, useScroll } from "framer-motion";

const SectionLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-zinc-700" />
      <span className="text-xl font-medium text-zinc-400 uppercase tracking-wider">
        {children}
      </span>
    </div>
  );
};

const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-20 flex size-20 items-center justify-center border-2 border-zinc-800 bg-zinc-900/50 p-6 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all duration-300 hover:border-indigo-500 hover:shadow-[0_0_25px_-12px_rgba(99,102,241,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

interface StackSectionProps {
  icons: { src: string; alt: string; }[];
  animate?: boolean;
}

const StackSection = ({ icons, showTopBeam, showBottomBeam, animate = true }: StackSectionProps & { showTopBeam?: boolean; showBottomBeam?: boolean }) => {
  const containerProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  } : {};

  const iconProps = (index: number) => animate ? {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, delay: index * 0.1 }
  } : {};

  const beamProps = animate ? {
    initial: { height: 0, opacity: 0 },
    animate: { height: "140px", opacity: 1 },
    transition: { duration: 0.5, delay: 0.5 }
  } : {};

  const horizontalBeamProps = (index: number) => animate ? {
    initial: { width: 0, opacity: 0 },
    animate: { width: "100%", opacity: 1 },
    transition: { duration: 0.5, delay: (index + 1) * 0.1 }
  } : {};

  return (
    <motion.div 
      {...containerProps}
      className="relative z-10 w-[600px] flex flex-row items-center bg-zinc-900/30 px-12 py-8 rounded-3xl border border-zinc-800/50 backdrop-blur-sm shadow-[0_0_25px_-12px_rgba(0,0,0,0.3)]"
    >
      {icons.map((icon, index) => (
        <React.Fragment key={icon.alt}>
          <motion.div 
            {...iconProps(index)}
            className="flex-1 flex items-center justify-center relative"
          >
            {/* Rayon vertical pour la dernière icône de la première ligne */}
            {index === icons.length - 1 && showTopBeam && (
              <motion.div 
                {...beamProps}
                className="absolute left-1/2 top-[50%] -translate-x-1/2 w-[2px] h-[140px] -z-10"
              >
                <div className="absolute inset-0 bg-indigo-500/60" />
                <div className="absolute inset-0 bg-indigo-500/20 blur-lg" />
              </motion.div>
            )}
            {/* Rayon vertical pour la première icône de la deuxième ligne */}
            {index === 0 && showBottomBeam && (
              <motion.div 
                {...beamProps}
                className="absolute left-1/2 top-[50%] -translate-x-1/2 w-[2px] h-[140px] -z-10"
              >
                <div className="absolute inset-0 bg-indigo-500/60" />
                <div className="absolute inset-0 bg-indigo-500/20 blur-lg" />
              </motion.div>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default relative z-10">
                  <Circle className="rounded-full">
                    <Image 
                      src={icon.src} 
                      alt={icon.alt} 
                      width={48} 
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">{icon.alt}</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
          {index < icons.length - 1 && (
            <motion.div 
              {...horizontalBeamProps(index)}
              className="flex-1 relative"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-[2px] bg-indigo-500/60" />
                <div className="absolute w-full h-6 bg-indigo-500/20 blur-lg" />
              </div>
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export function Stack2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const frontendIcons = [
    { src: "/svg/next.png", alt: "Next.js" },
    { src: "/svg/react.svg", alt: "React" },
    { src: "/svg/tailwind.svg", alt: "Tailwind CSS" },
    { src: "/svg/typescript.svg", alt: "TypeScript" }
  ];

  const backendIcons = [
    { src: "/svg/node.svg", alt: "Node.js" },
    { src: "/svg/docker.svg", alt: "Docker" },
    { src: "/svg/prisma2.svg", alt: "Prisma" },
    { src: "/svg/aws.webp", alt: "AWS" }
  ];

  const databaseIcons = [
    { src: "/svg/postgresql.png", alt: "PostgreSQL" },
    { src: "/svg/mongodb.svg", alt: "MongoDB" },
    { src: "/svg/cassandra.png", alt: "Cassandra" },
    { src: "/svg/mysql.svg", alt: "MySQL" }
  ];

  const content = [
    {
      title: "Frontend",
      titleElement: <SectionLabel>Frontend</SectionLabel>,
      description: "Le Frontend est le cœur de l'expérience utilisateur. Avec Next.js, React, Tailwind et TypeScript, nous créons des interfaces modernes, performantes et typées qui offrent une expérience utilisateur exceptionnelle.",
      content: (
        <StackSection icons={frontendIcons} animate={true} />
      )
    },
    {
      title: "Backend",
      titleElement: <SectionLabel>Backend</SectionLabel>,
      description: "Notre Backend est construit sur des technologies robustes et modernes. Node.js nous offre la performance, Docker assure la portabilité, Prisma gère nos données avec élégance, et Stripe sécurise nos paiements.",
      content: (
        <div className="flex flex-col items-center space-y-16">
          <StackSection icons={frontendIcons} showTopBeam animate={false} />
          <StackSection icons={backendIcons} animate={true} />
        </div>
      )
    },
    {
      title: "Base de données",
      titleElement: <SectionLabel>Base de données</SectionLabel>,
      description: "Notre architecture de données est polyvalente et adaptée à chaque besoin. PostgreSQL pour la fiabilité, MongoDB pour la flexibilité, Cassandra pour la scalabilité, et MySQL pour la simplicité.",
      content: (
        <div className="flex flex-col items-center space-y-16">
          <StackSection icons={frontendIcons} showTopBeam animate={false} />
          <StackSection icons={backendIcons} showBottomBeam animate={false} />
          <StackSection icons={databaseIcons} animate={true} />
        </div>
      )
    }
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const adjustedValue = Math.min(0.85, value);
      const newIndex = Math.min(
        content.length - 1,
        Math.floor((adjustedValue / 0.85) * content.length)
      );
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex, content.length]);

  return (
    <div 
      ref={containerRef}
      className="min-h-[375vh] relative"
    >
      <h2 className="text-3xl font-bold text-zinc-100 mb-16 text-center absolute top-[2rem] left-1/2 transform -translate-x-1/2">
        Ma stack
      </h2>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="mx-auto w-full max-w-7xl flex gap-20">
          <div className="w-[400px] flex flex-col justify-center">
            {content.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={activeIndex === index ? {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                } : {
                  opacity: 0,
                  x: 20,
                  transition: {
                    duration: 0.5,
                    ease: "easeIn"
                  }
                }}
                className="absolute max-w-[400px] flex flex-col gap-4"
              >
                <motion.div 
                  className="text-3xl font-bold text-zinc-100"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {item.titleElement}
                </motion.div>
                <motion.p 
                  className="text-lg text-zinc-400 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {content[activeIndex].content}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
