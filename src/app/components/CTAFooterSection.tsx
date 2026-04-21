import { useState, useEffect } from "react";
import { motion } from "motion/react";
import doodleLayer from "../../assets/doodle-layer.png";
import footerEllipse from "../../assets/footer-ellipse.png";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import avatar3 from "../../assets/avatar3.jpeg";
import avatar4 from "../../assets/avatar4.png";
import avatar5 from "../../assets/avatar5.jpeg";
import avatar6 from "../../assets/avatar6.jpg";

const revealTransition = { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const };

export default function CTAFooterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!email || isLoading) return;

    setIsLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Successfully joined the waitlist!");
        setEmail("");
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

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

  const [count, setCount] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 100;
      const target = 120;
      const duration = 2000;
      const increment = (target - current) / (duration / 16);

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
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (

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
              className={`mt-3 text-[14px] font-['Satoshi:Medium',sans-serif] ${
                status === "success" ? "text-green-600" : "text-red-500"
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
                Join {count}+ people
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
              href="https://www.instagram.com"
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
  );
}
