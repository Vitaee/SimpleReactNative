import { create } from 'zustand';
import api from '../../services/api'; // Ensure to import your api instance
import { Pagination, Product } from '@/constants/ProductType';
import { ProductCategory } from '@/constants/ProductCategoriesType';


interface ProductState {
    products: Product[];
    loading: boolean;
    error: Error | null | unknown;
    pagination: Pagination | null;
    searchProducts: Product[];
    searchLoading: boolean;
    searchError: Error | null | unknown;
    searchPagination: Pagination | null;
    categories: ProductCategory[];
    categoriesLoading: boolean;
    categoriesError: Error | null | unknown;
    fetchProducts: (pageNumber: number, brandId?: string, selectedCategory?: string) => Promise<void>;
    fetchSearchProducts: (searchQuery: string, pageNumber: number) => Promise<void>;
    fetchCategories: (brandId?: string) => Promise<void>;
  }
  
  export const useProductStore = create<ProductState>((set) => ({
    products: [],
    loading: false,
    error: null,
    pagination: null,
    searchProducts: [],
    searchLoading: false,
    searchError: null,
    searchPagination: null,
    categories: [],
    categoriesLoading: false,
    categoriesError: null,

  fetchProducts: async (pageNumber, brandId, selectedCategory) => {
    set({ loading: true, error: null });
    try {
      let response;
      if (selectedCategory) {
        if (brandId) {
          response = await api.get(`/product/category/${brandId}/${selectedCategory}/`, {
            params: { page: pageNumber },
          });
        } else {
          response = await api.get(`/product/category/${selectedCategory}/`, {
            params: { page: pageNumber },
          });
        }
      } else {
        response = await api.get(brandId 
          ? `/product/brand/${brandId}` 
          : `/product/`, {
          params: { page: pageNumber },
        });
      }

      set((state) => ({
        products: pageNumber === 1 ? response.data.data : [...state.products, ...response.data.data],
        pagination: response.data.pagination,
        loading: false,
      }));
    } catch (err) {
      console.error('Error fetching products:', err);
      set({ loading: false, error: err!.toString() });
    }
  },

  fetchSearchProducts: async (searchQuery, pageNumber) => {
    set({ searchLoading: true, searchError: null });
    try {
      const response = await api.post('/product/search/', {
        product_name: searchQuery,
      }, {
        params: { page: pageNumber },
      });

      set((state) => ({
        searchProducts: pageNumber === 1 ? response.data.data : [...state.searchProducts, ...response.data.data],
        searchPagination: response.data.pagination,
        searchLoading: false,
      }));
    } catch (err) {
      console.error('Error fetching search results:', err);
      set({ searchLoading: false, searchError: err });
    }
  },

  fetchCategories: async (brandId) => {
    set({ categoriesLoading: true, categoriesError: null });
    try {
      const response = await api.get(brandId ? `product/category/brand/${brandId}` : `/product/categories`);
      if (response.data.success) {
        const fetchedCategories: ProductCategory[] = [];

        response.data.data.forEach((category: { product_category: string }, index: number) => {
          fetchedCategories.push({
            id: index.toString(),
            name: category.product_category,
            icon: 'apps-outline',
          });
        });
        set({
          categories: [{ id: '-1', name: 'Tümü', icon: 'apps-outline' }, ...fetchedCategories],
          categoriesLoading: false,
        });
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      set({ categoriesLoading: false, categoriesError: err });
    }
  },
}));