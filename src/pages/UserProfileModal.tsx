import { useAuthStore } from '../store/authStore';


export function UserProfileModal() {
  const { user, orders, isProfileOpen, setProfileOpen, logout } = useAuthStore();

  if (!isProfileOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-[1rem]">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setProfileOpen(false)}
      />

      <div className="bg-white w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-[24px] shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 p-[2rem] lg:p-[3rem]">
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
                <span className="font-bold text-forest">{user.email}</span>
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
            
            {orders.length === 0 ? (
              <div className="text-center py-[2rem] bg-[#f9f9f9] rounded-[16px] border border-[#eee] text-text-mid">
                No orders yet.
              </div>
            ) : (
              <div className="flex flex-col gap-[1rem]">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white border border-[#eee] rounded-[16px] p-[1rem] flex items-center justify-between shadow-sm">
                    <div>
                      <div className="font-bold text-forest text-[0.9rem] mb-[0.2rem]">{order.id}</div>
                      <div className="text-[0.8rem] text-text-mid">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-[#c88d22] mb-[0.2rem]">₹{order.total}</div>
                      <span className="bg-green-100 text-green-700 text-[0.7rem] font-bold px-[8px] py-[3px] rounded-[12px] uppercase">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => {
              logout();
              setProfileOpen(false);
            }}
            className="w-full mt-[1rem] bg-red-50 text-red-500 py-[1rem] rounded-[30px] font-bold text-[1rem] hover:bg-red-100 transition-colors border-none cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
