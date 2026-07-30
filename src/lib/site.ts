export const SITE = {
  name: "L'Albatros",
  legal: "AUX PETITS GOURMETS (SASU) — SIREN 892139759 — RCS Ajaccio",
  address: "47 Quai Comparetti, 20169 Bonifacio, Corse",
  phoneDisplay: "+33 4 95 77 17 68",
  phoneHref: "tel:+33495771768",
  hours: "Service continu 11h00 – 23h00, 7j/7",
  season: "Ouverture de saison le 1er avril",
  instagram: "https://www.instagram.com/restaurantlalbatrosbonifacio/",
  facebook: "https://www.facebook.com/",
  maps: "https://www.google.com/maps/search/?api=1&query=47+Quai+Comparetti+20169+Bonifacio",
} as const;

export type MenuCategory = "Entrées" | "Poissons" | "Viandes" | "Desserts";

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  signature?: boolean;
};

export const MENU: MenuItem[] = [
  {
    name: "Soupe de poissons de roche",
    description: "Rouille maison, croûtons dorés, tomme corse râpée.",
    price: "16 €",
    category: "Entrées",
    signature: true,
  },
  {
    name: "Tartare de poisson",
    description: "Pêche du jour, huile d'olive de Balagne, agrumes, herbes fraîches.",
    price: "22 €",
    category: "Entrées",
  },
  {
    name: "Fritto misto",
    description: "Friture légère de petits poissons et calamars, citron confit.",
    price: "19 €",
    category: "Entrées",
  },
  {
    name: "Poisson frais de la pêche locale du jour",
    description: "Entier ou en filet, grillé au feu, légumes de saison du maraîcher.",
    price: "Selon arrivage",
    category: "Poissons",
    signature: true,
  },
  {
    name: "Bouillabaisse maison",
    description: "Sur commande, pour 2 personnes. Poissons de roche, safran, rouille.",
    price: "78 € / 2 pers.",
    category: "Poissons",
    signature: true,
  },
  {
    name: "Thon snacké",
    description: "Cœur rosé, sésame, émulsion aux herbes du maquis.",
    price: "28 €",
    category: "Poissons",
  },
  {
    name: "Langouste",
    description: "Grillée ou en salade, selon la pêche du jour.",
    price: "Selon arrivage",
    category: "Poissons",
  },
  {
    name: "Sauté de veau aux olives",
    description: "Veau corse mijoté, olives de Méditerranée, polenta crémeuse.",
    price: "26 €",
    category: "Viandes",
  },
  {
    name: "Moelleux à la châtaigne",
    description: "Farine de châtaigne corse, cœur coulant, crème de brocciu.",
    price: "11 €",
    category: "Desserts",
    signature: true,
  },
  {
    name: "Fiadone",
    description: "Brocciu frais, zeste de citron, eau-de-vie corse.",
    price: "10 €",
    category: "Desserts",
  },
];

export const CATEGORIES: MenuCategory[] = ["Entrées", "Poissons", "Viandes", "Desserts"];

export const TEAM = [
  {
    name: "Chef Omar",
    role: "Chef de cuisine",
    text: "Une cuisine de brasserie chic, guidée par la pêche du matin et les terroirs corses.",
  },
  {
    name: "Julien",
    role: "Maître d'hôtel",
    text: "L'art d'accueillir : un service précis, chaleureux, jamais guindé.",
  },
  {
    name: "Marie-Claire Luciani",
    role: "Décoration & atmosphère",
    text: "Bleu, laiton et lumière du port : une salle pensée comme un pont de voilier.",
  },
];
