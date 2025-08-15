import AboutHero from '../components/about/AboutHero';
import WorkCulture from '../components/about/WorkCulture';
import ClientsSection from '../components/common/ClientsSection';
import Dashed from '../components/common/Dashed';
import ServicesGrid from '../components/common/ServicesGrid.tsx';
import LazyImage from '../components/common/LazyImage';
import AnimatedSection from '../components/common/AnimatedSection';
import AnimatedText from '../components/common/AnimatedText';
import Seo from '../components/common/Seo';

export default function About() {
  const HomeServices = [
    {
      title: "Customer-Centric",
      description:
        "비디오크루가 지향하는 것은​ 고객의 성공입니다.",
      image: "/about us page assets (1)/image-6.webp",
    },
    {
      title: "Problem Solving​",
      description:
        "비디오크루는 디자인 이슈, 제안 ​컨설팅 등 고객의 문제에 집중합니다.​",
      image: "/about us page assets (1)/image-5.webp",
    },
    {
      title: "Candidness",
      description:
        "업무를 수행함에 있어서​ 솔직하고 진정성 있게 접근합니다.​",
      image: "/about us page assets (1)/image-4.webp",
    },
  ];
  return (
    <>
      <Seo title="About" description="비디오크루 소개 – 고객 중심의 스토리텔링과 전문 영상 제작 문화" />
      <AboutHero/>
      <div className="max-w-7xl mx-auto px-6">
        <ClientsSection showHeading={false} showTopMargin={false} showHr={false}/>
      </div>
      <Dashed src='home-assets/Image.webp'  className="bg-black w-full mt-[-200px]"/>
      <AnimatedSection delay={0.2} direction="up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-white text-center mb-0.5">
          <AnimatedText
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold mb-2.5 font-english"
            delay={0.3}
            stagger={0.05}
          >
            Core Value
          </AnimatedText>
          <AnimatedText
            as="p"
            className="text-sm sm:text-base md:text-lg opacity-60 leading-relaxed font-korean"
            delay={0.5}
            stagger={0.03}
          >
            ​비디오크루가 지향하는 핵심가치는 고객중심, 문제해결, 솔직함으로
            <br className="hidden sm:block" />
            항상 진정성 있게 고객을 대하는 것을 목표로 합니다.
          </AnimatedText>
        </div>
      </AnimatedSection>

      <ServicesGrid services={HomeServices}/>
      <Dashed className="bg-black w-full" src="/home-assets/Image-1.webp" />
      <WorkCulture/>
    </>
  );
};
