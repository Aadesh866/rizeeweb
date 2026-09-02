"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-image", {
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(".about-content > *", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.to(".about-image-inner", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-white py-32 md:py-40 text-black" id="about">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          {/* Photo */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end about-image">
            <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden shadow-2xl">
              <div className="about-image-inner absolute inset-[-15%]">
                <Image
                  src="/about-photo.webp"
                  alt="Aadesh - Freelance Web Developer"
                  fill
                  className="object-cover"
                  sizes="(max-w-768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 about-content max-w-xl">
            <h2 className="font-[family-name:var(--font-inter)] text-4xl md:text-5xl font-semibold mb-8 leading-[1.1] uppercase">
              ABOUT RIZEEWEB
            </h2>
            <div className="space-y-6 font-[family-name:var(--font-inter)] text-black/70 text-base md:text-lg leading-relaxed">
              <p>
                My passion for web development led me to create RIZEEWEB. What started as a solo freelance endeavor has grown into a specialized agency dedicated to helping business owners build premium digital presences that drive real results.
              </p>
              <p>
                We don&apos;t just build websites — we build digital assets that position our clients as industry leaders through striking aesthetics, modern design systems, and high-performance architecture.
              </p>
            </div>
            
            <a
              href="#contact"
              className="inline-block border border-black text-black px-8 py-4 mt-10 text-sm font-[family-name:var(--font-inter)] font-medium uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Let&apos;s Work Together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
