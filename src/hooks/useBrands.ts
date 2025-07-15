import { useState, useEffect } from 'react';
import { Brand } from '../types/Brand';
import { NotionBrandService } from '../lib/notion';

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedBrands = await NotionBrandService.getAllBrands();
      setBrands(fetchedBrands);
    } catch (err) {
      setError('Failed to fetch brands from Notion');
      console.error('Error fetching brands:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return {
    brands,
    loading,
    error,
    refetch: fetchBrands
  };
};