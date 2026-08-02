import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { CATEGORIES, MENU, SITE, type MenuCategory } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/carte")({
  head: () => ({
    meta: [
      { title: "La Carte — L'Albatros, Bonifacio" },
      {
        name: "description",
        content:
          "La carte de L'Albatros à Bonifacio : soupe de poissons de roche, bouillabaisse maison, thon snacké, langouste, moelleux à la châtaigne.",
      },
      { property: "og:title", content: "La Carte — L'Albatros, Bonifacio" },
      {
        property: "og:description",
        content: "Entrées, poissons de la pêche du jour, viandes et desserts corses.",
      },
    ],
  }),
  component: CartePage,
});

/** Identifiant d'ancrage sans accent, pour relier chaque section à son titre. */
const slug = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function CartePage() {
  const [filter, setFilter] = useState<MenuCategory | "Tout">("Tout");
  const reduced = useReducedMotion();

  // Une carte de restaurant se lit par service. Sans ce regroupement, la vue
  // « Tout » — celle par défaut — déroulait dix plats à plat, sans qu'on voie
  // où finissaient les entrées.
  const groups = (filter === "Tout" ? CATEGORIES : [filter])
    .map((category) => ({ category, items: MENU.filter((m) => m.category === category) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-4xl px-5 pt-28 lg:pt-16">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.36em] text-accent">Cuisine du marché</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">La Carte</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          La carte évolue au rythme de la pêche et du marché. Certaines pièces — langouste,
          bouillabaisse — se commandent à l'avance au{" "}
          <a href={SITE.phoneHref} className="text-accent underline-offset-4 hover:underline">
            {SITE.phoneDisplay}
          </a>
          .
        </p>
      </Reveal>

      <div role="group" aria-label="Filtrer par catégorie" className="mt-9 flex flex-wrap gap-2">
        {(["Tout", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`relative inline-flex min-h-11 items-center rounded-full px-5 text-sm transition-colors ${
              filter === c
                ? "bg-primary text-primary-foreground"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-12">
        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map(({ category, items }) => (
            <motion.section
              key={category}
              layout={!reduced}
              aria-labelledby={`categorie-${slug(category)}`}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2
                id={`categorie-${slug(category)}`}
                className="font-display text-2xl text-gold-gradient sm:text-3xl"
              >
                {category}
              </h2>
              <div className="hairline-gold mt-3 h-px" />

              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li
                    key={item.name}
                    className="panel-readable rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                      <div className="min-w-0">
                        {/*
                          Le badge reste hors du <h3> : concaténé dans le titre, il
                          collait au nom du plat dans le nom accessible
                          (« Soupe de poissons de rochesignature »).
                        */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="font-display text-xl leading-snug">{item.name}</h3>
                          {item.signature && (
                            <span className="rounded-full border border-[color-mix(in_oklab,var(--gold)_45%,transparent)] px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-accent">
                              Signature
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <p className="shrink-0 whitespace-nowrap text-sm text-accent">{item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
        Allergènes : la liste complète des allergènes présents dans nos préparations est disponible
        en salle sur simple demande auprès de Julien et de son équipe.
      </p>
    </div>
  );
}
