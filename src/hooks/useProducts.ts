import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productApi';
import type { UIProduct } from '../api/productApi';

export function useProducts() {
  const [products, setProducts] = useState<UIProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const prodData = await fetchProducts();

        const formattedProducts: UIProduct[] = prodData.map(p => ({
          id: p.id,
          name: p.name,
          description: p.desc || 'No description available.',
          price: `₹${p.price}`,
          unit: p.weight ? `/${p.weight}` : '',
          categoryId: p.catId,
          badge: '🌿 Natural',
          badgeColor: 'bg-forest',
          image: p.img || `https://placehold.co/600x600/fdfaf1/487c2f?text=${encodeURIComponent(p.name)}`,
        }));

        setProducts(formattedProducts);
      } catch (err: any) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { products, loading, error };
}
