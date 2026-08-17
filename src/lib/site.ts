export const SITE = {
  name: "L'Albatros",
  legal: "AUX PETITS GOURMETS (SASU) — SIREN 892139759 — RCS Ajaccio",
  address: "47 Quai Comparetti, 20169 Bonifacio, Corse",
  phoneDisplay: "+33 4 95 77 17 68",
  phoneHref: "tel:+33495771768",
  hours: "Service continu 11h00 – 23h00, 7j/7",
  season: "Ouverture de saison le 1er avril",
  instagram: "https://www.instagram.com/restaurantlalbatrosbonifacio/",
  // Pas de `facebook` ici tant que l'URL exacte de la page n'est pas confirmée :
  // l'ancien site pointait vers la racine facebook.com, ce qui menait nulle part.
  maps: "https://www.google.com/maps/search/?api=1&query=47+Quai+Comparetti+20169+Bonifacio",
} as const;

/*
 * Informations des mentions légales.
 *
 * Les champs à `null` sont ceux que je ne peux pas inventer : la loi impose de
 * publier des données exactes, et une valeur fausse serait pire qu'une absence.
 * La page les affiche avec la mention « à compléter », de façon volontairement
 * visible — un manque discret finirait par être oublié.
 */
export type LegalField = string | null;

export const LEGAL = {
  companyName: "AUX PETITS GOURMETS",
  siren: "892 139 759",
  rcs: "RCS Ajaccio",
  tradeName: "L'Albatros",
  address: "47 Quai Comparetti, 20169 Bonifacio, Corse, France",

  /** À FOURNIR — figure sur les statuts et l'extrait Kbis. */
  capital: null as LegalField,
  /** À FOURNIR — en pratique le président de la SASU. */
  publicationDirector: null as LegalField,
  /** À FOURNIR — format FR + 11 caractères, si la société est assujettie. */
  vat: null as LegalField,
  /** À FOURNIR — une adresse de contact écrite est attendue en complément du téléphone. */
  email: null as LegalField,

  /**
   * Hébergeur. Correspond à la configuration de déploiement actuelle (Vercel,
   * cf. vercel.json). À corriger si le site est finalement servi ailleurs :
   * la LCEN impose d'identifier l'hébergeur réel.
   */
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    url: "https://vercel.com",
  },

  /** Sous-traitant : achemine les e-mails de réservation (cf. src/lib/reservation.ts). */
  processors: [
    {
      name: "Resend",
      role: "Acheminement des e-mails de réservation",
      url: "https://resend.com/legal/privacy-policy",
    },
  ],

  /** Tiers appelés depuis le navigateur du visiteur, donc recevant son adresse IP. */
  thirdParties: [
    {
      name: "Google Fonts (Google Ireland Ltd.)",
      role: "Chargement des polices Fraunces et Inter",
      url: "https://policies.google.com/privacy",
    },
    {
      name: "OpenStreetMap Foundation",
      role: "Fond de plan de la page Accès",
      url: "https://osmfoundation.org/wiki/Privacy_Policy",
    },
  ],

  /** Date de dernière révision du texte, affichée en bas de page. */
  updatedAt: "2026-08-06",
} as const;

/*
 * L'équipe est présentée par poste, sans nom propre : le personnel change
 * souvent, et un nom figé sur le site devient faux en quelques mois. Le
 * constat est vérifiable — les annuaires en ligne citent aujourd'hui quatre
 * chefs différents pour cet établissement.
 *
 * Intitulé, rôle et texte vivent tous dans les dictionnaires de traduction.
 */
export type TeamMemberId = "cuisine" | "brigade" | "salle";

export const TEAM: { id: TeamMemberId }[] = [{ id: "cuisine" }, { id: "brigade" }, { id: "salle" }];
