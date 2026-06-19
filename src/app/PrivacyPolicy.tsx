import React, { useEffect, useState } from "react";
import BreadcrumbHeader from "./BreadcrumbHeader";
import { motion } from "framer-motion";

import doodleLayer from "../assets/doodle-layer.png";
import footerEllipse from "../assets/footer-ellipse.png";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.jpeg";
import avatar4 from "../assets/avatar4.png";
import avatar5 from "../assets/avatar5.jpeg";
import avatar6 from "../assets/avatar6.jpg";

const revealTransition = {
  type: "spring" as const,
  stiffness: 60,
  damping: 18,
  mass: 0.9,
};

const privacySections = [
  {
    title: "1. Who We Are",
    body: [
      "nēro is a product of NERO SYSTEM LIMITED. We are building a spending clarity platform that helps people understand what they can safely spend every day.",
      "Our goal is simple: less guesswork, more control. This Privacy Policy explains how we collect, use, and protect your information when you use our website, join our waitlist, or use our future product.",
    ],
  },
  {
    title: "2. What This Policy Covers",
    list: [
      "The nēro website",
      "The nēro waitlist",
      "The nēro mobile app when launched",
      "Emails, updates, and related services connected to nēro",
    ],
  },
  {
    title: "3. Information We Collect",
    body: [
      "We only collect information that helps us provide, improve, and protect nēro.",
    ],
    list: [
      "Your email address when you join the waitlist",
      "Your name, phone number, or account details if you choose to provide them later",
      "Basic device and usage data such as browser type, IP address, pages visited, and diagnostics",
      "Financial or transaction-related data only when you give permission inside the product",
    ],
  },
  {
    title: "4. Financial and Transaction Data",
    body: [
      "nēro may use transaction data to help calculate your spending activity, daily safe-to-spend number, summaries, and insights.",
      "We do not ask for your bank login password. We do not directly access your bank account without your permission.",
    ],
  },
  {
    title: "5. How We Use Your Information",
    list: [
      "To manage the waitlist and send product updates",
      "To provide spending clarity features when the product launches",
      "To improve the website, app, and user experience",
      "To communicate important updates",
      "To prevent fraud, abuse, or misuse of the platform",
      "To comply with legal and regulatory requirements",
    ],
  },
  {
    title: "6. Email Communication",
    body: [
      "If you join the nēro waitlist, we may send you updates about the product, launch, early access, and important account-related information.",
      "You can unsubscribe from marketing emails at any time using the unsubscribe link in our emails.",
    ],
  },
  {
    title: "7. Data Sharing",
    body: [
      "We do not sell your personal data.",
      "We may share limited information with trusted service providers who help us run nēro, such as hosting providers, analytics tools, email platforms, and infrastructure partners.",
    ],
    list: [
      "These providers are only allowed to use your data to support nēro.",
      "We may also share information if required by law or to protect our users, business, or platform.",
    ],
  },
  {
    title: "8. Data Security",
    body: [
      "We take reasonable steps to protect your information using secure infrastructure, access controls, and other safeguards.",
      "No digital system is completely risk-free, but we treat your data with care and work to keep it safe.",
    ],
  },
  {
    title: "9. Data Retention",
    body: [
      "We keep your information only for as long as necessary to provide our services, manage our waitlist, meet legal requirements, resolve disputes, and improve nēro.",
      "You may request deletion of your data by contacting us.",
    ],
  },
  {
    title: "10. Your Rights",
    list: [
      "You can request access to the personal data we hold about you.",
      "You can ask us to correct inaccurate information.",
      "You can request deletion of your information.",
      "You can unsubscribe from marketing emails.",
      "You can withdraw consent where processing is based on consent.",
    ],
  },
  {
    title: "11. Children’s Privacy",
    body: [
      "nēro is not intended for users under 18. We do not knowingly collect personal information from children.",
    ],
  },
  {
    title: "12. Third-Party Services",
    body: [
      "nēro may use third-party tools and services to support our website, waitlist, emails, analytics, hosting, and future app features. These services may have their own privacy policies.",
    ],
  },
  {
    title: "13. International Data Processing",
    body: [
      "Your information may be processed outside your country of residence depending on the tools and infrastructure we use. Where this happens, we take reasonable steps to protect your data.",
    ],
  },
  {
    title: "14. Changes to This Policy",
    body: [
      "We may update this Privacy Policy as nēro grows. The latest version will always be shown on this page with the updated date.",
    ],
  },
];

export default function PrivacyPolicy() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(0);

  const fetchWaitlistCount = async () => {
    try {
      const res = await fetch("/api/waitlist-resend");
      if (!res.ok) throw new Error("Failed to fetch waitlist count");

      const data = await res.json();
      const fetchedCount = Number(data.count ?? 0);
      const safeCount = Number.isFinite(fetchedCount) ? Math.max(0, fetchedCount) : 0;

      setTarget(safeCount);
    } catch {
      setTarget(0);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCount() {
      try {
        const res = await fetch("/api/waitlist-resend", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch waitlist count");

        const data = await res.json();
        const fetchedCount = Number(data.count ?? 0);
        const safeCount = Number.isFinite(fetchedCount) ? Math.max(0, fetchedCount) : 0;

        setTarget(safeCount);
      } catch {
        setTarget(0);
      }
    }

    fetchCount();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (target === 0) return;

    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const interval = setInterval(() => {
      current += increment;

      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [target]);

  const handleSubmit = async () => {
    if (!email || isLoading) return;

    setIsLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist-resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Successfully joined the waitlist!");
        setEmail("");
        fetchWaitlistCount();
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to join waitlist. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to join waitlist. Please try again.");
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 4000);
    }
  };

  useEffect(() => {
    document.title = "nēro Privacy Policy";

    let metaDesc = document.querySelector('meta[name="description"]');

    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }

    metaDesc.setAttribute(
      "content",
      "Read the Privacy Policy for nēro. Learn how we collect, use, and protect your data while building spending clarity for everyday people."
    );
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        fontFamily: "Satoshi, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        background: "#fff",
        color: "#181818",
      }}
    >
      <BreadcrumbHeader pageTitle="Privacy Policy" />

      <main className="max-w-[760px] mx-auto px-5 sm:px-8 py-10 sm:py-14 md:py-16">
        <div className="mb-8 sm:mb-10">
          <p className="text-[#2A2A91] font-bold text-[14px] sm:text-[15px] md:text-[16px] mb-3">
            Last Updated: April 2026
          </p>

          <h1 className="text-[#2A2A91] font-bold text-[32px] sm:text-[42px] md:text-[52px] leading-[1.05] tracking-[-1px]">
            Privacy Policy
          </h1>

          <p className="text-[#696969] text-[15px] sm:text-[17px] md:text-[18px] leading-[1.7] mt-4 max-w-[680px]">
            Your money data is personal. This policy explains what we collect,
            why we collect it, and how we protect it while building nēro.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {privacySections.map((section) => (
            <section key={section.title}>
              <h2 className="text-[#181818] font-bold text-[20px] sm:text-[24px] md:text-[28px] leading-[1.25] tracking-[-0.3px] mb-3">
                {section.title}
              </h2>

              {section.body?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[#4f4f4f] text-[14px] sm:text-[16px] md:text-[17px] leading-[1.75] mb-3"
                >
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <ul className="list-disc pl-5 space-y-2 text-[#4f4f4f] text-[14px] sm:text-[16px] md:text-[17px] leading-[1.7]">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h2 className="text-[#181818] font-bold text-[20px] sm:text-[24px] md:text-[28px] leading-[1.25] tracking-[-0.3px] mb-3">
              15. Contact Us
            </h2>

            <p className="text-[#4f4f4f] text-[14px] sm:text-[16px] md:text-[17px] leading-[1.75]">
              For questions about this Privacy Policy, contact us at{" "}
              <a href="mailto:support@neroapp.co" className="text-[#2A2A91] underline">
                support@neroapp.co
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <section id="cta" className="relative w-full overflow-hidden">
        <img
          src={doodleLayer}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[1]"
        />

        <div
          className="absolute inset-x-0 top-0 h-[120px] pointer-events-none z-[3]"
          style={{ background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)" }}
        />

        <img
          src={footerEllipse}
          alt=""
          className="absolute inset-x-0 bottom-0 w-full pointer-events-none z-[2]"
          style={{ opacity: 0.3 }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 pt-[72px] sm:pt-[100px] md:pt-[120px] pb-[64px] sm:pb-[100px] md:pb-[120px]">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={revealTransition}
            className="font-['Satoshi:700',sans-serif] font-bold text-[#2A2A91] text-[26px] sm:text-[34px] md:text-[42px] xl:text-[52px] leading-[1.15] tracking-[-0.5px] md:tracking-[-1px] max-w-[340px] sm:max-w-[440px] md:max-w-[600px] xl:max-w-[700px]"
          >
            This isn't about restriction.
            <br />
            It's about control.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...revealTransition, delay: 0.15 }}
            className="font-['Satoshi:Regular',sans-serif] text-[#696969] text-[14px] sm:text-[15px] md:text-[17px] xl:text-[18px] leading-[1.55] mt-[16px] sm:mt-[20px] md:mt-[24px] max-w-[320px] sm:max-w-[400px] md:max-w-[480px]"
          >
            Get early access to nēro and start spending with
            <br className="hidden sm:block" />
            clarity — not guesswork.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...revealTransition, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-[12px] items-stretch sm:items-center mt-[28px] sm:mt-[32px] md:mt-[40px] w-full max-w-[540px]"
          >
            <div className="bg-white content-stretch flex flex-col h-[48px] items-start overflow-clip pl-[18px] pr-[16px] py-[14px] relative rounded-[80px] shrink-0 w-full sm:flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="Enter your email"
                className="w-full h-full bg-transparent outline-none font-['Satoshi:Regular',sans-serif] text-[16px] text-black placeholder:text-[rgba(0,0,0,0.4)] disabled:opacity-50"
              />
            </div>

            <motion.button
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              onClick={handleSubmit}
              disabled={isLoading || !email}
              className="bg-[#2a2a91] rounded-[80px] shrink-0 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed w-full sm:w-auto h-[48px] px-[24px] whitespace-nowrap"
            >
              <span className="font-['Satoshi:Medium',sans-serif] text-[16px] text-white leading-[16px]">
                {isLoading ? "Joining..." : "Get early access"}
              </span>
            </motion.button>
          </motion.div>

          {status !== "idle" && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 text-[14px] font-['Satoshi:Medium',sans-serif] ${
                status === "success" ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...revealTransition, delay: 0.45 }}
            className="content-stretch flex gap-[8px] sm:gap-[12px] items-center justify-center relative shrink-0 w-full flex-nowrap mt-[20px] sm:mt-[24px]"
          >
            <div className="relative flex items-center h-[32px] sm:h-[36px] md:h-[40px] flex-shrink-0">
              <div className="relative flex">
                {avatars.map((avatar, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                    className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] md:w-[40px] md:h-[40px] rounded-full border-2 border-white overflow-hidden bg-gray-200 relative shadow-md flex-shrink-0"
                    style={{
                      zIndex: 50 - index,
                      marginLeft: index > 0 ? "-6px" : "0",
                    }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <img alt="" src={avatar} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col font-['Satoshi:Regular',sans-serif] justify-center leading-[1.35] relative shrink-0 text-[11px] sm:text-[13px] md:text-[15px] tracking-normal min-w-0">
              <p className="not-italic whitespace-nowrap">
                <span className="font-['Satoshi:700',sans-serif] font-bold text-[#2a2a91]">
                  {count} people
                </span>
                <span className="font-['Satoshi:Regular',sans-serif] text-[#696969]">
                  {" already signed up for our waitlist"}
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        <footer className="relative z-10 w-full border-t border-[rgba(255,255,255,0.15)]">
          <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between px-5 sm:px-8 md:px-12 xl:px-[80px] py-[18px] sm:py-[24px] gap-[14px] sm:gap-0">
            <div className="flex items-center gap-[10px] order-1 w-full sm:w-auto justify-center sm:justify-start">
              <span className="font-['Satoshi:Regular',sans-serif] text-[13px] md:text-[14px] text-[#696969]">
                Follow us:
              </span>

              <a
                href="https://www.instagram.com/getneroapp_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-[28px] h-[28px] md:w-[30px] md:h-[30px] rounded-full bg-[#12123d] flex items-center justify-center hover:bg-[#2a2a91] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"
                    fill="white"
                  />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/neroapp-ltd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-[28px] h-[28px] md:w-[30px] md:h-[30px] rounded-full bg-[#12123d] flex items-center justify-center hover:bg-[#2a2a91] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.35 4.24 5.41v6.33z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>

            <div className="order-2 w-full sm:w-auto text-center">
              <p className="font-['Satoshi:Regular',sans-serif] text-[13px] md:text-[14px] text-[#696969]">
                © 2026 nēro. All rights reserved.
              </p>

              <p className="font-['Satoshi:Regular',sans-serif] text-[11px] md:text-[12px] text-[#696969] mt-[4px] leading-[1.5]">
                nēro is a product of NERO SYSTEM LIMITED • RC: 9470791
              </p>
            </div>

            <div className="flex w-full sm:w-auto justify-between sm:justify-end items-center order-3 gap-0 sm:gap-[20px]">
              <a
                href="/terms-of-service"
                className="font-['Satoshi:Regular',sans-serif] text-[13px] md:text-[14px] text-[#696969] hover:text-[#2a2a91] transition-colors"
                style={{ minWidth: "max-content" }}
              >
                Terms of Service
              </a>

              <a
                href="/privacy-policy"
                className="font-['Satoshi:Regular',sans-serif] text-[13px] md:text-[14px] text-[#696969] hover:text-[#2a2a91] transition-colors"
                style={{ minWidth: "max-content" }}
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
