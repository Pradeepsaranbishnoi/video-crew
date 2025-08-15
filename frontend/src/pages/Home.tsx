import ClientsSection from "../components/common/ClientsSection";
import Dashed from "../components/common/Dashed";
import AboutSection from "../components/home/AboutSection";
import Counter from "../components/home/Counter";
import HeroSection from "../components/home/HeroSection";
import PortfolioPreview from "../components/home/PortfolioPreview";
import Seo from "../components/common/Seo";

export default function Home() {
  return (
    <>
      <Seo title="Home" description="비디오크루 – 스토리로 말하는 영상, 브랜드를 성장시키는 전문 영상 제작 팀" />
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