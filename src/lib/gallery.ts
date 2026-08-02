import heroImg from "@/assets/hero-marina.jpg";
import terrasseImg from "@/assets/terrasse.jpg";
import dishImg from "@/assets/dish-poisson.jpg";
import langousteImg from "@/assets/langouste.jpg";

export type Photo = {
  src: string;
  /**
   * Description de ce que montre l'image, pour les lecteurs d'écran et le
   * référencement. Obligatoire : l'absence de texte alternatif était l'un des
   * défauts relevés sur l'ancien site.
   */
  alt: string;
  /** Dimensions du fichier source : elles réservent la place et évitent le saut de mise en page. */
  w: number;
  h: number;
};

/*
 * POUR AJOUTER UNE PHOTO
 * 1. Déposer le fichier dans `src/assets/` (JPEG ou WebP, ~1600px de large,
 *    compressé — les images sont servies telles quelles).
 * 2. L'importer en haut de ce fichier.
 * 3. Ajouter une entrée ci-dessous avec sa description et ses dimensions réelles.
 *
 * La mise en page s'adapte seule : la galerie est en colonnes maçonnées et
 * chaque photo garde ses proportions d'origine, quel que soit leur nombre.
 */
export const PHOTOS: Photo[] = [
  {
    src: heroImg,
    alt: "Le port de plaisance de Bonifacio la nuit vu depuis la terrasse du restaurant",
    w: 1920,
    h: 1280,
  },
  {
    src: dishImg,
    alt: "Filet de rouget dans son bouillon de poissons de roche safrané",
    w: 1024,
    h: 1280,
  },
  {
    src: langousteImg,
    alt: "Plateau doré de langoustes, gambas et moules grillées",
    w: 1024,
    h: 1024,
  },
  {
    src: terrasseImg,
    alt: "Tables dressées en terrasse au crépuscule, yachts amarrés en arrière-plan",
    w: 1280,
    h: 960,
  },
];
