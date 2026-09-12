import { useCartStore } from '../store/cartStore';

export function FloatingCartBanner() {
  const { items, isOpen, setIsOpen, getCartTotal, getCartCount } = useCartStore();

  // Banner won't show if cart is empty or if cart drawer is currently open
  if (items.length === 0 || isOpen) return null;

  return (
    <div className="fixed bottom-[20px] left-0 w-full px-[15px] z-40 animate-[fadeUp_0.3s_ease_both]">
      <div 
        onClick={() => setIsOpen(true)}
        className="bg-[#242424] text-white rounded-[12px] p-[14px_18px] flex justify-between items-center shadow-[0_10px_25px_rgba(0,0,0,0.25)] cursor-pointer max-w-[500px] mx-auto active:scale-[0.98] transition-transform"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-[8px]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-sun">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="font-bold text-[1.1rem]">{getCartCount()} Item{getCartCount() > 1 ? 's' : ''}</span>
          </div>
          <span className="text-[0.95rem] text-[#ddd] font-medium ml-[30px]">₹{getCartTotal().toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-[6px] font-bold text-[1rem] text-sun">
          View Cart
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}
