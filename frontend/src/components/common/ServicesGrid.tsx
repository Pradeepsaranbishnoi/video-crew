// ServicesGrid.tsx
type Service = {
  title: string;
  description: string;
  image?: string;
};

type ServicesGridProps = {
  services: Service[];
};

import LazyImage from "./LazyImage";
import { motion } from "framer-motion";

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-20">
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ y: -10 }}
          >
            <div className="relative h-96 mb-8 overflow-hidden border-[1px] border-solid [border-image:linear-gradient(to_bottom,#2E2E2E,#2E2E2E_40%,#ffffff_100%)_1] [border-image-slice:1]">
              <LazyImage
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-[20px] font-bold mb-4 text-white font-english">
                  {service.title}
                </h3>
                <p className="text-[16px] opacity-60 text-white font-korean">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
