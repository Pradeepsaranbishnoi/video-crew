import ContactHero from "../components/contact/ContactHero.tsx"
import ContactForm from "../components/contact/ContactForm.tsx"
import Seo from "../components/common/Seo"

export default function ContactPage() {
  return (
    <div className="pt-31 text-white">
        <Seo title="Contact" description="비디오크루 문의 – 맞춤형 영상 제작 상담 및 견적 문의" />
        <ContactHero />
        <ContactForm />
    </div>
  )
}
