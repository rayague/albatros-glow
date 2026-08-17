import { createFileRoute } from "@tanstack/react-router";
import { Clock, CreditCard, Instagram, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { GEO, PAYMENTS, SITE } from "@/lib/site";
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

/**
 * Une information pratique : intitulé discret, valeur en évidence, note en
 * dessous. Le pictogramme est purement décoratif — il double une information
 * déjà écrite, il est donc masqué aux lecteurs d'écran.
 */
function InfoBlock({
  icon,
  label,
  children,
  note,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  note?: string;
}) {
  return (
    <div className="flex gap-4 py-5">
      <span
        aria-hidden="true"
        className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[color-mix(in_oklab,var(--teal)_28%,transparent)] bg-[color-mix(in_oklab,var(--lagoon)_14%,transparent)] text-teal"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</p>
        <div className="mt-1.5 font-display text-lg leading-snug">{children}</div>
        {note && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{note}</p>}
      </div>
    </div>
  );
}

function ContactPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 lg:pt-16">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.36em] text-accent">{t.contact.eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">{t.contact.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t.contact.intro}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        {/* ── Informations pratiques ── */}
        <Reveal>
          <div className="glass relative h-full overflow-hidden rounded-3xl p-6 sm:p-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--lagoon)_26%,transparent),transparent_70%)] blur-2xl"
            />
            <h2 className="relative font-display text-2xl">{t.contact.practical}</h2>

            <div className="relative mt-2 divide-y divide-border">
              <InfoBlock icon={<MapPin className="h-5 w-5" />} label={t.contact.addressLabel}>
                {SITE.address}
              </InfoBlock>

              <InfoBlock
                icon={<Clock className="h-5 w-5" />}
                label={t.contact.hoursLabel}
                note={`${t.contact.hoursNote} · ${t.site.season}`}
              >
                {t.contact.hoursValue}
              </InfoBlock>

              <InfoBlock
                icon={<Phone className="h-5 w-5" />}
                label={t.contact.phoneLabel}
                note={t.contact.phoneNote}
              >
                {/*
                  Le numéro est la première action de cette page sur mobile.
                  La marge négative compense le remplissage : la cible atteint
                  44px sans que le bloc bouge.
                */}
                <a
                  href={SITE.phoneHref}
                  className="-my-2 inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                >
                  {SITE.phoneDisplay}
                </a>
              </InfoBlock>

              <InfoBlock icon={<CreditCard className="h-5 w-5" />} label={t.contact.paymentLabel}>
                <span className="flex flex-wrap gap-2">
                  {PAYMENTS.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-[color-mix(in_oklab,var(--teal)_28%,transparent)] px-3 py-1 text-xs tracking-wide text-foreground"
                    >
                      {t.contact.payments[p]}
                    </span>
                  ))}
                </span>
              </InfoBlock>
            </div>

            <div className="relative mt-6 flex flex-wrap items-center gap-3">
              <a
                href={SITE.phoneHref}
                data-magnetic
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t.contact.call}
              </a>
              <a
                href={SITE.maps}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--teal)_32%,transparent)] px-6 text-sm font-medium text-accent transition-colors hover:bg-[color-mix(in_oklab,var(--lagoon)_12%,transparent)]"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {t.contact.directions}
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={t.footer.instagramAria}
                className="grid h-11 w-11 place-items-center rounded-full border border-[color-mix(in_oklab,var(--teal)_28%,transparent)] text-teal transition-colors hover:bg-[color-mix(in_oklab,var(--lagoon)_12%,transparent)]"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* ── Plan ── */}
        <Reveal delay={0.1}>
          <section aria-labelledby="titre-plan" className="h-full">
            <h2 id="titre-plan" className="sr-only">
              {t.contact.mapHeading}
            </h2>
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-border">
              <iframe
                title={t.contact.mapTitle}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=9.152%2C41.385%2C9.164%2C41.392&layer=mapnik&marker=${GEO.lat}%2C${GEO.lon}`}
                className="h-full w-full"
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
