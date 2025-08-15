import PortfolioGrid from "../components/portfolio/PortfolioGrid"
import LazyImage from "../components/common/LazyImage"
import Seo from "../components/common/Seo"

export default function PortfolioPage() {
  return (
    <div className="bg-black text-white">
        <Seo title="Portfolio" description="비디오크루 포트폴리오 – 광고, 이러닝, 기업 행사 등 다양한 영상 사례" />
        <LazyImage src="/portfolio/left.png" alt="left bf" className="absolute left-0"/>
        <LazyImage src="/portfolio/right.png" alt="right bg" className="absolute right-0"/>
        <PortfolioGrid />
    </div>
  )
}
