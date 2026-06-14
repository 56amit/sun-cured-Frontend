import { useCartStore } from '../store/cartStore';

export function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[250] bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-[300] w-full max-w-[400px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-[1.5rem] py-[1.2rem] border-b border-[#eee] flex items-center justify-between bg-[#f9f9f9]">
          <h2 className="font-heading text-[1.5rem] font-black text-forest m-0">Your Cart</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-[35px] h-[35px] rounded-full bg-white shadow-sm flex items-center justify-center text-forest hover:bg-[#eee] transition-colors cursor-pointer border-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-[1.5rem] flex flex-col gap-[1.5rem]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-mid opacity-60">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-[1rem]">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p className="font-bold text-[1.2rem]">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => {
              const priceNum = parseInt(item.price.replace(/[^\d]/g, ''), 10) || 0;
              return (
                <div key={item.id} className="flex gap-[1rem] border border-[#eee] rounded-[16px] p-[10px] items-center bg-white">
                  <img src={item.image} alt={item.name} className="w-[70px] h-[70px] object-cover rounded-[10px] bg-[#f9f9f9]" />
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-forest text-[0.95rem] leading-tight mb-[0.2rem]">{item.name}</h4>
                    <div className="text-[#c88d22] font-extrabold text-[0.9rem] mb-[0.5rem]">
                      ₹{priceNum * item.quantity}
                    </div>
                    
                    <div className="flex items-center gap-[0.8rem] bg-[#f5f5f5] rounded-[20px] px-[8px] py-[4px] w-fit">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-forest font-bold w-[20px] h-[20px] flex items-center justify-center hover:bg-white rounded-full transition-colors border-none bg-transparent cursor-pointer">-</button>
                      <span className="text-[0.85rem] font-bold text-forest w-[20px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-forest font-bold w-[20px] h-[20px] flex items-center justify-center hover:bg-white rounded-full transition-colors border-none bg-transparent cursor-pointer">+</button>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer border-none bg-transparent"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#eee] p-[1.5rem] bg-[#f9f9f9]">
            <div className="flex justify-between items-center mb-[1rem]">
              <span className="text-[1.1rem] font-bold text-text-mid">Subtotal</span>
              <span className="text-[1.4rem] font-black text-forest">₹{getCartTotal()}</span>
            </div>
            <button 
              onClick={() => {
                const { setIsOpen, setIsCheckoutOpen } = useCartStore.getState();
                setIsOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full bg-forest text-white py-[1rem] rounded-[30px] flex justify-center items-center text-[1.1rem] font-extrabold border-none cursor-pointer transition-all duration-300 hover:bg-[#3a6326] shadow-lg"
            >
              Proceed to Checkout
            </button>
            <button 
              onClick={clearCart}
              className="w-full mt-[0.5rem] bg-transparent text-text-mid py-[0.8rem] rounded-[30px] flex justify-center items-center text-[0.9rem] font-bold border-none cursor-pointer transition-colors hover:text-red-500"
            >
              Clear Cart
            </button>
          </div>
        )}

      </div>
    </>
  );
}
