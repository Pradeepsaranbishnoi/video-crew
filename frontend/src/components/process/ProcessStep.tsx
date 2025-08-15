import {useState} from "react";

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
    <div className={`relative ${className}`}>
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Large Background Number */}
        <div
            className={`absolute text-[147px] font-bold text-white leading-none select-none opacity-20 z-0 font-english ${
            reverse ? "top-[-135px] right-0 md:right-8" : "top-[-135px] left-0 md:left-8"
            }`}
        >
            {number}
        </div>
        <div
          className={`grid lg:grid-cols-2 gap-16 items-center ${
            reverse ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* Content Card */}
          <div className={`${reverse ? "lg:col-start-2" : ""}`}>
            <div className="relative border-[1px] border-solid [border-image:linear-gradient(to_bottom,#2E2E2E,#2E2E2E_40%,#ffffff_100%)_1] [border-image-slice:1]">
              {/* Image */}
              <div className="relative h-64 lg:h-106 overflow-hidden bg-gray-900 z-1">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${title} - ${subtitle}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40" />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                  <div className="space-y-3">
                    <h3 className="text-[20px] font-bold text-white mb-1.75 font-korean">{title}</h3>
                    <p className="text-[20px] font-bold text-white font-english">{subtitle}</p>
                    <p className="text-[16px] text-white/60 leading-relaxed font-korean">
                      {isExpanded && fullDescription ? fullDescription : description}
                      {showSeeMore && (
                      <button
                        onClick={toggleExpanded}
                        className="text-white text-sm transition-colors cursor-pointer ml-2 text-bold font-english"
                      >
                        {isExpanded ? "See less" : "See more"}
                      </button>
                    )}
                    </p>
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
        <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 border-gray-600">
            <img src="/Process/even.png" className="w-full"/>
        </div>
      )}
      {(number === "01" || number === "03" || number === "05") && (
        <div className="absolute bottom-[50px] left-1/2 transform -translate-x-1/2 border-gray-600">
            <img src="/Process/odd.png" className="w-full"/>
        </div>
      )}
    </div>
  );
};
