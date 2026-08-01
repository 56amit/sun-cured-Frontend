export function Founder() {
  return (
    <section className="bg-white py-[100px] lg:py-[120px] px-[5%] lg:px-[8%]" id="founder">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[4rem] items-center">
        
        {/* Left: Image & Quote */}
        <div className="lg:col-span-5 flex flex-col gap-[2rem]">
          <div className="relative rounded-[24px] overflow-hidden shadow-2xl bg-[#fdfaf1] aspect-[4/5] border-[8px] border-[#f0ece1]">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
              alt="Dr. Baby Pallavi" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-[2rem] pt-[4rem]">
              <h3 className="text-white font-heading text-[1.8rem] font-black">Dr. B. Pallavi</h3>
              <p className="text-[#c88d22] font-bold text-[1rem]">Founder & Proprietor</p>
            </div>
          </div>
          
          <div className="bg-[#fdfaf1] p-[2rem] rounded-[24px] border border-[#7b9c66]/20 relative">
            <span className="absolute top-[-15px] left-[20px] text-[3rem] text-[#c88d22] leading-none font-serif">"</span>
            <p className="text-[1.05rem] text-forest italic font-semibold leading-relaxed relative z-10 pt-[10px]">
              True sustainability is born where scientific precision meets deep-rooted respect for nature... Good for you, good for nature and good for all.
            </p>
          </div>
        </div>

        {/* Right: Bio Text */}
        <div className="lg:col-span-7">
          <span className="inline-block text-sun text-[0.85rem] font-bold tracking-[0.15em] uppercase mb-[0.8rem]">
            Sun, Soil and Sustainability
          </span>
          <h2 className="font-heading text-[clamp(2.2rem,4vw,3.5rem)] font-black text-forest leading-[1.1] mb-[2rem]">
            Meet the Founder
          </h2>
          
          <div className="flex flex-col gap-[1.2rem] text-[1.05rem] text-text-mid leading-[1.8]">
            <p>
              <strong>Dr. Baby Pallavi</strong> is a distinguished clean-tech food innovator and agricultural researcher who bridges the gap between deep-tech physics and sustainable food systems.
            </p>
            <p>
              She holds an M.Sc. in Physics from B.R. Ambedkar Bihar University, Muzaffarpur, where she laid the groundwork for her career by exploring the mechanics of solar thermal applications. Advancing her passion for environmental sustainability, she earned her Ph.D. in Agricultural and Environmental Engineering from the Tokyo University of Agriculture and Technology (TUAT), Japan. 
            </p>
            <p>
              Her doctoral research specialized in high-precision hydro-geophysics, focused on mapping the subsurface soil moisture content of Japanese Andisols (Kanto Loam) using advanced Ground Penetrating Radar (GPR) technology.
            </p>
            <p>
              Dr. Pallavi has now channeled her extensive expertise in thermal dynamics, soil science, and moisture management directly into the commercial space. She initiated her sustainable startup, <strong>Sun Cured Savories</strong>, setting up its operations hub in Garhi Harsaru, Gurugram, Haryana.
            </p>
            <p>
              By pairing her scientific insights on optimal dehydration with a core philosophy of <em>“Itadakimasu”</em>, she has built a high-efficiency processing setup that preserves the earth’s natural energy while providing vital economic opportunities to local women.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
