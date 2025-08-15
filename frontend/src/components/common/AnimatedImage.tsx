import { motion } from 'framer-motion';
import LazyImage from './LazyImage';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  duration?: number;
  scale?: boolean;
  width?: number;
  height?: number;
}

export default function AnimatedImage({ 
  src, 
  alt, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  scale = false,
  width,
  height
}: AnimatedImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: scale ? 0.8 : 1, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={scale ? { scale: 1.05 } : {}}
      className={className}
    >
      <LazyImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full"
      />
    </motion.div>
  );
}
