import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { CATEGORIES, MENU, SITE, type MenuCategory } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { dictFor, menuPrice, useI18n } from "@/lib/i18n";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

export const Route = createFileRoute("/carte")({
  head: ({ match }) => {
    const t = dictFor((match.search as { lang?: Locale }).lang ?? DEFAULT_LOCALE);
    return {
      meta: [
        { title: t.meta.menuTitle },
        { name: "description", content: t.meta.menuDescription },
        { property: "og:title", content: t.meta.menuTitle },
        { property: "og:description", content: t.meta.menuOgDescription },
      ],
    };
  },
  component: CartePage,
});

/** Identifiant d'ancrage sans accent, pour relier chaque section à son titre. */
const slug = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function CartePage() {
  const { t } = useI18n();
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
        <p className="text-[11px] uppercase tracking-[0.36em] text-accent">{t.menu.eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">{t.menu.title}</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {t.menu.introBefore}
          <a href={SITE.phoneHref} className="text-accent underline-offset-4 hover:underline">
            {SITE.phoneDisplay}
          </a>
          {t.menu.introAfter}
        </p>
      </Reveal>

      <div role="group" aria-label={t.menu.filterAria} className="mt-9 flex flex-wrap gap-2">
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
            {c === "Tout" ? t.menu.filterAll : t.menu.categories[c]}
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
                className="font-display text-2xl text-sea-gradient sm:text-3xl"
              >
                {t.menu.categories[category]}
              </h2>
              <div className="hairline-gold mt-3 h-px" />

              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li
                    key={item.id}
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
                          <h3 className="font-display text-xl leading-snug">
                            {t.menu.items[item.id].name}
                          </h3>
                          {item.signature && (
                            <span className="rounded-full border border-[color-mix(in_oklab,var(--teal)_40%,transparent)] px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-accent">
                              {t.menu.signature}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {t.menu.items[item.id].description}
                        </p>
                      </div>
                      <p className="shrink-0 whitespace-nowrap text-sm text-accent">
                        {menuPrice(item, t)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">{t.menu.allergens}</p>
    </div>
  );
}
