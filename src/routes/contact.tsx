import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Accès & Contact — L'Albatros, Bonifacio" },
      {
        name: "description",
        content:
          "L'Albatros, 47 Quai Comparetti, 20169 Bonifacio. Téléphone +33 4 95 77 17 68, ouvert 7j/7 de 11h à 23h sur le port de plaisance.",
      },
      { property: "og:title", content: "Accès & Contact — L'Albatros, Bonifacio" },
      {
        property: "og:description",
        content: "Nous trouver sur le quai Comparetti, à Bonifacio, et réserver par téléphone.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-16">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.36em] text-accent">Nous trouver</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">Accès & contact</h1>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="panel-readable rounded-3xl p-7">
            <h2 className="font-display text-2xl">Informations pratiques</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <a href={SITE.phoneHref} className="underline-offset-4 hover:underline">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {SITE.hours}
                  <br />
                  <span className="text-muted-foreground">{SITE.season}</span>
                </span>
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={SITE.phoneHref}
                data-magnetic
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                Appeler
              </a>
              <a
                href={SITE.maps}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                className="glass rounded-full px-6 py-3 text-sm font-medium"
              >
                Itinéraire
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <iframe
              title="Carte de localisation de L'Albatros, 47 Quai Comparetti à Bonifacio"
              src="https://www.openstreetmap.org/export/embed.html?bbox=9.152%2C41.385%2C9.164%2C41.392&layer=mapnik&marker=41.3885%2C9.1585"
              className="h-[380px] w-full lg:h-full"
              style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.75) brightness(0.95)" }}
              loading="lazy"
            />
            <div className="glass pointer-events-none absolute bottom-4 left-4 rounded-2xl px-4 py-3">
              <p className="font-display text-lg">L'Albatros</p>
              <p className="text-xs text-muted-foreground">Quai Comparetti — port de plaisance</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
