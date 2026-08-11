"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (target === "/") {
      lenis?.scrollTo(0);
    } else {
      lenis?.scrollTo(target);
    }
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <div className="fixed top-6 md:top-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between h-14 md:h-16 px-6 md:px-8 rounded-full transition-all duration-500 w-full max-w-3xl ${
            scrolled
              ? "bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/15 shadow-[0_0_30px_rgba(255,255,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)]"
              : "bg-white/5 backdrop-blur-sm border border-white/[0.03] shadow-none"
          }`}
        >
          <a
            href="/"
            onClick={(e) => handleScrollTo(e, "/")}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image src="/logo.png" alt="RIZEEWEB" width={150} height={45} className="object-contain" />
          </a>

          <div className="hidden md:flex items-center justify-end gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="nav-link text-[10px] md:text-xs font-[family-name:var(--font-inter)] font-medium uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white z-50 relative"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="font-[family-name:var(--font-inter)] text-4xl font-semibold text-white hover:text-[#888] transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
