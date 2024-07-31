export interface ProductCategory {
    id: string;
    product_category: string;
    icon: string;
  }

export interface ProductCategoryByBrand {
  count: number,
  product_category: string;
}

export interface ProductCategoryApiResponse {
    success: boolean;
    data: ProductCategoryByBrand;
}
  