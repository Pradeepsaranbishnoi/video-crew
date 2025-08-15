export default function ClientsSection({
  clients = [],
  showHeading = false,
  showTopMargin = false,
  showHr = true,
  headingText = `이미 수많은 기업이 <br/> 비디오크루와 함께 하고 있습니다.`,
}) {
  const clientsList = clients.length
    ? clients
    : [
        { name: "STARBUCKS", img: "/home-assets/starbucks.png" },
        { name: "KIA", img: "/home-assets/kia.png" },
        { name: "Multicampus", img: "/home-assets/multicampus.png" },
        { name: "HYUNDAI", img: "/home-assets/hyundai.png" },
        { name: "SAMSUNG", img: "/home-assets/samsung.png" },
        { name: "STARBUCKS2", img: "/home-assets/starbucks.png" },
        { name: "KIA2", img: "/home-assets/kia.png" },
      ];

  return (
    <section
      className={`${
        showTopMargin ? "mt-[-50px] sm:mt-[-100px]" : ""
      } bg-black overflow-hidden mb-16 sm:mb-24`}
    >
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6">
        {/* Heading */}
        {showHeading && (
          <div className="mb-12 sm:mb-28">
            <h2
              className="text-[24px] sm:text-[32px] md:text-[45px] font-bold mb-4 leading-snug sm:leading-tight text-white font-korean"
              dangerouslySetInnerHTML={{ __html: headingText }}
            />
          </div>
        )}
      </div>

      {showHr && <hr className="border-t border-b border-white/10" />}

      {/* Logos */}
      <div className="flex animate-scroll-left gap-8 sm:gap-12 md:gap-16 py-4 sm:py-5">
        {[...clientsList, ...clientsList].map((client, index) => (
          <div
            key={index}
            className="flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <img
              src={client.img}
              alt={client.name}
              className="w-auto h-[16px] sm:h-[18px] md:h-[22px] object-contain"
            />
          </div>
        ))}
      </div>

      {showHr && <hr className="border-t border-b border-white/10" />}
    </section>
  );
}
