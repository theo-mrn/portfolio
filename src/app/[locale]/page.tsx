"use client"

import { useRef, useEffect } from "react"
import { Hero } from "@/components/sections/Hero"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { DotPattern } from "@/components/magicui/dot-pattern"
import BackToTop from "@/components/magicui/back-to-top"
// import { CoursesContent } from "@/components/sections/Education"
import PortfolioProjectsExample from '@/components/sections/Projets';
import ExperienceSection from '@/components/sections/Experience';
import { cn } from "@/lib/utils"
import { Stack } from "@/components/sections/Stack"

export default function LocalePage() {
  const homeRef = useRef<HTMLDivElement>(null!)
  const aboutRef = useRef<HTMLDivElement>(null!)
  const experienceRef = useRef<HTMLDivElement>(null!)
  const educationRef = useRef<HTMLDivElement>(null!)
  const projectsRef = useRef<HTMLDivElement>(null!)
  const contactRef = useRef<HTMLDivElement>(null!)

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: homeRef, id: "home" },
        { ref: aboutRef, id: "about" },
        { ref: experienceRef, id: "experience" },
        { ref: educationRef, id: "education" },
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
        <Stack/>
      </div>

      <div className="relative py-20" ref={experienceRef}>
        <ExperienceSection />
      </div>

      <div className="relative py-24" ref={projectsRef}>
        <PortfolioProjectsExample />
      </div>

      {/* <div className="relative" ref={educationRef}>
        <CoursesContent />
      </div> */}

      <div className="flex justify-center items-center py-24" ref={contactRef}>
        <Contact />
      </div>

      <Footer />
      <BackToTop />
    </div>
  )
} 