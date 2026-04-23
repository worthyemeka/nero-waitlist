import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.zoho.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_SECURE = (process.env.SMTP_SECURE ?? "true").toLowerCase() === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL ?? "Nero <no-reply@neroapp.co>";

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
  tls: { minVersion: "TLSv1.2" },
});

function buildOtpEmailHtml(code: string): string {
  const subject = "your verification code";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body style="margin:0;padding:0;background-color:#f6f6f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f8;padding:32px 16px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:420px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.04);">

          <!-- Header -->
          <tr>
            <td style="background:#2A2A91;padding:28px 24px;text-align:center;">

              <img 
                src="https://res.cloudinary.com/dentghiic/image/upload/v1776908442/nero-light-logo_icxpx3.png"
                width="50"
                style="display:block;margin:0 auto 0;"

              />

            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 28px;text-align:center;">
              <div style="font-size:26px;color:#0a0a0a;opacity:0.9; text-transform: capitalize; font-weight: 700; padding: 0 0 10px 0;">
                verify your email
              </div>
              <div style="font-size:14px;color:#666666;margin-bottom:28px;line-height:1.5;">
                enter the code below to continue
              </div>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">

                    <div style="
                      background:#F4F4F6;
                      border-radius:14px;
                      padding:22px 16px;
                      display:inline-block;
                      min-width:260px;
                    ">

                      <span style="
                        font-size:34px;
                        font-weight:700;
                        letter-spacing:10px;
                        color:#111111;
                      ">
                        ${code}
                      </span>

                    </div>

                  </td>
                </tr>
              </table>

              <!-- CTA Button (rounded as requested) -->
              <a href="#" style="
                display:inline-block;
                background:#2A2A91;
                color:#FFFFFF;
                font-size:13px;
                font-weight:600;
                text-decoration:none;
                padding:12px 120px;
                border-radius:999px;
                margin-bottom:24px;
              ">
                Continue
              </a>

              <div style="font-size:12px;color:#999999;">
                this code expires in 2 minutes
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px;text-align:center;background:#fafafa;">

              <div style="font-size:11px;color:#bbbbbb;line-height:1.5;">
                if you didn't request this, you can ignore this email
              </div>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

  return html;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { email, code } = req.body as { email?: string; code?: string };

  if (!email || !code) {
    return res.status(400).json({ success: false, error: "Missing email or code" });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ success: false, error: "Invalid email address" });
  }

  try {
    const html = buildOtpEmailHtml(code);
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: "your verification code",
      html,
    });

    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("SMTP send error:", error);
    return res.status(500).json({ success: false, error: "Failed to send email" });
  }
}