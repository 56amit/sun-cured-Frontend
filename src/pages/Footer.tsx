

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

      {/* SECURE PAYMENT STRIP */}
      <div className="bg-[#f4f4f4] py-[36px] px-[5%] text-center border-t border-b border-[#e0e0e0]">
        <p className="text-[0.95rem] font-bold text-[#444] mb-[20px] uppercase tracking-[0.12em]">
          🔒 100% Secure Payment
        </p>
        <div className="flex flex-wrap justify-center items-center gap-[14px]">

          {/* Pluxee / Sodexo */}
          <div className="flex items-center gap-[8px] bg-white border border-[#e0e0e0] rounded-[10px] px-[20px] py-[13px] shadow-sm min-w-[100px] justify-center">
            <span className="text-[0.85rem] font-black text-white bg-[#6b2575] px-[9px] py-[4px] rounded-[5px] tracking-wide">PLUXEE</span>
            <span className="text-[0.78rem] text-[#888] font-semibold">Sodexo</span>
          </div>

          {/* UPI */}
          <div className="flex items-center gap-[6px] bg-white border border-[#e0e0e0] rounded-[10px] px-[20px] py-[13px] shadow-sm min-w-[80px] justify-center">
            <svg width="52" height="22" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="24" fontFamily="Arial" fontWeight="900" fontSize="26" fill="#6c3eb6">U</text>
              <text x="22" y="24" fontFamily="Arial" fontWeight="900" fontSize="26" fill="#1a9c3c">P</text>
              <text x="44" y="24" fontFamily="Arial" fontWeight="900" fontSize="26" fill="#f4831f">I</text>
            </svg>
          </div>

          {/* RuPay */}
          <div className="flex items-center bg-white border border-[#e0e0e0] rounded-[10px] px-[20px] py-[13px] shadow-sm min-w-[80px] justify-center">
            <span className="font-black text-[1rem]">
              <span className="text-[#003087]">Ru</span><span className="text-[#e31837]">Pay</span>
            </span>
          </div>

          {/* PhonePe */}
          <div className="flex items-center gap-[8px] bg-[#5f259f] border border-[#5f259f] rounded-[10px] px-[20px] py-[13px] shadow-sm min-w-[100px] justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10"/><text x="6" y="17" fontSize="12" fill="#5f259f" fontWeight="bold">P</text></svg>
            <span className="text-white font-black text-[0.95rem]">PhonePe</span>
          </div>

          {/* Google Pay */}
          <div className="flex items-center gap-[8px] bg-white border border-[#e0e0e0] rounded-[10px] px-[20px] py-[13px] shadow-sm min-w-[110px] justify-center">
            <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.4 3.1 29.5 1 24 1 14.7 1 6.9 6.5 3.5 14.4l7 5.4C12.3 13.5 17.7 9.5 24 9.5z"/>
              <path fill="#34A853" d="M46.5 24c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 2.9-2.2 5.4-4.6 7.1l7.1 5.5C43.4 36.8 46.5 30.9 46.5 24z"/>
              <path fill="#FBBC05" d="M10.5 28.4c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-7-5.4C2.1 17.2 1 20.5 1 24s1.1 6.8 2.5 9.8l7-5.4z"/>
              <path fill="#EA4335" d="M24 46.5c5.5 0 10.1-1.8 13.5-4.9l-7.1-5.5c-1.8 1.2-4.1 1.9-6.4 1.9-6.3 0-11.7-4-13.5-9.6l-7 5.4C6.9 41.5 14.7 46.5 24 46.5z"/>
            </svg>
            <span className="font-bold text-[0.92rem] text-[#555]">Google Pay</span>
          </div>

          {/* VISA */}
          <div className="flex items-center bg-[#1a1f71] border border-[#1a1f71] rounded-[10px] px-[24px] py-[13px] shadow-sm min-w-[80px] justify-center">
            <span className="text-white font-black italic text-[1.1rem] tracking-widest">VISA</span>
          </div>

          {/* Mastercard */}
          <div className="flex items-center gap-[6px] bg-white border border-[#e0e0e0] rounded-[10px] px-[20px] py-[13px] shadow-sm min-w-[110px] justify-center">
            <div className="w-[24px] h-[24px] rounded-full bg-[#eb001b] opacity-90"></div>
            <div className="w-[24px] h-[24px] rounded-full bg-[#f79e1b] opacity-90 -ml-[10px]"></div>
            <span className="text-[0.85rem] text-[#555] font-bold ml-[4px]">Mastercard</span>
          </div>

          {/* Paytm */}
          <div className="flex items-center bg-white border border-[#e0e0e0] rounded-[10px] px-[20px] py-[13px] shadow-sm min-w-[80px] justify-center">
            <span className="font-black text-[1rem]">
              <span className="text-[#00baf2]">Pay</span><span className="text-[#011f5b]">tm</span>
            </span>
          </div>

        </div>
      </div>


      {/* FOOTER */}
      <footer className="bg-[#0e2107] pt-[80px] pb-[30px] px-[5%] lg:px-[8%]">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3rem] lg:gap-[2rem] mb-[4rem]">
          
          {/* Brand */}
          <div>
            <div className="mb-[1.5rem]">
              <img src="/logo.png" alt="Sun-Cured Savories Logo" className="h-[110px] w-[110px] object-cover rounded-full" />
            </div>
            <p className="text-[0.9rem] text-white/70 leading-[1.6] mb-[2rem]">
              Bringing traditional solar-dried nutrition to modern Indian households. Pure. Natural. Delicious.
            </p>
            <div className="flex gap-[0.8rem] items-center">
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/baby-pallavi-0089b9435" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="LinkedIn"
                className="w-[38px] h-[38px] rounded-full bg-white/10 flex justify-center items-center text-white hover:bg-[#0077b5] hover:scale-110 transition-all duration-300 shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="#" 
                title="Instagram"
                className="w-[38px] h-[38px] rounded-full bg-white/10 flex justify-center items-center text-white hover:bg-[#e1306c] hover:scale-110 transition-all duration-300 shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="#" 
                title="Facebook"
                className="w-[38px] h-[38px] rounded-full bg-white/10 flex justify-center items-center text-white hover:bg-[#1877f2] hover:scale-110 transition-all duration-300 shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
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
              <li><a href="mailto:suncuredsavories@gmail.com" className="text-[0.9rem] text-white/70 hover:text-[#c88d22] transition-colors duration-200">📧 suncuredsavories@gmail.com</a></li>
              <li><a href="tel:+918796446551" className="text-[0.9rem] text-white/70 hover:text-[#c88d22] transition-colors duration-200">📞 +91 87964 46551</a></li>
              <li className="flex items-start gap-[0.5rem]"><span className="mt-[2px]">📍</span><span className="text-[0.9rem] text-white/70">Plot no. 73, Shiva Enclave, Part-1, Garhi Harsaru, Gurgaon - 122052, Haryana</span></li>
              <li><a href="#" className="text-[0.9rem] text-white/70 hover:text-[#c88d22] transition-colors duration-200">🌐 suncuredsavories.com</a></li>
            </ul>
            {/* Legal Info */}
            <div className="mt-[1.5rem] flex items-center gap-[0.5rem]">
              <span className="text-[0.9rem]">🍽️</span>
              <span className="text-[0.9rem] text-white/70">FSSAI License: 12726998000058</span>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-[2rem] border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-[2rem]">
          <div className="text-[0.85rem] text-white/50">
            © 2026 Sun-Cured Savories. All rights reserved.
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
