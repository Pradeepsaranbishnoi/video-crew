export default function PortfolioPreview() {
  // First row images (scrolling left to right)
  const topRowImages = [
    "/home/Rectangle-16.webp",
    "/home/Group-41.webp",
    "/home/Group-42.webp",
    "/home/Group-43.webp",
    "/home/Rectangle-11.webp",
  ];

  // Second row images (scrolling right to left)
  const bottomRowImages = [
    "/home/Group-46.webp",
    "/home/Group-48.webp",
    "/home/Group-45.webp",
    "/home/Group-44.webp",
    "/home/Rectangle-15.webp",
  ];

  return (
    <section className="pt-0 px-4 sm:px-6 bg-black overflow-hidden text-center">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-16">
          <h2 className="text-[28px] sm:text-[36px] md:text-[45px] font-bold mb-4 sm:mb-6 text-white">
            비디오크루의 영상제작 사례​
          </h2>
          <p className="text-gray-400 text-[14px] sm:text-[16px] mb-2 leading-relaxed">
            당신의 이야기에 생명을 불어넣는 영상, 비디오크루가 만듭니다.
            <br className="hidden sm:block" />
            모든 프레임에 가치를 담다, 비디오크루​
          </p>
        </div>
      </div>

      {/* Top Row - Left to Right Scroll */}
      <div className="relative mb-4 sm:mb-6 overflow-hidden">
        <div className="flex animate-scroll-right">
          {[...topRowImages, ...topRowImages].map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-32 sm:w-60 sm:h-40 md:w-80 md:h-48 mx-2 sm:mx-3 relative overflow-hidden group cursor-pointer bg-gray-900"
            >
              <img
                src={image}
                alt={`Portfolio showcase ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row - Right to Left Scroll */}
      <div className="relative mb-10 sm:mb-16 overflow-hidden">
        <div className="flex animate-scroll-left">
          {[...bottomRowImages, ...bottomRowImages].map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-32 sm:w-60 sm:h-40 md:w-80 md:h-48 mx-2 sm:mx-3 relative overflow-hidden group cursor-pointer bg-gray-900"
            >
              <img
                src={image}
                alt={`Portfolio showcase ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button className="bg-blue-600 hover:bg-blue-700 px-5 sm:px-7.5 py-2 sm:py-2.5 rounded-full text-[16px] sm:text-[18px] md:text-[20px] font-medium transition-all duration-300 hover:scale-105 text-white cursor-pointer">
        포트폴리오 둘러보기​
      </button>
    </section>
  );
}
