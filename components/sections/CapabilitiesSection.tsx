"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Custom-Coded Websites",
    description: "Built with Next.js for maximum performance and modern web standards.",
  },
  {
    title: "Premium UI/UX Design",
    description: "Clean, modern designs that captivate and convert your visitors.",
  },
  {
    title: "Lightning-Fast Performance",
    description: "Optimized for speed with sub-2s load times and 60fps animations.",
  },
  {
    title: "SEO & Lead Generation",
    description: "Built-in SEO structure and strategic CTAs to convert visitors into clients.",
  },
  {
    title: "Unlimited Revisions",
    description: "Changes during development until you're 100% satisfied.",
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cap-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".service-row").forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-white py-32 md:py-40" id="services">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="cap-title font-[family-name:var(--font-inter)] text-4xl md:text-5xl font-semibold text-black mb-20">
          Capabilities
        </h2>

        <div>
          {services.map((service) => (
            <div
              key={service.title}
              className="service-row group flex flex-col md:flex-row justify-between items-start md:items-center py-8 md:py-12 border-b border-black/10 transition-all"
            >
              <h3 className="font-[family-name:var(--font-inter)] text-2xl md:text-4xl lg:text-5xl text-black font-light group-hover:translate-x-5 transition-transform duration-500">
                {service.title}
              </h3>
              <p className="text-sm md:text-base font-[family-name:var(--font-inter)] text-black/60 max-w-md md:text-right mt-3 md:mt-0">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
