export interface Event {
    _id: string;
    timeline: string;
    event: {
      user: {
        _id: string;
        email: string;
        password: string;
        __v: number;
      };
      _id: string;
      text?: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface Product {
    _id: string;
    product_name: string;
    product_brand: string;
    product_price: string;
    product_discount: string;
    product_description: string;
    product_image: string;
    product_category: string;
    product_link: string;
    events: Event[];
    like_count: number;
    comment_count: number;
    updatedAt: string;
    createdAt: string;
  }
  
  export interface Pagination {
    page_number: number;
    per_page: number;
    number_of_data: number;
    number_of_page: number;
  }
  
  export interface ProductApiResponse {
    success: boolean;
    data: Product[];
    pagination: Pagination;
  }
  