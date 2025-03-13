import React from "react";
import { HoverEffect } from "../ui/card-hover-effect";
import { Globe } from "@/components/magicui/globe"
export function About() {
  return (
    <div className="max-w-6xl min-h-64 mx-auto px-8 relative">

     
      <div className="flex flex-col items-center mb-8">
        <p className="text-lg text-center max-w-2xl p-8 text-white">
          I am a software engineer with a passion for building scalable and efficient systems.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-center mb-6 text-white">Frontend</h3>
          <HoverEffect items={frontendProjects} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-center mb-6 text-white">Backend</h3>
          <HoverEffect items={backendProjects} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-center mb-6 text-white">Database</h3>
          <HoverEffect items={databaseProjects} />
          <div className="absolute w-full max-w-[800px]">
            <Globe />
          </div>
        </div>
      </div>
    </div>
  );
}

interface Project {
  title: string;
  link: string;
}

export const frontendProjects: Project[] = [
    {
        title: "Next.js",
        link: "/svg/next.png",
    },
    {
        title: "React",
        link: "/svg/react.svg",
    },
    {
        title: "Tailwind",
        link: "/svg/tailwind.svg",
    },
    {
        title: "TypeScript",
        link: "/svg/typescript.svg",
    },
];

export const backendProjects: Project[] = [
    {
        title: "Node.js",
        link: "/svg/node.svg",
    },
    {
        title: "Docker",
        link: "/svg/docker.svg",
    },
    {
        title: "Resend",
        link: "/svg/resend.png",
    },
    {
        title: "Stripe",
        link: "/svg/stripe.png",
    },
];

export const databaseProjects: Project[] = [
    {
        title: "PostgreSQL",
        link: "/svg/postgresql.png",
    },
    {
        title: "MongoDB",
        link: "/svg/mongodb.svg",
    },
    {
        title: "Casandra",
        link: "/svg/cassandra.png",
    },
    {
        title: "My SQL",
        link: "/svg/mysql.svg",
    },
];

