import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import heroImg from "@/assets/hero-marina.jpg";
import terrasseImg from "@/assets/terrasse.jpg";
import dishImg from "@/assets/dish-poisson.jpg";
import langousteImg from "@/assets/langouste.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — L'Albatros, Bonifacio" },
      {
        name: "description",
        content:
          "Photos de L'Albatros à Bonifacio : terrasse face à la marina, plats de la pêche du jour, ambiance du port au crépuscule.",
      },
      { property: "og:title", content: "Galerie — L'Albatros, Bonifacio" },
      {
        property: "og:description",
        content: "La terrasse, le port, les assiettes : l'atmosphère de L'Albatros en images.",
      },
    ],
  }),
  component: GaleriePage,
});

const photos = [
  {
    src: heroImg,
    alt: "Le port de plaisance de Bonifacio la nuit vu depuis la terrasse du restaurant",
    w: 1920,
    h: 1280,
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: dishImg,
    alt: "Filet de rouget dans son bouillon de poissons de roche safrané",
    w: 1024,
    h: 1280,
    span: "",
  },
  {
    src: langousteImg,
    alt: "Plateau doré de langoustes, gambas et moules grillées",
    w: 1024,
    h: 1024,
    span: "",
  },
  {
    src: terrasseImg,
    alt: "Tables dressées en terrasse au crépuscule, yachts amarrés en arrière-plan",
    w: 1280,
    h: 960,
    span: "sm:col-span-2",
  },
];

function GaleriePage() {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Comportements attendus d'un `aria-modal` : fermeture au clavier, arrière-plan
  // figé (sinon la page défile derrière la photo au doigt), et focus déplacé
  // dans la boîte de dialogue puis rendu au déclencheur.
  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [open]);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 lg:pt-16">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.36em] text-accent">En images</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">Galerie</h1>
      </Reveal>

      <div className="mt-10 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[220px]">
        {photos.map((p, i) => (
          <motion.button
            key={p.alt}
            layoutId={`photo-${i}`}
            onClick={(e) => {
              openerRef.current = e.currentTarget;
              setOpen(i);
            }}
            className={`group relative overflow-hidden rounded-3xl border border-border ${p.span}`}
            aria-label={`Agrandir : ${p.alt}`}
          >
            <img
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(11,27,43,0.7))]" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-[rgba(11,27,43,0.85)] p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo agrandie"
          >
            {/* Le clic sur la photo ne doit pas remonter au fond, qui ferme. */}
            <motion.img
              layoutId={`photo-${open}`}
              src={photos[open].src}
              alt={photos[open].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80dvh] w-auto max-w-full rounded-3xl border border-border object-contain"
            />
            <button
              ref={closeRef}
              onClick={() => setOpen(null)}
              aria-label="Fermer la photo"
              className="glass absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
