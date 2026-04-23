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
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 24px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 400px; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 600; color: #1a1a1a;">nero</h1>
              <p style="margin: 0 0 24px; font-size: 14px; color: #666666;">enter this code to verify your email</p>
              <div style="background-color: #f5f5f5; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #1a1a1a;">${code}</span>
              </div>
              <p style="margin: 0; font-size: 13px; color: #999999;">this code expires in 2 minutes</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: "your verification code",
      html: buildOtpEmailHtml(code),
    });

    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("SMTP send error:", error);
    return res.status(500).json({ success: false, error: "Failed to send email" });
  }
}