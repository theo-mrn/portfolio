"use client";
import { useEffect, useState, useMemo } from 'react';
import type { ComponentType } from 'react';
import SkillsPage from "@/components/sections/cyber/Cyber_skills";
import { FlipWordsDemo } from "@/components/magicui/flip";
import { getPreloadedWorldMap } from '@/store/preloadStore';
import { motion, AnimatePresence } from "motion/react";

// Loading fallback component
const PageLoadingFallback = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen flex flex-col items-center justify-center bg-black"
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
    />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-4 text-white text-xl"
    >
      Loading experience...
    </motion.div>
  </motion.div>
);

type ImportedWorldMapModule = {
  WorldMapDemo: ComponentType;
};

export default function LandingPage() {
  const [WorldMapComponent, setWorldMapComponent] = useState<ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadWorldMap = async () => {
      try {
        // Réduire le délai initial
        const preloadedModule = getPreloadedWorldMap();
        
        if (preloadedModule?.WorldMapDemo) {
          if (isMounted) {
            setWorldMapComponent(() => preloadedModule.WorldMapDemo);
            // Petit délai pour laisser le composant s'initialiser
            setTimeout(() => setIsLoading(false), 100);
          }
          return;
        }

        const mod = await import('@/components/sections/cyber/World') as ImportedWorldMapModule;
        if (isMounted && mod.WorldMapDemo) {
          setWorldMapComponent(() => mod.WorldMapDemo);
          setTimeout(() => setIsLoading(false), 100);
        }
      } catch (error) {
        console.error('Failed to load WorldMap:', error);
        if (isMounted) setIsLoading(false);
      }
    };

    loadWorldMap();

    return () => {
      isMounted = false;
    };
  }, []);

  const content = useMemo(() => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{
        duration: 1.2,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className="min-h-screen flex flex-col bg-black"
    >
      {/* Hero Section with Map Background */}
      <motion.div 
        className="relative h-screen"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {WorldMapComponent && <WorldMapComponent />}
        </motion.div>
        
        {/* Hero Content */}
        <motion.div 
          className="relative z-10 h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <FlipWordsDemo />
        </motion.div>
      </motion.div>

      {/* Skills Section */}
      <motion.div 
        className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <SkillsPage />
        </div>
      </motion.div>
    </motion.div>
  ), [WorldMapComponent]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? <PageLoadingFallback /> : content}
    </AnimatePresence>
  );
}
