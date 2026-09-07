export function AboutUs() {
  return (
    <section className="bg-cream pt-[40px] lg:pt-[60px] pb-[40px] lg:pb-[60px] px-[5%] lg:px-[8%]" id="about-us">
      
      {/* Top Header Section */}
      <div className="max-w-[1000px] mx-auto text-center mb-[2.5rem]">
        <span className="inline-block text-sun text-[0.85rem] font-bold tracking-[0.15em] uppercase mb-[0.8rem]">
          Our Story
        </span>
        <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-black text-forest leading-[1.1] mb-[1.5rem]">
          Sun Cured Savories
        </h2>
        <p className="text-[1.2rem] text-text-mid leading-relaxed italic max-w-[800px] mx-auto">
          "We started Sun Cured Savories with a simple, unshakeable conviction: Nutritious, high-quality food is an essential human right, not a luxury."
        </p>
      </div>

      {/* Goals */}
      <div className="mb-[5rem]">
        <h3 className="font-heading text-[2.5rem] font-black text-center text-forest mb-[3rem]">Our Goals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[1.5rem]">
          {/* Goal 1 */}
          <div className="bg-white border-t-[6px] border-[#c88d22] rounded-[16px] p-[2rem] shadow-md hover:-translate-y-2 transition-transform duration-300">
            <div className="text-[2.5rem] mb-[1rem]">🧑‍🌾</div>
            <h4 className="text-[1.2rem] font-extrabold text-forest mb-[0.8rem]">Empower Regional Farmers</h4>
            <p className="text-[0.95rem] text-text-mid leading-relaxed">
              Partner directly with local growers to capture seasonal crop overflows, turning potential waste into high-value income opportunities.
            </p>
          </div>
          
          {/* Goal 2 */}
          <div className="bg-white border-t-[6px] border-[#e69b24] rounded-[16px] p-[2rem] shadow-md hover:-translate-y-2 transition-transform duration-300">
            <div className="text-[2.5rem] mb-[1rem]">☀️</div>
            <h4 className="text-[1.2rem] font-extrabold text-forest mb-[0.8rem]">Advance Clean Processing</h4>
            <p className="text-[0.95rem] text-text-mid leading-relaxed">
              Power 100% of drying operations with direct solar thermal energy, bypassing carbon-heavy fuels and chemical additives.
            </p>
          </div>
          
          {/* Goal 3 */}
          <div className="bg-white border-t-[6px] border-[#7b9c66] rounded-[16px] p-[2rem] shadow-md hover:-translate-y-2 transition-transform duration-300">
            <div className="text-[2.5rem] mb-[1rem]">🥗</div>
            <h4 className="text-[1.2rem] font-extrabold text-forest mb-[0.8rem]">Nurture a Healthy Nation</h4>
            <p className="text-[0.95rem] text-text-mid leading-relaxed">
              Deliver affordable, nutrient-rich, clean-label foods that support everyday wellness across India.
            </p>
          </div>

          {/* Goal 4 */}
          <div className="bg-white border-t-[6px] border-forest rounded-[16px] p-[2rem] shadow-md hover:-translate-y-2 transition-transform duration-300">
            <div className="text-[2.5rem] mb-[1rem]">🤝</div>
            <h4 className="text-[1.2rem] font-extrabold text-forest mb-[0.8rem]">Champion Inclusive Leadership</h4>
            <p className="text-[0.95rem] text-text-mid leading-relaxed">
              Maintain an operational and leadership team that promotes equitable employment and local economic growth.
            </p>
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="bg-forest text-white rounded-[24px] p-[3rem] text-center max-w-[1000px] mx-auto shadow-xl">
        <h3 className="font-heading text-[2rem] font-black text-sun mb-[1rem]">Nourishment for Every Table</h3>
        <p className="text-[1.1rem] leading-relaxed opacity-90 mb-[2rem]">
          Whether it’s a quick wholesome bite on a busy workday or a reliable cooking ingredient in your home pantry, Sun Cured Savories brings you the pure goodness of India’s fields—preserved by the sun, backed by science, and made for everyone.
        </p>
        <p className="text-[1.3rem] font-bold tracking-wide">
          Pure ingredients. Smart technology. Honest nutrition.
        </p>
      </div>

    </section>
  );
}
