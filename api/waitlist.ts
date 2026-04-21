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
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="x-apple-disable-message-reformatting" />
          <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
          <meta name="color-scheme" content="light dark" />
          <meta name="supported-color-schemes" content="light dark" />
          <title>You're in! — nēro</title>

          <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <![endif]-->

          <style type="text/css">
            body, table, td, p, a, li, blockquote {
              -webkit-text-size-adjust: 100% !important;
              -ms-text-size-adjust: 100% !important;
            }

            html {
              background-color: #F8F7F7 !important;
            }

            body {
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              min-width: 100% !important;
              background-color: #F8F7F7 !important;
              color: #0A0A0A !important;
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
              background-color: #F8F7F7 !important;
            }

            .email-wrapper {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #F8F7F7 !important;
            }

            .topbar-cell {
              text-align: center;
              padding: 10px 20px;
              background-color: #F8F7F7 !important;
            }

            .topbar-text {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 11px;
              color: #777777 !important;
              letter-spacing: -0.2px;
              line-height: 1.5;
            }

            .topbar-link {
              color: #2A2A91 !important;
              text-decoration: underline !important;
            }

            .hero-cell {
              background-color: #2A2A91 !important;
              font-size: 0;
              line-height: 0;
            }

            .body-cell {
              padding: 40px;
              background-color: #F8F7F7 !important;
            }

            .intro-table {
              border-radius: 5px;
              overflow: hidden;
              margin-bottom: 22px;
              background-color: #2A2A91 !important;
            }

            .intro-td {
              padding: 40px 28px;
              background-color: #2A2A91 !important;
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 300;
              font-size: 22px;
              letter-spacing: 0.3px;
              line-height: 1.5;
              color: #FFFFFF !important;
            }

            .intro-td p {
              margin: 0 0 20px;
              color: #FFFFFF !important;
              font-family: Arial, Helvetica, sans-serif;
            }

            .intro-td p:last-child {
              margin-bottom: 0;
            }

            .divider-row td {
              padding: 0 0 22px;
              font-size: 0;
              line-height: 0;
            }

            .divider-line {
              width: 100%;
              height: 1px;
              background-color: #CCCCCC !important;
              font-size: 0;
              line-height: 0;
            }

            .card-outer {
              border-radius: 5px;
              overflow: hidden;
              margin-bottom: 22px;
              background-color: #0A0A0A !important;
              border-top: 4px solid #2A2A91 !important;
            }

            .card-heading {
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 700;
              font-size: 20px;
              color: #F8F7F7 !important;
              letter-spacing: -0.4px;
              line-height: 1.3;
              margin: 0;
            }

            .card-body-text {
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 300;
              font-size: 15px;
              color: #D2D2D2 !important;
              line-height: 1.55;
              letter-spacing: 0.2px;
              margin: 0;
            }

            .btn-primary {
              display: inline-block;
              background-color: #2A2A91 !important;
              color: #FFFFFF !important;
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 700;
              font-size: 12px;
              text-align: center;
              text-decoration: none !important;
              padding: 9px 20px;
              border-radius: 999px;
              letter-spacing: -0.3px;
              white-space: nowrap;
              mso-padding-alt: 9px 20px;
            }

            .fc2-img-td {
              width: 260px;
              vertical-align: bottom;
              padding: 0;
              background-color: #0A0A0A !important;
            }

            .fc2-text-td {
              vertical-align: middle;
              padding: 40px;
              background-color: #0A0A0A !important;
            }

            .fc1-img-td {
              width: 50%;
              vertical-align: bottom;
              padding: 0;
              overflow: hidden;
              background-color: #0A0A0A !important;
            }

            .fc1-text-td {
              width: 50%;
              vertical-align: middle;
              padding: 40px;
              background-color: #0A0A0A !important;
            }

            .signoff-td {
              padding: 32px 24px;
              background-color: #0A0A0A !important;
              border-radius: 5px;
            }

            .signoff-text {
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 300;
              font-size: 22px;
              color: #FFFFFF !important;
              letter-spacing: 0.2px;
              line-height: 1.5;
              margin: 0;
            }

            .signoff-name {
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 400;
              font-size: 22px;
              color: #FFFFFF !important;
              letter-spacing: -0.1px;
              line-height: 1.5;
              margin: 22px 0 0;
            }

            .footer-cell {
              padding: 64px 40px 56px;
              background-color: #2A2A91 !important;
              text-align: center;
            }

            .footer-motto {
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 700;
              font-size: 18px;
              color: #FFFFFF !important;
              letter-spacing: -0.5px;
              line-height: 1.2;
              margin: 0 0 28px;
            }

            .footer-copy {
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 400;
              font-size: 13px;
              color: rgba(248,247,247,0.80) !important;
              letter-spacing: -0.2px;
              line-height: 1.65;
              margin: 0 0 22px;
            }

            .footer-copy a {
              color: #FFFFFF !important;
              text-decoration: underline !important;
            }

            .footer-small {
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 400;
              font-size: 11px;
              color: rgba(248,247,247,0.55) !important;
              letter-spacing: -0.2px;
              margin: 0;
            }

            .footer-divider {
              width: 100%;
              height: 1px;
              background-color: rgba(255,255,255,0.18) !important;
              font-size: 0;
              line-height: 0;
              margin: 0 0 24px;
            }

            .social-pill {
              display: inline-block;
              border: 1px solid rgba(255,255,255,0.35) !important;
              border-radius: 999px;
              padding: 10px;
              line-height: 0;
              background-color: transparent !important;
            }

            @media (prefers-color-scheme: dark) {
              html,
              body,
              .email-outer,
              .email-wrapper,
              .body-cell,
              .topbar-cell {
                background-color: #0A0A0A !important;
                color: #F8F7F7 !important;
              }

              .topbar-text {
                color: #B8B8B8 !important;
              }

              .topbar-link {
                color: #C9C9FF !important;
              }

              .divider-line {
                background-color: #2B2B2B !important;
              }

              .card-outer,
              .fc1-img-td,
              .fc1-text-td,
              .fc2-img-td,
              .fc2-text-td,
              .signoff-td {
                background-color: #0A0A0A !important;
              }

              .card-heading,
              .signoff-text,
              .signoff-name {
                color: #F8F7F7 !important;
              }

              .card-body-text {
                color: #D2D2D2 !important;
              }

              .footer-cell {
                background-color: #2A2A91 !important;
              }

              .footer-motto,
              .footer-copy,
              .footer-copy a,
              .footer-small {
                color: #FFFFFF !important;
              }

              .footer-divider {
                background-color: rgba(255,255,255,0.18) !important;
              }

              .social-pill {
                border-color: rgba(255,255,255,0.35) !important;
              }
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

              .fc2-text-td {
                padding: 22px !important;
                width: 50% !important;
              }

              .fc2-img-td {
                width: 50% !important;
              }

              .fc2-img-td img {
                width: 100% !important;
                max-width: 160px !important;
                height: auto !important;
              }

              .fc1-img-td {
                width: 50% !important;
                padding: 0 !important;
                overflow: hidden !important;
              }

              .fc1-img-td img {
                width: 100% !important;
                max-width: 160px !important;
                height: auto !important;
                display: block !important;
              }

              .fc1-text-td {
                width: 50% !important;
                padding: 22px !important;
              }

              .card-heading {
                font-size: 17px !important;
              }

              .card-body-text {
                font-size: 13px !important;
              }

              .btn-primary {
                font-size: 11px !important;
                padding: 8px 14px !important;
                white-space: nowrap !important;
              }

              .signoff-text,
              .signoff-name {
                font-size: 18px !important;
                line-height: 1.55 !important;
              }

              .footer-cell {
                padding: 36px 20px 32px !important;
              }
            }
          </style>
        </head>

        <body style="margin:0;padding:0;background-color:#F8F7F7;">
          <div class="preheader-ghost" aria-hidden="true" style="display:none !important;visibility:hidden !important;mso-hide:all !important;font-size:1px !important;line-height:1px !important;max-height:0 !important;max-width:0 !important;opacity:0 !important;overflow:hidden !important;">
            You're officially in! Get early access, join our WhatsApp group, and invite friends to nēro. Control your spending. Fix your future.
          </div>

          <table role="presentation" class="email-outer" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;background-color:#F8F7F7;">
            <tr>
              <td align="center" style="padding:0;background-color:#F8F7F7;">
                <table role="presentation" class="email-wrapper" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;background-color:#F8F7F7;">
                  <tr>
                    <td class="topbar-cell" style="text-align:center;padding:10px 20px;background-color:#F8F7F7;">
                      <p class="topbar-text" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#777777;letter-spacing:-0.2px;line-height:1.5;">
                        Having trouble viewing this email?
                        <a href="https://waitlist.neroapp.co/browser-view" class="topbar-link" style="color:#2A2A91;text-decoration:underline;">View it in your browser</a>
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
                    <td class="body-cell" style="padding:40px;background-color:#F8F7F7;">
                      ...
                    </td>
                  </tr>

                  <tr>
                    <td class="footer-cell" align="center" style="padding:64px 40px 56px;background-color:#2A2A91;text-align:center;">
                      ...
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