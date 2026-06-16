import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { getApprovedTestimonials, type TestimonialResponse } from '../api/testimonialApi';

// Star Icon component for reuse
const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#e69b24" xmlns="http://www.w3.org/2000/svg" className="inline-block">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export function Testimonials() {
  const { user, setReviewModalOpen } = useAuthStore();
  const [testimonials, setTestimonials] = useState<TestimonialResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getApprovedTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to load testimonials", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="bg-white py-[100px] lg:py-[120px] px-[5%] lg:px-[8%]" id="testimonials">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-[4rem] gap-[2rem]">
        <div className="max-w-[700px]">
          <span className="inline-block text-[#7b9c66] text-[0.85rem] font-bold tracking-[0.15em] uppercase mb-[0.8rem]">
            CUSTOMER LOVE
          </span>
          <h2 className="font-heading text-[clamp(2.2rem,4vw,3.5rem)] font-black text-forest leading-[1.2]">
            What Our Customers Say
          </h2>
        </div>
        
        {user ? (
          <button 
            onClick={() => setReviewModalOpen(true)}
            className="bg-[#f0ece1] text-forest border-2 border-forest/20 px-[1.5rem] py-[0.8rem] rounded-[30px] font-bold cursor-pointer hover:bg-forest hover:text-white hover:border-forest transition-colors duration-300"
          >
            Write a Review
          </button>
        ) : (
          <p className="text-[0.9rem] text-text-mid italic">
            Sign in to share your experience
          </p>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-[2rem] text-forest font-bold">Loading reviews...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-[4rem] bg-[#fdfaf1] rounded-[24px] border border-[#487c2f11]">
          <p className="text-text-mid italic">No reviews yet. Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
          {testimonials.map(testimonial => (
            <div 
              key={testimonial.id}
              className="bg-[#fdfaf1] p-[2.5rem] rounded-[24px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-[#487c2f11]"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-[4px] mb-[1.5rem]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-[1rem] text-text-mid leading-relaxed italic mb-[2rem]">
                  "{testimonial.content}"
                </p>
              </div>
              
              {/* Author */}
              <div className="mt-auto">
                <h4 className="text-[1.1rem] font-extrabold text-forest mb-[0.2rem]">
                  {testimonial.user.firstName} {testimonial.user.lastName}
                </h4>
                <p className="text-[0.85rem] text-text-mid">
                  Verified Buyer
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
