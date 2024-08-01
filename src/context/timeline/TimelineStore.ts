import { create } from 'zustand';
import api from '../../services/api'; // Ensure to import your api instance
import { TimelineApiResponse, TimelineData } from '@/constants/TimelineType';


interface TimelineState {
    timeline: TimelineData[];
    loading: boolean;
    error: string | null;
    fetchTimelines: (page?: number, searchQuery?: string) => Promise<void>;
    pageNumber: number;
    totalPages: number;
    likeOrUnlikeTimeline: (timelineId: string, type: string, timeline_event?: string) => Promise<void>;
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
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

    likeOrUnlikeTimeline: async (timelineId: string, type: string, timeline_event?: string) => {
        const timeline = get().timeline;
        const index = timeline.findIndex((item) => item._id === timelineId);
        if (index === -1) return;
    
        try {
          const response = type == "like" ? await api.put(`/timeline/event/`, { timeline_id: timelineId, text: ""}) : 
          await api.delete(`/timeline/event/`, { data: { timeline_id: timelineId, timeline_event: ""} });

          if (response.status === 200) {
            const updatedItem = {
              ...timeline[index],
              like_count: type === 'like' ? timeline[index].like_count + 1 : timeline[index].like_count - 1,
            };
            const updatedTimeline = [...timeline];
            updatedTimeline[index] = updatedItem;
            set({ timeline: updatedTimeline });
          } else {
            console.error('Failed to like/unlike timeline item');
          }
        } catch (error) {
          console.error('Error liking/unliking timeline item:', error);
        }
      },

}));