import ClientsSection from "../components/common/ClientsSection";
import Dashed from "../components/common/Dashed";
import AboutSection from "../components/home/AboutSection";
import Counter from "../components/home/Counter";
import HeroSection from "../components/home/HeroSection";
import PortfolioPreview from "../components/home/PortfolioPreview";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <AboutSection/>
      <Dashed className="bg-black w-full" src="/home-assets/Image.webp" />
      <PortfolioPreview/>
      <Dashed className="bg-black w-full" src="/home-assets/Image-1.webp" />
      <ClientsSection showHeading={true} showTopMargin={true} showHr={true} />
      <Counter/>
    </>
  );
};