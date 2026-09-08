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

        const formattedProducts: UIProduct[] = prodData.map(p => {
          const rawVariants = p.variants && p.variants.length > 0
            ? p.variants
            : [{ id: p.id, productId: p.id, weight: p.weight || '100g', price: p.price }];

          const formattedVariants = rawVariants.map(v => {
            const cleanWeight = (v.weight || '100g').replace(/gm$/i, 'g').trim();
            return {
              id: v.id,
              productId: v.productId || p.id,
              weight: cleanWeight,
              price: v.price,
              formattedPrice: `₹${v.price}`,
              unit: `/${cleanWeight}`,
            };
          });

          const primaryVariant = formattedVariants[0];

          return {
            id: p.id,
            name: p.name,
            description: p.desc || 'No description available.',
            price: primaryVariant.formattedPrice,
            unit: primaryVariant.unit,
            categoryId: p.catId,
            badge: '🌿 Natural',
            badgeColor: 'bg-forest',
            image: p.img || `https://placehold.co/600x600/fdfaf1/487c2f?text=${encodeURIComponent(p.name)}`,
            variants: formattedVariants,
          };
        });

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
