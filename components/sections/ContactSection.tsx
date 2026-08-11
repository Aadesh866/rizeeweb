"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.from(".cta-content > *", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section ref={sectionRef} className="bg-black py-32 md:py-40" id="contact">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="cta-content text-center max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-inter)] text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-6">
            Have a project in mind?
          </h2>
          <p className="text-base md:text-lg text-[#888] font-[family-name:var(--font-inter)] leading-relaxed mb-12">
            Tell us what you&apos;re building. We&apos;ll tell you how fast we can finish it.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 justify-center items-stretch mb-8"
          >
            <input
              type="text"
              placeholder="What are you building?"
              required
              className="bg-transparent border-b border-white/30 text-white placeholder:text-[#888] py-4 px-2 min-w-[250px] md:min-w-[300px] text-sm font-[family-name:var(--font-inter)] focus:outline-none focus:border-white transition-colors"
            />
            <input
              type="email"
              placeholder="Your email"
              required
              className="bg-transparent border-b border-white/30 text-white placeholder:text-[#888] py-4 px-2 min-w-[250px] md:min-w-[300px] text-sm font-[family-name:var(--font-inter)] focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-black px-10 py-4 text-sm font-[family-name:var(--font-inter)] font-medium uppercase tracking-widest hover:bg-[#888] hover:text-white transition-colors"
            >
              {submitted ? "Sent ✓" : "Send"}
            </button>
          </form>

          <p className="text-sm text-[#444] font-[family-name:var(--font-inter)]">
            Or write directly:{" "}
            <a
              href="mailto:abiaadesh29@gmail.com"
              className="text-[#888] hover:text-white transition-colors"
            >
              abiaadesh29@gmail.com
            </a>{" "}
            ·{" "}
            <a
              href="https://wa.me/919790124534"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#888] hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              +91 97901 24534
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
