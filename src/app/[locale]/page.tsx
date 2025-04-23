"use client"



import { useRef, useState, useEffect } from "react"
import { Header } from "@/components/sections/Header"
import { Hero } from "@/components/sections/Hero"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { ScrollProgress } from "@/components/magicui/scroll-progress"
import { DotPattern } from "@/components/magicui/dot-pattern"
import BackToTop from "@/components/magicui/back-to-top"
import { AnimatedBeamDemo } from "@/components/components/demo"
import ProjectShowcase from "@/components/sections/projet"


import { cn } from "@/lib/utils"
import { config } from "../config"

export default function LocalePage() {
  const [activeSection, setActiveSection] = useState("home")
  const homeRef = useRef<HTMLDivElement>(null!)
  const aboutRef = useRef<HTMLDivElement>(null!)
  const projectsRef = useRef<HTMLDivElement>(null!)
  const contactRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: homeRef, id: "home" },
        { ref: aboutRef, id: "about" },
        { ref: projectsRef, id: "projects" },
        { ref: contactRef, id: "contact" },
      ]

      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = section.ref.current
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          const elementTop = top + window.scrollY
          const elementBottom = bottom + window.scrollY

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial active section

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const refs = {
    homeRef,
    aboutRef,
    projectsRef,
    contactRef,
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-foreground">  
      
      <ScrollProgress className="top-[69px]" />
      <Header 
        activeSection={activeSection} 
        handleScroll={handleScroll} 
        refs={refs} 
        name={config.name}
      />
      <div ref={homeRef}>
        <Hero handleScroll={handleScroll} refs={{ projectsRef, contactRef }} />
      </div>
      <DotPattern
        width={32} 
        height={32} 
        cx={2} 
        cy={2} 
        cr={1.5} 
        className={cn(
          "absolute inset-0 w-full h-full",
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="relative min-h-screen py-16" ref={aboutRef}>
        <AnimatedBeamDemo />
      </div>
      
      <div ref={projectsRef}>
        <ProjectShowcase />
      </div>
      {/* <div>
        <GlobeDemo />
      </div> */}
      <div ref={contactRef}>
        <Contact />
      </div>
      <Footer />
      <BackToTop />
    </div>
  )
} 