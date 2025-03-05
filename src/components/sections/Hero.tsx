import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin,  ChevronDown } from "lucide-react"
import { Spotlight } from "@/components/ui/spotlight-new";
import Image from "next/image";
import { config } from "@/app/config";


interface HeroProps {
  handleScroll: (ref: React.RefObject<HTMLDivElement>) => void
  refs: {
    projectsRef: React.RefObject<HTMLDivElement>
    contactRef: React.RefObject<HTMLDivElement>
  }
}

export function Hero({ handleScroll, refs }: HeroProps) {
  const { projectsRef, contactRef } = refs
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      
      <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
      </motion.div>
      <Spotlight />
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >




            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold tracking-tight"
              >
                Développeur Web <span className="text-primary">Créatif</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl text-muted-foreground"
              >
                Je crée des expériences web modernes et interactives
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button onClick={() => handleScroll(projectsRef)} size="lg">
                Voir mes projets
              </Button>
              <Button onClick={() => handleScroll(contactRef)} variant="outline" size="lg">
                Me contacter
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-6 pt-2"
            >
              <a
                href={config.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary hover:scale-110 transition-all">
                  <Github size={20} />
                </div>
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href={config.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary hover:scale-110 transition-all">
                  <Linkedin size={20} />
                </div>
                <span className="sr-only">LinkedIn</span>
             </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="relative aspect-square max-w-md mx-auto"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse" />
            <Image
              src="/img/hero.png"
              alt="Portrait"
              className="rounded-full object-cover p-2 relative z-10"
              width={500}
              height={500}
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">Découvrir</span>
          <ChevronDown className="animate-bounce text-muted-foreground" size={24} />
        </motion.div>
      </div>
      
    </section>
  )
} 