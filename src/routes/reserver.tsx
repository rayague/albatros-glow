import { createFileRoute } from "@tanstack/react-router";
import { cloneElement, useMemo, useState } from "react";
import { AlertCircle, Check, Clock, Loader2, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { buildReservationSchema, sendReservation } from "@/lib/reservation";
import { Reveal } from "@/components/Reveal";
import { dictFor, useI18n } from "@/lib/i18n";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

export const Route = createFileRoute("/reserver")({
  head: ({ match }) => {
    const t = dictFor((match.search as { lang?: Locale }).lang ?? DEFAULT_LOCALE);
    return {
      meta: [
        { title: t.meta.bookingTitle },
        { name: "description", content: t.meta.bookingDescription },
        { property: "og:title", content: t.meta.bookingTitle },
        { property: "og:description", content: t.meta.bookingOgDescription },
      ],
    };
  },
  component: ReserverPage,
});

const fieldClass =
  "mt-2 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none";

/** Date du jour à Bonifacio, pour l'attribut `min` du sélecteur de date. */
function todayValue(): string {
  return new Intl.DateTimeFormat("fr-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/**
 * Enveloppe un champ : applique le style commun à l'input fourni et relie le
 * message d'erreur au champ via `aria-describedby` / `aria-invalid`.
 */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      {cloneElement(children, {
        className: `${fieldClass} ${error ? "border-destructive" : ""}`,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      } as React.HTMLAttributes<HTMLElement>)}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-destructive-text">
          {error}
        </p>
      )}
    </div>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

function ReserverPage() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const sent = status === "sent";

  // Les messages de validation suivent la langue affichée ; les règles, elles,
  // sont les mêmes que celles appliquées par le serveur.
  const schema = useMemo(() => buildReservationSchema(t), [t]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!errs[key]) errs[key] = issue.message;
      }
      setFieldErrors(errs);
      setFormError(null);
      setStatus("idle");
      // Ramène le focus sur le premier champ fautif plutôt que de laisser
      // l'utilisateur chercher le message d'erreur.
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setStatus("sending");
    try {
      await sendReservation({ data: parsed.data });
      setStatus("sent");
    } catch (err) {
      // Aucun repli silencieux : si l'envoi échoue, le visiteur doit le savoir
      // et pouvoir appeler le restaurant.
      console.error(err);
      setFormError(t.booking.failure);
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 lg:pt-16">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.36em] text-accent">{t.booking.eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">{t.booking.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t.booking.intro}
        </p>
      </Reveal>

      {sent ? (
        <Reveal>
          <div
            className="glass relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl p-8 text-center sm:p-12"
            role="status"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--lagoon)_30%,transparent),transparent_70%)] blur-2xl"
            />
            <div className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-cta)] text-primary-foreground">
              <Check className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="relative mt-6 font-display text-3xl">{t.booking.successTitle}</h2>
            <p className="relative mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t.booking.successText(SITE.phoneDisplay)}
            </p>
            <a
              href={SITE.phoneHref}
              className="relative mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t.booking.callRestaurant}
            </a>
          </div>
        </Reveal>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <form className="glass h-full rounded-3xl p-6 sm:p-8" onSubmit={onSubmit} noValidate>
              <h2 className="mb-6 font-display text-2xl">{t.booking.formTitle}</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="nom" label={t.booking.name} error={fieldErrors.nom}>
                  <input
                    id="nom"
                    name="nom"
                    autoComplete="name"
                    placeholder={t.booking.namePlaceholder}
                  />
                </Field>
                <Field id="tel" label={t.booking.phone} error={fieldErrors.tel}>
                  <input
                    id="tel"
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t.booking.phonePlaceholder}
                  />
                </Field>
                <Field id="date" label={t.booking.date} error={fieldErrors.date}>
                  <input id="date" name="date" type="date" min={todayValue()} />
                </Field>
                <Field id="heure" label={t.booking.time} error={fieldErrors.heure}>
                  <input
                    id="heure"
                    name="heure"
                    type="time"
                    min="11:00"
                    max="22:59"
                    defaultValue="20:00"
                  />
                </Field>
                <Field id="couverts" label={t.booking.guests} error={fieldErrors.couverts}>
                  <input
                    id="couverts"
                    name="couverts"
                    type="number"
                    min={1}
                    max={20}
                    defaultValue={2}
                  />
                </Field>
                <Field id="email" label={t.booking.email} error={fieldErrors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t.booking.emailPlaceholder}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field id="message" label={t.booking.message} error={fieldErrors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder={t.booking.messagePlaceholder}
                  />
                </Field>
              </div>

              {/* Piège à robots : hors flux et hors tabulation, invisible pour un humain. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="societe">{t.booking.company}</label>
                <input id="societe" name="societe" tabIndex={-1} autoComplete="off" />
              </div>

              {formError && (
                <div
                  role="alert"
                  className="mt-6 flex gap-3 rounded-2xl border border-destructive/50 bg-destructive/15 p-4 text-sm"
                >
                  <AlertCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-destructive-text"
                    aria-hidden="true"
                  />
                  <div>
                    <p>{formError}</p>
                    <a
                      href={SITE.phoneHref}
                      className="mt-2 inline-flex items-center gap-2 font-medium text-accent hover:underline"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {SITE.phoneDisplay}
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                data-magnetic
                disabled={status === "sending"}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {status === "sending" && (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                )}
                {status === "sending" ? t.booking.sending : t.booking.submit}
              </button>
              <p className="mt-4 text-xs text-muted-foreground">{t.booking.privacy}</p>
            </form>
          </Reveal>

          {/*
          Colonne de réassurance. Un formulaire seul laisse trois questions
          sans réponse : puis-je appeler plutôt, qu'est-ce qui se commande à
          l'avance, et que se passe-t-il après l'envoi. Elle y répond, et
          rappelle qu'une demande n'est pas encore une table.
        */}
          <Reveal delay={0.1}>
            <aside className="flex h-full flex-col gap-4">
              <div className="glass relative overflow-hidden rounded-3xl p-6">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--lagoon)_26%,transparent),transparent_70%)] blur-2xl"
                />
                <h2 className="relative font-display text-xl">{t.booking.asideCallTitle}</h2>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.booking.asideCallText}
                </p>
                <a
                  href={SITE.phoneHref}
                  className="relative mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--teal)_32%,transparent)] px-5 text-sm font-medium text-accent transition-colors hover:bg-[color-mix(in_oklab,var(--lagoon)_12%,transparent)]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {SITE.phoneDisplay}
                </a>
                <p className="relative mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  {t.site.hours}
                </p>
              </div>

              <div className="glass rounded-3xl p-6">
                <h2 className="font-display text-xl">{t.booking.asideKnowTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.booking.asideKnowText}
                </p>
              </div>

              <div className="glass rounded-3xl p-6">
                <h2 className="font-display text-xl">{t.booking.asideNextTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.booking.asideNextText}
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      )}
    </div>
  );
}
