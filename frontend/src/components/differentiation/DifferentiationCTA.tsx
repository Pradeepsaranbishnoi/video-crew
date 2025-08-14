
export default function DifferentiationCTA() {
  return (
    <section className="relative z-1 px-6 pt-20 pb-7.5 bg-cover" style={{backgroundImage:  `url("/Differentiat/bg.webp")`,}}>
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Heading */}
        <h2 className="text-[30px] sm:text-[35px] md:text-[45px] font-semibold text-white leading-tight">
            업계 최고 수준의 맞춤형 영상 콘텐츠​<br/>
            비디오크루와 함께하세요!
        </h2>

        {/* Button */}
        <a
        href="/contact"
        className="bg-[#2448FF] px-12 py-2 md:px-18.5 md:py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 inline-block"
        >
        문의하기
        </a>
      </div>
    </section>
  );
}
