import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body as { email?: string };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    // Send confirmation email
    await resend.emails.send({
      from: process.env.FROM_EMAIL ?? "nēro <onboarding@resend.dev>",
      to: email,
      subject: "You're on the nēro waitlist 🎉",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Welcome to nēro</title>
          </head>
          <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
              <tr>
                <td align="center">
                  <table width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;max-width:560px;width:100%;">
                    <!-- Header -->
                    <tr>
                      <td style="background-color:#0E0E2C;padding:40px 48px 32px;">
                        <p style="margin:0;font-size:28px;font-weight:600;color:#ffffff;letter-spacing:-0.5px;">nēro</p>
                      </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                      <td style="padding:40px 48px;">
                        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#0E0E2C;letter-spacing:-0.5px;">
                          You're on the list.
                        </h1>
                        <p style="margin:0 0 24px;font-size:16px;color:#797C86;line-height:1.6;">
                          Thanks for joining the nēro waitlist. We're building something that makes managing your money actually feel effortless — and you'll be among the first to experience it.
                        </p>
                        <p style="margin:0 0 24px;font-size:16px;color:#797C86;line-height:1.6;">
                          We'll reach out as soon as your spot is ready.
                        </p>
                        <p style="margin:0;font-size:16px;color:#0E0E2C;font-weight:500;">
                          — The nēro team
                        </p>
                      </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                      <td style="padding:24px 48px;border-top:1px solid #f0f0f0;">
                        <p style="margin:0;font-size:13px;color:#b0b3bb;">
                          You received this because you signed up at nero.app. No further emails unless we have news.
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

    // Track waitlist signup event in Resend
    await resend.events.send({
      event: "Signs up for waitlist",
      email,
      payload: {
        email,
        signedUpAt: new Date().toISOString(),
      },
    });

    return res.status(200).json({ message: "You're on the waitlist! Check your inbox." });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send confirmation email. Please try again." });
  }
}
