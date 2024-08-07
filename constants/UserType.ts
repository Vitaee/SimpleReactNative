export interface User {
    _id: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface UserData {
    user: User;
}

export interface UserApiResponse {
    data: UserData;
    success: boolean;
}
