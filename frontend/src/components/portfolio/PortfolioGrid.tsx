import { useState, useEffect } from "react"
import { Play } from "lucide-react"
import VideoModal from "./VideoModal"
import LazyImage from "../common/LazyImage"
import { motion } from "framer-motion"
import AnimatedText from "../common/AnimatedText"
import { apiService, type PortfolioItem } from "../../services/api"

interface DisplayPortfolioItem {
  id: string
  title: string
  subtitle: string
  category: string
  image: string
  videoUrl: string
  description: string
}

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<string>("all")
  const [visible, setVisible] = useState(5)
  const [selected, setSelected] = useState<DisplayPortfolioItem | null>(null)
  const [portfolioItems, setPortfolioItems] = useState<DisplayPortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [categories, setCategories] = useState<string[]>([])

  // Fetch portfolio items from API
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setLoading(true)
        const items = await apiService.getPortfolioItems()
        
        // Transform API data to display format
        const transformedItems: DisplayPortfolioItem[] = items.map((item) => ({
          id: item._id,
          title: item.title,
          subtitle: "Play Video",
          category: item.category,
          image: item.thumbnail_url,
          videoUrl: item.video_url,
          description: item.description || "Professional video production"
        }))
        
        setPortfolioItems(transformedItems)
        
        // Extract unique categories from the data
        const uniqueCategories = [...new Set(items.map(item => item.category))].filter(cat => cat && cat.trim() !== '')
        setCategories(uniqueCategories)
      } catch (err) {
        console.error('Failed to fetch portfolio items:', err)
        setError("Failed to load portfolio items")
        
        // Fallback to static data if API fails
        setPortfolioItems([
          {
            id: "1",
            title: "Logistics Promo",
            subtitle: "Play Video",
            category: "video",
            image: "/portfolio/2.webp",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            description: "대규모 물류 시설의 역동적인 모습을 담은 홍보 영상",
          },
          {
            id: "2",
            title: "Chanel Promotion",
            subtitle: "Play Video",
            category: "video",
            image: "/portfolio/3.webp",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            description: "기업의 비전과 가치를 표현한 아이덴티티 영상",
          },
          {
            id: "3",
            title: "Pizza Company",
            subtitle: "Play Video",
            category: "video",
            image: "/portfolio/4.webp",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            description: "럭셔리 패션 브랜드의 감각적인 캠페인 영상",
          },
          {
            id: "4",
            title: "Nutella Recipe",
            subtitle: "Play Video",
            category: "video",
            image: "/portfolio/5.webp",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            description: "고급 레스토랑의 분위기를 담은 홍보 영상",
          },
          {
            id: "5",
            title: "Hublot Watch",
            subtitle: "Play Video",
            category: "other",
            image: "/portfolio/1.webp",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            description: "혁신적인 기술을 소개하는 다큐멘터리 영상",
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioItems()
  }, [])

  // Function to translate categories to Korean
  const translateCategoryToKorean = (category: string): string => {
    const translations: { [key: string]: string } = {
      'Corporate': '기업 영상',
      'Commercial': '광고 영상',
      'Music Video': '뮤직비디오',
      'Documentary': '다큐멘터리',
      'Event': '이벤트 영상',
      'Branding': '브랜딩 영상',
      'Promotional': '홍보 영상',
      'Training': '교육 영상',
      'Product': '제품 영상',
      'Corporate Event': '기업 행사',
      'Marketing': '마케팅 영상',
      'Social Media': '소셜미디어',
      'Webinar': '웨비나',
      'Interview': '인터뷰',
      'Testimonial': '고객 후기',
      'Company Culture': '회사 문화',
      'Product Launch': '제품 런칭',
      'Annual Report': '연간 보고서',
      'Safety Training': '안전 교육',
      'Corporate Communication': '기업 커뮤니케이션'
    }
    return translations[category] || category
  }

  const filtered = portfolioItems.filter((i) => filter === "all" || i.category === filter)
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
            <motion.div 
              className="max-w-7xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
                <AnimatedText
                  as="h2"
                  className="font-semibold uppercase mb-8 font-english"
                  delay={0.2}
                  stagger={0.05}
                >
                    Portfolio
                </AnimatedText>
                <AnimatedText
                  as="h1"
                  className="text-[64px] font-semibold mb-18.5 leading-18 font-english"
                  delay={0.4}
                  stagger={0.05}
                >
                We Create Beautiful,
                <br />
                <span className="text-[#2448FF]">Practical Works</span>
                </AnimatedText>

                <motion.div 
                  className="flex flex-wrap justify-center gap-4 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                <motion.button 
                  onClick={() => setFilter("all")} 
                  className={`${btnClass("all")} font-korean`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                    전체 보기
                </motion.button>
                {categories.map((category) => (
                  <motion.button 
                    key={category}
                    onClick={() => setFilter(category)} 
                    className={`${btnClass(category)} font-korean`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {translateCategoryToKorean(category)}
                  </motion.button>
                ))}
                </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-8 mb-30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
                {displayed.map((item, index) => (
                <motion.div
                    key={item.id}
                    className="group relative h-96 md:h-[560px] overflow-hidden rounded-lg bg-gray-900"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                >
                                    <LazyImage
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
                        <h3 className="text-white font-semibold text-[16px] font-english">{item.title}</h3>
                        <p className="text-gray-300 text-[16px] font-english">{item.subtitle}</p>
                    </div>
                    </div>
                </motion.div>
                ))}
            </motion.div>

            {hasMore && (
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                >
                <motion.button
                    onClick={() => setVisible((v) => v + 5)}
                    className="bg-[#2448FF] text-white px-14 py-3 rounded-full transition cursor-pointer text-[20px] font-semibold font-english"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Load More
                </motion.button>
                </motion.div>
            )}

            <VideoModal isOpen={!!selected} onClose={() => setSelected(null)} video={selected as any} />
        </div>
    </section>
  )
}
