import { useState } from 'react';
import { CategoryCards } from './Category';
import { ProductModal } from './ProductModal';
import { useCartStore } from '../store/cartStore';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import type { UIProduct } from '../api/productApi';
import { toast } from 'sonner';

// Interfaces for backend integration
export interface Category {
  id: string | number;
  name: string;
  icon: string;
}

export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: string;
  unit: string;
  category: string;
  badge: string;
  badgeColor: string;
  image: string;
}



export function Products() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<UIProduct | null>(null);
  
  // Custom hooks
  const { categories, loading: catLoading } = useCategories();
  const { products, loading: prodLoading } = useProducts();
  
  const loading = catLoading || prodLoading;
  
  // Get cart items and actions to show badge/counter on added products
  const cartItems = useCartStore(state => state.items);
  const addToCart = useCartStore(state => state.addToCart);
  const updateQuantity = useCartStore(state => state.updateQuantity);

  const filteredProducts = products.filter(p => {
    const cat = categories.find(c => c.id === p.categoryId);
    const catName = cat ? cat.name : 'Unknown';
    const matchesTab = activeTab === 'All' || catName === activeTab;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section className="bg-cream py-[40px] lg:py-[60px] px-[5%] lg:px-[8%]" id="products">
      
      {/* Header & Tabs */}
      <div className="flex flex-col mb-[2rem]">
        {/* Tabs moved above */}
        <CategoryCards 
          categories={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          loading={loading}
        />
        

        
        <div>
          <span className="inline-block text-[#7b9c66] text-[0.85rem] font-bold tracking-[0.12em] uppercase mb-[0.8rem]">
            OUR PRODUCTS
          </span>
          <h2 className="font-heading text-[clamp(2.2rem,4vw,3.8rem)] font-black text-forest leading-[1.1]">
            Sun-Dried.<br/>Solar Powered.
          </h2>
        </div>
      </div>

      {/* Sticky Search Bar */}
      <div className="sticky top-[70px] z-30 bg-cream py-[15px] flex justify-center mb-[2rem] border-b border-[#eee]">
        <div className="relative w-full max-w-[700px]">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-[1.8rem] py-[1.2rem] text-[1.1rem] rounded-[40px] border border-[#ddd] focus:border-forest focus:ring-2 focus:ring-forest outline-none transition-all pl-[4rem] shadow-sm bg-white"
          />
          <svg className="absolute left-[1.5rem] top-1/2 transform -translate-y-1/2 text-text-mid" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[2rem]">
        {filteredProducts.map(product => {
          const cartItem = cartItems.find(item => item.id === product.id);
          const quantityInCart = cartItem ? cartItem.quantity : 0;
          
          return (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              className="cursor-pointer bg-white border border-[#eee] rounded-[24px] p-[1rem] lg:p-[1.2rem] relative transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#487c2f33] flex flex-col h-full"
            >
              {/* Badge */}
              <span className={`absolute top-[1.5rem] left-[1.5rem] ${product.badgeColor} px-[12px] py-[5px] rounded-[20px] text-[0.7rem] font-bold text-white z-10 shadow-sm`}>
                {product.badge}
              </span>

              {/* Added to Cart Counter Badge */}
              {quantityInCart > 0 && (
                <span className="absolute top-[1.5rem] right-[1.5rem] bg-[#e69b24] px-[12px] py-[5px] rounded-[20px] text-[0.7rem] font-bold text-white z-10 shadow-sm border-[2px] border-white flex items-center gap-[4px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {quantityInCart} added
                </span>
              )}
              
              {/* Image */}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full aspect-square lg:h-[200px] object-cover rounded-[16px] mb-[1.2rem] bg-[#f9f9f9]"
              />
              
              {/* Content */}
              <div className="text-[#7b9c66] text-[0.7rem] font-extrabold tracking-[0.1em] uppercase mb-[0.4rem]">
                {categories.find(c => c.id === product.categoryId)?.name || 'Unknown'}
              </div>
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
                
                {quantityInCart > 0 ? (
                  <div 
                    className="flex items-center gap-[0.5rem] bg-[#f5f5f5] rounded-[20px] p-[0.2rem] shadow-inner" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button 
                      onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                      className="w-[28px] h-[28px] rounded-full bg-white shadow-sm flex items-center justify-center text-forest font-bold hover:bg-[#eee] transition-colors cursor-pointer border-none"
                    >
                      -
                    </button>
                    <span className="w-[20px] text-center font-bold text-[0.95rem] text-forest">{quantityInCart}</span>
                    <button 
                      onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                      className="w-[28px] h-[28px] rounded-full bg-white shadow-sm flex items-center justify-center text-forest font-bold hover:bg-[#eee] transition-colors cursor-pointer border-none"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1);
                      toast.success(`Added ${product.name} to cart`);
                    }}
                    className="bg-forest text-white px-[1rem] py-[0.5rem] rounded-[20px] flex justify-center items-center gap-[0.4rem] text-[0.85rem] font-bold border-none cursor-pointer transition-all duration-200 hover:bg-[#3a6326] shadow-sm"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Add
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ProductModal 
        product={selectedProduct} 
        categoryName={selectedProduct ? (categories.find(c => c.id === selectedProduct.categoryId)?.name || 'Unknown') : undefined}
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
}
