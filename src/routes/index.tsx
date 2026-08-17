import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";

import heroImg from "@/assets/hero-marina.jpg";
import terrasseImg from "@/assets/terrasse.jpg";
import dishImg from "@/assets/dish-poisson.jpg";
import langousteImg from "@/assets/langouste.jpg";
import { Reveal, SplitText } from "@/components/Reveal";
import { SITE, TEAM } from "@/lib/site";
import { dictFor, useI18n } from "@/lib/i18n";
import { HERO_DISH, SIGNATURE_DISHES, pick } from "@/lib/menu";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

export const Route = createFileRoute("/")({
  head: ({ match }) => {
    const t = dictFor((match.search as { lang?: Locale }).lang ?? DEFAULT_LOCALE);
    return {
      meta: [
        { title: t.meta.homeTitle },
        { name: "description", content: t.meta.homeDescription },
        { property: "og:title", content: t.meta.homeTitle },
        { property: "og:description", content: t.meta.homeOgDescription },
      ],
    };
  },
  component: Index,
});

function Index() {
  const { t, locale } = useI18n();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[92dvh] overflow-hidden">
        <motion.img
          src={heroImg}
          alt={t.home.heroAlt}
          width={1920}
          height={1280}
          style={{ y }}
          className="absolute inset-0 h-[115%] w-full object-cover"
        />
        {/*
          Eau profonde en haut, lumière du lagon en bas : le voile porte le texte
          clair du hero puis se dissout dans le fond nacré de la page. Un voile
          clair a été écarté — sur cette photo de nuit, il faudrait 0.94 d'opacité
          pour tenir le contraste, ce qui effacerait l'image.
        */}
        <div className="absolute inset-0 bg-[image:var(--gradient-dive)]" />

        {/*
          Les paddings réservent la place des barres fixes mobiles : sans eux le
          contenu du hero passe dessous et devient illisible sur les petits
          écrans. Sur desktop c'est <main> qui gère l'espace de la nav haute.
        */}
        <motion.div
          style={{ opacity: fade }}
          className="relative mx-auto flex min-h-[92dvh] max-w-5xl flex-col items-center justify-center px-5 pb-[var(--dock-space)] pt-[var(--topbar-space)] text-center lg:pb-28 lg:pt-0"
        >
          {/*
            Le hero est la seule surface sombre du site : ses textes portent donc
            des couleurs claires explicites, au lieu des tokens `accent` et
            `muted-foreground` qui sont sombres depuis le passage en palette claire.
          */}
          <p className="text-[10px] uppercase tracking-[0.36em] text-foam sm:text-[11px] sm:tracking-[0.42em]">
            {t.home.eyebrow}
          </p>
          {/*
            Taille fluide bornée par la largeur ET la hauteur : un palier basé
            sur la seule largeur donnait un titre de 60px sur un téléphone en
            paysage (740x360), qui poussait les CTA sous le dock.
          */}
          <h1 className="mt-3 font-display text-[clamp(1.7rem,min(9vw,9vh),4.5rem)] leading-[1.08] text-shell sm:mt-5">
            {/* `key` force le re-jeu de l'animation au changement de langue. */}
            <SplitText key={t.home.title} text={t.home.title} />
          </h1>
          <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-foam [@media(max-height:480px)]:hidden sm:mt-6 sm:text-base">
            {t.home.intro}
          </p>
          {/*
            Le turquoise du logo n'est qu'à 2.69:1 contre le voile du hero : seul,
            le contour du bouton serait imperceptible. Le liseré d'écume (6.24:1)
            définit sa limite, et l'encre dessus tient 5.67:1.
          */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-9">
            <Link
              to="/reserver"
              data-magnetic
              className="group inline-flex items-center gap-2 rounded-full border-2 border-foam bg-lagoon px-7 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.04]"
            >
              {t.home.ctaBook}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/carte"
              data-magnetic
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
            >
              {t.home.ctaMenu}
            </Link>
          </div>

          {/*
            Sur mobile on ne garde que les horaires : le téléphone est déjà un
            bouton d'appel dans la barre de marque, et le lieu est annoncé juste
            au-dessus. Empilées, ces trois lignes coûtaient 118px de hauteur pour
            de l'information redondante.
          */}
          <div className="glass mt-6 grid w-full max-w-2xl grid-cols-1 gap-3 rounded-2xl px-5 py-3 text-sm max-lg:[@media(max-height:620px)]:hidden sm:mt-12 sm:grid-cols-3 sm:py-4">
            <p className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {t.home.hours}
            </p>
            <a href={SITE.phoneHref} className="hidden items-center justify-center gap-2 sm:flex">
              <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
            <p className="hidden items-center justify-center gap-2 sm:flex">
              <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {t.home.port}
            </p>
          </div>
        </motion.div>
      </section>

      {/* HISTOIRE */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.36em] text-accent">
              {t.home.storyEyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              {t.home.storyTitle}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>{t.home.storyP1}</p>
              <p>{t.home.storyP2}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="overflow-hidden rounded-3xl border border-border">
              <img
                src={terrasseImg}
                alt={t.home.terraceAlt}
                width={1280}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
              />
            </div>
            <div className="glass absolute -bottom-6 -left-2 hidden max-w-[220px] rounded-2xl p-4 sm:block">
              <p className="font-display text-lg">{t.home.terraceBadge}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.home.terraceBadgeText}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SIGNATURES */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.36em] text-accent">
            {t.home.signaturesEyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">{t.home.signaturesTitle}</h2>
        </Reveal>

        {/*
          Le plat emblématique occupe toute la largeur : c'est celui que la
          carte papier titre « L'incontournable de L'Albatros », et il porte le
          prix le plus engageant de la maison. Le noyer parmi cinq cartes
          identiques lui ferait perdre ce statut.
        */}
        <Reveal delay={0.06}>
          <article className="glass relative mt-10 overflow-hidden rounded-3xl p-7 sm:p-10">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--lagoon)_30%,transparent),transparent_70%)] blur-2xl"
            />
            <p className="relative text-[10px] uppercase tracking-[0.32em] text-accent">
              {t.home.mustTry}
            </p>
            <h3 className="relative mt-4 font-display text-3xl leading-tight sm:text-4xl">
              {pick(HERO_DISH.name, locale)}
            </h3>
            {HERO_DISH.detail && (
              <p className="relative mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {HERO_DISH.detail}
              </p>
            )}
            <p className="relative mt-6 flex items-baseline gap-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {t.home.servedFrom}
              </span>
              <span className="font-display text-3xl text-accent">{HERO_DISH.price}</span>
              <span className="text-xs text-muted-foreground">{t.menu.perPerson}</span>
            </p>
          </article>
        </Reveal>

        {/* Les autres signatures, dans la typographie de la carte. */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNATURE_DISHES.map((dish, i) => (
            <Reveal key={`${dish.name.fr}-${i}`} delay={0.08 + i * 0.05}>
              <article className="glass group flex h-full flex-col rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1.5">
                <h3 className="font-display text-xl leading-snug">{pick(dish.name, locale)}</h3>
                {dish.detail && (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {dish.detail}
                  </p>
                )}
                <div className="mt-auto flex items-baseline gap-2 pt-5">
                  <span
                    aria-hidden="true"
                    className="h-px min-w-4 flex-1 translate-y-[-0.15em] bg-[radial-gradient(circle,color-mix(in_oklab,var(--teal)_45%,transparent)_1px,transparent_1.2px)] bg-[length:6px_2px] bg-repeat-x opacity-50 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="shrink-0 whitespace-nowrap">
                    <span className="font-display text-lg text-accent">
                      {dish.price ?? t.menu.onArrival}
                    </span>
                    {dish.unit === "per100g" && (
                      <span className="ml-1 text-[11px] text-muted-foreground">
                        {t.menu.per100g}
                      </span>
                    )}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <Link
            to="/carte"
            data-magnetic
            className="inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:underline"
          >
            {t.home.seeFullMenu} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      {/*
        Aperçu de la galerie. Ces deux assiettes y figurent aussi : la
        répétition est assumée le temps d'avoir plus de visuels, et le titre
        plus le lien la présentent comme un extrait — l'ancienne bande n'avait
        ni l'un ni l'autre et passait pour du remplissage.
      */}
      <section className="mx-auto max-w-6xl px-5 py-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.36em] text-accent">
            {t.home.imagesEyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">{t.home.imagesTitle}</h2>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {[
            { src: dishImg, alt: t.gallery.photos.rouget, w: 1024, h: 1280 },
            { src: langousteImg, alt: t.gallery.photos.langoustes, w: 1024, h: 1024 },
          ].map((img) => (
            <Reveal key={img.src}>
              <div className="overflow-hidden rounded-3xl border border-border">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8">
          <Link
            to="/galerie"
            data-magnetic
            className="inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:underline"
          >
            {t.home.seeFullGallery} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      {/* EQUIPE */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.36em] text-accent">
            {t.home.teamEyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">{t.home.teamTitle}</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TEAM.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <article className="glass h-full rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
                  {t.team[p.id].role}
                </p>
                <h3 className="mt-3 font-display text-2xl">{t.team[p.id].title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t.team[p.id].text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 pb-8">
        <Reveal>
          <div className="panel-readable relative overflow-hidden rounded-3xl px-6 py-14 text-center">
            <h2 className="font-display text-3xl sm:text-4xl">{t.home.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">{t.home.ctaText}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/reserver"
                data-magnetic
                className="rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.04]"
              >
                {t.home.ctaBookOnline}
              </Link>
              <a
                href={SITE.phoneHref}
                data-magnetic
                className="glass rounded-full px-7 py-3.5 text-sm font-medium"
              >
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
