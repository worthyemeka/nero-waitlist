// MarqueeSection.tsx
import { motion } from "motion/react";
import accessLogo from "../../assets/Access_Bank_PLC_Logo.png";
import kudaLogo from "../../assets/Kuda_Bank_Logo.png";
import moniepointLogo from "../../assets/Moniepointlogo.png";
import sterlingLogo from "../../assets/Sterling_Bank_Logo_Straight.png";
import stanbicLogo from "../../assets/stibtc.png";
import firstbankLogo from "../../assets/firstbank.png";
import providusLogo from "../../assets/providus.png";
import ubaLogo from "../../assets/uba.png";
import fidelityLogo from "../../assets/fidelity.jpg";
import wemaLogo from "../../assets/wema.png";

const logos = [
  { src: accessLogo, alt: "Access Bank", scale: 1 },
  { src: kudaLogo, alt: "Kuda Bank", scale: 1 },
  { src: moniepointLogo, alt: "Moniepoint", scale: 1 },
  { src: sterlingLogo, alt: "Sterling Bank", scale: 1 },
  { src: stanbicLogo, alt: "Stanbic IBTC", scale: 1 },
  { src: firstbankLogo, alt: "First Bank", scale: 1 },
  { src: providusLogo, alt: "Providus Bank", scale: 1 },
  { src: ubaLogo, alt: "UBA", scale: 1 },
  { src: fidelityLogo, alt: "Fidelity Bank", scale: 1 },
  { src: wemaLogo, alt: "Wema Bank", scale: 1 },
];

export default function MarqueeSection() {
  return (
    <section className="mx-auto w-full max-w-[1440px] overflow-hidden bg-white px-6 py-4 sm:px-10 md:px-[80px] md:py-[48px] lg:mt-[40px] lg:mb-[40px] xl:py-[12px]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <p className="text-[15px] font-medium tracking-[0px] text-black/40 md:text-[22px]">
          Connect to your bank in seconds
        </p>
      </motion.div>

      <div className="relative mt-4 overflow-hidden md:mt-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-24 md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-24 md:w-32" />

        <div className="flex w-max items-center [animation:marquee_34s_linear_infinite] [will-change:transform]">
          <div className="flex shrink-0 items-center gap-[64.11px] px-[32px]">
            {logos.map((logo) => (
              <motion.div
                key={logo.alt}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + Math.random() * 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="flex w-[161.87px] h-[40.03px] shrink-0 items-center justify-center opacity-90 transition-opacity duration-300 hover:opacity-100"
              >
                <img src={logo.src} alt={logo.alt} className="max-w-full max-h-full object-contain" style={{ transform: `scale(${logo.scale})` }} />
              </motion.div>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-[64.11px] px-[32px]" aria-hidden="true">
            {logos.map((logo) => (
              <motion.div
                key={`${logo.alt}-duplicate`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + Math.random() * 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="flex w-[161.87px] h-[40.03px] shrink-0 items-center justify-center opacity-90 transition-opacity duration-300 hover:opacity-100"
              >
                <img src={logo.src} alt="" className="max-w-full max-h-full object-contain" style={{ transform: `scale(${logo.scale})` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}