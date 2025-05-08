import {
    Terminal,
    type QuizQuestion,
  } from "@/components/magicui/terminal";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

const linuxCybersecurityQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: "Quelle commande modifie les permissions d\'un fichier ?",
    answer: "chmod",
    status: "unanswered",
  },
  {
    id: 2,
    text: "Quelle commande permet de rechercher des fichiers par nom, type, ou permissions ?",
    answer: "find",
    status: "unanswered",
  },
  {
    id: 3,
    text: "Quelle commande moderne affiche les sockets réseau, remplaçant souvent netstat ?",
    answer: "ss",
    status: "unanswered",
  },
  {
    id: 4,
    text: "Quel outil en ligne de commande est essentiel pour scanner les ports ouverts sur une machine locale ou distante ?",
    answer: "nmap",
    status: "unanswered",
  },
];

export function TerminalDemo() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleQuizComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push('/cyber');
    }, 2000); // Increased delay for longer animation
  };

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, y: 0 }}
      animate={{ 
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 0.8 : 1,
        y: isExiting ? -50 : 0,
      }}
      transition={{ 
        duration: 1.5,
        ease: [0.43, 0.13, 0.23, 0.96], 
      }}
      className="relative w-full max-w-2xl"
    >
      <Terminal 
        questions={linuxCybersecurityQuestions} 
        completionMessage="Excellent ! Préparation de votre voyage cyber..."
        onComplete={handleQuizComplete}
      />
    </motion.div>
  );
}
  