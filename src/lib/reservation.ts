import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { SITE } from "@/lib/site";
import { fr } from "@/lib/i18n/fr";
import type { Dict } from "@/lib/i18n/fr";

/** Bornes du service continu, utilisées côté client et côté serveur. */
const OPEN_HOUR = 11;
const CLOSE_HOUR = 23;

/** Date du jour à Bonifacio (Europe/Paris), au format YYYY-MM-DD. */
function todayInParis(): string {
  return new Intl.DateTimeFormat("fr-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/**
 * Une seule définition des règles, paramétrée par la langue des messages.
 *
 * Le client construit le schéma dans la langue affichée pour montrer les
 * erreurs au visiteur ; le serveur en construit un autre, en français, pour
 * revalider la demande. Les deux passent par cette fonction : les règles ne
 * peuvent donc pas diverger, seule la formulation change.
 */
export function buildReservationSchema(t: Dict) {
  const e = t.booking.errors;
  return z.object({
    nom: z.string().trim().min(2, e.name).max(80, e.nameLong),
    tel: z.string().trim().min(6, e.phone).max(30, e.phone),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, e.date)
      .refine((d) => d >= todayInParis(), e.datePast),
    heure: z
      .string()
      .regex(/^\d{2}:\d{2}$/, e.time)
      .refine(
        (h) => {
          const hour = Number(h.slice(0, 2));
          return hour >= OPEN_HOUR && hour < CLOSE_HOUR;
        },
        e.timeRange(OPEN_HOUR, CLOSE_HOUR),
      ),
    couverts: z.coerce.number().int(e.guests).min(1, e.guestsMin).max(20, e.guestsMax),
    email: z.union([z.literal(""), z.string().trim().email(e.email)]),
    message: z.string().trim().max(1000, e.messageLong).optional(),
    /** Piège à robots : un humain ne remplit jamais ce champ masqué. */
    societe: z.string().max(0).optional(),
  });
}

/** Schéma de référence côté serveur : ses messages ne sont jamais affichés. */
export const reservationSchema = buildReservationSchema(fr);

export type ReservationInput = z.input<typeof reservationSchema>;
export type Reservation = z.output<typeof reservationSchema>;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    // Volontairement bruyant : sans configuration, une demande serait perdue en
    // silence alors que le visiteur croit sa table réservée.
    throw new Error(
      `Configuration d'envoi incomplète : ${name} est absent des variables d'environnement.`,
    );
  }
  return value;
}

function buildEmail(data: Reservation) {
  const lignes = [
    `Nom          : ${data.nom}`,
    `Téléphone    : ${data.tel}`,
    `Date         : ${data.date}`,
    `Heure        : ${data.heure}`,
    `Couverts     : ${data.couverts}`,
    `E-mail       : ${data.email || "non communiqué"}`,
    "",
    "Demande particulière :",
    data.message?.trim() || "(aucune)",
  ];
  return {
    subject: `Réservation ${data.date} ${data.heure} — ${data.nom} (${data.couverts} couv.)`,
    text: lignes.join("\n"),
  };
}

export const sendReservation = createServerFn({ method: "POST" })
  .validator(reservationSchema)
  .handler(async ({ data }) => {
    // Le piège à robots a été rempli : on renvoie un succès neutre sans rien
    // envoyer, pour ne pas indiquer au spammeur comment contourner le filtre.
    if (data.societe) return { ok: true as const };

    const apiKey = requireEnv("RESEND_API_KEY");
    const to = requireEnv("RESERVATION_TO_EMAIL");
    const from = requireEnv("RESERVATION_FROM_EMAIL");
    const { subject, text } = buildEmail(data);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        ...(data.email ? { reply_to: data.email } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Envoi refusé par Resend (${res.status}). ${detail.slice(0, 300)}`.trim());
    }

    return { ok: true as const, phone: SITE.phoneDisplay };
  });
