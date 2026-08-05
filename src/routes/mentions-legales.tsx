import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

import { LEGAL, SITE, type LegalField } from "@/lib/site";
import { dictFor, useI18n } from "@/lib/i18n";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

export const Route = createFileRoute("/mentions-legales")({
  head: ({ match }) => {
    const t = dictFor((match.search as { lang?: Locale }).lang ?? DEFAULT_LOCALE);
    return {
      meta: [
        { title: t.meta.legalTitle },
        { name: "description", content: t.meta.legalDescription },
        { property: "og:title", content: t.meta.legalTitle },
        { property: "og:description", content: t.meta.legalOgDescription },
        // Page de service : utile aux visiteurs, sans intérêt dans l'index.
        { name: "robots", content: "noindex, follow" },
      ],
    };
  },
  component: LegalPage,
});

/**
 * Ligne d'information légale. Une valeur absente est affichée en clair plutôt
 * que masquée : la loi impose de publier ces mentions, et un trou discret
 * finirait par être oublié. Mieux vaut qu'il se voie.
 */
function Row({ label, value, missing }: { label: string; value: LegalField; missing: string }) {
  return (
    <div className="grid gap-1 py-2 sm:grid-cols-[13rem_1fr] sm:gap-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm">
        {value ?? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive-text">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            {missing}
          </span>
        )}
      </dd>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl">{heading}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function LegalPage() {
  const { t } = useI18n();
  const L = t.legal;
  const missing = L.toComplete;

  return (
    <div className="mx-auto max-w-3xl px-5 pt-28 lg:pt-16">
      <h1 className="font-display text-4xl">{L.title}</h1>

      <Section heading={L.publisher.heading}>
        <dl className="divide-y divide-border">
          <Row label={L.publisher.companyLabel} value={LEGAL.companyName} missing={missing} />
          <Row label={L.publisher.tradeNameLabel} value={LEGAL.tradeName} missing={missing} />
          <Row label={L.publisher.formLabel} value={L.publisher.form} missing={missing} />
          <Row label={L.publisher.capitalLabel} value={LEGAL.capital} missing={missing} />
          <Row label={L.publisher.sirenLabel} value={LEGAL.siren} missing={missing} />
          <Row label={L.publisher.rcsLabel} value={LEGAL.rcs} missing={missing} />
          <Row label={L.publisher.vatLabel} value={LEGAL.vat} missing={missing} />
          <Row label={L.publisher.addressLabel} value={LEGAL.address} missing={missing} />
          <Row label={L.publisher.phoneLabel} value={SITE.phoneDisplay} missing={missing} />
          <Row label={L.publisher.emailLabel} value={LEGAL.email} missing={missing} />
          <Row
            label={L.publisher.directorLabel}
            value={LEGAL.publicationDirector}
            missing={missing}
          />
        </dl>
      </Section>

      <Section heading={L.host.heading}>
        <p>{L.host.intro}</p>
        <p className="text-foreground">
          {LEGAL.host.name}
          <br />
          {LEGAL.host.address}
          <br />
          <a
            href={LEGAL.host.url}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            {LEGAL.host.url.replace("https://", "")}
          </a>
        </p>
        <p className="text-xs">{L.host.note}</p>
      </Section>

      <Section heading={L.data.heading}>
        <h3 className="font-display text-lg text-foreground">{L.data.controllerTitle}</h3>
        <p>{L.data.controllerText}</p>

        <h3 className="font-display text-lg text-foreground">{L.data.purposeTitle}</h3>
        <p>{L.data.purposeText}</p>

        <h3 className="font-display text-lg text-foreground">{L.data.basisTitle}</h3>
        <p>{L.data.basisText}</p>

        <h3 className="font-display text-lg text-foreground">{L.data.retentionTitle}</h3>
        <p>{L.data.retentionText}</p>

        <h3 className="font-display text-lg text-foreground">{L.data.recipientsTitle}</h3>
        <p>{L.data.recipientsText}</p>
        <ul className="list-disc space-y-1 pl-5">
          {LEGAL.processors.map((p) => (
            <li key={p.name}>
              <span className="text-foreground">{p.name}</span> — {p.role} (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                {new URL(p.url).hostname}
              </a>
              )
            </li>
          ))}
        </ul>

        <h3 className="font-display text-lg text-foreground">{L.data.thirdPartiesTitle}</h3>
        <p>{L.data.thirdPartiesText}</p>
        <ul className="list-disc space-y-1 pl-5">
          {LEGAL.thirdParties.map((p) => (
            <li key={p.name}>
              <span className="text-foreground">{p.name}</span> — {p.role} (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                {new URL(p.url).hostname}
              </a>
              )
            </li>
          ))}
        </ul>
      </Section>

      <Section heading={L.rights.heading}>
        <p>{L.rights.text}</p>
        <p>{L.rights.cnil}</p>
      </Section>

      <Section heading={L.cookies.heading}>
        <p>{L.cookies.text}</p>
      </Section>

      <Section heading={L.ip.heading}>
        <p>{L.ip.text}</p>
        <p>{L.ip.mapCredit}</p>
      </Section>

      <p className="mt-10 text-xs text-muted-foreground">
        {L.updated} : {LEGAL.updatedAt}
      </p>
    </div>
  );
}
