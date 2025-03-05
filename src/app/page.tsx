"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/sections/Header"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"
import { GlobeDemo } from "@/components/sections/cyber"
import { Footer } from "@/components/sections/Footer"
import { About } from "@/components/sections/about"
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils"




export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

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
    <div className="min-h-screen bg-background text-foreground">
       <ScrollProgress className="top-[69px]" />
      <Header activeSection={activeSection} handleScroll={handleScroll} refs={refs} />
      <div ref={homeRef}>
        <Hero handleScroll={handleScroll} refs={{ projectsRef, contactRef }} />
      </div>
      <DotPattern
        width={32}  height={32} cx={2} cy={2} cr={1.5} className={cn( "absolute inset-0 w-full h-full", "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",)}
      />
       <div className=" -z-50" ref={aboutRef}>
        <About />
      </div>

      <div ref={projectsRef}>
        <Projects />
      </div>
     
      <div>
        <GlobeDemo />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
      
      <Footer />
    </div>
  )
}

