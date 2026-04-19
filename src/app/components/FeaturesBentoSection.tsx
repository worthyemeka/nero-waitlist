import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import bento1Composed from "../../assets/bento1-composed.png";

const revealTransition = { duration: 0.75, ease: [0.22, 1, 0.36, 1] };

export default function FeaturesBentoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const phoneParallaxY = useTransform(scrollYProgress, [0, 1], [18, -20]);
  const headingParallaxY = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-6 pb-20 pt-16 md:px-8 md:pb-24 md:pt-20 lg:px-20 lg:pb-28 lg:pt-24"
    >
      <div className="mx-auto w-full max-w-[1264px]">
        <motion.div
          style={{ y: headingParallaxY }}
          initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={revealTransition}
          className="mx-auto flex max-w-[520px] flex-col items-center text-center"
        >
          <h2 className="text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#12123D] sm:text-[48px] md:text-[54px] lg:text-[56px]">
            One simple idea that changes everything
          </h2>
          <p className="mt-5 text-[17px] leading-7 text-[#8A8A8A] md:text-[20px] md:leading-[30px]">
            Set your spending once. nēro handles the rest.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 xl:mt-14 xl:grid-cols-[730px_510px] xl:grid-rows-[480px_480px] xl:gap-6">
          {/* Bento 1 */}
          <motion.article
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={revealTransition}
            whileHover={{ y: -3 }}
            className="relative h-[460px] overflow-hidden rounded-[24px] md:h-[480px] xl:col-[1/2] xl:row-[1/2]"
            style={{
              background:
                "linear-gradient(90deg, rgba(242,242,242,0.37), rgba(242,242,242,0.37)), #ffffff",
            }}
          >
            {/* Text block */}
            <div className="relative z-[5] w-[383px] pl-8 pt-10">
              <h3 className="text-[28px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#0E0E2C]">
                Spend without running out
              </h3>
              <p className="mt-2 text-[20px] font-normal leading-[1.4] text-[#797C86]">
                nēro shows how much you can spend today based on what you have left
                so your money lasts the month.
              </p>
            </div>

            {/* Right-aligned composed visual */}
            <motion.div
              style={{ y: phoneParallaxY }}
              className="pointer-events-none absolute right-[-90px] top-[-35px] bottom-0 z-[2] w-[560px]"
            >
              <motion.img
                src={bento1Composed}
                alt="nēro spend-without-running-out feature"
                className="absolute right-0 top-0 max-w-none object-contain"
                style={{
                  width: "890px",
                  height: "720px",
                  rotate: "-9.44deg",
                  transformOrigin: "top right",
                }}
                animate={{ y: [0, -7, 0, 7, 0] }}
                transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 top-[163.74px] z-[4] h-[316px] bg-[linear-gradient(180.089deg,rgba(242,243,242,0)_10.575%,rgb(242,243,242)_94.461%)]" />
          </motion.article>

          {/* Bento 2 */}
          <motion.article
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...revealTransition, delay: 0.05 }}
            whileHover={{ y: -3 }}
            className="relative h-[420px] overflow-hidden rounded-[24px] border border-black/10 bg-[linear-gradient(165deg,#EDE6FF_0%,#E5DDF8_68%,#DDD2F4_100%)] md:h-[480px] xl:col-[2/3] xl:row-[1/2]"
          >
            <div className="absolute left-9 right-9 top-8">
              <div className="h-[78px] rounded-[16px] border border-[#D7D4E4] bg-white/72" />
              <div className="mt-6 flex items-center gap-4">
                <div className="h-[34px] w-[154px] rounded-[10px] border border-[#D7D4E4] bg-white/72" />
                <div className="h-[34px] w-[112px] rounded-[10px] border border-[#D7D4E4] bg-white/68" />
              </div>
            </div>
            <div className="absolute bottom-9 left-9 right-9">
              <div className="h-[38px] w-[62%] rounded-[10px] bg-black/10" />
              <div className="mt-4 h-[14px] w-[95%] rounded bg-black/10" />
              <div className="mt-2 h-[14px] w-[83%] rounded bg-black/10" />
            </div>
          </motion.article>

          {/* Bento 3 */}
          <motion.article
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...revealTransition, delay: 0.08 }}
            whileHover={{ y: -3 }}
            className="relative h-[420px] overflow-hidden rounded-[24px] border border-black/10 bg-[linear-gradient(160deg,#EAF2FF_0%,#DBE9FF_72%,#D4E4FF_100%)] md:h-[480px] xl:col-[1/2] xl:row-[2/3]"
          >
            <div className="absolute left-9 right-9 top-9">
              <div className="h-[40px] w-[70%] rounded-[12px] bg-white/72" />
              <div className="mt-5 h-[14px] w-[86%] rounded bg-white/82" />
              <div className="mt-2 h-[14px] w-[70%] rounded bg-white/82" />
            </div>
            <div className="absolute bottom-10 left-9 right-9 h-[46%] rounded-[18px] border border-white/60 bg-white/48" />
          </motion.article>

          {/* Bento 4 */}
          <motion.article
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...revealTransition, delay: 0.12 }}
            whileHover={{ y: -3 }}
            className="relative h-[460px] overflow-hidden rounded-[24px] border border-black/10 bg-[linear-gradient(160deg,#FFFFFF_0%,#F2F2F2_74%)] md:h-[480px] xl:col-[2/3] xl:row-[2/3]"
          >
            <div className="absolute left-9 right-9 top-9">
              <div className="h-[38px] w-[52%] rounded-[10px] bg-black/10" />
              <div className="mt-4 h-[14px] w-[72%] rounded bg-black/10" />
              <div className="mt-2 h-[14px] w-[58%] rounded bg-black/10" />
            </div>
            <motion.div
              className="absolute inset-x-9 bottom-9 h-[58%] rounded-[20px] border border-black/10 bg-white/58"
              animate={{ y: [0, -3, 0, 3, 0] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.article>
        </div>
      </div>
    </section>
  );
}