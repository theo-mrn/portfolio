"use client"

import React from 'react'
import { useTranslations } from 'next-intl'

interface HeaderProps {
  activeSection: string
  handleScroll: (ref: React.RefObject<HTMLDivElement>) => void
  refs: {
    homeRef: React.RefObject<HTMLDivElement>
    aboutRef: React.RefObject<HTMLDivElement>
    projectsRef: React.RefObject<HTMLDivElement>
    contactRef: React.RefObject<HTMLDivElement>
  }
}

export function Header({ activeSection, handleScroll, refs }: HeaderProps) {
  const t = useTranslations('navigation')
  const { homeRef, aboutRef, projectsRef, contactRef } = refs

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-8 px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm">
        <button
          onClick={() => handleScroll(homeRef)}
          className={`text-sm font-medium transition-colors hover:text-white ${
            activeSection === "home" ? "text-white" : "text-white/60"
          }`}
        >
          {t('home')}
        </button>
        <button
          onClick={() => handleScroll(aboutRef)}
          className={`text-sm font-medium transition-colors hover:text-white ${
            activeSection === "about" ? "text-white" : "text-white/60"
          }`}
        >
          {t('about')}
        </button>
        <button
          onClick={() => handleScroll(projectsRef)}
          className={`text-sm font-medium transition-colors hover:text-white ${
            activeSection === "projects" ? "text-white" : "text-white/60"
          }`}
        >
          {t('projects')}
        </button>
        <button
          onClick={() => handleScroll(contactRef)}
          className={`text-sm font-medium transition-colors hover:text-white ${
            activeSection === "contact" ? "text-white" : "text-white/60"
          }`}
        >
          {t('contact')}
        </button>
      </nav>
    </header>
  )
} 