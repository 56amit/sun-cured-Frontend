export function AboutUs() {
  return (
    <section className="bg-cream py-[80px] lg:py-[120px] px-[5%] lg:px-[8%]" id="about-us">
      
      {/* Top Header Section */}
      <div className="max-w-[1000px] mx-auto text-center mb-[4rem]">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4rem] items-start mb-[5rem]">
        
        {/* Driven by Purpose */}
        <div className="bg-white p-[2.5rem] rounded-[24px] shadow-sm border border-[#487c2f1f]">
          <h3 className="font-heading text-[2rem] font-black text-forest mb-[1.2rem]">
            Driven by Purpose,<br/>Rooted in the Land
          </h3>
          <div className="text-[1.05rem] text-text-mid leading-[1.8] flex flex-col gap-[1rem]">
            <p>
              Across India’s vibrant agricultural heartlands, local farms yield an abundance of fresh, nutrient-rich produce every season. Yet, much of this vibrant harvest struggles to reach urban kitchens before losing its peak freshness, value, or nutritional density.
            </p>
            <p>
              At the same time, fast-paced modern lifestyles make finding wholesome, minimally processed food harder than ever.
            </p>
            <p className="font-bold text-forest">
              We saw an opportunity to bridge this gap—connecting the bounty of rural farms directly to urban homes.
            </p>
          </div>
        </div>

        {/* Honor Tradition */}
        <div className="bg-[#fdfaf1] p-[2.5rem] rounded-[24px] shadow-sm border border-sun/20">
          <h3 className="font-heading text-[2rem] font-black text-forest mb-[1.2rem]">
            Honor Tradition,<br/>Powered by Science
          </h3>
          <div className="text-[1.05rem] text-text-mid leading-[1.8] flex flex-col gap-[1rem]">
            <p>
              To solve a modern food challenge, we looked to a timeless solution: the power of the sun. For generations, Indian households have relied on traditional sun-drying to preserve seasonal harvests. We took this rich heritage and elevated it through modern solar-thermal engineering.
            </p>
            <p>
              By utilizing precision climate-controlled hybrid solar drying, we gently preserve fresh fruits, vegetables, and savories at their peak maturity. 
            </p>
            <p className="font-bold text-[#c88d22]">
              This clean, gentle technology locks in maximum vitamins, natural flavors, and vibrant color—without relying on heavy chemical preservatives, artificial additives, or excessive industrial energy.
            </p>
          </div>
        </div>

      </div>

      {/* What Drives Us */}
      <div className="mb-[5rem]">
        <h3 className="font-heading text-[2.5rem] font-black text-center text-forest mb-[3rem]">What Drives Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem]">
          <div className="bg-white border-t-[6px] border-sun rounded-[16px] p-[2rem] shadow-md hover:-translate-y-2 transition-transform duration-300">
            <div className="text-[2.5rem] mb-[1rem]">🧑‍🌾</div>
            <h4 className="text-[1.3rem] font-extrabold text-forest mb-[0.8rem]">Farmers at the Heart</h4>
            <p className="text-[1rem] text-text-mid leading-relaxed">
              We work alongside local growers, helping reduce post-harvest losses and creating sustainable value right at the farm gate.
            </p>
          </div>
          
          <div className="bg-white border-t-[6px] border-[#7b9c66] rounded-[16px] p-[2rem] shadow-md hover:-translate-y-2 transition-transform duration-300">
            <div className="text-[2.5rem] mb-[1rem]">🥗</div>
            <h4 className="text-[1.3rem] font-extrabold text-forest mb-[0.8rem]">Pure & Uncompromised</h4>
            <p className="text-[1rem] text-text-mid leading-relaxed">
              Every bite is crafted to offer clean, dense nourishment that fits seamlessly into daily life.
            </p>
          </div>
          
          <div className="bg-white border-t-[6px] border-forest rounded-[16px] p-[2rem] shadow-md hover:-translate-y-2 transition-transform duration-300">
            <div className="text-[2.5rem] mb-[1rem]">♻️</div>
            <h4 className="text-[1.3rem] font-extrabold text-forest mb-[0.8rem]">Sustainability in Action</h4>
            <p className="text-[1rem] text-text-mid leading-relaxed">
              By harnessing clean solar energy, we reduce carbon footprints while delivering long-lasting, shelf-stable foods.
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
