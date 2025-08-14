import { useState, useEffect } from "react"

interface HeroSlide {
  id: number
  image: string
  alt: string
}

export default function DifferentiationHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Hero slides data
  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      image: "/Differentiat/Frame-424.webp",
      alt: "Professional film production crew working in a large studio space with arched windows",
    },
  ]

  const concerns = [
    {
      title: "예산을 초과하는​ 추가 비용이 발생하진 않을까?",
      description: "추가 비용이 발생하지 않으며, 처음부터 투명한 가격을 제시",
    },
    {
      title: "기성 영상 템플릿에​ 내용을 끼워 맞추지는 않을까?",
      description: "맞춤형 제작 방식으로,​ 고객사의 니즈를 100% 반영한​ 독창적인 영상만을 제공",
    },
    {
      title: "진행 상황을​ 중간에 확인할 수 있을까?",
      description: "주기적 보고서 제공으로, 프로젝트 진행 과정을​ 투명하게 공유",
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, heroSlides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)

    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)
  }

  return (
    <section className="z-1 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top small text */}
        <div className="mb-3">
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-white opacity-60 tracking-wide">
            왜 비디오크루를 선택해야 할까요? ​
          </p>
        </div>

        {/* Title + Description */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-10 lg:mb-14">
          {/* Left - Main Title */}
          <div>
            <h1 className="text-[28px] sm:text-[35px] lg:text-[45px] font-bold leading-tight text-white">
              비디오크루만의 특별함​
            </h1>
          </div>

          {/* Right - Description */}
          <div className="flex items-start lg:pt-4">
            <div className="space-y-4">
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-white opacity-60 leading-relaxed">
                컨설턴트가 스토리를 입히고, 전문 디자이너와 촬영감독, PD가 1:1 맞춤 설계된 <br className="hidden sm:block" />
                영상을 제공하며, 차별화된 스토리와 다양한 선택지를 제시합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image Slider */}
        <div className="relative mb-6 group">
          <div className="relative h-64 sm:h-80 lg:h-[588px] overflow-hidden rounded-lg">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Navigation Dots */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentSlide
                      ? "border-[2px] sm:border-[3px] border-white"
                      : "border-[1.5px] sm:border-[2px] border-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Concern Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-7.5 pb-20 lg:pb-40">
          {concerns.map((concern, index) => (
            <div
              key={index}
              className="bg-[#0A0A0A] p-6 sm:p-8 lg:p-10.5 border border-white/10"
            >
              <h3 className="text-white font-bold text-[18px] sm:text-[19px] lg:text-[20px] mb-3 leading-tight whitespace-pre-line">
                {concern.title}
              </h3>
              <p className="text-[#7E7E7E] text-[14px] sm:text-[15px] lg:text-[16px] leading-relaxed whitespace-pre-line">
                {concern.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
