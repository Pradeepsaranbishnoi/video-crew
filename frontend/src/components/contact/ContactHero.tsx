import LazyImage from "../common/LazyImage";
import { motion } from "framer-motion";
import AnimatedText from "../common/AnimatedText";

export default function ContactHero() {
  return (
    <section className="bg-black">
      <div className="max-w-7xl mx-auto pr-6 border border-white/20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left - Image */}
          <div className="relative order-1 md:order-none">
            <div className="relative h-64 md:h-80 lg:h-[570px] overflow-hidden">
              <LazyImage
                src="/contact/main.jpg"
                alt="Professional hands typing on laptop keyboard in black and white"
                className="grayscale object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Right - Content */}
          <motion.div 
            className="space-y-8 px-4 md:px-6 lg:px-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 lg:mb-13">
              <AnimatedText
                as="h1"
                className="text-[28px] md:text-[36px] lg:text-[45px] font-bold text-white mb-3 font-korean"
                delay={0.2}
                stagger={0.05}
              >
                문의하기
              </AnimatedText>
              <AnimatedText
                as="p"
                className="text-[14px] md:text-[15px] lg:text-[16px] text-white opacity-60 leading-relaxed font-korean"
                delay={0.4}
                stagger={0.03}
              >
                비디오크루 전문팀이 고객님 요청에 맞는 최적의 솔루션을 제안해 드립니다.
                <br />최 상담부터 제작까지 고객 맞춤형 영상을 제공해 드리며 언제든지 문의
                <br />
                주시면 성심 성의껏 답변해 드리겠습니다.
              </AnimatedText>
            </div>

            {/* Contact Information */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatedText
                as="h2"
                className="text-[28px] md:text-[36px] lg:text-[45px] font-bold text-white font-korean"
                delay={0.5}
                stagger={0.05}
              >
                정보
              </AnimatedText>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-400 mb-3 md:mb-6 font-english">
                    ADDRESS
                  </h3>
                  <p className="text-gray-300 text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed mb-4.5 font-korean">
                    서울특별시 강남구 테헤란로 518 섬유센터빌딩 7층, 서울특별시 강남구 테헤란로
                    <br />
                    <span className="font-english">Daerim-dong 7-ga, Yeongdeungpo-gu Seoul</span>
                    <br />
                    <span className="font-english">Taeik Tower 6 WJHT-1003</span>
                  </p>
                </div>

                <div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-400 mb-3 md:mb-6 font-english">
                    CALL US
                  </h3>
                  <p className="text-gray-300 text-[15px] md:text-lg font-medium font-english">
                    010-38-9947
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
