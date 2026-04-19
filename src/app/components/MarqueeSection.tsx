// MarqueeSection.tsx
import { motion } from "motion/react";
import accessLogo from "../../assets/Access_Bank_PLC_Logo.png";
import kudaLogo from "../../assets/Kuda_Bank_Logo.png";
import moniepointLogo from "../../assets/Moniepointlogo.png";
import sterlingLogo from "../../assets/Sterling_Bank_Logo_Straight.png";
import stanbicLogo from "../../assets/stibtc.png";

const logos = [
  { src: accessLogo, alt: "Access Bank" },
  { src: kudaLogo, alt: "Kuda Bank" },
  { src: moniepointLogo, alt: "Moniepoint" },
  { src: sterlingLogo, alt: "Sterling Bank" },
  { src: stanbicLogo, alt: "Stanbic IBTC" },
];

export default function MarqueeSection() {
  return (
    <section className="w-full overflow-hidden bg-white pb-8 pt-3 md:pb-10 md:pt-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center"
      >
        <p className="text-[15px] font-medium tracking-[0px] text-black/40 md:text-[22px]">
          Connect to your bank in seconds
        </p>
      </motion.div>

      <div className="relative mt-4 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-24 md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-24 md:w-32" />

        <div className="flex w-max items-center [animation:marquee_34s_linear_infinite] [will-change:transform]">
          <div className="flex shrink-0 items-center gap-4 px-3 md:gap-12 md:px-10">
            {logos.map((logo) => (
              <motion.div
                key={logo.alt}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + Math.random() * 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="flex min-w-[120px] shrink-0 items-center justify-center py-3 opacity-90 transition-opacity duration-300 hover:opacity-100 md:min-w-[160px]"
              >
                <img src={logo.src} alt={logo.alt} className="h-[26px] object-contain sm:h-[32px] md:h-[48px]" />
              </motion.div>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-4 px-3 md:gap-12 md:px-10" aria-hidden="true">
            {logos.map((logo) => (
              <motion.div
                key={`${logo.alt}-duplicate`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + Math.random() * 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="flex min-w-[120px] shrink-0 items-center justify-center py-3 opacity-90 transition-opacity duration-300 hover:opacity-100 md:min-w-[160px]"
              >
                <img src={logo.src} alt="" className="h-[26px] object-contain sm:h-[32px] md:h-[48px]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}