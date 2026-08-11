"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Cheerspace",
    category: "Interior Design",
    description: "Premium interior design portfolio website",
    url: "https://cheerspace.vercel.app",
    span: "col-span-1 md:col-span-2",
    aspect: "aspect-[16/9]", // Matches height of aspect-[8/9] in a 2:1 column ratio
    gradient: "from-[#253225] to-[#0a0a0a]",
  },
  {
    title: "Social Automations",
    category: "Marketing Agency",
    description: "Social media content automation platform",
    url: "https://socialautomations.xyz",
    span: "col-span-1",
    aspect: "aspect-square md:aspect-[8/9]", // perfectly aligns with 16/9 beside it
    gradient: "from-[#20203a] to-[#0a0a0a]",
  },
  {
    title: "PurpleHub.ai",
    category: "SaaS Platform",
    description: "AI-powered business management tools",
    url: "https://purplehub.ai",
    span: "col-span-1",
    aspect: "aspect-square md:aspect-[4/3]",
    gradient: "from-[#26263b] to-[#0a0a14]",
  },
  {
    title: "Wonders of Rome",
    category: "Travel Agency",
    description: "Exclusive Roman travel experiences",
    url: "https://wondersofrome.com",
    span: "col-span-1",
    aspect: "aspect-square md:aspect-[4/3]",
    gradient: "from-[#362626] to-[#0a0a0a]",
  },
  {
    title: "Biospace",
    category: "Architecture",
    description: "Modern architectural visualization",
    url: "https://biospace-nine.vercel.app",
    span: "col-span-1",
    aspect: "aspect-square md:aspect-[4/3]",
    gradient: "from-[#1f3236] to-[#0a0a0a]",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".work-header > *", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-black py-32 md:py-40" id="work">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="work-header flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <h2 className="font-[family-name:var(--font-inter)] text-4xl md:text-5xl font-semibold text-white">
            Selected Work
          </h2>
          <span className="text-sm font-[family-name:var(--font-inter)] font-medium uppercase tracking-widest text-[#888] mt-4 md:mt-0">
            View All Projects →
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card group relative overflow-hidden rounded-2xl ${project.span} ${project.aspect}`}
            >
              {/* Gradient placeholder image */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 flex items-center justify-center`}>
                <span className="text-xl md:text-3xl font-[family-name:var(--font-inter)] font-light text-white/[0.12] tracking-[0.3em] uppercase select-none text-center px-4">
                  {project.title}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />

              {/* Info */}
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                <h3 className="font-[family-name:var(--font-inter)] text-2xl md:text-3xl font-semibold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-sm font-[family-name:var(--font-inter)] text-white/80 mb-3">
                  {project.category}
                </p>
                <p className="text-xs font-[family-name:var(--font-inter)] uppercase tracking-widest text-[#888] max-w-xs mb-6">
                  {project.description}
                </p>
                <span className="text-[10px] font-[family-name:var(--font-inter)] font-medium uppercase tracking-[0.2em] text-white/40 border border-white/20 rounded-full px-4 py-2">
                  Click to visit website
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
