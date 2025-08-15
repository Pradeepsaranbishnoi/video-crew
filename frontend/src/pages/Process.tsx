import ProcessHero from "../components/process/ProcessHero";
import ProcessStep from "../components/process/ProcessStep";
import LazyImage from "../components/common/LazyImage";
import Seo from "../components/common/Seo";

export default function Process(){
    const processSteps = [
    {
      number: "01",
      title: "상담 및 목표 설정",
      subtitle: "(Consultation & Goal Setting)​",
      description:
        "비디오크루는 고객님의 입장에서 먼저 고민합니다. 영상 제작의 궁극적인 목적(예: 브랜드 인지도 향상, 제품 판매 증진, 정보 전달)과 기대 효과, 주요 타겟 시청자,...",
      fullDescription:
        "비디오크루는 고객님의 업종에서 원하는 결과물이나 영상 제작의 목적을 파악하고, 브랜드 컨셉에 맞는 창의적 아이디어를 제안합니다. 기획 초안, 주요 촬영 시나리오를 구성하며, 예산과 일정을 고려한 최적의 제작 방향을 설정합니다. 고객과의 깊이 있는 상담을 통해 프로젝트의 핵심 메시지와 타겟 오디언스를 명확히 하고, 이를 바탕으로 효과적인 영상 전략을 수립합니다.",
      image: "/Process/Frame-395.webp",
      reverse: false,
      showSeeMore: true,
      className: " "
    },
    {
      number: "02",
      title: "영상 기획 및 전략 수립",
      subtitle: "(Video Planning & Strategy)​",
      description:
        "설정된 목표와 예산을 바탕으로 영상의 핵심 콘셉트, 주요 스토리라인, 창의적인 표현 전략을 구체화합니다. 비디오크루는 이 기획 단계를 영상의 성패를 좌우하는 가장 중요한...",
      fullDescription:
        "설정된 목표와 예산을 바탕으로 영상의 핵심 콘셉트, 주요 스토리라인, 창의적인 표현 전략을 구체화합니다. 비디오크루는 이 기획 단계를 영상의 성패를 좌우하는 가장 중요한 설정된 목표와 예산을 바탕으로 영상의 핵심 콘셉트, 주요 스토리라인, 창의적인 표현 전략을 구체화합니다. 비디오크루는 이 기획 단계를 영상의 성패를 좌우하는 가장 중요한.",
      image: "/Process/Frame-396.webp",
      reverse: true,
      showSeeMore: true,
      className: "mt-[-100px] ",
    },
    {
      number: "03",
      title: "프리 프로덕션 및 구성안 확정",
      subtitle: "(Pre-Production & Storyboard/Script Confirmation)​",
      description:
        "​확정된 기획안을 바탕으로 영상의 실제 제작을 위한 모든 세부 사항을 준비하고 설계합니다. 촬영용 최종 스크립트 작성, 각 장면의 구도와 움직임을 시각화하는 스토리보드(콘티) 제작,...",
    fullDescription:
        "​확정된 기획안을 바탕으로 영상의 실제 제작을 위한 모든 세부 사항을 준비하고 설계합니다. 촬영용 최종 스크립트 작성, 각 장면의 구도와 움직임을 시각화하는 스토리보드(콘티) 제작 ​확정된 기획안을 바탕으로 영상의 실제 제작을 위한 모든 세부 사항을 준비하고 설계합니다. 촬영용 최종 스크립트 작성, 각 장면의 구도와 움직임을 시각화하는 스토리보드(콘티) 제작",
      image: "/Process/Frame-397.webp",
      reverse: false,
      showSeeMore: true,
      className: "mt-[100px] ",
    },
    {
      number: "04",
      title: "제작 및 촬영",
      subtitle: "(Production & Filming)",
      description:
        "모든 준비가 완료된 프리 프로덕션 단계를 거쳐, 전문 촬영팀이 실제 영상 촬영을 진행합니다. 프로젝트의 성격과 규모에 최적화된 촬영 장비(카메라, 조명, 음향 등)를 활용하여,...",
    fullDescription:
        "모든 준비가 완료된 프리 프로덕션 단계를 거쳐, 전문 촬영팀이 실제 영상 촬영을 진행합니다. 프로젝트의 성격과 규모에 최적화된 촬영 장비(카메라, 조명, 음향 등)를 활용하여 모든 준비가 완료된 프리 프로덕션 단계를 거쳐, 전문 촬영팀이 실제 영상 촬영을 진행합니다. 프로젝트의 성격과 규모에 최적화된 촬영 장비(카메라, 조명, 음향 등)를 활용하여",
      image: "/Process/Frame-396-1.webp",
      reverse: true,
      showSeeMore: true,
      className: "mt-[-100px] ",
    },
    {
      number: "05",
      title: "편집 및 후반 작업 ",
      subtitle: "(Editing & Post-Production)",
      description:
        "촬영된 원본 영상을 편집하여 영상의 전체적인 흐름과 리듬을 만듭니다. 컷 편집, 색 보정(Color Grading), 사운드 믹싱, 필요한 경우 2D/3D 모션 그래픽 및 CG 작업,...",
    fullDescription:
        "촬영된 원본 영상을 편집하여 영상의 전체적인 흐름과 리듬을 만듭니다. 컷 편집, 색 보정(Color Grading), 사운드 믹싱, 필요한 경우 2D/3D 모션 그래픽 및 CG 작업 촬영된 원본 영상을 편집하여 영상의 전체적인 흐름과 리듬을 만듭니다. 컷 편집, 색 보정(Color Grading), 사운드 믹싱, 필요한 경우 2D/3D 모션 그래픽 및 CG 작업",
      image: "/Process/Frame-423.webp",
      reverse: false,
      showSeeMore: true,
      className: "mt-[100px] ",
    },
    {
      number: "06",
      title: "최종 검토, 전달 및 활용 지원",
      subtitle: "(Final Review, Delivery & Utilization Support)",
      description:
        "완성된 영상은 내부 QA(품질 관리) 및 고객님의 최종 검토를 거쳐 최상의 퀄리티로 약속된 파일 형식(예: MP4, MOV 등) 및 사양으로 전달됩니다. 여기서 끝이 아닙니다...",
    fullDescription:
        "완성된 영상은 내부 QA(품질 관리) 및 고객님의 최종 검토를 거쳐 최상의 퀄리티로 약속된 파일 형식(예: MP4, MOV 등) 및 사양으로 전달됩니다. 여기서 끝이 아닙니다 완성된 영상은 내부 QA(품질 관리) 및 고객님의 최종 검토를 거쳐 최상의 퀄리티로 약속된 파일 형식(예: MP4, MOV 등) 및 사양으로 전달됩니다. 여기서 끝이 아닙니다",
      image: "/Process/Frame-396-2.webp",
      reverse: true,
      showSeeMore: true,
      className: "mt-[-100px] ",
    },
  ]
    return(
        <>
            <Seo title="Process" description="비디오크루 영상 제작 프로세스 – 상담, 기획, 촬영, 편집까지 원스톱" />
            <ProcessHero/>
            <section className="py-20 pb-27.5 relative mt-[77px]">
                <img src="/Process/right.png" className="absolute right-0 top-[-20%]"/>
                <img src="/Process/left.png" className="absolute left-0"/>
                <img src="/Process/right.png" className="absolute right-0 top-[20%]"/>
                <img src="/Process/left.png" className="absolute left-0 top-[40%]"/>
                <img src="/Process/right.png" className="absolute right-0 bottom-[0%]"/>
                {processSteps.map((step) => (
                    <ProcessStep
                    key={step.number}
                    number={step.number}
                    title={step.title}
                    subtitle={step.subtitle}
                    description={step.description}
                    fullDescription={step.fullDescription}
                    image={step.image}
                    reverse={step.reverse}
                    showSeeMore={step.showSeeMore}
                    className={step.className}
                    />
                ))}
            </section>
        </>
    )
}