import { useState, useEffect } from 'react';
import api from '../src/services/api'
import { ProductCategory, ProductCategoryApiResponse, ProductCategoryByBrand } from '@/constants/ProductCategoriesType';


export function useProductCategories(brandId?: any) {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [categoriesLoading, setLoading] = useState(true);
    const [categoriesError, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
                try {
                    console.log(brandId);

                    const response = await api.get(brandId ? `product/category/brand/${brandId}` : `/product/categories`);
                    if (response.data.success) {
                
                        const fetchedCategories: ProductCategory[] = [];

                        response.data.data.forEach((category: ProductCategoryByBrand, index: number) => {
                            fetchedCategories.push({
                            id: index.toString(),
                            name: category.product_category,
                            icon: 'apps-outline',
                            });
                        });
                        setCategories([{ id: '-1', name: 'Tümü', icon: 'apps-outline' }, ...fetchedCategories]);
                    }
                } catch (err) {
                    setError(err as Error);
                } finally {
                    setLoading(false);
                }
            };
        fetchCategories();
    }, [brandId]);

    return { categories, categoriesLoading, categoriesError };
}
