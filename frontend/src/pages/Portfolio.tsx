import PortfolioGrid from "../components/portfolio/PortfolioGrid"

export default function PortfolioPage() {
  return (
    <div className="bg-black text-white">
        <img src="/portfolio/left.png" alt="left bf" className="absolute left-0"/>
        <img src="/portfolio/right.png" alt="right bg" className="absolute right-0"/>
        <PortfolioGrid />
    </div>
  )
}
