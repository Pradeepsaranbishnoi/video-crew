import { useState } from "react"
import { Play } from "lucide-react"
import VideoModal from "./VideoModal"

interface PortfolioItem {
  id: number
  title: string
  subtitle: string
  category: "video" | "other"
  image: string
  videoUrl: string
  description: string
}

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<"all" | "video" | "other">("all")
  const [visible, setVisible] = useState(5)
  const [selected, setSelected] = useState<PortfolioItem | null>(null)

  const items: PortfolioItem[] = [
    {
      id: 1,
      title: "Logistics Promo",
      subtitle: "Play Video",
      category: "video",
      image: "/portfolio/2.webp",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "대규모 물류 시설의 역동적인 모습을 담은 홍보 영상",
    },
    {
      id: 2,
      title: "Chanel Promotion",
      subtitle: "Play Video",
      category: "video",
      image: "/portfolio/3.webp",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "기업의 비전과 가치를 표현한 아이덴티티 영상",
    },
    {
      id: 3,
      title: "Pizza Company",
      subtitle: "Play Video",
      category: "video",
      image: "/portfolio/4.webp",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description: "럭셔리 패션 브랜드의 감각적인 캠페인 영상",
    },
    {
      id: 4,
      title: "Nutella Recipe",
      subtitle: "Play Video",
      category: "video",
      image: "/portfolio/5.webp",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description: "고급 레스토랑의 분위기를 담은 홍보 영상",
    },
    {
      id: 5,
      title: "Hublot Watch",
      subtitle: "Play Video",
      category: "other",
      image: "/portfolio/1.webp",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      description: "혁신적인 기술을 소개하는 다큐멘터리 영상",
    },
    {
      id: 6,
      title: "Event Coverage",
      subtitle: "Play Video",
      category: "other",
      image: "/placeholder.svg?height=500&width=800",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      description: "특별 이벤트 현장을 생생하게 담은 영상",
    },
    {
      id: 7,
      title: "Brand Story",
      subtitle: "Play Video",
      category: "video",
      image: "/placeholder.svg?height=500&width=800",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      description: "브랜드의 스토리와 철학을 담은 감성 영상",
    },
    {
      id: 8,
      title: "Product Launch",
      subtitle: "Play Video",
      category: "other",
      image: "/placeholder.svg?height=500&width=800",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      description: "신제품 런칭을 위한 프로모션 영상",
    },
  ]

  const filtered = items.filter((i) => filter === "all" || i.category === filter)
  const displayed = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  const btnClass = (type: typeof filter) =>
    `px-[72px] py-[19px] rounded-full border transition cursor-pointer ${
      filter === type
        ? "bg-[#2448FF] text-white border-[#2448FF]"
        : "bg-transparent text-white border-white hover:border-[#2448FF]"
    }`

  return (
    <section className="pt-37.5 pb-30 px-6 z-1">
        <div className="max-w-7xl mx-auto px-6 relative">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h2 className="font-semibold uppercase mb-8">
                    Portfolio
                </h2>
                <h1 className="text-[64px] font-semibold mb-18.5 leading-18">
                We Create Beautiful,
                <br />
                <span className="text-[#2448FF]">Practical Works</span>
                </h1>

                <div className="flex justify-center gap-4 mb-12">
                <button onClick={() => setFilter("all")} className={btnClass("all")}>
                    광고 · 홍보 영상 
                </button>
                <button onClick={() => setFilter("video")} className={btnClass("video")}>
                    이러닝 영상
                </button>
                <button onClick={() => setFilter("other")} className={btnClass("other")}>
                    기업 행사 영상
                </button>
                </div>
            </div>

            <div className="space-y-8 mb-30">
                {displayed.map((item) => (
                <div
                    key={item.id}
                    className="group relative h-96 md:h-[560px] overflow-hidden rounded-lg bg-gray-900"
                >
                    <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                    <div
                    className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-sm pr-8 flex items-center gap-3 group-hover:bg-black/80 transition-colors cursor-pointer rounded-full"
                    onClick={() => setSelected(item)}
                    >
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30">
                        <Play className="w-9 h-9 text-white ml-0.5" fill="white" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-[16px]">{item.title}</h3>
                        <p className="text-gray-300 text-[16px]">{item.subtitle}</p>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            {hasMore && (
                <div className="text-center">
                <button
                    onClick={() => setVisible((v) => v + 5)}
                    className="bg-[#2448FF] text-white px-14 py-3 rounded-full transition cursor-pointer text-[20px] font-semibold"
                >
                    Load More
                </button>
                </div>
            )}

            <VideoModal isOpen={!!selected} onClose={() => setSelected(null)} video={selected} />
        </div>
    </section>
  )
}
