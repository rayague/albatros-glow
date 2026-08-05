export const LOCALES = ["fr", "en", "it"] as const;

export type Locale = (typeof LOCALES)[number];

/** Le français est la langue par défaut : son URL ne porte donc pas de paramètre. */
export const DEFAULT_LOCALE: Locale = "fr";

/** Étiquettes du sélecteur, et `lang`/`hreflang` correspondants. */
export const LOCALE_META: Record<Locale, { label: string; htmlLang: string; name: string }> = {
  fr: { label: "FR", htmlLang: "fr-FR", name: "Français" },
  en: { label: "EN", htmlLang: "en", name: "English" },
  it: { label: "IT", htmlLang: "it", name: "Italiano" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}
