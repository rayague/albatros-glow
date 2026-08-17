import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { Logo } from "@/components/Logo";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="mt-24 border-t border-border bg-[color-mix(in_oklab,var(--foam)_80%,white)] pb-32 pt-14 lg:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <p className="font-display text-xl tracking-[0.16em] text-sea-gradient">
              {t.nav.brand}
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t.footer.contact}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={SITE.phoneHref} className="hover:text-foreground">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>{t.site.hours}</li>
            <li>{t.site.season}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t.footer.navigate}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/carte" className="hover:text-foreground">
                {t.footer.menuLink}
              </Link>
            </li>
            <li>
              <Link to="/galerie" className="hover:text-foreground">
                {t.footer.galleryLink}
              </Link>
            </li>
            <li>
              <Link to="/reserver" className="hover:text-foreground">
                {t.footer.bookLink}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                {t.footer.contactLink}
              </Link>
            </li>
            <li>
              <Link to="/mentions-legales" className="hover:text-foreground">
                {t.footer.legalLink}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t.footer.follow}
          </h2>
          <div className="mt-3 flex gap-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={t.footer.instagramAria}
              className="glass grid h-11 w-11 place-items-center rounded-full text-foreground transition-transform hover:scale-105"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{SITE.legal}</p>
        </div>
      </div>
      <p className="mt-10 px-5 text-center text-xs text-muted-foreground">
        {t.footer.rights(new Date().getFullYear())}
      </p>
    </footer>
  );
}
