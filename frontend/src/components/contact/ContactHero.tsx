export default function ContactHero() {
  return (
    <section className="bg-black">
      <div className="max-w-7xl mx-auto pr-6 border border-white/20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left - Image */}
          <div className="relative order-1 md:order-none">
            <div className="relative h-64 md:h-80 lg:h-[570px] overflow-hidden">
              <img
                src="/contact/main.jpg"
                alt="Professional hands typing on laptop keyboard in black and white"
                className="grayscale object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 px-4 md:px-6 lg:px-0">
            <div className="mb-8 lg:mb-13">
              <h1 className="text-[28px] md:text-[36px] lg:text-[45px] font-bold text-white mb-3">
                문의하기
              </h1>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] text-white opacity-60 leading-relaxed">
                비디오크루 전문팀이 고객님 요청에 맞는 최적의 솔루션을 제안해 드립니다.
                <br />최 상담부터 제작까지 고객 맞춤형 영상을 제공해 드리며 언제든지 문의
                <br />
                주시면 성심 성의껏 답변해 드리겠습니다.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-[28px] md:text-[36px] lg:text-[45px] font-bold text-white">
                정보
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-400 mb-3 md:mb-6">
                    ADDRESS
                  </h3>
                  <p className="text-gray-300 text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed mb-4.5">
                    서울특별시 강남구 테헤란로 518 섬유센터빌딩 7층, 서울특별시 강남구 테헤란로
                    <br />
                    Daerim-dong 7-ga, Yeongdeungpo-gu Seoul
                    <br />
                    Taeik Tower 6 WJHT-1003
                  </p>
                </div>

                <div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-400 mb-3 md:mb-6">
                    CALL US
                  </h3>
                  <p className="text-gray-300 text-[15px] md:text-lg font-medium">
                    010-38-9947
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
