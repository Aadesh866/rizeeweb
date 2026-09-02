"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".marquee-inner", {
      xPercent: -50,
      ease: "none",
      duration: 15,
      repeat: -1,
    });
    
    gsap.to(".marquee-container", {
      y: 50,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="marquee-container w-full overflow-hidden bg-[#111] py-12 md:py-20 border-y border-[#222]">
      <div className="marquee-inner flex whitespace-nowrap items-center font-[family-name:var(--font-inter)] w-max">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            <span 
              className="text-4xl md:text-7xl font-bold uppercase tracking-widest text-transparent" 
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
            >
              Premium Web Development
            </span>
            <span className="text-4xl md:text-7xl text-white mx-8 md:mx-16">—</span>
            <span className="text-4xl md:text-7xl font-bold uppercase tracking-widest text-white">
              Creative Agency
            </span>
            <span className="text-4xl md:text-7xl text-white mx-8 md:mx-16">—</span>
          </div>
        ))}
      </div>
    </div>
  );
}
