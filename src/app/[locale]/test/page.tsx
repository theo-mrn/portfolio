"use client";
import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function CoursesContent() {
  const [rotations, setRotations] = useState<number[]>([]);
  
  const courses = [
    {
      name: "NextCursor",
      image: "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: ["IDE Avancé", "Plugins Intégrés", "Support Multi-langages"]
    },
    {
      name: "BeginJavaScript [free]",
      image: "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: ["Débutant Friendly", "Projets Pratiques", "Fondamentaux JS"]
    },
    {
      name: "NOW.TS NextReact [Free]",
      image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: ["TypeScript + React", "Projets Full-Stack", "Next.js 14"]
    },
    {
      name: "NexTailwind",
      image: "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: ["Styling Moderne", "Components UI", "Responsive Design"]
    },
    {
      name: "BeginReact",
      image: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: ["React Fondamentaux", "Hooks", "State Management"]
    }
  ];

  useEffect(() => {
    setRotations(courses.map(() => Math.random() * 20 - 10));
  }, []);

  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-16">
        Formations suivies{" "}
        <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
          2024
        </span>{" "}
        🎓
      </h4>

      <div className="flex justify-center items-center">
        {courses.map((course, idx) => (
          <div
            key={"course" + idx}
            style={{
              transform: `rotate(${rotations[idx]}deg)`,
              transition: 'transform 0.2s ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(0deg) scale(1.1)';
              e.currentTarget.style.zIndex = '10';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `rotate(${rotations[idx]}deg) scale(1)`;
              e.currentTarget.style.zIndex = '0';
            }}
            className="rounded-xl -mr-16 md:-mr-24 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden group relative"
          >
            <img
              src={course.image}
              alt={course.name}
              width="500"
              height="500"
              className="rounded-lg h-32 w-48 md:h-40 md:w-72 object-cover shrink-0"
            />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex flex-col justify-center items-center p-4">
              <h3 className="text-white font-semibold text-center mb-2">{course.name}</h3>
              <div className="flex flex-col gap-1">
                {course.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center gap-1 text-xs text-white/80">
                    <Sparkles className="h-3 w-3 text-blue-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
