import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { SITE } from "@/lib/site";

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

export const reservationSchema = z.object({
  nom: z.string().trim().min(2, "Merci d'indiquer votre nom.").max(80, "Nom trop long."),
  tel: z
    .string()
    .trim()
    .min(6, "Numéro de téléphone invalide.")
    .max(30, "Numéro de téléphone invalide."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide.")
    .refine((d) => d >= todayInParis(), "Cette date est déjà passée."),
  heure: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Heure invalide.")
    .refine((h) => {
      const hour = Number(h.slice(0, 2));
      return hour >= OPEN_HOUR && hour < CLOSE_HOUR;
    }, `Nous servons de ${OPEN_HOUR}h à ${CLOSE_HOUR}h.`),
  couverts: z.coerce
    .number()
    .int("Nombre de couverts invalide.")
    .min(1, "Au moins un couvert.")
    .max(20, "Au-delà de 20 couverts, appelez-nous directement."),
  email: z.union([z.literal(""), z.string().trim().email("Adresse e-mail invalide.")]),
  message: z.string().trim().max(1000, "Message trop long.").optional(),
  /** Piège à robots : un humain ne remplit jamais ce champ masqué. */
  societe: z.string().max(0).optional(),
});

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
