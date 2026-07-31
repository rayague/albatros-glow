import { useEffect, useRef, useState } from "react";

type Star = {
  x0: number;
  y0: number;
  sx: number;
  sy: number;
  sz: number;
  r: number;
  tw: number;
  phase: number;
};

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function Preloader({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [skippable, setSkippable] = useState(false);
  const finished = useRef(false);

  const finish = (immediate = false) => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem("albatros-intro", "1");
    } catch {
      /* stockage indisponible */
    }
    // Rien à faire disparaître si l'intro n'a jamais été jouée : enchaîner la
    // sortie ferait patienter 700 ms devant un écran noir.
    if (immediate) {
      onDone();
      return;
    }
    setLeaving(true);
    window.setTimeout(onDone, 700);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("albatros-intro") === "1";
    } catch {
      /* stockage indisponible */
    }
    if (reduced || seen) {
      finish(true);
      return;
    }

    const skipTimer = window.setTimeout(() => setSkippable(true), 1500);
    const endTimer = window.setTimeout(finish, 3000);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = w < 768;
    const cores = navigator.hardwareConcurrency || 4;
    const count = isMobile ? (cores <= 4 ? 300 : 460) : cores <= 4 ? 800 : 1400;

    // Répartition Fibonacci sur la sphère
    const golden = Math.PI * (3 - Math.sqrt(5));
    const stars: Star[] = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      return {
        x0: Math.random() * w,
        y0: Math.random() * h,
        sx: Math.cos(theta) * radius,
        sy: y,
        sz: Math.sin(theta) * radius,
        r: 0.7 + Math.random() * 2.1,
        tw: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const start = performance.now();
    let raf = 0;

    const render = (now: number) => {
      const t = (now - start) / 1000;
      const globeR = Math.min(w, h) * (isMobile ? 0.3 : 0.26);
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      const p = Math.min(1, Math.max(0, (t - 0.8) / 1.4));
      const e = easeInOut(p);
      // 2π/20 rad·s⁻¹ : un tour en 20 s, la vitesse de régime prévue au brief.
      const rot = t > 2.0 ? (t - 2.0) * 0.314 : 0;

      for (const s of stars) {
        const cos = Math.cos(rot);
        const sin = Math.sin(rot);
        const rx = s.sx * cos - s.sz * sin;
        const rz = s.sx * sin + s.sz * cos;
        const depth = (rz + 1.6) / 2.6;
        const gx = cx + rx * globeR;
        const gy = cy + s.sy * globeR;

        const x = s.x0 + (gx - s.x0) * e;
        const y = s.y0 + (gy - s.y0) * e;

        const twinkle = 0.55 + 0.45 * Math.sin(t * 2.6 * s.tw + s.phase);
        const alpha = (0.35 + 0.65 * twinkle) * (0.35 + 0.65 * depth);
        const size = s.r * (0.6 + 0.6 * depth);

        ctx.beginPath();
        ctx.fillStyle =
          e > 0.6 && depth > 0.72
            ? `rgba(232, 200, 116, ${alpha})`
            : `rgba(236, 244, 255, ${alpha})`;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.clearTimeout(skipTimer);
      window.clearTimeout(endTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="presentation"
      onClick={() => skippable && finish()}
      className="fixed inset-0 z-[100] bg-abyss"
      style={{
        transition: "clip-path 700ms cubic-bezier(0.65,0,0.35,1), opacity 700ms ease",
        clipPath: leaving ? "circle(140% at 50% 50%)" : "circle(100% at 50% 50%)",
        opacity: leaving ? 0 : 1,
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[22%] flex flex-col items-center gap-3 text-center">
        <p
          className="font-display text-3xl tracking-[0.18em] text-gold-gradient transition-opacity duration-700 sm:text-4xl"
          style={{ opacity: leaving ? 0 : 1 }}
        >
          L'ALBATROS
        </p>
        <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">Bonifacio</p>
      </div>
      {skippable && !leaving && (
        <button
          onClick={() => finish()}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Entrer
        </button>
      )}
    </div>
  );
}
