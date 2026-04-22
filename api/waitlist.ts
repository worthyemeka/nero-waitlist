import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.zoho.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_SECURE = (process.env.SMTP_SECURE ?? "true").toLowerCase() === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL ?? "Nero <noreply@neroapp.co>";

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
  cachedCount = { count, expires: Date.now() + 5 * 60 * 1000 };
}

async function getWaitlistCount(): Promise<number> {
  const cached = getCachedCount();
  if (cached !== null) {
    return cached;
  }

  const supabaseUrl = requireEnv("SUPABASE_URL", SUPABASE_URL);
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY", SUPABASE_SERVICE_ROLE_KEY);

  const response = await fetch(`${supabaseUrl}/rest/v1/waitlist_signups?select=count`, {
    method: "GET",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Prefer": "count=exact",
    },
  });

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
    headers: {
      "X-Entity-Ref-ID": "nero-waitlist",
    },
    html: `
<!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
    <title>You're in! — nēro</title>

    <!--[if mso]> <noscript> <xml> <o:OfficeDocumentSettings> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> </noscript> <![endif]-->

    <style type="text/css">
      body, table, td, p, a, li, blockquote {
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
        background-color: #FFFFFF !important;
      }

      .topbar-cell {
        text-align: center;
        padding: 10px 20px;
        background-color: #FFFFFF !important;
      }

      .topbar-text {
        margin: 0;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
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

      .body-cell {
        padding: 20px 20px 20px 20px;
        background-color: #FFFFFF !important;
      }

      .intro-table {
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 16px;
        background-color: #2A2A91;
      }

      .intro-td {
        padding: 40px 28px;
        background-color: #2A2A91;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 300;
        font-size: 22px;
        letter-spacing: 0.3px;
        line-height: 1.5;
        color: #FFFFFF;
      }

      .intro-td p {
        margin: 0 0 20px;
        color: #FFFFFF;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }

      .intro-td p:last-child {
        margin-bottom: 0;
      }

      .divider-line {
        width: 100%;
        height: 1px;
        background-color: #BABABA !important;
        font-size: 0;
        line-height: 0;
      }

      .footer-bg-cell {
        padding: 0 !important;
        background-color: #2A2A91 !important;
      }

      .footer-content {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
      }

      .footer-motto {
        font-family: Helvetica, Arial, sans-serif;
        font-weight: 700;
        font-size: 12px;
        color: #FFFFFF;
        margin: 0 0 22px;
        letter-spacing: -0.3px;
      }

      .footer-copy {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
        color: rgba(248,247,247,0.85);
        margin: 18px 0;
        line-height: 1.5;
      }

      .footer-copy a {
        color: #FFFFFF !important;
        text-decoration: underline !important;
      }

      .footer-small {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 10px;
        color: rgba(248,247,247,0.65);
        margin-top: 10px;
      }

      @media only screen and (max-width: 599px) {
        .body-cell {
          padding: 22px !important;
        }

        .intro-td {
          padding: 24px 18px !important;
          font-size: 18px !important;
          line-height: 1.55 !important;
        }

        footer-bg-cell {
          padding: 0 !important;
        }

        .footer-inner-pad {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
      }
    </style>
  </head>

  <body style="margin:0;padding:0;background-color:#FFFFFF;">
    <div
      class="preheader-ghost"
      aria-hidden="true"
      style="display:none !important;visibility:hidden !important;mso-hide:all !important;font-size:1px !important;line-height:1px !important;max-height:0 !important;max-width:0 !important;opacity:0 !important;overflow:hidden !important;"
    >
      Be honest… your money dey disappear abi? 👀 Get early access, join our WhatsApp group, and invite friends to nēro.
      Control your spending. Fix your future.
    </div>

    <table
      role="presentation"
      class="email-outer"
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="width:100%;background-color:#FFFFFF;"
    >
      <tr>
        <td align="center" style="padding:0;">
          <table
            role="presentation"
            class="email-wrapper"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="600"
            style="width:600px;max-width:600px;background-color:#FFFFFF;"
          >
            <tr>
              <td class="topbar-cell" style="text-align:center;padding:10px 20px;background-color:#FFFFFF;">
                <p
                  class="topbar-text"
                  style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#777777;letter-spacing:-0.2px;line-height:1.5;"
                >
                  Having trouble viewing this email?
                  <a
                    href="https://tinyurl.com/browserview"
                    class="topbar-link"
                    style="color:#2A2A91;text-decoration:underline;"
                    >View it in your browser</a
                  >
                </p>
              </td>
            </tr>

            <tr>
              <td class="hero-cell" style="background-color:#2A2A91;font-size:0;line-height:0;">
                <a href="https://waitlist.neroapp.co" style="display:block;font-size:0;line-height:0;">
                  <img
                    src="https://res.cloudinary.com/dentghiic/image/upload/v1775078555/hero-phone_v8xpux.png"
                    alt="You're in! You're officially on the list."
                    width="600"
                    style="display:block;width:100%;max-width:600px;height:auto;"
                  />
                </a>
              </td>
            </tr>

            <tr>
              <td class="body-cell" style="padding:28px 40px 36px 40px;background-color:#FFFFFF;">
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="margin-bottom:22px;"
                >
                  <tr>
                    <td align="center" style="padding:0;">
                      <a href="https://waitlist.neroapp.co" target="_blank" style="display:inline-block;">
                        <img
                          src="https://res.cloudinary.com/dentghiic/image/upload/v1776874864/card-1email_pexak1.png"
                          alt="Intro card"
                          width="560"
                          style="display:block;width:100%;max-width:560px;height:auto;"
                        />
                      </a>
                    </td>
                  </tr>
                </table>

                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="margin-bottom:22px;"
                >
                  <tr>
                    <td align="center" style="padding:0;">
                      <a href="https://waitlist.neroapp.co" target="_blank" style="display:inline-block;">
                        <img
                          src="https://res.cloudinary.com/dentghiic/image/upload/v1776874869/cta-1_d2xa8w.png"
                          alt="Share nēro waitlist"
                          width="560"
                          style="display:block;width:100%;max-width:560px;height:auto;"
                        />
                      </a>
                    </td>
                  </tr>
                </table>

                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="margin-bottom:22px;"
                >
                  <tr>
                    <td align="center" style="padding:0;">
                      <a href="https://waitlist.neroapp.co" target="_blank" style="display:inline-block;">
                        <img
                          src="https://res.cloudinary.com/dentghiic/image/upload/v1776874866/cta-2_zzfhzl.png"
                          alt="Join WhatsApp group"
                          width="560"
                          style="display:block;width:100%;max-width:560px;height:auto;"
                        />
                      </a>
                    </td>
                  </tr>
                </table>

                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="margin-bottom:22px;"
                >
                  <tr>
                    <td align="center" style="padding:0;">
                      <a href="https://waitlist.neroapp.co" target="_blank" style="display:inline-block;">
                        <img
                          src="https://res.cloudinary.com/dentghiic/image/upload/v1776874864/card-3email_lznspe.png"
                          alt="Closing card"
                          width="560"
                          style="display:block;width:100%;max-width:560px;height:auto;"
                        />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
  <td
    class="footer-bg-cell"
    align="center"
    style="padding:0;background-color:#2A2A91;"
  >
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="width:100%;border-collapse:collapse !important;"
    >
      <tr>
        <td align="center" style="padding:0;line-height:0;font-size:0;">
          <a
            href="https://waitlist.neroapp.co"
            target="_blank"
            style="display:block;line-height:0;font-size:0;text-decoration:none;"
          >
            <img
              src="https://res.cloudinary.com/dentghiic/image/upload/v1776898012/footer-1_apfygv.png"
              alt="nēro footer top"
              width="600"
              style="display:block;width:100%;max-width:600px;height:auto;border:0;margin:0;padding:0;"
            />
          </a>
        </td>
      </tr>

      <tr>
        <td align="center" style="padding:0;line-height:0;font-size:0;">
          <a
            href="https://instagram.com/nero.fin"
            target="_blank"
            style="display:block;line-height:0;font-size:0;text-decoration:none;"
          >
            <img
              src="https://res.cloudinary.com/dentghiic/image/upload/v1776898012/footer-2_qfud3s.png"
              alt="nēro footer bottom"
              width="600"
              style="display:block;width:100%;max-width:600px;height:auto;border:0;margin:0;padding:0;"
            />
          </a>
        </td>
      </tr>
    </table>
  </td>
</tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
  });//hi
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