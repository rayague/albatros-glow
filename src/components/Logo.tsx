import logoSrc from "@/assets/Logo_albatros.png";
import { useI18n } from "@/lib/i18n";

/**
 * Marque officielle.
 *
 * ATTENTION — le fichier fourni ne fait que 118 × 112 px. Au-delà de 56 px
 * d'affichage il devient flou sur les écrans à haute densité, où un pixel CSS
 * vaut deux pixels réels. Les tailles proposées ici s'arrêtent donc à cette
 * limite ; pour un usage plus grand (hero, partage social, favicon) il faut un
 * SVG ou un PNG d'au moins 1000 px.
 */
const SIZES = {
  sm: "h-9 w-9", // 36px — barre de marque mobile
  md: "h-11 w-11", // 44px — nav desktop, pied de page
  lg: "h-14 w-14", // 56px — plafond net du fichier actuel
} as const;

export function Logo({
  size = "md",
  className = "",
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <img
      src={logoSrc}
      alt={t.nav.logoAlt}
      width={118}
      height={112}
      decoding="async"
      className={`${SIZES[size]} shrink-0 object-contain ${className}`}
    />
  );
}
