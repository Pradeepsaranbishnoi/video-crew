import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-[#8D8D8D] pt-10 pb-8 px-4 sm:px-6 lg:px-10 lg:pl-21">
      <div className="max-w-7xl mx-auto text-sm">
        {/* Logo */}
        <Link to="/" className="block mb-6 sm:mb-8">
          <LazyImage
            src="./logo.svg"
            alt="logo"
            width={167}
            className="max-w-[140px] sm:max-w-[167px] w-full"
          />
        </Link>

        {/* Description */}
        <p className="mb-2 text-[14px] sm:text-[15px] leading-relaxed font-korean">
          <strong>비디오크루(Video Crew)</strong>는 (주)러닝크루 컨설팅그룹의 영상 전문 브랜드입니다.{" "}
          <Link
            className="underline hover:text-white transition font-korean"
            to="https://www.learning-crew.com/"
            target="_blank"
          >
            러닝크루 컨설팅그룹 공식 홈페이지 바로가기
          </Link>
        </p>

        {/* Address */}
        <p className="mb-4 text-[14px] sm:text-[15px] leading-relaxed font-korean">
          주소. 서울 성동구 연무장5가길 7 (성수동2가, 성수역 현대테라스타워) 1001호-1003호 |
          이메일 |{" "}
          <a
            href="mailto:info@learning-crew.com"
            className="underline hover:text-white transition font-korean"
          >
            info@learning-crew.com
          </a>
        </p>

        {/* Copyright */}
        <p className="text-[13px] sm:text-[15px] font-korean">
          © {year}. Video Crew all rights reserved.
        </p>
      </div>
    </footer>
  );
}
