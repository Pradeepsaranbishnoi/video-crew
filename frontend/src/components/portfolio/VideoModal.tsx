import { useEffect, useRef } from "react"
import { X } from "lucide-react"

interface PortfolioItem {
  id: number
  title: string
  subtitle: string
  category: "video" | "other"
  image: string
  videoUrl: string
  description: string
}

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  video: PortfolioItem | null
}

export default function VideoModal({ isOpen, onClose, video }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    if (isOpen) {
      document.addEventListener("keydown", escHandler)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", escHandler)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen && videoRef.current) videoRef.current.pause()
  }, [isOpen])

  if (!isOpen || !video) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={(e) => e.target === modalRef.current && onClose()}
    >
      <div className="relative w-full max-w-3xl mx-4 rounded-lg overflow-hidden bg-black">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 z-10 cursor-pointer"
        >
          <X className="text-white w-5 h-5" />
        </button>

        {/* Video */}
        <video
          ref={videoRef}
          className="w-full aspect-video"
          controls
          autoPlay
          preload="metadata"
          poster={video.image}
        >
          <source src={video.videoUrl} type="video/mp4" />
        </video>

        {/* Info */}
        <div className="p-4 bg-gray-900">
          <h3 className="text-xl font-bold text-white">{video.title}</h3>
          <p className="text-gray-300 text-sm">{video.subtitle}</p>
          <p className="text-gray-400 mt-2">{video.description}</p>
          <span className="inline-block mt-3 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
            {video.category === "video" ? "영상 제작" : "기타 제작"}
          </span>
        </div>
      </div>
    </div>
  )
}
