"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = 400;
    let height = canvas.height = 400;
    
    // Resize handler
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    // 3D Math & Particle Setup for a Wireframe Sphere
    const particles: { x: number, y: number, z: number, id: number }[] = [];
    const numParticles = 250;
    const sphereRadius = 140;
    
    // Fibonacci sphere distribution for even spacing
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    for (let i = 0; i < numParticles; i++) {
      const y = 1 - (i / (numParticles - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      particles.push({ 
        x: x * sphereRadius, 
        y: y * sphereRadius, 
        z: z * sphereRadius,
        id: i
      });
    }

    // Pre-calculate connections (edges)
    const edges: { a: number, b: number }[] = [];
    const maxDist = 45; // Max distance to draw a line
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dist = Math.sqrt(
          (p1.x - p2.x) ** 2 + 
          (p1.y - p2.y) ** 2 + 
          (p1.z - p2.z) ** 2
        );
        
        if (dist < maxDist) {
          edges.push({ a: i, b: j });
        }
      }
    }

    let angleY = 0;
    let angleX = 0.2; 
    let rafId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update rotation
      angleY += 0.003;
      angleX += 0.001;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Project points
      const projected = particles.map(p => {
        // Rotate Y
        let rotX = p.x * cosY - p.z * sinY;
        let rotZ = p.z * cosY + p.x * sinY;
        
        // Rotate X
        let rotY = p.y * cosX - rotZ * sinX;
        rotZ = rotZ * cosX + p.y * sinX;

        // Perspective
        const perspective = 500 / (500 + rotZ);
        
        return {
          id: p.id,
          x: rotX * perspective + width / 2,
          y: rotY * perspective + height / 2,
          z: rotZ,
          scale: perspective,
        };
      });

      // Draw Edges
      ctx.lineWidth = 1;
      edges.forEach(edge => {
        const p1 = projected[edge.a];
        const p2 = projected[edge.b];
        
        // Calculate average depth for the line
        const avgZ = (p1.z + p2.z) / 2;
        
        // Fade out lines that are far back
        const alpha = Math.max(0.02, 1 - (avgZ + sphereRadius) / (sphereRadius * 2));
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Nodes
      projected.sort((a, b) => b.z - a.z); // Back to front
      
      projected.forEach(p => {
        const alpha = Math.max(0.1, 1 - (p.z + sphereRadius) / (sphereRadius * 2));
        
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, 1.5 * p.scale), 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block"
      style={{ touchAction: "none" }}
    />
  );
}
