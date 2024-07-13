import { useState, useEffect } from 'react';
import { ProductApiResponse, Product, Pagination } from '../constants/ProductType';
import api from '@/src/services/api';


export function useSearchProducts(searchQuery: string, pageNumber: number) {
  const [searchProducts, setProducts] = useState<Product[]>([]);
  const [searchLoading, setLoading] = useState(true);
  const [searchError, setError] = useState<Error | null>(null);
  const [searchPagination, setPagination] = useState<Pagination | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.post<ProductApiResponse>('/product/search/', 
        {
          product_name: searchQuery,
        }, {
          params: { page: pageNumber },
        });
        setProducts(prevProducts =>  pageNumber === 1 ? response.data.data : [...prevProducts, ...response.data.data] );
        setPagination(response.data.pagination);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if(searchQuery){
      fetchProducts();
    }
    
  }, [searchQuery, pageNumber]);
  return { searchProducts, searchLoading, searchError, searchPagination };
}