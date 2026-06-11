import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Our Process', href: '#process' },
  ]

  return (
    <nav className="fixed top-0 w-full z-[100] bg-cream/96 backdrop-blur-[10px] border-b-[2px] border-olive/15 px-[6%] flex items-center justify-between h-[68px] shadow-[0_2px_20px_rgba(45,80,22,0.08)]">
      {/* Logo */}
      <a href="#" className="flex items-center gap-[10px] font-heading font-black text-xl text-forest no-underline">
        <div className="bg-gradient-to-br from-forest to-olive px-[10px] py-[6px] rounded-[10px] text-[1.1rem] leading-none text-white shadow-sm">
          🌿
        </div>
        Sun-<span className="text-sun">Cured</span>&nbsp;Savories
      </a>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-8 list-none m-0 p-0 items-center">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="no-underline text-text-mid font-semibold text-[0.88rem] tracking-[0.05em] uppercase relative transition-colors duration-200 hover:text-forest after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sun after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          </li>
        ))}
        <li>
          <Button asChild className="bg-forest text-white rounded-full px-[22px] py-[9px] hover:bg-olive transition-colors h-auto font-bold shadow-none">
            <a href="#contact">Order Now</a>
          </Button>
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="bg-transparent border-none p-1 cursor-pointer text-forest" aria-label="Menu">
              <Menu size={28} strokeWidth={2.5} />
            </button>
          </SheetTrigger>
          <SheetContent side="top" className="bg-cream pt-[80px] px-[6%] border-b-2 border-olive/15 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
            <div className="flex flex-col gap-2 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-text-dark font-bold text-lg py-3 border-b border-olive/10 no-underline transition-colors hover:text-forest"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="text-forest font-black text-lg py-3 border-b border-olive/10 no-underline"
              >
                Order Now
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
