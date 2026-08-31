export function Sustainability() {
  const sdgs = [
    { num: '2', title: 'Zero Hunger & Sustainable Agriculture', desc: 'Combating post-harvest losses by upgrading seasonal overflows into nutrient-dense provisions.' },
    { num: '5', title: 'Gender Equality', desc: 'Uplifting women through equity, female-led management, and leadership.' },
    { num: '7', title: 'Affordable and Clean Energy', desc: 'Relying on clean solar thermal drying technologies, avoiding carbon-heavy fuels.' },
    { num: '12', title: 'Responsible Consumption & Production', desc: 'Zero-waste production and structural agricultural rescue.' },
    { num: '13', title: 'Climate Action', desc: 'Displacing carbon footprints with direct thermal solar power.' },
  ];

  return (
    <section className="bg-[#f0ece1] py-[100px] lg:py-[120px] px-[5%] lg:px-[8%]" id="sustainability">
      
      <div className="max-w-[1200px] mx-auto text-center mb-[4rem]">
        <span className="inline-block text-[#7b9c66] text-[0.85rem] font-bold tracking-[0.15em] uppercase mb-[0.8rem]">
          Rescuing the Harvest
        </span>
        <h2 className="font-heading text-[clamp(2.2rem,4vw,3.5rem)] font-black text-forest leading-[1.2] mb-[1.5rem]">
          Refined by the Sun, Built for the Planet.
        </h2>
        <p className="text-[1.1rem] text-text-mid leading-relaxed max-w-[900px] mx-auto">
          Instead of using fossil-fuel-driven industrial dryers or chemical preservatives, we built our production around advanced solar dehydration. By harnessing direct, clean solar energy, we gently draw out moisture while sealing in essential vitamins, minerals, and rich, authentic flavors. Every single pack you buy makes you an active participant in global climate action.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4rem] mb-[6rem] items-start">
        {/* Female Leadership */}
        <div className="bg-white p-[3rem] rounded-[24px] shadow-lg border-l-[8px] border-[#7b9c66]">
          <h3 className="font-heading text-[2rem] font-extrabold text-forest mb-[1rem]">Driven by Female Leadership</h3>
          <p className="text-[1rem] text-text-mid leading-relaxed mb-[1.5rem]">
            The true heartbeat of Sun Cured Savories resides in our kitchen. We are a proud enterprise envisioned, led, and managed by women entrepreneurs, with a workforce made up almost entirely of local women.
          </p>
          <p className="text-[1rem] text-text-mid leading-relaxed">
            Many of our team members are the primary breadwinners for their families. By creating a flexible, nurturing, and dignified workspace, we turn traditional culinary heritage into a powerful tool for financial independence.
          </p>
        </div>

        {/* Vision, Mission & Goals */}
        <div className="flex flex-col gap-[2rem]">
          {/* Vision */}
          <div className="bg-forest text-white p-[2.5rem] rounded-[24px] shadow-lg">
            <h3 className="font-heading text-[1.8rem] font-extrabold text-sun mb-[0.8rem]">Our Vision</h3>
            <p className="text-[1.05rem] leading-relaxed opacity-90">
              To pioneer a climate-resilient food system that transforms seasonal harvests into pure, nutrient-dense nutrition for a healthier India(Swasth Bharat).
            </p>
          </div>
          
          {/* Mission */}
          <div className="bg-[#487c2f] text-white p-[2.5rem] rounded-[24px] shadow-lg">
            <h3 className="font-heading text-[1.8rem] font-extrabold text-sun mb-[0.8rem]">Our Mission</h3>
            <p className="text-[1.05rem] leading-relaxed opacity-90">
              Sun-Cure Savories combats post-harvest loss by using zero-emission solar thermal drying to upgrade surplus crops into premium, zero-waste provisions.
            </p>
          </div>

          {/* Goals */}
          <div className="bg-[#3a6326] text-white p-[2.5rem] rounded-[24px] shadow-lg">
            <h3 className="font-heading text-[1.8rem] font-extrabold text-sun mb-[1.2rem]">Our Goals</h3>
            <ul className="flex flex-col gap-[1rem] text-[0.95rem] leading-relaxed opacity-90">
              <li><strong>Empower Regional Farmers:</strong> Partner directly with local growers to capture seasonal crop overflows, turning potential waste into high-value income.</li>
              <li><strong>Advance Clean Processing:</strong> Power 100% of drying operations with direct solar thermal energy, bypassing carbon-heavy fuels.</li>
              <li><strong>Nurture a Healthy Nation:</strong> Deliver affordable, nutrient-rich, clean-label foods that support everyday wellness across India.</li>
              <li><strong>Champion Inclusive Leadership:</strong> Maintain an operational and leadership team that promotes equitable employment.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SDGs */}
      <div className="max-w-[1200px] mx-auto">
        <h3 className="font-heading text-[2.5rem] font-black text-forest text-center mb-[3rem]">
          Aligned with UN Sustainable Development Goals
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2rem] justify-center">
          {sdgs.map((sdg, idx) => (
            <div key={idx} className="bg-white p-[2rem] rounded-[24px] shadow-md border border-[#487c2f1f] text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-[60px] h-[60px] bg-sun text-forest font-black text-[1.5rem] flex items-center justify-center rounded-full mx-auto mb-[1.5rem]">
                {sdg.num}
              </div>
              <h4 className="text-[1.2rem] font-bold text-forest mb-[0.8rem]">{sdg.title}</h4>
              <p className="text-[0.95rem] text-text-mid leading-relaxed">{sdg.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
