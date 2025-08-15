import { useState, type ChangeEvent, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";

const contentTypes = [
  { value: "", label: "러닝 타임 (분량)" },
  { value: "short", label: "숏폼 (1분 이하)" },
  { value: "medium", label: "미디엄 (1-5분)" },
  { value: "long", label: "롱폼 (5분 이상)" },
];

const budgets = [
  { value: "", label: "희망 예산 (러프하게 선택해주세요.)" },
  { value: "under-500", label: "500만원 미만" },
  { value: "500-1000", label: "500-1000만원" },
  { value: "1000-2000", label: "1000-2000만원" },
  { value: "2000-5000", label: "2000-5000만원" },
  { value: "over-5000", label: "5000만원 이상" },
  { value: "consultation", label: "상담 후 결정" },
];

const purposes = [
  { value: "", label: "제작 목적" },
  { value: "corporate", label: "기업 홍보" },
  { value: "commercial", label: "광고/마케팅" },
  { value: "event", label: "이벤트 기록" },
  { value: "education", label: "교육/강의" },
  { value: "other", label: "기타" },
];

const platforms = [
  { value: "", label: "영상을 어디에 업로드 할 예정인가요?" },
  { value: "youtube", label: "유튜브" },
  { value: "instagram", label: "인스타그램" },
  { value: "facebook", label: "페이스북" },
  { value: "website", label: "웹사이트" },
  { value: "tv", label: "TV/방송" },
  { value: "multiple", label: "다중 플랫폼" },
];

const inputClass =
  "w-full bg-white/10 border border-gray-600 px-4 py-4 text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none text-[14px] sm:text-[15px] lg:text-base font-korean";
const selectClass = `${inputClass} appearance-none cursor-pointer`;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    company: "",
    videoWork: "",
    deliveryDate: "",
    contentType: "",
    budget: "",
    purpose: "",
    uploadPlatform: "",
    referenceVideo: "",
    websiteLinks: "",
    message: "",
    privacyAgreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked! : value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    alert("문의가 성공적으로 전송되었습니다!");

    setFormData({
      name: "",
      email: "",
      contact: "",
      company: "",
      videoWork: "",
      deliveryDate: "",
      contentType: "",
      budget: "",
      purpose: "",
      uploadPlatform: "",
      referenceVideo: "",
      websiteLinks: "",
      message: "",
      privacyAgreed: false,
    });
    setIsSubmitting(false);
  }

  function Dropdown({
    name,
    options,
  }: {
    name: keyof typeof formData;
    options: { value: string; label: string }[];
  }) {
    return (
      <div className="relative">
        <select
          name={name}
          value={formData[name] as string}
          onChange={handleChange}
          className={selectClass}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-gray-900">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
      </div>
    );
  }

  return (
    <section className="pt-16 sm:pt-20 lg:pt-21 pb-16 sm:pb-20 lg:pb-24.5 bg-black px-4 sm:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-[26px] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 sm:mb-14 lg:mb-16 font-english">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="space-y-5 sm:space-y-6">
              {[
                { name: "name", placeholder: "성함 / 직책", type: "text" },
                { name: "email", placeholder: "이메일 주소", type: "email" },
                { name: "contact", placeholder: "연락처", type: "text" },
                { name: "company", placeholder: "회사명 / 채널명", type: "text" },
                { name: "videoWork", placeholder: "영상 제작 편수", type: "text" },
                { name: "deliveryDate", placeholder: "희망 영상 납품 일시", type: "text" },
              ].map((f) => (
                <input
                  key={f.name}
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={formData[f.name as keyof typeof formData] as string}
                  onChange={handleChange}
                  className={inputClass}
                  required={["name", "email", "contact"].includes(f.name)}
                />
              ))}
            </div>

            <div className="space-y-5 sm:space-y-6">
              <Dropdown name="contentType" options={contentTypes} />
              <Dropdown name="budget" options={budgets} />
              <Dropdown name="purpose" options={purposes} />
              <Dropdown name="uploadPlatform" options={platforms} />

              <input
                type="text"
                name="referenceVideo"
                placeholder="참고 영상 전달 (유튜브 링크, 전 작업물 등)"
                value={formData.referenceVideo}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="text"
                name="websiteLinks"
                placeholder="현재 보유한 홈페이지, SNS, 랜딩페이지 링크를 가능한 모두 적어주세요."
                value={formData.websiteLinks}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="bg-white/10 border border-gray-700 p-4 sm:p-5 lg:p-6 text-xs sm:text-sm text-gray-300 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
            <h3 className="text-white font-semibold mb-2 sm:mb-3">
              개인정보 수집 및 이용 동의
            </h3>
            <p className="mb-2 sm:mb-3 leading-relaxed">
              비디오크루(이하 “회사”)는 영상 제작 문의에 대한 원활한 응대 및 견적 제공을 위해 다음과 같은
              개인정보를 수집·이용하고자 합니다.
            </p>
            <h4 className="text-white font-medium mb-1 sm:mb-2">1. 수집 항목</h4>
            <ul className="space-y-1 pl-4 list-disc">
              <li>
                <span className="text-white/90 font-medium">필수 항목:</span> 성함, 직책, 이메일 주소, 연락처, 회사명 또는 채널명, 예산, 희망 영상 편수 및 러닝타임, 납품일시, 제작 목적
              </li>
              <li>
                <span className="text-white/90 font-medium">선택 항목:</span> 참고 자료 링크, 홈페이지 및 SNS 주소 등
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 gap-2 sm:gap-0">
            <input
              type="checkbox"
              name="privacyAgreed"
              checked={formData.privacyAgreed}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-600 rounded focus:ring-2"
              required
            />
            <label className="text-xs sm:text-sm text-gray-300 leading-snug font-korean">
              개인정보 수집 및 이용에 동의합니다.
            </label>
          </div>

          <div className="text-center pt-10 sm:pt-12 lg:pt-13">
            <button
              type="submit"
              disabled={isSubmitting || !formData.privacyAgreed}
              className="bg-[#2448FF] hover:bg-blue-700 disabled:bg-gray-600 px-8 sm:px-12 lg:px-22.5 py-2.5 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 hover:scale-105 disabled:cursor-no-drop disabled:hover:scale-100 cursor-pointer font-korean"
            >
              {isSubmitting ? "전송 중..." : "제출하기"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
