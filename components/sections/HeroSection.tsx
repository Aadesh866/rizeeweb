"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import HeroCanvas from "@/components/HeroCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    lenis?.scrollTo(target);
  };

  useGSAP(
    () => {
      gsap.from(".hero-meta", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".hero-title-line", {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.0,
        ease: "power3.out",
      });

      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        delay: 1.3,
        ease: "power3.out",
      });

      gsap.from(".hero-graphic", {
        opacity: 0,
        scale: 0.8,
        duration: 2,
        delay: 1.0,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex flex-col justify-end"
      id="hero"
    >
      {/* Abstract gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-black to-[#111]" />
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-32 pt-40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 w-full">
          <div className="max-w-4xl relative z-10 w-full md:w-3/5">
            <p className="hero-meta text-sm font-[family-name:var(--font-inter)] font-medium uppercase tracking-[0.3em] text-white/70 mb-6">
              Premium Web Development
            </p>

            <h1
              className="font-[family-name:var(--font-inter)] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold text-white leading-[0.9] mb-8"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span className="block overflow-hidden">
                <span className="hero-title-line block">We Code Faster.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-title-line block">We Design Better.</span>
              </span>
            </h1>

            <p className="hero-subtitle text-base md:text-lg text-white/80 max-w-xl leading-relaxed font-[family-name:var(--font-inter)] mb-10">
              Custom-coded, blazing-fast websites for architects and modern brands.
              Built with Next.js for maximum performance — designed to convert
              visitors into clients.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#work"
                onClick={(e) => handleScrollTo(e, "#work")}
                className="hero-cta inline-block bg-white text-black px-8 py-4 text-sm font-[family-name:var(--font-inter)] font-medium uppercase tracking-widest hover:bg-[#888] hover:text-white transition-colors text-center"
              >
                View My Work
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="hero-cta inline-block border border-white text-white px-8 py-4 text-sm font-[family-name:var(--font-inter)] font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-colors text-center"
              >
                Get a Quote
              </a>
            </div>
          </div>

          <div className="hidden md:flex w-2/5 justify-center items-center relative z-0 hero-graphic">
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <HeroCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
