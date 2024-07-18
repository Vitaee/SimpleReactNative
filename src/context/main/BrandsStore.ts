import { create } from 'zustand';
import api from '../../services/api'; // Ensure to import your api instance

interface Brand {
  count: number;
  brand_name: string;
  brand_logo: string;
  brand_id: string;
}

interface BrandState {
  brands: Brand[];
  loading: boolean;
  error: string | null;
  fetchBrands: () => Promise<void>;
}

export const useBrandStore = create<BrandState>((set) => ({
  brands: [],
  loading: false,
  error: null,
  
  fetchBrands: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/product/brand/discounts/');
      if (response.data.success) {
        set({ brands: response.data.data, loading: false });
      } else {
        set({ loading: false, error: 'Failed to fetch brands' });
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
      set({ loading: false, error: 'Error fetching brands' });
    }
  },
}));