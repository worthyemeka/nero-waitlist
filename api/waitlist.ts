import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.zoho.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_SECURE = (process.env.SMTP_SECURE ?? "true").toLowerCase() === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL ?? "Nero <no-reply@neroapp.co>";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
  tls: {
    minVersion: "TLSv1.2",
  },
});

function requireEnv(name: string, value?: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function saveWaitlistSignup(email: string): Promise<"created" | "exists"> {
  const supabaseUrl = requireEnv("SUPABASE_URL", SUPABASE_URL);
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY", SUPABASE_SERVICE_ROLE_KEY);

  const response = await fetch(`${supabaseUrl}/rest/v1/waitlist_signups`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email,
      source: "landing-page",
    }),
  });

  if (response.ok) {
    return "created";
  }

  if (response.status === 409) {
    return "exists";
  }

  const details = await response.text();
  throw new Error(`Supabase insert failed (${response.status}): ${details}`);
}

async function sendWelcomeEmail(email: string) {
  const smtpUser = requireEnv("SMTP_USER", SMTP_USER);
  requireEnv("SMTP_PASS", SMTP_PASS);

  await transporter.sendMail({
    from: FROM_EMAIL,
    to: email,
    replyTo: smtpUser,
    subject: "You're on the nēro waitlist 🎉",
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to nēro</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;max-width:560px;width:100%;">
                  <tr>
                    <td style="background-color:#0E0E2C;padding:40px 48px 32px;">
                      <p style="margin:0;font-size:28px;font-weight:600;color:#ffffff;letter-spacing:-0.5px;">nēro</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px 48px;">
                      <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#0E0E2C;letter-spacing:-0.5px;">
                        You're on the list.
                      </h1>
                      <p style="margin:0 0 24px;font-size:16px;color:#797C86;line-height:1.6;">
                        Thanks for joining the nēro waitlist. We're building something that makes managing your money actually feel effortless — and you'll be among the first to experience it.
                      </p>
                      <p style="margin:0 0 24px;font-size:16px;color:#797C86;line-height:1.6;">
                        We'll reach out as soon as your spot is ready.
                      </p>
                      <p style="margin:0;font-size:16px;color:#0E0E2C;font-weight:500;">
                        — The nēro team
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px 48px;border-top:1px solid #f0f0f0;">
                      <p style="margin:0;font-size:13px;color:#b0b3bb;">
                        You received this because you signed up at nero.app. No further emails unless we have news.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body as { email?: string };
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const state = await saveWaitlistSignup(normalizedEmail);

    if (state === "exists") {
      return res.status(200).json({ message: "You're already on the waitlist. We'll keep you posted." });
    }

    try {
      await sendWelcomeEmail(normalizedEmail);
      return res.status(200).json({ message: "You're on the waitlist! Check your inbox." });
    } catch (mailError) {
      console.error("SMTP send error:", mailError);
      return res.status(200).json({
        message: "You're on the waitlist, but we couldn't send your confirmation email right now.",
      });
    }
  } catch (error) {
    console.error("Waitlist handler error:", error);
    return res.status(500).json({ error: "Failed to send confirmation email. Please try again." });
  }
}
