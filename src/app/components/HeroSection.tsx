import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/svg-yyyef861wl";
import phonesImage from "../../imports/phones.png";
import bgEllipse from "../../assets/bg-ellipse.svg";
import circleVectors from "../../assets/circle-vectors.svg";

const ease = [0.22, 1, 0.36, 1];

function Badge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease }}
      className="bg-[rgba(234,234,244,0.34)] relative rounded-[99px] shrink-0"
      data-name="Badge"
    >
      <div className="content-stretch flex gap-[10px] items-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit] size-full">
        <motion.div
          animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="bg-[#2a2a91] rounded-[5px] shrink-0 size-[10px]"
          data-name="Background"
        />
        <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] sm:text-[14px] text-black whitespace-nowrap">
          <p className="leading-[19.2px]">{`Coming soon to iOS & Android`}</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[rgba(42,42,145,0.07)] border-solid inset-0 pointer-events-none rounded-[99px]"
      />
    </motion.div>
  );
}

function Header() {
  return (
    <div
      className="content-stretch flex flex-col items-center lg:items-start relative shrink-0 text-[30px] sm:text-[30px] md:text-[36px] lg:text-[48px] tracking-[-0.8px] md:tracking-[-1px] lg:tracking-[-1.5px] w-full text-center lg:text-left max-w-[320px] sm:max-w-[380px] md:max-w-[560px] lg:max-w-none"
      data-name="Header"
    >
      <motion.div
        initial={{ opacity: 0, x: -40, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="flex flex-col font-['Satoshi:600',sans-serif] font-semibold justify-center not-italic relative shrink-0 text-[#12123d] w-auto leading-[1.08] sm:leading-[1.12] lg:leading-[1.15] text-center lg:text-left"
      >
        <p>Stop exhausting money</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -40, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease }}
        className="flex flex-col font-['Satoshi:600',sans-serif] font-semibold italic justify-center relative shrink-0 text-[#2a2a91] w-auto leading-[1.08] sm:leading-[1.12] lg:leading-[1.15] text-center lg:text-left"
      >
        <p>before the month ends</p>
      </motion.div>
    </div>
  );
}

function HeaderParagraph() {
  return (
    <div
      className="content-stretch flex flex-col gap-[18px] md:gap-[20px] items-center lg:items-start leading-[0] relative shrink-0 w-full"
      data-name="Header & Paragraph"
    >
      <Header />
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease }}
        className="flex flex-col font-['Satoshi:Regular',sans-serif] justify-center not-italic relative shrink-0 text-[#696969] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] leading-[1.55] sm:leading-[1.6] w-full max-w-[320px] sm:max-w-[420px] md:max-w-[560px] lg:max-w-[600px] text-center lg:text-left"
      >
        <p>
          nēro shows you exactly how much you can spend each day, so you never
          have to worry about running out before the month ends.
        </p>
      </motion.div>
    </div>
  );
}

function EmailInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease }}
      className="bg-[#f7f7f7] content-stretch flex flex-col h-[48px] items-start overflow-clip pl-[18px] pr-[16px] py-[14px] relative rounded-[80px] shrink-0 w-full lg:w-[459px] lg:min-w-[304px]"
      data-name="Input"
    >
      <input
        type="email"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="Enter your email"
        className="w-full h-full bg-transparent outline-none font-['Satoshi:Regular',sans-serif] text-[16px] text-black placeholder:text-[rgba(0,0,0,0.4)] disabled:opacity-50"
      />
    </motion.div>
  );
}

function SubmitButton({
  onClick,
  disabled,
  isLoading,
}: {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.9, ease }}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className="bg-[#2a2a91] relative rounded-[80px] shrink-0 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed w-full h-[40px] lg:w-auto lg:h-auto lg:self-stretch"
      data-name="Background"
    >
      <div className="flex flex-row items-center justify-center size-full px-[20px] py-[12px] lg:py-[16px]">
        <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
          <p className="leading-[16px]">
            {isLoading ? "Joining..." : "Join the waitlist"}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function EmailForm({
  email,
  setEmail,
  handleSubmit,
  isLoading,
}: {
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}) {
  return (
    <div
      className="relative shrink-0 w-full flex justify-center"
      data-name="Email form"
    >
      <div className="content-stretch flex flex-col gap-[12px] items-stretch w-full max-w-[640px] lg:flex-row lg:items-start">
        <EmailInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <SubmitButton
          onClick={handleSubmit}
          disabled={isLoading || !email}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

function CounterComponent() {
  const [count, setCount] = useState(100);

  const avatars = [
    "/src/imports/Screenshot_2026-04-09_at_10.41.03.png",
    "/src/imports/Screenshot_2026-04-09_at_10.41.52.png",
    "/src/imports/Screenshot_2026-04-09_at_10.44.54.png",
    "/src/imports/Screenshot_2026-04-09_at_10.45.43.png",
    "/src/imports/244664566_1083366172436351_337922157944893883_n.jpg",
  ];

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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0, ease }}
      className="content-stretch flex gap-[8px] sm:gap-[12px] items-center justify-center lg:justify-start relative shrink-0 w-full flex-nowrap"
      data-name="Counter"
    >
      <div
        className="relative flex items-center h-[32px] sm:h-[36px] md:h-[40px] flex-shrink-0"
        data-name="Image Block"
      >
        <div className="relative flex">
          {avatars.map((avatar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] md:w-[40px] md:h-[40px] rounded-full border-2 border-white overflow-hidden bg-gray-200 relative shadow-md flex-shrink-0"
              style={{ zIndex: 50 - index, marginLeft: index > 0 ? "-6px" : "0" }}
              whileHover={{ scale: 1.08 }}
            >
              <img
                alt=""
                src={avatar}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(
                    '<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#2a2a91"/></svg>'
                  )}`;
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex flex-col font-['Satoshi:Regular',sans-serif] justify-center leading-[1.35] relative shrink-0 text-[11px] sm:text-[13px] md:text-[15px] tracking-normal min-w-0">
        <p className="not-italic whitespace-nowrap">
          <span className="font-['Satoshi:600',sans-serif] text-[#2a2a91]">
            {count}+ people
          </span>
          <span className="font-['Satoshi:Regular',sans-serif] text-[#696969]">
            {` already signed up for our waitlist`}
          </span>
        </p>
      </div>
    </motion.div>
  );
}

function Form({
  email,
  setEmail,
  handleSubmit,
  isLoading,
}: {
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}) {
  return (
    <div
      className="content-stretch flex flex-col gap-[20px] items-center lg:items-start relative shrink-0 w-full"
      data-name="Form"
    >
      <EmailForm
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <CounterComponent />
    </div>
  );
}

function Content({
  email,
  setEmail,
  handleSubmit,
  isLoading,
}: {
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}) {
  return (
    <div
      className="content-stretch flex flex-col gap-[24px] sm:gap-[28px] md:gap-[32px] lg:gap-[48px] items-center lg:items-start relative shrink-0 w-full"
      data-name="Content"
    >
      <HeaderParagraph />
      <Form
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

function TextContent({
  email,
  setEmail,
  handleSubmit,
  isLoading,
}: {
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}) {
  return (
    <div
      className="lg:absolute content-stretch flex flex-col gap-[18px] sm:gap-[20px] items-center lg:items-start px-[16px] sm:px-[20px] pt-[120px] sm:pt-[128px] md:px-[32px] md:pt-[136px] lg:left-[80px] lg:top-[120px] lg:w-[48%] lg:max-w-[600px] lg:pr-[0px] lg:p-0 z-[10] w-full"
      data-name="Text content"
    >
      <Badge />
      <Content
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

function Vectors() {
  return (
    <motion.div
      animate={{
        x: [0, 20, 0, -20, 0],
        y: [0, -15, -30, -15, 0],
      }}
      transition={{
        x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
      }}
      className="h-[1240.474px] relative w-[1616.918px]"
      data-name="vectors"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1616.92 1240.47"
      >
        <g id="vectors">
          <g filter="url(#filter0_f_16_6092)" id="Ellipse 1987" opacity="0.45">
            <mask fill="white" id="path-1-inside-1_16_6092">
              <path d={svgPaths.pecf8580} />
            </mask>
            <g
              clipPath="url(#paint0_angular_16_6092_clip_path)"
              mask="url(#path-1-inside-1_16_6092)"
              data-figma-skip-parse="true"
            >
              <g transform="matrix(0.0642013 0.369194 -0.376859 0.0655341 729.164 595.997)">
                <foreignObject
                  height="2304.5"
                  width="2304.5"
                  x="-1152.25"
                  y="-1152.25"
                >
                  <div
                    style={{
                      background:
                        "conic-gradient(from 90deg,rgba(222, 221, 255, 1) 0deg,rgba(104, 104, 220, 1) 45deg,rgba(255, 255, 255, 1) 104.4deg,rgba(23, 0, 168, 1) 203.4deg,rgba(108, 108, 255, 1) 268.2deg,rgba(255, 255, 255, 1) 322.2deg,rgba(222, 221, 255, 1) 360deg)",
                      height: "100%",
                      width: "100%",
                      opacity: "1",
                    }}
                    xmlns="http://www.w3.org/1999/xhtml"
                  />
                </foreignObject>
              </g>
            </g>
            <path
              d={svgPaths.p2e462f70}
              mask="url(#path-1-inside-1_16_6092)"
              data-figma-gradient-fill="..."
            />
          </g>
          <g filter="url(#filter1_f_16_6092)" id="Ellipse 1988" opacity="0.45">
            <mask fill="white" id="path-3-inside-2_16_6092">
              <path d={svgPaths.pe719a70} />
            </mask>
            <g
              clipPath="url(#paint1_angular_16_6092_clip_path)"
              mask="url(#path-3-inside-2_16_6092)"
              data-figma-skip-parse="true"
            >
              <g transform="matrix(0 0.465501 -0.513553 0 753.364 608.706)">
                <foreignObject
                  height="2129.03"
                  width="2129.03"
                  x="-1064.52"
                  y="-1064.52"
                >
                  <div
                    style={{
                      background:
                        "conic-gradient(from 90deg,rgba(222, 221, 255, 1) 0deg,rgba(104, 104, 220, 1) 45deg,rgba(255, 255, 255, 1) 104.4deg,rgba(23, 0, 168, 1) 203.4deg,rgba(108, 108, 255, 1) 268.2deg,rgba(255, 255, 255, 1) 322.2deg,rgba(222, 221, 255, 1) 360deg)",
                      height: "100%",
                      width: "100%",
                      opacity: "1",
                    }}
                    xmlns="http://www.w3.org/1999/xhtml"
                  />
                </foreignObject>
              </g>
            </g>
            <path
              d={svgPaths.p16bd1000}
              mask="url(#path-3-inside-2_16_6092)"
              data-figma-gradient-fill="..."
            />
          </g>
          <g filter="url(#filter2_f_16_6092)" id="Ellipse 1989" opacity="0.45">
            <mask fill="white" id="path-5-inside-3_16_6092">
              <path d={svgPaths.p340ecef0} />
            </mask>
            <g
              clipPath="url(#paint2_angular_16_6092_clip_path)"
              mask="url(#path-5-inside-3_16_6092)"
              data-figma-skip-parse="true"
            >
              <g transform="matrix(0 0.53007 -0.686239 0 865.171 645.258)">
                <foreignObject
                  height="2084.08"
                  width="2084.08"
                  x="-1042.04"
                  y="-1042.04"
                >
                  <div
                    style={{
                      background:
                        "conic-gradient(from 90deg,rgba(221, 219, 255, 1) 0deg,rgba(104, 104, 220, 1) 45deg,rgba(234, 230, 255, 1) 104.4deg,rgba(23, 0, 168, 1) 203.4deg,rgba(108, 108, 255, 1) 268.2deg,rgba(255, 255, 255, 1) 322.2deg,rgba(221, 219, 255, 1) 360deg)",
                      height: "100%",
                      width: "100%",
                      opacity: "1",
                    }}
                    xmlns="http://www.w3.org/1999/xhtml"
                  />
                </foreignObject>
              </g>
            </g>
            <path
              d={svgPaths.p10901471}
              mask="url(#path-5-inside-3_16_6092)"
              data-figma-gradient-fill="..."
            />
          </g>
          <g filter="url(#filter3_f_16_6092)" id="star/wide" opacity="0.79">
            <path d={svgPaths.p22790f00} fill="#2A2A91" />
          </g>
        </g>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="770.804"
            id="filter0_f_16_6092"
            width="785.446"
            x="336.44"
            y="210.595"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              mode="normal"
              result="shape"
            />
            <feGaussianBlur
              result="effect1_foregroundBlur_16_6092"
              stdDeviation="5.18664"
            />
          </filter>
          <clipPath id="paint0_angular_16_6092_clip_path">
            <path
              d={svgPaths.p2e462f70}
              mask="url(#path-1-inside-1_16_6092)"
            />
          </clipPath>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="937.609"
            id="filter1_f_16_6092"
            width="1033.71"
            x="236.507"
            y="139.901"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              mode="normal"
              result="shape"
            />
            <feGaussianBlur
              result="effect1_foregroundBlur_16_6092"
              stdDeviation="1.65178"
            />
          </filter>
          <clipPath id="paint1_angular_16_6092_clip_path">
            <path
              d={svgPaths.p16bd1000}
              mask="url(#path-3-inside-2_16_6092)"
            />
          </clipPath>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="1066.75"
            id="filter2_f_16_6092"
            width="1379.08"
            x="175.629"
            y="111.884"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              mode="normal"
              result="shape"
            />
            <feGaussianBlur
              result="effect1_foregroundBlur_16_6092"
              stdDeviation="1.65178"
            />
          </filter>
          <clipPath id="paint2_angular_16_6092_clip_path">
            <path
              d={svgPaths.p10901471}
              mask="url(#path-5-inside-3_16_6092)"
            />
          </clipPath>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="103.59"
            id="filter3_f_16_6092"
            width="98.0396"
            x="494.671"
            y="708.112"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              mode="normal"
              result="shape"
            />
            <feGaussianBlur
              result="effect1_foregroundBlur_16_6092"
              stdDeviation="5.05318"
            />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}

function PhonesDesktop() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, rotateY: 20 }}
      animate={{ opacity: imageLoaded ? 1 : 0, x: 0, rotateY: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease }}
      className="absolute right-[4px] top-[92px] w-[54%] max-w-[820px] h-auto flex items-start justify-center hidden lg:flex pointer-events-none z-[20]"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      data-name="phones-desktop"
    >
      <div className="absolute right-0 bottom-[-6px] w-[520px] h-[280px] rounded-full bg-white/90 blur-[124px] z-[1] pointer-events-none" />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-auto z-[10]"
      >
        <img
          src={phonesImage}
          alt="nēro app mockups"
          className="w-full h-auto object-contain drop-shadow-2xl"
          onLoad={() => setImageLoaded(true)}
        />
      </motion.div>
    </motion.div>
  );
}

function PhonesMobile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7, ease }}
      className="relative w-full lg:hidden z-[2] overflow-hidden mb-[16px]"
      data-name="phones-mobile"
    >
      <div className="relative mx-auto w-[92%] sm:w-[80%] md:w-[68%]">
        {/* Ellipse glow behind phones */}
        <img
          src={bgEllipse}
          alt=""
          aria-hidden="true"
          className="absolute w-[160%] sm:w-[140%] h-auto object-contain opacity-75 pointer-events-none"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
        {/* Phone mockup */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-[2] w-full h-auto"
        >
          <img
            src={phonesImage}
            alt="nēro app mockups"
            className="block mx-auto w-full h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-[36px] sm:h-[42px] bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none z-[3]" />
    </motion.div>
  );
}

function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6, ease }}
      className="h-[20.009px] relative shrink-0 w-[67.344px] cursor-pointer"
      data-name="logo"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 67.3438 20.0089"
      >
        <g id="logo">
          <path d={svgPaths.p7a4d280} fill="var(--fill-0, #2A2A91)" id="Vector" />
          <path d={svgPaths.p66b4700} fill="var(--fill-0, #1A1A1A)" id="Vector_2" />
          <path d={svgPaths.p29195740} fill="var(--fill-0, #1A1A1A)" id="Vector_3" />
          <path d={svgPaths.pb270980} fill="var(--fill-0, #1A1A1A)" id="Vector_4" />
          <g id="Frame 2147229672">
            <path d={svgPaths.p436d900} fill="var(--fill-0, #1A1A1A)" id="Vector_5" />
            <path d={svgPaths.p83ab500} fill="var(--fill-0, #2A2A91)" id="Line 1 (Stroke)" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}

function Container11() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-auto"
      data-name="Container"
    >
      <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.16px] whitespace-nowrap">
        <p className="leading-[24px]">Join Waitlist</p>
      </div>
    </div>
  );
}

function Title1() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-auto"
      data-name="Title"
    >
      <Container11 />
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="SVG">
      <div className="absolute inset-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path
              d="M0.75 8.25L8.25 0.75"
              id="Vector"
              stroke="var(--stroke-0, white)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path
              d="M0.75 0.75H8.25V8.25"
              id="Vector"
              stroke="var(--stroke-0, white)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconFlipArrow() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 size-[18px]"
      data-name="Icon Flip → Arrow 01"
    >
      <Svg />
    </div>
  );
}

function Content1() {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#2a2a91] content-stretch flex gap-[10px] h-[40px] items-center justify-center overflow-clip px-[18px] sm:px-[22px] py-[16px] relative rounded-[107px] shrink-0 cursor-pointer"
      data-name="Content"
    >
      <Title1 />
      <IconFlipArrow />
    </motion.button>
  );
}

function Navigation() {
  return (
    <div
      className="content-stretch flex items-center justify-between relative shrink-0 w-full"
      data-name="Navigation"
    >
      <Logo />
      <Content1 />
    </div>
  );
}

function Navbar() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start justify-center left-0 px-[12px] sm:px-[16px] md:px-[32px] lg:px-[80px] py-[16px] md:py-[20px] top-0 w-full z-[20]"
      data-name="Navbar"
    >
      <Navigation />
    </div>
  );
}

export default function HeroSection() {
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
        headers: {
          "Content-Type": "application/json",
        },
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
    } catch (error) {
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

  return (
    <div
      className="bg-white relative w-full h-auto min-h-[760px] sm:min-h-[860px] md:min-h-[980px] lg:min-h-0 lg:h-[920px] max-w-[1440px] mx-auto lg:overflow-hidden"
      data-name="Hero"
    >
      <div className="hidden lg:block relative w-full h-full">
        <motion.div
          animate={{
            rotate: [-25.27, -23, -25.27],
            x: [0, 15, 0, -15, 0],
            y: [0, -10, -20, -10, 0],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute right-[-20%] top-[-220px] w-[1220px] h-[860px] pointer-events-none"
          data-name="BG Ellipse"
        >
          <img
            src={bgEllipse}
            alt="blue ellipse background"
            className="w-full h-full object-contain opacity-70"
          />
        </motion.div>

        <div className="absolute right-[-24%] top-0 bottom-0 w-[1680px] flex items-center justify-center pointer-events-none overflow-visible">
          <img
            src={circleVectors}
            alt="circle vector background"
            className="w-full h-full object-cover opacity-95"
          />
        </div>

        <PhonesDesktop />

        <div className="absolute left-0 right-0 bottom-0 h-[340px] bg-gradient-to-t from-white via-white/98 to-transparent pointer-events-none z-[30]" />
        <div className="absolute right-[2%] bottom-[0px] w-[500px] h-[230px] rounded-full bg-white/90 blur-[108px] pointer-events-none z-[6]" />
      </div>

      <TextContent
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <PhonesMobile />

      <Navbar />

      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease }}
            className={`fixed top-[100px] left-1/2 -translate-x-1/2 px-6 py-4 rounded-lg shadow-lg z-50 ${
              status === "success" ? "bg-green-500" : "bg-red-500"
            } text-white font-['Satoshi:Medium',sans-serif]`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}