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
import abstractDesign from "../../assets/abstract-design.png";
import pipesLeft from "../../assets/svg-pipes-left.svg";
import pipesRight from "../../assets/svg-pipes-right.svg";

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
                    className="flex flex-col items-center text-center xl:mx-auto xl:max-w-[520px]"
                >
                    <h2 className="max-w-[800px] text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#12123D] sm:text-[36px] md:max-w-[1040px] md:text-[46px] xl:max-w-[520px] xl:text-[56px]">
                        Here's how we help<br /> you stay on track
                    </h2>
                    <p className="mt-3 text-[14px] leading-6 text-[#8A8A8A] sm:mt-4 sm:text-[16px] sm:leading-7 md:text-[24px] xl:mt-5 xl:text-[20px] xl:leading-[30px]">
                        Set your budget once. nēro handles the rest — daily.
                    </p>
                </motion.div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:mt-10 xl:mt-14 xl:grid-cols-[730px_510px] xl:grid-rows-[480px_480px] xl:gap-6">

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
                        <div className="relative z-[6] max-w-[214px] pl-8 pt-10 md:max-w-[450px] md:pl-13 md:pt-11 xl:max-w-[384px] xl:pl-10 xl:pt-12">
                            <h3 className="text-[16px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#000000] md:text-[24px] xl:text-[22px]">
                                Know what you can spend today
                            </h3>
                            <p className="mt-0 text-[13px] font-[400] leading-[1.5] text-[#797C86] md:mt-2 md:text-[18px] xl:mt-4 xl:text-[17px]">
                                nēro shows you exactly what you can spend today — so your money lasts the full cycle.
                            </p>
                        </div>

                        {/* Phone mockup — right side, blurred */}
                        <motion.div
                            style={{ y: phoneParallaxY }}
                            className="pointer-events-none absolute right-[-75px] top-[20px] z-[2] md:right-[-40px] md:top-[28px] xl:right-[-40px] xl:top-[34.93px]"
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
                            className="pointer-events-none absolute bottom-[40px] left-[-4px] z-[4] w-[340px] drop-shadow-xl md:bottom-[-6px] md:left-[-4px] md:w-[700px] xl:bottom-[10px] xl:left-[-12px] xl:w-[650px]"
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
                            className="pointer-events-none relative z-[3] flex justify-center pt-6 sm:pt-7 md:pt-8 xl:pt-8 px-4 sm:px-6 md:px-8 xl:px-10"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        >
                            <img
                                src={b2Visual}
                                alt="Transaction list showing auto-tracked spending"
                                className="w-full max-w-[704px] sm:max-w-[380px] md:w-[640px] md:h-auto md:max-w-[440px] xl:max-w-[604px] h-auto"
                            />
                        </motion.div>

                        {/* Purple pill button — overlapping bottom of visual */}
                        <motion.div
                            className="relative z-[6] flex justify-center sm:w-[380px] -mt-[130px] sm:-mt-[-80px] md:-mt-[190px] md:ml-[190px] xl:-mt-[260px] xl:-ml-[-80px]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                        >
                            <img
                                src={b2Button}
                                alt="Auto-Tracking spending"
                                className="h-[120px] w-[300px] sm:h-[300px] sm:w-[300px] md:h-[160px] md:w-[580px] xl:h-[150px] xl:w-auto drop-shadow-lg"
                            />
                        </motion.div>

                        {/* Text — bottom */}
                        <div className="absolute bottom-6 left-6 right-6 z-[6] sm:bottom-7 sm:left-7 sm:right-7 xl:bottom-10 xl:left-10 xl:right-10">
                            <h3 className="text-[17px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#000000] sm:text-[19px] md:text-[24px] xl:text-[22px]">
                                We track everything for you
                            </h3>
                            <p className="mt-2 text-[13px] font-normal leading-[1.4] text-[#797C86] sm:text-[14px] md:text-[18px] xl:text-[17px]">
                                nēro reads your bank alerts and tracks every transaction automatically — no manual input.
                            </p>
                        </div>
                    </motion.article>

                    {/* Bento 3 */}
                    <motion.article
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ ...revealTransition, delay: 0.08 }}
                        whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                        className="relative h-[360px] overflow-hidden rounded-[24px] sm:h-[400px] md:h-[440px] xl:col-[1/2] xl:row-[2/3] xl:h-[480px] xl:w-[510px] xl:justify-self-start"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(242,242,242,0.37), rgba(242,242,242,0.37)), #ffffff",
                        }}
                    >
                        {/* Dotted grid background */}
                        <div className="pointer-events-none absolute inset-x-4 top-0 z-[1] h-[65%] sm:inset-x-8">
                            <img
                                src={abstractDesign}
                                alt=""
                                className="h-full w-full object-cover opacity-40"
                            />
                            <div
                                className="absolute inset-x-0 bottom-0 h-[60%]"
                                style={{ background: "linear-gradient(180deg, transparent 0%, rgba(248,248,248,0.95) 100%)" }}
                            />
                        </div>

                        {/* Hub layout */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2]" style={{ height: "65%" }}>

                            {/* Left pipes SVG — behind email icon */}
                            <img
                                src={pipesLeft}
                                alt=""
                                className="absolute z-[1] w-[110px] h-[120px] sm:w-[140px] sm:h-[155px] md:w-[160px] md:h-[175px]"
                                style={{ top: "50%", right: "50%", transform: "translateY(-50%)" }}
                            />
                            {/* Right pipes SVG — behind email icon */}
                            <img
                                src={pipesRight}
                                alt=""
                                className="absolute z-[1] w-[110px] h-[120px] sm:w-[140px] sm:h-[155px] md:w-[160px] md:h-[175px]"
                                style={{ top: "50%", left: "50%", transform: "translateY(-50%)" }}
                            />

                            {/* Center email icon — on top of pipes */}
                            <motion.div
                                className="absolute left-1/2 top-1/2 z-[4] -translate-x-1/2 -translate-y-1/2"
                                initial={{ opacity: 0, scale: 0.7 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                            >
                                <img
                                    src={emailIcon}
                                    alt="Email icon"
                                    className="relative z-[5] h-[90px] w-[90px] sm:h-[110px] sm:w-[110px] md:h-[130px] md:w-[130px] xl:h-[136.97px] xl:w-[136.97px]"
                                />
                            </motion.div>

                            {/* Left logos: Access (top), OneBank (middle), Zenith (bottom) */}
                            <motion.div
                                className="absolute z-[5] overflow-hidden rounded-full border-[2px] border-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] h-[42px] w-[42px] sm:h-[56px] sm:w-[56px] md:h-[62px] md:w-[62px] xl:h-[70px] xl:w-[70px]"
                                style={{ top: "12%", left: "5%" }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 18, delay: 0.2 }}
                            >
                                <img src={accIcon} alt="Access Bank" className="h-full w-full object-cover" />
                            </motion.div>

                            <motion.div
                                className="absolute z-[5] overflow-hidden rounded-full border-[2px] border-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] h-[42px] w-[42px] sm:h-[56px] sm:w-[56px] md:h-[62px] md:w-[62px] xl:h-[70px] xl:w-[70px]"
                                style={{ top: "38%", left: "0%" }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 18, delay: 0.3 }}
                            >
                                <img src={oneIcon} alt="OneBank" className="h-full w-full object-cover" />
                            </motion.div>

                            <motion.div
                                className="absolute z-[5] overflow-hidden rounded-full border-[2px] border-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] h-[42px] w-[42px] sm:h-[56px] sm:w-[56px] md:h-[62px] md:w-[62px] xl:h-[70px] xl:w-[70px]"
                                style={{ top: "65%", left: "5%" }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 18, delay: 0.4 }}
                            >
                                <img src={zenIcon} alt="Zenith" className="h-full w-full object-cover" />
                            </motion.div>

                            {/* Right logos: Moniepoint (top), Kuda (middle), OPay (bottom) */}
                            <motion.div
                                className="absolute z-[5] overflow-hidden rounded-full border-[2px] border-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] h-[42px] w-[42px] sm:h-[56px] sm:w-[56px] md:h-[62px] md:w-[62px] xl:h-[70px] xl:w-[70px]"
                                style={{ top: "12%", right: "5%" }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 18, delay: 0.25 }}
                            >
                                <img src={monIcon} alt="Moniepoint" className="h-full w-full object-cover" />
                            </motion.div>

                            <motion.div
                                className="absolute z-[5] overflow-hidden rounded-full border-[2px] border-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] h-[42px] w-[42px] sm:h-[56px] sm:w-[56px] md:h-[62px] md:w-[62px] xl:h-[70px] xl:w-[70px]"
                                style={{ top: "38%", right: "0%" }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 18, delay: 0.35 }}
                            >
                                <img src={kudIcon} alt="Kuda" className="h-full w-full object-cover" />
                            </motion.div>

                            <motion.div
                                className="absolute z-[5] overflow-hidden rounded-full border-[2px] border-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] h-[42px] w-[42px] sm:h-[56px] sm:w-[56px] md:h-[62px] md:w-[62px] xl:h-[70px] xl:w-[70px]"
                                style={{ top: "65%", right: "5%" }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 18, delay: 0.45 }}
                            >
                                <img src={opIcon} alt="OPay" className="h-full w-full object-cover" />
                            </motion.div>
                        </div>

                        {/* Text — bottom */}
                        <div className="absolute bottom-6 left-6 right-6 z-[6] sm:bottom-7 sm:left-7 sm:right-7 xl:bottom-10 xl:left-10 xl:right-10">
                            <h3 className="text-[17px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#000000] sm:text-[19px] md:text-[24px] xl:text-[22px]">
                                Connect your bank & email
                            </h3>
                            <p className="mt-2 text-[13px] font-normal leading-[1.4] text-[#797C86] sm:text-[14px] md:text-[18px] xl:text-[17px]">
                                Link your account via email. This helps us track & keep up with your spending automatically. We will <span className="font-semibold text-[#000000]">never</span> ask you for any of your personal information.
                            </p>
                        </div>
                    </motion.article>

                    {/* Bento 4 */}
                    <motion.article
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ ...revealTransition, delay: 0.12 }}
                        whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                        className="relative h-[360px] overflow-hidden rounded-[24px] border border-black/10 bg-[linear-gradient(160deg,#FFFFFF_0%,#F2F2F2_74%)] sm:h-[400px] md:h-[440px] xl:col-[2/3] xl:row-[2/3] xl:h-[480px] xl:w-[730px] xl:justify-self-end"
                    >
                        <div className="absolute left-6 right-6 top-7 sm:left-8 sm:right-8 sm:top-8 xl:left-9 xl:right-9 xl:top-9">
                            <div className="h-[34px] w-[52%] rounded-[8px] bg-black/10 xl:h-[38px] xl:rounded-[10px]" />
                            <div className="mt-3 h-[12px] w-[72%] rounded bg-black/10 xl:mt-4 xl:h-[14px]" />
                            <div className="mt-2 h-[12px] w-[58%] rounded bg-black/10 xl:h-[14px]" />
                        </div>
                        <motion.div
                            className="absolute bottom-7 left-6 right-6 h-[56%] rounded-[18px] border border-black/10 bg-white/58 sm:left-8 sm:right-8 xl:bottom-9 xl:left-9 xl:right-9 xl:h-[58%] xl:rounded-[20px]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        />
                    </motion.article>

                </div>
            </div>
        </section>
    );
}