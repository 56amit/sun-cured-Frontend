import React from 'react';

const BENEFITS = [
  {
    id: 1,
    icon: '💊',
    title: 'Rich in Vitamins',
    description: 'Vitamins C, B-complex & essential minerals retained — not destroyed by heat processing.'
  },
  {
    id: 2,
    icon: '🫀',
    title: 'Pure Energy',
    description: 'No artificial additives or refined sugars. Just clean, natural energy from whole foods.'
  },
  {
    id: 3,
    icon: '🌍',
    title: 'Eco-Friendly',
    description: 'Solar-powered, zero-emissions drying process with minimal environmental impact.'
  },
  {
    id: 4,
    icon: '🏘️',
    title: 'Community Impact',
    description: 'Fair wages for local farmers, reducing post-harvest waste and empowering communities.'
  },
  {
    id: 5,
    icon: '🍱',
    title: 'Longer Shelf Life',
    description: 'Natural dehydration extends freshness without preservatives — up to 12 months naturally.'
  }
];

export function Benefits() {
  return (
    <section className="bg-[#1e3b10] py-[80px] lg:py-[100px] px-[5%] lg:px-[5%]" id="benefits">
      
      {/* Header */}
      <div className="text-center max-w-[700px] mx-auto mb-[3rem]">
        <span className="inline-block text-[#c88d22] text-[0.8rem] font-bold tracking-[0.15em] uppercase mb-[0.8rem]">
          HEALTH BENEFITS
        </span>
        <h2 className="font-heading text-[clamp(2rem,3.5vw,3.2rem)] font-black text-white leading-[1.2] mb-[1rem]">
          Goodness in Every Bite
        </h2>
        <p className="text-[1rem] text-white/80 leading-relaxed max-w-[600px] mx-auto">
          Solar drying preserves what matters — vitamins, minerals, enzymes — while extending shelf life naturally.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[1.2rem]">
        {BENEFITS.map(benefit => (
          <div 
            key={benefit.id}
            className="bg-[#2a4c18] border border-white/5 p-[2rem] lg:p-[1.8rem] rounded-[20px] shadow-lg text-center transition-all duration-300 hover:-translate-y-[5px] hover:shadow-2xl hover:bg-[#325a1d]"
          >
            <span className="text-[2.5rem] inline-block mb-[1rem]">
              {benefit.icon}
            </span>
            <h3 className="text-[1.1rem] font-bold text-[#c88d22] mb-[0.8rem]">
              {benefit.title}
            </h3>
            <p className="text-[0.85rem] text-white/80 leading-[1.6]">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
