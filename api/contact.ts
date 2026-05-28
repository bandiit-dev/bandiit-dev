import { Resend } from "resend";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  message?: string;
  locale?: string;
  preferredContactMethod?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const normalizeString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const validatePayload = (payload: ContactPayload) => {
  const name = normalizeString(payload.name);
  const email = normalizeString(payload.email);
  const company = normalizeString(payload.company);
  const website = normalizeString(payload.website);
  const message = normalizeString(payload.message);
  const locale = normalizeString(payload.locale) || "pt-BR";
  const preferredContactMethod = normalizeString(payload.preferredContactMethod);

  if (!name || name.length < 2) return { valid: false as const };
  if (!email || !EMAIL_REGEX.test(email)) return { valid: false as const };
  if (website && !isValidUrl(website)) return { valid: false as const };
  if (!message || message.length < 10) return { valid: false as const };

  return {
    valid: true as const,
    data: {
      name,
      email,
      company,
      website,
      message,
      locale,
      preferredContactMethod,
    },
  };
};

const isPtBr = (locale: string) => locale.toLowerCase() === "pt-br";

const buildSubject = (locale: string, name: string) =>
  isPtBr(locale)
    ? `[Site] Novo contato de ${name}`
    : `[Website] New contact request from ${name}`;

const buildTextBody = (data: {
  name: string;
  email: string;
  company: string;
  website: string;
  message: string;
  locale: string;
}) => {
  const companyLine = data.company || "-";
  const websiteLine = data.website || "-";

  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${companyLine}`,
    `Website: ${websiteLine}`,
    `Locale: ${data.locale}`,
    "",
    "Needed reasons / Message:",
    data.message,
  ].join("\n");
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_EMAIL_TO;
  const contactFrom = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !contactTo || !contactFrom) {
    console.error("Missing contact email environment variables");
    return res.status(500).json({ error: "Configuration error" });
  }

  const validation = validatePayload((req.body ?? {}) as ContactPayload);

  if (!validation.valid) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  if (validation.data.preferredContactMethod) {
    return res.status(200).json({ ok: true });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: contactFrom,
      to: contactTo,
      replyTo: validation.data.email,
      subject: buildSubject(validation.data.locale, validation.data.name),
      text: buildTextBody(validation.data),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
