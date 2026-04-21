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
    html: `
      <!DOCTYPE html>
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
      body, table, td, p, a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      body {
        margin: 0;
        padding: 0;
        width: 100% !important;
        min-width: 100% !important;
        background-color: #F8F7F7;
      }

      table {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        border: 0;
        display: block;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      a {
        text-decoration: none;
      }

      .email-outer-table {
        width: 100%;
        background-color: #F8F7F7;
      }

      .email-wrapper {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #F8F7F7;
      }

      .email-preheader {
        background-color: #F8F7F7;
      }

      .email-body {
        background-color: #F8F7F7;
        background-image: url('https://res.cloudinary.com/dentghiic/image/upload/v1775340773/doodle-bg_ywfwsr.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        padding: 40px 30px;
      }

      .hero-block {
        background-color: #2A2A91;
        font-size: 0;
        line-height: 0;
      }

      .text-block-pad {
        padding: 40px 28px;
        color: #FFFFFF;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 300;
        font-size: 22px;
        letter-spacing: 0.3px;
        line-height: 1.5;
        background-image: url('https://res.cloudinary.com/dentghiic/image/upload/v1775073702/Body_image_qvjfav.png');
        background-size: cover;
        background-position: center;
        background-color: #2A2A91;
      }

      .preheader-text {
        margin: 0;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 11px;
        color: #777777;
        letter-spacing: -0.2px;
        line-height: 1.5;
      }

      .preheader-link {
        color: #2A2A91;
        text-decoration: underline;
      }

      .white-copy,
      .white-copy p,
      .white-copy span,
      .white-copy a {
        color: #FFFFFF !important;
      }

      .feature-card {
        background-color: #161616;
        border-top: 4px solid #2A2A91;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 22px;
      }

      .card-heading {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
        font-size: 20px;
        color: #F8F7F7;
        letter-spacing: -0.4px;
        line-height: 1.3;
        margin: 0;
      }

      .card-body-text {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 300;
        font-size: 15px;
        color: #D2D2D2;
        line-height: 1.55;
        letter-spacing: 0.2px;
        margin: 0;
      }

      .button-primary {
        display: inline-block;
        background-color: #2A2A91;
        color: #FFFFFF !important;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
        font-size: 12px;
        text-align: center;
        text-decoration: none;
        padding: 9px 20px;
        border-radius: 999px;
        letter-spacing: -0.3px;
      }

      .divider {
        border-top: 1px solid rgba(255,255,255,0.15);
        margin: 0 0 22px;
      }

      .body-close-text,
      .body-close-text p {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 300;
        font-size: 22px;
        color: #0A0A0A;
        letter-spacing: 0.2px;
        line-height: 1.5;
        margin: 0;
      }

      .body-signoff,
      .body-signoff p {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 22px;
        color: #0A0A0A;
        letter-spacing: -0.1px;
        line-height: 1.5;
        margin: 0;
      }

      .footer-shell {
        background-color: #2A2A91;
        background-image: url('https://res.cloudinary.com/dentghiic/image/upload/v1775074270/footer_col5m7.png');
        background-size: cover;
        background-position: center;
      }

      .footer-motto {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
        font-size: 18px;
        color: #FFFFFF !important;
        letter-spacing: -0.5px;
        line-height: 1.2;
        margin: 0 0 28px;
      }

      .footer-copy {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 13px;
        color: rgba(248,247,247,0.72) !important;
        letter-spacing: -0.2px;
        line-height: 1.65;
        margin: 0 0 22px;
      }

      .footer-copy a {
        color: rgba(248,247,247,0.9) !important;
        text-decoration: underline;
      }

      .footer-small {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 11px;
        color: rgba(248,247,247,0.45) !important;
        letter-spacing: -0.2px;
        margin: 0;
      }

      .social-pill {
        display: inline-block;
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 999px;
        padding: 10px;
        line-height: 0;
        background-color: transparent;
      }

      .instagram-phone-wrap {
        width: 223px;
        height: 240px;
        overflow: hidden;
      }

      .instagram-phone {
        display: block;
        width: 223px;
        height: auto;
      }

      @media only screen and (max-width: 599px) {
        .email-wrapper {
          width: 100% !important;
        }

        .email-body {
          padding: 24px 14px !important;
        }

        .text-block-pad {
          padding: 24px 18px !important;
          font-size: 18px !important;
          line-height: 1.55 !important;
        }

        .crickets-heading {
          font-size: 19px !important;
        }

        .body-close-text,
        .body-close-text p,
        .body-signoff,
        .body-signoff p {
          font-size: 18px !important;
          line-height: 1.55 !important;
        }

        .fc1-table,
        .fc2-table,
        .stack-table {
          width: 100% !important;
        }

        .fc2-img-cell {
          display: none !important;
          width: 0 !important;
          max-height: 0 !important;
          overflow: hidden !important;
        }

        .fc2-text-cell {
          display: block !important;
          width: 100% !important;
          padding: 24px 20px !important;
          box-sizing: border-box !important;
        }

        .fc1-img-cell {
          display: none !important;
          width: 0 !important;
          max-height: 0 !important;
          overflow: hidden !important;
          padding: 0 !important;
        }

        .fc1-text-cell {
          display: block !important;
          width: 100% !important;
          padding: 18px 20px 24px !important;
          box-sizing: border-box !important;
        }

        .instagram-phone-wrap {
          width: 120px !important;
          height: auto !important;
          margin: 0 auto !important;
          overflow: visible !important;
        }

        .instagram-phone {
          width: 120px !important;
          height: auto !important;
          margin: 0 auto !important;
        }

        .email-footer {
          padding: 40px 20px 36px !important;
        }

        .mobile-center {
          text-align: center !important;
        }

        .mobile-full {
          width: 100% !important;
        }
      }

      @media only screen and (max-width: 420px) {
        .email-body {
          padding: 20px 10px !important;
        }

        .text-block-pad {
          padding: 20px 14px !important;
          font-size: 17px !important;
        }

        .fc1-img-cell {
          padding: 14px 14px 0 !important;
        }

        .fc1-text-cell,
        .fc2-text-cell {
          padding: 16px 14px 20px !important;
        }

        .email-footer {
          padding: 32px 14px 28px !important;
        }
      }

      @media (prefers-color-scheme: dark) {
        body,
        .email-outer-table,
        .email-wrapper,
        .email-preheader,
        .email-body {
          background-color: #0F1115 !important;
        }

        .preheader-text {
          color: #B7BCC7 !important;
        }

        .preheader-link {
          color: #8FA3FF !important;
        }

        .feature-card {
          background-color: #151922 !important;
          border-top-color: #8FA3FF !important;
        }

        .card-heading {
          color: #F3F6FF !important;
        }

        .card-body-text {
          color: #D1D8E6 !important;
        }

        .button-primary {
          background-color: #8FA3FF !important;
          color: #0F1115 !important;
        }

        .body-close-text,
        .body-close-text p,
        .body-signoff,
        .body-signoff p {
          color: #0A0A0A !important;
        }

        .footer-shell {
          background-color: #111827 !important;
        }

        .footer-copy {
          color: rgba(243,246,255,0.82) !important;
        }

        .footer-small {
          color: rgba(243,246,255,0.55) !important;
        }
      }

      [data-ogsc] .button-primary {
        background-color: #8FA3FF !important;
        color: #0F1115 !important;
      }

      [data-ogsc] .body-close-text,
      [data-ogsc] .body-close-text p,
      [data-ogsc] .body-signoff,
      [data-ogsc] .body-signoff p {
        color: #0A0A0A !important;
      }
    </style>
  </head>

  <body style="margin:0;padding:0;background-color:#F8F7F7;">
    <table
      class="email-outer-table"
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="width:100%;background-color:#F8F7F7;"
    >
      <tr>
        <td align="center" style="padding:0;">
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            class="email-wrapper"
            style="max-width:600px;width:100%;background-color:#F8F7F7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;"
          >
            <tr>
              <td class="email-preheader" style="text-align:center;padding:10px 20px;background-color:#F8F7F7;">
                <p
                  class="preheader-text"
                  style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#777777;letter-spacing:-0.2px;line-height:1.5;"
                >
                  Having trouble viewing this email?
                  <a href="browser-view.html" class="preheader-link" style="color:#2A2A91;text-decoration:underline;"
                    >View it in your browser</a
                  >
                </p>
              </td>
            </tr>

            <tr>
              <td class="hero-block" style="background-color:#2A2A91;font-size:0;line-height:0;">
                <a href="https://waitlist.neroapp.co" style="display:block;font-size:0;line-height:0;">
                  <img
                    class="email-hero-img"
                    src="https://res.cloudinary.com/dentghiic/image/upload/v1775078555/hero-phone_v8xpux.png"
                    alt="You're in! You're officially on the list."
                    width="600"
                    style="display:block;width:100%;height:auto;max-width:600px;"
                  />
                </a>
              </td>
            </tr>

            <tr>
              <td
                class="email-body"
                background="https://res.cloudinary.com/dentghiic/image/upload/v1775340773/doodle-bg_ywfwsr.png"
                style="padding:40px 30px;background-color:#F8F7F7;background-image:url('https://res.cloudinary.com/dentghiic/image/upload/v1775340773/doodle-bg_ywfwsr.png');background-size:cover;background-position:center;background-repeat:no-repeat;"
              >
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="border-radius:5px;overflow:hidden;margin-bottom:22px;background-color:#2A2A91;"
                >
                  <tr>
                    <td
                      class="text-block-pad white-copy"
                      background="https://res.cloudinary.com/dentghiic/image/upload/v1775340198/doodle_with_purple_ugdevx.png"
                      style="padding:40px 28px;color:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:22px;letter-spacing:0.3px;line-height:1.5;background-image:url('https://res.cloudinary.com/dentghiic/image/upload/v1775073702/Body_image_qvjfav.png');background-size:cover;background-position:center;background-color:#2A2A91;"
                    >
                      <p style="margin:0 0 20px;">
                        <span style="font-weight:500;color:#FFFFFF;">Hey there,</span>,
                      </p>
                      <p style="margin:0 0 20px;color:#FFFFFF;">You're officially in! 🎉</p>
                      <p style="margin:0 0 20px;color:#FFFFFF;">If money disappears faster than it should, you're exactly where you need to be.</p>
                      <p style="margin:0;color:#FFFFFF;">We're building Nero to help you stay in control without the stress.</p>
                    </td>
                  </tr>
                </table>

                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="border-radius:5px;overflow:hidden;margin-bottom:22px;background-color:#2A2A91;"
                >
                  <tr>
                    <td
                      class="text-block-pad white-copy"
                      background="https://res.cloudinary.com/dentghiic/image/upload/v1775073702/Body_image_qvjfav.png"
                      style="padding:40px 28px;color:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:22px;letter-spacing:0.3px;line-height:1.5;background-image:url('https://res.cloudinary.com/dentghiic/image/upload/v1775073702/Body_image_qvjfav.png');background-size:cover;background-position:center;background-color:#2A2A91;"
                    >
                      <p
                        class="crickets-heading"
                        style="font-weight:700;font-size:24px;text-transform:uppercase;margin:0 0 11px;color:#FFFFFF;"
                      >
                        What happens next?
                      </p>
                      <p style="font-weight:300;margin:0 0 22px;color:#FFFFFF;">
                        We’ll send you early updates, first looks, and your invite when your spot is ready.
                      </p>
                      <p style="font-weight:300;margin:0;color:#FFFFFF;">
                        While you wait, here are two quick things you can do:
                      </p>
                    </td>
                  </tr>
                </table>

                <div class="divider" style="border-top:1px solid rgba(255,255,255,0.15);margin:0 0 22px;"></div>

                <div
                  class="feature-card"
                  style="background-color:#161616;border-top:4px solid #2A2A91;border-radius:5px;overflow:hidden;margin-bottom:22px;"
                >
                  <table
                    role="presentation"
                    class="fc2-table stack-table"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    width="100%"
                  >
                    <tr>
                      <td
                        class="fc2-text-cell"
                        align="left"
                        valign="middle"
                        style="padding:28px 10px 28px 22px;width:218px;vertical-align:middle;"
                      >
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="padding-bottom:14px;">
                              <p
                                class="card-heading"
                                style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:20px;color:#F8F7F7;letter-spacing:-0.4px;line-height:1.3;margin:0;"
                              >
                                Put your people on
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom:14px;">
                              <p
                                class="card-body-text"
                                style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:15px;color:#D2D2D2;line-height:1.55;letter-spacing:0.2px;margin:0;"
                              >
                                Know someone who needs nēro too? Share the waitlist with them.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                href="https://waitlist.neroapp.co"
                                class="button-primary"
                                style="display:inline-block;background-color:#2A2A91;color:#FFFFFF !important;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:12px;text-align:center;text-decoration:none;padding:9px 20px;border-radius:999px;letter-spacing:-0.3px;"
                                >Share the link →</a
                              >
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td
                        class="fc2-img-cell"
                        align="right"
                        valign="bottom"
                        style="width:283px;vertical-align:bottom;padding:0;"
                      >
                        <img
                          src="https://res.cloudinary.com/dentghiic/image/upload/v1775073795/girl_r44znk.png"
                          alt=""
                          width="283"
                          style="display:block;width:100%;height:auto;vertical-align:bottom;"
                        />
                      </td>
                    </tr>
                  </table>
                </div>

                <div
                  class="feature-card"
                  style="background-color:#161616;border-top:4px solid #2A2A91;border-radius:5px;overflow:hidden;margin-bottom:22px;"
                >
                  <table
                    role="presentation"
                    class="fc1-table stack-table"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    width="100%"
                  >
                    <tr>
                      <td
                        class="fc1-img-cell"
                        align="center"
                        valign="bottom"
                        style="width:251px;padding:48px 0 0 28px;vertical-align:bottom;"
                      >
                        <div class="instagram-phone-wrap" style="width:223px;overflow:hidden;height:240px;">
                          <img
                            class="instagram-phone"
                            src="https://res.cloudinary.com/dentghiic/image/upload/v1776723816/whatsapp-group_g7cdgg.png"
                            alt="WhatsApp testers group"
                            width="223"
                            style="display:block;width:223px;height:auto;"
                          />
                        </div>
                      </td>
                      <td
                        class="fc1-text-cell"
                        align="left"
                        valign="middle"
                        style="width:222px;padding:14px;vertical-align:middle;"
                      >
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="padding-bottom:14px;">
                              <p
                                class="card-heading"
                                style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:20px;color:#F8F7F7;letter-spacing:-0.4px;line-height:1.3;margin:0;"
                              >
                                Get In Early
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom:14px;">
                              <p
                                class="card-body-text"
                                style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:15px;color:#D2D2D2;letter-spacing:0.2px;line-height:1.55;margin:0;"
                              >
                                Join the testers GC for real-time drops, behind-the-scenes updates, and first dibs as we build. Tap in.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a
                                href="https://chat.whatsapp.com/JYVG4hCC5gZ6q9MfluDOSo?mode=gi_t"
                                class="button-primary"
                                style="display:inline-block;background-color:#2A2A91;color:#FFFFFF !important;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:12px;text-align:center;text-decoration:none;padding:9px 20px;border-radius:999px;letter-spacing:-0.3px;"
                                >Join WhatsApp group →</a
                              >
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>

                <div class="divider" style="border-top:1px solid rgba(255,255,255,0.15);margin:0 0 22px;"></div>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0;">
                  <tr>
                    <td
                      background="https://res.cloudinary.com/dentghiic/image/upload/v1775344004/bottom-text_jddilk.png"
                      style="padding:32px 24px;background-color:#0A0A0A;background-image:url('https://res.cloudinary.com/dentghiic/image/upload/v1775344208/bottom-text_jobmyo.png');background-size:cover;background-position:center;background-repeat:no-repeat;border-radius:5px;"
                    >
                      <div
                        class="body-close-text"
                        style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:22px;color:#FFFFFF;letter-spacing:0.2px;line-height:1.5;padding:0 0 22px;"
                      >
                        <p style="margin:0;color:#0a0a0a;">Thanks again for joining us early.</p>
                        <p style="margin:22px 0 0;color:#0a0a0a;">See you soon.</p>
                      </div>

                      <div
                        class="body-signoff"
                        style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400;font-size:22px;color:#FFFFFF;letter-spacing:-0.1px;line-height:1.5;"
                      >
                        <p style="margin:0;color:#0a0a0a;">— Worthy from nēro</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td
                class="email-footer footer-shell"
                align="center"
                background="https://res.cloudinary.com/dentghiic/image/upload/v1775074270/footer_col5m7.png"
                style="padding:64px 40px 56px;background-image:url('https://res.cloudinary.com/dentghiic/image/upload/v1775074270/footer_col5m7.png');background-size:cover;background-position:center;background-color:#2A2A91;"
              >
                <div style="margin-bottom:20px;text-align:center;">
                  <a href="https://waitlist.neroapp.co" style="display:inline-block;line-height:0;">
                    <img
                      src="https://res.cloudinary.com/dentghiic/image/upload/v1775071417/Logo_hyr7r6.png"
                      alt="nēro"
                      width="90"
                      height="30"
                      style="display:inline-block;"
                    />
                  </a>
                </div>

                <p
                  class="footer-motto"
                  style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:18px;color:#FFFFFF;letter-spacing:-0.5px;line-height:1.2;margin:0 0 28px;"
                >
                  Control your spending. Fix your future.
                </p>

                <div style="width:100%;height:1px;background:rgba(255,255,255,0.13);margin:0 0 24px;"></div>

                <p
                  class="footer-copy"
                  style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400;font-size:13px;color:rgba(248,247,247,0.72);letter-spacing:-0.2px;line-height:1.65;margin:0 0 22px;"
                >
                  You’re receiving this because you joined the nēro waitlist.<br />
                  If this isn’t for you, you can
                  <a href="{{ unsubscribeUrl }}" style="color:rgba(248,247,247,0.9);text-decoration:underline;"
                    >unsubscribe</a
                  >
                  anytime.
                </p>

                <div style="margin-bottom:32px;text-align:center;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                    <tr>
                      <td style="padding:0 8px;">
                        <a href="https://instagram.com/nero.finance" style="display:inline-block;text-decoration:none;">
                          <span
                            class="social-pill"
                            style="display:inline-block;border:1px solid rgba(255,255,255,0.3);border-radius:999px;padding:10px;line-height:0;background-color:transparent;"
                          >
                            <img
                              src="https://res.cloudinary.com/dentghiic/image/upload/v1775080449/Instagram_ra23tp.png"
                              alt="Instagram"
                              width="18"
                              height="18"
                              style="display:block;width:18px;height:18px;"
                            />
                          </span>
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>

                <p
                  class="footer-small"
                  style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400;font-size:11px;color:rgba(248,247,247,0.45);letter-spacing:-0.2px;margin:0;"
                >
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
    } catch (mailError) {
      console.error("SMTP send error:", mailError);
    }

    return res.status(200).json({ message: "You're on the waitlist! Check your inbox." });
  } catch (error) {
    console.error("Waitlist handler error:", error);
    return res.status(500).json({ error: "Failed to send confirmation email. Please try again." });
  }
}
