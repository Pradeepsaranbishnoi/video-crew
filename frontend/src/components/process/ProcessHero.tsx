import LazyImage from "../common/LazyImage";
import { motion } from "framer-motion";
import AnimatedText from "../common/AnimatedText";

export default function ProcessHero() {
  return (
    <section className="flex items-center bg-black pt-31.25 relative z-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center border border-white/20">

          {/* Left Content */}
          <motion.div 
            className="ml-0 mr-0 sm:ml-10 sm:mr-10 lg:ml-21.5 lg:mr-10 space-y-4 sm:space-y-5 lg:space-y-6 text-center sm:text-left lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedText
              as="h1"
              className="text-[28px] sm:text-[36px] lg:text-[45px] font-bold leading-tight text-white mb-2.5 font-korean"
              delay={0.2}
              stagger={0.05}
            >
              영상제작 프로세스​
            </AnimatedText>
            <AnimatedText
              as="p"
              className="text-[14px] sm:text-[16px] lg:text-[20px] text-white opacity-60 leading-relaxed font-korean"
              delay={0.4}
              stagger={0.03}
            >
              비디오크루만의 영상제작 프로세스를 통해 고객의 니즈에 부합하는 최적의 콘텐츠를 <br className="hidden sm:block" />
              디자인하여 제공합니다.
            </AnimatedText>
            <AnimatedText
              as="p"
              className="text-[10px] sm:text-[11px] lg:text-[12px] opacity-60 mt-6 sm:mt-10 lg:mt-20.5 text-white font-korean"
              delay={0.6}
              stagger={0.02}
            >
              *과업의 형태에 따라 프로세스는 변동될 수 있습니다.
            </AnimatedText>
          </motion.div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative h-52 sm:h-72 md:h-96 lg:h-full overflow-hidden">
              <LazyImage
                src="/Process/Group-90.webp"
                alt="Professional video production equipment with colorful lighting"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
