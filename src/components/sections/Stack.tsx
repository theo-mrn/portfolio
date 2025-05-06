"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-20 flex size-16 items-center justify-center rounded-full border-2 border-zinc-800 bg-zinc-900 p-4 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-indigo-500 hover:shadow-[0_0_25px_-12px_rgba(99,102,241,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const SectionLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute -left-40 flex items-center gap-3">
      <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-zinc-700" />
      <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
        {children}
      </span>
    </div>
  );
};

export function Stack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  const card6Ref = useRef<HTMLDivElement>(null);
  const card7Ref = useRef<HTMLDivElement>(null);
  const card8Ref = useRef<HTMLDivElement>(null);
  const card9Ref = useRef<HTMLDivElement>(null);
  const card10Ref = useRef<HTMLDivElement>(null);
  const card11Ref = useRef<HTMLDivElement>(null);
  const card12Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full max-w-[900px] items-center justify-center overflow-visible px-40 py-10 mx-auto"
      ref={containerRef}
    >
      <h2 className="text-3xl font-bold text-zinc-100 mb-16 text-center absolute top-[-2rem] left-1/2 transform -translate-x-1/2">
        Ma stack
      </h2>

      <div className="flex size-full flex-col gap-32 mt-16">
        <div className="relative flex flex-row items-center justify-between">
          <SectionLabel>Frontend</SectionLabel>
          <div className="relative z-10 flex w-full flex-row items-center justify-between bg-zinc-900/50 px-8 py-4 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default">
                  <Circle ref={card1Ref}>
                    <Image src="/svg/next.png" alt="Next.js" width={32} height={32} />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">Next.js</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default">
                  <Circle ref={card2Ref}>
                    <Image src="/svg/aws.webp" className="rounded-full" alt="React" width={32} height={32} />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">React</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default">
                  <Circle ref={card3Ref}>
                    <Image src="/svg/tailwind.svg" alt="Tailwind" width={32} height={32} />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">Tailwind CSS</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default">
                  <Circle ref={card4Ref}>
                    <Image src="/svg/typescript.svg" className="rounded-full"  alt="TypeScript" width={32} height={32} />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">TypeScript</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="relative flex flex-row items-center justify-between">
          <SectionLabel>Backend</SectionLabel>
          <div className="relative z-10 flex w-full flex-row items-center justify-between bg-zinc-900/50 px-8 py-4 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default">
                  <Circle ref={card5Ref}>
                    <Image src="/svg/node.svg" alt="Node.js" width={32} height={32} />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">Node.js</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default">
                  <Circle ref={card6Ref}>
                    <Image src="/svg/docker.svg" alt="Docker" width={32} height={32} />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">Docker</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default">
                  <Circle ref={card7Ref}>
                    <Image src="/svg/prisma2.svg" alt="Resend" width={32} height={32} />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">Prisma</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default">
                  <Circle ref={card8Ref}>
                    <Image src="/svg/stripe.png" alt="Stripe" width={32} height={32} />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">Stripe</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="relative flex flex-row items-center justify-between">
          <SectionLabel>Database</SectionLabel>
          <div className="relative z-10 flex w-full flex-row items-center justify-between bg-zinc-900/50 px-8 py-4 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default">
                  <Circle ref={card9Ref}>
                    <Image src="/svg/postgresql.png" alt="PostgreSQL" width={32} height={32} />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">PostgreSQL</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default">
                  <Circle ref={card10Ref}>
                    <Image src="/svg/mongodb.svg" alt="MongoDB" width={32} height={32} />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">MongoDB</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default">
                  <Circle ref={card11Ref}>
                    <Image src="/svg/cassandra.png" alt="Cassandra" className="rounded-xs" width={32} height={32} />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">Cassandra</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="cursor-default">
                  <Circle ref={card12Ref}>
                    <Image src="/svg/mysql.svg" alt="MySQL" width={32} height={32} />
                  </Circle>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={5} 
                align="center"
                className="z-50 bg-zinc-900/90 px-3 py-1.5 text-sm border border-zinc-800/50 backdrop-blur-sm rounded-lg shadow-xl"
              >
                <p className="font-medium text-zinc-100">MySQL</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Vertical beam from card2 to card6 */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={card2Ref}
        toRef={card6Ref}
        pathColor="#4f46e5"
        gradientStartColor="#818cf8"
        gradientStopColor="#4f46e5"
        pathWidth={3}
        pathOpacity={0}
        duration={4}
        delay={0}
      />

      {/* Horizontal beam from card6 to card7 */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={card6Ref}
        toRef={card7Ref}
        pathColor="#4f46e5"
        gradientStartColor="#818cf8"
        gradientStopColor="#4f46e5"
        pathWidth={3}
        pathOpacity={0}
        duration={4}
        delay={0.5}
      />

      {/* Vertical beam from card7 to card11 */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={card7Ref}
        toRef={card11Ref}
        pathColor="#4f46e5"
        gradientStartColor="#818cf8"
        gradientStopColor="#4f46e5"
        pathWidth={3}
        pathOpacity={0}
        duration={4}
        delay={1}
      />
    </div>
  );
}
