import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { CalendarHeart, Home, Images, Phone, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { useI18n, type Dict } from "@/lib/i18n";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META } from "@/lib/i18n/locales";

type NavItem = {
  to: "/" | "/carte" | "/reserver" | "/galerie" | "/contact";
  label: (t: Dict) => string;
  Icon: typeof Home;
  cta?: boolean;
};

const items: NavItem[] = [
  { to: "/", label: (t) => t.nav.home, Icon: Home },
  { to: "/carte", label: (t) => t.nav.menu, Icon: UtensilsCrossed },
  { to: "/reserver", label: (t) => t.nav.book, Icon: CalendarHeart, cta: true },
  { to: "/galerie", label: (t) => t.nav.gallery, Icon: Images },
  { to: "/contact", label: (t) => t.nav.contact, Icon: Phone },
];

const isActive = (to: NavItem["to"], pathname: string) =>
  to === "/" ? pathname === "/" : pathname.startsWith(to);

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // -1 sur les pages hors dock (mentions légales) : le blob s'efface au lieu de
  // désigner un onglet qui n'est pas la page courante.
  const matchedIndex = items.findIndex((i) => isActive(i.to, pathname));
  const activeIndex = matchedIndex === -1 ? 0 : matchedIndex;
  const blobVisible = matchedIndex !== -1;

  // Ressort volontairement peu amorti : le blob dépasse légèrement sa cible
  // avant de se poser, ce qui donne la sensation "liquide" demandée.
  const blobSpring = reduced
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 380, damping: 30, mass: 0.9 } as const);

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        {t.nav.skipToContent}
      </a>

      {/* ─────────────  Desktop  ───────────── */}
      {/*
        Le verre vit dans un calque dédié dont on anime l'opacité, plutôt que
        d'interpoler `backdrop-filter` de `none` à `blur(24px)` : le rayon de flou
        variable force le compositeur à refaire la passe de blur à chaque frame
        (coûteux sur mobile), là où une opacité reste purement compositée.
        Le calque porte aussi la bordure, ce qui évite le décalage d'1px du
        contenu quand `border-b` apparaissait au scroll.
      */}
      <header className="fixed inset-x-0 top-0 z-50 hidden lg:block">
        <span
          aria-hidden="true"
          className={`glass-strong absolute inset-0 border-x-0 border-t-0 transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          aria-label={t.nav.mainNavAria}
          className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4"
        >
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <Logo size="md" />
            <span className="font-display text-xl tracking-[0.16em] text-sea-gradient">
              {t.nav.brand}
            </span>
            <span className="ml-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {t.nav.city}
            </span>
          </Link>

          <ul className="flex items-center gap-1">
            {items
              .filter((i) => !i.cta)
              .map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    activeOptions={{ exact: to === "/" }}
                    className="relative block px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
                  >
                    {label(t)}
                    {isActive(to, pathname) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="hairline-gold absolute inset-x-3 -bottom-0.5 h-px"
                      />
                    )}
                  </Link>
                </li>
              ))}
          </ul>

          <div className="flex items-center gap-3">
            <LangSwitch />
            <a
              href={SITE.phoneHref}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {SITE.phoneDisplay}
            </a>
            <Link
              to="/reserver"
              data-magnetic
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
            >
              {t.nav.book}
            </Link>
          </div>
        </nav>
      </header>

      {/* ─────────────  Mobile : barre de marque  ───────────── */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 lg:hidden">
        <div className="pointer-events-auto relative mx-3 mt-3 rounded-2xl">
          <span
            aria-hidden="true"
            className={`glass-dock edge-gold absolute inset-0 rounded-2xl transition-opacity duration-500 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="relative flex items-center justify-between gap-3 px-4 py-2.5">
            <Link
              to="/"
              className="flex min-w-0 items-center gap-2.5 leading-none"
              aria-label={t.nav.homeAria}
            >
              <Logo size="sm" />
              <span className="min-w-0">
                <span className="block font-display text-base tracking-[0.18em] text-sea-gradient">
                  {t.nav.brand}
                </span>
                <span className="mt-1 block text-[8px] uppercase tracking-[0.34em] text-muted-foreground">
                  {t.nav.city}
                </span>
              </span>
            </Link>

            <div className="flex shrink-0 items-center gap-2">
              <LangSwitch compact />
              <a
                href={SITE.phoneHref}
                aria-label={t.nav.callAria(SITE.phoneDisplay)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_oklab,var(--teal)_35%,transparent)] bg-[color-mix(in_oklab,var(--lagoon)_16%,transparent)] text-teal transition-transform duration-300 active:scale-90"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────  Mobile : dock flottant  ───────────── */}
      <nav
        aria-label={t.nav.mainNavAria}
        className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="glass-dock edge-gold relative mx-4 rounded-[26px] pb-2 pt-2.5">
          {/* Halo doré qui suit l'onglet actif, posé sous le verre. */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/5"
            animate={{ x: `${activeIndex * 100}%`, opacity: blobVisible ? 1 : 0 }}
            transition={blobSpring}
          >
            <span className="absolute inset-x-2 -bottom-2 top-1 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--lagoon)_60%,transparent),transparent_70%)] blur-lg" />
          </motion.span>

          {/* Le blob liquide lui-même. */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-1.5 left-0 w-1/5 px-1.5"
            animate={{ x: `${activeIndex * 100}%`, opacity: blobVisible ? 1 : 0 }}
            transition={blobSpring}
          >
            <span className="block h-full w-full rounded-[19px] border border-[color-mix(in_oklab,var(--teal)_38%,transparent)] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--lagoon)_30%,transparent),color-mix(in_oklab,var(--lagoon)_12%,transparent))]" />
          </motion.span>

          <ul className="relative grid grid-cols-5">
            {items.map(({ to, label, Icon, cta }) => {
              const active = isActive(to, pathname);
              return (
                <li key={to} className="flex justify-center">
                  <Link
                    to={to}
                    aria-current={active ? "page" : undefined}
                    className="group flex min-h-11 w-full flex-col items-center justify-end gap-1.5 px-0.5 pb-0.5 pt-1"
                  >
                    {/*
                      Le CTA occupe la même boîte de 32px que les autres icônes ; le disque
                      doré est sorti du flux en absolu pour déborder au-dessus du dock sans
                      déformer la grille (une marge négative serait réabsorbée par le
                      `justify-end` du lien).
                    */}
                    <span
                      className={
                        cta
                          ? "relative grid h-8 w-8 place-items-center"
                          : `grid h-8 w-8 place-items-center transition-[color,transform] duration-300 group-active:scale-90 ${
                              active ? "text-accent" : "text-dock-label"
                            }`
                      }
                    >
                      {cta ? (
                        <span className="absolute -top-8 grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-cta)] text-primary-foreground shadow-[0_12px_28px_-8px_color-mix(in_oklab,var(--teal)_60%,transparent),inset_0_1px_0_rgba(255,255,255,0.35)] ring-[3px] ring-[color-mix(in_oklab,var(--shell)_92%,transparent)] transition-transform duration-300 group-active:scale-90">
                          <Icon className="h-6 w-6" strokeWidth={1.9} aria-hidden="true" />
                        </span>
                      ) : (
                        <Icon
                          className="h-[1.15rem] w-[1.15rem]"
                          strokeWidth={active ? 2.2 : 1.75}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span
                      className={`text-[10px] leading-none tracking-[0.02em] transition-colors duration-300 ${
                        active ? "text-foreground" : "text-dock-label"
                      }`}
                    >
                      {label(t)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}

/**
 * Sélecteur de langue. Il navigue vers la page courante en changeant le seul
 * paramètre `lang`, ce qui conserve la route, l'historique et le défilement.
 * Le français, langue par défaut, retire le paramètre plutôt que d'écrire
 * `?lang=fr` : une seule URL par page et par langue.
 */
function LangSwitch({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const { locale, t } = useI18n();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-border p-0.5"
      role="group"
      aria-label={t.nav.languageAria}
    >
      {LOCALES.map((l) => {
        const current = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={LOCALE_META[l].htmlLang}
            onClick={() =>
              navigate({
                to: ".",
                search: (prev: Record<string, unknown>) => ({
                  ...prev,
                  lang: l === DEFAULT_LOCALE ? undefined : l,
                }),
                replace: true,
                resetScroll: false,
              })
            }
            aria-current={current ? "true" : undefined}
            title={LOCALE_META[l].name}
            className={`rounded-full tracking-widest transition-colors ${
              compact ? "px-1.5 py-1 text-[10px]" : "px-2 py-1 text-[11px]"
            } ${
              current
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {LOCALE_META[l].label}
            <span className="sr-only"> — {LOCALE_META[l].name}</span>
          </button>
        );
      })}
    </div>
  );
}
