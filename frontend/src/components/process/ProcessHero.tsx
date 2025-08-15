export default function ProcessHero() {
  return (
    <section className="flex items-center bg-black pt-31.25 relative z-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center border border-white/20">

          {/* Left Content */}
          <div className="ml-0 mr-0 sm:ml-10 sm:mr-10 lg:ml-21.5 lg:mr-10 space-y-4 sm:space-y-5 lg:space-y-6 text-center sm:text-left lg:text-left">
            <h1 className="text-[28px] sm:text-[36px] lg:text-[45px] font-bold leading-tight text-white mb-2.5 font-korean">
              영상제작 프로세스​
            </h1>
            <p className="text-[14px] sm:text-[16px] lg:text-[20px] text-white opacity-60 leading-relaxed font-korean">
              비디오크루만의 영상제작 프로세스를 통해 고객의 니즈에 부합하는 최적의 콘텐츠를 <br className="hidden sm:block" />
              디자인하여 제공합니다.
            </p>
            <p className="text-[10px] sm:text-[11px] lg:text-[12px] opacity-60 mt-6 sm:mt-10 lg:mt-20.5 text-white font-korean">
              *과업의 형태에 따라 프로세스는 변동될 수 있습니다.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative h-52 sm:h-72 md:h-96 lg:h-full overflow-hidden">
              <img
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
