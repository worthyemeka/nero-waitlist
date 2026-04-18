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
      "You don’t have to check your balance and calculate in your head. nēro shows what you’ve spent and what’s left.",
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
      "Your spending habits aren’t perfect and honestly? They don’t have to be. nēro works with your behavior, not against it.",
    icon: CheckBadgeIcon,
  },
];

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-white px-6 py-16 md:px-8 md:py-20 lg:px-20"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12">
        <div className="grid w-full gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <div className="flex flex-col items-start text-left lg:pr-8">
            <h2 className="w-full text-[36px] font-semibold leading-[1.2] tracking-[-2px] text-[#12123D] sm:text-[40px] md:text-[44px] lg:text-[44px]">
              Because handling money shouldn’t feel this confusing
            </h2>
          </div>

          <p className="max-w-[640px] text-[18px] leading-8 text-[#8A8A8A] sm:text-[18px] md:text-[20px] md:leading-[30px]">
            We’ve all been there… checking your balance, spending beyond your limits, and somehow hoping it lasts.
            That’s why nēro was built: to give you clarity when budgeting, not stress.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-5">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full rounded-[24px] border border-black/10 bg-white p-6 md:min-h-[224px]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#F2F2F2]"
                >
                  <Icon className="h-7 w-7 text-[#12123D]" />
                </motion.div>

                <h3 className="text-[18px] font-semibold leading-[1.25] tracking-[-0.32px] text-black sm:text-[19px] md:text-[20px]">
                  {card.title}
                </h3>

                <p className="mt-4 text-[15px] leading-7 text-[#8A8A8A] sm:text-[16px] md:text-[18px]">
                  {card.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
