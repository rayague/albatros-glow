/**
 * Dictionnaire français — source de vérité.
 *
 * Le type `Dict` est déduit de ce fichier : toute clé ajoutée ici devient
 * obligatoire dans `en.ts` et `it.ts`, et son absence casse la compilation.
 * C'est ce qui garantit qu'aucune page ne peut se retrouver à moitié traduite.
 */
export const fr = {
  nav: {
    brand: "L'ALBATROS",
    city: "Bonifacio",
    home: "Accueil",
    menu: "Carte",
    book: "Réserver",
    gallery: "Galerie",
    contact: "Contact",
    mainNavAria: "Navigation principale",
    languageAria: "Langue du site",
    callAria: (phone: string) => `Appeler le restaurant au ${phone}`,
    skipToContent: "Aller au contenu",
    homeAria: "L'Albatros — accueil",
    logoAlt: "Logo du restaurant L'Albatros, Bonifacio",
  },

  meta: {
    homeTitle: "L'Albatros — Restaurant de poissons, port de Bonifacio",
    homeDescription:
      "Brasserie chic face aux voiliers du port de Bonifacio : pêche du jour, bouillabaisse maison, moelleux à la châtaigne. Ouvert 7j/7 de 11h à 23h.",
    homeOgDescription:
      "Terrasse abritée face à la marina, cuisine de saison, produits frais et circuits courts.",
    rootTitle: "L'Albatros — Restaurant sur le port de Bonifacio",
    rootDescription:
      "Brasserie chic face aux voiliers, 47 Quai Comparetti à Bonifacio. Pêche du jour, bouillabaisse maison, terrasse abritée, 7j/7 de 11h à 23h.",
    menuTitle: "La Carte — L'Albatros, Bonifacio",
    menuDescription:
      "La carte de L'Albatros à Bonifacio : soupe de poissons de roche, bouillabaisse maison, thon snacké, langouste, moelleux à la châtaigne.",
    menuOgDescription: "Entrées, poissons de la pêche du jour, viandes et desserts corses.",
    galleryTitle: "Galerie — L'Albatros, Bonifacio",
    galleryDescription:
      "Photos de L'Albatros à Bonifacio : terrasse face à la marina, plats de la pêche du jour, ambiance du port au crépuscule.",
    galleryOgDescription:
      "La terrasse, le port, les assiettes : l'atmosphère de L'Albatros en images.",
    contactTitle: "Accès & Contact — L'Albatros, Bonifacio",
    contactDescription:
      "L'Albatros, 47 Quai Comparetti, 20169 Bonifacio. Téléphone +33 4 95 77 17 68, ouvert 7j/7 de 11h à 23h sur le port de plaisance.",
    contactOgDescription:
      "Nous trouver sur le quai Comparetti, à Bonifacio, et réserver par téléphone.",
    bookingTitle: "Réserver une table — L'Albatros, Bonifacio",
    bookingDescription:
      "Réservez votre table à L'Albatros, 47 Quai Comparetti à Bonifacio. Service continu de 11h à 23h, 7j/7. Bouillabaisse sur commande.",
    bookingOgDescription: "Une table face aux voiliers du port de Bonifacio, midi et soir.",
    legalTitle: "Mentions légales & RGPD — L'Albatros, Bonifacio",
    legalDescription:
      "Mentions légales du restaurant L'Albatros à Bonifacio, éditeur AUX PETITS GOURMETS (SASU), hébergement et politique de protection des données.",
    legalOgDescription: "Éditeur, hébergement, données personnelles et cookies.",
  },

  home: {
    eyebrow: "47 Quai Comparetti · Bonifacio",
    title: "La Méditerranée, servie face aux voiliers",
    intro:
      "Brasserie chic sur le port de plaisance. Pêche locale du jour, produits frais et circuits courts, préparés chaque jour par notre brigade.",
    ctaBook: "Réserver une table",
    ctaMenu: "Découvrir la carte",
    hours: "11h – 23h, 7j/7",
    port: "Port de Bonifacio",
    storyEyebrow: "Notre philosophie",
    storyTitle: "Depuis 2021, une table où le port entre dans l'assiette",
    storyP1:
      "Sur le quai Comparetti, la terrasse abritée de L'Albatros regarde les voiliers rentrer. En 2026, une nouvelle direction reprend la maison sans en changer l'âme : le produit d'abord, la mer ensuite, la générosité toujours.",
    storyP2:
      "Le décor joue le bleu et l'or — la mer et le coucher de soleil sur la marina. En cuisine, la brigade travaille les terroirs corses et méditerranéens en circuits courts ; en salle, l'équipe orchestre un service précis et chaleureux.",
    terraceBadge: "Terrasse abritée",
    terraceBadgeText: "Face aux voiliers, service continu de 11h à 23h.",
    terraceAlt: "Tables dressées sur la terrasse de L'Albatros au crépuscule, vue sur la marina",
    heroAlt: "Terrasse de L'Albatros la nuit face aux voiliers du port de Bonifacio",
    signaturesEyebrow: "Les signatures",
    signaturesTitle: "Ce qu'il ne faut pas manquer",
    mustTry: "L'incontournable de L'Albatros",
    servedFrom: "Servi à partir de",
    seeFullMenu: "Voir toute la carte",
    imagesEyebrow: "En images",
    imagesTitle: "La maison en images",
    seeFullGallery: "Voir toute la galerie",
    teamEyebrow: "La maison",
    teamTitle: "L'équipe",
    ctaTitle: "Une table face au port ?",
    ctaText:
      "Réservez en ligne en une minute, ou appelez-nous directement — nous répondons de 11h à 23h.",
    ctaBookOnline: "Réserver en ligne",
  },

  menu: {
    eyebrow: "Cuisine du marché",
    title: "La Carte",
    introBefore:
      "La carte évolue au rythme de la pêche et du marché. Certaines pièces — langouste, bouillabaisse — se commandent à l'avance au ",
    introAfter: ".",
    allergens:
      "Allergènes : la liste complète des allergènes présents dans nos préparations est disponible en salle sur simple demande auprès de notre équipe.",
    carteAria: "Choisir une carte",
    perPerson: "par personne",
    per100g: "les 100 g",
    onArrival: "Selon arrivage",
    chefNote:
      "Notre chef propose une carte inspirée du marché et de la saisonnalité, élaborée essentiellement à base de produits frais et locaux.",
    tableService: "Découpé et servi en salle",
  },

  team: {
    cuisine: {
      title: "Le chef de cuisine",
      role: "Aux fourneaux",
      text: "Une cuisine de brasserie chic, guidée par la pêche du matin et les terroirs corses.",
    },
    brigade: {
      title: "La brigade",
      role: "Second et commis",
      text: "Une équipe resserrée qui prépare et dresse chaque assiette sur place, du matin au dernier service.",
    },
    salle: {
      title: "L'équipe de salle",
      role: "Accueil & service",
      text: "L'art d'accueillir : un service précis, chaleureux, jamais guindé, face aux voiliers.",
    },
  },

  gallery: {
    eyebrow: "En images",
    title: "Galerie",
    enlarge: (alt: string) => `Agrandir : ${alt}`,
    photoOf: (n: number, total: number) => `Photo ${n} sur ${total}`,
    zoom: "Agrandir",
    close: "Fermer la photo",
    previous: "Photo précédente",
    next: "Photo suivante",
    photos: {
      port: "Le port de plaisance de Bonifacio la nuit vu depuis la terrasse du restaurant",
      rouget: "Filet de rouget dans son bouillon de poissons de roche safrané",
      langoustes: "Plateau doré de langoustes, gambas et moules grillées",
      terrasse: "Tables dressées en terrasse au crépuscule, yachts amarrés en arrière-plan",
    },
    intro:
      "Quatre images, prises depuis la terrasse et en cuisine. Le port change d'heure en heure ; l'assiette, elle, suit la pêche du matin.",
    titles: {
      port: "Le port, à la nuit tombée",
      rouget: "Le rouget, en bouillon safrané",
      langoustes: "Le plateau de langoustes",
      terrasse: "La terrasse, au crépuscule",
    },
  },

  contact: {
    eyebrow: "Nous trouver",
    title: "Accès & contact",
    practical: "Informations pratiques",
    mapHeading: "Plan d'accès",
    mapTitle: "Carte de localisation de L'Albatros, 47 Quai Comparetti à Bonifacio",
    call: "Appeler",
    directions: "Itinéraire",
    portName: "Quai Comparetti — port de plaisance",
    intro:
      "Sur le quai, au ras de l'eau, entre les pontons et la vieille ville. On vient à pied depuis la marina, en quelques minutes depuis le parking du port.",
    addressLabel: "Adresse",
    hoursLabel: "Horaires",
    hoursValue: "11h00 – 23h00",
    hoursNote: "Service continu, 7 jours sur 7",
    seasonLabel: "Saison",
    phoneLabel: "Téléphone",
    phoneNote: "Nous répondons pendant le service",
    paymentLabel: "Moyens de paiement",
    payments: { card: "Carte bancaire", cash: "Espèces", ancv: "Chèques-vacances ANCV" },
    followLabel: "Nous suivre",
    mapCredit: "Fond de plan © OpenStreetMap",
  },

  booking: {
    eyebrow: "Réservation",
    title: "Réserver une table",
    intro:
      "Service continu de 11h à 23h, 7j/7. Pour la bouillabaisse maison (2 personnes) et la langouste, merci de commander à l'avance.",
    name: "Nom",
    namePlaceholder: "Votre nom",
    phone: "Téléphone",
    phonePlaceholder: "06 12 34 56 78",
    date: "Date",
    time: "Heure",
    guests: "Nombre de couverts",
    email: "E-mail (facultatif)",
    emailPlaceholder: "vous@email.com",
    message: "Demande particulière",
    messagePlaceholder: "Bouillabaisse sur commande, allergies, table en terrasse…",
    company: "Société",
    submit: "Envoyer ma demande",
    sending: "Envoi en cours…",
    asideCallTitle: "Vous préférez appeler ?",
    asideCallText: "Le plus direct, surtout pour le jour même. Nous décrochons pendant le service.",
    asideKnowTitle: "À commander à l'avance",
    asideKnowText:
      "La bouillabaisse maison, présentée et découpée en salle, ainsi que la langouste. Précisez-le dans votre demande.",
    asideNextTitle: "Ensuite",
    asideNextText:
      "Votre demande nous parvient immédiatement. Nous vous rappelons pour confirmer la table et l'horaire — une réservation n'est ferme qu'après cet appel.",
    formTitle: "Votre demande",
    privacy:
      "Vos données servent uniquement au traitement de la réservation et ne sont jamais cédées à des tiers.",
    successTitle: "Demande enregistrée",
    successText: (phone: string) =>
      `Nous vous confirmons votre table par téléphone. Pour une réservation immédiate, appelez-nous au ${phone}.`,
    callRestaurant: "Appeler le restaurant",
    failure:
      "Votre demande n'a pas pu être transmise. Merci de nous appeler directement, nous vous répondons de 11h à 23h.",
    errors: {
      name: "Merci d'indiquer votre nom.",
      nameLong: "Nom trop long.",
      phone: "Numéro de téléphone invalide.",
      date: "Date invalide.",
      datePast: "Cette date est déjà passée.",
      time: "Heure invalide.",
      timeRange: (open: number, close: number) => `Nous servons de ${open}h à ${close}h.`,
      guests: "Nombre de couverts invalide.",
      guestsMin: "Au moins un couvert.",
      guestsMax: "Au-delà de 20 couverts, appelez-nous directement.",
      email: "Adresse e-mail invalide.",
      messageLong: "Message trop long.",
    },
  },

  legal: {
    title: "Mentions légales & RGPD",
    toComplete: "à compléter",
    publisher: {
      heading: "Éditeur du site",
      companyLabel: "Raison sociale",
      formLabel: "Forme juridique",
      form: "Société par actions simplifiée unipersonnelle (SASU)",
      capitalLabel: "Capital social",
      sirenLabel: "SIREN",
      rcsLabel: "RCS",
      vatLabel: "TVA intracommunautaire",
      addressLabel: "Siège / établissement",
      phoneLabel: "Téléphone",
      emailLabel: "E-mail",
      directorLabel: "Directeur de la publication",
      tradeNameLabel: "Enseigne",
    },
    host: {
      heading: "Hébergement",
      intro:
        "Le site est hébergé par la société suivante, qui assure le stockage et la diffusion des pages :",
      note: "Si le site venait à être hébergé ailleurs, cette mention doit être mise à jour : la loi impose d'identifier l'hébergeur réel.",
    },
    data: {
      heading: "Données personnelles",
      controllerTitle: "Responsable de traitement",
      controllerText: "Le responsable du traitement est l'éditeur du site, identifié ci-dessus.",
      purposeTitle: "Finalité et données collectées",
      purposeText:
        "Le formulaire de réservation collecte votre nom, votre téléphone, la date, l'heure et le nombre de couverts souhaités, ainsi que, facultativement, votre adresse e-mail et votre demande particulière. Ces informations servent exclusivement à traiter et confirmer votre réservation.",
      basisTitle: "Base légale",
      basisText:
        "Le traitement repose sur l'exécution de mesures précontractuelles prises à votre demande (article 6.1.b du RGPD).",
      retentionTitle: "Durée de conservation",
      retentionText:
        "Les demandes de réservation sont conservées douze mois à compter de la date du repas, puis supprimées. Aucune donnée n'est conservée à des fins de prospection sans votre accord.",
      recipientsTitle: "Destinataires et sous-traitants",
      recipientsText:
        "Vos données sont accessibles à la seule équipe du restaurant. Elles ne sont ni vendues ni cédées. L'acheminement des e-mails de réservation est assuré par un prestataire technique agissant comme sous-traitant :",
      thirdPartiesTitle: "Services tiers sollicités par le site",
      thirdPartiesText:
        "Consulter le site déclenche des connexions vers les services suivants, qui reçoivent de ce fait votre adresse IP :",
    },
    rights: {
      heading: "Vos droits",
      text: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité sur vos données. Pour l'exercer, contactez-nous par téléphone ou sur place, à l'adresse indiquée ci-dessus.",
      cnil: "Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou sur cnil.fr.",
    },
    cookies: {
      heading: "Cookies et traceurs",
      text: "Ce site ne dépose aucun cookie publicitaire, ni traceur de mesure d'audience, ni cookie tiers nécessitant votre consentement. Seul le stockage technique de session strictement nécessaire à l'affichage est utilisé. En revanche, les services listés ci-dessus sont appelés depuis votre navigateur et reçoivent votre adresse IP.",
    },
    ip: {
      heading: "Propriété intellectuelle",
      text: "L'ensemble des contenus de ce site — textes, photographies, identité visuelle — est protégé et ne peut être reproduit, même partiellement, sans autorisation écrite préalable de l'éditeur.",
      mapCredit:
        "Le fond de plan de la page Accès est fourni par OpenStreetMap et ses contributeurs, sous licence ODbL.",
    },
    updated: "Dernière mise à jour",
  },

  footer: {
    tagline:
      "Brasserie chic sur le port de plaisance de Bonifacio. Produits frais, pêche locale, terroirs corses et méditerranéens.",
    contact: "Contact",
    navigate: "Naviguer",
    follow: "Suivez-nous",
    menuLink: "La Carte",
    galleryLink: "Galerie",
    bookLink: "Réserver une table",
    contactLink: "Accès & contact",
    legalLink: "Mentions légales & RGPD",
    instagramAria: "Instagram de L'Albatros",
    rights: (year: number) => `© ${year} L'Albatros — Bonifacio. Tous droits réservés.`,
  },

  notFound: {
    title: "Page introuvable",
    text: "Cette page a levé l'ancre. Retour au port ?",
    home: "Retour à l'accueil",
  },

  error: {
    title: "Cette page n'a pas pu se charger",
    text: "Un incident est survenu. Vous pouvez réessayer ou revenir à l'accueil.",
    retry: "Réessayer",
    home: "Accueil",
  },

  preloader: {
    enter: "Entrer",
  },

  site: {
    hours: "Service continu 11h00 – 23h00, 7j/7",
    season: "Ouverture de saison le 1er avril",
  },
};

/*
 * Volontairement sans `as const` : le type doit décrire la *forme* du
 * dictionnaire (des `string`), pas les chaînes françaises elles-mêmes.
 * Avec `as const`, aucune traduction ne pourrait satisfaire `Dict`.
 */
export type Dict = typeof fr;
