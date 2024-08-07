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
    fetchSearchProducts: (searchQuery: string, pageNumber: number, brandId?: string) => Promise<void>;
    fetchCategories: (brandId?: string) => Promise<void>;
    likeOrUnlikeProduct: (productId: string, timelineEvent?: string) => Promise<void>;
    isProductLiked: (productId: string) => boolean;
    likedProducts: { [key: string]: boolean };
    addOrRemoveProductToFavs: (productId: string, type: string) => Promise<void>;
    favedProducts: { [key: string]: boolean };
  }
  
  export const useProductStore = create<ProductState>((set, get) => ({
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
    likedProducts: {},
    favedProducts: {},
    

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
          response = await api.get(brandId ? `/product/brand/${brandId}` : `/product/`, {
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
  
    fetchSearchProducts: async (searchQuery, pageNumber, brandId: string = "") => {
      set({ searchLoading: true, searchError: null });
      try {
        let postBody: object = { product_name: searchQuery };
        if (brandId) {
          postBody = { product_brand_id: brandId, product_name: searchQuery };
        }

        const response = await api.post('/product/search/', postBody , {
          params: { page: pageNumber },
        });
  
        set((state) => ({
          searchProducts: pageNumber === 1 ? response.data.data : [...state.searchProducts, ...response.data.data],
          searchPagination: response.data.pagination,
          searchLoading: false,
        }));
      } catch (err) {
        console.error('Error searching products:', err);
        
        set({ searchLoading: false, searchError: err!.toString() });
      }
    },
  
    fetchCategories: async (brandId) => {
      set({ categoriesLoading: true, categoriesError: null });
      try {
        const response = await api.get(brandId ? `/product/category/brand/${brandId}` : `/product/categories`);
        set({
          categories: response.data.data,
          categoriesLoading: false,
        });
      } catch (err) {
        console.error('Error fetching categories:', err);
        set({ categoriesLoading: false, categoriesError: err!.toString() });
      }
    },

  likeOrUnlikeProduct: async (productId, timelineEvent) => {
    try {
      const response = timelineEvent
        ? await api.delete('product/event/', { data: { timeline_event: timelineEvent, product_id: productId } })
        : await api.put('product/event/', { product_id: productId });

      if (response.status === 200) {
        set((state) => ({
          ...state,
          likedProducts: {
            ...state.likedProducts,
            [productId]: !state.likedProducts[productId],
          },
        }));
      }

    } catch (err) {
      console.error('Error liking or unliking product:', err);
    }
  },

  isProductLiked: (productId) => {
    return !!get().likedProducts[productId];
  },

  addOrRemoveProductToFavs: async (productId, type) => {
    try {
      const res = type == "add" ?  await api.post('favourites/', { product_id: productId }) : 
                          await api.delete('favourites/', { data: { product_id: productId } })


      if (res.status=200){
        set((state) => ({
          ...state,
          favedProducts: {
            ...state.favedProducts,
            [productId]: !state.favedProducts[productId],
          },
        }));
      }
    } catch (err) {
      console.error('Error liking or unliking product:', err);
      set({ loading: false, error: err!.toString() });
    }
  }

}));