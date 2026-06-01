import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.zoho.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_SECURE =
  (process.env.SMTP_SECURE ?? "true").toLowerCase() === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL ?? "nēro <hello@neroapp.co>";

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
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

let cachedCount: { count: number; expires: number } | null = null;

function getCachedCount(): number | null {
  if (cachedCount && cachedCount.expires > Date.now()) return cachedCount.count;
  return null;
}

function setCachedCount(count: number): void {
  cachedCount = { count, expires: Date.now() + 5 * 60 * 1000 };
}

async function getWaitlistCount(): Promise<number> {
  const cached = getCachedCount();
  if (cached !== null) return cached;

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

  if (response.ok) return "created";
  if (response.status === 409) return "exists";

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
    subject: "You're on the nēro waitlist",
    headers: {
      "X-Entity-Ref-ID": "nero-waitlist",
    },
    text: `
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
    `.trim(),
    html: `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
  <title>You're in! — nēro</title>

  <style type="text/css">
    body,
    table,
    td,
    p,
    a,
    li,
    blockquote {
      -webkit-text-size-adjust: 100% !important;
      -ms-text-size-adjust: 100% !important;
    }

    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      min-width: 100% !important;
      background-color: #FFFFFF !important;
    }

    table {
      border-collapse: collapse !important;
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }

    img {
      border: 0 !important;
      display: block !important;
      line-height: 100% !important;
      outline: none !important;
      text-decoration: none !important;
      -ms-interpolation-mode: bicubic !important;
    }

    a {
      text-decoration: none !important;
    }

    .preheader-ghost {
      display: none !important;
      visibility: hidden !important;
      mso-hide: all !important;
      font-size: 1px !important;
      line-height: 1px !important;
      max-height: 0 !important;
      max-width: 0 !important;
      opacity: 0 !important;
      overflow: hidden !important;
    }

    .email-outer {
      width: 100%;
      background-color: #FFFFFF !important;
    }

    .email-wrapper {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #0A0A0A !important;
    }

    .topbar-cell {
      text-align: center;
      padding: 10px 20px;
      background-color: #FFFFFF !important;
    }

    .topbar-text {
      margin: 0;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 11px;
      color: #777777;
      letter-spacing: -0.2px;
      line-height: 1.5;
    }

    .topbar-link {
      color: #2A2A91;
      text-decoration: underline !important;
    }

    .hero-cell {
      background-color: #2A2A91;
      font-size: 0;
      line-height: 0;
    }

    .body-bg-cell {
      background-color: #0A0A0A;
      background-image: url('https://res.cloudinary.com/dentghiic/image/upload/v1780336122/body_bg_r64uh7.png');
      background-size: cover;
      background-position: center top;
      background-repeat: no-repeat;
    }

    @media only screen and (max-width: 599px) {
      .content-pad {
        padding-left: 30px !important;
        padding-right: 30px !important;
      }

      .body-text {
        font-size: 24px !important;
        line-height: 1.45 !important;
      }

      .small-text {
        font-size: 21px !important;
        line-height: 1.45 !important;
      }
    }
  </style>
</head>

<body style="margin:0;padding:0;background-color:#FFFFFF;">
  <div class="preheader-ghost" aria-hidden="true">
    You're officially in! Get early access, join our WhatsApp community, and follow us on our socials.
  </div>

  <table role="presentation" class="email-outer" cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" class="email-wrapper" cellpadding="0" cellspacing="0" border="0" width="600">

          <tr>
            <td class="topbar-cell">
              <p class="topbar-text">
                Having trouble viewing this email?
                <a href="https://waitlist.neroapp.co/browser-view" class="topbar-link">
                  View it in your browser
                </a>
              </p>
            </td>
          </tr>

          <tr>
            <td class="hero-cell">
              <a href="https://waitlist.neroapp.co" style="display:block;font-size:0;line-height:0;">
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
            <td
              class="body-bg-cell"
              background="https://res.cloudinary.com/dentghiic/image/upload/v1780336122/body_bg_r64uh7.png"
              style="
                background-color:#0A0A0A;
                background-image:url('https://res.cloudinary.com/dentghiic/image/upload/v1780336122/body_bg_r64uh7.png');
                background-size:cover;
                background-position:center top;
                background-repeat:no-repeat;
                padding:0;
              "
            >
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="content-pad" style="padding:44px 56px 0 56px;">

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="height:1px;background-color:rgba(255,255,255,0.18);font-size:0;line-height:0;">
                          &nbsp;
                        </td>
                      </tr>
                    </table>

                    <p
                      class="body-text"
                      style="
                        margin:38px 0 28px 0;
                        font-family:Helvetica, Arial, sans-serif;
                        font-size:27px;
                        line-height:1.5;
                        color:#FFFFFF;
                        font-weight:400;
                        letter-spacing:-0.7px;
                      "
                    >
                      Hey there,
                    </p>

                    <p
                      class="body-text"
                      style="
                        margin:0 0 28px 0;
                        font-family:Helvetica, Arial, sans-serif;
                        font-size:27px;
                        line-height:1.5;
                        color:#FFFFFF;
                        font-weight:400;
                        letter-spacing:-0.7px;
                      "
                    >
                      We&rsquo;re really excited to have you here. 🥳
                    </p>

                    <p
                      class="body-text"
                      style="
                        margin:0 0 34px 0;
                        font-family:Helvetica, Arial, sans-serif;
                        font-size:27px;
                        line-height:1.5;
                        color:#FFFFFF;
                        font-weight:400;
                        letter-spacing:-0.7px;
                      "
                    >
                      We&rsquo;re building something to help you spend with clarity on a daily basis and stop wondering where all your money went halfway through the month.
                    </p>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="height:1px;background-color:rgba(255,255,255,0.16);font-size:0;line-height:0;">
                          &nbsp;
                        </td>
                      </tr>
                    </table>

                    <p
                      class="body-text"
                      style="
                        margin:34px 0 34px 0;
                        font-family:Helvetica, Arial, sans-serif;
                        font-size:27px;
                        line-height:1.5;
                        color:#FFFFFF;
                        font-weight:400;
                        letter-spacing:-0.7px;
                      "
                    >
                      For now, sit tight. We&rsquo;ll keep you updated as we build and let you know the moment there&rsquo;s something new to see.
                    </p>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="height:1px;background-color:rgba(255,255,255,0.16);font-size:0;line-height:0;">
                          &nbsp;
                        </td>
                      </tr>
                    </table>

                    <p
                      class="body-text"
                      style="
                        margin:34px 0 32px 0;
                        font-family:Helvetica, Arial, sans-serif;
                        font-size:27px;
                        line-height:1.5;
                        color:#FFFFFF;
                        font-weight:400;
                        letter-spacing:-0.7px;
                      "
                    >
                      While you wait:
                    </p>

                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" class="content-pad" style="padding:0 40px;">

                    <a
                      href="https://chat.whatsapp.com/GmIOkXzIITu8knz6QHo45m?mode=gi_t"
                      target="_blank"
                      style="text-decoration:none;display:block;"
                    >
                      <img
                        src="https://res.cloudinary.com/dentghiic/image/upload/v1780271570/feature_1_iakvb7.png"
                        alt="Join our WhatsApp community"
                        width="520"
                        style="display:block;width:100%;max-width:520px;height:auto;margin:0 0 28px 0;border:0;"
                      />
                    </a>

                    <a
                      href="https://www.instagram.com/getneroapp/"
                      target="_blank"
                      style="text-decoration:none;display:block;"
                    >
                      <img
                        src="https://res.cloudinary.com/dentghiic/image/upload/v1780271571/feature_2_znjkfd.png"
                        alt="Follow us on Instagram"
                        width="520"
                        style="display:block;width:100%;max-width:520px;height:auto;margin:0 0 28px 0;border:0;"
                      />
                    </a>

                    <a
                      href="https://www.linkedin.com/company/neroapp-ltd/"
                      target="_blank"
                      style="text-decoration:none;display:block;"
                    >
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
            <td class="hero-cell" style="background-color:#0A0A0A;font-size:0;line-height:0;">
              <img
                src="https://res.cloudinary.com/dentghiic/image/upload/v1780271571/close_brcfhf.png"
                alt="We'll be in touch soon. Thanks for being one of the early believers."
                width="600"
                style="display:block;width:100%;max-width:600px;height:auto;border:0;"
              />
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
