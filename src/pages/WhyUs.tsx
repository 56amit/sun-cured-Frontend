export function WhyUs() {
  return (
    <section className="bg-cream py-[80px] lg:py-[120px] px-[5%] lg:px-[8%]" id="why-us">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4rem] items-center">
        
        {/* Left Text */}
        <div>
          <span className="inline-block text-sun text-[0.85rem] font-bold tracking-[0.12em] uppercase mb-[0.8rem]">
            Our Core Belief
          </span>
          <h2 className="font-heading text-[clamp(2.2rem,4vw,3.2rem)] font-black text-forest leading-[1.1] mb-[1.5rem]">
            Nutrition as a Basic Right.
          </h2>
          <p className="text-text-mid text-[1.05rem] leading-[1.75] mb-[1rem]">
            At Sun Cured Savories, we believe that nutritious food is a basic human right, not a luxury. We bridge the gap between rural abundance and urban nutrition.
          </p>
          <p className="text-text-mid text-[1.05rem] leading-[1.75] mb-[2rem]">
            By combining advanced solar-thermal engineering with India's rich agricultural heritage, we create affordable, nutrient-dense, and highly accessible food solutions.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1rem] mt-[1.8rem]">
            {/* Pillar 1 */}
            <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[1.2rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,80,22,0.1)]">
              <div className="text-[1.7rem] mb-[0.5rem]">☀️</div>
              <h4 className="text-[0.88rem] font-bold text-forest mb-[0.3rem]">Solar Engineered</h4>
              <p className="text-[0.78rem] text-text-mid leading-[1.5]">
                Retaining 100% natural vitamins and minerals to bring pure health back to your plate.
              </p>
            </div>
            
            {/* Pillar 2 */}
            <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[1.2rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,80,22,0.1)]">
              <div className="text-[1.7rem] mb-[0.5rem]">🌿</div>
              <h4 className="text-[0.88rem] font-bold text-forest mb-[0.3rem]">Itadakimasu</h4>
              <p className="text-[0.78rem] text-text-mid leading-[1.5]">
                "I humbly receive" — a deep reverence for nature's life-giving gifts.
              </p>
            </div>
            
            {/* Pillar 3 */}
            <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[1.2rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,80,22,0.1)]">
              <div className="text-[1.7rem] mb-[0.5rem]">🧑‍🌾</div>
              <h4 className="text-[0.88rem] font-bold text-forest mb-[0.3rem]">Respecting the Harvest</h4>
              <p className="text-[0.78rem] text-text-mid leading-[1.5]">
                Honoring the life of every seed planted and the sweat of our farmers.
              </p>
            </div>
            
            {/* Pillar 4 */}
            <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[1.2rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,80,22,0.1)]">
              <div className="text-[1.7rem] mb-[0.5rem]">💚</div>
              <h4 className="text-[0.88rem] font-bold text-forest mb-[0.3rem]">Pure Nutrition</h4>
              <p className="text-[0.78rem] text-text-mid leading-[1.5]">
                Preserving natural energy without altering its purity or harming our planet.
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
