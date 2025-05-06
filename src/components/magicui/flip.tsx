"use client";
import React from "react";
import { FlipWords } from "@/components/magicui/flip-words";
import { motion } from "motion/react";

export function FlipWordsDemo() {
  const words = [
    "Tests d'Intrusion",
    "Sécurité Réseau",
    "Analyse de Malwares",
    "Protection des Données",
    "Audit de Sécurité",
    "Défense Cyber"
  ];

  return (
    <div className="h-full flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Expert en Cybersécurité
          </h1>
          
          <div className="text-2xl md:text-4xl text-cyan-400">
            <FlipWords words={words} />
          </div>

          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Protection et sécurisation de vos infrastructures numériques
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
