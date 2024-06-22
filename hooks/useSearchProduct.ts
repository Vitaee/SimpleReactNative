import { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiResponse, Product, Pagination } from '../constants/ProductType';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function useSearchProducts(searchQuery: string, pageNumber: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post<ApiResponse>(API_URL + '/product/search/', 
        {
          product_name: searchQuery,
        }, {
          params: { page: pageNumber },
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(prevProducts => 
          pageNumber === 1 ? response.data.data : [...prevProducts, ...response.data.data]
        );
        setPagination(response.data.pagination);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchProducts();
    }
  }, [searchQuery, pageNumber]);

  return { products, loading, error, pagination };
}