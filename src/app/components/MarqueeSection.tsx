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
    <section className="w-full overflow-hidden bg-white pt-4 pb-10 md:pt-6 md:pb-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center"
      >
        <p className="text-[22px] font-medium tracking-[0px] text-black/40">Connect to your bank in seconds</p>
      </motion.div>

      <div className="relative mt-5 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-24 md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-24 md:w-32" />

        <div
          className="flex w-max items-center"
          style={{ animation: "marquee 34s linear infinite", willChange: "transform" }}
        >
          <div className="flex shrink-0 items-center gap-10 px-6 md:gap-12 md:px-10">
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="flex min-w-[180px] shrink-0 items-center justify-center py-3 opacity-90 transition-opacity duration-300 hover:opacity-100"
              >
                <img src={logo.src} alt={logo.alt} className="h-[40px] object-contain md:h-[48px]" />
              </div>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-10 px-6 md:gap-12 md:px-10" aria-hidden="true">
            {logos.map((logo) => (
              <div
                key={`${logo.alt}-duplicate`}
                className="flex min-w-[180px] shrink-0 items-center justify-center py-3 opacity-90 transition-opacity duration-300 hover:opacity-100"
              >
                <img src={logo.src} alt="" className="h-[40px] object-contain md:h-[48px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
