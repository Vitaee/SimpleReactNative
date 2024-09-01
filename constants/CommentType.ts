interface User {
    bio: string;
    profilePicture: string;
    name: string;
    location: string;
    isEmailVerified: boolean;
    _id: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
  
interface Event {
    _id: string;
    text: string;
    user: User;
  }
  

export default interface CommentType {
    __v: number;
    _id: string;
    createdAt: string;
    event: Event;
    timeline: string;
    updatedAt: string;
}