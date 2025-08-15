
interface FeatureProps {
  number: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

const features: FeatureProps[] = [
  {
    number: "01",
    title: "A/B 시안 제공​",
    description:
      "동일한 콘텐츠이라도 다양한 가능성을 고려하는 것이 중요합니다.디자인크루는 서로 다른 2가지 영상 시안을 제공하여 선택의 폭을 넓혀드립니다. 샘플 파일을 통해 본 작업 전에 방향성을 명확히 확인할 수 있습니다.",
    image: "/Differentiat/Frame-425.webp",
  },
  {
    number: "02",
    title: "100% 투명한 정찰제​​",
    description:
      "사전에 협의를 통해서 명확하게 예측 가능한 견적을 제공합니다.​다른 업체처럼 진행과정에서 가격이 변동되지 않습니다.",
    image: "/Differentiat/Frame-426.webp",
    reverse: true,
  },
  {
    number: "03",
    title: "100% 고객사 맞춤형 제작",
    description:
      "우리는 찍어내듯 만드는 틀에 박힌 영상 제작을 단호히 거부합니다. 비디오크루의 모든 영상은 고객님의 고유한 브랜드 아이덴티티, 타겟 시청자의 특성, 전달하고자 하는 핵심 메시지에 맞춰 오직 하나뿐인 '오리지널 콘텐츠'로 탄생합니다.",
    image: "/Differentiat/Frame-427.webp",
  },
  {
    number: "04",
    title: "결과에 대한 자신감",
    description:
      "100% 고객 만족 책임 환불제​ 비디오크루는 제공하는 영상의 퀄리티와 고객 만족에 대해 업계 최고 수준의 자신감을 가지고 있습니다. 만약 최종적으로 전달된 영상이 사전에 협의된 기획 의도 및 약속된 기준에서 현저히 벗어나 고객님께서 만족하지 못하실 경우,...",
    image: "/Differentiat/Frame-398.webp",
    reverse: true,
  },
];

function FeatureSection({
  number,
  title,
  description,
  image,
  reverse = false,
}: FeatureProps) {
  return (
    <div className="z-1 flex items-center pb-29.5 relative">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div
          className={`grid gap-16 items-center ${
            reverse ? "lg:grid-flow-col-dense lg:grid-cols-[60%_40%]" : "lg:grid-cols-[40%_60%]"
          }`}
        >
          {/* Text Content */}
          <div className={`space-y-8 ${reverse ? "lg:col-start-2" : ""}`}>
            <div className="text-[165px] font-bold text-white/11 leading-none mb-13 font-english">
              {number}
            </div>
            <div className="space-y-4">
              <h2 className="text-[45px] font-bold text-white leading-tight mb-3 font-korean">
                {title}
              </h2>
              <p className="text-[#7E7E7E] text-[16px] leading-relaxed max-w-md font-korean">
                {description}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className={`relative ${reverse ? "lg:col-start-1" : ""}`}>
            <div className="relative h-[374px] overflow-hidden">
              <img
                src={image}
                alt={title}
                className="object-cover h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DifferentiationFeatures() {
  return (
    <section className="bg-black">
      {features.map((feature) => (
        <FeatureSection key={feature.number} {...feature} />
      ))}
    </section>
  );
}
