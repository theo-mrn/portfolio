"use client"

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Calendar, MapPin, ExternalLink, Building } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string | null
  description: string[]
  technologies: string[]
  companyUrl?: string
  logo?: string
}

interface ExperienceSectionProps {
  experiences?: Experience[]
  title?: string
  chronological?: boolean
  showTimeline?: boolean
  loading?: boolean
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences = [
    {
      id: '1',
      company: 'MARINE NATIONALE',
      position: 'Stagiaire - Solutions de Numérisation',
      location: 'Brest, France',
      startDate: '2025-04',
      endDate: '2025-08',
      description: [
        'Conception et mise en œuvre de solutions de numérisation pour les équipements internes de la Marine',
        'Optimisation des processus internes par le développement de logiciels sur mesure',
        'Collaboration avec les équipes techniques pour identifier les besoins en numérisation et proposer des solutions adaptées',
        'Participation à la phase de test et de déploiement des solutions développées'
      ],
      technologies: ['JavaScript', 'Docker', 'Node.js', 'Angular',"Sequelize","Typescript","Mariadb"],
    },
    {
      id: '2',
      company: 'ARMÉE DE L\'AIR ET DE L\'ESPACE',
      position: 'Stagiaire - Solutions Digitales',
      location: 'Paris, France',
      startDate: '2024-09',
      endDate: '2025-04',
      description: [
        'Collaboration étroite avec l\'Armée de l\'air sur un projet de numérisation',
        'Participation à la conception et à l\'implémentation de solutions digitales adaptées aux besoins opérationnels',
        'Contribution à l\'optimisation des processus de gestion de l\'information et de communication interne'
      ],
      technologies: ['React', 'Nextjs', 'Electron', 'PostgresSQL'],
    }
  ],
  title = 'Expérience Professionnelle',
  chronological = false,
  showTimeline = true,
  loading = false
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [focusedItem, setFocusedItem] = useState<string | null>(null)
  const itemRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  const sortedExperiences = chronological 
    ? [...experiences].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    : [...experiences].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })
  }



  const handleKeyDown = (event: React.KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleExpanded(id)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      const currentIndex = sortedExperiences.findIndex(exp => exp.id === id)
      const nextIndex = (currentIndex + 1) % sortedExperiences.length
      const nextId = sortedExperiences[nextIndex].id
      itemRefs.current[nextId]?.focus()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      const currentIndex = sortedExperiences.findIndex(exp => exp.id === id)
      const prevIndex = currentIndex === 0 ? sortedExperiences.length - 1 : currentIndex - 1
      const prevId = sortedExperiences[prevIndex].id
      itemRefs.current[prevId]?.focus()
    }
  }

  if (loading) {
    return (
      <section className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="h-8 bg-muted animate-pulse rounded-md w-64" />
          {[1, 2, 3].map((i) => (
            <Card key={i} className="relative">
              <CardHeader className="space-y-4">
                <div className="h-6 bg-muted animate-pulse rounded-md w-48" />
                <div className="h-4 bg-muted animate-pulse rounded-md w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-4 bg-muted animate-pulse rounded-md w-full" />
                <div className="h-4 bg-muted animate-pulse rounded-md w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  if (experiences.length === 0) {
    return (
      <section className="w-full max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">{title}</h2>
        <Card className="text-center py-12">
          <CardContent>
            <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Aucune expérience ajoutée</h3>
            <p className="text-muted-foreground">L&apos;expérience professionnelle sera affichée ici.</p>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8" role="region" aria-label="Expérience Professionnelle">
      <motion.h2 
        className="text-3xl font-bold text-foreground mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      <div className="relative">
        {showTimeline && (
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
        )}
        
        <div className="space-y-6">
          {sortedExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {showTimeline && (
                <div className="absolute left-2 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 hidden md:block" />
              )}
              
              <Card 
                className={`transition-all duration-300 border-2 bg-muted/70 backdrop-blur-sm hover:border-white/20 hover:bg-muted ml-0 md:ml-12 ${
                  focusedItem === experience.id ? 'ring-2 ring-primary' : ''
                }`}
                onMouseEnter={() => setFocusedItem(experience.id)}
                onMouseLeave={() => setFocusedItem(null)}
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {experience.position}
                        </h3>
                        {experience.companyUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            asChild
                          >
                            <a
                              href={experience.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Visiter le site web de ${experience.company}`}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-primary font-medium mb-2">
                        <Building className="h-4 w-4" />
                        <span>{experience.company}</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Présent'}
                          </span>
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <Button
                        variant="ghost"
                        onClick={() => toggleExpanded(experience.id)}
                        onKeyDown={(e) => handleKeyDown(e, experience.id)}
                        ref={(el) => { itemRefs.current[experience.id] = el }}
                        className="w-full justify-between p-0 h-auto font-normal text-left hover:bg-transparent"
                        aria-expanded={expandedItems.has(experience.id)}
                        aria-controls={`description-${experience.id}`}
                      >
                        <span className="text-sm text-muted-foreground">
                          {expandedItems.has(experience.id) ? 'Masquer les détails' : 'Afficher les détails'}
                        </span>
                        {expandedItems.has(experience.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <AnimatePresence>
                      {expandedItems.has(experience.id) && (
                        <motion.div
                          id={`description-${experience.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <Separator className="mb-4" />
                          <ul className="space-y-2 mb-4">
                            {experience.description.map((item, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                              >
                                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                          
                          {experience.technologies.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-2">Technologies</h4>
                              <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech, idx) => (
                                  <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                                  >
                                    <Badge variant="secondary" className="text-xs">
                                      {tech}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
