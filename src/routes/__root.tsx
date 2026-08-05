import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  retainSearchParams,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { I18nProvider, dictFor, normalizeLangParam, useI18n } from "@/lib/i18n";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/locales";

/** Langue effective de la page, lue depuis l'URL. */
function useLocale(): Locale {
  return useRouterState({
    select: (s) => {
      const search = s.matches[0]?.search as { lang?: Locale } | undefined;
      return search?.lang ?? DEFAULT_LOCALE;
    },
  });
}

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <h1 className="font-display text-6xl text-sea-gradient">404</h1>
        <h2 className="mt-4 text-lg font-semibold">{t.notFound.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.notFound.text}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            {t.notFound.home}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useI18n();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <h1 className="text-xl font-semibold tracking-tight">{t.error.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.error.text}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            {t.error.retry}
          </button>
          <a href="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium">
            {t.error.home}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  /*
   * La langue vit dans l'URL plutôt que dans un cookie ou un état client : le
   * serveur la connaît donc au rendu, ce qui évite toute divergence à
   * l'hydratation et rend chaque version partageable et indexable.
   */
  validateSearch: (search: Record<string, unknown>): { lang?: Locale } => {
    const lang = normalizeLangParam(search.lang);
    return lang ? { lang } : {};
  },
  /*
   * Conserve `lang` à chaque navigation. C'est ce qui fait que la langue suit
   * l'utilisateur sur toutes les pages sans avoir à toucher un seul <Link>.
   */
  search: { middlewares: [retainSearchParams(["lang"])] },

  head: ({ match, matches }) => {
    const locale = (match.search as { lang?: Locale }).lang ?? DEFAULT_LOCALE;
    const t = dictFor(locale);
    const meta = LOCALE_META[locale];
    /*
     * `match` est ici la route racine, dont le chemin vaut toujours "/" : s'en
     * servir ferait pointer tous les `hreflang` vers l'accueil. Le chemin réel
     * est celui de la dernière route de la pile.
     */
    const pathname = matches[matches.length - 1]?.pathname ?? match.pathname;

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: t.meta.rootTitle },
        { name: "description", content: t.meta.rootDescription },
        { name: "author", content: "L'Albatros — Bonifacio" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: meta.htmlLang.replace("-", "_") },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "theme-color", content: "#F4FCFC" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600&display=swap",
        },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        // Déclare les versions traduites aux moteurs de recherche.
        ...LOCALES.map((l) => ({
          rel: "alternate",
          hrefLang: LOCALE_META[l].htmlLang,
          href: `${pathname}${l === DEFAULT_LOCALE ? "" : `?lang=${l}`}`,
        })),
        { rel: "alternate", hrefLang: "x-default", href: pathname },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: "L'Albatros",
            servesCuisine: ["Méditerranéenne", "Corse", "Poissons"],
            telephone: "+33495771768",
            priceRange: "€€",
            address: {
              "@type": "PostalAddress",
              streetAddress: "47 Quai Comparetti",
              postalCode: "20169",
              addressLocality: "Bonifacio",
              addressCountry: "FR",
            },
            openingHours: "Mo-Su 11:00-23:00",
          }),
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const locale = useLocale();
  return (
    // `lang` doit suivre la langue affichée : c'est ce qui indique aux lecteurs
    // d'écran quelle voix employer et aux moteurs quelle version indexer.
    <html lang={LOCALE_META[locale].htmlLang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const locale = useLocale();
  const [loaded, setLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider locale={locale}>
        <CustomCursor />
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
        <SiteNav />
        <main id="contenu" className="lg:pt-20">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <SiteFooter />
      </I18nProvider>
    </QueryClientProvider>
  );
}
