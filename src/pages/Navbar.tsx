import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const cartCount = useCartStore(state => state.getCartCount())
  const setIsCartOpen = useCartStore(state => state.setIsOpen)
  const { user, setAuthModalOpen, setProfileOpen, logout } = useAuthStore()

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
          <Button asChild className="bg-forest/10 border-none px-[16px] py-[8px] rounded-[20px] cursor-pointer text-forest font-bold shadow-none transition-colors hover:bg-forest/20 text-[0.95rem] h-auto mr-[0.5rem] relative">
            <button aria-label="Cart" onClick={() => setIsCartOpen(true)} className="flex items-center gap-[6px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-[4px] -right-[4px] bg-[#e69b24] text-white text-[0.7rem] font-bold w-[22px] h-[22px] flex items-center justify-center rounded-full border-[2px] border-cream">
                  {cartCount}
                </span>
              )}
            </button>
          </Button>
        </li>
        <li>
          {user ? (
            <div className="relative group">
              <Button asChild className="bg-forest/10 border-none px-[20px] py-[8px] rounded-[20px] cursor-pointer text-forest font-bold shadow-none transition-colors hover:bg-forest/20 text-[0.95rem] h-auto">
                <button aria-label="User Profile" className="flex items-center gap-[6px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Hi, {user.firstName}</span>
                </button>
              </Button>
              <div className="absolute top-full right-0 mt-2 w-[150px] bg-white rounded-[12px] shadow-lg border border-[#eee] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 flex flex-col p-[8px] gap-[4px]">
                <button onClick={() => setProfileOpen(true)} className="w-full text-left px-3 py-2 text-forest font-bold hover:bg-[#f5f5f5] rounded-[8px] border-none bg-transparent cursor-pointer">My Profile</button>
                <button onClick={logout} className="w-full text-left px-3 py-2 text-red-500 font-bold hover:bg-red-50 rounded-[8px] border-none bg-transparent cursor-pointer">Logout</button>
              </div>
            </div>
          ) : (
            <Button asChild className="bg-forest/10 border-none px-[20px] py-[8px] rounded-[20px] cursor-pointer text-forest font-bold shadow-none transition-colors hover:bg-forest/20 text-[0.95rem] h-auto">
              <button aria-label="Login" onClick={() => setAuthModalOpen(true)} className="flex items-center gap-[6px]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Login</span>
              </button>
            </Button>
          )}
        </li>
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
