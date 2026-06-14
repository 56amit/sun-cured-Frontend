import { useState, useEffect } from 'react';
import { fetchCategories } from '../api/categoryApi';
import type { UICategory } from '../api/categoryApi';

export function useCategories() {
  const [categories, setCategories] = useState<UICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const catData = await fetchCategories();

        const formattedCategories: UICategory[] = [
          { id: 'all', name: 'All', icon: '🌟' },
          ...catData.map(c => ({
            id: c.id,
            name: c.name,
            icon: '🌱'
          }))
        ];

        setCategories(formattedCategories);
      } catch (err: any) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { categories, loading, error };
}
