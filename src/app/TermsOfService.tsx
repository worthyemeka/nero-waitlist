import React, { useEffect } from "react";
import BreadcrumbHeader from "./BreadcrumbHeader";
import { motion } from "framer-motion";
import { useState } from "react";
// Animation transition for reveals
const revealTransition = {
    type: "spring" as const,
    stiffness: 60,
    damping: 18,
    mass: 0.9,
};

import doodleLayer from "../assets/doodle-layer.png";
import footerEllipse from "../assets/footer-ellipse.png";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.jpeg";
import avatar4 from "../assets/avatar4.png";
import avatar5 from "../assets/avatar5.jpeg";
import avatar6 from "../assets/avatar6.jpg";

export default function TermsOfService() {
    // CTA form state
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    // Avatars and count
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
    const count = 1200;

    // Handle CTA submit
    const handleSubmit = async () => {
        if (!email) return;
        setIsLoading(true);
        setStatus("idle");
        setMessage("");
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setStatus("success");
            setMessage("You're on the waitlist! Check your inbox.");
            setEmail("");
        } catch (e) {
            setStatus("error");
            setMessage("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // SEO: Set page title and meta description
    useEffect(() => {
        document.title = "nēro Terms of Service";
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', 'Read the Terms of Service for nēro. Understand your rights, responsibilities, and how we protect your data and experience.');
    }, []);
    return (
        <div style={{ minHeight: "100vh", width: "100vw", fontFamily: "Satoshi, 'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#fff", color: "#181818" }}>
            <BreadcrumbHeader pageTitle="Terms of Service" />
            <div style={{ maxWidth: 700, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
                <h2 style={{ color: "#2A2A91", fontWeight: 700, fontSize: 24, marginBottom: 8 }}>Last Updated: April 2026</h2>
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
                {/* Doodle background layer */}
                <img
                    src={doodleLayer}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[1]"
                />

                {/* White fade at the top — blends doodle into page */}
                <div
                    className="absolute inset-x-0 top-0 h-[120px] pointer-events-none z-[3]"
                    style={{ background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)" }}
                />

                {/* Purple gradient ellipse — full width from bottom */}
                <img
                    src={footerEllipse}
                    alt=""
                    className="absolute inset-x-0 bottom-0 w-full pointer-events-none z-[2]"
                    style={{ opacity: 0.3 }}
                />

                {/* CTA Content */}
                <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 pt-[72px] sm:pt-[100px] md:pt-[120px] pb-[64px] sm:pb-[100px] md:pb-[120px]">
                    {/* Heading */}
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

                    {/* Subtext */}
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

                    {/* Email Form */}
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

                    {/* Status message */}
                    {status !== "idle" && (
                        <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-3 text-[14px] font-['Satoshi:Medium',sans-serif] ${status === "success" ? "text-green-600" : "text-red-500"
                                }`}
                        >
                            {message}
                        </motion.p>
                    )}

                    {/* Avatar counter */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ ...revealTransition, delay: 0.45 }}
                        className="flex flex-wrap items-center justify-center gap-[10px] mt-[20px] sm:mt-[24px] max-w-[360px] sm:max-w-none"
                    >
                        <div className="relative flex">
                            {avatars.map((avatar, i) => (
                                <div
                                    key={i}
                                    className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px] rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-sm flex-shrink-0"
                                    style={{ zIndex: 10 - i, marginLeft: i > 0 ? "-8px" : "0" }}
                                >
                                    <img
                                        alt=""
                                        src={avatar}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="font-['Satoshi:Regular',sans-serif] text-[12px] sm:text-[13px] md:text-[14px] text-center sm:text-left">
                            <span className="font-['Satoshi:700',sans-serif] font-bold text-[#2a2a91]">
                                Join {count} people
                            </span>
                            <span className="text-[#696969]"> getting early access</span>
                        </p>
                    </motion.div>
                </div>


                {/* Footer */}
                <footer className="relative z-10 w-full border-t border-[rgba(255,255,255,0.15)]">
                    <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center sm:items-center justify-between px-5 sm:px-8 md:px-12 xl:px-[80px] py-[18px] sm:py-[24px] gap-[14px] sm:gap-0">
                        {/* Left - Links */}
                        <div className="flex flex-wrap justify-center sm:justify-start gap-[14px] sm:gap-[20px] items-center order-2 sm:order-1">
                            <a
                                href="/terms-of-service"
                                className="font-['Satoshi:Regular',sans-serif] text-[13px] md:text-[14px] text-[#696969] hover:text-[#2a2a91] transition-colors"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="/privacy-policy"
                                className="font-['Satoshi:Regular',sans-serif] text-[13px] md:text-[14px] text-[#696969] hover:text-[#2a2a91] transition-colors"
                            >
                                Privacy Policy
                            </a>
                        </div>

                        {/* Center - Copyright */}
                        <p className="font-['Satoshi:Regular',sans-serif] text-[13px] md:text-[14px] text-[#696969] order-1 sm:order-2 text-center">
                            @2026 nēro. All right's reserved.
                        </p>

                        {/* Right - Social */}
                        <div className="flex items-center gap-[10px] order-3">
                            <span className="font-['Satoshi:Regular',sans-serif] text-[13px] md:text-[14px] text-[#696969]">
                                Follow us:
                            </span>
                            <a
                                href="https://www.instagram.com/nero.fin"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-[28px] h-[28px] md:w-[30px] md:h-[30px] rounded-full bg-[#12123d] flex items-center justify-center hover:bg-[#2a2a91] transition-colors"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                                        fill="white"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </footer>
            </section>
        </div>
    );
}
