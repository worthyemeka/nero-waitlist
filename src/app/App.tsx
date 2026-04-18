import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";

export default function App() {
  return (
    <div className="w-full bg-white">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
    </div>
  );
}