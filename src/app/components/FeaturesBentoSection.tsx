// FeaturesBentoSection.tsx
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import bento1Composed from "../../assets/bento1-composed.png";
import b2Mockup from "../../assets/b2-mockup.png";
import b2Card1 from "../../assets/Card 1.png";
import b2Card2 from "../../assets/Card 2.png";

const revealTransition = {
    duration: 0.75,
    ease: [0.22, 1, 0.36, 1] as const,
};

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
            className="w-full bg-white px-6 pb-8 pt-1 md:px-8 md:pb-20 md:pt-14 lg:px-20 lg:pb-28 lg:pt-20"
        >
            <div className="mx-auto w-full max-w-[1264px]">
                {/* Header — left on mobile, centered on xl */}
                <motion.div
                    style={{ y: headingParallaxY }}
                    initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={revealTransition}
                    className="flex flex-col items-start text-left xl:mx-auto xl:max-w-[520px] xl:items-center xl:text-center"
                >
                    <h2 className="max-w-[260px] text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#12123D] sm:max-w-[360px] sm:text-[36px] md:max-w-[1040px] md:text-[46px] xl:max-w-[520px] xl:text-[56px]">
                        One simple idea that changes everything
                    </h2>
                    <p className="mt-3 text-[14px] leading-6 text-[#8A8A8A] sm:mt-4 sm:text-[16px] sm:leading-7 md:text-[24px] xl:mt-5 xl:text-[20px] xl:leading-[30px]">
                        Set your spending once. nēro handles the rest.
                    </p>
                </motion.div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:mt-10 xl:mt-14 xl:grid-cols-[730px_510px] xl:grid-rows-[480px_480px] xl:gap-6">

                    {/* Bento 1 */}
                    <motion.article
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={revealTransition}
                        whileHover={{ y: -3 }}
                        className="relative h-[380px] overflow-hidden rounded-[24px] sm:h-[440px] md:h-[460px] xl:col-[1/2] xl:row-[1/2] xl:h-[480px]"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(242,242,242,0.37), rgba(242,242,242,0.37)), #ffffff",
                        }}
                    >
                        {/* Text — top-left always */}
                        <div className="relative z-[6] max-w-[220px] pl-6 pt-7 sm:max-w-[280px] sm:pl-7 sm:pt-9 md:max-w-[400px] md:pl-8 xl:max-w-[360px] xl:pt-10">
                            <h3 className="text-[17px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#000000] sm:text-[16px] md:text-[24px] xl:text-[22px]">
                                Spend without running out
                            </h3>
                            <p className="mt-2 text-[12px] font-normal leading-[1.4] text-[#797C86] sm:text-[15px] sm:text-[18px] xl:text-[17px]">
                                nēro shows how much you can spend today based on what you have
                                left so your money lasts the month.
                            </p>
                        </div>

                        {/* Mockup — bottom-right always */}
                        <motion.div
                            style={{ y: phoneParallaxY }}
                            className="pointer-events-none absolute z-[2] bottom-[-260px] right-[-100px] sm:bottom-[-480px] sm:right-[-170px] md:bottom-[-450px] md:right-[-150px] xl:bottom-0 xl:top-0 xl:right-[-80px]"
                        >
                            <motion.img
                                src={bento1Composed}
                                alt="nēro spend-without-running-out feature"
                                className="max-w-none w-[420px] sm:w-[500px] md:w-[660px] xl:w-[780px] xl:absolute xl:right-[-100px] xl:top-[-10px]"
                                style={{ height: "auto" }}
                                animate={{ y: [0, -7, 0, 7, 0] }}
                                transition={{
                                    duration: 9.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>

                        {/* Bottom fade */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[160px] bg-gradient-to-t from-[#F2F3F2] via-[#F2F3F2]/85 to-transparent sm:h-[170px] sm:via-[#F2F3F2]/75 md:h-[180px] xl:h-[200px] xl:via-[#F2F3F2]/60" /></motion.article>

                    {/* Bento 2 */}
                    <motion.article
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ ...revealTransition, delay: 0.05 }}
                        whileHover={{ y: -3 }}
                        className="relative h-[360px] overflow-hidden rounded-[24px] border border-black/10 sm:h-[420px] md:h-[460px] xl:col-[2/3] xl:row-[1/2] xl:h-[480px]"
                        style={{
                            background: "linear-gradient(180deg, #EDE8F8 0%, #E6DFF5 50%, #DDD3F0 100%)",
                        }}
                    >
                        {/* Phone mockup */}
                        <div
                            className="pointer-events-none absolute z-[3] top-[-28%] sm:top-[-5%] md:top-[-21%] xl:top-[-35%] w-[580px] sm:w-[620px] md:w-[800px] xl:w-[820px]"
                            style={{
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        >
                            <img
                                src={b2Mockup}
                                alt="nēro transaction detail screen"
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Card 1 — top-right */}
                        <motion.img
                            src={b2Card1}
                            alt="Debit alert card"
                            className="pointer-events-none absolute z-[4] top-[20%] sm:top-[10%] md:top-[6%] xl:top-[6%]"
                            style={{
                                right: "-8%",
                                width: "78%",
                            }}
                            animate={{ y: [0, -6, 0, 6, 0] }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Card 2 — mid-left */}
                        <motion.img
                            src={b2Card2}
                            alt="Debit alert card"
                            className="pointer-events-none absolute z-[4] top-[38%] sm:top-[22%] md:top-[26%] xl:top-[26%]"
                            style={{
                                left: "-8%",
                                width: "78%",
                            }}
                            animate={{ y: [0, 6, 0, -6, 0] }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                        />

                        {/* Gradient — higher on mobile so content shows */}
                        <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5]"
                            style={{
                                height: "55%",
                                background:
                                    "linear-gradient(to top, #DDD3F0 0%, #DDD3F0 20%, rgba(221,211,240,0.95) 35%, rgba(230,223,245,0.75) 55%, rgba(237,232,248,0.3) 75%, transparent 100%)",
                            }}
                        />

                        {/* Text — bottom */}
                        <div className="absolute bottom-6 left-6 right-6 z-[6] sm:bottom-7 sm:left-7 sm:right-7 xl:bottom-10 xl:left-10 xl:right-10">
                            <h3 className="text-[17px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#000000] sm:text-[19px] md:text-[24px] xl:text-[22px]">
                                Automatic Tracking
                            </h3>
                            <p className="mt-2 text-[13px] font-normal leading-[1.4] text-[#797C86] sm:text-[14px] md:text-[15px] md:text-[18px] xl:text-[17px]">
                                nēro reads your bank debit alerts and tracks every transaction for you. No manual entry. No receipts.
                            </p>
                        </div>
                    </motion.article>

                    {/* Bento 3 */}
                    <motion.article
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ ...revealTransition, delay: 0.08 }}
                        whileHover={{ y: -3 }}
                        className="relative h-[360px] overflow-hidden rounded-[24px] border border-black/10 bg-[linear-gradient(160deg,#EAF2FF_0%,#DBE9FF_72%,#D4E4FF_100%)] sm:h-[400px] md:h-[440px] xl:col-[1/2] xl:row-[2/3] xl:h-[480px] xl:w-[510px] xl:justify-self-start"
                    >
                        <div className="absolute left-6 right-6 top-7 sm:left-8 sm:right-8 sm:top-8 xl:left-9 xl:right-9 xl:top-9">
                            <div className="h-[36px] w-[70%] rounded-[10px] bg-white/72 xl:h-[40px] xl:rounded-[12px]" />
                            <div className="mt-4 h-[12px] w-[86%] rounded bg-white/82 xl:mt-5 xl:h-[14px]" />
                            <div className="mt-2 h-[12px] w-[70%] rounded bg-white/82 xl:h-[14px]" />
                        </div>
                        <div className="absolute bottom-8 left-6 right-6 h-[44%] rounded-[16px] border border-white/60 bg-white/48 sm:left-8 sm:right-8 xl:bottom-10 xl:left-9 xl:right-9 xl:h-[46%] xl:rounded-[18px]" />
                    </motion.article>

                    {/* Bento 4 */}
                    <motion.article
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ ...revealTransition, delay: 0.12 }}
                        whileHover={{ y: -3 }}
                        className="relative h-[360px] overflow-hidden rounded-[24px] border border-black/10 bg-[linear-gradient(160deg,#FFFFFF_0%,#F2F2F2_74%)] sm:h-[400px] md:h-[440px] xl:col-[2/3] xl:row-[2/3] xl:h-[480px] xl:w-[730px] xl:justify-self-end"
                    >
                        <div className="absolute left-6 right-6 top-7 sm:left-8 sm:right-8 sm:top-8 xl:left-9 xl:right-9 xl:top-9">
                            <div className="h-[34px] w-[52%] rounded-[8px] bg-black/10 xl:h-[38px] xl:rounded-[10px]" />
                            <div className="mt-3 h-[12px] w-[72%] rounded bg-black/10 xl:mt-4 xl:h-[14px]" />
                            <div className="mt-2 h-[12px] w-[58%] rounded bg-black/10 xl:h-[14px]" />
                        </div>
                        <motion.div
                            className="absolute bottom-7 left-6 right-6 h-[56%] rounded-[18px] border border-black/10 bg-white/58 sm:left-8 sm:right-8 xl:bottom-9 xl:left-9 xl:right-9 xl:h-[58%] xl:rounded-[20px]"
                            animate={{ y: [0, -3, 0, 3, 0] }}
                            transition={{
                                duration: 8.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.article>

                </div>
            </div>
        </section>
    );
}