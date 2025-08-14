import DifferentiationHero from "../components/differentiation/DifferentiationHero.tsx"
import DifferentiationFeatures from "../components/differentiation/DifferentiationFeatures.tsx"
import DifferentiationCTA from "../components/differentiation/DifferentiationCTA.tsx"

export default function DifferentiationPage() {
  return (
    <div className="pt-45 pb-32.5 text-white relative overflow-hidden">
        <img src="/Process/left.png" alt="left" className="absolute left-[-5%] top-[25%]"/>
        <img src="/Process/right.png" alt="right" className="absolute right-[-5%] top-[35%]"/>
        <img src="/Process/left.png" alt="left" className="absolute left-[-5%] top-[55%]"/>
        <img src="/Process/right.png" alt="right" className="absolute right-[-3%] top-[65%]"/>
        <DifferentiationHero />
        <DifferentiationFeatures />
        <DifferentiationCTA />
    </div>
  )
}
