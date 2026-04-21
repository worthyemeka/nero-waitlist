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
              background-color: #CCCCCC;
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

            @media (prefers-color-scheme: dark) {
              body,
              .email-outer,
              .email-wrapper,
              .body-cell,
              .topbar-cell {
                background-color: #0A0A0A !important;
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

              .card-outer {
                background-color: #161616 !important;
                border-top-color: #2A2A91 !important;
              }

              .card-heading {
                color: #FFFFFF !important;
              }

              .card-body-text {
                color: #D2D2D2 !important;
              }

              .signoff-td {
                background-color: #000000 !important;
              }

              .footer-cell {
                background-color: #2A2A91 !important;
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
            You're officially in! Get early access, join our WhatsApp group, and invite friends to nēro. Control your spending. Fix your future.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
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
                      <p class="topbar-text" style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#777777;letter-spacing:-0.2px;line-height:1.5;">
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
                      <table
                        role="presentation"
                        class="intro-table"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="100%"
                        style="border-radius:5px;overflow:hidden;margin-bottom:22px;background-color:#2A2A91;"
                      >
                        <tr>
                          <td
                            class="intro-td"
                            style="padding:40px 28px;background-color:#2A2A91;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:22px;letter-spacing:0.3px;line-height:1.5;color:#FFFFFF;"
                          >
                            <p style="margin:0 0 20px;color:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                              <span style="font-weight:500;color:#FFFFFF;">Hey there</span>,
                            </p>
                            <p style="margin:0 0 20px;color:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">You're officially in! 🎉</p>
                            <p style="margin:0 0 20px;color:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">If money disappears faster than it should, you're exactly where you need to be.</p>
                            <p style="margin:0;color:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">We're building Nero to help you stay in control without the stress.</p>
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
                        style="border-radius:5px;overflow:hidden;margin-bottom:22px;background-color:#2A2A91;"
                      >
                        <tr>
                          <td
                            class="intro-td"
                            style="padding:40px 28px;background-color:#2A2A91;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:22px;letter-spacing:0.3px;line-height:1.5;color:#FFFFFF;"
                          >
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:24px;text-transform:uppercase;margin:0 0 11px;color:#FFFFFF;letter-spacing:-0.3px;">
                              What happens next?
                            </p>
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;margin:0 0 22px;color:#FFFFFF;">
                              We'll send you early updates, first looks, and your invite when your spot is ready.
                            </p>
                            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;margin:0;color:#FFFFFF;">
                              While you wait, here are two quick things you can do:
                            </p>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="divider-row" style="margin-bottom:22px;">
                        <tr>
                          <td style="padding:0;font-size:0;line-height:0;">
                            <div class="divider-line" style="width:100%;height:1px;background-color:#CCCCCC;font-size:0;line-height:0;"></div>
                          </td>
                        </tr>
                      </table>

                      <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="100%"
                        class="card-outer"
                        style="border-radius:5px;overflow:hidden;margin-bottom:22px;background-color:#161616;border-top:4px solid #2A2A91;"
                      >
                        <tr>
                          <td
                            class="fc2-text-td"
                            align="left"
                            valign="middle"
                            style="vertical-align:middle;padding:40px;width:280px;"
                          >
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="padding-bottom:14px;">
                                  <p class="card-heading" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:20px;color:#F8F7F7;letter-spacing:-0.4px;line-height:1.3;margin:0;">
                                    Put your people on
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-bottom:14px;">
                                  <p class="card-body-text" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:15px;color:#D2D2D2;line-height:1.55;letter-spacing:0.2px;margin:0;">
                                    Know someone who needs nēro too? Share the waitlist with them.
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <!--[if mso]>
                                  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://waitlist.neroapp.co" style="height:34px;v-text-anchor:middle;width:130px;" arcsize="50%" stroke="f" fillcolor="#2A2A91">
                                    <w:anchorlock/>
                                    <center style="color:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;">Share the link &rarr;</center>
                                  </v:roundrect>
                                  <![endif]-->
                                  <!--[if !mso]><!-->
                                  <a
                                    href="https://waitlist.neroapp.co"
                                    class="btn-primary"
                                    style="display:inline-block;background-color:#2A2A91;color:#FFFFFF !important;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:12px;text-align:center;text-decoration:none;padding:9px 20px;border-radius:999px;letter-spacing:-0.3px;white-space:nowrap;mso-hide:all;"
                                  >Share the link &rarr;</a>
                                  <!--<![endif]-->
                                </td>
                              </tr>
                            </table>
                          </td>

                          <td
                            class="fc2-img-td"
                            align="right"
                            valign="bottom"
                            style="vertical-align:bottom;padding:0;width:260px;"
                          >
                            <img
                              src="https://res.cloudinary.com/dentghiic/image/upload/v1775073795/girl_r44znk.png"
                              alt=""
                              width="260"
                              style="display:block;width:100%;height:auto;vertical-align:bottom;"
                            />
                          </td>
                        </tr>
                      </table>

                      <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="100%"
                        class="card-outer"
                        style="border-radius:5px;overflow:hidden;margin-bottom:22px;background-color:#161616;border-top:4px solid #2A2A91;"
                      >
                        <tr>
                          <td
                            class="fc1-img-td"
                            align="left"
                            valign="bottom"
                            style="vertical-align:bottom;padding:0;width:50%;overflow:hidden;background-color:#161616;"
                          >
                            <!--[if mso]>
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                              <tr>
                                <td style="padding:52px 0 0 10px;vertical-align:bottom;">
                                  <img
                                    src="https://res.cloudinary.com/dentghiic/image/upload/v1776742215/phone-email_vypvtf.png"
                                    alt="WhatsApp testers group"
                                    width="255"
                                    style="display:block;width:255px;height:auto;"
                                  />
                                </td>
                              </tr>
                            </table>
                            <![endif]-->
                            <!--[if !mso]><!-->
                            <div style="overflow:hidden;line-height:0;font-size:0;">
                              <img
                                src="https://res.cloudinary.com/dentghiic/image/upload/v1776742215/phone-email_vypvtf.png"
                                alt="WhatsApp testers group"
                                width="300"
                                style="display:block;width:100%;max-width:300px;height:auto;-webkit-transform:rotate(-7deg);-moz-transform:rotate(-7deg);-ms-transform:rotate(-7deg);-o-transform:rotate(-7deg);transform:rotate(-7deg);-webkit-transform-origin:bottom left;-moz-transform-origin:bottom left;-ms-transform-origin:bottom left;transform-origin:bottom left;margin-bottom:-42px;margin-left:-14px;"
                              />
                            </div>
                            <!--<![endif]-->
                          </td>

                          <td
                            class="fc1-text-td"
                            align="left"
                            valign="middle"
                            style="vertical-align:middle;padding:40px;width:50%;background-color:#161616;"
                          >
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                              <tr>
                                <td style="padding-bottom:14px;">
                                  <p class="card-heading" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:20px;color:#F8F7F7;letter-spacing:-0.4px;line-height:1.3;margin:0;">
                                    Get In Early
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-bottom:16px;">
                                  <p class="card-body-text" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:15px;color:#D2D2D2;letter-spacing:0.2px;line-height:1.55;margin:0;">
                                    Join the testers GC for real-time drops, behind-the-scenes updates, and first dibs as we build. Tap in.
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <!--[if mso]>
                                  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://chat.whatsapp.com/JYVG4hCC5gZ6q9MfluDOSo?mode=gi_t" style="height:34px;v-text-anchor:middle;width:160px;" arcsize="50%" stroke="f" fillcolor="#2A2A91">
                                    <w:anchorlock/>
                                    <center style="color:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;">Join WhatsApp group &rarr;</center>
                                  </v:roundrect>
                                  <![endif]-->
                                  <!--[if !mso]><!-->
                                  <a
                                    href="https://chat.whatsapp.com/JYVG4hCC5gZ6q9MfluDOSo?mode=gi_t"
                                    class="btn-primary"
                                    style="display:inline-block;background-color:#2A2A91;color:#FFFFFF !important;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:12px;text-align:center;text-decoration:none;padding:9px 20px;border-radius:999px;letter-spacing:-0.3px;white-space:nowrap;mso-hide:all;"
                                  >Join WhatsApp group &rarr;</a>
                                  <!--<![endif]-->
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:22px;">
                        <tr>
                          <td style="padding:0;font-size:0;line-height:0;">
                            <div style="width:100%;height:1px;background-color:#CCCCCC;font-size:0;line-height:0;"></div>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td
                            class="signoff-td"
                            style="padding:32px 24px;background-color:#0A0A0A;border-radius:5px;"
                          >
                            <p class="signoff-text" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:22px;color:#FFFFFF;letter-spacing:0.2px;line-height:1.5;margin:0;">
                              Thanks again for joining us early.
                            </p>
                            <p class="signoff-text" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;font-size:22px;color:#FFFFFF;letter-spacing:0.2px;line-height:1.5;margin:22px 0 0;">
                              See you soon.
                            </p>
                            <p class="signoff-name" style="font-family:Arial,Helvetica,sans-serif;font-weight:400;font-size:22px;color:#FFFFFF;letter-spacing:-0.1px;line-height:1.5;margin:22px 0 0;">
                              — Worthy from nēro
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td
                      class="footer-cell"
                      align="center"
                      style="padding:64px 40px 56px;background-color:#2A2A91;text-align:center;"
                    >
                      <div style="margin-bottom:20px;text-align:center;">
                        <a href="https://waitlist.neroapp.co" style="display:inline-block;line-height:0;">
                          <img
                            src="https://res.cloudinary.com/dentghiic/image/upload/v1775071417/Logo_hyr7r6.png"
                            alt="nēro"
                            width="90"
                            height="30"
                            style="display:inline-block;width:90px;height:30px;"
                          />
                        </a>
                      </div>

                      <p class="footer-motto" style="font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:18px;color:#FFFFFF;letter-spacing:-0.5px;line-height:1.2;margin:0 0 28px;">
                        Control your spending. Fix your future.
                      </p>

                      <div class="footer-divider" style="width:100%;height:1px;background-color:rgba(255,255,255,0.18);font-size:0;line-height:0;margin:0 0 24px;"></div>

                      <p class="footer-copy" style="font-family:Arial,Helvetica,sans-serif;font-weight:400;font-size:13px;color:rgba(248,247,247,0.80);letter-spacing:-0.2px;line-height:1.65;margin:0 0 22px;">
                        You're receiving this because you joined the nēro waitlist.<br />
                        If this isn't for you, you can <a href="#" style="color:#FFFFFF !important;text-decoration:underline;">unsubscribe</a> anytime.
                      </p>

                      <div style="margin-bottom:32px;text-align:center;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                          <tr>
                            <td style="padding:0 8px;">
                              <a href="https://instagram.com/nero.fin" style="display:inline-block;text-decoration:none;">
                                <span class="social-pill" style="display:inline-block;border:1px solid rgba(255,255,255,0.35);border-radius:999px;padding:10px;line-height:0;background-color:transparent;">
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

                      <p class="footer-small" style="font-family:Arial,Helvetica,sans-serif;font-weight:400;font-size:11px;color:rgba(248,247,247,0.55);letter-spacing:-0.2px;margin:0;">
                        &copy; 2026 nēro. All rights reserved.
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