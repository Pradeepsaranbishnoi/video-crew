import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

export default function Counter() {
  const stats = [
    { target: 10, label: "다년간의 경험", suffix: "+" },
    { target: 100, label: "누적 프로젝트 수", suffix: "+" },
    { target: 100, label: "고객 만족도", suffix: "%" },
    { target: 90, label: "프로젝트 재수주율", suffix: "%" },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section
      ref={ref}
      className="bg-black py-12 sm:py-[111px] mb-12 sm:mb-[87px]"
      style={{
        backgroundImage: "url('/home-assets/bg.webp')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="relative">
            <div className="text-[36px] sm:text-[54px] font-bold text-white relative inline-block">
              {inView && <CountUp end={stat.target} duration={2} />}
              {/* Mobile: inline suffix, Desktop: absolute suffix */}
              <span
                className="
                  sm:absolute sm:right-[-25px] sm:top-0
                  text-[20px] sm:text-[30px]
                  ml-1 sm:ml-0
                "
              >
                {stat.suffix}
              </span>
            </div>
            <div className="text-[16px] sm:text-[24px] text-gray-400 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
