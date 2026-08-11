"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isTouch = useRef(false);
  const lastSparkle = useRef(0);
  const rafId = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    dotPos.current.x = lerp(dotPos.current.x, pos.current.x, 0.25);
    dotPos.current.y = lerp(dotPos.current.y, pos.current.y, 0.25);

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      isTouch.current = true;
      return;
    }

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // Sparkle trail
      const now = Date.now();
      if (now - lastSparkle.current > 40) {
        lastSparkle.current = now;
        createSparkle(e.clientX, e.clientY);
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, [role='button']")) {
        isHovering.current = true;
        if (dotRef.current) {
          dotRef.current.style.width = "20px";
          dotRef.current.style.height = "20px";
          // keep solid white, no opacity change
        }
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, [role='button']")) {
        isHovering.current = false;
        if (dotRef.current) {
          dotRef.current.style.width = "12px";
          dotRef.current.style.height = "12px";
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          background: "#ffffff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transition: "width 0.3s ease, height 0.3s ease",
        }}
      />
    </>
  );
}

function createSparkle(x: number, y: number) {
  const el = document.createElement("div");
  const size = 2 + Math.random() * 3;
  const dx = (Math.random() - 0.5) * 30;
  const dy = -5 - Math.random() * 20;

  el.className = "sparkle-particle";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.setProperty("--sparkle-dx", `${dx}px`);
  el.style.setProperty("--sparkle-dy", `${dy}px`);

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 600);
}
