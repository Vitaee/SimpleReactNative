import { useState, useEffect } from 'react';
import { ProductApiResponse, Product, Pagination } from '../constants/ProductType';
import api from '@/src/services/api';


export function useCategoryProducts(category: string, pageNumber: number,  brandId?: any) {
  const [categoryProducts, setProducts] = useState<Product[]>([]);
  const [categoryLoading, setLoading] = useState(true);
  const [categoryError, setError] = useState<Error | null>(null);
  const [categoryPagination, setPagination] = useState<Pagination | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '';
        brandId ? url = `product/category/${brandId}/${category}/` 
            : url = `/product/category/${category}/`;

        const response = await api.get<ProductApiResponse>(url, 
        {
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

    if(category){
      fetchProducts();
    }
    
  }, [category, brandId, pageNumber]);
  return { categoryProducts, categoryLoading, categoryError, categoryPagination };
}