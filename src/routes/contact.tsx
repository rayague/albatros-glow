import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { dictFor, useI18n } from "@/lib/i18n";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

export const Route = createFileRoute("/contact")({
  head: ({ match }) => {
    const t = dictFor((match.search as { lang?: Locale }).lang ?? DEFAULT_LOCALE);
    return {
      meta: [
        { title: t.meta.contactTitle },
        { name: "description", content: t.meta.contactDescription },
        { property: "og:title", content: t.meta.contactTitle },
        { property: "og:description", content: t.meta.contactOgDescription },
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 lg:pt-16">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.36em] text-accent">{t.contact.eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">{t.contact.title}</h1>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="panel-readable rounded-3xl p-7">
            <h2 className="font-display text-2xl">{t.contact.practical}</h2>
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
                  {t.site.hours}
                  <br />
                  <span className="text-muted-foreground">{t.site.season}</span>
                </span>
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={SITE.phoneHref}
                data-magnetic
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                {t.contact.call}
              </a>
              <a
                href={SITE.maps}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                className="glass rounded-full px-6 py-3 text-sm font-medium"
              >
                {t.contact.directions}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <section aria-labelledby="titre-plan" className="h-full">
            <h2 id="titre-plan" className="sr-only">
              {t.contact.mapHeading}
            </h2>
            <div className="relative h-full overflow-hidden rounded-3xl border border-border">
              <iframe
                title={t.contact.mapTitle}
                src="https://www.openstreetmap.org/export/embed.html?bbox=9.152%2C41.385%2C9.164%2C41.392&layer=mapnik&marker=41.3885%2C9.1585"
                className="h-[380px] w-full lg:h-full"
                style={{
                  filter: "invert(0.92) hue-rotate(180deg) saturate(0.75) brightness(0.95)",
                }}
                loading="lazy"
              />
              {/*
                L'encart est ancré en haut à gauche : en bas, il recouvrait
                l'attribution OpenStreetMap sur les écrans étroits, alors que
                la licence ODbL impose de la laisser visible.
              */}
              <div className="glass pointer-events-none absolute left-4 top-4 max-w-[70%] rounded-2xl px-4 py-3">
                <p className="font-display text-lg">{SITE.name}</p>
                <p className="text-xs text-muted-foreground">{t.contact.portName}</p>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
