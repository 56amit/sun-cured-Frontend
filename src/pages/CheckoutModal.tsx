import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';
import { createOrder } from '../api/orderApi';

export function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, setIsOpen, items, getCartTotal, clearCart } = useCartStore();
  const { user, addOrder } = useAuthStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Your cart is empty");

    try {
      setIsSubmitting(true);
      
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const customer = {
        name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        address: `${formData.get('street')}, ${formData.get('apartment') ? formData.get('apartment') + ', ' : ''}${formData.get('city')}, ${formData.get('state')} - ${formData.get('zip')}`
      };

      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        paymentGateway: 'COD',
        customer
      };

      const result = await createOrder(orderData);
      
      // Update local state if user is logged in
      if (user) {
        addOrder({
          id: `ORD-${result.order.id}`,
          date: new Date().toLocaleDateString(),
          total: result.order.totalAmount,
          status: result.order.status
        });
      }
      
      setStep(2);
      clearCart();
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => setStep(1), 300); // Reset after animation
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-[1rem] lg:p-[2rem]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="bg-white w-full max-w-[900px] max-h-[95vh] overflow-y-auto rounded-[24px] shadow-2xl relative z-10 animate-in zoom-in-95 duration-300">
        
        {step === 1 ? (
          <div className="flex flex-col md:flex-row">
            {/* Left: Form */}
            <div className="w-full md:w-3/5 p-[2rem] lg:p-[3rem]">
              <div className="flex items-center justify-between mb-[2rem]">
                <div className="flex items-center gap-[1rem]">
                  <button 
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsOpen(true); // Open cart drawer back
                    }}
                    className="px-[12px] py-[6px] rounded-[20px] bg-[#f5f5f5] flex items-center justify-center gap-[6px] text-forest font-bold hover:bg-[#eee] transition-colors border-none cursor-pointer text-[0.85rem]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Cart
                  </button>
                  <h2 className="font-heading text-[2rem] font-black text-forest m-0">Checkout</h2>
                </div>
                
                <button 
                  onClick={handleClose}
                  className="w-[35px] h-[35px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-forest hover:bg-[#eee] transition-colors border-none cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-[1.5rem]">
                <div>
                  <h3 className="text-[1.1rem] font-bold text-forest mb-[1rem]">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
                    <input name="firstName" required defaultValue={user?.firstName || ''} type="text" placeholder="First Name" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all" />
                    <input name="lastName" required defaultValue={user?.lastName || ''} type="text" placeholder="Last Name" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all" />
                    <input name="email" required defaultValue={user?.email || ''} type="email" placeholder="Email Address" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all md:col-span-2" />
                    <input name="phone" required defaultValue={user?.phone || ''} type="tel" placeholder="Phone Number" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all md:col-span-2" />
                  </div>
                </div>

                <div>
                  <h3 className="text-[1.1rem] font-bold text-forest mb-[1rem]">Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
                    <input name="street" required defaultValue={user?.street || ''} type="text" placeholder="Street Address" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all md:col-span-2" />
                    <input name="apartment" defaultValue={user?.apartment || ''} type="text" placeholder="Apartment, suite, etc. (optional)" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all md:col-span-2" />
                    <input name="city" required defaultValue={user?.city || ''} type="text" placeholder="City" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all" />
                    <input name="state" required defaultValue={user?.state || ''} type="text" placeholder="State / Province" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all" />
                    <input name="zip" required defaultValue={user?.zip || ''} type="text" placeholder="Postal Code" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all md:col-span-2" />
                  </div>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full bg-forest text-white py-[1.2rem] rounded-[30px] font-extrabold text-[1.1rem] border-none cursor-pointer transition-all duration-300 hover:bg-[#3a6326] shadow-lg mt-[1rem] disabled:opacity-50">
                  {isSubmitting ? 'Processing...' : `Place Order • ₹${getCartTotal() > 0 ? getCartTotal() + 40 : 0}`}
                </button>
              </form>
            </div>

            {/* Right: Summary */}
            <div className="w-full md:w-2/5 bg-[#f9f9f9] p-[2rem] lg:p-[3rem] border-l border-[#eee]">
              <h3 className="text-[1.2rem] font-bold text-forest mb-[1.5rem]">Order Summary</h3>
              
              <div className="flex flex-col gap-[1rem] mb-[2rem] max-h-[300px] overflow-y-auto pr-[0.5rem]">
                {items.map(item => {
                  const priceNum = parseInt(item.price.replace(/[^\d]/g, ''), 10) || 0;
                  return (
                    <div key={item.id} className="flex gap-[1rem] items-center">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-[60px] h-[60px] object-cover rounded-[10px] bg-white border border-[#eee]" />
                        <span className="absolute -top-[5px] -right-[5px] bg-[#e69b24] text-white text-[0.7rem] font-bold w-[20px] h-[20px] flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-forest text-[0.9rem] leading-tight">{item.name}</h4>
                      </div>
                      <div className="font-bold text-[#c88d22]">
                        ₹{priceNum * item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-[0.8rem] border-t border-[#ddd] pt-[1.5rem]">
                <div className="flex justify-between text-text-mid">
                  <span>Subtotal</span>
                  <span className="font-bold text-forest">₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-text-mid">
                  <span>Shipping</span>
                  <span className="font-bold text-forest">₹40</span>
                </div>
                <div className="flex justify-between text-[1.2rem] font-black text-forest mt-[0.5rem] pt-[1rem] border-t border-[#ddd]">
                  <span>Total</span>
                  <span>₹{getCartTotal() > 0 ? getCartTotal() + 40 : 0}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Success Step */
          <div className="flex flex-col items-center justify-center p-[4rem] lg:p-[6rem] text-center">
            <div className="w-[80px] h-[80px] bg-green-100 rounded-full flex items-center justify-center mb-[2rem]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 className="font-heading text-[2.5rem] font-black text-forest mb-[1rem]">Order Confirmed!</h2>
            <p className="text-[1.1rem] text-text-mid max-w-[400px] mx-auto mb-[2.5rem]">
              Thank you for choosing Sun-Cured Savories. Your delicious solar-dried treats will be on their way soon.
            </p>
            <button 
              onClick={handleClose}
              className="bg-forest text-white px-[3rem] py-[1rem] rounded-[30px] font-bold text-[1.1rem] hover:bg-[#3a6326] transition-colors border-none cursor-pointer shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
