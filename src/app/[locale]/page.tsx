"use client"

import { useRef, useState, useEffect } from "react"
import { Hero } from "@/components/sections/Hero"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { DotPattern } from "@/components/magicui/dot-pattern"
import BackToTop from "@/components/magicui/back-to-top"
import { Stack2 } from "@/components/sections/Stack2"
import { CoursesContent } from "@/components/sections/Education"
import PortfolioProjectsExample from '@/components/sections/Projets';
import { TerminalDemo } from "@/components/components/terminal";
import { cn } from "@/lib/utils"

export default function LocalePage() {
  const [activeSection, setActiveSection] = useState("home")
  const homeRef = useRef<HTMLDivElement>(null!)
  const aboutRef = useRef<HTMLDivElement>(null!)
  const educationRef = useRef<HTMLDivElement>(null!)
  const projectsRef = useRef<HTMLDivElement>(null!)
  const contactRef = useRef<HTMLDivElement>(null!)
  const terminalRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: homeRef, id: "home" },
        { ref: aboutRef, id: "about" },
        { ref: educationRef, id: "education" },
        { ref: terminalRef, id: "terminal" },
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
      <div ref={homeRef} className="mb-24">
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
      <div className="relative py-20" ref={aboutRef}>
        <Stack2 />
      </div>
      <div className="relative" ref={educationRef}>
        <CoursesContent />
      </div>
      <div className="relative py-24" ref={projectsRef}>
        <PortfolioProjectsExample />
      </div>
      <section className="min-h-screen w-full flex items-center justify-center bg-zinc-900 relative overflow-hidden py-20" ref={terminalRef}>
        <div className="w-full max-w-2xl px-4">
          <TerminalDemo />
        </div>
      </section>
      <div className="flex justify-center items-center py-24" ref={contactRef}>
        <Contact />
      </div>
      <Footer />
      <BackToTop />
    </div>
  )
} 