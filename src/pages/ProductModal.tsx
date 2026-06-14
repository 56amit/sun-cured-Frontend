import { useState, useEffect } from 'react';
import type { UIProduct } from '../api/productApi';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';

interface ProductModalProps {
  product: UIProduct | null;
  categoryName?: string;
  onClose: () => void;
}

export function ProductModal({ product, categoryName = 'Unknown', onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore(state => state.addToCart);

  // Reset quantity when a new product is selected
  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  // Extract base price number (e.g., "₹199" -> 199)
  const basePriceStr = product.price.replace(/[^\d]/g, '');
  const basePrice = parseInt(basePriceStr, 10) || 0;
  const totalPrice = basePrice * quantity;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-[1rem] animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="bg-white rounded-[24px] w-full max-w-[800px] max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-[1rem] right-[1rem] z-10 w-[35px] h-[35px] rounded-full bg-white shadow-md flex items-center justify-center text-forest hover:bg-[#eee] transition-colors cursor-pointer border-none"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-[#f9f9f9] p-[2rem] flex items-center justify-center relative">
          <span className={`absolute top-[1.5rem] left-[1.5rem] ${product.badgeColor} px-[14px] py-[6px] rounded-[20px] text-[0.75rem] font-bold text-white z-10 shadow-sm`}>
            {product.badge}
          </span>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto max-h-[300px] object-cover rounded-[16px] drop-shadow-md"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-[2rem] lg:p-[3rem] flex flex-col">
          <div className="text-[#7b9c66] text-[0.8rem] font-extrabold tracking-[0.1em] uppercase mb-[0.5rem]">
            {categoryName}
          </div>
          <h2 className="font-heading text-[1.8rem] lg:text-[2.2rem] font-black text-forest leading-[1.2] mb-[1rem]">
            {product.name}
          </h2>
          
          <div className="text-[1.5rem] font-extrabold text-[#c88d22] mb-[1.5rem]">
            {product.price} <span className="text-[1rem] font-medium text-text-mid">{product.unit}</span>
          </div>

          <p className="text-[1rem] text-text-mid mb-[2rem] leading-relaxed">
            {product.description}
          </p>

          <div className="mt-auto pt-[2rem] border-t border-[#eee]">
            <div className="flex items-center justify-between gap-[1rem] mb-[1.5rem]">
              <span className="text-[1rem] font-bold text-forest">Quantity</span>
              <div className="flex items-center gap-[1rem] bg-[#f5f5f5] rounded-[30px] p-[0.3rem]">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-[35px] h-[35px] rounded-full bg-white shadow-sm flex items-center justify-center text-forest font-bold hover:bg-[#eee] transition-colors cursor-pointer border-none"
                >
                  -
                </button>
                <span className="w-[30px] text-center font-bold text-[1.1rem] text-forest">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-[35px] h-[35px] rounded-full bg-white shadow-sm flex items-center justify-center text-forest font-bold hover:bg-[#eee] transition-colors cursor-pointer border-none"
                >
                  +
                </button>
              </div>
            </div>

            <button 
              onClick={() => {
                addToCart(product, quantity);
                toast.success(`${quantity}x ${product.name} added to cart`);
                onClose();
              }}
              className="w-full bg-forest text-white py-[1rem] rounded-[30px] flex justify-center items-center gap-[0.5rem] text-[1.1rem] font-extrabold border-none cursor-pointer transition-all duration-300 hover:bg-[#3a6326] hover:-translate-y-1 shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Add to Cart • ₹{totalPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
