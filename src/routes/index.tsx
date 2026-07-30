import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";

import heroImg from "@/assets/hero-marina.jpg";
import terrasseImg from "@/assets/terrasse.jpg";
import dishImg from "@/assets/dish-poisson.jpg";
import langousteImg from "@/assets/langouste.jpg";
import { Reveal, SplitText } from "@/components/Reveal";
import { MENU, SITE, TEAM } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "L'Albatros — Restaurant de poissons, port de Bonifacio" },
      {
        name: "description",
        content:
          "Brasserie chic face aux voiliers du port de Bonifacio : pêche du jour, bouillabaisse maison, moelleux à la châtaigne. Ouvert 7j/7 de 11h à 23h.",
      },
      { property: "og:title", content: "L'Albatros — Restaurant de poissons, port de Bonifacio" },
      {
        property: "og:description",
        content:
          "Terrasse abritée face à la marina, cuisine du Chef Omar, produits frais et circuits courts.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const signatures = MENU.filter((m) => m.signature);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[92dvh] overflow-hidden">
        <motion.img
          src={heroImg}
          alt="Terrasse de L'Albatros la nuit face aux voiliers du port de Bonifacio"
          width={1920}
          height={1280}
          style={{ y }}
          className="absolute inset-0 h-[115%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,43,0.75),rgba(11,27,43,0.55)_40%,var(--abyss))]" />

        <motion.div
          style={{ opacity: fade }}
          className="relative mx-auto flex min-h-[92dvh] max-w-5xl flex-col items-center justify-center px-5 pb-28 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.42em] text-accent">
            47 Quai Comparetti · Bonifacio
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
            <SplitText text="La Méditerranée, servie face aux voiliers" />
          </h1>
          <p className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            Brasserie chic sur le port de plaisance. Pêche locale du jour, produits frais et
            circuits courts, sous la direction du Chef Omar.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/reserver"
              data-magnetic
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
            >
              Réserver une table
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/carte"
              data-magnetic
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Découvrir la carte
            </Link>
          </div>

          <div className="glass mt-12 grid w-full max-w-2xl grid-cols-1 gap-3 rounded-2xl px-5 py-4 text-sm sm:grid-cols-3">
            <p className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              11h – 23h, 7j/7
            </p>
            <a href={SITE.phoneHref} className="flex items-center justify-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
            <p className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              Port de Bonifacio
            </p>
          </div>
        </motion.div>
      </section>

      {/* HISTOIRE */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.36em] text-accent">Notre philosophie</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              Depuis 2021, une table où le port entre dans l'assiette
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                Sur le quai Comparetti, la terrasse abritée de L'Albatros regarde les voiliers
                rentrer. En 2026, une nouvelle direction reprend la maison sans en changer l'âme :
                le produit d'abord, la mer ensuite, la générosité toujours.
              </p>
              <p>
                Le décor imaginé par Marie-Claire Luciani joue le bleu et l'or — la mer et le
                coucher de soleil sur la marina. En cuisine, le Chef Omar travaille les terroirs
                corses et méditerranéens en circuits courts ; en salle, Julien orchestre un service
                précis et chaleureux.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="overflow-hidden rounded-3xl border border-border">
              <img
                src={terrasseImg}
                alt="Tables dressées sur la terrasse de L'Albatros au crépuscule, vue sur la marina"
                width={1280}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
              />
            </div>
            <div className="glass absolute -bottom-6 -left-2 hidden max-w-[220px] rounded-2xl p-4 sm:block">
              <p className="font-display text-lg">Terrasse abritée</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Face aux voiliers, service continu de 11h à 23h.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SIGNATURES */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.36em] text-accent">Les signatures</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">Ce qu'il ne faut pas manquer</h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {signatures.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.07}>
              <article className="glass group h-full rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1.5">
                <h3 className="font-display text-xl leading-snug">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-4 text-sm text-accent">{item.price}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <Link
            to="/carte"
            data-magnetic
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
          >
            Voir toute la carte <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* IMAGES */}
      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-8 sm:grid-cols-2">
        {[
          { src: dishImg, alt: "Poisson de roche servi en soupe safranée, assiette à filet doré", w: 1024, h: 1280 },
          { src: langousteImg, alt: "Plateau de langoustes et fruits de mer grillés", w: 1024, h: 1024 },
        ].map((img) => (
          <Reveal key={img.alt}>
            <div className="overflow-hidden rounded-3xl border border-border">
              <img
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
              />
            </div>
          </Reveal>
        ))}
      </section>

      {/* EQUIPE */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.36em] text-accent">La maison</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">L'équipe</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TEAM.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="glass h-full rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-accent">{p.role}</p>
                <h3 className="mt-3 font-display text-2xl">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 pb-8">
        <Reveal>
          <div className="panel-readable relative overflow-hidden rounded-3xl px-6 py-14 text-center">
            <h2 className="font-display text-3xl sm:text-4xl">Une table face au port ?</h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
              Réservez en ligne en une minute, ou appelez-nous directement — nous répondons de 11h à
              23h.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/reserver"
                data-magnetic
                className="rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.04]"
              >
                Réserver en ligne
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
