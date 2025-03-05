import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"


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
  const { homeRef, aboutRef, projectsRef, contactRef } = refs

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
   
     
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-xl font-bold">Theo MORIN</h1>
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
            Accueil
          </button>
          <button
            onClick={() => handleScroll(aboutRef)}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === "about" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            À propos
          </button>
          <button
            onClick={() => handleScroll(projectsRef)}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === "projects" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Projets
          </button>
          <button
            onClick={() => handleScroll(contactRef)}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === "contact" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Contact
          </button>
        </motion.nav>
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            <Button variant="ghost" size="icon">
              <span className="sr-only">Menu</span>
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                document.documentElement.classList.toggle("dark")
              }}
            >
              <span className="sr-only">Toggle theme</span>
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
                className="hidden dark:block"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
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
                className="block dark:hidden"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
} 