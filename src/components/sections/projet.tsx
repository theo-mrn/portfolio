"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github,} from "lucide-react"
import { SparklesCore } from "../ui/sparkles"
import { InteractiveHoverButton } from "../magicui/interactive-hover-button"
import Link from "next/link"


interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  link: string
  github?: string
}

export default function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "Expérience Immersive",
      description:
        "Une application web avec des visualisations 3D interactives et une interface utilisateur futuriste.",
      image: "/Coiffeur/img5.jpg",
      technologies: ["Three.js", "React", "WebGL", "GSAP"],
      link: "#",
      github: "#",
    },
    {
      id: 2,
      title: "Commerce Nouvelle Génération",
      description: "Plateforme e-commerce avec réalité augmentée et expérience d'achat personnalisée par IA.",
      image: "/Notes/img2.jpg",
      technologies: ["Next.js", "AR.js", "TensorFlow", "Stripe"],
      link: "#",
      github: "#",
    },
    {
      id: 3,
      title: "Écosystème Mobile",
      description: "Suite d'applications mobiles avec synchronisation cross-platform et interface gestuelle avancée.",
      image: "/VTT/img3.jpg",
      technologies: ["React Native", "Firebase", "Reanimated", "GraphQL"],
      link: "#",
    },
  ]

  // Shared gradient values for hover effects
  const hoverGradient = {
    from: "rgba(125, 90, 255, 0.8)",
    to: "rgba(43, 74, 255, 0.8)",
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden  text-white">
      {/* Animated background */}
      <div className="absolute inset-0 ">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-20"></div>

        {/* Animated particles */}
        <div className="stars-container">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>

        {/* Gradient orbs - neutral colors */}
        <motion.div
          className="absolute top-[10%] left-[20%] w-[30rem] h-[30rem] rounded-full bg-white/5 blur-[6rem] -z-10"
        ></motion.div>
        <motion.div
          className="absolute bottom-[10%] right-[20%] w-[35rem] h-[35rem] rounded-full bg-white/5 blur-[8rem] -z-10"
        ></motion.div>
      </div>

      <div className="container mx-auto relative z-10 py-20 px-4 sm:px-6">
        <div className="h-[30rem] w-full bg-zinc-900 flex flex-col items-center justify-center overflow-hidden rounded-md relative">
          <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
            Mes projets
          </h1>
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

        <div className="grid grid-cols-1 gap-32">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              isActive={activeIndex === project.id}
              setActive={() => setActiveIndex(project.id)}
              clearActive={() => setActiveIndex(null)}
              hoverGradient={hoverGradient}
            />
          ))}
        </div>

        <div className="flex justify-center mt-32">
          <Link href="/projets">
            <InteractiveHoverButton>           
              Voir plus de projets
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  isActive: boolean
  setActive: () => void
  clearActive: () => void
  hoverGradient: { from: string; to: string }
}

const ProjectCard = React.memo(function ProjectCard({
  project,
  index,
  isActive,
  setActive,
  clearActive,
  hoverGradient,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = useCallback(() => {
    setActive()
  }, [setActive])

  // Staggered animation for entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: index * 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  // Determine initial animation direction based on index
  const isEven = index % 2 === 0
  const initialX = isEven ? -100 : 100

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={clearActive}
    >
      <motion.div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* Image section */}
        <motion.div
          ref={imageRef}
          className="relative overflow-hidden rounded-2xl h-[300px] lg:h-[400px] w-full max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black/20">
            {/* Main image with mask */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent z-10"></div>

            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: isActive ? 1 : 1 }}
              transition={{ duration: 1.5 }}
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  filter: "contrast(1.1) brightness(0.9)",
                }}
              />
            </motion.div>

            {/* Decorative elements - neutral by default, blue-purple on hover */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{
                backgroundImage: isActive
                  ? `linear-gradient(to right, transparent, ${hoverGradient.from}, ${hoverGradient.to}, transparent)`
                  : "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                backgroundImage: isActive
                  ? `linear-gradient(to right, transparent, ${hoverGradient.to}, ${hoverGradient.from}, transparent)`
                  : "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>

            {/* Overlay pattern */}
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-10 mix-blend-overlay"></div>
          </div>
        </motion.div>

        {/* Content section - no 3D effect */}
        <motion.div
          className="relative flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
         

          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-white">
            {project.title}
          </motion.h2>
          

          <motion.p variants={itemVariants} className="text-gray-300 mb-8 text-lg">
            {project.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
            {project.technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md"
                style={{
                  backgroundColor:
                    isActive && idx === 0
                      ? `${hoverGradient.from}20`
                      : isActive && idx === project.technologies.length - 1
                        ? `${hoverGradient.to}20`
                        : "rgba(255,255,255,0.05)",
                  border: isActive ? `1px solid ${hoverGradient.from}40` : "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                }}
                whileHover={{
                  backgroundColor: `${hoverGradient.from}40`,
                  y: -3,
                  transition: { duration: 0.2 },
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4">
            <Button
              className="relative overflow-hidden group bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
            >
              <span className="relative z-10 flex items-center">
                Voir le projet
                <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Button>

            {project.github && (
              <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 transition-colors duration-300">
                <Github className="mr-2 h-4 w-4" />
                <span>Code source</span>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

    

      {/* Hover line indicator - blue-purple gradient */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute -bottom-8 left-0 h-[2px]"
            style={{
              backgroundImage: `linear-gradient(to right, ${hoverGradient.from}, ${hoverGradient.to})`,
            }}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
      
      
      
    </motion.div>
  )
})

