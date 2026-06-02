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

export default function TermsOfService() {
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

      if (!res.ok) {
        throw new Error("Failed to fetch waitlist count");
      }

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

        if (!res.ok) {
          throw new Error("Failed to fetch waitlist count");
        }

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
    document.title = "nēro Terms of Service";

    let metaDesc = document.querySelector('meta[name="description"]');

    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }

    metaDesc.setAttribute(
      "content",
      "Read the Terms of Service for nēro. Understand your rights, responsibilities, and how we protect your data and experience."
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
      <BreadcrumbHeader pageTitle="Terms of Service" />

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <h2 style={{ color: "#2A2A91", fontWeight: 700, fontSize: 24, marginBottom: 8 }}>
          Last Updated: April 2026
        </h2>

        <section><h2>1. Agreement to Terms</h2><p>By using nēro, you agree to these Terms of Service. If you do not agree, you must not use the service.</p></section>
        <section><h2>2. Description of Service</h2><p>nēro provides tools to track spending, analyze financial activity, and support budgeting decisions.<br />nēro does not provide financial, legal, or investment advice.</p></section>
        <section><h2>3. Eligibility</h2><ul><li>Be at least 18 years old</li><li>Provide accurate and complete information</li><li>Use the service in compliance with applicable laws</li></ul></section>
        <section><h2>4. Account Responsibilities</h2><ul><li>Maintaining the confidentiality of your account</li><li>All activities under your account</li><li>Keeping your information accurate</li></ul></section>
        <section><h2>5. Acceptable Use</h2><ul><li>Use the service for lawful purposes only</li><li>Do not interfere with or disrupt the platform</li><li>Do not attempt unauthorized access to systems or data</li><li>Do not reverse engineer or exploit the service</li></ul></section>
        <section><h2>6. Financial Disclaimer</h2><p>nēro provides insights based on available data. We do not guarantee:</p><ul><li>Accuracy of financial calculations</li><li>Completeness of transaction data</li><li>Financial outcomes</li></ul><p>You remain fully responsible for your financial decisions.</p></section>
        <section><h2>7. Third-Party Services</h2><p>The service may depend on third-party systems. We are not responsible for their performance or availability.</p></section>
        <section><h2>8. Intellectual Property</h2><p>All content, trademarks, and software are owned by nēro ltd. Unauthorized use is prohibited.</p></section>
        <section><h2>9. Termination</h2><p>We may suspend or terminate your account if:</p><ul><li>You violate these Terms</li><li>Required by law</li><li>Necessary to protect the platform</li></ul><p>You may stop using the service at any time.</p></section>
        <section><h2>10. Limitation of Liability</h2><p>To the fullest extent permitted by law, nēro is not liable for:</p><ul><li>Financial loss</li><li>Data inaccuracies</li><li>Service interruptions</li><li>Indirect or consequential damages</li></ul></section>
        <section><h2>11. Indemnity</h2><p>You agree to indemnify nēro against claims arising from:</p><ul><li>Your misuse of the service</li><li>Breach of these Terms</li></ul></section>
        <section><h2>12. Governing Law</h2><p>These Terms are governed by the laws of:</p><ul><li>The Federal Republic of Nigeria</li><li>Where applicable, UK law for international operations</li></ul></section>
        <section><h2>13. Changes to Terms</h2><p>We may update these Terms at any time. Continued use of the service means you accept the updated Terms.</p></section>
        <section><h2>14. Contact</h2><p>Email: <a href="mailto:support@neroapp.co">support@neroapp.co</a></p></section>
      </div>

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
            data-name="Counter"
          >
            <div
              className="relative flex items-center h-[32px] sm:h-[36px] md:h-[40px] flex-shrink-0"
              data-name="Image Block"
            >
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
                    <img
                      alt=""
                      src={avatar}
                      className="w-full h-full object-cover"
                    />
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

        {/* keep your existing footer here */}
      </section>
    </div>
  );
}
