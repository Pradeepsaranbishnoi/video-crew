import { useState } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  return (
    <section
      className="relative min-h-[500px] md:min-h-[884px] h-screen overflow-hidden flex items-end bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/home/banner.webp')" }}
    >
      <div className="relative z-10 max-w-[1273px] mx-auto px-4 sm:px-6 w-full mb-12 sm:mb-20 md:mb-[168px]">
        <div className="max-w-4xl">
          <p className="mb-4 sm:mb-6 text-[16px] sm:text-[20px] md:text-[24px] text-gray-200 leading-relaxed font-korean">
            "이번엔 정말 제대로 된 업체를 찾고 싶다..." <br className="hidden sm:block" />
            혹시 이런 마음으로 여기까지 오셨나요? <br className="hidden sm:block" />
            축하드립니다!
          </p>

          <h1 className="text-[28px] sm:text-[36px] md:text-[45px] font-bold mb-4 sm:mb-6 text-white leading-snug font-korean">
            비디오크루가 정답입니다!
          </h1>

          <div className="flex items-center space-x-6 sm:space-x-8">
            <div className="flex space-x-2 sm:space-x-3">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 cursor-pointer rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? "border-[2px] sm:border-[3px] border-white"
                      : "border-[2px] border-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/30 z-0" />
    </section>
  );
}
