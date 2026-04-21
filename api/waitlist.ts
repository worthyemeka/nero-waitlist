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
              background-color: #F8F7F7 !important;
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
              background-color: #F8F7F7;
            }
            .email-wrapper {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #F8F7F7;
            }

            .topbar-cell {
              text-align: center;
              padding: 10px 20px;
              background-color: #F8F7F7;
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
              padding: 40px;
              background-color: #F8F7F7;
            }

            .intro-table {
              border-radius: 5px;
              overflow: hidden;
              margin-bottom: 22px;
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

            .divider-row td {
              padding: 0 0 22px;
              font-size: 0;
              line-height: 0;
            }
            .divider-line {
        width: 100%;
        height: 1px;
        background-color: #0A0A0A;
        font-size: 0;
        line-height: 0;
      }

            .card-outer {
              border-radius: 5px;
              overflow: hidden;
              margin-bottom: 22px;
              background-color: #161616;
              border-top: 4px solid #2A2A91;
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

            .btn-primary {
              display: inline-block;
              background-color: #2A2A91;
              color: #FFFFFF !important;
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
            }
            .fc2-text-td {
              vertical-align: middle;
              padding: 40px;
            }

            .fc1-img-td {
              width: 50%;
              vertical-align: bottom;
              padding: 0;
              overflow: hidden;
            }
            .fc1-text-td {
              width: 50%;
              vertical-align: middle;
              padding: 40px;
            }

            .signoff-td {
              padding: 32px 24px;
              background-color: #0A0A0A;
              border-radius: 5px;
            }
            .signoff-text {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-weight: 300;
              font-size: 22px;
              color: #FFFFFF;
              letter-spacing: 0.2px;
              line-height: 1.5;
              margin: 0;
            }
            .signoff-name {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-weight: 400;
              font-size: 22px;
              color: #FFFFFF;
              letter-spacing: -0.1px;
              line-height: 1.5;
              margin: 22px 0 0;
            }

            .footer-cell {
              padding: 64px 40px 56px;
              background-color: #2A2A91;
              text-align: center;
            }
            .footer-motto {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-weight: 700;
              font-size: 18px;
              color: #FFFFFF;
              letter-spacing: -0.5px;
              line-height: 1.2;
              margin: 0 0 28px;
            }
            .footer-copy {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-weight: 400;
              font-size: 13px;
              color: rgba(248,247,247,0.80);
              letter-spacing: -0.2px;
              line-height: 1.65;
              margin: 0 0 22px;
            }
            .footer-copy a {
              color: #FFFFFF !important;
              text-decoration: underline !important;
            }
            .footer-small {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-weight: 400;
              font-size: 11px;
              color: rgba(248,247,247,0.55);
              letter-spacing: -0.2px;
              margin: 0;
            }
            .footer-divider {
              width: 100%;
              height: 1px;
              background-color: rgba(255,255,255,0.18);
              font-size: 0;
              line-height: 0;
              margin: 0 0 24px;
            }
            .social-pill {
              display: inline-block;
              border: 1px solid rgba(255,255,255,0.35);
              border-radius: 999px;
              padding: 10px;
              line-height: 0;
              background-color: transparent;
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

        .divider-line {
          background-color: #0A0A0A !important;
        }
      }
                @media (prefers-color-scheme: dark) {
        .divider-line {
          background-color: #FFFFFF !important;
        }
      }

      /* Outlook app / some dark-mode clients */
      [data-ogsc] .divider-line,
      [data-ogsb] .divider-line {
        background-color: #FFFFFF !important;
      }
            }
    </style>
  </head>

  <body style="margin:0;padding:0;background-color:#F8F7F7;">
    <div
      class="preheader-ghost"
      aria-hidden="true"
      style="display:none !important;visibility:hidden !important;mso-hide:all !important;font-size:1px !important;line-height:1px !important;max-height:0 !important;max-width:0 !important;opacity:0 !important;overflow:hidden !important;"
    >
      You're officially in! Get early access, join our WhatsApp group, and invite friends to nēro. Control your
      spending. Fix your
      future.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
    </div>

    <table
      role="presentation"
      class="email-outer"
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
            class="email-wrapper"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="600"
            style="width:600px;max-width:600px;background-color:#F8F7F7;"
          >
            <tr>
              <td class="topbar-cell" style="text-align:center;padding:10px 20px;background-color:#F8F7F7;">
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
              <td class="body-cell" style="padding:28px 40px 36px 40px;background-color:#fff;">
                <table
                  role="presentation"
                  class="intro-table"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="border-radius:5px;overflow:hidden;margin-bottom:16px;background-color:#2A2A91;"
                >
                  <tr>
                    <td
                      style="padding:40px 28px;background:transparent;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:22px;letter-spacing:0.3px;line-height:1.5;color:#fff;background:#2A2A91 url('https://res.cloudinary.com/dentghiic/image/upload/v1776771304/doodle-bg_y6kf1j.png') center/cover repeat;"
                    >
                      <p style="margin:0 0 20px;color:#fff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                        <span style="font-weight:500;color:#fff;">Hey there</span>,
                      </p>
                      <p style="margin:0 0 20px;color:#fff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                        You're officially in! 🎉
                      </p>
                      <p style="margin:0 0 20px;color:#fff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                        If money disappears faster than it should, you're exactly where you need to be.
                      </p>
                      <p style="margin:0;color:#fff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                        We're building Nero to help you stay in control without the stress.
                      </p>
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
                    <td style="padding:0;font-size:0;line-height:0;">
                      <div
                        class="divider-line"
                        style="width:100%;height:1px;font-size:0;line-height:0;background-color:#0A0A0A;"
                      ></div>
                    </td>
                  </tr>
                </table>

                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="border-radius:5px;overflow:hidden;margin-bottom:16px;background:#2A2A91 url('https://res.cloudinary.com/dentghiic/image/upload/v1776771304/doodle-bg_y6kf1j.png') center/cover repeat;"
                >
                  <tr>
                    <td
                      style="padding:40px 28px;background:transparent;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#fff;"
                    >
                      <p
                        style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:24px;text-transform:uppercase;margin:0 0 11px;color:#fff;letter-spacing:-0.3px;"
                      >
                        WHAT HAPPENS NEXT?
                      </p>
                      <p
                        style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;margin:0 0 22px;color:#fff;font-size:22px;"
                      >
                        We'll send you early updates, first looks, and your invite when your spot is ready.
                      </p>
                      <p
                        style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;margin:0;color:#fff;font-size:22px;"
                      >
                        While you wait, here are two quick things you can do:
                      </p>
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
                    <td style="padding:0;font-size:0;line-height:0;">
                      <div
                        class="divider-line"
                        style="width:100%;height:1px;font-size:0;line-height:0;background-color:#0A0A0A;"
                      ></div>
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
                          src="https://res.cloudinary.com/dentghiic/image/upload/v1776769897/cta-1_hqj5j6.png"
                          alt="Join nēro waitlist"
                          width="560"
                          style="display:block;width:100%;max-width:560px;height:auto;border-radius:8px;"
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
                          src="https://res.cloudinary.com/dentghiic/image/upload/v1776775511/cta-2_qkxtje.png"
                          alt="Join WhatsApp group"
                          width="560"
                          style="display:block;width:100%;max-width:560px;height:auto;border-radius:8px;"
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
                    <td style="padding:0;font-size:0;line-height:0;">
                      <div
                        class="divider-line"
                        style="width:100%;height:1px;font-size:0;line-height:0;background-color:#0A0A0A;"
                      ></div>
                    </td>
                  </tr>
                </table>

                <table
                  role="presentation"
                  class="intro-table"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="border-radius:5px;overflow:hidden;margin-bottom:16px;background-color:#2A2A91;"
                >
                  <tr>
                    <td
                      style="padding:40px 28px;background:transparent;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:22px;letter-spacing:0.3px;line-height:1.5;color:#fff;background:#2A2A91 url('https://res.cloudinary.com/dentghiic/image/upload/v1775344208/bottom-text_jobmyo.png') center/cover repeat;"
                    >
                      <p style="margin:0 0 20px;color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                        Thanks again for joining us early.
                      </p>
                      <p style="margin:0 0 20px;color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                        See you soon.
                      </p>
                       <p
                              class="signoff-name"
                              style="font-family:Arial,Helvetica,sans-serif;font-weight:400;font-size:22px;color:#0a0a0a;letter-spacing:-0.1px;line-height:1.5;margin:22px 0 0;"
                            >
                              — Worthy from nēro
                            </p>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <tr>
              <td align="center" style="padding:0;background:#2A2A91;">
                <table
                  role="presentation"
                  width="600"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="width:100%;max-width:600px;background:#2A2A91;"
                >
                  <tr>
                    <td
                      background="https://res.cloudinary.com/dentghiic/image/upload/v1776775967/footer-container_c5rbly.png"
                      bgcolor="#2A2A91"
                      valign="top"
                      style="
            background-image:url('https://res.cloudinary.com/dentghiic/image/upload/v1776775967/footer-container_c5rbly.png');
            background-size:cover;
            background-position:center;
            background-repeat:no-repeat;
            padding:48px 20px 44px;
            text-align:center;
          "
                    >
                      <!-- Logo -->
                      <img
                        src="https://res.cloudinary.com/dentghiic/image/upload/v1775071417/Logo_hyr7r6.png"
                        alt="nēro logo"
                        width="60"
                        style="display:block;margin:0 auto 12px;"
                      />

                      <!-- Motto -->
                      <p
                        style="
              font-family:Helvetica,Arial,sans-serif;
              font-weight:700;
              font-size:12px;
              color:#F8F7F7;
              margin:0 0 22px;
              letter-spacing:-0.3px;
            "
                      >
                        Control your spending. Fix your future.
                      </p>

                      <!-- Divider -->
                      <table width="60%" align="center" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="height:1px;background:rgba(255,255,255,0.25);"></td>
                        </tr>
                      </table>

                      <!-- Copy -->
                      <p
                        style="
              font-family:Helvetica,Arial,sans-serif;
              font-size:12px;
              color:rgba(248,247,247,0.85);
              margin:18px 0;
              line-height:1.5;
            "
                      >
                        You're receiving this because you joined the nēro waitlist.<br />
                        If this isn't for you, you can
                        <a href="#" style="color:#FFFFFF;text-decoration:underline;"> unsubscribe </a>
                        anytime.
                      </p>

                      <!-- Social -->
                      <div style="margin:14px 0; gap: -24px;">
                        <a href="https://instagram.com/nero.fin" style="margin:0 8px;display:inline-block;">
                          <img
                            src="https://res.cloudinary.com/dentghiic/image/upload/v1776776383/linkedin-logo_zaxtoa.png"
                            alt="Instagram"
                            width="20"
                            height="20"
                            style="display:block;"
                          />
                        </a>
                        <a href="https://instagram.com/nero.fin" style="margin:0 8px;display:inline-block;">
                          <img
                            src="https://res.cloudinary.com/dentghiic/image/upload/v1776776429/instagram-logo_nns2wv.png"
                            alt="Instagram"
                            width="20"
                            height="20"
                            style="display:block;"
                          />
                        </a>
                      </div>

                      <!-- Copyright -->
                      <p
                        style="
              font-family:Helvetica,Arial,sans-serif;
              font-size:10px;
              color:rgba(248,247,247,0.65);
              margin-top:10px;
            "
                      >
                        © 2026 nēro. All rights reserved.
                      </p>
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