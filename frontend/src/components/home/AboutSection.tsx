import ServicesGrid from "../../components/common/ServicesGrid";

export default function AboutSection() {
  const HomeServices = [
    {
      title: "Creative Solutions​",
      description:
        "틀에 박힌 영상이 아닌, ​메시지에 최적화된 독창적인 ​아이디어를 제시합니다.",
      image: "/home/image-3.webp",
    },
    {
      title: "Professional Quality",
      description:
        "대기업과 협업중인 전문 컨설턴트들이 기획하며, 최신 장비와 기술력을 바탕으로 모든 프로젝트에 최상의 퀄리티를 보장합니다.​",
      image: "/home/image-2.webp",
    },
    {
      title: "All-in-One Service",
      description:
        "복잡한 영상 제작 과정, ​비디오크루에서는 기획부터 ​최종 납품까지 원스톱으로 ​해결해 드립니다.",
      image: "/home/image-1.webp",
    },
  ];

  return (
    <section className="relative overflow-hidden mb-[-50px] md:mb-[-100px] z-[1] bg-black">
      {/* Background Patterns */}
      <img
        src="/home-assets/Pattern.webp"
        className="absolute h-[300px] sm:h-full object-contain left-[-50%] sm:left-[-38%] bottom-[-10%] sm:bottom-[-23%] rotate-[16deg] opacity-30 sm:opacity-100"
        alt="pattern"
      />
      <img
        src="/home-assets/Pattern.webp"
        className="absolute top-[-20px] sm:top-[-50px] right-[-50%] sm:right-[-38%] h-[300px] sm:h-full object-contain rotate-[-154deg] opacity-30 sm:opacity-100"
        alt="pattern"
      />

      {/* Intro Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-[66px] pb-12 sm:pb-[80px] relative z-10 text-white">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-start text-center lg:text-left">
          <div>
            <p className="text-[14px] sm:text-[16px] mb-4 sm:mb-8 tracking-wider uppercase font-medium">
              비디오크루의 차별점
            </p>
            <h2 className="text-[28px] sm:text-[36px] md:text-[45px] font-bold leading-tight">
              영상 제작,
              <br className="hidden sm:block" />
              어떻게 하고 계신가요?
            </h2>
          </div>
          <div className="flex items-center lg:items-start lg:pt-16">
            <p className="text-[14px] sm:text-[16px] leading-relaxed">
              비디오크루는 단순한 영상 제작을 넘어, 강력한 스토리텔링과
              독창적인 시각적 표현으로 고객의 메시지에 생명력을 불어넣는
              비디오 콘텐츠 전문 그룹입니다. 기획부터 촬영, 편집, 그리고 최종
              결과물에 이르기까지, 각 분야의 전문가들이 고객의 비전을 완성도
              높은 영상으로 구현합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <ServicesGrid services={HomeServices} />
    </section>
  );
}
