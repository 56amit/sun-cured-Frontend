

export function Footer() {
  return (
    <>
      {/* NEWSLETTER */}
      <section className="bg-[#e69b24] py-[80px] px-[5%] text-center" id="contact">
        <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-black text-forest leading-[1.2] mb-[0.5rem]">
          Get 10% Off Your First Order
        </h2>
        <p className="text-[1.05rem] text-forest/90 mb-[2rem]">
          Subscribe for recipes, new launches, and exclusive offers straight to your inbox.
        </p>
        
        <form className="flex flex-col sm:flex-row justify-center items-center gap-[1rem] max-w-[500px] mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email address..." 
            className="w-full sm:flex-1 px-[1.5rem] py-[0.9rem] rounded-[30px] border-none outline-none text-[1rem] shadow-sm focus:ring-2 focus:ring-forest/30 transition-all"
            required
          />
          <button 
            type="submit"
            className="w-full sm:w-auto px-[2rem] py-[0.9rem] rounded-[30px] bg-forest text-white font-extrabold text-[1rem] border-none cursor-pointer transition-all duration-300 hover:bg-[#1e3b10] shadow-sm whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0e2107] pt-[80px] pb-[30px] px-[5%] lg:px-[8%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3rem] lg:gap-[2rem] mb-[4rem]">
          
          {/* Brand */}
          <div>
            <div className="font-heading text-[1.8rem] font-black text-white mb-[1rem]">
              Sun-<span className="text-[#c88d22]">Cured</span> Savories
            </div>
            <p className="text-[0.9rem] text-white/70 leading-[1.6] mb-[2rem]">
              Bringing traditional solar-dried nutrition to modern Indian households. Pure. Natural. Delicious.
            </p>
            <div className="flex gap-[1rem]">
              {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
                <a key={i} href="#" className="w-[35px] h-[35px] rounded-full bg-white/10 flex justify-center items-center text-[1rem] hover:bg-[#c88d22] transition-colors duration-300">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-[1rem] font-bold text-white mb-[1.5rem] uppercase tracking-[0.1em]">Products</h4>
            <ul className="flex flex-col gap-[1rem]">
              {['Chips & Snacks', 'Premixes', 'Spice Powders', 'Dehydrated Veggies', 'Gift Combos'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[0.9rem] text-white/70 hover:text-[#c88d22] transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-[1rem] font-bold text-white mb-[1.5rem] uppercase tracking-[0.1em]">Company</h4>
            <ul className="flex flex-col gap-[1rem]">
              {['Our Story', 'Our Process', 'Farmer Partners', 'Blog', 'Contact Us'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[0.9rem] text-white/70 hover:text-[#c88d22] transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[1rem] font-bold text-white mb-[1.5rem] uppercase tracking-[0.1em]">Contact</h4>
            <ul className="flex flex-col gap-[1rem]">
              <li><a href="#" className="text-[0.9rem] text-white/70 hover:text-[#c88d22] transition-colors duration-200">📧 hello@suncuredsavories.com</a></li>
              <li><a href="#" className="text-[0.9rem] text-white/70 hover:text-[#c88d22] transition-colors duration-200">📞 +91 98765 43210</a></li>
              <li><a href="#" className="text-[0.9rem] text-white/70 hover:text-[#c88d22] transition-colors duration-200">📍 India</a></li>
              <li><a href="#" className="text-[0.9rem] text-white/70 hover:text-[#c88d22] transition-colors duration-200">🌐 suncuredsavories.com</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-[2rem] border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-[2rem]">
          <div className="text-[0.85rem] text-white/50">
            © 2025 Sun-Cured Savories. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-[1rem]">
            <span className="bg-[#1c3612] text-[#c88d22] px-[14px] py-[6px] rounded-[20px] text-[0.75rem] font-bold">
              ☀️ Solar Dried
            </span>
            <span className="bg-[#1c3612] text-[#7b9c66] px-[14px] py-[6px] rounded-[20px] text-[0.75rem] font-bold">
              🌿 100% Natural
            </span>
            <span className="bg-[#1c3612] text-[#7b9c66] px-[14px] py-[6px] rounded-[20px] text-[0.75rem] font-bold">
              ✓ No Preservatives
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
