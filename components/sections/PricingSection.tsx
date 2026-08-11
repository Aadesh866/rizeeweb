"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "Premium custom-coded website (Next.js)",
  "Modern, fast, responsive design",
  "Smooth animations & premium UI",
  "SEO-optimized structure",
  "High-performance hosting setup",
  "Unlimited revisions during development",
  "Contact forms with email notifications",
  "WhatsApp integration",
  "Google Analytics setup",
  "Annual hosting + maintenance",
];

const terms = [
  "₹7,000 advance payment to start",
  "Remaining ₹12,600 after completion and all revisions",
  "Domain purchased separately (₹700–2,000/year)",
  "After first year: Only ₹3,600/year for hosting & maintenance",
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    lenis?.scrollTo(target);
  };

  useGSAP(
    () => {
      gsap.from(".pricing-header > *", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(".pricing-content", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pricing-content", start: "top 85%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-black py-32 md:py-40" id="pricing">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="pricing-header mb-16">
          <p className="text-sm font-[family-name:var(--font-inter)] font-medium uppercase tracking-[0.2em] text-[#444] mb-4">
            Investment
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-4xl md:text-5xl font-semibold text-white leading-[1.1] mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base font-[family-name:var(--font-inter)] text-[#888] max-w-2xl leading-relaxed">
            No hidden fees. No surprises. Just honest pricing for quality work.
          </p>
        </div>

        <div className="pricing-content grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left: Price */}
          <div className="pb-12 md:pb-0 md:pr-12 lg:pr-20">
            <div className="mb-10">
              <span className="font-[family-name:var(--font-inter)] text-6xl md:text-7xl font-semibold text-white" style={{ letterSpacing: "-0.02em" }}>
                ₹18,600
              </span>
              <span className="text-white/60 font-[family-name:var(--font-inter)] ml-3 text-lg">
                first year
              </span>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex justify-between items-center pb-4 border-b border-[#222]">
                <span className="text-[#888] font-[family-name:var(--font-inter)]">Development (One-time)</span>
                <span className="text-white font-[family-name:var(--font-inter)] font-medium">₹15,000</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-[#222]">
                <span className="text-[#888] font-[family-name:var(--font-inter)]">Hosting & Maintenance</span>
                <span className="text-white font-[family-name:var(--font-inter)] font-medium">₹3,600/year</span>
              </div>
            </div>

            <div className="border border-[#222] p-6 mb-10">
              <h4 className="font-[family-name:var(--font-inter)] text-sm font-medium uppercase tracking-[0.15em] text-[#444] mb-4">
                Payment Terms
              </h4>
              <ul className="space-y-3">
                {terms.map((term, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-[family-name:var(--font-inter)] text-[#888]">
                    <span className="text-white/30 shrink-0">—</span>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="inline-block bg-white text-black px-8 py-4 text-sm font-[family-name:var(--font-inter)] font-medium uppercase tracking-widest hover:bg-[#888] hover:text-white transition-colors"
            >
              Get Started Today
            </a>
          </div>

          {/* Right: Features */}
          <div className="md:pl-12 lg:pl-20 md:border-l border-[#222] flex flex-col justify-center pt-12 md:pt-0 border-t md:border-t-0 border-[#222]">
            <h4 className="font-[family-name:var(--font-inter)] text-xl font-semibold text-white mb-8">
              What&apos;s Included
            </h4>
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-base font-[family-name:var(--font-inter)] text-[#888]">
                  <span className="text-white/30 shrink-0">—</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
