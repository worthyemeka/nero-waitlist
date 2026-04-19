import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import FeaturesBentoSection from "./components/FeaturesBentoSection";

export default function App() {
  return (
    <div className="w-full bg-white">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <FeaturesBentoSection />
    </div>
  );
}