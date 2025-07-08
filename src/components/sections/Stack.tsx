"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Circle = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "z-20 flex size-14 items-center justify-center rounded-full border-2 border-zinc-800 bg-zinc-900 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-indigo-500 hover:shadow-[0_0_25px_-12px_rgba(99,102,241,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute -left-32 flex items-center gap-2">
      <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-zinc-700" />
      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
        {children}
      </span>
    </div>
  );
};

const TechIcon = ({ src, alt, name, className }: { src: string; alt: string; name: string; className?: string }) => {
  return (
    <div className="group relative">
      <Circle>
        <Image src={src} alt={alt} width={28} height={28} className={className} />
      </Circle>
      {/* CSS-based tooltip */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-zinc-900/90 px-2 py-1 text-xs border border-zinc-800/50 backdrop-blur-sm rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <p className="font-medium text-zinc-100 whitespace-nowrap">{name}</p>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-3 border-transparent border-t-zinc-900/90"></div>
      </div>
    </div>
  );
};

export function Stack() {
  return (
    <div className="relative flex w-full max-w-[800px] items-center justify-center overflow-visible px-32 py-8 mx-auto">
      <h2 className="text-2xl font-bold text-zinc-100 mb-12 text-center absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2">
        Ma stack
      </h2>

      <div className="flex size-full flex-col gap-20 mt-12">
        <div className="relative flex flex-row items-center justify-between">
          <SectionLabel>Frontend</SectionLabel>
          <div className="relative z-10 flex w-full flex-row items-center justify-between bg-zinc-900/50 px-6 py-3 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
            <TechIcon src="/svg/next.png" alt="Next.js" name="Next.js" />
            <TechIcon src="/svg/react.svg" alt="React" name="React" className="rounded-full" />
            <TechIcon src="/svg/tailwind.svg" alt="Tailwind" name="Tailwind CSS" />
            <TechIcon src="/svg/typescript.svg" alt="TypeScript" name="TypeScript" className="rounded-md" />
          </div>
        </div>

        <div className="relative flex flex-row items-center justify-between">
          <SectionLabel>Backend</SectionLabel>
          <div className="relative z-10 flex w-full flex-row items-center justify-between bg-zinc-900/50 px-6 py-3 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
            <TechIcon src="/svg/node.svg" alt="Node.js" name="Node.js" />
            <TechIcon src="/svg/docker.svg" alt="Docker" name="Docker" />
            <TechIcon src="/svg/prisma2.svg" alt="Prisma" name="Prisma" />
            <TechIcon src="/svg/aws.webp" alt="AWS" name="AWS" className="rounded-md" />
          </div>
        </div>

        <div className="relative flex flex-row items-center justify-between">
          <SectionLabel>Database</SectionLabel>
          <div className="relative z-10 flex w-full flex-row items-center justify-between bg-zinc-900/50 px-6 py-3 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
            <TechIcon src="/svg/postgresql.png" alt="PostgreSQL" name="PostgreSQL" />
            <TechIcon src="/svg/mongodb.svg" alt="MongoDB" name="MongoDB" />
            <TechIcon src="/svg/cassandra.png" alt="Cassandra" name="Cassandra" className="rounded-xs" />
            <TechIcon src="/svg/mysql.svg" alt="MySQL" name="MySQL" />
          </div>
        </div>
      </div>
    </div>
  );
}
