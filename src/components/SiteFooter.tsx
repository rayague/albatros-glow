import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-[color-mix(in_oklab,var(--abyss)_92%,black)] pb-32 pt-14 lg:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl tracking-[0.16em] text-gold-gradient">L'ALBATROS</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Brasserie chic sur le port de plaisance de Bonifacio. Produits frais, pêche locale,
            terroirs corses et méditerranéens.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Contact</h2>
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
            <li>{SITE.hours}</li>
            <li>{SITE.season}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Naviguer</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/carte" className="hover:text-foreground">
                La Carte
              </Link>
            </li>
            <li>
              <Link to="/galerie" className="hover:text-foreground">
                Galerie
              </Link>
            </li>
            <li>
              <Link to="/reserver" className="hover:text-foreground">
                Réserver une table
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Accès & contact
              </Link>
            </li>
            <li>
              <Link to="/mentions-legales" className="hover:text-foreground">
                Mentions légales & RGPD
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Suivez-nous</h2>
          <div className="mt-3 flex gap-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de L'Albatros"
              className="glass grid h-11 w-11 place-items-center rounded-full text-foreground transition-transform hover:scale-105"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook de L'Albatros"
              className="glass grid h-11 w-11 place-items-center rounded-full text-foreground transition-transform hover:scale-105"
            >
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{SITE.legal}</p>
        </div>
      </div>
      <p className="mt-10 px-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} L'Albatros — Bonifacio. Tous droits réservés.
      </p>
    </footer>
  );
}
