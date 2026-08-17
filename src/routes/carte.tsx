import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { SITE } from "@/lib/site";
import { CARTES, SIGNATURES, pick, type CarteId, type Dish, type Section } from "@/lib/menu";
import { Reveal } from "@/components/Reveal";
import { dictFor, useI18n } from "@/lib/i18n";
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

/**
 * Une ligne de carte : nom à gauche, prix à droite, reliés par une ligne de
 * points. C'est la typographie classique des cartes imprimées — l'œil suit le
 * pointillé jusqu'au prix sans se perdre, même quand les noms sont de
 * longueurs très différentes.
 *
 * Le pointillé est un fond répété plutôt qu'une suite de caractères : il ne
 * s'insère donc pas dans le texte lu par les lecteurs d'écran.
 */
function DishRow({ dish }: { dish: Dish }) {
  const { t, locale } = useI18n();
  const unit =
    dish.unit === "perPerson" ? t.menu.perPerson : dish.unit === "per100g" ? t.menu.per100g : null;

  return (
    <li className="group flex items-baseline gap-2 py-2.5">
      <span className="min-w-0">
        <span className="font-display text-[1.0625rem] leading-snug text-foreground sm:text-lg">
          {pick(dish.name, locale)}
        </span>
        {dish.detail && (
          <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
            {dish.detail}
          </span>
        )}
      </span>

      <span
        aria-hidden="true"
        className="mx-1 h-px min-w-6 flex-1 translate-y-[-0.15em] self-center bg-[radial-gradient(circle,color-mix(in_oklab,var(--teal)_45%,transparent)_1px,transparent_1.2px)] bg-[length:6px_2px] bg-repeat-x opacity-50 transition-opacity duration-300 group-hover:opacity-100"
      />

      <span className="shrink-0 whitespace-nowrap text-right">
        <span className="font-display text-[1.0625rem] text-accent sm:text-lg">
          {dish.price ?? t.menu.onArrival}
        </span>
        {unit && <span className="ml-1 text-[11px] text-muted-foreground">{unit}</span>}
      </span>
    </li>
  );
}

function SectionBlock({ section }: { section: Section }) {
  const { locale } = useI18n();
  const headingId = `section-${section.id}`;

  return (
    <section aria-labelledby={headingId} className="break-inside-avoid">
      <header className="flex items-center gap-4">
        <h3
          id={headingId}
          className="font-display text-xl leading-none text-sea-gradient sm:text-2xl"
        >
          {pick(section.title, locale)}
        </h3>
        <span aria-hidden="true" className="hairline-gold h-px flex-1" />
      </header>

      <ul className="mt-3 divide-y divide-border">
        {section.items.map((dish, i) => (
          <DishRow key={`${section.id}-${i}`} dish={dish} />
        ))}
      </ul>

      {section.note && (
        <p className="mt-3 text-xs italic leading-relaxed text-muted-foreground">
          {pick(section.note, locale)}
        </p>
      )}
    </section>
  );
}

function CartePage() {
  const { t, locale } = useI18n();
  const reduced = useReducedMotion();
  const [active, setActive] = useState<CarteId>("cuisine");

  const carte = CARTES.find((c) => c.id === active) ?? CARTES[0];

  return (
    <div className="mx-auto max-w-5xl px-5 pt-28 lg:pt-16">
      {/* ── En-tête ── */}
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.36em] text-accent">{t.menu.eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">{t.menu.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t.menu.chefNote}
        </p>
      </Reveal>

      {/* ── Les trois pièces découpées en salle ── */}
      <Reveal delay={0.06}>
        <div className="glass relative mt-10 overflow-hidden rounded-3xl p-6 sm:p-8">
          {/* Vague décorative : le seul ornement de la page, en CSS pur. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--lagoon)_28%,transparent),transparent_70%)] blur-2xl"
          />
          <h2 className="relative text-[10px] font-normal uppercase tracking-[0.32em] text-accent">
            {t.menu.tableService}
          </h2>
          <ul className="relative mt-4 divide-y divide-border">
            {SIGNATURES.map((dish, i) => (
              <DishRow key={`signature-${i}`} dish={dish} />
            ))}
          </ul>
        </div>
      </Reveal>

      {/* ── Sélecteur de carte ── */}
      <div
        role="tablist"
        aria-label={t.menu.carteAria}
        className="glass sticky top-24 z-30 mt-10 flex gap-1 overflow-x-auto rounded-full p-1 lg:top-24"
      >
        {CARTES.map((c) => {
          const current = c.id === active;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={current}
              aria-controls={`panneau-${c.id}`}
              id={`onglet-${c.id}`}
              onClick={() => setActive(c.id)}
              className={`relative min-h-11 flex-1 whitespace-nowrap rounded-full px-4 text-sm transition-colors ${
                current ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {current && (
                <motion.span
                  layoutId="carte-tab"
                  transition={
                    reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }
                  }
                  className="absolute inset-0 -z-10 rounded-full bg-[image:var(--gradient-cta)]"
                />
              )}
              <span className="relative">{pick(c.label, locale)}</span>
            </button>
          );
        })}
      </div>

      {/* ── Contenu de la carte active ── */}
      <div
        role="tabpanel"
        id={`panneau-${carte.id}`}
        aria-labelledby={`onglet-${carte.id}`}
        className="mt-10"
      >
        {/*
          Pas d'`AnimatePresence` ici, volontairement : en `mode="wait"` le
          nouveau panneau attend la fin de l'animation de sortie du précédent,
          et si celle-ci ne se termine pas, la carte reste vide. Un simple
          changement de `key` remonte le contenu immédiatement, l'animation
          n'étant plus qu'un fondu d'entrée par-dessus.
        */}
        <motion.div
          key={carte.id}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          /*
              Colonnes maçonnées : les sections ont des longueurs très
              inégales (12 pâtes, 3 desserts enfants). En colonnes, elles se
              rangent d'elles-mêmes sans laisser de grands trous, ce qu'une
              grille régulière ne sait pas faire.
            */
          className="gap-x-12 lg:columns-2 [&>section]:mb-10"
        >
          {/*
              Titre de niveau 2 pour la carte affichée. Sans lui, les titres de
              section (h3) suivraient directement le h1 : un lecteur d'écran qui
              parcourt les titres verrait un niveau sauté.
            */}
          <h2 className="sr-only">{pick(carte.label, locale)}</h2>
          {carte.sections.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </motion.div>
      </div>

      {/* ── Pied de carte ── */}
      <div className="mt-12 space-y-3 border-t border-border pt-6">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {t.menu.introBefore}
          <a href={SITE.phoneHref} className="text-accent underline-offset-4 hover:underline">
            {SITE.phoneDisplay}
          </a>
          {t.menu.introAfter}
        </p>
        <p className="text-xs leading-relaxed text-muted-foreground">{t.menu.allergens}</p>
      </div>
    </div>
  );
}
