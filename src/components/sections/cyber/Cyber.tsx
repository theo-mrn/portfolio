"use client";
import SkillsPage from "@/components/sections/cyber/Cyber_skills"; 
import { FlipWordsDemo } from "@/components/magicui/flip"; 
import { Globe } from "@/components/ui/FeaturesSectionDemo"; 
import { motion } from "framer-motion";
import WorldMap  from "@/components/ui/world-map";


export default function CyberPortfolioPage() {


  return (
    <div className="min-h-screen flex flex-col dark:bg-black bg-white text-white">
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <Globe />
      </div>
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <FlipWordsDemo />
        <p className="mt-4 text-lg md:text-xl text-neutral-300 max-w-2xl">
          Passionate cybersecurity professional dedicated to building resilient and secure digital environments.
        </p>
      </section>
      <section id="skills" className="py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Core Competencies
          </h2>
          <SkillsPage />
        </div>
      </section>
      <section className="py-20 md:py-32 dark:bg-black bg-white w-full px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-bold text-3xl md:text-5xl dark:text-white text-black mb-4">
            Global Threat Landscape{" "}
            <span className="text-neutral-400">
              {"Awareness".split("").map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h2>
          <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4 mb-8">
            Understanding and mitigating cyber threats across diverse environments and geographical locations. My experience spans projects involving international collaboration and securing globally distributed systems.
          </p>
        </div>
        <WorldMap
          dots={[
            {
              start: {
                lat: 64.2008,
                lng: -149.4937,
              }, // Alaska (Fairbanks)
              end: {
                lat: 34.0522,
                lng: -118.2437,
              }, // Los Angeles
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 28.6139, lng: 77.209 }, // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
          ]}
        />
      </section>
    </div>
  );
}
