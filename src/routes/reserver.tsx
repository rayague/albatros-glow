import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
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

function ReserverPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-5 pt-16">
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
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="nom" className="text-sm">
                Nom
              </label>
              <input id="nom" name="nom" required className={fieldClass} placeholder="Votre nom" />
            </div>
            <div>
              <label htmlFor="tel" className="text-sm">
                Téléphone
              </label>
              <input
                id="tel"
                name="tel"
                type="tel"
                required
                className={fieldClass}
                placeholder="06 12 34 56 78"
              />
            </div>
            <div>
              <label htmlFor="date" className="text-sm">
                Date
              </label>
              <input id="date" name="date" type="date" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="heure" className="text-sm">
                Heure
              </label>
              <input id="heure" name="heure" type="time" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="couverts" className="text-sm">
                Nombre de couverts
              </label>
              <input
                id="couverts"
                name="couverts"
                type="number"
                min={1}
                max={20}
                defaultValue={2}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm">
                E-mail (facultatif)
              </label>
              <input id="email" name="email" type="email" className={fieldClass} placeholder="vous@email.com" />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="text-sm">
              Demande particulière
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className={fieldClass}
              placeholder="Bouillabaisse sur commande, allergies, table en terrasse…"
            />
          </div>

          <button
            type="submit"
            data-magnetic
            className="mt-7 w-full rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Envoyer ma demande
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
