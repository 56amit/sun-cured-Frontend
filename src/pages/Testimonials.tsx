import React from 'react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The Beetroot Aam Panna premix is absolutely incredible! My kids love it and I love that there's no sugar. Best summer drink ever.",
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5
  },
  {
    id: 2,
    quote: "Finally found a snack brand that takes health seriously. The beetroot chips are super crispy and the solar-dried process makes it even better.",
    name: "Rahul Mehta",
    location: "Mumbai",
    rating: 5
  },
  {
    id: 3,
    quote: "Love the concept and the taste. The dried mango slices are my favourite — natural sweetness, great texture. Will definitely order again!",
    name: "Anjali Nair",
    location: "Bangalore",
    rating: 5
  }
];

// Star Icon component for reuse
const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#e69b24" xmlns="http://www.w3.org/2000/svg" className="inline-block">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export function Testimonials() {
  return (
    <section className="bg-white py-[100px] lg:py-[120px] px-[5%] lg:px-[8%]" id="testimonials">
      
      {/* Header */}
      <div className="text-center max-w-[700px] mx-auto mb-[4rem]">
        <span className="inline-block text-[#7b9c66] text-[0.85rem] font-bold tracking-[0.15em] uppercase mb-[0.8rem]">
          CUSTOMER LOVE
        </span>
        <h2 className="font-heading text-[clamp(2.2rem,4vw,3.5rem)] font-black text-forest leading-[1.2]">
          What Our Customers Say
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
        {TESTIMONIALS.map(testimonial => (
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
                "{testimonial.quote}"
              </p>
            </div>
            
            {/* Author */}
            <div className="mt-auto">
              <h4 className="text-[1.1rem] font-extrabold text-forest mb-[0.2rem]">
                {testimonial.name}
              </h4>
              <p className="text-[0.85rem] text-text-mid">
                {testimonial.location}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
