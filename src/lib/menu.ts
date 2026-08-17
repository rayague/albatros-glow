import type { Locale } from "@/lib/i18n/locales";

/**
 * LA CARTE — transcrite depuis les cartes papier du restaurant.
 *
 * Les trois langues sont volontairement côte à côte sur la même ligne : la
 * carte évolue au fil du marché, et corriger un prix ou un plat doit rester
 * une modification d'une seule ligne, pas une chasse dans trois fichiers.
 *
 * Les noms propres ne sont pas traduits — domaines viticoles, appellations,
 * cocktails, marques d'alcool. C'est volontaire : « Domaine Zuria Aria » ou
 * « Negroni » s'écrivent pareil dans toutes les langues.
 */
export type Localized = { fr: string; en: string; it: string };

export const pick = (value: Localized, locale: Locale) => value[locale];

/** Unité de vente quand le prix n'est pas un forfait. */
export type PriceUnit = "per100g" | "perPerson";

export type Dish = {
  /** Traduit pour les plats, identique partout pour les noms propres. */
  name: Localized;
  /** Précision non traduite : appellation, contenance, composition. */
  detail?: string;
  /** Montant affiché, ou `null` lorsque le prix dépend de l'arrivage. */
  price: string | null;
  unit?: PriceUnit;
  signature?: boolean;
};

export type Section = {
  id: string;
  title: Localized;
  /** Note en pied de section (garnitures, sauces, poissons entrant dans un plat). */
  note?: Localized;
  items: Dish[];
};

export type CarteId = "cuisine" | "vins" | "cocktails" | "boissons";

export type Carte = {
  id: CarteId;
  label: Localized;
  sections: Section[];
};

const L = (fr: string, en: string, it: string): Localized => ({ fr, en, it });
/** Nom propre : identique dans les trois langues. */
const N = (s: string): Localized => ({ fr: s, en: s, it: s });

/* ─────────────────────────────  CUISINE  ───────────────────────────── */

const cuisine: Section[] = [
  {
    id: "brasserie",
    title: L("Côté brasserie", "Brasserie side", "Lato brasserie"),
    items: [
      { name: L("Poke Bowl poulet", "Chicken poke bowl", "Poke bowl di pollo"), price: "21 €" },
      { name: L("Poke Bowl thon", "Tuna poke bowl", "Poke bowl di tonno"), price: "21 €" },
      {
        name: L("Poke Bowl végétarien", "Vegetarian poke bowl", "Poke bowl vegetariano"),
        price: "20 €",
      },
      {
        name: L("Tartare de thon, avocat", "Tuna tartare, avocado", "Tartare di tonno, avocado"),
        detail: "Salade ou frites",
        price: "24 €",
      },
      {
        name: L(
          "Assiette de charcuterie corse",
          "Corsican charcuterie board",
          "Tagliere di salumi corsi",
        ),
        price: "24 €",
      },
      {
        name: L(
          "Gaufre signature, mer ou terre",
          "Signature waffle, sea or land",
          "Waffle signature, mare o terra",
        ),
        price: "19 €",
      },
      {
        name: L(
          "Tartare de bœuf au couteau",
          "Hand-cut beef tartare",
          "Tartare di manzo al coltello",
        ),
        detail: "Salade ou frites",
        price: "23 €",
      },
      {
        name: L("Club sandwich poulet", "Chicken club sandwich", "Club sandwich al pollo"),
        detail: "Salade ou frites",
        price: "21 €",
      },
      {
        name: L("Club sandwich saumon", "Salmon club sandwich", "Club sandwich al salmone"),
        detail: "Salade ou frites",
        price: "22 €",
      },
      {
        name: L("Moules gratinées", "Gratinated mussels", "Cozze gratinate"),
        detail: "12 pièces",
        price: "18 €",
      },
    ],
  },
  {
    id: "entrees",
    title: L(
      "Entrées et salades repas",
      "Starters and main-course salads",
      "Antipasti e insalatone",
    ),
    items: [
      {
        name: L(
          "Aubergines à la bonifacienne",
          "Aubergines Bonifacio style",
          "Melanzane alla bonifacina",
        ),
        price: "22 €",
        signature: true,
      },
      { name: N("Fritto misto"), price: "23 €", signature: true },
      {
        name: L("Soupe de poissons de roche", "Rockfish soup", "Zuppa di pesce di scoglio"),
        price: "20 €",
        signature: true,
      },
      { name: L("Salade César", "Caesar salad", "Insalata Caesar"), price: "23 €" },
      {
        name: L("Salade de poulpe maison", "House octopus salad", "Insalata di polpo della casa"),
        price: "23 €",
      },
      {
        name: L("Salade végétarienne", "Vegetarian salad", "Insalata vegetariana"),
        price: "20 €",
      },
      {
        name: L("Lobster roll à la langouste", "Spiny lobster roll", "Lobster roll all'aragosta"),
        detail: "Sandwich brioché",
        price: "26 €",
      },
      {
        name: L("Salade italienne", "Italian salad", "Insalata italiana"),
        detail: "Tomate, mozzarella, jambon épicé",
        price: "19 €",
      },
    ],
  },
  {
    id: "poissons",
    title: L("Nos poissons", "Our fish", "I nostri pesci"),
    note: L(
      "Blanquette et bouillabaisse : lotte, saumon, espadon, dorade, moules, palourdes.",
      "Blanquette and bouillabaisse: monkfish, salmon, swordfish, sea bream, mussels, clams.",
      "Blanquette e bouillabaisse: rana pescatrice, salmone, pesce spada, orata, cozze, vongole.",
    ),
    items: [
      { name: L("Thon snacké", "Seared tuna", "Tonno scottato"), price: "28 €" },
      {
        name: L("Dorade", "Sea bream", "Orata"),
        detail: "400 g · 1 personne",
        price: "36 €",
      },
      {
        name: L("Dorade", "Sea bream", "Orata"),
        detail: "800 g · 2 personnes",
        price: "60 €",
      },
      {
        name: L("Blanquette de poissons", "Fish blanquette", "Blanquette di pesce"),
        price: "37 €",
      },
      {
        name: L("Gambas grillées", "Grilled prawns", "Gamberoni alla griglia"),
        detail: "Pastis ou persillade, linguine",
        price: "30 €",
      },
      {
        name: L(
          "Bouillabaisse à la livournaise",
          "Livorno-style bouillabaisse",
          "Bouillabaisse alla livornese",
        ),
        price: "37 €",
      },
    ],
  },
  {
    id: "viandes",
    title: L("Nos viandes", "Our meats", "Le nostre carni"),
    note: L(
      "Accompagnement : gratin de pommes de terre et légumes. Sauces au choix : poivre, forestière ou porto.",
      "Served with potato gratin and vegetables. Choice of sauce: pepper, forest mushroom or port.",
      "Contorno: gratin di patate e verdure. Salse a scelta: pepe, ai funghi o al porto.",
    ),
    items: [
      {
        name: N("Corsica Burger"),
        detail: "Tome corse, panzetta",
        price: "23 €",
      },
      { name: N("Cheese Burger"), price: "21 €" },
      {
        name: L("Entrecôte grillée", "Grilled rib steak", "Costata alla griglia"),
        detail: "Simmental, 250 g",
        price: "32 €",
      },
      { name: L("Côte de veau", "Veal chop", "Costata di vitello"), price: "28 €" },
      { name: L("Côte d'agneau", "Lamb chop", "Costoletta d'agnello"), price: "29 €" },
      {
        name: L("Pièce du boucher", "Butcher's cut", "Taglio del macellaio"),
        price: null,
      },
    ],
  },
  {
    id: "pates",
    title: L("Nos pâtes et riz", "Our pasta and rice", "Paste e risotti"),
    items: [
      {
        name: L("Pâtes à l'arrabbiata", "Arrabbiata pasta", "Pasta all'arrabbiata"),
        price: "24 €",
      },
      { name: L("Pâtes à la boutargue", "Bottarga pasta", "Pasta alla bottarga"), price: "30 €" },
      {
        name: L("Pâtes à la bonifacienne", "Pasta Bonifacio style", "Pasta alla bonifacina"),
        price: "24 €",
      },
      {
        name: L("Pâtes chasseur", "Hunter's pasta", "Pasta alla cacciatora"),
        detail: "Cèpes, lardons",
        price: "26 €",
      },
      {
        name: L("Pâtes aux fruits de mer", "Seafood pasta", "Pasta ai frutti di mare"),
        price: "27 €",
      },
      {
        name: L(
          "Gnocchi maison à la truffe",
          "House gnocchi with truffle",
          "Gnocchi della casa al tartufo",
        ),
        price: "29 €",
      },
      {
        name: L(
          "Gnocchi maison aux 3 fromages",
          "House gnocchi, three cheeses",
          "Gnocchi della casa ai tre formaggi",
        ),
        price: "28 €",
      },
      {
        name: L("Risotto à la langouste", "Spiny lobster risotto", "Risotto all'aragosta"),
        price: "34 €",
      },
      { name: L("Risotto aux gambas", "Prawn risotto", "Risotto ai gamberoni"), price: "32 €" },
      {
        name: L("Risotto végétarien", "Vegetarian risotto", "Risotto vegetariano"),
        price: "27 €",
      },
      { name: L("Sauté de veau", "Veal sauté", "Spezzatino di vitello"), price: "28 €" },
      { name: L("Civet de sanglier", "Wild boar stew", "Civet di cinghiale"), price: "24 €" },
    ],
  },
  {
    id: "desserts",
    title: L("Nos desserts", "Our desserts", "I nostri dolci"),
    note: L(
      "Tous nos desserts sont faits maison.",
      "All our desserts are made in-house.",
      "Tutti i nostri dolci sono fatti in casa.",
    ),
    items: [
      { name: N("Tiramisu"), price: "12,50 €" },
      { name: N("Panna cotta"), price: "12,50 €" },
      { name: L("Gaufre", "Waffle", "Waffle"), price: "12,50 €" },
      {
        name: L("Fondant au chocolat", "Chocolate fondant", "Tortino al cioccolato"),
        price: "12,50 €",
      },
      {
        name: L(
          "Salade de fruits frais de saison",
          "Fresh seasonal fruit salad",
          "Macedonia di frutta fresca di stagione",
        ),
        price: "12,50 €",
      },
      { name: L("Île flottante", "Floating island", "Isola galleggiante"), price: "12,50 €" },
      {
        name: L(
          "Assiette de fromages corses",
          "Corsican cheese board",
          "Tagliere di formaggi corsi",
        ),
        price: "12,50 €",
      },
    ],
  },
  {
    id: "enfants",
    title: L("Menu enfants", "Children's menu", "Menu bambini"),
    note: L("Moins de 12 ans — 13 €", "Under 12 — €13", "Sotto i 12 anni — 13 €"),
    items: [
      {
        name: L("Poulet pané, frites", "Breaded chicken, fries", "Pollo impanato, patatine"),
        price: null,
      },
      { name: L("Pâtes à la bolognaise", "Bolognese pasta", "Pasta alla bolognese"), price: null },
      { name: L("Boules de glace", "Scoops of ice cream", "Palline di gelato"), price: null },
    ],
  },
];

/**
 * Les deux pièces découpées en salle, vendues au poids. Elles sortent du
 * défilé des sections pour avoir leur propre traitement à l'écran.
 */
export const SIGNATURES: Dish[] = [
  {
    name: L("La bouillabaisse maison", "House bouillabaisse", "La bouillabaisse della casa"),
    detail: "Présentée et découpée par nos soins",
    price: "56 €",
    unit: "perPerson",
    signature: true,
  },
  {
    name: L(
      "Pâtes à la langouste ou langouste grillée",
      "Spiny lobster pasta or grilled spiny lobster",
      "Pasta all'aragosta o aragosta alla griglia",
    ),
    price: "25 €",
    unit: "per100g",
    signature: true,
  },
  {
    name: L("Poisson de pêche locale", "Local catch of the day", "Pesce del pescato locale"),
    detail: "Saint-Pierre, turbot, pagre, denti, loup ou bar",
    price: "13 €",
    unit: "per100g",
    signature: true,
  },
];

/* ─────────────────────────────  VINS  ───────────────────────────── */

const vins: Section[] = [
  {
    id: "rouge",
    title: L("Rouge", "Red", "Rosso"),
    items: [
      {
        name: N("Château Prince Pierre N. Bonaparte"),
        detail: "AOP Calvi — Cuvée Argentella, AB",
        price: "49 €",
      },
      { name: N("Domaine Zuria Aria"), detail: "IGP Bonifacio", price: "34 €" },
      { name: N("Domaine Sant Armettu Mino"), detail: "IGP Sartène", price: "28 €" },
      { name: N("Domaine Sant Armettu Myrtus"), detail: "AOP Sartène", price: "55 €" },
      { name: N("Île de Beauté, Isula Mea"), detail: "AOP Aléria", price: "24 €" },
    ],
  },
  {
    id: "blanc",
    title: L("Blanc", "White", "Bianco"),
    items: [
      { name: N("Domaine Saparale Casteddu"), detail: "AOP Sartène", price: "50 €" },
      { name: N("Domaine Zuria Aria"), detail: "IGP Bonifacio", price: "34 €" },
      {
        name: N("Château Prince Pierre N. Bonaparte"),
        detail: "AOP Calvi — Cuvée Argentella, AB",
        price: "50 €",
      },
      { name: N("Domaine Sant Armettu Mino"), detail: "IGP Sartène", price: "28 €" },
      { name: N("Île de Beauté, Isula Mea"), detail: "AOP Aléria", price: "24 €" },
    ],
  },
  {
    id: "rose",
    title: L("Rosé", "Rosé", "Rosato"),
    items: [
      {
        name: N("Château Prince Pierre N. Bonaparte"),
        detail: "AOP Calvi — Cuvée Argentella, AB",
        price: "39 €",
      },
      { name: N("Domaine Zuria Aria"), detail: "IGP Bonifacio", price: "34 €" },
      { name: N("Domaine Clos d'Alzeto Prestige"), detail: "AOP Ajaccio", price: "40 €" },
      { name: N("Domaine Sant Armettu Mino"), detail: "IGP Sartène", price: "28 €" },
      { name: N("Île de Beauté, Isula Mea"), detail: "AOP Aléria", price: "24 €" },
    ],
  },
];

/* ─────────────────────────────  COCKTAILS  ───────────────────────────── */

const cocktails: Section[] = [
  {
    id: "signatures",
    title: L("Nos signatures", "Our signatures", "Le nostre signature"),
    items: [
      {
        name: N("Blue Albatros"),
        detail: "Rhum, ananas, curaçao, noix de coco",
        price: "12,50 €",
        signature: true,
      },
      {
        name: N("Brise Marine"),
        detail: "Vodka, anis, curaçao, jus de citron",
        price: "12,50 €",
        signature: true,
      },
      {
        name: N("Pink Riviera Rosé"),
        detail: "Cranberry, gin, St-Germain, Orezza, sirop de romarin",
        price: "12,50 €",
        signature: true,
      },
    ],
  },
  {
    id: "classiques",
    title: L("Les classiques", "The classics", "I classici"),
    items: [
      { name: N("Mojito"), price: "11,50 €" },
      { name: N("Piña Colada"), price: "11,50 €" },
      { name: N("Gin Tonic"), price: "11,50 €" },
      { name: N("Negroni"), price: "11,50 €" },
      { name: N("Americano"), price: "11,50 €" },
      { name: N("Bloody Mary"), price: "11,50 €" },
      { name: N("Maï Thaï"), price: "11,50 €" },
      { name: N("P'tit Punch"), price: "11 €" },
      { name: N("Expresso Martini"), price: "12 €" },
    ],
  },
  {
    id: "mules",
    title: L("Les mules", "The mules", "I mule"),
    items: [
      { name: N("Moscow Mule"), price: "11,50 €" },
      { name: N("London Mule"), price: "11,50 €" },
      { name: N("Caribbean Mule"), price: "11,50 €" },
      { name: N("French Mule"), price: "12,50 €" },
    ],
  },
  {
    id: "spritz",
    title: L("Les spritz", "The spritz", "Gli spritz"),
    note: L(
      "Mocktails sans alcool — 8,50 €",
      "Alcohol-free mocktails — €8.50",
      "Mocktail analcolici — 8,50 €",
    ),
    items: [
      { name: N("Apérol Spritz"), price: "10 €" },
      { name: N("St-Germain Spritz"), price: "11,50 €" },
      { name: N("Limoncello Spritz"), price: "10 €" },
      { name: N("Blue Spritz"), price: "11,50 €" },
    ],
  },
];

/* ─────────────────────────────  BOISSONS  ───────────────────────────── */

const boissons: Section[] = [
  {
    id: "bieres",
    title: L("Bières", "Beers", "Birre"),
    items: [
      {
        name: N("Pietra Ambrée"),
        detail: "Pression, bière corse à la châtaigne — 25 cl",
        price: "6 €",
      },
      { name: N("Pietra Bionda"), detail: "Pression, bière corse blonde — 25 cl", price: "5,50 €" },
      { name: N("Monaco"), price: "6 €" },
      { name: L("Panaché", "Shandy", "Panaché"), price: "5,50 €" },
      { name: L("Sérieux", "Large beer (50 cl)", "Birra grande (50 cl)"), price: "10 €" },
    ],
  },
  {
    id: "aperitifs",
    title: L("Apéritifs", "Aperitifs", "Aperitivi"),
    items: [
      {
        name: L("Verre de vin", "Glass of wine", "Calice di vino"),
        detail: "Blanc, rouge ou rosé",
        price: "5,50 €",
      },
      {
        name: L("Verre de vin supérieur", "Glass of premium wine", "Calice di vino superiore"),
        detail: "Blanc, rouge ou rosé",
        price: "9 €",
      },
      { name: N("Cap Corse"), detail: "Rouge ou blanc", price: "5 €" },
      { name: N("Campari"), price: "5 €" },
      { name: N("Pastis, Ricard, Casanis"), price: "4 €" },
      { name: N("Americano"), price: "9 €" },
      { name: N("Muscat"), price: "6 €" },
      { name: L("Muscat pétillant", "Sparkling muscat", "Moscato spumante"), price: "6 €" },
      {
        name: L("Kir", "Kir", "Kir"),
        detail: "Cassis, pêche ou fraise",
        price: "7,50 €",
      },
      { name: L("Kir pétillant", "Sparkling kir", "Kir spumante"), price: "12 €" },
      { name: N("Prosecco"), price: "7 €" },
    ],
  },
  {
    id: "spiritueux",
    title: L("Spiritueux", "Spirits", "Distillati"),
    items: [
      { name: N("Whisky Ballantine's"), price: "8 €" },
      { name: N("Whisky Oban"), price: "15 €" },
      { name: N("Vodka Eristoff"), price: "10 €" },
      { name: N("Rhum Havana Ambré"), price: "11 €" },
      { name: N("Get 27"), price: "10 €" },
      { name: N("Gin Gordon's"), price: "11 €" },
      { name: N("Cognac Baron Otard"), price: "15 €" },
      { name: N("Amaretto"), price: "6,50 €" },
    ],
  },
];

/**
 * Le plat emblématique, celui que la carte papier titre « L'incontournable de
 * L'Albatros ». Il ouvre la section signatures de l'accueil.
 */
export const HERO_DISH: Dish = SIGNATURES[0];

/**
 * Les autres pièces signature, pour l'accueil : les deux vendues au poids,
 * puis celles marquées dans la carte cuisine. Dérivé plutôt que recopié —
 * marquer `signature: true` sur un plat suffit à le faire apparaître.
 */
export const SIGNATURE_DISHES: Dish[] = [
  ...SIGNATURES.slice(1),
  ...cuisine.flatMap((s) => s.items.filter((i) => i.signature)),
];

export const CARTES: Carte[] = [
  { id: "cuisine", label: L("Cuisine", "Food", "Cucina"), sections: cuisine },
  { id: "vins", label: L("Vins", "Wines", "Vini"), sections: vins },
  { id: "cocktails", label: L("Cocktails", "Cocktails", "Cocktail"), sections: cocktails },
  { id: "boissons", label: L("Boissons", "Drinks", "Bevande"), sections: boissons },
];
