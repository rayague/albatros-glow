import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

import { PHOTOS } from "@/lib/gallery";
import { Reveal } from "@/components/Reveal";
import { dictFor, useI18n } from "@/lib/i18n";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

export const Route = createFileRoute("/galerie")({
  head: ({ match }) => {
    const t = dictFor((match.search as { lang?: Locale }).lang ?? DEFAULT_LOCALE);
    return {
      meta: [
        { title: t.meta.galleryTitle },
        { name: "description", content: t.meta.galleryDescription },
        { property: "og:title", content: t.meta.galleryTitle },
        { property: "og:description", content: t.meta.galleryOgDescription },
      ],
    };
  },
  component: GaleriePage,
});

function GaleriePage() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const total = PHOTOS.length;
  // Défilement circulaire : arrivé au bout, on repart au début plutôt que de
  // désactiver le bouton, ce qui évite un cul-de-sac au clavier.
  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + total) % total)),
    [total],
  );

  // Comportements attendus d'un `aria-modal` : fermeture au clavier, navigation
  // aux flèches, arrière-plan figé (sinon la page défile derrière la photo au
  // doigt), et focus déplacé dans la boîte de dialogue puis rendu au déclencheur.
  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
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
    // `open` ne sert qu'à armer/désarmer l'effet : le relancer à chaque photo
    // rendrait le focus au déclencheur en pleine navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open === null, step]);

  const photo = open === null ? null : PHOTOS[open];

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 lg:pt-16">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.36em] text-accent">{t.gallery.eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">{t.gallery.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t.gallery.intro}
        </p>
      </Reveal>

      {/*
        Colonnes maçonnées : chaque photo garde ses proportions d'origine et la
        grille encaisse n'importe quel nombre d'images. L'ancienne grille fixait
        les tailles par index — elle se serait cassée dès la cinquième photo.

        Chaque vignette porte son titre : avec quatre images seulement, une
        grille nue paraît maigre. Nommées, elles se lisent comme une série.
      */}
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {PHOTOS.map((p, i) => {
          const alt = t.gallery.photos[p.id];
          return (
            <motion.button
              key={p.id}
              layoutId={`photo-${i}`}
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setOpen(i);
              }}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-3xl border border-border"
              aria-label={t.gallery.enlarge(alt)}
            >
              <img
                src={p.src}
                alt={alt}
                width={p.w}
                height={p.h}
                loading="lazy"
                decoding="async"
                className="w-full transition-transform duration-[1.2s] group-hover:scale-105"
              />
              {/*
                Fondu au-dessus du bandeau, pour que celui-ci ne coupe pas
                l'image net. Purement décoratif : il ne porte aucun texte.
              */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--deep)_86%,transparent))]"
              />
              {/*
                Le titre repose sur un bandeau d'opacité FIXE, et non sur un
                point du dégradé : la densité du voile y dépendrait de la
                hauteur de la tuile. Mesuré, le titre tombait à 1.64:1 sur une
                zone claire de photo. À 86 %, il tient 8.0:1 au pire cas.
              */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-[color-mix(in_oklab,var(--deep)_86%,transparent)] p-5 text-left">
                <span className="block font-display text-lg leading-snug text-shell">
                  {t.gallery.titles[p.id]}
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-foam opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 className="h-3 w-3" aria-hidden="true" />
                  {t.gallery.zoom}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {photo && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-[color-mix(in_oklab,var(--deep)_92%,transparent)] p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={t.gallery.photoOf((open ?? 0) + 1, total)}
          >
            {/* Le clic sur la photo ne doit pas remonter au fond, qui ferme. */}
            <motion.img
              key={photo.id}
              layoutId={`photo-${open}`}
              src={photo.src}
              alt={t.gallery.photos[photo.id]}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[76dvh] w-auto max-w-full rounded-3xl border border-border object-contain"
            />

            <button
              ref={closeRef}
              onClick={() => setOpen(null)}
              aria-label={t.gallery.close}
              className="glass absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {total > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label={t.gallery.previous}
                  className="glass absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full sm:left-5"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label={t.gallery.next}
                  className="glass absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full sm:right-5"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>

                <p
                  aria-live="polite"
                  className="glass absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-xs tracking-widest"
                >
                  {(open ?? 0) + 1} / {total}
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
