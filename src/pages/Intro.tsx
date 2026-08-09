export function Intro() {
  return (
    <section className="bg-white py-[100px] lg:py-[120px] px-[5%] lg:px-[8%]">
      
      {/* Intro Paragraph */}
      <div className="max-w-[1000px] mx-auto text-center mb-[5rem]">
        <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-black text-forest leading-[1.2] mb-[1.5rem]">
          Savor Nature in Its Purest Form
        </h2>
        <p className="text-[1.1rem] text-text-mid leading-relaxed max-w-[850px] mx-auto">
          At Sun Cured Savories, we believe that nature gets it right the first time. We capture the vibrant richness of farm-fresh fruits, vegetables, and whole spices, gently preserving them using the time-tested power of natural solar drying. No artificial preservatives, no synthetic colors, and no hidden additives—just pure, nutrient-dense wholesome goodness delivered straight from nature to your plate.
        </p>
      </div>

      {/* Why Sun Cured? */}
      <div className="bg-[#fdfaf1] rounded-[24px] p-[3rem] lg:p-[4rem] mb-[5rem] shadow-sm border border-sun/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4rem] items-center">
          <div>
            <h3 className="font-heading text-[2.5rem] font-black text-forest mb-[1.5rem]">Why Sun Cured?</h3>
            <p className="text-[1.05rem] text-text-mid leading-relaxed mb-[2rem]">
              Standard commercial drying methods rely on intense artificial heat and chemical treatments that strip produce of its true essence. We take a cleaner, more traditional approach:
            </p>
            <ul className="flex flex-col gap-[1.5rem]">
              <li className="flex gap-[1rem] items-start">
                <span className="text-[1.5rem]">☀️</span>
                <div>
                  <strong className="text-forest text-[1.1rem] block mb-[0.2rem]">Preserved by the Sun</strong>
                  <p className="text-text-mid text-[0.95rem]">Our gentle curing process seals in essential vitamins, minerals, and natural antioxidants.</p>
                </div>
              </li>
              <li className="flex gap-[1rem] items-start">
                <span className="text-[1.5rem]">☀️</span>
                <div>
                  <strong className="text-forest text-[1.1rem] block mb-[0.2rem]">100% Natural Color & Flavor</strong>
                  <p className="text-text-mid text-[0.95rem]">Real food should look and taste real. Enjoy deep, authentic flavors and rich natural colors without artificial enhancement.</p>
                </div>
              </li>
              <li className="flex gap-[1rem] items-start">
                <span className="text-[1.5rem]">☀️</span>
                <div>
                  <strong className="text-forest text-[1.1rem] block mb-[0.2rem]">Healthy & Convenient</strong>
                  <p className="text-text-mid text-[0.95rem]">Perfect for mindful snacking, effortless home cooking, and adding a boost of nutrition to your daily meal routine.</p>
                </div>
              </li>
              <li className="flex gap-[1rem] items-start">
                <span className="text-[1.5rem]">☀️</span>
                <div>
                  <strong className="text-forest text-[1.1rem] block mb-[0.2rem]">Zero Chemical Additives</strong>
                  <p className="text-text-mid text-[0.95rem]">Unadulterated purity guaranteed in every batch—free from sulfur dioxide, artificial colors, and synthetic flavorings.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative h-full min-h-[400px] rounded-[16px] overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1599818815124-706ce27670cb?q=80&w=800&auto=format&fit=crop" alt="Sun Dried Products" className="w-full h-full object-cover absolute inset-0" />
          </div>
        </div>
      </div>

      {/* What We Offer Table/Grid */}
      <div className="mb-[6rem]">
        <h3 className="font-heading text-[2.5rem] font-black text-center text-forest mb-[3rem]">What We Offer</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem]">
          {/* Category 1 */}
          <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[2rem] shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-[1.3rem] font-extrabold text-sun mb-[0.5rem]">Sun-Dried Fruits</h4>
            <p className="text-[0.9rem] font-bold text-forest mb-[1rem] uppercase tracking-wide">Mangoes, bananas, apples, and seasonal harvests</p>
            <p className="text-text-mid text-[1rem] leading-relaxed">Naturally sweet, chewy, and packed with energy for healthy snacking.</p>
          </div>
          {/* Category 2 */}
          <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[2rem] shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-[1.3rem] font-extrabold text-sun mb-[0.5rem]">Dehydrated Vegetables</h4>
            <p className="text-[0.9rem] font-bold text-forest mb-[1rem] uppercase tracking-wide">Tomatoes, greens, roots, and seasonal produce</p>
            <p className="text-text-mid text-[1rem] leading-relaxed">Concentrated flavor and optimal nutrient retention for instant culinary prep.</p>
          </div>
          {/* Category 3 */}
          <div className="bg-white border border-[#487c2f1f] rounded-[16px] p-[2rem] shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-[1.3rem] font-extrabold text-sun mb-[0.5rem]">Artisanal Spices</h4>
            <p className="text-[0.9rem] font-bold text-forest mb-[1rem] uppercase tracking-wide">Solar-cured whole spices and ground blends</p>
            <p className="text-text-mid text-[1rem] leading-relaxed">Intense aroma, vibrant natural oils, and unbeatable kitchen fresh fragrance.</p>
          </div>
        </div>
      </div>

      {/* Our Promise */}
      <div className="bg-forest text-white rounded-[24px] p-[3rem] lg:p-[4rem] text-center max-w-[1000px] mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-50px] left-[-50px] text-[10rem] opacity-5">☀️</div>
        <div className="relative z-10">
          <p className="font-heading text-[1.8rem] text-sun italic mb-[2rem]">
            “Bringing the warmth of the sun and the purity of the earth back to your kitchen.”
          </p>
          <h3 className="text-[2rem] font-black mb-[1rem]">Our Promise to You</h3>
          <p className="text-[1.05rem] leading-relaxed opacity-90 max-w-[800px] mx-auto mb-[2rem]">
            We are committed to nurturing a healthier society by offering clean, transparent, and nutritious food choices. Every batch at Sun Cured Savories is crafted with care, ensuring that you and your family enjoy the cleanest produce without sacrificing flavor or convenience.
          </p>
          <p className="text-[1.3rem] font-bold text-sun">
            Ready to taste the solar difference?
          </p>
        </div>
      </div>

    </section>
  );
}
