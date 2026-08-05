import heroImg from "@/assets/hero-marina.jpg";
import terrasseImg from "@/assets/terrasse.jpg";
import dishImg from "@/assets/dish-poisson.jpg";
import langousteImg from "@/assets/langouste.jpg";

export type PhotoId = "port" | "rouget" | "langoustes" | "terrasse";

export type Photo = {
  /**
   * Repère la description dans les dictionnaires (`gallery.photos`). Le texte
   * alternatif est traduit : c'est du contenu lu par les lecteurs d'écran et
   * indexé par les moteurs, il doit suivre la langue de la page.
   */
  id: PhotoId;
  src: string;
  /** Dimensions du fichier source : elles réservent la place et évitent le saut de mise en page. */
  w: number;
  h: number;
};

/*
 * POUR AJOUTER UNE PHOTO
 * 1. Déposer le fichier dans `src/assets/` (JPEG ou WebP, ~1600px de large,
 *    compressé — les images sont servies telles quelles).
 * 2. L'importer en haut de ce fichier et ajouter une entrée ci-dessous.
 * 3. Ajouter son identifiant au type `PhotoId`, puis sa description dans
 *    `gallery.photos` des trois dictionnaires (fr, en, it). TypeScript
 *    signalera toute langue oubliée.
 *
 * La mise en page s'adapte seule : la galerie est en colonnes maçonnées et
 * chaque photo garde ses proportions d'origine, quel que soit leur nombre.
 */
export const PHOTOS: Photo[] = [
  { id: "port", src: heroImg, w: 1920, h: 1280 },
  { id: "rouget", src: dishImg, w: 1024, h: 1280 },
  { id: "langoustes", src: langousteImg, w: 1024, h: 1024 },
  { id: "terrasse", src: terrasseImg, w: 1280, h: 960 },
];
