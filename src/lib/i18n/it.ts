import type { Dict } from "./fr";

/** Typé `Dict` : une clé manquante ou mal nommée casse la compilation. */
export const it: Dict = {
  nav: {
    brand: "L'ALBATROS",
    city: "Bonifacio",
    home: "Home",
    menu: "Menu",
    book: "Prenota",
    gallery: "Galleria",
    contact: "Contatti",
    mainNavAria: "Navigazione principale",
    languageAria: "Lingua del sito",
    callAria: (phone: string) => `Chiama il ristorante al ${phone}`,
    skipToContent: "Vai al contenuto",
    homeAria: "L'Albatros — home",
    logoAlt: "Logo del ristorante L'Albatros, Bonifacio",
  },

  meta: {
    homeTitle: "L'Albatros — Ristorante di pesce sul porto di Bonifacio",
    homeDescription:
      "Brasserie chic di fronte alle barche a vela del porto di Bonifacio: pescato del giorno, bouillabaisse della casa, tortino di castagne. Aperto tutti i giorni dalle 11 alle 23.",
    homeOgDescription:
      "Terrazza riparata di fronte al porto turistico, cucina di stagione, prodotti freschi e filiera corta.",
    rootTitle: "L'Albatros — Ristorante sul porto di Bonifacio",
    rootDescription:
      "Brasserie chic di fronte alle barche a vela, 47 Quai Comparetti a Bonifacio. Pescato del giorno, bouillabaisse della casa, terrazza riparata, tutti i giorni dalle 11 alle 23.",
    menuTitle: "Il Menu — L'Albatros, Bonifacio",
    menuDescription:
      "Il menu de L'Albatros a Bonifacio: zuppa di pesce di scoglio, bouillabaisse della casa, tonno scottato, aragosta, tortino di castagne.",
    menuOgDescription: "Antipasti, pesce del pescato del giorno, carni e dolci corsi.",
    galleryTitle: "Galleria — L'Albatros, Bonifacio",
    galleryDescription:
      "Fotografie de L'Albatros a Bonifacio: terrazza di fronte al porto, piatti del pescato del giorno, il porto al tramonto.",
    galleryOgDescription: "La terrazza, il porto, i piatti: L'Albatros in immagini.",
    contactTitle: "Dove siamo & Contatti — L'Albatros, Bonifacio",
    contactDescription:
      "L'Albatros, 47 Quai Comparetti, 20169 Bonifacio. Telefono +33 4 95 77 17 68, aperto tutti i giorni dalle 11 alle 23 sul porto turistico.",
    contactOgDescription: "Trovaci sul Quai Comparetti a Bonifacio e prenota per telefono.",
    bookingTitle: "Prenota un tavolo — L'Albatros, Bonifacio",
    bookingDescription:
      "Prenota il tuo tavolo a L'Albatros, 47 Quai Comparetti a Bonifacio. Servizio continuato dalle 11 alle 23, tutti i giorni. Bouillabaisse su ordinazione.",
    bookingOgDescription:
      "Un tavolo di fronte alle barche del porto di Bonifacio, a pranzo e a cena.",
    legalTitle: "Note legali & GDPR — L'Albatros, Bonifacio",
    legalDescription:
      "Note legali del ristorante L'Albatros a Bonifacio, editore AUX PETITS GOURMETS (SASU), hosting e informativa sulla protezione dei dati.",
    legalOgDescription: "Editore, hosting, dati personali e cookie.",
  },

  home: {
    eyebrow: "47 Quai Comparetti · Bonifacio",
    title: "Il Mediterraneo, servito davanti alle vele",
    intro:
      "Brasserie chic sul porto turistico. Pescato locale del giorno, prodotti freschi e filiera corta, preparati ogni giorno dalla nostra brigata.",
    ctaBook: "Prenota un tavolo",
    ctaMenu: "Scopri il menu",
    hours: "11 – 23, tutti i giorni",
    port: "Porto di Bonifacio",
    storyEyebrow: "La nostra filosofia",
    storyTitle: "Dal 2021, una tavola dove il porto entra nel piatto",
    storyP1:
      "Sul Quai Comparetti, la terrazza riparata de L'Albatros guarda rientrare le barche a vela. Nel 2026 una nuova direzione riprende la casa senza cambiarne l'anima: prima il prodotto, poi il mare, sempre la generosità.",
    storyP2:
      "Gli interni giocano sul blu e sull'oro — il mare e il tramonto sul porto. In cucina, la brigata lavora i territori corsi e mediterranei in filiera corta; in sala, il team orchestra un servizio preciso e caloroso.",
    terraceBadge: "Terrazza riparata",
    terraceBadgeText: "Di fronte alle vele, servizio continuato dalle 11 alle 23.",
    terraceAlt:
      "Tavoli apparecchiati sulla terrazza de L'Albatros al tramonto, vista sul porto turistico",
    heroAlt: "La terrazza de L'Albatros di notte, di fronte alle vele del porto di Bonifacio",
    signaturesEyebrow: "I piatti firma",
    signaturesTitle: "Da non perdere",
    mustTry: "L'immancabile de L'Albatros",
    servedFrom: "A partire da",
    seeFullMenu: "Vedi tutto il menu",
    imagesEyebrow: "In immagini",
    imagesTitle: "La casa in immagini",
    seeFullGallery: "Vedi tutta la galleria",
    teamEyebrow: "La casa",
    teamTitle: "Il team",
    ctaTitle: "Un tavolo di fronte al porto?",
    ctaText:
      "Prenota online in un minuto, oppure chiamaci direttamente — rispondiamo dalle 11 alle 23.",
    ctaBookOnline: "Prenota online",
  },

  menu: {
    eyebrow: "Cucina di mercato",
    title: "Il Menu",
    introBefore:
      "Il menu segue il pescato e il mercato. Alcuni piatti — aragosta, bouillabaisse — vanno ordinati in anticipo al ",
    introAfter: ".",
    allergens:
      "Allergeni: l'elenco completo degli allergeni presenti nelle nostre preparazioni è disponibile in sala, basta chiederlo a un membro del nostro team.",
    carteAria: "Scegli un menu",
    perPerson: "a persona",
    per100g: "ogni 100 g",
    onArrival: "Secondo il pescato",
    chefNote:
      "Il nostro chef propone un menu ispirato al mercato e alla stagionalità, costruito soprattutto su prodotti freschi e locali.",
    tableService: "Sfilettato e servito in sala",
  },

  team: {
    cuisine: {
      title: "Lo chef di cucina",
      role: "Ai fornelli",
      text: "Una cucina da brasserie chic, guidata dal pescato del mattino e dai territori corsi.",
    },
    brigade: {
      title: "La brigata",
      role: "Sous-chef e commis",
      text: "Una squadra affiatata che prepara e impiatta ogni portata sul posto, dal mattino all'ultimo servizio.",
    },
    salle: {
      title: "Il team di sala",
      role: "Accoglienza & servizio",
      text: "L'arte dell'accoglienza: un servizio preciso, caloroso, mai rigido, davanti alle vele.",
    },
  },

  gallery: {
    eyebrow: "In immagini",
    title: "Galleria",
    enlarge: (alt: string) => `Ingrandisci: ${alt}`,
    photoOf: (n: number, total: number) => `Foto ${n} di ${total}`,
    zoom: "Ingrandisci",
    close: "Chiudi la foto",
    previous: "Foto precedente",
    next: "Foto successiva",
    photos: {
      port: "Il porto turistico di Bonifacio di notte, visto dalla terrazza del ristorante",
      rouget: "Filetto di triglia nel suo brodo di pesce di scoglio allo zafferano",
      langoustes: "Piatto dorato di aragoste, gamberi e cozze grigliate",
      terrasse: "Tavoli apparecchiati in terrazza al tramonto, yacht ormeggiati sullo sfondo",
    },
    intro:
      "Quattro immagini, dalla terrazza e dalla cucina. Il porto cambia di ora in ora; il piatto segue il pescato del mattino.",
    titles: {
      port: "Il porto, a notte fonda",
      rouget: "La triglia, in brodo allo zafferano",
      langoustes: "Il piatto di aragoste",
      terrasse: "La terrazza, al tramonto",
    },
  },

  contact: {
    eyebrow: "Dove siamo",
    title: "Come arrivare & contatti",
    practical: "Informazioni pratiche",
    mapHeading: "Mappa",
    mapTitle: "Mappa della posizione de L'Albatros, 47 Quai Comparetti a Bonifacio",
    call: "Chiama",
    directions: "Itinerario",
    portName: "Quai Comparetti — porto turistico",
    intro:
      "Sulla banchina, a filo d'acqua, tra i pontili e la città vecchia. Ci si arriva a piedi dal porto turistico, in pochi minuti dal parcheggio del porto.",
    addressLabel: "Indirizzo",
    hoursLabel: "Orari",
    hoursValue: "11:00 – 23:00",
    hoursNote: "Servizio continuato, sette giorni su sette",
    seasonLabel: "Stagione",
    phoneLabel: "Telefono",
    phoneNote: "Rispondiamo durante il servizio",
    paymentLabel: "Metodi di pagamento",
    payments: { card: "Carta di credito", cash: "Contanti", ancv: "Buoni vacanza ANCV" },
    followLabel: "Seguici",
    mapCredit: "Mappa di base © OpenStreetMap",
  },

  booking: {
    eyebrow: "Prenotazione",
    title: "Prenota un tavolo",
    intro:
      "Servizio continuato dalle 11 alle 23, tutti i giorni. Per la bouillabaisse della casa (per due) e l'aragosta, si prega di ordinare in anticipo.",
    name: "Nome",
    namePlaceholder: "Il tuo nome",
    phone: "Telefono",
    phonePlaceholder: "+39 333 123 4567",
    date: "Data",
    time: "Ora",
    guests: "Numero di coperti",
    email: "E-mail (facoltativa)",
    emailPlaceholder: "tu@email.com",
    message: "Richiesta particolare",
    messagePlaceholder: "Bouillabaisse su ordinazione, allergie, tavolo in terrazza…",
    company: "Azienda",
    submit: "Invia la richiesta",
    sending: "Invio in corso…",
    asideCallTitle: "Preferisci chiamare?",
    asideCallText: "È il modo più diretto, soprattutto per il giorno stesso. Rispondiamo durante il servizio.",
    asideKnowTitle: "Da ordinare in anticipo",
    asideKnowText:
      "La bouillabaisse della casa, presentata e sfilettata in sala, e l'aragosta. Segnalalo nella tua richiesta.",
    asideNextTitle: "Cosa succede dopo",
    asideNextText:
      "La tua richiesta ci arriva subito. Ti richiamiamo per confermare il tavolo e l'orario — la prenotazione è definitiva solo dopo questa chiamata.",
    formTitle: "La tua richiesta",
    privacy:
      "I tuoi dati servono unicamente a gestire la prenotazione e non vengono mai ceduti a terzi.",
    successTitle: "Richiesta registrata",
    successText: (phone: string) =>
      `Ti confermeremo il tavolo per telefono. Per una prenotazione immediata, chiamaci al ${phone}.`,
    callRestaurant: "Chiama il ristorante",
    failure:
      "Non è stato possibile inviare la richiesta. Ti preghiamo di chiamarci direttamente, rispondiamo dalle 11 alle 23.",
    errors: {
      name: "Indica il tuo nome.",
      nameLong: "Nome troppo lungo.",
      phone: "Numero di telefono non valido.",
      date: "Data non valida.",
      datePast: "Questa data è già passata.",
      time: "Ora non valida.",
      timeRange: (open: number, close: number) => `Serviamo dalle ${open} alle ${close}.`,
      guests: "Numero di coperti non valido.",
      guestsMin: "Almeno un coperto.",
      guestsMax: "Per più di 20 coperti, chiamaci direttamente.",
      email: "Indirizzo e-mail non valido.",
      messageLong: "Messaggio troppo lungo.",
    },
  },

  legal: {
    title: "Note legali & GDPR",
    toComplete: "da completare",
    publisher: {
      heading: "Editore del sito",
      companyLabel: "Ragione sociale",
      formLabel: "Forma giuridica",
      form: "Società per azioni semplificata unipersonale (SASU, Francia)",
      capitalLabel: "Capitale sociale",
      sirenLabel: "SIREN",
      rcsLabel: "Registro delle imprese",
      vatLabel: "Partita IVA intracomunitaria",
      addressLabel: "Sede / esercizio",
      phoneLabel: "Telefono",
      emailLabel: "E-mail",
      directorLabel: "Direttore della pubblicazione",
      tradeNameLabel: "Insegna",
    },
    host: {
      heading: "Hosting",
      intro: "Il sito è ospitato dalla seguente società, che ne archivia e distribuisce le pagine:",
      note: "Se il sito venisse ospitato altrove, questa indicazione va aggiornata: la legge impone di identificare l'hosting reale.",
    },
    data: {
      heading: "Dati personali",
      controllerTitle: "Titolare del trattamento",
      controllerText: "Il titolare del trattamento è l'editore del sito indicato sopra.",
      purposeTitle: "Finalità e dati raccolti",
      purposeText:
        "Il modulo di prenotazione raccoglie il tuo nome, il telefono, la data, l'ora e il numero di coperti desiderati e, facoltativamente, il tuo indirizzo e-mail e la tua richiesta particolare. Queste informazioni servono esclusivamente a gestire e confermare la prenotazione.",
      basisTitle: "Base giuridica",
      basisText:
        "Il trattamento si fonda sull'esecuzione di misure precontrattuali adottate su tua richiesta (articolo 6.1.b del GDPR).",
      retentionTitle: "Periodo di conservazione",
      retentionText:
        "Le richieste di prenotazione sono conservate dodici mesi dalla data del pasto, poi cancellate. Nessun dato è conservato a fini di marketing senza il tuo consenso.",
      recipientsTitle: "Destinatari e responsabili del trattamento",
      recipientsText:
        "I tuoi dati sono accessibili solo al team del ristorante. Non vengono né venduti né ceduti. L'inoltro delle e-mail di prenotazione è affidato a un fornitore tecnico che agisce come responsabile del trattamento:",
      thirdPartiesTitle: "Servizi di terzi utilizzati dal sito",
      thirdPartiesText:
        "La consultazione del sito attiva connessioni verso i servizi seguenti, che ricevono quindi il tuo indirizzo IP:",
    },
    rights: {
      heading: "I tuoi diritti",
      text: "Ai sensi del GDPR hai diritto di accesso, rettifica, cancellazione, limitazione, opposizione e portabilità dei tuoi dati. Per esercitarli, contattaci per telefono o di persona all'indirizzo indicato sopra.",
      cnil: "Se, dopo averci contattato, ritieni che i tuoi diritti non siano rispettati, puoi presentare reclamo all'autorità francese per la protezione dei dati (CNIL) — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, Francia, oppure su cnil.fr.",
    },
    cookies: {
      heading: "Cookie e tracciatori",
      text: "Questo sito non installa cookie pubblicitari, né tracciatori di analisi, né cookie di terzi che richiedano il tuo consenso. Viene utilizzata solo l'archiviazione tecnica di sessione strettamente necessaria. I servizi elencati sopra sono però richiamati dal tuo browser e ricevono il tuo indirizzo IP.",
    },
    ip: {
      heading: "Proprietà intellettuale",
      text: "Tutti i contenuti di questo sito — testi, fotografie, identità visiva — sono protetti e non possono essere riprodotti, nemmeno parzialmente, senza previa autorizzazione scritta dell'editore.",
      mapCredit:
        "La mappa di base della pagina Contatti è fornita da OpenStreetMap e dai suoi contributori, con licenza ODbL.",
    },
    updated: "Ultimo aggiornamento",
  },

  footer: {
    tagline:
      "Brasserie chic sul porto turistico di Bonifacio. Prodotti freschi, pescato locale, territori corsi e mediterranei.",
    contact: "Contatti",
    navigate: "Naviga",
    follow: "Seguici",
    menuLink: "Il Menu",
    galleryLink: "Galleria",
    bookLink: "Prenota un tavolo",
    contactLink: "Come arrivare & contatti",
    legalLink: "Note legali & GDPR",
    instagramAria: "L'Albatros su Instagram",
    rights: (year: number) => `© ${year} L'Albatros — Bonifacio. Tutti i diritti riservati.`,
  },

  notFound: {
    title: "Pagina non trovata",
    text: "Questa pagina ha levato l'ancora. Torniamo in porto?",
    home: "Torna alla home",
  },

  error: {
    title: "Impossibile caricare questa pagina",
    text: "Si è verificato un problema. Puoi riprovare o tornare alla home.",
    retry: "Riprova",
    home: "Home",
  },

  preloader: {
    enter: "Entra",
  },

  site: {
    hours: "Servizio continuato 11:00 – 23:00, tutti i giorni",
    season: "Apertura stagionale il 1° aprile",
  },
};
