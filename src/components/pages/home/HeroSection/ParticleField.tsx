"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cols = 22;
    const rows = 16;
    const count = cols * rows;

    type P = { hx: number; hy: number; nx: number; ny: number; x: number; y: number };
    const particles: P[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    const rand = (i: number, s: number) => {
      const v = Math.sin(i * 999.13 + s * 7.77) * 43758.5453;
      return v - Math.floor(v);
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initPositions();
    };

    const initPositions = () => {
      particles.length = 0;
      const padX = width * 0.08;
      const padY = height * 0.12;
      const gridW = width - padX * 2;
      const gridH = height - padY * 2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          const hx = padX + (i / (cols - 1)) * gridW;
          const hy = padY + (j / (rows - 1)) * gridH;
          const nx = padX + rand(k, 1) * gridW;
          const ny = padY + rand(k, 2) * gridH;
          particles.push({ hx, hy, nx, ny, x: nx, y: ny });
        }
      }
    };

    let progress = 0;
    let targetProgress = 0;
    let mouseX = -1;
    let mouseY = -1;

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = 1 - (rect.top + rect.height * 0.2) / vh;
      targetProgress = Math.max(0, Math.min(1, raw));
    };

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseX = -1;
      mouseY = -1;
    };

    const ease = (t: number) => t * t * (3 - 2 * t);

    let raf = 0;
    const draw = () => {
      progress += (targetProgress - progress) * 0.06;
      const p = ease(progress);

      ctx.clearRect(0, 0, width, height);

      const edgeAlpha = Math.max(0, p - 0.35) * 0.9;
      if (edgeAlpha > 0.02) {
        ctx.strokeStyle = `rgba(60, 90, 200, ${edgeAlpha * 0.28})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const a = particles[j * cols + i];
            if (i < cols - 1) {
              const b = particles[j * cols + (i + 1)];
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
            }
            if (j < rows - 1) {
              const b = particles[(j + 1) * cols + i];
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
            }
          }
        }
        ctx.stroke();
      }

      for (let k = 0; k < count; k++) {
        const pt = particles[k];
        let tx = pt.nx + (pt.hx - pt.nx) * p;
        let ty = pt.ny + (pt.hy - pt.ny) * p;

        if (mouseX > 0) {
          const dx = tx - mouseX;
          const dy = ty - mouseY;
          const d2 = dx * dx + dy * dy;
          const r = 110;
          if (d2 < r * r) {
            const f = (1 - Math.sqrt(d2) / r) * 14;
            tx += (dx / (Math.sqrt(d2) + 0.01)) * f;
            ty += (dy / (Math.sqrt(d2) + 0.01)) * f;
          }
        }

        pt.x += (tx - pt.x) * 0.15;
        pt.y += (ty - pt.y) * 0.15;

        const size = 1 + p * 0.8;
        const alpha = 0.35 + p * 0.5;
        ctx.fillStyle =
          p > 0.5
            ? `rgba(40, 60, 160, ${alpha})`
            : `rgba(60, 70, 100, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    onScroll();

    if (reduced) {
      progress = 1;
      targetProgress = 1;
      for (const pt of particles) {
        pt.x = pt.hx;
        pt.y = pt.hy;
      }
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener("scroll", onScroll, { passive: true });
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className="relative h-[280px] sm:h-[360px] md:h-[480px] lg:h-[520px] w-full overflow-hidden rounded-lg border border-hairline bg-surface-muted"
    >
      <div className="pointer-events-none absolute inset-0 dot-bg opacity-30" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ink-subtle mono-num">
        <span className="h-1.5 w-1.5 rounded-full bg-signal" /> raw → structured
      </div>
    </div>
  );
}
