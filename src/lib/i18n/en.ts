import type { Dict } from "./fr";

/** 11 → "11am", 23 → "11pm" : les horaires se lisent en 12 heures en anglais. */
const clock12 = (h: number) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? "am" : "pm"}`;

/** Typé `Dict` : une clé manquante ou mal nommée casse la compilation. */
export const en: Dict = {
  nav: {
    brand: "L'ALBATROS",
    city: "Bonifacio",
    home: "Home",
    menu: "Menu",
    book: "Book",
    gallery: "Gallery",
    contact: "Contact",
    mainNavAria: "Main navigation",
    languageAria: "Site language",
    callAria: (phone: string) => `Call the restaurant on ${phone}`,
    skipToContent: "Skip to content",
    homeAria: "L'Albatros — home",
  },

  meta: {
    homeTitle: "L'Albatros — Seafood restaurant on Bonifacio harbour",
    homeDescription:
      "Chic brasserie facing the yachts of Bonifacio harbour: catch of the day, house bouillabaisse, Corsican chestnut fondant. Open daily, 11am to 11pm.",
    homeOgDescription:
      "Sheltered terrace facing the marina, seasonal cooking, fresh produce and short supply chains.",
    rootTitle: "L'Albatros — Restaurant on Bonifacio harbour",
    rootDescription:
      "Chic brasserie facing the yachts, 47 Quai Comparetti in Bonifacio. Catch of the day, house bouillabaisse, sheltered terrace, daily 11am to 11pm.",
    menuTitle: "The Menu — L'Albatros, Bonifacio",
    menuDescription:
      "The menu at L'Albatros in Bonifacio: rockfish soup, house bouillabaisse, seared tuna, spiny lobster, Corsican chestnut fondant.",
    menuOgDescription: "Starters, fish from the day's catch, meat dishes and Corsican desserts.",
    galleryTitle: "Gallery — L'Albatros, Bonifacio",
    galleryDescription:
      "Photographs of L'Albatros in Bonifacio: terrace facing the marina, dishes from the day's catch, the harbour at dusk.",
    galleryOgDescription: "The terrace, the harbour, the plates: L'Albatros in pictures.",
    contactTitle: "Find us & Contact — L'Albatros, Bonifacio",
    contactDescription:
      "L'Albatros, 47 Quai Comparetti, 20169 Bonifacio. Telephone +33 4 95 77 17 68, open daily 11am to 11pm on the marina.",
    contactOgDescription: "Find us on Quai Comparetti in Bonifacio, and book by telephone.",
    bookingTitle: "Book a table — L'Albatros, Bonifacio",
    bookingDescription:
      "Book your table at L'Albatros, 47 Quai Comparetti in Bonifacio. Continuous service 11am to 11pm, daily. Bouillabaisse to order.",
    bookingOgDescription: "A table facing the yachts of Bonifacio harbour, lunch and dinner.",
    legalTitle: "Legal notice & GDPR — L'Albatros, Bonifacio",
    legalDescription:
      "Legal notice for L'Albatros restaurant in Bonifacio, published by AUX PETITS GOURMETS (SASU), hosting and data protection policy.",
    legalOgDescription: "Publisher, hosting, personal data and cookies.",
  },

  home: {
    eyebrow: "47 Quai Comparetti · Bonifacio",
    title: "The Mediterranean, served facing the yachts",
    intro:
      "A chic brasserie on the marina. Local catch of the day, fresh produce and short supply chains, prepared fresh each day by our kitchen team.",
    ctaBook: "Book a table",
    ctaMenu: "See the menu",
    hours: "11am – 11pm, daily",
    port: "Bonifacio harbour",
    storyEyebrow: "Our philosophy",
    storyTitle: "Since 2021, a table where the harbour reaches the plate",
    storyP1:
      "On Quai Comparetti, the sheltered terrace of L'Albatros watches the yachts come home. In 2026 new owners took over the house without changing its soul: produce first, the sea next, generosity always.",
    storyP2:
      "The interior plays on blue and gold — the sea and the sunset over the marina. In the kitchen, our team works Corsican and Mediterranean produce through short supply chains; in the dining room, the front-of-house runs a precise and warm service.",
    terraceBadge: "Sheltered terrace",
    terraceBadgeText: "Facing the yachts, continuous service from 11am to 11pm.",
    terraceAlt: "Tables laid on the terrace of L'Albatros at dusk, looking out over the marina",
    heroAlt: "The terrace of L'Albatros at night, facing the yachts of Bonifacio harbour",
    signaturesEyebrow: "Signature dishes",
    signaturesTitle: "What not to miss",
    seeFullMenu: "See the full menu",
    imagesEyebrow: "In pictures",
    imagesTitle: "The house in pictures",
    seeFullGallery: "See the full gallery",
    teamEyebrow: "The house",
    teamTitle: "The team",
    ctaTitle: "A table facing the harbour?",
    ctaText: "Book online in a minute, or call us directly — we answer from 11am to 11pm.",
    ctaBookOnline: "Book online",
  },

  menu: {
    eyebrow: "Market cooking",
    title: "The Menu",
    introBefore:
      "The menu follows the catch and the market. Some dishes — spiny lobster, bouillabaisse — must be ordered in advance on ",
    introAfter: ".",
    filterAria: "Filter by category",
    filterAll: "All",
    signature: "Signature",
    onRequest: "Depending on the catch",
    perTwo: "/ 2 people",
    allergens:
      "Allergens: the full list of allergens present in our dishes is available in the restaurant, simply ask a member of our team.",
    categories: {
      Entrées: "Starters",
      Poissons: "Fish",
      Viandes: "Meat",
      Desserts: "Desserts",
    },
    items: {
      soupe: {
        name: "Rockfish soup",
        description: "House rouille, golden croûtons, grated Corsican tomme.",
      },
      tartare: {
        name: "Fish tartare",
        description: "Catch of the day, Balagne olive oil, citrus, fresh herbs.",
      },
      fritto: {
        name: "Fritto misto",
        description: "Lightly fried small fish and squid, preserved lemon.",
      },
      pecheDuJour: {
        name: "Fresh fish from the day's local catch",
        description: "Whole or filleted, fire-grilled, seasonal vegetables from the market garden.",
      },
      bouillabaisse: {
        name: "House bouillabaisse",
        description: "To order, for two. Rockfish, saffron, rouille.",
      },
      thon: {
        name: "Seared tuna",
        description: "Pink centre, sesame, emulsion of maquis herbs.",
      },
      langouste: {
        name: "Spiny lobster",
        description: "Grilled or in a salad, depending on the day's catch.",
      },
      veau: {
        name: "Veal sauté with olives",
        description: "Slow-cooked Corsican veal, Mediterranean olives, creamy polenta.",
      },
      moelleux: {
        name: "Chestnut fondant",
        description: "Corsican chestnut flour, molten centre, brocciu cream.",
      },
      fiadone: {
        name: "Fiadone",
        description: "Fresh brocciu, lemon zest, Corsican eau-de-vie.",
      },
    },
  },

  team: {
    cuisine: {
      title: "The head chef",
      role: "At the stove",
      text: "Chic brasserie cooking, guided by the morning's catch and Corsican produce.",
    },
    brigade: {
      title: "The kitchen brigade",
      role: "Sous-chef and commis",
      text: "A tight-knit team preparing and plating every dish on site, from morning prep to the last service.",
    },
    salle: {
      title: "The front-of-house team",
      role: "Welcome & service",
      text: "The art of welcoming: precise, warm service, never stiff, facing the yachts.",
    },
  },

  gallery: {
    eyebrow: "In pictures",
    title: "Gallery",
    enlarge: (alt: string) => `Enlarge: ${alt}`,
    photoOf: (n: number, total: number) => `Photo ${n} of ${total}`,
    close: "Close photo",
    previous: "Previous photo",
    next: "Next photo",
    photos: {
      port: "Bonifacio marina at night, seen from the restaurant terrace",
      rouget: "Fillet of red mullet in its saffron rockfish broth",
      langoustes: "Golden platter of spiny lobster, prawns and grilled mussels",
      terrasse: "Tables laid on the terrace at dusk, yachts moored in the background",
    },
  },

  contact: {
    eyebrow: "Find us",
    title: "Getting here & contact",
    practical: "Practical information",
    mapHeading: "Location map",
    mapTitle: "Location map for L'Albatros, 47 Quai Comparetti in Bonifacio",
    call: "Call",
    directions: "Directions",
    portName: "Quai Comparetti — the marina",
  },

  booking: {
    eyebrow: "Booking",
    title: "Book a table",
    intro:
      "Continuous service 11am to 11pm, daily. For the house bouillabaisse (for two) and the spiny lobster, please order in advance.",
    name: "Name",
    namePlaceholder: "Your name",
    phone: "Telephone",
    phonePlaceholder: "+33 6 12 34 56 78",
    date: "Date",
    time: "Time",
    guests: "Number of guests",
    email: "Email (optional)",
    emailPlaceholder: "you@email.com",
    message: "Special request",
    messagePlaceholder: "Bouillabaisse to order, allergies, table on the terrace…",
    company: "Company",
    submit: "Send my request",
    sending: "Sending…",
    privacy:
      "Your details are used solely to process your booking and are never passed on to third parties.",
    successTitle: "Request received",
    successText: (phone: string) =>
      `We will confirm your table by telephone. For an immediate booking, call us on ${phone}.`,
    callRestaurant: "Call the restaurant",
    failure:
      "Your request could not be sent. Please call us directly — we answer from 11am to 11pm.",
    errors: {
      name: "Please give your name.",
      nameLong: "Name too long.",
      phone: "Invalid telephone number.",
      date: "Invalid date.",
      datePast: "That date has already passed.",
      time: "Invalid time.",
      timeRange: (open: number, close: number) =>
        `We serve from ${clock12(open)} to ${clock12(close)}.`,
      guests: "Invalid number of guests.",
      guestsMin: "At least one guest.",
      guestsMax: "For more than 20 guests, please call us directly.",
      email: "Invalid email address.",
      messageLong: "Message too long.",
    },
  },

  legal: {
    title: "Legal notice & GDPR",
    toComplete: "to be completed",
    publisher: {
      heading: "Site publisher",
      companyLabel: "Registered name",
      formLabel: "Legal form",
      form: "Simplified single-shareholder joint-stock company (SASU, France)",
      capitalLabel: "Share capital",
      sirenLabel: "SIREN",
      rcsLabel: "Trade register",
      vatLabel: "EU VAT number",
      addressLabel: "Registered office / premises",
      phoneLabel: "Telephone",
      emailLabel: "Email",
      directorLabel: "Publication director",
      tradeNameLabel: "Trading name",
    },
    host: {
      heading: "Hosting",
      intro: "The site is hosted by the following company, which stores and delivers its pages:",
      note: "Should the site be hosted elsewhere, this notice must be updated: French law requires the actual host to be identified.",
    },
    data: {
      heading: "Personal data",
      controllerTitle: "Data controller",
      controllerText: "The data controller is the site publisher identified above.",
      purposeTitle: "Purpose and data collected",
      purposeText:
        "The booking form collects your name, telephone number, the date, time and number of guests requested, and optionally your email address and any special request. This information is used solely to process and confirm your booking.",
      basisTitle: "Legal basis",
      basisText:
        "Processing is based on steps taken at your request prior to entering into a contract (GDPR article 6(1)(b)).",
      retentionTitle: "Retention period",
      retentionText:
        "Booking requests are kept for twelve months from the date of the meal, then deleted. No data is retained for marketing purposes without your consent.",
      recipientsTitle: "Recipients and processors",
      recipientsText:
        "Your data is accessible only to the restaurant team. It is neither sold nor transferred. Booking emails are delivered by a technical provider acting as a processor:",
      thirdPartiesTitle: "Third-party services used by the site",
      thirdPartiesText:
        "Browsing the site triggers connections to the following services, which therefore receive your IP address:",
    },
    rights: {
      heading: "Your rights",
      text: "Under the GDPR you have the right to access, rectify, erase, restrict, object to and port your data. To exercise these rights, contact us by telephone or in person at the address above.",
      cnil: "If, after contacting us, you believe your rights are not being respected, you may lodge a complaint with the French data protection authority (CNIL) — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, France, or at cnil.fr.",
    },
    cookies: {
      heading: "Cookies and trackers",
      text: "This site sets no advertising cookies, no analytics trackers and no third-party cookies requiring your consent. Only strictly necessary technical session storage is used. The services listed above are, however, called from your browser and receive your IP address.",
    },
    ip: {
      heading: "Intellectual property",
      text: "All content on this site — text, photographs, visual identity — is protected and may not be reproduced, even in part, without the publisher's prior written permission.",
      mapCredit:
        "The base map on the Contact page is provided by OpenStreetMap and its contributors, under the ODbL licence.",
    },
    updated: "Last updated",
  },

  footer: {
    tagline:
      "A chic brasserie on Bonifacio marina. Fresh produce, local catch, Corsican and Mediterranean terroirs.",
    contact: "Contact",
    navigate: "Navigate",
    follow: "Follow us",
    menuLink: "The Menu",
    galleryLink: "Gallery",
    bookLink: "Book a table",
    contactLink: "Getting here & contact",
    legalLink: "Legal notice & GDPR",
    instagramAria: "L'Albatros on Instagram",
    rights: (year: number) => `© ${year} L'Albatros — Bonifacio. All rights reserved.`,
  },

  notFound: {
    title: "Page not found",
    text: "This page has weighed anchor. Head back to port?",
    home: "Back to home",
  },

  error: {
    title: "This page could not be loaded",
    text: "Something went wrong. You can try again or return to the home page.",
    retry: "Try again",
    home: "Home",
  },

  preloader: {
    enter: "Enter",
  },

  site: {
    hours: "Continuous service 11am – 11pm, daily",
    season: "Season opens 1 April",
  },
};
