import { create } from 'zustand';
import api from '../../services/api'; // Ensure to import your api instance
import { FavsApiResponse } from '@/constants/FavsType';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface FavsState {
  favs: FavsApiResponse | null;
  loading: boolean;
  error: string | null;
  fetchUserFavs: () => Promise<void>;
}

export const useFavsStore = create<FavsState>((set) => ({
    favs: null,
    loading: true,
    error: null,
  
    fetchUserFavs: async () => {
        try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await api.get<FavsApiResponse>('/favourites/', {});
            if (response.status === 200) {
                set({favs:response.data, loading:false})
            } else {
                set({ loading: false, error: 'Failed to fetch favs' });
            }
        } else{
            set({ loading: false, error: 'Failed to fetch favs' });
        }
        } catch (error) {
        console.error('Error fetching favs data:', error);
        set({ loading: false, error: 'Failed to fetch favs' });

        } finally {
            set({loading: false});
        }
    }

}));