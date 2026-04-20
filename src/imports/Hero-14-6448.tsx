import { useState, useEffect } from "react";
import svgPaths from "./svg-4mt9vzy6qh";
import imgImage from "figma:asset/aed80f8a771b6448e63386ca4074fbe4e03535d7.png";
import imgImage1 from "figma:asset/50d79a24ccc74633b2db10f0fefb0f3fc1b06bd6.png";
import imgImage2 from "figma:asset/e40d6e4f4d7a60e23f6971269343a65634b5249c.png";
import imgImage3 from "figma:asset/5ccd0af61ab84e97dd0463554594d3e50e09f800.png";
import imgChangeColorHere1 from "figma:asset/20a49013d51ac01f07f21cf94d4e657daf6aa8bb.png";
import img from "figma:asset/37926cd8bda3874e76a7e20290ad157ad83d9447.png";
import img1 from "figma:asset/e0941d82e320b2830913708131e13f910a3f7e57.png";
import imgDisplayFrame from "figma:asset/dbb1fd067243f4440d70b69d06217fd731e31df0.png";
import imgChangeColorHere3 from "figma:asset/be0be519ba2ae414795d5a99ebc1b4c32f3644b4.png";
import img2 from "figma:asset/bbca636967f326e32dc9e0b23bd3ee846b5102bf.png";
import img3 from "figma:asset/6feb571292717653e7183f9c9f0b012a1983e424.png";
import imgDisplayFrame1 from "figma:asset/2444dc85fd700cc286af8d37f5515c4af3db593c.png";
import imgSwatch from "figma:asset/7d0f284c6e048700b92bbffa9e6fbc89e45aad12.png";
import imgAmabz71 from "figma:asset/454895959271a75a9ecc65e380ea010ad7d203ec.png";
import imgChangeColorHere4 from "figma:asset/689af487d8eac0a98c63c2c06c5b0f0ec5a15d2e.png";
import imgCamera from "figma:asset/9d77be3f2640eae14e306f9ef7ab95ea7c90ec9d.png";
import { imgChangeColorHere, imgChangeColorHere2 } from "./svg-r1e2d";

function Badge() {
  return (
    <div className="bg-[rgba(234,234,244,0.34)] relative rounded-[99px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] py-[6px] relative rounded-[inherit] size-full">
        <div className="bg-[#2a2a91] rounded-[4px] shrink-0 size-[8px]" data-name="Background" />
        <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
          <p className="leading-[19.2px]">{`Coming soon to iOS & Android`}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(42,42,145,0.07)] border-solid inset-0 pointer-events-none rounded-[99px]" />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col h-[156px] items-center relative shrink-0 text-[64px] tracking-[-3px] w-full" data-name="Header">
      <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center not-italic relative shrink-0 text-[#12123d] w-full">
        <p className="leading-[78px]">Stop running out of money</p>
      </div>
      <div className="flex flex-col font-['Satoshi:Bold_Italic',sans-serif] italic justify-center relative shrink-0 text-[#2a2a91] w-full">
        <p className="leading-[78px]">before the month ends</p>
      </div>
    </div>
  );
}

function HeaderParagraph() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start leading-[0] relative shrink-0 w-full" data-name="Header & Paragraph">
      <Header />
      <div className="flex flex-col font-['Satoshi:Regular',sans-serif] justify-center not-italic relative shrink-0 text-[#696969] text-[22px] w-full">
        <p className="leading-[30px]">
          Know exactly what you can spend today — so your money lasts the full 30 days.
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Satoshi:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.4)] whitespace-nowrap">
        <p className="leading-[normal]">Enter your email</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f7f7f7] content-stretch flex flex-col h-[48px] items-start min-w-[304px] overflow-clip pl-[18px] pr-[16px] py-[14px] relative rounded-[80px] shrink-0 w-[459px]" data-name="Input">
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[16px]">Get early access</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#2a2a91] relative rounded-[80px] self-stretch shrink-0" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[20px] py-[16px] relative size-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function EmailForm() {
  return (
    <div className="relative shrink-0 w-full" data-name="Email form">
      <div className="content-stretch flex gap-[12px] items-start pr-[12px] relative size-full">
        <Input />
        <Background />
      </div>
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute inset-0 rounded-[32px]" data-name="Image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[32px]">
        <img alt="" className="absolute h-[126.16%] left-[-21.47%] max-w-none top-[-16.25%] w-[121.55%]" src={imgImage} />
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="absolute aspect-[32/32] bottom-0 left-0 rounded-[32px] top-0" data-name="Image">
      <Image1 />
      <div className="absolute border border-solid border-white left-0 rounded-[32px] size-[32px] top-0" data-name="Border" />
    </div>
  );
}

function Image3() {
  return (
    <div className="absolute inset-0 rounded-[32px]" data-name="Image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[32px]">
        <img alt="" className="absolute h-[109.07%] left-[-9.19%] max-w-none top-[-5.13%] w-full" src={imgImage1} />
      </div>
    </div>
  );
}

function Image2() {
  return (
    <div className="absolute aspect-[32/32] bottom-0 left-[16px] rounded-[32px] top-0" data-name="Image">
      <Image3 />
      <div className="absolute border border-solid border-white left-0 rounded-[32px] size-[32px] top-0" data-name="Border" />
    </div>
  );
}

function Image5() {
  return (
    <div className="absolute inset-0 rounded-[32px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[32px] size-full" src={imgImage2} />
    </div>
  );
}

function Image4() {
  return (
    <div className="absolute aspect-[32/32] bottom-0 left-[32px] rounded-[32px] top-0" data-name="Image">
      <Image5 />
      <div className="absolute border border-solid border-white left-0 rounded-[32px] size-[32px] top-0" data-name="Border" />
    </div>
  );
}

function Image7() {
  return (
    <div className="absolute inset-0 rounded-[32px]" data-name="Image">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
        <div className="absolute bg-[#ffa979] inset-0 rounded-[32px]" />
        <div className="absolute inset-0 overflow-hidden rounded-[32px]">
          <img alt="" className="absolute h-[128.15%] left-[-24.06%] max-w-none top-[-14.12%] w-[129.42%]" src={imgImage3} />
        </div>
      </div>
    </div>
  );
}

function Image6() {
  return (
    <div className="absolute aspect-[32/32] bottom-0 right-0 rounded-[32px] top-0" data-name="Image">
      <Image7 />
      <div className="absolute border border-solid border-white left-0 rounded-[32px] size-[32px] top-0" data-name="Border" />
    </div>
  );
}

function ImageBlock() {
  return (
    <div className="h-[32px] relative shrink-0 w-[80px]" data-name="Image Block">
      <Image />
      <Image2 />
      <Image4 />
      <Image6 />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(100);
  useEffect(() => {
    if (count >= 120) return;
    const timeout = setTimeout(() => setCount((c) => c + 1), 80);
    return () => clearTimeout(timeout);
  }, [count]);
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Counter">
      <ImageBlock />
      <div className="flex flex-col font-['Instrument_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#2a2a91] text-[16px] tracking-[-0.32px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="not-italic">
          <span className="font-['Satoshi:Bold',sans-serif] leading-[24px]">{count}+ people</span>
          <span className="font-['Satoshi:Medium',sans-serif] leading-[24px]">{` `}</span>
          <span className="font-['Satoshi:Regular',sans-serif] leading-[24px] text-[#12123d]">already signed up for our waitlist</span>
        </p>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Form">
      <EmailForm />
      <Counter />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full" data-name="Content">
      <HeaderParagraph />
      <Form />
    </div>
  );
}

function TextContent() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[78px] top-[133px] w-[660px]" data-name="Text content">
      <Badge />
      <Content />
    </div>
  );
}

function Frame50() {
  return (
    <div className="h-[1240.474px] relative w-[1616.918px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1616.92 1240.47">
        <g id="Frame 2147229665">
          <g filter="url(#filter0_f_14_6158)" id="Ellipse 1987" opacity="0.45">
            <mask fill="white" id="path-1-inside-1_14_6158">
              <path d={svgPaths.pecf8580} />
            </mask>
            <g clipPath="url(#paint0_angular_14_6158_clip_path)" mask="url(#path-1-inside-1_14_6158)" data-figma-skip-parse="true">
              <g transform="matrix(0.0642013 0.369194 -0.376859 0.0655341 729.164 595.997)">
                <foreignObject height="2304.5" width="2304.5" x="-1152.25" y="-1152.25">
                  <div style={{ background: "conic-gradient(from 90deg,rgba(222, 221, 255, 1) 0deg,rgba(104, 104, 220, 1) 45deg,rgba(255, 255, 255, 1) 104.4deg,rgba(23, 0, 168, 1) 203.4deg,rgba(108, 108, 255, 1) 268.2deg,rgba(255, 255, 255, 1) 322.2deg,rgba(222, 221, 255, 1) 360deg)", height: "100%", width: "100%", opacity: "1" }} />
                </foreignObject>
              </g>
            </g>
            <path d={svgPaths.p2e462f70} mask="url(#path-1-inside-1_14_6158)" data-figma-gradient-fill="{'type':'GRADIENT_ANGULAR','stops':[{'color':{'r':0.41028225421905518,'g':0.41028225421905518,'b':0.86313098669052124,'a':1.0},'position':0.1250},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':1.0},'position':0.28999999165534973},{'color':{'r':0.092621631920337677,'g':0.0,'b':0.66158354282379150,'a':1.0},'position':0.56499999761581421},{'color':{'r':0.427246093750,'g':0.427246093750,'b':1.0,'a':1.0},'position':0.74500000476837158},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':1.0},'position':0.89499998092651367},{'color':{'r':0.87439829111099243,'g':0.86846452951431274,'b':1.0,'a':1.0},'position':1.0}],'stopsVar':[{'color':{'r':0.41028225421905518,'g':0.41028225421905518,'b':0.86313098669052124,'a':1.0},'position':0.1250},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':1.0},'position':0.28999999165534973},{'color':{'r':0.092621631920337677,'g':0.0,'b':0.66158354282379150,'a':1.0},'position':0.56499999761581421},{'color':{'r':0.427246093750,'g':0.427246093750,'b':1.0,'a':1.0},'position':0.74500000476837158},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':1.0},'position':0.89499998092651367},{'color':{'r':0.87439829111099243,'g':0.86846452951431274,'b':1.0,'a':1.0},'position':1.0}],'transform':{'m00':128.40252685546875,'m01':-753.718261718750,'m02':1041.8215332031250,'m10':738.38848876953125,'m11':131.06829833984375,'m12':161.26837158203125},'opacity':1.0,'blendMode':'NORMAL','visible':true}" />
          </g>
          <g filter="url(#filter1_f_14_6158)" id="Ellipse 1988" opacity="0.45">
            <mask fill="white" id="path-3-inside-2_14_6158">
              <path d={svgPaths.pe719a70} />
            </mask>
            <g clipPath="url(#paint1_angular_14_6158_clip_path)" mask="url(#path-3-inside-2_14_6158)" data-figma-skip-parse="true">
              <g transform="matrix(0 0.465501 -0.513553 0 753.364 608.706)">
                <foreignObject height="2129.03" width="2129.03" x="-1064.52" y="-1064.52">
                  <div style={{ background: "conic-gradient(from 90deg,rgba(222, 221, 255, 1) 0deg,rgba(104, 104, 220, 1) 45deg,rgba(255, 255, 255, 1) 104.4deg,rgba(23, 0, 168, 1) 203.4deg,rgba(108, 108, 255, 1) 268.2deg,rgba(255, 255, 255, 1) 322.2deg,rgba(222, 221, 255, 1) 360deg)", height: "100%", width: "100%", opacity: "1" }} />
                </foreignObject>
              </g>
            </g>
            <path d={svgPaths.p16bd1000} mask="url(#path-3-inside-2_14_6158)" data-figma-gradient-fill="{'type':'GRADIENT_ANGULAR','stops':[{'color':{'r':0.41028225421905518,'g':0.41028225421905518,'b':0.86313098669052124,'a':1.0},'position':0.1250},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':1.0},'position':0.28999999165534973},{'color':{'r':0.092621631920337677,'g':0.0,'b':0.66158354282379150,'a':1.0},'position':0.56499999761581421},{'color':{'r':0.427246093750,'g':0.427246093750,'b':1.0,'a':1.0},'position':0.74500000476837158},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':1.0},'position':0.89499998092651367},{'color':{'r':0.87439829111099243,'g':0.86846452951431274,'b':1.0,'a':1.0},'position':1.0}],'stopsVar':[{'color':{'r':0.41028225421905518,'g':0.41028225421905518,'b':0.86313098669052124,'a':1.0},'position':0.1250},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':1.0},'position':0.28999999165534973},{'color':{'r':0.092621631920337677,'g':0.0,'b':0.66158354282379150,'a':1.0},'position':0.56499999761581421},{'color':{'r':0.427246093750,'g':0.427246093750,'b':1.0,'a':1.0},'position':0.74500000476837158},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':1.0},'position':0.89499998092651367},{'color':{'r':0.87439829111099243,'g':0.86846452951431274,'b':1.0,'a':1.0},'position':1.0}],'transform':{'m00':6.2892081137150974e-14,'m01':-1027.1055908203125,'m02':1266.9163818359375,'m10':931.0021972656250,'m11':5.7007445096977916e-14,'m12':143.20452880859375},'opacity':1.0,'blendMode':'NORMAL','visible':true}" />
          </g>
          <g filter="url(#filter2_f_14_6158)" id="Ellipse 1989" opacity="0.45">
            <mask fill="white" id="path-5-inside-3_14_6158">
              <path d={svgPaths.p340ecef0} />
            </mask>
            <g clipPath="url(#paint2_angular_14_6158_clip_path)" mask="url(#path-5-inside-3_14_6158)" data-figma-skip-parse="true">
              <g transform="matrix(0 0.53007 -0.686239 0 865.171 645.258)">
                <foreignObject height="2084.08" width="2084.08" x="-1042.04" y="-1042.04">
                  <div style={{ background: "conic-gradient(from 90deg,rgba(221, 219, 255, 1) 0deg,rgba(104, 104, 220, 1) 45deg,rgba(234, 230, 255, 1) 104.4deg,rgba(23, 0, 168, 1) 203.4deg,rgba(108, 108, 255, 1) 268.2deg,rgba(255, 255, 255, 1) 322.2deg,rgba(221, 219, 255, 1) 360deg)", height: "100%", width: "100%", opacity: "1" }} />
                </foreignObject>
              </g>
            </g>
            <path d={svgPaths.p10901471} mask="url(#path-5-inside-3_14_6158)" data-figma-gradient-fill="{'type':'GRADIENT_ANGULAR','stops':[{'color':{'r':0.41028225421905518,'g':0.41028225421905518,'b':0.86313098669052124,'a':1.0},'position':0.1250},{'color':{'r':0.92073273658752441,'g':0.90487903356552124,'b':1.0,'a':1.0},'position':0.28999999165534973},{'color':{'r':0.092621631920337677,'g':0.0,'b':0.66158354282379150,'a':1.0},'position':0.56499999761581421},{'color':{'r':0.427246093750,'g':0.427246093750,'b':1.0,'a':1.0},'position':0.74500000476837158},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':1.0},'position':0.89499998092651367},{'color':{'r':0.86726105213165283,'g':0.86099010705947876,'b':1.0,'a':1.0},'position':1.0}],'stopsVar':[{'color':{'r':0.41028225421905518,'g':0.41028225421905518,'b':0.86313098669052124,'a':1.0},'position':0.1250},{'color':{'r':0.92073273658752441,'g':0.90487903356552124,'b':1.0,'a':1.0},'position':0.28999999165534973},{'color':{'r':0.092621631920337677,'g':0.0,'b':0.66158354282379150,'a':1.0},'position':0.56499999761581421},{'color':{'r':0.427246093750,'g':0.427246093750,'b':1.0,'a':1.0},'position':0.74500000476837158},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':1.0},'position':0.89499998092651367},{'color':{'r':0.86726105213165283,'g':0.86099010705947876,'b':1.0,'a':1.0},'position':1.0}],'transform':{'m00':8.4040000165094136e-14,'m01':-1372.4772949218750,'m02':1551.4095458984375,'m10':1060.1409912109375,'m11':6.4914917787938647e-14,'m12':115.18778228759766},'opacity':1.0,'blendMode':'NORMAL','visible':true}" />
          </g>
          <g filter="url(#filter3_f_14_6158)" id="star/wide" opacity="0.79">
            <path d={svgPaths.p22790f00} fill="#2A2A91" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="770.804" id="filter0_f_14_6158" width="785.446" x="336.44" y="210.595">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_14_6158" stdDeviation="5.18664" />
          </filter>
          <clipPath id="paint0_angular_14_6158_clip_path">
            <path d={svgPaths.p2e462f70} mask="url(#path-1-inside-1_14_6158)" />
          </clipPath>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="937.609" id="filter1_f_14_6158" width="1033.71" x="236.507" y="139.901">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_14_6158" stdDeviation="1.65178" />
          </filter>
          <clipPath id="paint1_angular_14_6158_clip_path">
            <path d={svgPaths.p16bd1000} mask="url(#path-3-inside-2_14_6158)" />
          </clipPath>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1066.75" id="filter2_f_14_6158" width="1379.08" x="175.629" y="111.884">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_14_6158" stdDeviation="1.65178" />
          </filter>
          <clipPath id="paint2_angular_14_6158_clip_path">
            <path d={svgPaths.p10901471} mask="url(#path-5-inside-3_14_6158)" />
          </clipPath>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="103.59" id="filter3_f_14_6158" width="98.0396" x="494.671" y="708.112">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_14_6158" stdDeviation="5.05318" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function Screen() {
  return (
    <div className="absolute contents left-[-193.03px] top-[8.78px]" data-name="Screen">
      <div className="absolute h-[734.506px] left-[380.08px] mask-position-[-285.111px_-66.968px,_-573.105px_-30.914px] top-[39.69px] w-[253.061px]" style={{ maskImage: `url('${imgChangeColorHere}'), url('${img}')` }} data-name="👈">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="734.506" src={img1} width="253.061" />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[-193.03px] top-[8.42px]" data-name="Group">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[803.89px] left-[calc(50%+117.59px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[287.994px_-35.697px] mask-size-[853.148px_853.148px] top-[calc(50%+95.86px)] w-[1429.138px]" style={{ maskImage: `url('${imgChangeColorHere}')` }} data-name="🎨 change color here">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgChangeColorHere1} />
      </div>
      <Screen />
      <div className="absolute h-[803.89px] left-[-193.03px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[287.994px_-36.055px] mask-size-[853.148px_853.148px] top-[8.78px] w-[1429.138px]" style={{ maskImage: `url('${imgChangeColorHere}')` }} data-name="display-frame">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDisplayFrame} />
      </div>
    </div>
  );
}

function IPhone() {
  return (
    <div className="-translate-x-1/2 absolute contents left-[calc(50%+117.59px)] top-[-27.28px]" data-name="iPhone">
      <Group />
    </div>
  );
}

function Screen1() {
  return (
    <div className="absolute contents left-[-430.6px] top-[78.5px]" data-name="Screen">
      <div className="absolute h-[736.136px] left-[165.73px] mask-position-[-308.178px_-66.572px,_-596.326px_-30.5px] top-[109px] w-[253.986px]" style={{ maskImage: `url('${imgChangeColorHere2}'), url('${img2}')` }} data-name="👈">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="736.136" src={img3} width="253.986" />
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[-430.6px] top-[78.15px]" data-name="Group">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[804.319px] left-[calc(50%-119.6px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[288.148px_-35.715px] mask-size-[853.604px_853.604px] top-[calc(50%+165.81px)] w-[1429.9px]" style={{ maskImage: `url('${imgChangeColorHere2}')` }} data-name="🎨 change color here">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgChangeColorHere3} />
      </div>
      <Screen1 />
      <div className="absolute h-[804.319px] left-[-430.6px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[288.148px_-36.072px] mask-size-[853.604px_853.604px] top-[78.5px] w-[1429.9px]" style={{ maskImage: `url('${imgChangeColorHere2}')` }} data-name="display-frame">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDisplayFrame1} />
      </div>
    </div>
  );
}

function IPhone1() {
  return (
    <div className="-translate-x-1/2 absolute contents left-[calc(50%-119.6px)] top-[42.43px]" data-name="iPhone">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="h-[483.766px] relative w-[708.302px]">
      <div className="absolute inset-[-13.65%_-9.53%_-16.11%_-12.46%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 864.066 627.771">
          <g id="Group 54">
            <g filter="url(#filter0_f_14_6142)" id="Ellipse 13">
              <ellipse cx="193.256" cy="176.279" fill="var(--fill-0, #2A2A91)" rx="193.256" ry="176.279" transform="matrix(0.994641 -0.103386 -0.103386 -0.994641 412.09 456.685)" />
            </g>
            <g filter="url(#filter1_f_14_6142)" id="Ellipse 14">
              <ellipse cx="184.436" cy="119.377" fill="var(--fill-0, #4222E1)" rx="184.436" ry="119.377" transform="matrix(0.958943 -0.283598 -0.283598 -0.958943 155.939 549.823)" />
            </g>
            <g filter="url(#filter2_f_14_6142)" id="Vector 11">
              <path d={svgPaths.p3ea56180} fill="var(--fill-0, #A5A5FF)" />
            </g>
            <g filter="url(#filter3_f_14_6142)" id="Vector 10">
              <path d={svgPaths.p30efb500} fill="var(--fill-0, #6C54FF)" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="522.741" id="filter0_f_14_6142" width="555.962" x="308.104" y="-1.90735e-06">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_14_6142" stdDeviation="42.4428" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="489.46" id="filter1_f_14_6142" width="597.895" x="3.8147e-06" y="138.311">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_14_6142" stdDeviation="59.4199" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="408.471" id="filter2_f_14_6142" width="503.273" x="39.4697" y="168.381">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_14_6142" stdDeviation="45.2723" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="359.278" id="filter3_f_14_6142" width="708.425" x="69.8043" y="106.147">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_14_6142" stdDeviation="45.2723" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Swatch() {
  return (
    <div className="absolute h-[67.651px] left-0 top-[65.42px] w-[214.104px]" data-name="swatch">
      <div aria-hidden="true" className="absolute bg-size-[361.3002973794937px_361.3002973794937px] bg-top-left inset-0 opacity-60 pointer-events-none" style={{ backgroundImage: `url('${imgSwatch}')` }} />
    </div>
  );
}

function Swatch1() {
  return (
    <div className="absolute h-[67.651px] left-[213.36px] top-[65.42px] w-[214.104px]" data-name="swatch">
      <div aria-hidden="true" className="absolute bg-size-[361.3002973794937px_361.3002973794937px] bg-top-left inset-0 opacity-60 pointer-events-none" style={{ backgroundImage: `url('${imgSwatch}')` }} />
    </div>
  );
}

function Swatch2() {
  return (
    <div className="absolute h-[67.651px] left-0 top-0 w-[214.104px]" data-name="swatch">
      <div aria-hidden="true" className="absolute bg-size-[361.3002973794937px_361.3002973794937px] bg-top-left inset-0 opacity-60 pointer-events-none" style={{ backgroundImage: `url('${imgSwatch}')` }} />
    </div>
  );
}

function Swatch3() {
  return (
    <div className="absolute h-[67.651px] left-[213.36px] top-0 w-[214.104px]" data-name="swatch">
      <div aria-hidden="true" className="absolute bg-size-[361.3002973794937px_361.3002973794937px] bg-top-left inset-0 opacity-60 pointer-events-none" style={{ backgroundImage: `url('${imgSwatch}')` }} />
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute h-[133.074px] left-[-30.17px] opacity-40 top-[-28.18px] w-[427.465px]">
      <Swatch />
      <Swatch1 />
      <Swatch2 />
      <Swatch3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[14.09px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#f0f1f3] text-[9.393px] w-[230.918px]">Today’s spending target</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bottom-[12.52px] content-stretch flex flex-col gap-[2.348px] items-start justify-center left-[11.74px] w-[252.836px]">
      <Container2 />
      <p className="font-['Satoshi:Bold','Noto_Sans:Bold',sans-serif] leading-[0] relative shrink-0 text-[#f5f5f7] text-[31.311px] tracking-[-1.409px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 700" }}>
        <span className="leading-[normal] text-white tracking-[-0.72px]">₦10,000</span>
        <span className="leading-[normal] text-[rgba(245,245,247,0.6)] tracking-[-0.72px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 700" }}>
          .00
        </span>
      </p>
      <p className="font-['Satoshi:Regular','Noto_Sans:Regular',sans-serif] leading-[12.524px] relative shrink-0 text-[9.393px] text-[rgba(255,255,255,0.71)] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        From your ₦500,000 Budget
      </p>
    </div>
  );
}

function Component() {
  return (
    <div className="bg-[#232329] h-[98.629px] overflow-clip relative rounded-[9.393px] shrink-0 w-[276.319px]" data-name="16">
      <div className="absolute flex h-[483.766px] items-center justify-center left-[-152.64px] top-[-59.49px] w-[708.302px]">
        <div className="-scale-y-100 flex-none">
          <Group2 />
        </div>
      </div>
      <Frame29 />
      <Frame1 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col h-[98.629px] items-center relative shrink-0">
      <Component />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col h-[98.629px] items-start relative shrink-0 w-[276.319px]">
      <Frame16 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="capitalize content-stretch flex font-['Satoshi:Medium',sans-serif] items-start justify-between leading-[normal] not-italic relative shrink-0 text-[9.39px] w-full whitespace-nowrap">
      <p className="relative shrink-0 text-[#8a8a8a]">Budget Status</p>
      <p className="relative shrink-0 text-[#b2b2b2]">Day 9 of 30</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#484848] text-[10.18px] whitespace-nowrap">59% Spent</p>
    </div>
  );
}

function Frame41() {
  return <div className="absolute bg-[#2a2a91] h-[3.914px] left-[-23.48px] rounded-[999px] top-0 w-[135.42px]" />;
}

function Frame40() {
  return (
    <div className="bg-[#e1e1e1] h-[3.914px] overflow-clip relative rounded-[999px] shrink-0 w-full">
      <Frame41 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[7.828px] items-start relative shrink-0 w-full">
      <Frame42 />
      <Frame40 />
    </div>
  );
}

function P() {
  return (
    <div className="h-[12.524px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[12.524px] left-0 not-italic opacity-58 text-[#696969] text-[9.39px] top-[-0.39px] whitespace-nowrap">Spent</p>
    </div>
  );
}

function P1() {
  return (
    <div className="h-[15.655px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Satoshi:Bold','Noto_Sans:Bold',sans-serif] leading-[15.655px] left-0 text-[#484848] text-[10.96px] top-[-0.39px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 700" }}>
        ₦145,000
      </p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[3.131px] h-[31.311px] items-start relative shrink-0 w-[115.789px]" data-name="Container">
      <P />
      <P1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[3.131px] h-[31.311px] items-end relative shrink-0 text-right w-[115.789px] whitespace-nowrap" data-name="Container">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[12.524px] not-italic opacity-58 relative shrink-0 text-[#696969] text-[9.39px]">Remaining</p>
      <p className="font-['Satoshi:Bold','Noto_Sans:Bold',sans-serif] leading-[15.655px] relative shrink-0 text-[#2a2a91] text-[10.96px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 700" }}>
        ₦255,000
      </p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[9.393px] items-start justify-center min-w-px relative">
      <Frame45 />
      <Frame46 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
      <Frame39 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="bg-[#f7f7f7] content-stretch flex items-center px-[6.262px] py-[9.393px] relative rounded-[12px] shrink-0 w-[257.532px]">
      <Frame38 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col gap-[6.262px] items-start relative shrink-0">
      <Frame44 />
      <Frame30 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[7.828px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.82774 7.82774">
        <g clipPath="url(#clip0_1_17791)" id="Icon">
          <path d={svgPaths.p3df26f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.652311" />
          <path d={svgPaths.p57500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.652311" />
        </g>
        <defs>
          <clipPath id="clip0_1_17791">
            <rect fill="white" height="7.82774" width="7.82774" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#07a944] relative rounded-[3.333px] shrink-0 size-[15.655px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="font-['Satoshi:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#696969] text-[9.39px] w-full">
          <span className="font-['Satoshi:Medium',sans-serif] leading-[normal]">{`You’re spending `}</span>
          <span className="font-['Satoshi:Medium',sans-serif] leading-[normal] text-[#07a944]">on your daily pace.</span>
        </p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[6.262px] items-center relative shrink-0 w-[232.484px]" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function ET() {
  return (
    <div className="bg-[#e6f6ec] relative rounded-[8px] shrink-0 w-full" data-name="eT">
      <div className="content-stretch flex flex-col items-start p-[9.393px] relative size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <ET />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[9.393px] items-start relative shrink-0 w-full">
      <Frame43 />
      <Frame11 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[6.262px] items-start relative shrink-0 w-full">
      <Frame33 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col items-center px-[15.655px] relative shrink-0 w-[307.63px]">
      <div className="bg-white content-stretch flex flex-col items-start p-[9.393px] relative rounded-[12px] shrink-0 w-[276.319px]" data-name="Budget Status States">
        <Frame10 />
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[1.566px] items-start leading-[normal] min-w-px not-italic relative whitespace-nowrap">
      <p className="font-['Satoshi:Bold',sans-serif] relative shrink-0 text-[#12123d] text-[10.959px]">Boost your Money IQ</p>
      <p className="font-['Satoshi:Regular',sans-serif] relative shrink-0 text-[#8a8a8a] text-[9.393px]">4 questions • 1 Minute</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame47 />
    </div>
  );
}

function Frame49() {
  return <div className="absolute bg-[#2a2a91] h-[119.644px] left-0 mix-blend-color top-0 w-[151.075px]" />;
}

function Frame48() {
  return (
    <div className="absolute h-[119.644px] left-[162.03px] top-[-4.84px] w-[151.075px]">
      <div className="absolute h-[119.644px] left-0 top-0 w-[151.075px]" data-name="amabz7 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[111.3%] left-[-20.81%] max-w-none top-[-0.14%] w-[132.21%]" src={imgAmabz71} />
        </div>
      </div>
      <Frame49 />
    </div>
  );
}

function VuesaxLinearArrowRight() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/arrow-right">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6555 15.6555">
        <g id="arrow-right">
          <path d={svgPaths.p124eef00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.17416" />
          <path d="M2.28309 7.82773H13.2615" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.17416" />
          <g id="Vector_3" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-[#3a3aa1] content-stretch flex gap-[6.262px] items-center px-[9.393px] py-[5.479px] relative rounded-[781.991px] shadow-[0px_3.131px_6.575px_0px_rgba(18,18,61,0.12)] shrink-0">
      <p className="font-['Satoshi:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[10.959px] text-white tracking-[-0.5172px] whitespace-nowrap">Take Quiz Now</p>
      <div className="relative shrink-0 size-[15.655px]" data-name="arrow-right">
        <VuesaxLinearArrowRight />
      </div>
    </div>
  );
}

function MotionDiv() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8.611px] items-start overflow-clip p-[12.524px] relative rounded-[12.524px] shrink-0 w-[276.319px]" data-name="motion.div">
      <Frame36 />
      <Frame48 />
      <Frame37 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[15.655px] relative size-full">
          <MotionDiv />
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
      <p className="font-['Satoshi:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2b2f38] text-[10.959px] whitespace-nowrap">Recent Transactions</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col h-[11.742px] items-center justify-center relative shrink-0">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2a2a91] text-[10.176px] whitespace-nowrap">See all</p>
    </div>
  );
}

function VuesaxOutlineArrowRight() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/arrow-right">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5244 12.5244">
        <g id="arrow-right">
          <path d={svgPaths.p382faa80} fill="var(--fill-0, #2A2A91)" id="Vector" />
          <path d={svgPaths.p3cb9200} fill="var(--fill-0, #2A2A91)" id="Vector_2" />
          <g id="Vector_3" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[3.914px] h-[12.524px] items-center relative shrink-0">
      <Frame9 />
      <div className="relative shrink-0 size-[12.524px]" data-name="arrow-right">
        <VuesaxOutlineArrowRight />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame14 />
      <Frame8 />
    </div>
  );
}

function VuesaxLinearArrowSwapHorizontal() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/arrow-swap-horizontal">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0899 14.0899">
        <g id="arrow-swap-horizontal">
          <path d={svgPaths.p28e9fc80} id="Vector" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.960677" />
          <path d="M2.05478 8.80033H12.0351" id="Vector_2" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.960677" />
          <path d={svgPaths.p30b6f700} id="Vector_3" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.960677" />
          <path d="M12.0351 5.28959H2.05478" id="Vector_4" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.960677" />
          <g id="Vector_5" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Buttons() {
  return (
    <div className="relative rounded-[7.097px] shrink-0 size-[26.614px]" data-name="Buttons [1.0]">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[7.984px] relative rounded-[inherit] size-full">
        <div className="relative shrink-0 size-[14.09px]" data-name="arrow-swap-horizontal">
          <VuesaxLinearArrowSwapHorizontal />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f4f4f4] border-[0.887px] border-solid inset-0 pointer-events-none rounded-[7.097px] shadow-[0px_0.887px_1.487px_0px_rgba(166,166,166,0.08)]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#696969] text-[8.611px] whitespace-nowrap">Today · 2:41 PM</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center relative shrink-0 w-[158.811px]">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#12123d] text-[10.959px] w-full">Debit</p>
      <Frame4 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6.262px] items-center min-w-px relative">
      <Buttons />
      <div className="flex flex-row items-center self-stretch">
        <Frame17 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[12.524px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5244 12.5244">
        <g id="Icon">
          <path d={svgPaths.p12dec900} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.0437" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[3.131px] h-[15.655px] items-center justify-end relative shrink-0 w-[60.365px]" data-name="Container">
      <p className="font-['Satoshi:Bold','Noto_Sans:Bold',sans-serif] leading-[15.655px] relative shrink-0 text-[#12123d] text-[10.959px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 700" }}>
        -₦1,200
      </p>
      <Icon1 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[6.262px] items-center py-[12.524px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#f4f4f4] border-b-[0.783px] border-solid inset-0 pointer-events-none" />
      <Frame20 />
      <Container8 />
    </div>
  );
}

function VuesaxLinearArrowSwapHorizontal1() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/arrow-swap-horizontal">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0899 14.0899">
        <g id="arrow-swap-horizontal">
          <path d={svgPaths.p28e9fc80} id="Vector" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.960677" />
          <path d="M2.05478 8.80033H12.0351" id="Vector_2" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.960677" />
          <path d={svgPaths.p30b6f700} id="Vector_3" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.960677" />
          <path d="M12.0351 5.28959H2.05478" id="Vector_4" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.960677" />
          <g id="Vector_5" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Buttons1() {
  return (
    <div className="relative rounded-[7.097px] shrink-0 size-[26.614px]" data-name="Buttons [1.0]">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[7.984px] relative rounded-[inherit] size-full">
        <div className="relative shrink-0 size-[14.09px]" data-name="arrow-swap-horizontal">
          <VuesaxLinearArrowSwapHorizontal1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f4f4f4] border-[0.887px] border-solid inset-0 pointer-events-none rounded-[7.097px] shadow-[0px_0.887px_1.487px_0px_rgba(166,166,166,0.08)]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#696969] text-[8.611px] whitespace-nowrap">Today · 2:41 PM</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center relative shrink-0 w-[158.029px]">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#12123d] text-[10.959px] w-full">Transfer to John</p>
      <Frame5 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6.262px] items-center min-w-px relative">
      <Buttons1 />
      <div className="flex flex-row items-center self-stretch">
        <Frame18 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[12.524px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5244 12.5244">
        <g id="Icon">
          <path d={svgPaths.p2d975b00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.0437" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[3.131px] h-[15.655px] items-center justify-end relative shrink-0 w-[60.365px]" data-name="Container">
      <p className="font-['Satoshi:Bold','Noto_Sans:Bold',sans-serif] leading-[15.655px] relative shrink-0 text-[#12123d] text-[10.959px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 700" }}>
        -₦500
      </p>
      <Icon2 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[6.262px] items-center py-[12.524px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#f4f4f4] border-b-[0.783px] border-solid inset-0 pointer-events-none" />
      <Frame22 />
      <Container9 />
    </div>
  );
}

function VuesaxLinearArrowSwapHorizontal2() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/arrow-swap-horizontal">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0899 14.0899">
        <g id="arrow-swap-horizontal">
          <path d={svgPaths.p28e9fc80} id="Vector" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.960677" />
          <path d="M2.05478 8.80033H12.0351" id="Vector_2" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.960677" />
          <path d={svgPaths.p30b6f700} id="Vector_3" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.960677" />
          <path d="M12.0351 5.28959H2.05478" id="Vector_4" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.960677" />
          <g id="Vector_5" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Buttons2() {
  return (
    <div className="relative rounded-[7.097px] shrink-0 size-[26.614px]" data-name="Buttons [1.0]">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[7.984px] relative rounded-[inherit] size-full">
        <div className="relative shrink-0 size-[14.09px]" data-name="arrow-swap-horizontal">
          <VuesaxLinearArrowSwapHorizontal2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f4f4f4] border-[0.887px] border-solid inset-0 pointer-events-none rounded-[7.097px] shadow-[0px_0.887px_1.487px_0px_rgba(166,166,166,0.08)]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#696969] text-[8.611px] whitespace-nowrap">Yesterday · 9:20 AM</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[1.566px] items-start justify-center relative shrink-0 w-full">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#12123d] text-[10.959px] w-full">AEDC Prepaid</p>
      <Frame6 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative">
      <Frame19 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6.262px] items-center min-w-px relative">
      <Buttons2 />
      <Frame />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[12.524px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5244 12.5244">
        <g id="Icon">
          <path d={svgPaths.pb6b8a80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.0437" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[3.131px] h-[15.655px] items-center justify-end relative shrink-0 w-[60.365px]" data-name="Container">
      <p className="font-['Satoshi:Bold','Noto_Sans:Bold',sans-serif] leading-[15.655px] relative shrink-0 text-[#12123d] text-[10.959px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 700" }}>
        -₦3,500
      </p>
      <Icon3 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[6.262px] items-center pt-[12.524px] relative shrink-0 w-full">
      <Frame25 />
      <Container10 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame21 />
      <Frame23 />
      <Frame24 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Frame7 />
    </div>
  );
}

function Orders() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[1.566px] items-start px-[9.393px] py-[10.959px] relative rounded-[9.393px] shrink-0 w-[276.319px]" data-name="Orders">
      <Frame3 />
      <Frame15 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[15.655px] relative size-full">
          <Orders />
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12.524px] items-center left-0 top-[97.06px] w-[307.63px]">
      <Frame12 />
      <Frame28 />
      <Frame26 />
      <Frame27 />
    </div>
  );
}

function VuesaxBoldHome() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/bold/home">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7866 18.7866">
        <g id="home">
          <path d={svgPaths.p9498b80} fill="var(--fill-0, #2A2A91)" id="Vector" />
          <g id="Vector_2" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function VuesaxOutlineActivity() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/activity">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7866 18.7866">
        <g id="activity">
          <path d={svgPaths.p27fcca80} fill="var(--fill-0, #8F8E99)" id="Vector" />
          <path d={svgPaths.p36f7ce00} fill="var(--fill-0, #8F8E99)" id="Vector_2" />
          <path d={svgPaths.pfaff180} fill="var(--fill-0, #8F8E99)" id="Vector_3" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function VuesaxOutlineDocument() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/document">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7866 18.7866">
        <g id="document">
          <path d={svgPaths.p27fcca80} fill="var(--fill-0, #8F8E99)" id="Vector" />
          <path d={svgPaths.p3898f500} fill="var(--fill-0, #8F8E99)" id="Vector_2" />
          <path d={svgPaths.p255483c0} fill="var(--fill-0, #8F8E99)" id="Vector_3" />
          <g id="Vector_4" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function VuesaxOutlineSetting() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/setting-2">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7866 18.7866">
        <g id="setting-2">
          <path d={svgPaths.p3f0cff70} fill="var(--fill-0, #8F8E99)" id="Vector" />
          <path d={svgPaths.p23bd0180} fill="var(--fill-0, #8F8E99)" id="Vector_2" />
          <path d={svgPaths.pfaff180} fill="var(--fill-0, #8F8E99)" id="Vector_3" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Left() {
  return (
    <div className="flex-[1_0_0] h-[46.966px] min-w-px relative" data-name="Left">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[3.131px] items-center justify-center px-[32.876px] py-[9.393px] relative size-full">
          <div className="h-[10.959px] relative shrink-0 w-[27.397px]" data-name="Time">
            <div className="absolute h-[10.959px] left-0 top-0 w-[27.397px]" data-name="9:41">
              <div className="absolute flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] inset-0 justify-center leading-[0] overflow-hidden text-[13.31px] text-black text-center text-ellipsis tracking-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[10.959px]">9:41</p>
              </div>
            </div>
          </div>
          <div className="relative shrink-0 size-[10.959px]" data-name="Location">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9.393px] top-1/2" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.39328 9.39328">
                <path d={svgPaths.p378da600} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Lens() {
  return (
    <div className="absolute left-[76.71px] size-[9.393px] top-[9.39px]" data-name="Lens">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.39328 9.39336">
        <g id="Lens">
          <circle cx="4.69664" cy="4.69672" fill="var(--fill-0, #0E101F)" id="Ellipse 1" r="4.69664" />
          <circle cx="4.69664" cy="4.69672" fill="var(--fill-0, #01031A)" id="Ellipse 2" r="3.84271" />
          <g filter="url(#filter0_f_1_18100)" id="Ellipse 3">
            <ellipse cx="4.69664" cy="2.56188" fill="var(--fill-0, white)" fillOpacity="0.1" rx="2.13484" ry="0.853935" />
          </g>
          <g filter="url(#filter1_f_1_18100)" id="Ellipse 4">
            <ellipse cx="4.69664" cy="6.40459" fill="var(--fill-0, white)" fillOpacity="0.1" rx="2.13484" ry="1.2809" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="3.27342" id="filter0_f_1_18100" width="5.83522" x="1.77903" y="0.925176">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_18100" stdDeviation="0.391387" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="4.12735" id="filter1_f_1_18100" width="5.83522" x="1.77903" y="4.34092">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_18100" stdDeviation="0.391387" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div className="bg-black h-[28.18px] overflow-clip relative rounded-[32px] shrink-0 w-[95.498px]" data-name="Dynamic Island">
      <Lens />
    </div>
  );
}

function Signal() {
  return (
    <div className="absolute inset-[7.14%_-2.78%_3.57%_0]" data-name="Signal">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.4814 9.78475">
        <g id="Signal">
          <path d={svgPaths.p24689700} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p2a686700} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p24824780} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p15727e00} fill="var(--fill-0, black)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function AutoLayoutHorizontal() {
  return (
    <div className="absolute content-stretch flex gap-[0.391px] h-[10.959px] items-center justify-center left-0 top-0 w-[19.569px]" data-name="Auto Layout Horizontal">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[8.61px] text-center text-white tracking-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[10.959px]">78</p>
      </div>
    </div>
  );
}

function Right() {
  return (
    <div className="flex-[1_0_0] h-[46.966px] min-w-px relative" data-name="Right">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[7.828px] items-center justify-center px-[21.918px] py-[9.393px] relative size-full">
          <div className="h-[10.959px] relative shrink-0 w-[14.09px]" data-name="Network">
            <Signal />
          </div>
          <div className="h-[10.959px] relative shrink-0 w-[14.09px]" data-name="Data">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[8.096px] left-[calc(50%-0.26px)] top-[calc(50%+0.13px)] w-[13.567px]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5673 8.09605">
                <g id="Vector">
                  <path d={svgPaths.p5374680} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p19e5eb00} fill="var(--fill-0, black)" />
                </g>
              </svg>
            </div>
          </div>
          <div className="h-[10.959px] relative shrink-0 w-[21.135px]" data-name="Battery">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.1349 10.9588">
              <g id="Vector" opacity="0.3">
                <path d={svgPaths.p1cac3a80} fill="var(--fill-0, black)" />
                <path d={svgPaths.p29f35680} fill="var(--fill-0, black)" />
              </g>
            </svg>
            <div className="absolute inset-[0_34.14%_0_0]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9198 10.9588">
                <path d={svgPaths.p7627ab0} fill="var(--fill-0, #34C759)" id="Vector" />
              </svg>
            </div>
            <AutoLayoutHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-[#7070b5] content-stretch flex flex-col items-center justify-center p-[7.045px] relative rounded-[14.09px] shrink-0 size-[28.18px]">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[10.176px] text-white whitespace-nowrap">TM</p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center leading-[normal] not-italic relative shrink-0 text-[#12123d] w-[120px]" data-name="title">
      <p className="font-['Satoshi:Bold',sans-serif] relative shrink-0 text-[12.524px] tracking-[-0.1252px] w-full">Welcome Tim 👋</p>
      <p className="font-['Satoshi:Regular',sans-serif] opacity-56 relative shrink-0 text-[8.611px] tracking-[-0.0861px] w-full">Here’s where your money stands</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[6.262px] items-center relative shrink-0">
      <Frame31 />
      <Title />
    </div>
  );
}

function VuesaxLinearNotification() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/notification">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6555 15.6555">
        <g id="notification">
          <path d={svgPaths.p34a7ac80} id="Vector" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.978467" />
          <path d={svgPaths.pc487800} id="Vector_2" stroke="var(--stroke-0, #2A2A91)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="0.978467" />
          <path d={svgPaths.p27449680} id="Vector_3" stroke="var(--stroke-0, #2A2A91)" strokeMiterlimit="10" strokeWidth="0.978467" />
          <path d={svgPaths.p1c64dc00} id="Vector_4" opacity="0" stroke="var(--stroke-0, #2A2A91)" strokeWidth="0.652311" />
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="bg-[rgba(255,255,255,0.37)] content-stretch flex gap-[7.828px] items-center p-[6.262px] relative rounded-[781.991px] shrink-0">
      <div className="relative shrink-0 size-[15.655px]" data-name="notification">
        <VuesaxLinearNotification />
      </div>
      <div className="absolute left-[18.79px] size-[6.262px] top-[-1.17px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.26219 6.26219">
          <circle cx="3.13109" cy="3.13109" fill="var(--fill-0, #D12828)" id="Ellipse 102" r="3.13109" />
        </svg>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-center justify-between left-1/2 pb-[10.959px] pt-[7.828px] px-[15.655px] top-[44.62px] w-[307.63px]">
      <Frame2 />
      <Frame34 />
    </div>
  );
}

function Home() {
  return (
    <div className="absolute bg-[#f8f7f7] h-[666.923px] left-[249.67px] overflow-clip rounded-[45.36px] top-[241.2px] w-[307.63px]" data-name="Home">
      <div className="absolute flex h-[242.171px] items-center justify-center left-[-82.97px] top-[-240.31px] w-[450.212px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-[-1.59deg]">
          <div className="h-[229.97px] relative w-[444.017px]">
            <div className="absolute inset-[-78.78%_-40.8%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 806.352 592.304">
                <g filter="url(#filter0_f_1_19111)" id="Ellipse 14">
                  <ellipse cx="403.176" cy="296.152" fill="var(--fill-0, #4222E1)" fillOpacity="0.77" rx="222.009" ry="114.985" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="592.304" id="filter0_f_1_19111" width="806.352" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1_19111" stdDeviation="90.5835" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame32 />
      <div className="-translate-x-1/2 absolute bg-white bottom-[0.78px] content-stretch flex items-end justify-between left-1/2 pb-[28.18px] pt-[12.524px] px-[21.918px] w-[307.63px]" data-name="Bottom Nav">
        <div aria-hidden="true" className="absolute border-[#f7f7f7] border-solid border-t-[0.783px] inset-0 pointer-events-none shadow-[0.587px_-0.391px_4.697px_0px_rgba(0,0,0,0.02)]" />
        <div className="content-stretch flex flex-col gap-[3.914px] items-center relative shrink-0" data-name="Home">
          <div className="relative shrink-0 size-[18.787px]" data-name="home">
            <VuesaxBoldHome />
          </div>
          <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2a2a91] text-[7.83px] whitespace-nowrap">Home</p>
        </div>
        <div className="content-stretch flex flex-col gap-[3.914px] items-center relative shrink-0" data-name="Home">
          <div className="relative shrink-0 size-[18.787px]" data-name="activity">
            <VuesaxOutlineActivity />
          </div>
          <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8f8e99] text-[7.83px] whitespace-nowrap">Activity</p>
        </div>
        <div className="content-stretch flex flex-col gap-[3.914px] items-center relative shrink-0" data-name="Home">
          <div className="relative shrink-0 size-[18.787px]" data-name="document">
            <VuesaxOutlineDocument />
          </div>
          <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8f8e99] text-[7.83px] whitespace-nowrap">Insights</p>
        </div>
        <div className="content-stretch flex flex-col gap-[3.914px] items-center relative shrink-0" data-name="Home">
          <div className="relative shrink-0 size-[18.787px]" data-name="setting-2">
            <VuesaxOutlineSetting />
          </div>
          <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8f8e99] text-[7.83px] whitespace-nowrap">Settings</p>
        </div>
        <div className="absolute bg-[#111] h-[3.706px] left-[100.2px] rounded-[94.687px] top-[61.84px] w-[108.213px]" data-name="Home Indicator" />
      </div>
      <div className="absolute flex h-[306.69px] items-center justify-center left-[-95px] top-[-300.59px] w-[447.619px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-[1.66deg]">
          <div className="h-[294.109px] relative w-[439.298px]">
            <div className="absolute inset-[-76.16%_-50.99%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 887.295 742.106">
                <g filter="url(#filter0_f_1_17935)" id="Ellipse 15">
                  <ellipse cx="443.648" cy="371.053" fill="var(--fill-0, #4222E1)" rx="219.649" ry="147.055" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="742.106" id="filter0_f_1_17935" width="887.295" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1_17935" stdDeviation="111.999" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex h-[45.401px] items-center justify-center left-1/2 top-0 w-[307.63px]" data-name="Status bar/iPhone 15/Main">
        <Left />
        <DynamicIsland />
        <Right />
      </div>
      <Frame13 />
    </div>
  );
}

function Island() {
  return (
    <div className="absolute h-[28.454px] left-[354px] overflow-clip top-[250.27px] w-[98.146px]" data-name="island">
      <div className="-translate-x-1/2 absolute bg-black h-[28.454px] left-1/2 rounded-[41.238px] top-0 w-[98.146px]" data-name="d island" />
      <div className="absolute left-[76.29px] opacity-60 rounded-[12.371px] size-[14.021px] top-[7.01px]" data-name="camera">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12.371px] size-full" src={imgCamera} />
      </div>
    </div>
  );
}

function IPhone2() {
  return (
    <div className="absolute contents left-[234px] top-[228px]" data-name="iPhone">
      <Home />
      <div className="absolute h-[691.555px] left-[234px] top-[228px] w-[339.385px]" data-name="🎨 change color here">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="691.555" src={imgChangeColorHere4} width="339.385" />
      </div>
      <Island />
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute h-[629px] left-[710px] overflow-clip top-[107px] w-[807.899px]">
      <IPhone />
      <IPhone1 />
      <div className="absolute h-[624.347px] left-[243.48px] top-[228.32px] w-[330.358px]" data-name="shadow">
        <div className="absolute inset-[-11.97%_-22.63%_-10.31%_-22.63%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 479.878 763.496">
            <g filter="url(#filter0_f_1_18813)" id="shadow" opacity="0.4">
              <path d={svgPaths.p3288bf00} fill="var(--fill-0, black)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="763.496" id="filter0_f_1_18813" width="479.878" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_18813" stdDeviation="37.38" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[624.347px] left-[256.61px] top-[228.32px] w-[296.009px]" data-name="shadow">
        <div className="absolute inset-[-3.24%_-6.83%_0.46%_-6.83%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 336.42 641.697">
            <g filter="url(#filter0_f_1_16246)" id="shadow" opacity="0.2">
              <path d={svgPaths.p16c17200} fill="var(--fill-0, black)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="641.697" id="filter0_f_1_16246" width="336.42" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_16246" stdDeviation="10.1027" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <IPhone2 />
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="absolute contents left-[349px] top-[-607px]" data-name="Hero visual">
      <div className="absolute flex h-[1974.094px] items-center justify-center left-[349px] top-[-607px] w-[2037.817px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[38.13deg]">
          <Frame50 />
        </div>
      </div>
      <Frame35 />
    </div>
  );
}

function Logo() {
  return (
    <div className="h-[20.009px] relative shrink-0 w-[67.344px]" data-name="logo">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67.3438 20.0089">
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
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.16px] whitespace-nowrap">
        <p className="leading-[24px]">Join Waitlist</p>
      </div>
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[86px]" data-name="Title">
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
            <path d="M0.75 8.25L8.25 0.75" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path d="M0.75 0.75H8.25V8.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconFlipArrow() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 size-[18px]" data-name="Icon Flip → Arrow 01">
      <Svg />
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-[#2a2a91] content-stretch flex gap-[12px] h-[40px] items-center justify-center overflow-clip px-[22px] py-[16px] relative rounded-[107px] shrink-0" data-name="Content">
      <Title1 />
      <IconFlipArrow />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex items-center justify-between max-w-[1280px] relative shrink-0 w-full" data-name="Navigation">
      <Logo />
      <Content1 />
    </div>
  );
}

function Navbar() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-0 px-[80px] py-[20px] top-0 w-[1440px]" data-name="Navbar">
      <Navigation />
    </div>
  );
}

export default function Hero() {
  return (
    <div className="bg-white relative size-full" data-name="Hero">
      <div className="absolute flex h-[1690.031px] items-center justify-center left-[697px] top-[-172px] w-[1528.685px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-[-25.27deg]">
          <div className="h-[1377.936px] relative w-[1040.044px]" data-name="BG Ellipse">
            <div className="absolute inset-[-35.93%_-47.6%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2030.24 2368.14">
                <g filter="url(#filter0_f_1_18828)" id="Ellipse 14">
                  <ellipse cx="1015.12" cy="1184.07" fill="var(--fill-0, #2400DC)" fillOpacity="0.22" rx="520.022" ry="688.968" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2368.14" id="filter0_f_1_18828" width="2030.24" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1_18828" stdDeviation="247.55" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <TextContent />
      <HeroVisual />
      <Navbar />
    </div>
  );
}