import { create } from 'zustand';
import api from '../../services/api'; // Ensure to import your api instance
import { UserApiResponse } from '@/constants/UserType';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface UserState {
  user: UserApiResponse | null;
  loading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
}

export const useProfileStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  error: null,
  
   fetchUserData: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const response = await api.get<UserApiResponse>('/auth/', {});
                if (response.status === 200) {
                    set({user:response.data, loading:false})
                } else {
                    set({ loading: false, error: 'Failed to fetch user' });
                }
            } else {
                set({ loading: false, error: 'Failed to fetch user' });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            set({ loading: false, error: 'Failed to fetch user' });

        } finally {
            set({loading: false});
        }
    }

}));