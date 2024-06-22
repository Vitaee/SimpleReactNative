import { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiResponse, Product, Pagination } from '../constants/ProductType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';


export function useProducts(pageNumber: number, searchQuery: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get<ApiResponse>(API_URL + '/product/', {
          params: {
            page: pageNumber,
            query: searchQuery,
          },
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

    fetchProducts();
  }, [pageNumber, searchQuery]);

  return { products, loading, error, pagination };
}
