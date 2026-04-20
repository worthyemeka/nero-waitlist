import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
//import AboutSection from "./components/AboutSection";
import FeaturesBentoSection from "./components/FeaturesBentoSection";
import CTAFooterSection from "./components/CTAFooterSection";

export default function App() {
  return (
    <div className="w-full bg-white">
      <HeroSection />
      <MarqueeSection />
     {/* <AboutSectionsss /> */}
      <FeaturesBentoSection />
      <CTAFooterSection />
    </div>
  );
}