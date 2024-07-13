import { User } from "./UserType";

export interface TimelineEvent {
    _id: string;
    timeline: string;
    event: {
      user: {
        _id: string;
        email: string;
        password: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
      text: string;
      _id: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface Product {
    events: any[];
    like_count: number;
    comment_count: number;
    _id: string;
    product_name: string;
    product_brand: string;
    product_price: string;
    product_discount: string;
    product_description: string;
    product_image: string;
    product_category: string;
    product_link: string;
    updatedAt: string;
    createdAt: string;
    product_brand_id: string;
  }
  
  export interface TimelineData {
    _id: string;
    product: Product;
    description: string;
    image: string[];
    events: TimelineEvent[];
    user: User;
    like_count: number;
    comment_count: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface TimelineApiResponse {
    success: boolean;
    data: TimelineData[];
    pagination: {
      page_number: number;
      per_page: number;
      number_of_data: number;
      number_of_page: number;
    };
  }
  