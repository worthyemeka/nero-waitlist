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

  const path = require('path');
  const faviconPath = path.join(process.cwd(), 'public', 'favicon.png');
  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      replyTo: smtpUser,
      subject: "You're on the nēro waitlist 🎉",
      html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>You're in! — nēro</title>
    <!--[if mso]> <style>* { font-family: Arial, sans-serif !important; }</style> <![endif]-->
    <style>
      ...existing styles...
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#F8F7F7;">
    ...existing email body, but REMOVE all {{first_name}} and {{ unsubscribeUrl }} placeholders, just use plain text instead...
  </body>
</html>`,
      attachments: [
        {
          filename: 'favicon.png',
          path: faviconPath,
          cid: 'nero-avatar@neroapp.co',
        },
      ],
    });
  } catch (err) {
    console.error('Nodemailer sendMail error:', err);
    throw err;
  }
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
