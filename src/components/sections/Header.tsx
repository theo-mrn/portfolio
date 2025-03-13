"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { locales } from '@/i18n/settings'
import { Link } from '@/i18n/navigation'
import { ModeToggle } from '@/components/components/ModeToggle'

interface HeaderProps {
  activeSection: string
  handleScroll: (ref: React.RefObject<HTMLDivElement>) => void
  refs: {
    homeRef: React.RefObject<HTMLDivElement>
    aboutRef: React.RefObject<HTMLDivElement>
    projectsRef: React.RefObject<HTMLDivElement>
    contactRef: React.RefObject<HTMLDivElement>
  }
  name: string
}

export function Header({ activeSection, handleScroll, refs, name }: HeaderProps) {
  const t = useTranslations('navigation')
  const tTheme = useTranslations('theme')
  const { homeRef, aboutRef, projectsRef, contactRef } = refs
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1] || 'fr'

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-xl font-bold">{name}</h1>
        </motion.div>
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex space-x-8"
        >
          <button
            onClick={() => handleScroll(homeRef)}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === "home" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {t('home')}
          </button>
          <button
            onClick={() => handleScroll(aboutRef)}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === "about" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {t('about')}
          </button>
          <button
            onClick={() => handleScroll(projectsRef)}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === "projects" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {t('projects')}
          </button>
          <button
            onClick={() => handleScroll(contactRef)}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === "contact" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {t('contact')}
          </button>
        </motion.nav>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            {locales.map((locale) => {
              const isActive = currentLocale === locale
              return (
                <Link
                  key={locale}
                  href="/"
                  locale={locale}
                  className={`text-sm font-medium ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {locale.toUpperCase()}
                </Link>
              )
            })}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            <Button variant="ghost" size="icon">
              <span className="sr-only">{tTheme('menu')}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ModeToggle />
          </motion.div>
        </div>
      </div>
    </header>
  )
} 