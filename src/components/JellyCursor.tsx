"use client";

import { useEffect, useRef } from 'react';

export default function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Prispôsobenie pri zmene veľkosti okna
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Pozícia myši a pozícia "žiariča" častíc (pre to hladké PIXI oneskorenie)
    const pointer = { x: width / 2, y: height / 2 };
    const emitterPos = { x: width / 2, y: height / 2 };

    const onMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Trieda pre jednu časticu
    class Particle {
      x: number;
      y: number;
      life: number;
      maxLife: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.life = 0;
        this.maxLife = 15; // Dĺžka života častice (podobné ako lifetime 0.6 v PIXI)
      }

      update() {
        this.life++;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const progress = this.life / this.maxLife;
        if (progress >= 1) return;

        // PIXI Alpha: start 0.8 -> end 0.15
        const alpha = 0.8 - (progress * (0.8 - 0.15));
        
        // PIXI Scale: start 1 -> end 0.2 (základný polomer je 6px)
        const radius = 6 * (1 - (progress * 0.8));

        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        // Tvoja farba #FF3831 (RGB: 255, 56, 49)
        ctx.fillStyle = `rgba(255, 56, 49, ${alpha})`; 
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    let animationFrameId: number;

    // Hlavná animácia
    const render = () => {
      // Vyčistenie plátna pred každým framom
      ctx.clearRect(0, 0, width, height);

      // PIXI "sharpness" matematika pre hladké dobiehanie kurzora
      const dx = pointer.x - emitterPos.x;
      const dy = pointer.y - emitterPos.y;
      
      emitterPos.x += dx * 0.15;
      emitterPos.y += dy * 0.15;

      // Generovanie častíc (ak hýbeš myšou rýchlo, vytvorí ich viac, aby neboli medzery)
      const dist = Math.hypot(dx, dy);
      const spawnCount = Math.min(Math.floor(dist / 4) + 1, 4);

      for(let i = 0; i < spawnCount; i++) {
         const spawnX = emitterPos.x - (dx * (i / spawnCount) * 0.15);
         const spawnY = emitterPos.y - (dy * (i / spawnCount) * 0.15);
         particles.push(new Particle(spawnX, spawnY));
      }

      // Aktualizácia a kreslenie častíc
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        
        // Ak je častica stará, vymažeme ju z poľa
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Upratovanie
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full hidden md:flex h-full pointer-events-none z-[9999]"
    />
  );
}