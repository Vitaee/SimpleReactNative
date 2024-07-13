import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductApiResponse, Product, Pagination } from '../constants/ProductType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/src/services/api';


export function useProducts(pageNumber: number, brandId?: any, selectedCategory?:string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedCategory) {
          response = await api.get(`product/category/${brandId}/${selectedCategory}/`, {
            params: { page: pageNumber },
          });
        } else {
          response = await api.get(brandId 
            ? `/product/brand/${brandId}` 
            : `/product/`, {
            params: {
              page: pageNumber,
              category: selectedCategory
            }});
        }
        
        setProducts(prevProducts =>  pageNumber === 1 ? response.data.data : [...prevProducts, ...response.data.data] );
        //setProducts(response.data.data);
        setPagination(response.data.pagination);
      } catch (err) {
        console.log(err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [pageNumber, brandId, selectedCategory]);

  return { products, loading, error, pagination };
}

