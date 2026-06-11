

const STEPS = [
  {
    num: '1',
    title: 'Farm Fresh Sourcing',
    description: 'We partner with local farmers to source the freshest seasonal produce — direct, traceable, and chemical-free.'
  },
  {
    num: '2',
    title: 'Natural Preparation',
    description: 'Vegetables and fruits are cleaned, sliced, and seasoned with natural spices using traditional stone-grinding methods.'
  },
  {
    num: '3',
    title: 'Solar Drying',
    description: 'Spread under controlled sunlight — our Agni-friendly process locks in nutrients and creates the perfect texture.'
  },
  {
    num: '4',
    title: 'Packed with Care',
    description: 'Hygienically sealed and dispatched — no additives, no compromises. Just pure, natural goodness.'
  }
];

export function Process() {
  return (
    <section className="bg-white py-[100px] lg:py-[120px] px-[5%] lg:px-[8%]" id="process">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4rem] items-center">
        
        {/* Left Side: Text and Steps */}
        <div>
          <span className="inline-block text-[#7b9c66] text-[0.85rem] font-bold tracking-[0.12em] uppercase mb-[0.8rem]">
            How It's Made
          </span>
          <h2 className="font-heading text-[clamp(2.2rem,4vw,3.8rem)] font-black text-forest leading-[1.1] mb-[1.5rem]">
            From Farm to<br/>Your Table
          </h2>
          <p className="text-[1.1rem] text-text-mid leading-relaxed mb-[3rem]">
            Every product follows our traditional solar-drying process — validated by modern science and rooted in Ayurveda.
          </p>
          
          <div className="flex flex-col gap-[2rem]">
            {STEPS.map(step => (
              <div key={step.num} className="flex gap-[1.5rem] items-start">
                <div className="shrink-0 w-[40px] h-[40px] bg-forest text-[#c88d22] rounded-full flex justify-center items-center font-extrabold text-[1.1rem] shadow-sm">
                  {step.num}
                </div>
                <div>
                  <h4 className="text-[1.2rem] text-forest font-extrabold mb-[0.4rem]">
                    {step.title}
                  </h4>
                  <p className="text-[0.9rem] text-text-mid leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full relative">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" 
            alt="Solar Drying Process" 
            className="w-full h-auto aspect-[4/3] lg:aspect-[4/5] object-cover rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-[#fdfaf1]"
          />
          {/* Sparkle Icon */}
          <div className="absolute bottom-[2rem] right-[2rem] text-white opacity-80 pointer-events-none">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" fill="currentColor"/>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
