import { createContext, useContext, useMemo, type ReactNode } from "react";

import { fr, type Dict } from "./fr";
import { en } from "./en";
import { it } from "./it";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./locales";

const DICTS: Record<Locale, Dict> = { fr, en, it };

/**
 * Dictionnaire d'une langue, utilisable hors composant — la fonction `head`
 * des routes s'exécute côté serveur, en dehors de React, et doit pourtant
 * produire des titres et descriptions traduits pour le référencement.
 */
export function dictFor(locale: Locale | undefined): Dict {
  return DICTS[locale ?? DEFAULT_LOCALE] ?? fr;
}

/**
 * Normalise le paramètre d'URL. Le français étant la langue par défaut, son
 * URL ne porte pas de paramètre : `?lang=fr` est donc ramené à `undefined`
 * pour éviter deux URL distinctes servant la même page.
 */
export function normalizeLangParam(value: unknown): Locale | undefined {
  return isLocale(value) && value !== DEFAULT_LOCALE ? value : undefined;
}

type I18nValue = { locale: Locale; t: Dict };

const I18nContext = createContext<I18nValue>({ locale: DEFAULT_LOCALE, t: fr });

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<I18nValue>(() => ({ locale, t: dictFor(locale) }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  return useContext(I18nContext);
}

export type { Dict };
export { DEFAULT_LOCALE, isLocale };
export type { Locale };
