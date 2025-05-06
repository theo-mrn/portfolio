"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BorderBeam } from "@/components/magicui/border-beam";
import { TextEffect } from '@/components/magicui/text-effect';
import { SparklesCore } from "@/components/ui/sparkles";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: Array<{
    icon: React.ReactNode;
    name: string;
    size?: "sm" | "md" | "lg";
    className?: string;
  }>;
  className?: string;
  url?: string;
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  className,
  url,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredTechIndex, setHoveredTechIndex] = useState<number | null>(null);

  const CardContent = (
    <motion.div
      className={cn(
        "relative flex h-[450px] w-full max-w-md select-none flex-col justify-between rounded-xl border-2 bg-muted/70 px-4 py-3 backdrop-blur-sm transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[5rem]  after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted transform-gpu perspective-1000",
        className,
        url ? "cursor-pointer" : ""
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        transition: {
          duration: 0.4,
          ease: "easeOut"
        }
      }}
      initial={{
        rotateX: 0,
        rotateY: 0
      }}
    >
      <div className="relative z-10 flex items-center gap-2">
        <p className="text-lg font-medium text-foreground">{title}</p>
      </div>

      <div
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-lg transition-all duration-500",
          isHovered ? "h-48" : "h-64"
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="relative z-10 mt-4">
        <AnimatePresence mode="wait">
          {isHovered && (
            <TextEffect
              key="desc"
              className="text-sm text-muted-foreground"
              preset="fade-in-blur"
              delay={0}
              speedReveal={2}
              speedSegment={2}
            >
              {description}
            </TextEffect>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap items-center gap-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className={cn(
              "flex items-center justify-center rounded-full bg-[rgba(248,248,248,0.01)] p-2 shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]",
              sizeMap[tech.size || "sm"],
              tech.className
            )}
            whileHover={{ scale: 1.1, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: index * 0.1 }
            }}
            onHoverStart={() => setHoveredTechIndex(index)}
            onHoverEnd={() => setHoveredTechIndex(null)}
            style={{ position: "relative" }}
          >
            {tech.icon}
            {hoveredTechIndex === index && (
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-xs font-medium shadow-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.05 }}
              >
                {tech.name}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <BeamEffect />
      {isHovered && <BorderBeam duration={4} size={300}  colorFrom="#818cf8" colorTo="#4f46e5" reverse={true}/>}
    </motion.div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block group">
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

const BeamEffect = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl">
      <div className="absolute -inset-[100%] z-0 opacity-50 blur-[100px]">
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/30" />
      </div>
      <AnimatedSparkles />
    </div>
  );
};

const AnimatedSparkles = () => (
  <div className="absolute inset-0 z-40">
    <Sparkles />
  </div>
);

const Sparkles = () => {
  const [stars, setStars] = useState<
    { top: number; left: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 12 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 2 + 4,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0">
      {stars.map((star, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-blue-400"
        />
      ))}
    </div>
  );
};

interface PortfolioProjectsProps {
  projects: ProjectCardProps[];
}

const PortfolioProjects = ({ projects }: PortfolioProjectsProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 place-items-center">
      {projects.map((project, index) => {
        return (
          <motion.div
            key={index}
            className="w-full flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            <ProjectCard {...project} />
          </motion.div>
        );
      })}
    </div>
  );
};

// Example usage
const PortfolioProjectsExample = () => {
  const projects = [
    {
      title: "Platforme de gestion d'abonnements",
      description: "Une plaftforme de visualisation et de gestion des abonnements pour mieux gerer son budget.",
      image: "/ynercloud/ynercloud.jpg",
      url: "https://yner.cloud",
      technologies: [
        {
          icon: <Image src="/svg/tailwind.svg" alt="Tailwind" width={16} height={16} className="h-4 w-4" />,
          name: "Tailwind",
          size: "sm" as const,
        },
        {
          icon: <Image src="/svg/postgresql.png" alt="PostgreSQL" width={16} height={16} className="h-4 w-4" />,
          name: "PostgreSQL",
          size: "sm" as const,
        },
        {
          icon: <Image src="/svg/docker.svg" alt="Docker" width={16} height={16} className="h-4 w-4" />,
          name: "Docker",
          size: "sm" as const,
        },// Next, react, postgre, docker, tailwind surtout docker et postgre
        // tailwind, postgre, docker
      ],
    },
    {
      title: "Service de reservation dans des institutions de beauté",
      description: "Un service de reservation dans des institutions de beauté, pouvoir reserver un créneau parmi les salons disponibles.",
      image: "/Coiffeur/img3.jpg",
      technologies: [
        {
          icon: <Image src="/svg/supabase.svg" alt="Supabase" width={16} height={16} className="h-4 w-4" />,
          name: "Supabase",
          size: "sm" as const,
        },
        {
          icon: <Image src="/svg/tailwind.svg" alt="Tailwind" width={16} height={16} className="h-4 w-4" />,
          name: "Tailwind",
          size: "sm" as const,
        },
        {
          icon: <Image src="/svg/resend_w.png" alt="Resend" width={16} height={16} className="h-4 w-4" />,
          name: "Resend",
          size: "sm" as const,
        },// Supabase
      ],
    },
    {
      title: "VTT interactive",
      description: "Un service de tabletop virtuel pour pouvoir jouer a des jeux de role en ligne.",
      image: "/VTT/img3.jpg",
      technologies: [
        {
          icon: <Image src="/svg/next.png" alt="Next.js" width={16} height={16} className="h-4 w-4" />,
          name: "Next.js",
          size: "sm" as const,
        },
        {
          icon: <Image src="/svg/react.svg" alt="React" width={16} height={16} className="h-4 w-4" />,
          name: "React",
          size: "sm" as const,
        },
        {
          icon: <Image src="/svg/firebase.svg" alt="TensorFlow" width={16} height={16} className="h-4 w-4" />,
          name: "Firebase",
          size: "sm" as const,
        },
      ],
    },
  ];

  return (
    <>
    <div className="flex min-h-[600px] w-full items-center justify-center py-20">
      <div className="w-full max-w-6xl px-4">
        <div className="h-[30rem] w-full bg-zinc-900 flex flex-col items-center justify-center overflow-hidden rounded-md relative">
        <h2 className="md:text-7xl text-xl lg:text-9xl font-bold text-center text-white relative z-20">
          Mes projets
        </h2>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-zinc-900 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
        <PortfolioProjects projects={projects} />
      </div>
      
      
    </div>
    <div className="mt-12 flex justify-center">
      <a href="/CV/CV.pdf" target="_blank" rel="noopener noreferrer">
        <InteractiveHoverButton>
          <p>Mon CV</p>
        </InteractiveHoverButton>
      </a>
    </div>
    </>
    
  );
};

export default PortfolioProjectsExample; 