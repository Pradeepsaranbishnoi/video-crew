import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"


interface FormData {
  email: string
  password: string
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // API 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 간단 검증
      if (formData.email === "admin@videocrew.com" && formData.password === "Test@123") {
        localStorage.setItem("auth_token", "mock_admin_token")
        localStorage.setItem("user_role", "admin")
        navigate("/admin/dashboard") // 대시보드로 이동
      } else {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.")
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-35 flex items-center">
      <div className="max-w-md mx-auto px-6 w-full">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-1 mb-4">
              <img src="/logo.svg" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 font-korean">관리자 로그인</h1>
            <p className="text-gray-400 font-korean">관리자 계정으로 로그인하세요</p>
          </div>

          {/* 에러 메세지 */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-red-300 text-sm font-korean">{error}</p>
            </div>
          )}

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-korean">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="admin@videocrew.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 font-korean">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-white font-medium rounded-lg transition-colors cursor-pointer font-korean"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          {/* 데모 계정 */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
            <p className="text-blue-300 text-sm font-medium mb-2 font-korean">데모 계정:</p>
            <p className="text-blue-200 text-xs font-english">이메일: admin@videocrew.com</p>
            <p className="text-blue-200 text-xs font-english">비밀번호: Test@123</p>
          </div>
        </div>
      </div>
    </section>
  )
}
