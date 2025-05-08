"use client"

import { useRef, useEffect, useState } from "react"
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
import WebcamCircles from "@/components/components/webcam"
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Game2048Tetris from "@/components/components/tetris"



export default function LocalePage() {
  const homeRef = useRef<HTMLDivElement>(null!)
  const aboutRef = useRef<HTMLDivElement>(null!)
  const educationRef = useRef<HTMLDivElement>(null!)
  const projectsRef = useRef<HTMLDivElement>(null!)
  const contactRef = useRef<HTMLDivElement>(null!)
  const terminalRef = useRef<HTMLDivElement>(null!)

  const [dotsCount, setDotsCount] = useState(50)
  const [dotsCountSlider, setDotsCountSlider] = useState(50)

  // Debounce dotsCount update for webcam
  useEffect(() => {
    const handler = setTimeout(() => {
      setDotsCount(dotsCountSlider)
    }, 400)
    return () => clearTimeout(handler)
  }, [dotsCountSlider])

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
        <Stack2 />
      </div>
      <div className="relative py-24" ref={projectsRef}>
        <PortfolioProjectsExample />
      </div>
      <div className="relative" ref={educationRef}>
        <CoursesContent />
      </div>
      {/* Section webcam + terminal côte à côte */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-900 relative overflow-hidden py-20" ref={terminalRef}>
        <div className="w-full max-w-6xl flex flex-col gap-8 items-center justify-center px-4">
          <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="w-full md:w-1/2 flex flex-row items-center gap-8 justify-center">
              <div className="flex flex-col items-center bg-black bg-opacity-50 p-4 rounded-lg min-h-[350px] min-w-[100px]">
                <Label htmlFor="dotsCountSlider" className="text-white mb-4">Nombre de points :</Label>
                <div className="flex flex-row items-center">
                  <span
                    className="flex flex-col h-64 justify-between items-end text-xs font-medium text-muted-foreground mr-2 select-none"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 15 }, (_, idx) => idx * 10 + 10).reverse().map((val) => (
                      <span key={val} className="flex flex-row items-center gap-1">
                        <span>{val}</span>
                        <span className="w-2 h-px bg-muted-foreground/70" />
                      </span>
                    ))}
                  </span>
                  <Slider
                    id="dotsCountSlider"
                    min={10}
                    max={150}
                    step={1}
                    value={[dotsCountSlider]}
                    onValueChange={([val]) => setDotsCountSlider(val)}
                    aria-label="Slider with ticks"
                    orientation="vertical"
                    className="h-64 min-h-[256px] min-w-[32px]"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <WebcamCircles dotsCount={dotsCount} onDotsCountChange={setDotsCountSlider} />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <TerminalDemo />
            </div>
          </div>
          <div className="w-full flex justify-center mt-8">
            <div className="bg-black bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-3xl flex justify-center">
              <Game2048Tetris />
            </div>
          </div>
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