import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { submitTestimonial } from '../api/testimonialApi';
import { toast } from 'sonner';

export function ReviewModal() {
  const { user, isReviewModalOpen, setReviewModalOpen } = useAuthStore();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isReviewModalOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("Review content cannot be empty.");

    try {
      setIsSubmitting(true);
      // user object doesn't have an ID directly as a number in frontend type if not careful, 
      // but wait, we need userId. Let's pass user.id if it exists, else we might need to fetch it from token.
      // Assuming user has an `id` field since we added it in login response!
      const userId = (user as any).id;
      
      await submitTestimonial({
        userId: parseInt(userId, 10),
        rating,
        content
      });

      toast.success("Thank you! Your review has been submitted for approval.");
      setReviewModalOpen(false);
      setContent('');
      setRating(5);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-[1rem]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setReviewModalOpen(false)}
      />

      {/* Modal Content */}
      <div className="bg-white w-full max-w-[500px] rounded-[24px] shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 p-[2rem] lg:p-[3rem]">
        
        <div className="flex justify-between items-center mb-[1.5rem]">
          <h2 className="font-heading text-[2rem] font-black text-forest m-0">Write a Review</h2>
          <button 
            onClick={() => setReviewModalOpen(false)}
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
            <label className="block text-[0.95rem] font-bold text-forest mb-[0.5rem]">Your Rating</label>
            <div className="flex gap-[0.5rem]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="bg-transparent border-none p-0 cursor-pointer focus:outline-none transition-transform hover:scale-110"
                >
                  <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill={star <= rating ? "#e69b24" : "#eee"} 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[0.95rem] font-bold text-forest mb-[0.5rem]">Your Review</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell us what you liked..."
              className="w-full px-[1rem] py-[0.8rem] rounded-[12px] border border-[#ddd] focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-all resize-y min-h-[120px] font-sans"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-forest text-white py-[1.2rem] rounded-[30px] font-extrabold text-[1.1rem] border-none cursor-pointer transition-all duration-300 hover:bg-[#3a6326] shadow-lg disabled:opacity-50 mt-[0.5rem]"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>

      </div>
    </div>
  );
}
