"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin,  ChevronDown } from "lucide-react"
import Image from "next/image";
import { config } from "@/app/config";
import { useTranslations } from 'next-intl'


interface HeroProps {
  handleScroll: (ref: React.RefObject<HTMLDivElement>) => void
  refs: {
    projectsRef: React.RefObject<HTMLDivElement>
    contactRef: React.RefObject<HTMLDivElement>
  }
}

export function Hero({ handleScroll, refs }: HeroProps) {
  const t = useTranslations('hero')
  const { contactRef } = refs
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      
      <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
      </motion.div>
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: [0, -5, 0],
              x: [0, 3, 0]
            }}
            transition={{ 
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              opacity: { duration: 0.8 }
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -4, 0],
                  x: [0, 2, 0]
                }}
                transition={{ 
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  opacity: { duration: 0.5, delay: 0.2 }
                }}
                className="text-4xl md:text-6xl font-bold tracking-tight"
              >
                {t('title')} <span className="text-primary">{t('highlight')}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -3, 0],
                  x: [0, -2, 0]
                }}
                transition={{ 
                  duration: 7,
                  ease: "easeInOut",
                  repeat: Infinity,
                  opacity: { duration: 0.5, delay: 0.4 }
                }}
                className="text-xl text-muted-foreground"
              >
                {t('description')}
              </motion.p>
              {/* Badge "Available for new opportunities" */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 shadow-md border border-zinc-800 w-fit mt-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-green-500/30 shadow-md"></span>
                <span className="text-green-400 font-medium text-sm">Ouvert aux opportunités</span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: [0, -4, 0],
                x: [0, 3, 0]
              }}
              transition={{ 
                duration: 5.5,
                ease: "easeInOut",
                repeat: Infinity,
                opacity: { duration: 0.5, delay: 0.6 }
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button onClick={() => handleScroll(contactRef)}  size="lg">
                {t('cta.contact')}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: [0, -3, 0],
                x: [0, 2, 0]
              }}
              transition={{ 
                duration: 6.5,
                ease: "easeInOut",
                repeat: Infinity,
                opacity: { duration: 0.5, delay: 0.8 }
              }}
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
                <span className="sr-only">{t('social.github')}</span>
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
                <span className="sr-only">{t('social.linkedin')}</span>
             </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -8, 0],
              x: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 }
            }}
            className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-full"
          >
            <Image
              src="/profile/image.jpg"
              alt="Portrait"
              className="object-cover w-full h-full filter brightness-100"
              width={500}
              height={500}
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: [20, 15, 20],
            x: [0, 2, 0]
          }}
          transition={{ 
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            opacity: { duration: 0.5, delay: 1 }
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">{t('discover')}</span>
          <ChevronDown className="animate-bounce text-muted-foreground" size={24} />
        </motion.div>
      </div>
      
    </section>
  )
} 