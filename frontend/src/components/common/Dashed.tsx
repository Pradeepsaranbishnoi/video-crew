type DashedProps = {
  src: string;
  alt?: string;
  className?: string;
};

export default function Dashed({ src, alt, className }: DashedProps) {
  return (
    <>
      <img src={src} alt={alt || "Dashed image"} className={className} />
    </>
  );
}
