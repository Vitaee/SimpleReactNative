import { create } from 'zustand';
import api from '../../services/api'; // Ensure to import your api instance
import { TimelineApiResponse, TimelineData } from '@/constants/TimelineType';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface TimelineState {
    timeline: TimelineData[];
    loading: boolean;
    error: string | null;
    fetchTimelines: (page?: number, searchQuery?: string) => Promise<void>;
    pageNumber: number;
    totalPages: number;
    likeOrUnlikeTimline: (timelineId: string, type: string) => { };
}

export const useTimelineStore = create<TimelineState>((set) => ({
    timeline: [],
    loading: true,
    error: null,
    pageNumber: 1,
    totalPages: 1,
  
    fetchTimelines: async (page = 1, searchQuery = '') => {
        try {
            const response = await api.get<TimelineApiResponse>(`/timeline/?page=${page}&query=${searchQuery}`);
            if (response.status === 200) {
                set((state) => ({
                    timeline: page === 1 ? 
                    response.data.data : [...state.timeline, ...response.data.data],
                    loading: false,
                    pageNumber: page,
                    totalPages: response.data.pagination.number_of_page,
                  }));
            } else {
                set({ loading: false, error: 'Failed to fetch timeline' });
            }
        } catch (error) {
            console.error('Error fetching timeline data:', error);
            set({ loading: false, error: 'Failed to fetch timeline' });
        } finally {
            set({loading: false});
        }
    },

    // type: like or unlike
    likeOrUnlikeTimline: async (timelineId: string, type: string = "like") => { },

}));