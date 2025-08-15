import LoginForm from "../components/auth/LoginForm"
import Seo from "../components/common/Seo"

export default function LoginPage() {
  return (
    <div className="text-white">
        <Seo title="Admin Login" description="비디오크루 관리자 로그인 – 안전한 접근을 위한 인증 페이지" />
        <LoginForm />
    </div>
  )
}
