import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';
import { loginUser, registerUser } from '../api/authApi';

export function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, login, checkAuth } = useAuthStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      let result;
      if (mode === 'register') {
        result = await registerUser(data);
        toast.success(`Welcome, ${result.user.firstName}! Account created.`);
      } else {
        result = await loginUser(data);
        toast.success(`Welcome back, ${result.user.firstName}!`);
      }
      
      // Store token
      localStorage.setItem('token', result.token);
      
      // Update store
      login(result.user);
      
      // Fetch orders immediately
      checkAuth();
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-[1rem]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setAuthModalOpen(false)}
      />

      {/* Modal */}
      <div className="bg-white w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-[24px] shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 p-[2rem] lg:p-[3rem]">
        
        <div className="flex justify-between items-center mb-[2rem]">
          <h2 className="font-heading text-[2rem] font-black text-forest m-0">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button 
            onClick={() => setAuthModalOpen(false)}
            className="w-[35px] h-[35px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-forest hover:bg-[#eee] transition-colors border-none cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[1rem]">
          
          {mode === 'register' && (
            <>
              <div className="grid grid-cols-2 gap-[1rem]">
                <input required name="firstName" type="text" placeholder="First Name" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all" />
                <input required name="lastName" type="text" placeholder="Last Name" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all" />
              </div>
              <input required name="phone" type="tel" placeholder="Phone Number" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all" />
              
              <div className="border-t border-[#eee] pt-[1rem] mt-[0.5rem]">
                <h4 className="text-[0.9rem] font-bold text-forest mb-[0.5rem]">Shipping Address (Optional)</h4>
                <div className="flex flex-col gap-[1rem]">
                  <input name="street" type="text" placeholder="Street Address" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all" />
                  <div className="grid grid-cols-2 gap-[1rem]">
                    <input name="city" type="text" placeholder="City" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all" />
                    <input name="zip" type="text" placeholder="Postal Code" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all" />
                  </div>
                  <input name="state" type="text" placeholder="State" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all" />
                </div>
              </div>
            </>
          )}

          <input required name="email" type="email" placeholder="Email Address" className="px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all mt-[0.5rem]" />
          
          <div className="relative">
            <input required name="password" type={showPassword ? "text" : "password"} placeholder="Password" className="w-full px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all pr-[2.5rem]" />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-forest bg-transparent border-none cursor-pointer p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>

          <button type="submit" className="w-full bg-forest text-white py-[1.2rem] rounded-[30px] font-extrabold text-[1.1rem] border-none cursor-pointer transition-all duration-300 hover:bg-[#3a6326] shadow-lg mt-[1rem]">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-[1.5rem] text-[0.95rem] text-text-mid">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setMode('register')} className="text-forest font-bold bg-transparent border-none cursor-pointer hover:underline p-0">Register here</button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-forest font-bold bg-transparent border-none cursor-pointer hover:underline p-0">Sign In</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
