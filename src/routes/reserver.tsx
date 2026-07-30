import { createFileRoute } from "@tanstack/react-router";
import { cloneElement, useState } from "react";
import { AlertCircle, Check, Loader2, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { reservationSchema, sendReservation } from "@/lib/reservation";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/reserver")({
  head: () => ({
    meta: [
      { title: "Réserver une table — L'Albatros, Bonifacio" },
      {
        name: "description",
        content:
          "Réservez votre table à L'Albatros, 47 Quai Comparetti à Bonifacio. Service continu de 11h à 23h, 7j/7. Bouillabaisse sur commande.",
      },
      { property: "og:title", content: "Réserver une table — L'Albatros, Bonifacio" },
      {
        property: "og:description",
        content: "Une table face aux voiliers du port de Bonifacio, midi et soir.",
      },
    ],
  }),
  component: ReserverPage,
});

const fieldClass =
  "mt-2 w-full rounded-xl border border-input bg-[color-mix(in_oklab,var(--abyss)_75%,black)] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none";

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
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const sent = status === "sent";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const parsed = reservationSchema.safeParse(raw);
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
      setFormError(
        "Votre demande n'a pas pu être transmise. Merci de nous appeler directement, nous vous répondons de 11h à 23h.",
      );
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pt-28 lg:pt-16">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.36em] text-accent">Réservation</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">Réserver une table</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Service continu de 11h à 23h, 7j/7. Pour la bouillabaisse maison (2 personnes) et la
          langouste, merci de commander à l'avance.
        </p>
      </Reveal>

      {sent ? (
        <div className="panel-readable mt-10 rounded-3xl p-8 text-center" role="status">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 font-display text-2xl">Demande enregistrée</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Nous vous confirmons votre table par téléphone. Pour une réservation immédiate,
            appelez-nous au {SITE.phoneDisplay}.
          </p>
          <a
            href={SITE.phoneHref}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Appeler le restaurant
          </a>
        </div>
      ) : (
        <form
          className="panel-readable mt-10 rounded-3xl p-6 sm:p-8"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="nom" label="Nom" error={fieldErrors.nom}>
              <input id="nom" name="nom" autoComplete="name" placeholder="Votre nom" />
            </Field>
            <Field id="tel" label="Téléphone" error={fieldErrors.tel}>
              <input
                id="tel"
                name="tel"
                type="tel"
                autoComplete="tel"
                placeholder="06 12 34 56 78"
              />
            </Field>
            <Field id="date" label="Date" error={fieldErrors.date}>
              <input id="date" name="date" type="date" min={todayValue()} />
            </Field>
            <Field id="heure" label="Heure" error={fieldErrors.heure}>
              <input
                id="heure"
                name="heure"
                type="time"
                min="11:00"
                max="22:59"
                defaultValue="20:00"
              />
            </Field>
            <Field id="couverts" label="Nombre de couverts" error={fieldErrors.couverts}>
              <input
                id="couverts"
                name="couverts"
                type="number"
                min={1}
                max={20}
                defaultValue={2}
              />
            </Field>
            <Field id="email" label="E-mail (facultatif)" error={fieldErrors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="vous@email.com"
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field id="message" label="Demande particulière" error={fieldErrors.message}>
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Bouillabaisse sur commande, allergies, table en terrasse…"
              />
            </Field>
          </div>

          {/* Piège à robots : hors flux et hors tabulation, invisible pour un humain. */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="societe">Société</label>
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
            {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
          </button>
          <p className="mt-4 text-xs text-muted-foreground">
            Vos données servent uniquement au traitement de la réservation et ne sont jamais cédées
            à des tiers.
          </p>
        </form>
      )}
    </div>
  );
}
