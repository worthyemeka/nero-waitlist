// AboutSection.tsx
import { motion } from "motion/react";
import {
  EyeIcon,
  AdjustmentsHorizontalIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

const cards = [
  {
    title: "No more guessing",
    description:
      "You don't have to check your balance and calculate in your head. nēro shows what you've spent and what's left.",
    icon: EyeIcon,
  },
  {
    title: "No more overspending",
    description:
      "We turn your income into a daily amount you can spend, so your money lasts the month. This way, you spend wisely.",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    title: "Built for real life",
    description:
      "Your spending habits aren't perfect and honestly? They don't have to be. nēro works with your behavior, not against it.",
    icon: CheckBadgeIcon,
  },
];

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-white px-6 pb-16 pt-6 md:px-8 md:pb-20 md:pt-8 lg:px-20 lg:pb-24 lg:pt-10"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid w-full gap-5 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16"
        >
          <div className="flex flex-col items-start text-left lg:pr-8">
            <h2 className="w-full text-[26px] font-semibold leading-[1.2] tracking-[-1px] text-[#12123D] sm:text-[36px] sm:tracking-[-1.5px] md:text-[36px] md:tracking-[-2px] lg:text-[44px]">
              Because handling money shouldn't feel this confusing
            </h2>
          </div>

          <p className="max-w-[640px] text-[14px] leading-6 text-[#8A8A8A] sm:text-[15px] sm:leading-7 md:text-[17px] md:leading-8 lg:text-[20px] lg:leading-[30px]">
            We've all been there… checking your balance, spending beyond your limits, and somehow hoping it lasts.
            That's why nēro was built: to give you clarity when budgeting, not stress.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}