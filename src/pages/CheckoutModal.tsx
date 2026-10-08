import { useEffect, useRef, useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';
import { createOrder } from '../api/orderApi';
import { loadRazorpayScript } from '../utils/loadRazorpay';
import { initiatePayment } from '../api/paymentApi';
import axiosClient from '../api/axiosClient';

const SAVED_ADDRESS_KEY = 'scs_saved_address';

type Step = 1 | 2 | 3;

interface ZoneResult {
  serviceable: boolean;
  zone?: { id: number; name: string; estimatedDays: string };
  shippingCharge: number;
  isFreeDelivery: boolean;
  freeDeliveryAbove: number | null;
  message?: string;
  pincode: string;
}

export function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, setIsOpen, items, getCartTotal, clearCart } = useCartStore();
  const { user, addOrder } = useAuthStore();
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay'>('razorpay');
  const [saveAddress, setSaveAddress] = useState(false);
  const customerRef = useRef<any>(null);
  const orderSavedRef = useRef(false);

  // Pincode / Delivery Zone state
  const [pincode, setPincode] = useState('');
  const [zoneResult, setZoneResult] = useState<ZoneResult | null>(null);
  const [checkingPincode, setCheckingPincode] = useState(false);
  const pincodeCheckedRef = useRef('');

  // Load saved address from localStorage
  const savedAddr = (() => {
    try { return JSON.parse(localStorage.getItem(SAVED_ADDRESS_KEY) || 'null'); } catch { return null; }
  })();

  // Preload Razorpay script when modal opens
  useEffect(() => {
    if (isCheckoutOpen) loadRazorpayScript();
  }, [isCheckoutOpen]);

  // Pre-fill pincode from saved address
  useEffect(() => {
    if (isCheckoutOpen && savedAddr?.zip && !pincode) {
      setPincode(savedAddr.zip);
    }
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const subtotal = getCartTotal();
  // Use zone API result if available, else 0 (don't guess shipping without zone check)
  const shipping = zoneResult?.serviceable ? zoneResult.shippingCharge : 0;
  const total = subtotal > 0 ? subtotal + shipping : 0;

  // Check pincode with backend (always pass latest subtotal)
  const handlePincodeCheck = async (zip?: string, currentSubtotal?: number) => {
    const pincodeToCheck = (zip || pincode).trim();
    if (!pincodeToCheck || pincodeToCheck.length !== 6) return;
    const sub = currentSubtotal !== undefined ? currentSubtotal : subtotal;
    // Re-check if pincode or subtotal changed (subtotal affects free delivery)
    if (pincodeCheckedRef.current === `${pincodeToCheck}-${sub}`) return;
    setCheckingPincode(true);
    setZoneResult(null);
    try {
      const { data } = await axiosClient.get<ZoneResult>(`/delivery-zones/check`, {
        params: { pincode: pincodeToCheck, subtotal: sub },
      });
      setZoneResult(data);
      pincodeCheckedRef.current = `${pincodeToCheck}-${sub}`;
    } catch {
      setZoneResult(null);
    } finally {
      setCheckingPincode(false);
    }
  };

  // Step 1: Collect customer info, go to step 2
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const zipVal = (formData.get('zip') as string).trim();
    const addressData = {
      street: formData.get('street') as string,
      apartment: formData.get('apartment') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip: zipVal,
    };

    // Always re-check pincode with current subtotal before proceeding
    if (zipVal && zipVal.length === 6) {
      await handlePincodeCheck(zipVal, subtotal);
    }

    // Block if pincode not serviceable
    if (zoneResult && !zoneResult.serviceable) {
      toast.error('Sorry! We do not deliver to this pincode yet.');
      return;
    }

    customerRef.current = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: `${addressData.street}, ${addressData.apartment ? addressData.apartment + ', ' : ''}${addressData.city}, ${addressData.state} - ${addressData.zip}`
    };
    if (saveAddress) {
      localStorage.setItem(SAVED_ADDRESS_KEY, JSON.stringify(addressData));
    }
    setStep(2);
  };

  // Step 2: Place order
  const handlePlaceOrder = async () => {
    if (items.length === 0) return toast.error('Your cart is empty');
    const customer = customerRef.current;
    if (!customer) return toast.error('Please fill in your details first');
    if (isSubmitting) return;

    const cartItems = items.map(item => {
      const rawPrice = typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace(/[^\d.]/g, ''));
      return {
        productId: item.id,
        quantity: item.quantity,
        price: isNaN(rawPrice) ? 0 : rawPrice,
        unit: item.unit
      };
    });

    const orderData: any = {
      items: cartItems,
      paymentGateway: paymentMethod,
      customer,
      paymentDetails: {},
      shippingCharge: shipping,
      deliveryZone: zoneResult?.zone?.name || null,
    };

    try {
      setIsSubmitting(true);

      if (paymentMethod === 'cod') {
        const result = await createOrder(orderData);
        if (user) addOrder({ id: `ORD-${result.order.id}`, date: new Date().toLocaleDateString(), total: result.order.totalAmount, status: result.order.status });
        clearCart();
        setStep(3);
      } else {
        orderSavedRef.current = false;
        const razorpayOrder = await initiatePayment(cartItems);

        const options = {
          key: razorpayOrder.key_id || (import.meta.env.VITE_NODE_ENV === 'production'
            ? import.meta.env.VITE_RAZORPAY_KEY_ID_LIVE
            : import.meta.env.VITE_RAZORPAY_KEY_ID_TEST),
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'Sun Cured Savories',
          description: 'Online Payment',
          order_id: razorpayOrder.razorpayOrderId,
          handler: async function (response: any) {
            if (orderSavedRef.current) return;
            orderSavedRef.current = true;
            clearCart();
            setStep(3);
            try {
              orderData.paymentDetails = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              };
              const result = await createOrder(orderData);
              if (user) addOrder({ id: `ORD-${result.order.id}`, date: new Date().toLocaleDateString(), total: result.order.totalAmount, status: result.order.status });
            } catch (err: any) {
              console.error('Order save failed after payment:', err.message);
              toast.error('Payment received! But order saving failed. Please contact us with your payment ID: ' + response.razorpay_payment_id);
            }
          },
          prefill: {
            name: customer.name,
            email: customer.email,
            contact: customer.phone ? customer.phone.replace(/[^\d]/g, '') : ''
          },
          theme: { color: '#2d5016' },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => setStep(1), 300);
  };

  const inputCls = 'px-[1rem] py-[0.85rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all text-[0.95rem] w-full';

  // Shipping display
  const shippingDisplay = zoneResult?.serviceable
    ? zoneResult.isFreeDelivery
      ? <span className="font-semibold text-green-600">Free 🎉</span>
      : <span className="font-semibold text-forest">₹{zoneResult.shippingCharge}</span>
    : <span className="font-semibold text-[#999]">Enter pincode</span>;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-[1rem] lg:p-[2rem]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={handleClose} />

      {/* Modal */}
      <div className="bg-white w-full max-w-[960px] max-h-[95vh] overflow-y-auto rounded-[24px] shadow-2xl relative z-10 animate-in zoom-in-95 duration-300">

        {/* ─── STEP 1: Contact + Shipping ─── */}
        {step === 1 && (
          <div className="flex flex-col md:flex-row">
            {/* Left Form */}
            <div className="w-full md:w-3/5 p-[2rem] lg:p-[3rem]">
              {/* Header */}
              <div className="flex items-center justify-between mb-[2rem]">
                <div className="flex items-center gap-[1rem]">
                  <button onClick={() => { setIsCheckoutOpen(false); setIsOpen(true); }}
                    className="px-[12px] py-[6px] rounded-[20px] bg-[#f5f5f5] flex items-center gap-[6px] text-forest font-bold hover:bg-[#eee] transition-colors border-none cursor-pointer text-[0.85rem]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                    Back
                  </button>
                  <h2 className="font-heading text-[1.8rem] font-black text-forest m-0">Checkout</h2>
                </div>
                <button onClick={handleClose} className="w-[35px] h-[35px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-forest hover:bg-[#eee] transition-colors border-none cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 mb-[2rem]">
                <div className="flex items-center gap-1"><div className="w-6 h-6 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">1</div><span className="text-sm font-semibold text-forest">Delivery</span></div>
                <div className="flex-1 h-[2px] bg-[#ddd] rounded-full" />
                <div className="flex items-center gap-1"><div className="w-6 h-6 rounded-full bg-[#ddd] text-[#999] text-xs flex items-center justify-center font-bold">2</div><span className="text-sm text-[#999]">Payment</span></div>
              </div>

              <form key={user?.id || 'guest'} onSubmit={handleStep1Submit} className="flex flex-col gap-[1.5rem]">
                <div>
                  <h3 className="text-[1rem] font-bold text-forest mb-[0.8rem]">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-[0.8rem]">
                    <input name="firstName" required defaultValue={user?.firstName || ''} type="text" placeholder="First Name" className={inputCls} />
                    <input name="lastName" required defaultValue={user?.lastName || ''} type="text" placeholder="Last Name" className={inputCls} />
                    <input name="email" required defaultValue={user?.email || ''} type="email" placeholder="Email Address" className={`${inputCls} col-span-2`} />
                    <input name="phone" required defaultValue={user?.phone || ''} type="tel" placeholder="Phone Number" className={`${inputCls} col-span-2`} />
                  </div>
                </div>

                <div>
                  <h3 className="text-[1rem] font-bold text-forest mb-[0.8rem]">Shipping Address</h3>
                  <div className="grid grid-cols-2 gap-[0.8rem]">
                    <input name="state" required defaultValue={savedAddr?.state || user?.state || ''} type="text" placeholder="State" className={inputCls} />
                    <input name="city" required defaultValue={savedAddr?.city || user?.city || ''} type="text" placeholder="City" className={inputCls} />

                    {/* ── Pincode with Auto-Check ── */}
                    <div className="col-span-2">
                      <div className="relative">
                        <input
                          name="zip"
                          required
                          value={pincode}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setPincode(val);
                            pincodeCheckedRef.current = '';
                            if (val.length < 6) {
                              setZoneResult(null);
                            } else {
                              // Auto-check as soon as 6 digits entered
                              handlePincodeCheck(val, subtotal);
                            }
                          }}
                          onBlur={() => handlePincodeCheck(undefined, subtotal)}
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="Pincode (6 digits)"
                          className={`${inputCls} pr-[2.8rem]`}
                        />
                        {/* Inline spinner — visible only while checking */}
                        {checkingPincode && (
                          <span className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d5016" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                              <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                            </svg>
                          </span>
                        )}
                      </div>

                      {/* Zone result feedback */}
                      {zoneResult && (
                        <div className={`mt-[0.5rem] px-[0.8rem] py-[0.5rem] rounded-[10px] text-[0.82rem] font-semibold flex items-center gap-[0.5rem] ${zoneResult.serviceable ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                          {zoneResult.serviceable ? (
                            <>
                              ✅ Delivery available — <strong>{zoneResult.zone?.name}</strong>
                              &nbsp;({zoneResult.zone?.estimatedDays})
                              &nbsp;·&nbsp;
                              {zoneResult.isFreeDelivery
                                ? <span className="text-green-700 font-extrabold">FREE Delivery 🎉</span>
                                : <span>Shipping: ₹{zoneResult.shippingCharge}</span>}
                              {zoneResult.freeDeliveryAbove && !zoneResult.isFreeDelivery && (
                                <span className="text-[0.75rem] text-green-600 ml-1">(Free above ₹{zoneResult.freeDeliveryAbove})</span>
                              )}
                            </>
                          ) : (
                            <>❌ {zoneResult.message || 'We do not deliver to this pincode yet.'}</>
                          )}
                        </div>
                      )}
                    </div>

                    <input name="street" required defaultValue={savedAddr?.street || user?.street || ''} type="text" placeholder="Street Address" className={`${inputCls} col-span-2`} />
                    <input name="apartment" defaultValue={savedAddr?.apartment || (user as any)?.apartment || ''} type="text" placeholder="Apartment, suite (optional)" className={`${inputCls} col-span-2`} />
                  </div>

                  {/* Save address checkbox */}
                  <label className="flex items-center gap-[0.6rem] mt-[0.8rem] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                      className="w-[16px] h-[16px] accent-forest cursor-pointer"
                    />
                    <span className="text-[0.85rem] text-[#555]">
                      Save this address for future orders
                      {savedAddr && <span className="ml-1 text-green-600 font-semibold">(address already saved ✓)</span>}
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={zoneResult?.serviceable === false}
                  className="w-full bg-forest text-white py-[1.1rem] rounded-[30px] font-extrabold text-[1rem] border-none cursor-pointer transition-all duration-300 hover:bg-[#3a6326] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment →
                </button>

                {zoneResult?.serviceable === false && (
                  <p className="text-center text-red-500 text-[0.85rem] -mt-[0.8rem]">Delivery not available for this pincode</p>
                )}
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="w-full md:w-2/5 bg-[#f9f6f0] p-[2rem] lg:p-[3rem] border-l border-[#eee] rounded-r-[24px]">
              <h3 className="text-[1.1rem] font-bold text-forest mb-[1.5rem]">Order Summary</h3>
              <div className="flex flex-col gap-[1rem] mb-[1.5rem] max-h-[280px] overflow-y-auto pr-[0.5rem]">
                {items.map(item => {
                  const priceNum = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
                  const itemTotal = (priceNum * item.quantity).toFixed(2).replace(/\.00$/, '');
                  return (
                    <div key={item.id} className="flex gap-[1rem] items-center">
                      <div className="relative flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-[55px] h-[55px] object-cover rounded-[10px] bg-white border border-[#eee]" />
                        <span className="absolute -top-[5px] -right-[5px] bg-[#e69b24] text-white text-[0.65rem] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-forest text-[0.85rem] leading-tight truncate">{item.name}</h4>
                        {item.unit && (
                          <span className="text-[#666] font-semibold text-[0.75rem] block mt-[1px]">
                            Pack: {item.unit.replace('/', '').trim()}
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-[#c88d22] flex-shrink-0">₹{itemTotal}</div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-[0.7rem] border-t border-[#ddd] pt-[1.2rem]">
                <div className="flex justify-between text-[0.9rem] text-[#666]"><span>Subtotal</span><span className="font-semibold text-forest">₹{subtotal}</span></div>
                <div className="flex justify-between text-[0.9rem] text-[#666]">
                  <span>Shipping {zoneResult?.zone && <span className="text-[0.75rem] text-[#999]">({zoneResult.zone.name})</span>}</span>
                  {shippingDisplay}
                </div>
                <div className="flex justify-between text-[1.15rem] font-black text-forest mt-[0.3rem] pt-[0.8rem] border-t border-[#ddd]"><span>Total</span><span>₹{total}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Payment ─── */}
        {step === 2 && (
          <div className="flex flex-col md:flex-row">
            {/* Left: Payment Method */}
            <div className="w-full md:w-3/5 p-[2rem] lg:p-[3rem]">
              {/* Header */}
              <div className="flex items-center justify-between mb-[2rem]">
                <div className="flex items-center gap-[1rem]">
                  <button onClick={() => setStep(1)}
                    className="px-[12px] py-[6px] rounded-[20px] bg-[#f5f5f5] flex items-center gap-[6px] text-forest font-bold hover:bg-[#eee] transition-colors border-none cursor-pointer text-[0.85rem]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                    Back
                  </button>
                  <h2 className="font-heading text-[1.8rem] font-black text-forest m-0">Payment</h2>
                </div>
                <button onClick={handleClose} className="w-[35px] h-[35px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-forest hover:bg-[#eee] transition-colors border-none cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 mb-[2rem]">
                <div className="flex items-center gap-1"><div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-bold">✓</div><span className="text-sm font-semibold text-green-600">Delivery</span></div>
                <div className="flex-1 h-[2px] bg-forest rounded-full" />
                <div className="flex items-center gap-1"><div className="w-6 h-6 rounded-full bg-forest text-white text-xs flex items-center justify-center font-bold">2</div><span className="text-sm font-semibold text-forest">Payment</span></div>
              </div>

              <h3 className="text-[1rem] font-bold text-forest mb-[1rem]">Choose Payment Method</h3>

              {/* Pay Online Card */}
              <label className={`flex items-start gap-[1rem] p-[1.2rem] border-2 rounded-[14px] cursor-pointer transition-all mb-[0.8rem] ${paymentMethod === 'razorpay' ? 'border-forest bg-[#f0f7ea]' : 'border-[#ddd] bg-white hover:border-forest/40'}`}>
                <input type="radio" name="pm" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} className="w-[18px] h-[18px] accent-forest mt-[2px]" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-[0.4rem] flex-wrap justify-between">
                    <span className="font-bold text-forest text-[0.95rem]">Pay Online</span>
                    <div className="flex items-center gap-[6px]">
                      <span className="bg-[#6b2575] text-[#ffd600] text-[0.62rem] font-black px-[6px] py-[2px] rounded-[4px] tracking-wide">PLUXEE</span>
                      <span className="bg-[#00b9f1] text-white text-[0.6rem] font-bold px-[6px] py-[2px] rounded-[4px]">UPI</span>
                      <span className="bg-[#1a1f71] text-white text-[0.6rem] font-bold px-[6px] py-[2px] rounded-[4px]">VISA</span>
                      <span className="bg-[#eb001b] text-white text-[0.6rem] font-bold px-[6px] py-[2px] rounded-[4px]">MC</span>
                    </div>
                  </div>
                  <p className="text-[0.82rem] text-[#666] m-0">Pluxee/Sodexo, Cards, UPI, Netbanking &amp; Wallets — Secured by Razorpay</p>
                </div>
              </label>

              {/* COD Card */}
              <label className={`flex items-start gap-[1rem] p-[1.2rem] border-2 rounded-[14px] cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-forest bg-[#f0f7ea]' : 'border-[#ddd] bg-white hover:border-forest/40'}`}>
                <input type="radio" name="pm" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-[18px] h-[18px] accent-forest mt-[2px]" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-[0.4rem]">
                    <span className="font-bold text-forest text-[0.95rem]">Cash on Delivery</span>
                    <span className="text-[1.1rem]">💵</span>
                  </div>
                  <p className="text-[0.82rem] text-[#666] m-0">Pay in cash when your order arrives</p>
                </div>
              </label>

              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full bg-forest text-white py-[1.1rem] rounded-[30px] font-extrabold text-[1rem] border-none cursor-pointer transition-all duration-300 hover:bg-[#3a6326] shadow-lg mt-[1.5rem] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <><svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>Processing...</>
                ) : (
                  paymentMethod === 'cod' ? `Place Order • ₹${total}` : `Pay ₹${total} →`
                )}
              </button>

              <p className="text-center text-[0.78rem] text-[#999] mt-[0.8rem]">🔒 Your payment is 100% secure &amp; encrypted</p>
            </div>

            {/* Right: Order Summary */}
            <div className="w-full md:w-2/5 bg-[#f9f6f0] p-[2rem] lg:p-[3rem] border-l border-[#eee] rounded-r-[24px]">
              <h3 className="text-[1.1rem] font-bold text-forest mb-[1.5rem]">Order Summary</h3>
              <div className="flex flex-col gap-[1rem] mb-[1.5rem] max-h-[280px] overflow-y-auto pr-[0.5rem]">
                {items.map(item => {
                  const priceNum = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
                  const itemTotal = (priceNum * item.quantity).toFixed(2).replace(/\.00$/, '');
                  return (
                    <div key={item.id} className="flex gap-[1rem] items-center">
                      <div className="relative flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-[55px] h-[55px] object-cover rounded-[10px] bg-white border border-[#eee]" />
                        <span className="absolute -top-[5px] -right-[5px] bg-[#e69b24] text-white text-[0.65rem] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-forest text-[0.85rem] leading-tight truncate">{item.name}</h4>
                        {item.unit && (
                          <span className="text-[#666] font-semibold text-[0.75rem] block mt-[1px]">
                            Pack: {item.unit.replace('/', '').trim()}
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-[#c88d22] flex-shrink-0">₹{itemTotal}</div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-[0.7rem] border-t border-[#ddd] pt-[1.2rem]">
                <div className="flex justify-between text-[0.9rem] text-[#666]"><span>Subtotal</span><span className="font-semibold text-forest">₹{subtotal}</span></div>
                <div className="flex justify-between text-[0.9rem] text-[#666]">
                  <span>Shipping {zoneResult?.zone && <span className="text-[0.75rem] text-[#999]">({zoneResult.zone.name})</span>}</span>
                  {shippingDisplay}
                </div>
                <div className="flex justify-between text-[1.15rem] font-black text-forest mt-[0.3rem] pt-[0.8rem] border-t border-[#ddd]"><span>Total</span><span>₹{total}</span></div>
              </div>

              {/* Delivery info */}
              {customerRef.current && (
                <div className="mt-[1.5rem] p-[1rem] bg-white rounded-[12px] border border-[#eee]">
                  <p className="text-[0.78rem] font-bold text-forest mb-[0.3rem] uppercase tracking-wide">Delivering to</p>
                  <p className="text-[0.85rem] text-[#555] m-0 font-semibold">{customerRef.current.name}</p>
                  <p className="text-[0.8rem] text-[#777] m-0">{customerRef.current.address}</p>
                  {zoneResult?.zone && (
                    <p className="text-[0.75rem] text-forest font-semibold mt-[0.3rem]">
                      📦 Est. Delivery: {zoneResult.zone.estimatedDays}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── STEP 3: Success ─── */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center p-[4rem] lg:p-[6rem] text-center">
            <div className="w-[90px] h-[90px] bg-green-100 rounded-full flex items-center justify-center mb-[2rem] animate-in zoom-in-50 duration-500">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-heading text-[2.5rem] font-black text-forest mb-[1rem]">Order Confirmed!</h2>
            <p className="text-[1.05rem] text-[#666] max-w-[380px] mx-auto mb-[2.5rem]">
              Thank you for choosing Sun Cured Savories. Your delicious solar dried treats will be on their way soon! 🌿
            </p>
            <button onClick={handleClose} className="bg-forest text-white px-[3rem] py-[1rem] rounded-[30px] font-bold text-[1.05rem] hover:bg-[#3a6326] transition-colors border-none cursor-pointer shadow-md">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
