import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { getMyOrders, getOrderDetail, type OrderDetail } from '../api/orderApi';

// Status color helper
const getStatusStyle = (status: string) => {
  const s = (status || '').toLowerCase();
  if (s === 'delivered') return { bg: 'bg-green-100', text: 'text-green-700' };
  if (s === 'confirmed' || s === 'shipped') return { bg: 'bg-blue-100', text: 'text-blue-700' };
  if (s === 'cancelled') return { bg: 'bg-red-100', text: 'text-red-600' };
  return { bg: 'bg-amber-100', text: 'text-amber-700' };
};


export function UserProfileModal() {
  const { user, isProfileOpen, setProfileOpen, logout } = useAuthStore();
  const { addToCart, setIsOpen, clearCart } = useCartStore();

  const [fetchedOrders, setFetchedOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderError, setOrderError] = useState(false);

  // Order detail view state
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [reorderSuccess, setReorderSuccess] = useState(false);

  const fetchOrders = () => {
    setLoadingOrders(true);
    setOrderError(false);
    getMyOrders()
      .then((data) => {
        const formatted = data.map((o: any) => ({
          id: o.id,
          orderId: `ORD-${o.id}`,
          date: new Date(o.createdAt).toLocaleString('en-IN', {
            day: 'numeric', month: 'numeric', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true,
          }),
          total: o.totalAmount,
          status: o.status,
          paymentStatus: o.paymentStatus || 'pending',
          paymentGateway: o.paymentGateway,
        }));
        setFetchedOrders(formatted);
      })
      .catch(() => setOrderError(true))
      .finally(() => setLoadingOrders(false));
  };

  const handleViewDetails = async (orderId: number) => {
    setLoadingDetail(true);
    setSelectedOrder(null);
    try {
      const detail = await getOrderDetail(orderId);
      setSelectedOrder(detail);
    } catch {
      alert('Order details load nahi ho sake. Please retry.');
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleReorder = () => {
    if (!selectedOrder || !selectedOrder.items?.length) return;
    clearCart();
    selectedOrder.items.forEach((item) => {
      addToCart(
        {
          id: item.productId,
          name: item.productName || item.name || 'Product',
          description: '',
          price: String(item.priceAtPurchase),
          unit: item.weight || '',
          categoryId: 0,
          badge: '',
          badgeColor: '',
          image: item.productImage || '',
          variants: [],
        },
        item.quantity
      );
    });
    setReorderSuccess(true);
    setTimeout(() => {
      setReorderSuccess(false);
      setSelectedOrder(null);
      setProfileOpen(false);
      setIsOpen(true); // open cart drawer
    }, 1200);
  };

  useEffect(() => {
    if (!isProfileOpen || !user) return;
    fetchOrders();
    setSelectedOrder(null);
  }, [isProfileOpen]);

  if (!isProfileOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-[1rem]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => { setProfileOpen(false); setSelectedOrder(null); }}
      />

      {/* Main Modal */}
      <div className="bg-white w-full max-w-[620px] max-h-[92vh] overflow-y-auto rounded-[24px] shadow-2xl relative z-10 animate-in zoom-in-95 duration-300">

        {/* ── ORDER DETAIL VIEW ── */}
        {selectedOrder ? (
          <div className="p-[1.8rem] lg:p-[2.5rem]">
            {/* Header */}
            <div className="flex justify-between items-center mb-[1.5rem]">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex items-center gap-[0.4rem] text-forest font-bold text-[0.9rem] hover:underline bg-none border-none cursor-pointer p-0"
              >
                ← Back to Orders
              </button>
              <button
                onClick={() => { setProfileOpen(false); setSelectedOrder(null); }}
                className="w-[32px] h-[32px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-forest hover:bg-[#eee] transition-colors border-none cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Order ID + Status */}
            <div className="flex flex-wrap items-center justify-between gap-[0.8rem] mb-[1.2rem]">
              <div>
                <h2 className="font-heading text-[1.6rem] font-black text-forest m-0">
                  ORD-{selectedOrder.id}
                </h2>
                <p className="text-[0.8rem] text-[#888] mt-[0.2rem]">
                  {new Date(selectedOrder.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                </p>
              </div>
              <div className="flex gap-[0.5rem] flex-wrap">
                {(() => { const s = getStatusStyle(selectedOrder.status); return (
                  <span className={`${s.bg} ${s.text} text-[0.72rem] font-extrabold px-[10px] py-[4px] rounded-[20px] uppercase`}>
                    {selectedOrder.status}
                  </span>
                ); })()}
              </div>
            </div>

            {/* Delivery Address */}
            {selectedOrder.shippingAddress && (
              <div className="bg-[#f9f9f9] border border-[#eee] rounded-[14px] p-[1rem] mb-[1.2rem]">
                <p className="text-[0.75rem] font-extrabold uppercase tracking-wider text-[#888] mb-[0.3rem]">📍 Delivery Address</p>
                <p className="text-[0.9rem] font-semibold text-forest">{selectedOrder.shippingAddress}</p>
              </div>
            )}

            {/* Items List */}
            <div className="mb-[1.5rem]">
              <p className="text-[0.8rem] font-extrabold uppercase tracking-wider text-[#888] mb-[0.8rem]">🛍️ Items Ordered</p>
              <div className="flex flex-col gap-[0.8rem]">
                {(selectedOrder.items || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-[0.9rem] bg-[#f9f9f9] rounded-[14px] p-[0.8rem] border border-[#eee]">
                    {item.productImage ? (
                      <img
                        src={item.productImage}
                        alt={item.name}
                        className="w-[52px] h-[52px] object-cover rounded-[10px] shrink-0 border border-[#e5e5e5]"
                      />
                    ) : (
                      <div className="w-[52px] h-[52px] bg-[#e8f0e0] rounded-[10px] flex items-center justify-center text-[1.3rem] shrink-0">🥗</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-forest text-[0.9rem] truncate">{item.productName || item.name}</p>
                      {item.weight && <p className="text-[0.75rem] text-[#888]">Pack: {item.weight}</p>}
                      <p className="text-[0.75rem] text-[#888]">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-extrabold text-[#c88d22] text-[0.95rem]">₹{(item.priceAtPurchase * item.quantity).toFixed(0)}</p>
                      <p className="text-[0.7rem] text-[#aaa]">₹{item.priceAtPurchase} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="bg-[#f9f9f9] border border-[#eee] rounded-[14px] p-[1rem] mb-[1.5rem]">
              <div className="flex justify-between text-[0.85rem] text-[#666] mb-[0.4rem]">
                <span>Payment Method</span>
                <span className="font-semibold text-forest capitalize">{selectedOrder.paymentGateway === 'razorpay' ? '💳 Razorpay (Online)' : '💵 Cash on Delivery'}</span>
              </div>
              <div className="flex justify-between text-[0.85rem] text-[#666] mb-[0.4rem]">
                <span>Tax (GST)</span>
                <span className="font-semibold text-forest">₹{Number(selectedOrder.taxAmount || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[1rem] font-extrabold text-forest border-t border-[#e0e0e0] pt-[0.6rem] mt-[0.4rem]">
                <span>Grand Total</span>
                <span className="text-[#c88d22]">₹{Number(selectedOrder.totalAmount || 0).toFixed(2)}</span>
              </div>
            </div>

            {/* Reorder Button */}
            {reorderSuccess ? (
              <div className="w-full py-[1rem] bg-green-50 text-green-700 rounded-[30px] font-bold text-center text-[0.95rem] border border-green-200">
                ✅ Items added to cart! Opening cart...
              </div>
            ) : (
              <button
                onClick={handleReorder}
                className="w-full py-[1rem] bg-forest text-white rounded-[30px] font-bold text-[1rem] hover:bg-[#3a6326] transition-colors border-none cursor-pointer flex items-center justify-center gap-[0.5rem]"
              >
                🔄 Reorder — Add All Items to Cart
              </button>
            )}
          </div>
        ) : (
          /* ── PROFILE + ORDER LIST VIEW ── */
          <div className="p-[2rem] lg:p-[3rem]">
            {/* Header */}
            <div className="flex justify-between items-center mb-[2rem]">
              <h2 className="font-heading text-[2rem] font-black text-forest m-0">My Profile</h2>
              <button
                onClick={() => setProfileOpen(false)}
                className="w-[35px] h-[35px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-forest hover:bg-[#eee] transition-colors border-none cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-[2rem]">
              {/* User Details */}
              <div className="bg-[#f9f9f9] rounded-[16px] p-[1.5rem] border border-[#eee]">
                <h3 className="text-[1.1rem] font-bold text-forest mb-[1rem] flex items-center gap-[0.5rem]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Account Details
                </h3>
                <div className="grid grid-cols-2 gap-[1rem] text-[0.95rem]">
                  <div>
                    <span className="text-text-mid block text-[0.8rem] font-bold uppercase tracking-wider mb-[0.2rem]">Name</span>
                    <span className="font-bold text-forest">{user.firstName} {user.lastName}</span>
                  </div>
                  <div>
                    <span className="text-text-mid block text-[0.8rem] font-bold uppercase tracking-wider mb-[0.2rem]">Email</span>
                    <span className="font-bold text-forest break-all">{user.email}</span>
                  </div>
                  <div>
                    <span className="text-text-mid block text-[0.8rem] font-bold uppercase tracking-wider mb-[0.2rem]">Phone</span>
                    <span className="font-bold text-forest">{user.phone}</span>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div>
                <h3 className="text-[1.1rem] font-bold text-forest mb-[1rem] flex items-center gap-[0.5rem]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Order History
                </h3>

                {loadingOrders ? (
                  <div className="text-center py-[2rem] bg-[#f9f9f9] rounded-[16px] border border-[#eee] text-text-mid">
                    Loading orders...
                  </div>
                ) : orderError ? (
                  <div className="text-center py-[2rem] bg-[#fff5f5] rounded-[16px] border border-[#fcc] text-red-500">
                    <p className="mb-[0.8rem] text-[0.9rem]">Could not load orders. Please try again.</p>
                    <button onClick={fetchOrders} className="bg-forest text-white px-[1.2rem] py-[0.5rem] rounded-[20px] text-[0.85rem] font-bold border-none cursor-pointer hover:bg-[#3a6326]">
                      Retry
                    </button>
                  </div>
                ) : fetchedOrders.length === 0 ? (
                  <div className="text-center py-[2rem] bg-[#f9f9f9] rounded-[16px] border border-[#eee] text-text-mid">
                    No orders yet.
                  </div>
                ) : (
                  <div className="flex flex-col gap-[0.8rem]">
                    {fetchedOrders.map((order) => {
                      const statusStyle = getStatusStyle(order.status);
                      return (
                        <div
                          key={order.id}
                          className="bg-white border border-[#eee] rounded-[16px] p-[1rem] shadow-sm hover:border-[#c5d9b8] hover:shadow-md transition-all"
                        >
                          {/* Top row */}
                          <div className="flex items-start justify-between gap-[0.5rem] mb-[0.7rem]">
                            <div>
                              <div className="font-bold text-forest text-[0.95rem]">{order.orderId}</div>
                              <div className="text-[0.78rem] text-text-mid mt-[0.1rem]">{order.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-extrabold text-[#c88d22] text-[1rem]">₹{order.total}</div>
                            </div>
                          </div>

                          {/* Status badge — only order status, no payment badge */}
                          <div className="flex flex-wrap items-center gap-[0.4rem] mb-[0.8rem]">
                            <span className={`${statusStyle.bg} ${statusStyle.text} text-[0.68rem] font-extrabold px-[8px] py-[3px] rounded-[12px] uppercase`}>
                              {order.status}
                            </span>
                          </div>

                          {/* View Details Button */}
                          <button
                            onClick={() => handleViewDetails(order.id)}
                            disabled={loadingDetail}
                            className="w-full py-[0.55rem] bg-[#f0f5eb] text-forest font-bold text-[0.85rem] rounded-[20px] border-none cursor-pointer hover:bg-[#dcecd0] transition-colors flex items-center justify-center gap-[0.4rem] disabled:opacity-60"
                          >
                            {loadingDetail ? '⏳ Loading...' : '📦 View Details & Reorder'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Sign Out */}
              <button
                onClick={() => { logout(); setProfileOpen(false); }}
                className="w-full mt-[0.5rem] bg-red-50 text-red-500 py-[1rem] rounded-[30px] font-bold text-[1rem] hover:bg-red-100 transition-colors border-none cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
