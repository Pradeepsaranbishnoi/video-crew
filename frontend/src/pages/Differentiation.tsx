import DifferentiationHero from "../components/differentiation/DifferentiationHero.tsx"
import DifferentiationFeatures from "../components/differentiation/DifferentiationFeatures.tsx"
import DifferentiationCTA from "../components/differentiation/DifferentiationCTA.tsx"
import LazyImage from "../components/common/LazyImage"
import Seo from "../components/common/Seo"

export default function DifferentiationPage() {
  return (
    <div className="pt-45 pb-32.5 text-white relative overflow-hidden">
        <Seo title="Differentiation" description="비디오크루만의 차별화 – 컨설팅 기반 스토리텔링과 맞춤형 영상 제작" />
        <LazyImage src="/Process/left.png" alt="left" className="absolute left-[-5%] top-[25%]"/>
        <LazyImage src="/Process/right.png" alt="right" className="absolute right-[-5%] top-[35%]"/>
        <LazyImage src="/Process/left.png" alt="left" className="absolute left-[-5%] top-[55%]"/>
        <LazyImage src="/Process/right.png" alt="right" className="absolute right-[-3%] top-[65%]"/>
        <DifferentiationHero />
        <DifferentiationFeatures />
        <DifferentiationCTA />
    </div>
  )
}
