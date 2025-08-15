import LazyImage from "../common/LazyImage";

export default function WorkCulture() {
  return (
    <section className="mt-[-100px] sm:mt-[-120px] lg:mt-[-150px] pt-0 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-black relative overflow-hidden">
      {/* Background Images */}
      <LazyImage
        src="/about us page assets (1)/Image/left-bg.png"
        className="absolute left-0 top-[-20%] sm:top-[-30%] lg:top-[-35%] w-[150px] sm:w-[200px] lg:w-auto"
        alt="Left Background"
      />
      <LazyImage
        src="/about us page assets (1)/Image/right-bg.png"
        className="absolute right-0 bottom-0 w-[150px] sm:w-[200px] lg:w-auto"
        alt="Right Background"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold text-white mb-3 sm:mb-4 font-english">
            Work Culture
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed font-korean">
            비디오크루의 업무 문화는 애자일 퍼포먼스, 효율성, 그리고 지식 공유를 기반으로 합니다.
          </p>
        </div>

        {/* Work Culture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Work Performance */}
          <div className="group cursor-pointer">
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[420px] overflow-hidden bg-gray-900 border border-solid [border-image:linear-gradient(to_bottom,#2E2E2E,#2E2E2E_40%,#ffffff_100%)_1] [border-image-slice:1]">
              <LazyImage
                src="/about us page assets (1)/Image/placeholder-2.webp"
                alt="Work Performance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 max-w-[85%]">
                <h4 className="text-sm sm:text-base text-white opacity-60 font-korean">결과중심의 유연한 과업 수행</h4>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 font-english">
                  'Agile' Performance
                </h3>
                <p className="text-sm sm:text-base text-white opacity-60 font-korean">
                  비디오크루는 결과 중심으로 유연하고​ 빠르게 대응합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Specialization */}
          <div className="group cursor-pointer">
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[420px] overflow-hidden bg-gray-900 border border-solid [border-image:linear-gradient(to_bottom,#2E2E2E,#2E2E2E_40%,#ffffff_100%)_1] [border-image-slice:1]">
              <LazyImage
                src="/about us page assets (1)/Image/placeholder-1.webp"
                alt="Specialization"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 max-w-[85%]">
                <h4 className="text-sm sm:text-base text-white opacity-60 font-korean">형식보다는 효과에 집중​</h4>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 font-english">
                  Effectiveness​
                </h3>
                <p className="text-sm sm:text-base text-white opacity-60 font-korean">
                  비디오크루는 형식에 치중하기보다는​ 실용성과 성과, 효과에 집중합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge Sharing - Full Width */}
        <div className="group cursor-pointer">
          <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[450px] overflow-hidden bg-gray-900 border border-solid [border-image:linear-gradient(to_bottom,#2E2E2E,#2E2E2E_40%,#ffffff_100%)_1] [border-image-slice:1]">
            <LazyImage
              src="/about us page assets (1)/Image/placeholder.webp"
              alt="Knowledge Sharing"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
            <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 max-w-[85%]">
              <h4 className="text-sm sm:text-base text-white opacity-60 font-korean">콘텐츠의 확산​</h4>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 font-english">
                Knowledge Sharing
              </h3>
              <p className="text-sm sm:text-base text-white opacity-60 font-korean">
                적시적소에 영상 서비스를 제공하는​ 비디오 컨설턴트로의 역할을 수행합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
