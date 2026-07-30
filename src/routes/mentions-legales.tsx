import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales & RGPD — L'Albatros, Bonifacio" },
      {
        name: "description",
        content:
          "Mentions légales du restaurant L'Albatros à Bonifacio, éditeur AUX PETITS GOURMETS (SASU), et politique de protection des données.",
      },
      { property: "og:title", content: "Mentions légales & RGPD — L'Albatros" },
      {
        property: "og:description",
        content: "Éditeur, hébergement, données personnelles et cookies.",
      },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-28 lg:pt-16">
      <h1 className="font-display text-4xl">Mentions légales & RGPD</h1>

      <section className="mt-10">
        <h2 className="font-display text-2xl">Éditeur du site</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {SITE.legal}
          <br />
          Enseigne : {SITE.name} — {SITE.address}
          <br />
          Téléphone :{" "}
          <a href={SITE.phoneHref} className="text-accent underline-offset-4 hover:underline">
            {SITE.phoneDisplay}
          </a>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl">Données personnelles</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Les informations transmises via le formulaire de réservation (nom, téléphone, e-mail,
          date et nombre de couverts) sont utilisées uniquement pour la gestion de votre
          réservation. Elles ne sont ni revendues ni transmises à des tiers, et sont conservées le
          temps nécessaire au service.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl">Vos droits</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et
          d'opposition sur vos données. Pour l'exercer, contactez-nous par téléphone au{" "}
          {SITE.phoneDisplay} ou sur place, {SITE.address}.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl">Cookies</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Ce site ne dépose aucun cookie publicitaire ni traceur de mesure d'audience tiers. Seules
          les fonctionnalités techniques nécessaires à l'affichage des pages sont utilisées.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl">Propriété intellectuelle</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          L'ensemble des contenus (textes, photographies, identité visuelle) est la propriété de
          l'éditeur et ne peut être reproduit sans autorisation écrite préalable.
        </p>
      </section>
    </div>
  );
}
