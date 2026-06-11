import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f2006] via-[#1e3a0c] to-[#3d6b20] grid grid-cols-1 lg:grid-cols-2 items-center pt-[68px] relative overflow-hidden" id="home">
      {/* Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\'%3E%3Cg fill=\'%23ffffff\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'3\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      
      {/* Sun Ring Animation */}
      <div className="absolute -top-[100px] right-[35%] w-[420px] h-[420px] rounded-full pointer-events-none animate-[glowPulse_4s_ease-in-out_infinite]" style={{ background: 'radial-gradient(circle, rgba(232,160,32,0.18) 0%, transparent 65%)' }}></div>

      {/* Left Content */}
      <div className="px-[5%] lg:pl-[8%] py-[80px] relative z-10 animate-[fadeUp_0.7s_ease_both]">
        <div className="inline-flex items-center gap-[8px] bg-sun/20 border border-sun/45 text-[#f2c96a] px-[16px] py-[6px] rounded-[20px] text-[0.78rem] font-extrabold tracking-[0.12em] uppercase mb-[1.5rem]">
          ☀️ Solar Dried &nbsp;·&nbsp; 100% Natural
        </div>
        
        <h1 className="font-heading text-[clamp(2.6rem,4.5vw,4.4rem)] font-black leading-[1.06] text-white mb-[1.4rem]">
          Nature's Flavour,<em className="not-italic italic text-sun block">Sun-Kissed.</em>
        </h1>
        
        <p className="text-white/70 text-[1.05rem] leading-[1.75] mb-[2.2rem] max-w-[430px]">
          From Beetroot chips to Aam Panna premixes — every product is solar-dried, preservative-free, and packed with Ayurvedic goodness for your family.
        </p>
        
        <div className="flex gap-[1rem] flex-wrap">
          <Button asChild className="bg-sun text-forest px-[30px] py-[14px] rounded-[30px] font-extrabold text-[0.95rem] transition-all duration-250 shadow-[0_4px_22px_rgba(232,160,32,0.45)] hover:shadow-[0_8px_32px_rgba(232,160,32,0.55)] hover:-translate-y-[2px] h-auto">
            <a href="#products">Explore Products</a>
          </Button>
          <Button asChild variant="outline" className="border-[2px] border-white/40 text-white bg-transparent px-[26px] py-[12px] rounded-[30px] font-bold text-[0.95rem] transition-all duration-250 backdrop-blur-[4px] hover:border-white hover:bg-white/10 hover:-translate-y-[2px] h-auto">
            <a href="#why-us">Our Story</a>
          </Button>
        </div>
        
        <div className="flex gap-[2.5rem] mt-[3rem] pt-[2rem] border-t border-white/15 flex-wrap">
          <div>
            <span className="font-heading text-[1.9rem] font-black text-sun block">100%</span>
            <span className="text-[0.72rem] text-white/55 tracking-[0.1em] uppercase">Natural</span>
          </div>
          <div>
            <span className="font-heading text-[1.9rem] font-black text-sun block">0</span>
            <span className="text-[0.72rem] text-white/55 tracking-[0.1em] uppercase">Preservatives</span>
          </div>
          <div>
            <span className="font-heading text-[1.9rem] font-black text-sun block">☀️</span>
            <span className="text-[0.72rem] text-white/55 tracking-[0.1em] uppercase">Solar Dried</span>
          </div>
        </div>
      </div>

      {/* Right Image Panel */}
      <div className="relative h-[55vw] min-h-[300px] lg:h-screen overflow-hidden animate-[fadeUp_0.9s_ease_0.2s_both]">
        {/* Note for User: Copy your desired image to public/hero.jpg or use this generated image */}
        <img 
          src="/hero.png" 
          alt="Solar Dried Process" 
          className="w-full h-full object-cover block brightness-[0.78] saturate-[1.15]"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #1a3a08 0%, transparent 40%), linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)' }}></div>
        <div className="absolute bottom-[40px] left-[30px] bg-cream/95 backdrop-blur-[12px] px-[20px] py-[12px] rounded-[14px] border-l-[4px] border-sun z-20">
          <strong className="block text-[0.9rem] text-forest font-extrabold">Solar Drying Process</strong>
          <span className="text-[0.75rem] text-text-mid">Retains 90%+ nutrients</span>
        </div>
      </div>
    </section>
  )
}
