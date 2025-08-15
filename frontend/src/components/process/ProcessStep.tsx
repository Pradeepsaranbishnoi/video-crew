import {useState} from "react";
import LazyImage from "../common/LazyImage";
import { motion } from "framer-motion";
import AnimatedText from "../common/AnimatedText";

interface ProcessStepProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription?: string;
  image: string;
  reverse?: boolean;
  className?: string;
  showSeeMore?: boolean;
}

export default function ProcessStep({
  number,
  title,
  subtitle,
  description,
  fullDescription,
  image,
  reverse = false,
  className = "",
  showSeeMore = false,
}: ProcessStepProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <motion.div
      className={`relative z-10 ${className} ${
      reverse ? "reverse_mt" : "normal_mt"
    }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Large Background Number */}
        <motion.div
            className={`absolute text-[147px] font-bold text-white leading-none select-none opacity-20 z-0 font-english ${
            reverse ? "top-[-135px] right-0 md:right-8" : "top-[-135px] left-0 md:left-8"
            }`}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
        >
            {number}
        </motion.div>
        <div
          className={`grid lg:grid-cols-2 gap-16 items-center ${
            reverse ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* Content Card */}
          <div className={`${reverse ? "lg:col-start-2" : ""}`}>
            <div className="relative border-[1px] border-solid [border-image:linear-gradient(to_bottom,#2E2E2E,#2E2E2E_40%,#ffffff_100%)_1] [border-image-slice:1]">
              {/* Image */}
              <div className="relative h-80 lg:h-106 overflow-hidden bg-gray-900 z-1">
                <LazyImage
                  src={image || "/placeholder.svg"}
                  alt={`${title} - ${subtitle}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40" />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                  <div className="space-y-3">
                    <AnimatedText
                      as="h3"
                      className="text-[20px] font-bold text-white mb-1.75 font-korean"
                      delay={0.5}
                      stagger={0.05}
                    >
                      {title}
                    </AnimatedText>
                    <AnimatedText
                      as="p"
                      className="text-[20px] font-bold text-white font-english"
                      delay={0.6}
                      stagger={0.05}
                    >
                      {subtitle}
                    </AnimatedText>
                    <AnimatedText
                      as="p"
                      className="text-[16px] text-white/60 leading-relaxed font-korean"
                      delay={0.7}
                      stagger={0.03}
                    >
                      {isExpanded && fullDescription ? fullDescription : description}
                      {showSeeMore && (
                      <motion.button
                        onClick={toggleExpanded}
                        className="text-white text-sm transition-colors cursor-pointer ml-2 text-bold font-english"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isExpanded ? "See less" : "See more"}
                      </motion.button>
                    )}
                    </AnimatedText>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Empty space for alternating layout */}
          <div className={`${reverse ? "lg:col-start-1" : ""}`}></div>
        </div>
      </div>

      {/* Connecting Dotted Line */}
      {(number === "02" || number === "04") && (
        <motion.div 
          className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 border-gray-600 hideinmobile"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
            <LazyImage src="/Process/even.png" className="w-full" alt="Process connection line"/>
        </motion.div>
      )}
      {(number === "01" || number === "03" || number === "05") && (
        <motion.div 
          className="absolute bottom-[50px] left-1/2 transform -translate-x-1/2 border-gray-600 hideinmobile"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
            <LazyImage src="/Process/odd.png" className="w-full" alt="Process connection line"/>
        </motion.div>
      )}
    </motion.div>
  );
};
