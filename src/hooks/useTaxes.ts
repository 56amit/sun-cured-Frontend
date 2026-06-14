import { useState, useEffect } from 'react';
import { fetchTaxes } from '../api/taxApi';
import type { Tax } from '../api/taxApi';

export function useTaxes() {
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchTaxes();
        setTaxes(data);
      } catch (err: any) {
        setError(err.message || "Failed to load taxes");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { taxes, loading, error };
}
