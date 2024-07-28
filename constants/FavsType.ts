import { Product } from "./ProductType";
import { PaginationInfo } from "./TimelineType";
import { User } from "./UserType";



export interface Favs {
    user: User
    product: Product[] | []
}

export interface FavsApiResponse {
    success: boolean;
    data: Favs[] | [];
    pagination: PaginationInfo;
}

export interface FavsApiDeleteRequest {
    product_id: string;
}