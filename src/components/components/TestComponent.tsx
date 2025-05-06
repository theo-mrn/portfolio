import React from 'react';
import { motion } from 'framer-motion';

export function TestComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl text-center max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">Félicitations !</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Vous avez terminé le quiz avec succès.
      </p>
    </motion.div>
  );
} 