import React, { useState } from 'react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Beetroot Chips',
    description: 'Solar-dried beetroot crisps — rich in iron, antioxidants & natural colour. Guilt-free crunch.',
    price: '₹199',
    unit: '/150g',
    category: 'Chips & Snacks',
    badge: '🌿 Natural',
    badgeColor: 'bg-forest',
    image: 'https://placehold.co/600x600/fdfaf1/487c2f?text=Beetroot+Chips', 
  },
  {
    id: 2,
    name: 'Beetroot Aam Panna Premix',
    description: 'Traditional Aam Panna with the power of Beetroot. No sugar, no chemicals. Stay cool naturally.',
    price: '₹249',
    unit: '/200g',
    category: 'Premixes',
    badge: '⭐ Bestseller',
    badgeColor: 'bg-[#e69b24]',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop', 
  },
  {
    id: 3,
    name: 'Dried Mango Slices',
    description: 'Sweet, chewy sun-dried mango — no added sugar, maximum natural flavour retained.',
    price: '₹179',
    unit: '/100g',
    category: 'Chips & Snacks',
    badge: '🌿 Natural',
    badgeColor: 'bg-forest',
    image: 'https://placehold.co/600x600/fdfaf1/487c2f?text=Mango+Slices', 
  },
  {
    id: 4,
    name: 'Sun-Dried Banana Chips',
    description: 'Naturally sweet banana slices, solar-dried to perfection. Rich in potassium & fibre.',
    price: '₹149',
    unit: '/150g',
    category: 'Chips & Snacks',
    badge: '🌿 Natural',
    badgeColor: 'bg-forest',
    image: 'https://placehold.co/600x600/fdfaf1/487c2f?text=Banana+Chips', 
  },
  {
    id: 5,
    name: 'Solar Dried Garlic Powder',
    description: 'Pure, additive-free garlic powder — intense flavour, immunity-boosting, ideal for cooking.',
    price: '₹129',
    unit: '/100g',
    category: 'Powders',
    badge: '🌿 Natural',
    badgeColor: 'bg-forest',
    image: 'https://placehold.co/600x600/fdfaf1/487c2f?text=Garlic+Powder', 
  }
];

const CATEGORIES = ['All', 'Chips & Snacks', 'Premixes', 'Powders'];

export function Products() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProducts = activeTab === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeTab);

  return (
    <section className="bg-cream py-[80px] lg:py-[120px] px-[5%] lg:px-[8%]" id="products">
      
      {/* Header & Tabs */}
      <div className="flex flex-wrap justify-between items-end mb-[3rem] gap-[1.5rem]">
        <div>
          <span className="inline-block text-[#7b9c66] text-[0.85rem] font-bold tracking-[0.12em] uppercase mb-[0.8rem]">
            OUR PRODUCTS
          </span>
          <h2 className="font-heading text-[clamp(2.2rem,4vw,3.8rem)] font-black text-forest leading-[1.1]">
            Sun-Dried.<br/>Solar Powered.
          </h2>
        </div>
        
        <div className="flex gap-[1rem] flex-wrap">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-[1.4rem] py-[0.6rem] rounded-[30px] text-[0.85rem] font-bold transition-all duration-200 border border-[#487c2f33] ${
                activeTab === category 
                  ? 'bg-forest text-white' 
                  : 'bg-transparent text-forest hover:bg-forest hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[1.5rem]">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-white border border-[#eee] rounded-[24px] p-[1rem] lg:p-[1.2rem] relative transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#487c2f33] flex flex-col h-full"
          >
            {/* Badge */}
            <span className={`absolute top-[1.5rem] left-[1.5rem] ${product.badgeColor} px-[12px] py-[5px] rounded-[20px] text-[0.7rem] font-bold text-white z-10 shadow-sm`}>
              {product.badge}
            </span>
            
            {/* Image */}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full aspect-square lg:h-[200px] object-cover rounded-[16px] mb-[1.2rem] bg-[#f9f9f9]"
            />
            
            {/* Content */}
            <h3 className="text-[1.1rem] lg:text-[1.2rem] font-extrabold text-forest mb-[0.4rem]">
              {product.name}
            </h3>
            <p className="text-[0.8rem] text-text-mid mb-[1.5rem] leading-relaxed">
              {product.description}
            </p>
            
            {/* Price Row */}
            <div className="flex justify-between items-center mt-auto">
              <span className="text-[1.1rem] font-extrabold text-[#c88d22]">
                {product.price} <span className="text-[0.75rem] font-medium text-text-mid">{product.unit}</span>
              </span>
              <button className="bg-forest text-white px-[1rem] py-[0.5rem] rounded-[20px] flex justify-center items-center text-[0.85rem] font-bold border-none cursor-pointer transition-all duration-200 hover:bg-[#3a6326] shadow-sm">
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
