export function WhyUs() {
  return (
    <section className="bg-cream py-[80px] lg:py-[120px] px-[5%] lg:px-[8%]" id="why-us">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4rem] items-center">
        
        {/* Left Text */}
        <div>
          <span className="inline-block text-sun text-[0.85rem] font-bold tracking-[0.12em] uppercase mb-[0.8rem]">
            Why Sun-Cured Savories
          </span>
          <h2 className="font-heading text-[clamp(2.2rem,4vw,3.8rem)] font-black text-forest leading-[1.1] mb-[1.5rem]">
            Ancient Wisdom.<br/>Modern Snacking.
          </h2>
          <p className="text-text-mid text-[1.05rem] leading-[1.75] mb-[2rem]">
            We revive traditional solar-drying methods rooted in Ayurveda to bring you snacks that are as nutritious as they are delicious — zero compromise on purity.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1rem] mt-[1.8rem]">
            {/* Pillar 1 */}
            <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[1.2rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,80,22,0.1)]">
              <div className="text-[1.7rem] mb-[0.5rem]">☀️</div>
              <h4 className="text-[0.88rem] font-bold text-forest mb-[0.3rem]">Solar Dried</h4>
              <p className="text-[0.78rem] text-text-mid leading-[1.5]">
                Zero emissions, low-heat preservation that locks in vitamins & flavour.
              </p>
            </div>
            
            {/* Pillar 2 */}
            <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[1.2rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,80,22,0.1)]">
              <div className="text-[1.7rem] mb-[0.5rem]">🌿</div>
              <h4 className="text-[0.88rem] font-bold text-forest mb-[0.3rem]">No Preservatives</h4>
              <p className="text-[0.78rem] text-text-mid leading-[1.5]">
                No added sugar, colour, or chemicals — completely natural.
              </p>
            </div>
            
            {/* Pillar 3 */}
            <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[1.2rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,80,22,0.1)]">
              <div className="text-[1.7rem] mb-[0.5rem]">🧑‍🌾</div>
              <h4 className="text-[0.88rem] font-bold text-forest mb-[0.3rem]">Farmer First</h4>
              <p className="text-[0.78rem] text-text-mid leading-[1.5]">
                Supporting local farmers with fair wages & reducing post-harvest waste.
              </p>
            </div>
            
            {/* Pillar 4 */}
            <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[1.2rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,80,22,0.1)]">
              <div className="text-[1.7rem] mb-[0.5rem]">💚</div>
              <h4 className="text-[0.88rem] font-bold text-forest mb-[0.3rem]">Eco Friendly</h4>
              <p className="text-[0.78rem] text-text-mid leading-[1.5]">
                Solar-powered process with the lowest possible carbon footprint.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="rounded-[24px] overflow-hidden relative shadow-[0_16px_50px_rgba(45,80,22,0.14)] bg-[#fdfaf1]">
          <img 
            src="/why-us.png" 
            alt="Aam Panna Preparation" 
            className="w-full h-auto block"
          />
          <div className="absolute bottom-[20px] left-[20px] bg-forest text-white px-[18px] py-[10px] rounded-[12px] text-[0.78rem] font-bold shadow-lg z-10">
            Aam Panna Preparation
          </div>
        </div>

      </div>
    </section>
  )
}
