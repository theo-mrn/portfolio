import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Image from "next/image";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogDescription,
} from '@/components/core/morphing-dialog';
import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link"



const projects = [
  {
    id: 1,
    title: "VTT intercative",
    description:
      "A full-stack e-commerce platform with payment integration, user authentication, and product management.",
    details: "Ce projet inclut des fonctionnalités avancées telles que la gestion des utilisateurs, le traitement des paiements et un tableau de bord d'administration.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Firebase"],
    image: "/VTT/img1.jpg",
  },
  {
    id: 2,
    title: "Projet Cloud de notes",
    description: "A modern portfolio website with smooth animations and responsive design.",
    details: "Ce site présente mes projets et compétences avec des animations fluides et un design réactif.",
    tags: ["React", "TypeScript", "PostgreSQL","Node.js"],
    image: "/Notes/img2.jpg",
  },
  {
    id: 3,
    title: "Projet reservation de coiffeur",
    description: "A collaborative task management application with real-time updates and team features.",
    details: "Cette application permet aux équipes de gérer leurs tâches efficacement avec des mises à jour en temps réel.",
    tags: ["Next.js", "TypeScript", "Supabase", "Resend"],
    image: "/Coiffeur/img5.jpg",
  },
]

export function Projects() {
  return (
    <section className="py-20">
        <div className="h-[30rem] w-full bg-zinc-900 flex flex-col items-center justify-center overflow-hidden rounded-md relative">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
          Mes projets
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-zinc-900 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <MorphingDialog>
                <MorphingDialogTrigger>
                  <Card className="h-[450px] w-full flex flex-col group cursor-pointer overflow-hidden">
                    <div className="relative h-[280px] w-full">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      </div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="
                              px-3 py-1.5 
                              bg-zinc-100 dark:bg-zinc-800
                              text-zinc-800 dark:text-zinc-200
                              text-xs font-medium
                              rounded-full
                              border border-zinc-200 dark:border-zinc-700
                              shadow-sm
                              transition-all duration-200
                              hover:scale-105 hover:shadow-md
                              hover:border-primary/50 dark:hover:border-primary/50
                              hover:bg-white dark:hover:bg-zinc-900
                            "
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </MorphingDialogTrigger>
                <MorphingDialogContainer>
                  <MorphingDialogContent className="max-w-4xl w-[90vw] mx-auto">
                    <Card className="h-full flex flex-col">
                      <div className="relative h-[600px] w-full">
                        <Image
                             width={1200}
                             height={600}
                          src={project.image}
                          alt={project.title}
                          className='object-cover w-full h-full rounded-t-lg'
                        />
                      </div>
                      <CardContent className="p-8 flex-1 flex flex-col">
                        <h3 className='text-3xl font-bold text-zinc-950 dark:text-zinc-50 mb-4'>
                          {project.title}
                        </h3>
                        <MorphingDialogDescription
                          disableLayoutAnimation
                          variants={{
                            initial: { opacity: 0, scale: 0.8, y: 100 },
                            animate: { opacity: 1, scale: 1, y: 0 },
                            exit: { opacity: 0, scale: 0.8, y: 100 },
                          }}
                          className="flex-1"
                        >
                          <div className="space-y-6">
                            <p className="text-lg text-muted-foreground">{project.description}</p>
                            <p className="text-lg text-zinc-700 dark:text-zinc-300">{project.details}</p>
                          </div>
                        </MorphingDialogDescription>
                        <div className="flex flex-wrap gap-3 mt-8">
                          {project.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="
                                px-4 py-2
                                bg-zinc-100 dark:bg-zinc-800
                                text-zinc-800 dark:text-zinc-200
                                text-sm font-medium
                                rounded-full
                                border border-zinc-200 dark:border-zinc-700
                                shadow-sm
                                transition-all duration-200
                                hover:scale-105 hover:shadow-md
                                hover:border-primary/50 dark:hover:border-primary/50
                                hover:bg-white dark:hover:bg-zinc-900
                              "
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <MorphingDialogClose className='text-zinc-50' />
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center mt-12"
        >
          <Link href="/projets">
            <InteractiveHoverButton>           
              Voir plus de projets
            </InteractiveHoverButton>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 