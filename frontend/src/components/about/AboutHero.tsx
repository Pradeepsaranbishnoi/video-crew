import { useState } from "react";

export default function AboutHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  return (
    <section
      className="bg-black pt-20 md:pt-32 bg-contain bg-right bg-no-repeat mb-12 md:mb-[85px]"
      style={{
        backgroundImage: "url('/about us page assets (1)/bg.png')",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10 md:mb-15 items-center">
          {/* Left Side */}
          <div>
            <p className="text-sm md:text-base text-white opacity-60 mb-4 md:mb-[22px] tracking-wider uppercase font-medium font-english">
              Who we are, Video Crew
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-[45px] font-bold leading-tight text-white font-korean">
              스토리로 말하는 영상 콘텐츠, <br className="hidden sm:block" />
              시선을 사로잡는 영상, <br className="hidden sm:block" />
              더 이상 고민하지 마세요!
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center">
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base md:text-[16px] text-white opacity-60 leading-relaxed font-korean">
                우리는 영상이 단순한 기록을 넘어, 감동을 전달하고, 생각을 움직이며,
                변화를 이끌어내는 가장 강력한 매체라고 믿습니다. 비디오크루는 모든
                프로젝트에 진정성을 담아, 고객의 메시지가 세상에 가장 효과적으로
                전달될 수 있도록 창의적인 영상을 연구하고 실현합니다.{" "}
                <span className="hidden sm:inline">
                  "모든 프레임에 가치를 담아" 고객과 함께 성장하는 파트너가 되겠습니다.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative">
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[588px] overflow-hidden">
            <img
              src="/about us page assets (1)/Frame-422.webp"
              alt="Professional cameraman silhouette against colorful sky"
              className="object-cover w-full h-full border border-solid [border-image:linear-gradient(to_bottom,#2E2E2E,#2E2E2E_40%,#ffffff_100%)_1] [border-image-slice:1]"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Overlay Text */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8">
              <div className="max-w-xl">
                <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-white mb-2 sm:mb-4 font-korean">
                  회사소개 <br className="hidden sm:block" /> Video Crew
                </h2>
                <p className="text-white opacity-35 text-sm sm:text-base md:text-[20px] leading-relaxed font-english">
                  Video Consulting Firm
                </p>

                {/* Slide Indicators */}
                <div className="flex items-center space-x-4 sm:space-x-8 pt-6 sm:pt-8 md:pt-[54px]">
                  <div className="flex space-x-2 sm:space-x-3">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 cursor-pointer rounded-full transition-all duration-200 ${
                          index === currentSlide
                            ? "border-[2px] sm:border-[3px] border-white"
                            : "border border-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
