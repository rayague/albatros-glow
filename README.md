# Golden Tide

# BRIEF DE CONCEPTION — Refonte Premium "L'Albatros" (Bonifacio)
### Niveau visé : Awwwards / Dribbble top-tier — Mobile-first — Glassmorphism paroxystique

---

## 1. CONTEXTE & CONTENU RÉEL INDEXÉ (site actuel)

**Établissement**
- Nom commercial : L'Albatros
- Raison sociale : AUX PETITS GOURMETS (SASU) — SIREN 892139759 — RCS Ajaccio
- Adresse restaurant : 47 Quai Comparetti, 20169 Bonifacio, Corse
- Téléphone officiel à retenir (unifier, le site actuel en montre 3 différents par erreur) : **+33 4 95 77 17 68**
- Horaires : service continu, 11h00 – 23h00, **7j/7**
- Réseaux : Facebook, Instagram (@restaurantlalbatrosbonifacio)
- Ouverture de saison annoncée : 1er avril

**Positionnement / storytelling**
- Restaurant sur le port de plaisance de Bonifacio, terrasse abritée face aux voiliers
- Histoire depuis 2021, nouvelle direction en 2026
- Décoration imaginée par **Marie-Claire Luciani**
- Cuisine dirigée par le **Chef Omar**, salle dirigée par **Julien** (maître d'hôtel)
- Style culinaire : "brasserie chic", produits frais et locaux, circuits courts, terroirs corses et méditerranéens
- Couleurs de marque évoquées dans les textes existants : **bleu et or** (mer + coucher de soleil sur la marina)

**Spécialités mentionnées (à valoriser visuellement)**
- Soupe de poissons de roche
- Poisson frais de la pêche locale du jour
- Bouillabaisse maison (sur commande, pour 2 personnes)
- Tartare de poisson
- Thon snacké
- Langouste
- Fritto misto
- Sauté de veau aux olives (pour les non-poisson)
- Moelleux à la châtaigne (dessert signature corse)

**Problèmes identifiés sur le site actuel à corriger dans la refonte**
1. Lien "La Carte" cassé — redirige vers la page d'accueil du prestataire WhatisEAT au lieu du vrai menu → **la nouvelle carte doit être hébergée nativement sur le site**, pas externalisée.
2. Numéros de téléphone incohérents selon les pages → un seul numéro, partout, cliquable en `tel:`.
3. Images sans texte alternatif → accessibilité et SEO à corriger.
4. Aucun système de réservation en ligne → à intégrer (CTA fixe).
5. Site mono-langue (FR uniquement) alors que Bonifacio est très touristique → prévoir au minimum FR/EN/IT en structure (même si le contenu initial reste FR).

---

## 2. DIRECTION ARTISTIQUE

**Concept général** : "Nuit méditerranéenne sur la marina" — verre, lumière, profondeur, mouvement de l'eau.

**Palette**
- Bleu nuit profond (base) : `#0B1B2B` → `#0F2942`
- Bleu marine translucide (glass) : `rgba(15, 41, 66, 0.45)`
- Or / laiton (accent, CTA, détails) : `#C9A24B` → `#E8C874`
- Blanc cassé lumineux (texte sur fond sombre) : `#F5F2EA`
- Touche corail/rosé discrète pour les CTA secondaires (coucher de soleil) : `#E8896B`

**Typographie**
- Titres : serif contemporaine élégante (ex. familles type "Fraunces", "Canela" ou équivalent variable font) — évoque le raffinement "brasserie chic"
- Corps de texte : sans-serif géométrique très lisible (ex. "Inter", "General Sans") pour contraste net avec le serif
- Hiérarchie stricte H1 > H2 > H3, jamais de saut de niveau (correction du défaut du site actuel)

**Glassmorphism — règles précises**
- `backdrop-filter: blur(20px) saturate(180%)`
- Fond translucide : `background: rgba(255,255,255,0.08)` sur fond sombre, bordure `1px solid rgba(255,255,255,0.18)`
- Ombre portée douce pour donner de la profondeur, jamais de flat design pur
- Le glass ne doit JAMAIS être appliqué sur un bloc de texte long (menu, allergènes) → contraste WCAG AA minimum obligatoire à vérifier partout

---

## 3. PRELOADER — SPÉCIFICATION ANIMÉE (3 secondes)

**Concept : "Ciel étoilé qui s'assemble en globe rotatif"**

Séquence détaillée :
- **T0 → T0.8s** : fond noir/bleu nuit profond, particules (étoiles) dispersées aléatoirement sur tout le viewport, forte luminosité, légère variation d'intensité (scintillement/twinkle) sur chaque particule, tailles variables (1-3px)
- **T0.8s → T2.2s** : chaque particule interpole sa position (easing type `cubic-bezier(0.65, 0, 0.35, 1)`) vers un point calculé sur une sphère 3D virtuelle (répartition type Fibonacci sphere pour un semis homogène) → effet d'attraction gravitationnelle progressive, pas un simple fondu
- **T2.2s → T3s** : le globe formé entame une rotation continue sur son axe Y (vitesse lente, ~20s/tour en régime établi), le logo "L'Albatros" apparaît en fondu au centre ou sous le globe
- **Sortie** : fondu enchaîné du preloader vers le hero (masque radial qui s'ouvre depuis le centre du globe, pas un simple opacity fade)

**Techno recommandée** : Canvas 2D ou WebGL léger (three.js en points/`Points` + `BufferGeometry`, ou simple Canvas API si on veut rester ultra-léger sans dépendance). Éviter absolument le lag sur mobile d'entrée de gamme : limiter à 300-500 particules max sur mobile, jusqu'à 1500 sur desktop, avec détection de performance (`navigator.hardwareConcurrency` ou test de frame-rate au premier rendu).
**Doit être skippable** après 1.5s (tap n'importe où) pour les visiteurs pressés — important pour un site de restaurant consulté en mobilité.

---

## 4. NAVIGATION — MOBILE FIRST

**Mobile & tablette (< 1024px)**
- Barre de navigation **fixe en bas d'écran**, flottante (pas collée aux bords, marge ~12px), glassmorphique au maximum (blur fort, bordure lumineuse fine dorée)
- 4-5 icônes max : Accueil / Carte / Réserver (CTA central mis en valeur, légèrement surélevé façon "bouton flottant") / Galerie / Contact
- Micro-animation au tap : scale + glow doré, transition fluide type spring (`cubic-bezier` ou vraie physique spring si framer-motion/GSAP)
- Indicateur de section active animé (pas juste un changement de couleur statique — un liquide/blob qui glisse entre les icônes)

**Desktop (≥ 1024px)**
- Nav horizontale classique en haut, elle aussi glassmorphique au scroll (transparente en haut de page, devient glass au scroll avec `blur` progressif lié au scroll offset)

---

## 5. STRUCTURE DES SECTIONS & ANIMATIONS ATTENDUES

1. **Hero** : vidéo ou séquence de photos en fond (terrasse, voiliers, plats), parallax léger au scroll, titre en reveal caractère par caractère ou par mot (style split-text), CTA "Réserver une table" toujours visible
2. **L'histoire / Notre philosophie** : scroll-triggered storytelling, texte qui apparaît en fondu-translation à mesure du scroll, photos avec effet de parallax profondeur (2-3 couches)
3. **La Carte** (hébergée nativement, plus de redirection externe) : cards par catégorie (Entrées / Poissons / Viandes / Desserts) avec micro-interactions au survol/tap (léger tilt 3D façon `perspective` + glass au hover), filtrage animé par catégorie
4. **Galerie** : grille masonry animée, ouverture en lightbox avec transition morphing (l'image grossit depuis sa position d'origine, pas un simple modal qui apparaît)
5. **L'équipe** (Chef Omar, Julien, Marie-Claire Luciani) : cartes avec reveal au scroll, effet glass au survol
6. **Localisation / Contact** : carte stylisée (thème sombre custom Mapbox/Google Maps pour matcher la palette), infos pratiques dans un bloc glass fixe, bouton d'appel direct
7. **Footer** : mentions légales, RGPD, réseaux sociaux, tout doit rester accessible et lisible malgré le style sombre

---

## 6. STACK TECHNIQUE RECOMMANDÉE
- Framework : Next.js (SSR/SSG pour le SEO — critique, l'ancien site indexe mal)
- Animations : Framer Motion (transitions de sections) + GSAP/ScrollTrigger (scroll storytelling) + Three.js ou Canvas custom (preloader globe)
- Style : Tailwind CSS + variables CSS custom pour le design system glass
- Images : formats AVIF/WebP, lazy-loading, `next/image`
- Perf cible : Lighthouse mobile ≥ 90 malgré les animations (budget de performance à respecter dès le début, pas en rattrapage)
- Accessibilité : contrastes AA vérifiés sur chaque overlay glass, `prefers-reduced-motion` respecté (version allégée des animations pour les utilisateurs qui le demandent)

---

## 7. CE QUI FERA LA DIFFÉRENCE (niveau Awwwards)
- Curseur custom sur desktop (magnétique sur les CTA)
- Transitions de page fluides (pas de rechargement blanc entre les sections/routes)
- Son ambiant discret optionnel (vagues/port), coupé par défaut, toggle visible
- Cohérence totale : chaque micro-interaction doit raconter "mer, verre, lumière, or" — rien de gratuit

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/09a947c3-8a2e-413c-8826-664b9b0c8349).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
