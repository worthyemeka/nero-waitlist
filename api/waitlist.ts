import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.zoho.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_SECURE = (process.env.SMTP_SECURE ?? "true").toLowerCase() === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL ?? "nēro <no-reply@neroapp.co>";

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ALLOWED_EMAIL_DOMAINS = new Set([
    "gmail.com",
    "googlemail.com",
    "yahoo.com",
    "yahoo.co.uk",
    "yahoo.com.au",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "msn.com",
    "icloud.com",
    "me.com",
    "mac.com",
    "proton.me",
    "protonmail.com",
    "protonmail.ch",
    "pm.me",
    "aol.com",
    "gmx.com",
    "gmx.net",
    "gmx.us",
    ]);

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

    function isAllowedEmailAddress(email: string): boolean {
    const domain = email.split("@")[1]?.toLowerCase();
    return Boolean(domain && ALLOWED_EMAIL_DOMAINS.has(domain));
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

            async function waitlistSignupExists(email: string): Promise<boolean> {
            const supabaseUrl = requireEnv("SUPABASE_URL", SUPABASE_URL);
            const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY", SUPABASE_SERVICE_ROLE_KEY);

            const response = await fetch(
            `${supabaseUrl}/rest/v1/waitlist_signups?select=id&email=eq.${encodeURIComponent(email)}&limit=1`,
            {
            method: "GET",
            headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            },
            }
            );

            if (!response.ok) {
            throw new Error(`Failed to check existing signup: ${response.status}`);
            }

            const data = (await response.json()) as Array<{ id: number }>;
            return Array.isArray(data) && data.length > 0;
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
            <html lang="en">

            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="x-apple-disable-message-reformatting" />
                <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
                <title>You're in! — nēro</title>

                <style>
                    body {
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                        background: #ffffff !important;
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }

                    table {
                        border-collapse: collapse !important;
                        mso-table-lspace: 0pt !important;
                        mso-table-rspace: 0pt !important;
                    }

                    img {
                        border: 0 !important;
                        display: block !important;
                        outline: none !important;
                        text-decoration: none !important;
                        -ms-interpolation-mode: bicubic !important;
                    }

                    a {
                        text-decoration: none;
                    }

                    .preheader {
                        display: none !important;
                        visibility: hidden !important;
                        opacity: 0 !important;
                        overflow: hidden !important;
                        max-height: 0 !important;
                        max-width: 0 !important;
                        mso-hide: all !important;
                        font-size: 1px !important;
                        line-height: 1px !important;
                    }

                    @media only screen and (max-width: 600px) {
                        .wrapper {
                            width: 100% !important;
                            max-width: 100% !important;
                        }

                        .cards-pad {
                            padding-left: 27px !important;
                            padding-right: 27px !important;
                        }
                    }
                </style>
            </head>

            <body style="margin:0;padding:0;background:#ffffff;">
                <div class="preheader">
                    Thank you for signing up for our waitlist. Please read this email as it contains the next steps for you to follow.
                </div>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="background:#ffffff;">
                    <tr>
                        <td align="center" style="padding:0;">

                            <table role="presentation" class="wrapper" width="600" cellpadding="0" cellspacing="0"
                                border="0" style="width:600px;max-width:600px;background:#05030d;">

                                <tr>
                                    <td align="center" style="padding:0;font-size:0;line-height:0;background:#05030d;">
                                        <a href="https://waitlist.neroapp.co" target="_blank" style="display:block;">
                                            <img src="https://res.cloudinary.com/dentghiic/image/upload/v1780351410/Hero_2x_udeubh.webp"
                                                width="600" alt="You're in! Let's build this together."
                                                style="width:100%;max-width:600px;height:auto;" />
                                        </a>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" style="padding:0;font-size:0;line-height:0;background:#05030d;">
                                        <img src="https://res.cloudinary.com/dentghiic/image/upload/v1780351408/Body_afsllk.webp"
                                            width="600" alt="Welcome to nēro"
                                            style="width:100%;max-width:600px;height:auto;" />
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center"
                                        background="https://res.cloudinary.com/dentghiic/image/upload/v1780351409/Cards_bg_fantxy.webp"
                                        style="
                padding:0;
                background-color:#05030d;
                background-image:url('https://res.cloudinary.com/dentghiic/image/upload/v1780264016/Cards_bg_szjabs.png');
                background-size:cover;
                background-position:center top;
                background-repeat:no-repeat;
              ">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                            border="0">
                                            <tr>
                                                <td class="cards-pad" align="center" style="padding:0 44px 0 44px;">

                                                    <a href="https://chat.whatsapp.com/GmIOkXzIITu8knz6QHo45m?mode=gi_t"
                                                        target="_blank" style="display:block;">
                                                        <img src="https://res.cloudinary.com/dentghiic/image/upload/v1780351409/feature_1_oio7zp.webp"
                                                            width="512" alt="Join our WhatsApp community"
                                                            style="width:100%;max-width:512px;height:auto;margin:0 0 22px 0;" />
                                                    </a>

                                                    <a href="https://instagram.com/getneroapp" target="_blank"
                                                        style="display:block;">
                                                        <img src="https://res.cloudinary.com/dentghiic/image/upload/v1780351409/feature_2_p18g9t.webp"
                                                            width="512" alt="Follow us on Instagram"
                                                            style="width:100%;max-width:512px;height:auto;margin:0 0 22px 0;" />
                                                    </a>

                                                    <a href="https://www.linkedin.com/company/neroapp-ltd/" target="_blank"
                                                        style="display:block;">
                                                        <img src="https://res.cloudinary.com/dentghiic/image/upload/v1780351409/feature_3_gkplkf.webp"
                                                            width="512" alt="Follow us on LinkedIn"
                                                            style="width:100%;max-width:512px;height:auto;margin:0;" />
                                                    </a>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" style="padding:0;font-size:0;line-height:0;background:#05030d;">
                                        <img src="https://res.cloudinary.com/dentghiic/image/upload/v1780351409/close_vrkzuf.webp"
                                            width="600" alt="We'll be in touch soon"
                                            style="width:100%;max-width:600px;height:auto;margin:0 0 -36px 0;" />
                                    </td>
                                </tr>

                                <tr>

                                    <td
                                        style="background-color:#0A0A0A;padding:28px 40px 36px 40px;text-align:center;font-family:Helvetica,Arial,sans-serif;">

                                        <p
                                            style="margin:0 0 10px 0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.72);">

                                            You are receiving this because you joined the nēro waitlist.

                                        </p>

                                        <p
                                            style="margin:0 0 10px 0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.72);">

                                            <a href="https://www.instagram.com/getneroapp/"
                                                style="color:#FFFFFF;text-decoration:underline;">Instagram</a>

                                            &nbsp;•&nbsp;

                                            <a href="https://www.linkedin.com/company/neroapp-ltd/"
                                                style="color:#FFFFFF;text-decoration:underline;">LinkedIn</a>

                                        </p>

                                        <p
                                            style="margin:0;font-size:11px;line-height:1.6;color:rgba(255,255,255,0.52);">

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

            if (!isAllowedEmailAddress(normalizedEmail)) {
            return res.status(400).json({ error: "not valid email" });
            }

            try {
            const exists = await waitlistSignupExists(normalizedEmail);

            if (exists) {
            return res.status(200).json({
            message: "You're already on the waitlist. We'll keep you posted.",
            });
            }

            await sendWelcomeEmail(normalizedEmail);

            const state = await saveWaitlistSignup(normalizedEmail);

            if (state === "exists") {
            return res.status(200).json({
            message: "You're already on the waitlist. We'll keep you posted.",
            });
            }

            return res.status(200).json({
            message: "You're on the waitlist! Check your inbox.",
            });
            } catch (error) {
            console.error("Waitlist handler error:", error);
            return res.status(500).json({
            error: "Failed to complete waitlist signup. Please try again.",
            });
            }
            }
