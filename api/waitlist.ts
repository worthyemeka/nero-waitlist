import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.zoho.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_SECURE =
  (process.env.SMTP_SECURE ?? "true").toLowerCase() === "true";

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const FROM_EMAIL = process.env.FROM_EMAIL ?? "nēro <hello@neroapp.co>";
const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL ?? SMTP_USER;
const BROWSER_VIEW_URL =
  process.env.BROWSER_VIEW_URL ?? "https://waitlist.neroapp.co/browser-view";
const UNSUBSCRIBE_URL =
  process.env.UNSUBSCRIBE_URL ?? "https://waitlist.neroapp.co/unsubscribe";

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

let cachedCount: { count: number; expires: number } | null = null;

function getCachedCount(): number | null {
  if (cachedCount && cachedCount.expires > Date.now()) {
    return cachedCount.count;
  }

  return null;
}

function setCachedCount(count: number): void {
  cachedCount = {
    count,
    expires: Date.now() + 5 * 60 * 1000,
  };
}

async function getWaitlistCount(): Promise<number> {
  const cached = getCachedCount();

  if (cached !== null) {
    return cached;
  }

  const supabaseUrl = requireEnv("SUPABASE_URL", SUPABASE_URL);
  const serviceRoleKey = requireEnv(
    "SUPABASE_SERVICE_ROLE_KEY",
    SUPABASE_SERVICE_ROLE_KEY,
  );

  const response = await fetch(
    `${supabaseUrl}/rest/v1/waitlist_signups?select=count`,
    {
      method: "GET",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Prefer: "count=exact",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch count: ${response.status}`);
  }

  const contentRange = response.headers.get("content-range");

  if (contentRange) {
    const match = contentRange.match(/\/(\d+)$/);

    if (match) {
      const count = parseInt(match[1], 10);
      setCachedCount(count);
      return count;
    }
  }

  const data = await response.json();
  const count = Array.isArray(data) ? data.length : 0;

  setCachedCount(count);

  return count;
}

async function saveWaitlistSignup(email: string): Promise<"created" | "exists"> {
  const supabaseUrl = requireEnv("SUPABASE_URL", SUPABASE_URL);
  const serviceRoleKey = requireEnv(
    "SUPABASE_SERVICE_ROLE_KEY",
    SUPABASE_SERVICE_ROLE_KEY,
  );

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
    cachedCount = null;
    return "created";
  }

  if (response.status === 409) {
    return "exists";
  }

  const details = await response.text();

  throw new Error(`Supabase insert failed (${response.status}): ${details}`);
}

function buildPlainTextEmail(): string {
  return `
You're in!

Let's build this together.

Hey there,

We're really excited to have you here.

We're building something to help you spend with clarity on a daily basis and stop wondering where all your money went halfway through the month.

For now, sit tight. We'll keep you updated as we build and let you know the moment there's something new to see.

While you wait:

1. Join our WhatsApp community
Get early updates, testing invites, and first dibs on what's coming next.
https://chat.whatsapp.com/GmIOkXzIITu8knz6QHo45m?mode=gi_t

2. Follow us on Instagram
Watch nēro come to life.
https://www.instagram.com/getneroapp/

3. Follow us on LinkedIn
Catch the bigger picture.
https://www.linkedin.com/company/neroapp-ltd/

We'll be in touch soon.

Thanks for being one of the early believers.

The nēro team

You are receiving this because you joined the nēro waitlist.
Unsubscribe: ${UNSUBSCRIBE_URL}

© 2026 nēro. All rights reserved.
`.trim();
}

function buildWelcomeHtmlEmail(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're in! — nēro</title>
</head>

<body style="margin:0;padding:0;background-color:#FFFFFF;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFFFF;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;background-color:#0A0A0A;">

          <tr>
            <td style="text-align:center;padding:10px 20px;background-color:#FFFFFF;">
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#777777;line-height:1.5;">
                Having trouble viewing this email?
                <a href="${BROWSER_VIEW_URL}" style="color:#2A2A91;text-decoration:underline;">
                  View it in your browser
                </a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#0A0A0A;font-size:0;line-height:0;">
              <a href="https://waitlist.neroapp.co" target="_blank" style="display:block;text-decoration:none;">
                <img
                  src="https://res.cloudinary.com/dentghiic/image/upload/v1780264049/Hero_2x_cikqit.png"
                  alt="You're in! Let's build this together."
                  width="600"
                  style="display:block;width:100%;max-width:600px;height:auto;border:0;"
                />
              </a>
            </td>
          </tr>

          <tr>
            <td style="background-color:#0A0A0A;font-size:0;line-height:0;">
              <img
                src="https://res.cloudinary.com/dentghiic/image/upload/v1780271570/Body_buenuu.png"
                alt="Hey there. We're really excited to have you here."
                width="600"
                style="display:block;width:100%;max-width:600px;height:auto;margin:0 0 -16px 0;border:0;"
              />
            </td>
          </tr>

          <tr>
            <td
              background="https://res.cloudinary.com/dentghiic/image/upload/v1780264016/Cards_bg_szjabs.png"
              style="background-color:#0A0A0A;background-image:url('https://res.cloudinary.com/dentghiic/image/upload/v1780264016/Cards_bg_szjabs.png');background-size:cover;background-position:center top;background-repeat:no-repeat;padding:0;font-size:0;line-height:0;"
            >
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:0 40px;">

                    <a href="https://chat.whatsapp.com/GmIOkXzIITu8knz6QHo45m?mode=gi_t" target="_blank" style="text-decoration:none;display:block;">
                      <img
                        src="https://res.cloudinary.com/dentghiic/image/upload/v1780271570/feature_1_iakvb7.png"
                        alt="Join our WhatsApp community"
                        width="520"
                        style="display:block;width:100%;max-width:520px;height:auto;margin:0 0 28px 0;border:0;"
                      />
                    </a>

                    <a href="https://www.instagram.com/getneroapp/" target="_blank" style="text-decoration:none;display:block;">
                      <img
                        src="https://res.cloudinary.com/dentghiic/image/upload/v1780271571/feature_2_znjkfd.png"
                        alt="Follow us on Instagram"
                        width="520"
                        style="display:block;width:100%;max-width:520px;height:auto;margin:0 0 28px 0;border:0;"
                      />
                    </a>

                    <a href="https://www.linkedin.com/company/neroapp-ltd/" target="_blank" style="text-decoration:none;display:block;">
                      <img
                        src="https://res.cloudinary.com/dentghiic/image/upload/v1780271570/feature_3_pyd0ju.png"
                        alt="Follow us on LinkedIn"
                        width="520"
                        style="display:block;width:100%;max-width:520px;height:auto;margin:0 0 16px 0;border:0;"
                      />
                    </a>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:#0A0A0A;font-size:0;line-height:0;">
              <img
                src="https://res.cloudinary.com/dentghiic/image/upload/v1780271571/close_brcfhf.png"
                alt="We'll be in touch soon. Thanks for being one of the early believers. The nēro team."
                width="600"
                style="display:block;width:100%;max-width:600px;height:auto;border:0;"
              />
            </td>
          </tr>

          <tr>
            <td style="background-color:#0A0A0A;padding:28px 40px 36px 40px;text-align:center;font-family:Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 10px 0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.72);">
                You are receiving this because you joined the nēro waitlist.
              </p>

              <p style="margin:0 0 18px 0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.72);">
                If this is not for you, you can
                <a href="${UNSUBSCRIBE_URL}" style="color:#FFFFFF;text-decoration:underline;">
                  unsubscribe
                </a>
                anytime.
              </p>

              <p style="margin:0 0 10px 0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.72);">
                <a href="https://www.instagram.com/getneroapp/" style="color:#FFFFFF;text-decoration:underline;">Instagram</a>
                &nbsp;•&nbsp;
                <a href="https://www.linkedin.com/company/neroapp-ltd/" style="color:#FFFFFF;text-decoration:underline;">LinkedIn</a>
              </p>

              <p style="margin:0;font-size:11px;line-height:1.6;color:rgba(255,255,255,0.52);">
                © 2026 nēro. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

async function sendWelcomeEmail(email: string): Promise<void> {
  const smtpUser = requireEnv("SMTP_USER", SMTP_USER);
  requireEnv("SMTP_PASS", SMTP_PASS);

  await transporter.sendMail({
    from: FROM_EMAIL,
    to: email,
    replyTo: REPLY_TO_EMAIL || smtpUser,
    subject: "Welcome to nēro",
    text: buildPlainTextEmail(),
    html: buildWelcomeHtmlEmail(),
    headers: {
      "X-Entity-Ref-ID": "nero-waitlist",
      "List-Unsubscribe": `<${UNSUBSCRIBE_URL}>`,
    },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const count = await getWaitlistCount();
      return res.status(200).json({ count });
    } catch (error) {
      console.error("Waitlist count error:", error);
      return res.status(200).json({ count: 0 });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const { email } = req.body as { email?: string };
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
    return res.status(400).json({
      error: "Invalid email address",
    });
  }

  try {
    const state = await saveWaitlistSignup(normalizedEmail);

    if (state === "exists") {
      return res.status(200).json({
        message: "You're already on the waitlist. We'll keep you posted.",
      });
    }

    try {
      await sendWelcomeEmail(normalizedEmail);
    } catch (mailError) {
      console.error("SMTP send error:", mailError);
    }

    return res.status(200).json({
      message: "You're on the waitlist! Check your inbox.",
    });
  } catch (error) {
    console.error("Waitlist handler error:", error);
    return res.status(500).json({
      error: "Failed to send confirmation email. Please try again.",
    });
  }
}
