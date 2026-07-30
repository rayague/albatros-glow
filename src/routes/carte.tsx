import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
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

function CartePage() {
  const [filter, setFilter] = useState<MenuCategory | "Tout">("Tout");
  const items = filter === "Tout" ? MENU : MENU.filter((m) => m.category === filter);

  return (
    <div className="mx-auto max-w-4xl px-5 pt-28 lg:pt-16">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.36em] text-accent">Cuisine du marché</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">La Carte</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          La carte évolue au rythme de la pêche et du marché. Certaines pièces — langouste,
          bouillabaisse — se commandent à l'avance au {SITE.phoneDisplay}.
        </p>
      </Reveal>

      <div
        role="group"
        aria-label="Filtrer par catégorie"
        className="mt-9 flex flex-wrap gap-2"
      >
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

      <ul className="mt-10 space-y-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.li
              key={item.name}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="panel-readable rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <h2 className="font-display text-xl leading-snug">
                    {item.name}
                    {item.signature && (
                      <span className="ml-2 align-middle text-[10px] uppercase tracking-[0.2em] text-accent">
                        signature
                      </span>
                    )}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <p className="shrink-0 whitespace-nowrap text-sm text-accent">{item.price}</p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
        Allergènes : la liste complète des allergènes présents dans nos préparations est disponible
        en salle sur simple demande auprès de Julien et de son équipe.
      </p>
    </div>
  );
}
