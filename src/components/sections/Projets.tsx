"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
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
  const [hoveredTechIndex, setHoveredTechIndex] = useState<number | null>(null);

  const CardContent = (
    <motion.div
      className={cn(
        "relative flex h-[450px] w-full max-w-md select-none flex-col justify-between rounded-xl border-2 bg-muted/70 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-muted",
        className,
        url ? "cursor-pointer" : ""
      )}

      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative z-10 flex items-center gap-2">
        <p className="text-lg font-medium text-foreground">{title}</p>
      </div>

      <div className="relative z-10 w-full overflow-hidden rounded-lg h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="relative z-10 mt-4">
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
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
            whileHover={{ scale: 1.1 }}
            onHoverStart={() => setHoveredTechIndex(index)}
            onHoverEnd={() => setHoveredTechIndex(null)}
            style={{ position: "relative" }}
          >
            {tech.icon}
            {hoveredTechIndex === index && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-xs font-medium shadow-md">
                {tech.name}
              </div>
            )}
          </motion.div>
        ))}
      </div>
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              delay: index * 0.1
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
        },
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
        },
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
          icon: <Image src="/svg/firebase.svg" alt="Firebase" width={16} height={16} className="h-4 w-4" />,
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
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
              Mes projets
            </h2>
          </div>
          <PortfolioProjects projects={projects} />
        </div>
      </div>
      <div className="mt-12 flex justify-center">
        <a href="/CV/DW.pdf" target="_blank" rel="noopener noreferrer">
          <InteractiveHoverButton>
            <p>Mon CV</p>
          </InteractiveHoverButton>
        </a>
      </div>
    </>
  );
};

export default PortfolioProjectsExample; 