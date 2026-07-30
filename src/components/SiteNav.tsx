import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CalendarHeart, Home, Images, Phone, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const items = [
  { to: "/", label: "Accueil", Icon: Home },
  { to: "/carte", label: "Carte", Icon: UtensilsCrossed },
  { to: "/reserver", label: "Réserver", Icon: CalendarHeart, cta: true },
  { to: "/galerie", label: "Galerie", Icon: Images },
  { to: "/contact", label: "Contact", Icon: Phone },
] as const;

const langs = ["FR", "EN", "IT"] as const;

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<(typeof langs)[number]>("FR");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop */}
      <header
        className={`fixed inset-x-0 top-0 z-50 hidden transition-all duration-500 lg:block ${
          scrolled ? "glass-strong border-b" : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Navigation principale"
          className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4"
        >
          <Link to="/" className="min-w-0">
            <span className="font-display text-xl tracking-[0.16em] text-gold-gradient">
              L'ALBATROS
            </span>
            <span className="ml-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Bonifacio
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
                    {label}
                    {pathname === to && (
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
            <div
              className="flex items-center gap-1 rounded-full border border-border p-0.5"
              role="group"
              aria-label="Langue du site"
            >
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-2 py-1 text-[11px] tracking-widest transition-colors ${
                    lang === l
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href={SITE.phoneHref}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {SITE.phoneDisplay}
            </a>
            <Link
              to="/reserver"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
            >
              Réserver
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile / tablette */}
      <nav
        aria-label="Navigation principale"
        className="glass-strong fixed inset-x-3 bottom-3 z-50 rounded-3xl px-2 py-2 lg:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <ul className="grid grid-cols-5 items-end">
          {items.map(({ to, label, Icon, cta }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <li key={to} className="flex justify-center">
                <Link
                  to={to}
                  aria-label={label}
                  aria-current={active ? "page" : undefined}
                  className="group relative flex min-h-11 min-w-11 flex-col items-center justify-end gap-1 px-1 py-1"
                >
                  {active && !cta && (
                    <motion.span
                      layoutId="nav-blob"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-x-1 bottom-0 top-0 -z-10 rounded-2xl border border-[color-mix(in_oklab,var(--gold)_45%,transparent)] bg-[color-mix(in_oklab,var(--gold)_14%,transparent)]"
                    />
                  )}
                  <span
                    className={`grid place-items-center rounded-2xl transition-all duration-300 active:scale-90 ${
                      cta
                        ? "-mt-7 h-14 w-14 bg-primary text-primary-foreground shadow-[0_10px_30px_-8px_color-mix(in_oklab,var(--gold)_70%,transparent)]"
                        : `h-8 w-8 ${active ? "text-accent" : "text-muted-foreground"}`
                    }`}
                  >
                    <Icon className={cta ? "h-6 w-6" : "h-5 w-5"} aria-hidden="true" />
                  </span>
                  <span
                    className={`text-[10px] tracking-wide ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
