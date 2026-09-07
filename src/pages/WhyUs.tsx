export function WhyUs() {
  return (
    <section className="bg-cream pt-[80px] lg:pt-[120px] pb-[40px] lg:pb-[60px] px-[5%] lg:px-[8%]" id="why-us">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4rem] items-center">
        
        {/* Left Text */}
        <div>
          <span className="inline-block text-sun text-[0.85rem] font-bold tracking-[0.12em] uppercase mb-[0.8rem]">
            Sun, Soil and Sustainability
          </span>
          <h2 className="font-heading text-[clamp(2.2rem,4vw,3.2rem)] font-black text-forest leading-[1.1] mb-[0.5rem]">
            Itadakimasu [いただきます]
          </h2>
          <p className="text-forest font-bold text-[1.2rem] italic mb-[1.5rem]">
            "I humbly receive."
          </p>
          <p className="text-text-mid text-[1.05rem] leading-[1.75] mb-[2rem] p-[1.5rem] bg-[#fdfaf1] rounded-[16px] border-l-[4px] border-forest">
            Itadakimasu is more than words, it is gratitude, respect and a promise to value every bite. 
            <strong> Good for you, Good for nature.</strong>
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1rem] mt-[1.8rem]">
            {/* Pillar 1 */}
            <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[1.2rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,80,22,0.1)] text-center">
              <div className="text-[2.5rem] mb-[0.5rem]">☀️</div>
              <h4 className="text-[0.95rem] font-bold text-forest mb-[0.3rem]">For the Sun</h4>
              <p className="text-[0.8rem] text-text-mid leading-[1.5]">
                Thanking the sun for shining and nourishing crops.
              </p>
            </div>
            
            {/* Pillar 2 */}
            <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[1.2rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,80,22,0.1)] text-center">
              <div className="text-[2.5rem] mb-[0.5rem]">🧑‍🌾</div>
              <h4 className="text-[0.95rem] font-bold text-forest mb-[0.3rem]">For the Farmers</h4>
              <p className="text-[0.8rem] text-text-mid leading-[1.5]">
                Grateful to the farmers for their hard work, dedication and care.
              </p>
            </div>
            
            {/* Pillar 3 */}
            <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[1.2rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,80,22,0.1)] text-center">
              <div className="text-[2.5rem] mb-[0.5rem]">🌱</div>
              <h4 className="text-[0.95rem] font-bold text-forest mb-[0.3rem]">For the Soil</h4>
              <p className="text-[0.8rem] text-text-mid leading-[1.5]">
                Thanking the soil for nurturing life and providing the foundation for our food.
              </p>
            </div>
            
            {/* Pillar 4 */}
            <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[1.2rem] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,80,22,0.1)] text-center">
              <div className="text-[2.5rem] mb-[0.5rem]">🌿</div>
              <h4 className="text-[0.95rem] font-bold text-forest mb-[0.3rem]">For Nature</h4>
              <p className="text-[0.8rem] text-text-mid leading-[1.5]">
                Thanking the earth, water, air and all living things that made this food possible.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="rounded-[24px] overflow-hidden relative shadow-[0_16px_50px_rgba(45,80,22,0.14)] bg-[#fdfaf1] self-stretch flex items-center">
          <img 
            src="/why-us.png" 
            alt="Aam Panna Preparation" 
            className="w-full h-full object-contain block"
          />
          <div className="absolute bottom-[20px] left-[20px] bg-forest text-white px-[18px] py-[10px] rounded-[12px] text-[0.78rem] font-bold shadow-lg z-10">
            Aam Panna Preparation
          </div>
        </div>

      </div>
    </section>
  )
}
