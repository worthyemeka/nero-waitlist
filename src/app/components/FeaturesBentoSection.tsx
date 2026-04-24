// FeaturesBentoSection.tsx
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import bento1Phone from "../../assets/bento1-phone.jpg";
import cardBento1 from "../../assets/card-bento1.png";
import b2Visual from "../../assets/bento2-image.png";
import b2Button from "../../assets/b2-button.png";
import emailIcon from "../../assets/email-icon.png";
import accIcon from "../../assets/acc-icon.png";
import kudIcon from "../../assets/kud-icon.png";
import monIcon from "../../assets/mon-icon.png";
import opIcon from "../../assets/op-icon.png";
import oneIcon from "../../assets/one-icon.png";
import zenIcon from "../../assets/zen-icon.png";
import bento3Img from "../../assets/bento3-img.png";
import pipesLeft from "../../assets/svg-pipes-left.svg";
import pipesRight from "../../assets/svg-pipes-right.svg";
import bento4Mockup from "../../assets/bento4-mockup.png";
import bento4Img from "../../assets/bento4-img.png";

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
            className="w-full bg-white px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10 md:px-5 md:pb-20 md:pt-14 lg:px-5 lg:pb-28 lg:pt-20 xl:px-0 xl:pb-15 xl:pt-10"
        >
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 md:gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="grid w-full gap-5 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16"
                >
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:pr-8 w-full">
                        <h2 className="w-full text-[36px] font-semibold leading-[1.2] tracking-[-1px] text-[#12123D] sm:text-[30px] sm:tracking-[-1.5px] md:text-[36px] md:tracking-[-2px] lg:text-[44px]">
                            Here's how we help<br/> you stay on track
                        </h2>
                        {/* Short description for tablet and mobile, long for desktop */}
                        <p className="max-w-[640px] mt-3 text-[18px] leading-6 text-[#8A8A8A] block lg:hidden">
                            Set your budget once. nēro <br/>handles the rest — daily.
                        </p>
                        <p className="max-w-[640px] mt-3 text-[18px] leading-6 text-[#8A8A8A] hidden lg:block lg:text-[20px] lg:leading-[30px]">
                            We've all been there… checking your balance, spending beyond your limits, and somehow hoping it lasts.
                            That's why nēro was built: to give you clarity when budgeting, not stress.
                        </p>
                    </div>
                </motion.div>
            </div>
            <div className="mx-auto w-full max-w-[1264px]">
                {/* Header — left on mobile, centered on xl */}
               {/*} <motion.div
                    style={{ y: headingParallaxY }}
                    initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={revealTransition}
                    className="flex flex-col items-center text-center xl:mx-auto xl:max-w-[520px]"
                >
                    <h2 className="max-w-[800px] text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#12123D] sm:text-[36px] md:max-w-[1040px] md:text-[46px] xl:max-w-[520px] xl:text-[56px]">
                        Here's how we help<br /> you stay on track
                    </h2>
                    <p className="mt-3 text-[14px] leading-6 text-[#8A8A8A] sm:mt-4 sm:text-[16px] sm:leading-7 md:text-[24px] xl:mt-5 xl:text-[20px] xl:leading-[30px]">
                        Set your budget once. nēro handles the rest — daily.
                    </p>
                </motion.div>*/}

                <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:mt-10 xl:mt-14
                                    md:grid-cols-2 md:grid-rows-2 md:gap-6
                                    xl:grid-cols-[730px_510px] xl:grid-rows-[480px_480px] xl:gap-6">

                    {/* Bento 1 */}
                    <motion.article
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={revealTransition}
                        whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                        className="relative h-[380px] overflow-hidden rounded-[24px] sm:h-[440px] md:h-[460px] xl:col-[1/2] xl:row-[1/2] xl:h-[480px] xl:w-[730px]"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(242,242,242,0.37), rgba(242,242,242,0.37)), #ffffff",
                        }}
                    >
                        {/* Text — top-left */}
                        <div className="relative z-[6] max-w-[324px] pl-8 pt-8 md:max-w-[324px] md:pl-7 md:pt-8 xl:max-w-[464px] xl:pl-10 xl:pt-12">
                            <h3 className="text-[20px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#000000] sm:text-[20px] md:text-[22px] xl:text-[22px]">
                                Know what you can
                                spend today
                            </h3>
                            <p className="mt-0 text-[16px] font-[400] leading-[1.5] text-[#797C86] md:mt-2 md:text-[18px] xl:mt-4 xl:text-[20px]">
                                nēro shows you exactly what you can spend today — so your money lasts the full cycle.
                            </p>
                        </div>

                        {/* Phone mockup — right side, blurred */}
                        <motion.div
                            style={{ y: phoneParallaxY }}
                            className="pointer-events-none absolute right-[-10px] top-[120px] z-[2] md:right-[-120px] md:top-[164px] xl:right-[-80px] xl:top-[34.93px]"
                        >
                            <img
                                src={bento1Phone}
                                alt="nēro app screen"
                                className="h-auto w-[220px] rounded-[20px] opacity-60 blur-[3px] sm:w-[122px] md:w-[260px] xl:w-[322px]"
                            />
                        </motion.div>

                        {/* Spending target card — bottom-left */}
                        <motion.img
                            src={cardBento1}
                            alt="Today's spending target card"
                            className="pointer-events-none absolute bottom-[15px] left-[5px] z-[4] w-[340px] drop-shadow-xl md:bottom-[16px] md:left-[-4px] md:w-[700px] xl:bottom-[10px] xl:left-[-12px] xl:w-[650px]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        />

                        {/* Bottom fade */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[120px] bg-gradient-to-t from-[#F2F3F2] via-[#F2F3F2]/50 to-transparent md:h-[130px] xl:h-[140px]" />
                    </motion.article>

                    {/* Bento 2 */}
                    <motion.article
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ ...revealTransition, delay: 0.05 }}
                        whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                        className="relative h-[360px] overflow-hidden rounded-[24px] sm:h-[420px] md:h-[460px] xl:col-[2/3] xl:row-[1/2] xl:h-[480px]"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(242,242,242,0.37), rgba(242,242,242,0.37)), #ffffff",
                        }}
                    >
                        {/* Transaction list visual — top center */}
                        <motion.div
                            className="pointer-events-none relative z-[3] flex justify-center pt-6 sm:pt-7 md:pt-8 xl:pt-[-10px] px-4 sm:px-6 md:px-8 xl:px-10"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        >
                            <img
                                src={b2Visual}
                                alt="Transaction list showing auto-tracked spending"
                                className="w-full max-w-[404px] sm:max-w-[380px] md:w-[640px] md:h-auto md:max-w-[440px] xl:max-w-[504px] h-auto"
                            />
                        </motion.div>

                        {/* Purple pill button — overlapping bottom of visual */}
                        <motion.div
                            className="relative z-[6] flex justify-center sm:w-[380px] -mt-[130px] sm:-mt-[40px] md:-mt-[170px] md:ml-[4px] xl:-mt-[180px] xl:-ml-[-80px]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                        >
                            <img
                                src={b2Button}
                                alt="Auto-Tracking spending"
                                className="h-[110px] w-[250px] sm:h-[300px] sm:w-[200px] md:h-[120px] md:w-[270px] xl:h-[120px] xl:w-[270px] drop-shadow-lg"
                            />
                        </motion.div>

                        {/* Text — bottom */}
                        <div className="absolute bottom-[20px] left-6 right-6 z-[6] sm:bottom-13 sm:left-7 sm:right-7 xl:bottom-10 xl:left-10 xl:right-10">
                            <h3 className="text-[20px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#000000] sm:text-[20px] md:text-[22px] xl:text-[22px]">
                                We track everything for you
                            </h3>
                            <p className="mt-2 text-[16px] font-normal leading-[1.4] text-[#797C86] sm:text-[16px] md:text-[16px] xl:text-[20px]">
                                nēro reads your bank alerts and tracks every transaction automatically — no manual input.
                            </p>
                        </div>
                    </motion.article>

                    {/* Bento 3 — Redesigned, text top left, image bottom, gradient overlay */}
                    <motion.article
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ ...revealTransition, delay: 0.08 }}
                        whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                        className="relative h-[360px] overflow-hidden rounded-[24px] sm:h-[400px] md:h-[440px] md:col-[1/2] md:row-[2/3] xl:col-[1/2] xl:row-[2/3] xl:h-[480px] xl:w-[510px] xl:justify-self-start bg-white"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(242,242,242,0.37), rgba(242,242,242,0.37)), #ffffff",
                        }}
                    >
                        {/* Text content — top left */}
                        <div className="relative z-[6] max-w-[324px] pl-8 pt-8 md:max-w-[324px] md:pl-7 md:pt-8 xl:max-w-[464px] xl:pl-10 xl:pt-12">
                            <h3 className="text-[20px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#000000] sm:text-[20px] md:text-[22px] xl:text-[22px]">
                                See your spending clearly
                            </h3>
                            <p className="mt-2 text-[16px] font-[400] leading-[1.5] text-[#797C86] md:mt-2 md:text-[16px] xl:mt-4 xl:text-[20px]">
                                nēro shows your daily and weekly spending patterns so you can understand where your money goes at a glance.
                            </p>
                        </div>
                        {/* Image grid — bottom center */}
                        <div className="absolute left-0 right-0 bottom-[8px] z-[1] flex items-end justify-center w-full h-[55vw] min-h-[120px] max-h-[220px] sm:bottom-0 sm:h-[38vw] sm:max-h-[240px] md:bottom-10 md:h-[30vw] md:max-h-[260px] xl:h-[22vw] xl:bottom-0 xl:max-h-[320px]">
                            <img
                                src={bento3Img}
                                alt="Spending patterns grid"
                                className="w-auto h-full max-h-full object-contain"
                                style={{ filter: "drop-shadow(0 4px 24px rgba(42,42,145,0.07))" }}
                            />
                            {/* Gradient overlay at bottom, larger on md */}
                            <div
                                className="pointer-events-none absolute left-0 right-0 bottom-0 h-[40px] sm:h-[180px] md:h-[120px] xl:h-[100px]"
                                style={{
                                    background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #F7F9FB 100%)",
                                }}
                            />
                        </div>
                    </motion.article>

                    {/* Bento 4 */}
                    <motion.article
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ ...revealTransition, delay: 0.12 }}
                        whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                        className="relative flex flex-col items-center justify-between h-[380px] overflow-hidden rounded-b-[32px] rounded-t-[24px] bg-white sm:h-[440px] md:h-[430px] md:col-[2/3] md:row-[2/3] xl:col-[2/3] xl:row-[2/3] xl:h-[480px] xl:w-[730px] xl:justify-self-end"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(242,242,242,0.37), rgba(242,242,242,0.37)), #fff",
                        }}
                    >
                        {/* Visual — top, centered, large */}
                        <div className="w-full flex justify-center pt-13 sm:pt-60 md:pt-10 xl:pt-[54.32]">
                            <img
                                src={bento4Img}
                                alt="Cycle summary visual"
                                className="w-[520px] sm:w-[520px] md:w-[600px] xl:w-[680px] max-w-full h-auto object-contain drop-shadow-lg"
                                style={{ filter: "drop-shadow(0 4px 24px rgba(42,42,145,0.09))" }}
                            />
                        </div>

                        {/* Text — bottom */}
                        <div className="absolute bottom-[45px] left-6 right-6 z-[6] sm:bottom-7 md:bottom-[40px] sm:left-7 sm:right-7 xl:bottom-10 xl:left-10 xl:right-10">
                            <h3 className="text-[20px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#000000] sm:text-[19px] md:text-[22px] xl:text-[22px]">
                                Your money, reviewed for you
                            </h3>
                            <p className="mt-2 text-[16px] font-normal leading-[1.4] text-[#797C86] sm:text-[18px] md:text-[16px] xl:text-[20px]">
                                Get simple weekly and full-cycle recaps that show how you spent, where you can improve, and how you’re progressing.
                            </p>
                        </div>

                        {/* Bottom fade */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[80px] bg-gradient-to-t from-[#F2F3F2] via-[#F2F3F2]/50 to-transparent md:h-[160px] xl:h-[140px]" />
                    </motion.article>

                </div>
            </div>
        </section>
    );
}