import { create } from 'zustand';
import api from '../../services/api'; // Ensure to import your api instance
import { TimelineApiResponse, TimelineData, TimelineFormData } from '@/constants/TimelineType';


interface TimelineState {
    timeline: TimelineData[];
    loading: boolean;
    error: string | null;
    fetchTimelines: (page?: number, searchQuery?: string) => Promise<void>;
    pageNumber: number;
    totalPages: number;
    createTimeline: (data: TimelineFormData) => Promise<void>;
    timelineCreated?: boolean;
    likeOrUnlikeTimeline: (timelineId: string, type: string, timeline_event?: string) => Promise<void>;

}

export const useTimelineStore = create<TimelineState>((set, get) => ({
    timeline: [],
    loading: true,
    error: null,
    pageNumber: 1,
    totalPages: 1,
    timelineCreated: false,
  
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

    createTimeline: async (data: TimelineFormData) => {
      try {
        set({ loading: true });
        const formData = new FormData();
        formData.append('description', data.description);
        formData.append('title', data.title);
  
        // Append images if they exist
        if (data.image) {
          data.image.forEach((uri, index) => {
            const filename = uri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename ?? '');
            const type = match ? `image/${match[1]}` : `image`;
            formData.append('images', { uri, name: filename, type } as any);
          });
        }
  
        const response = await api.post('/timeline', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        if (response.status === 200) {
          set((state) => ({
            timelineCreated: true,
            loading: false,
          }));
        } else {
          set({  timelineCreated: false, loading: false, error: 'Failed to create timeline' });
        }
      } catch (error) {
        console.error('Error creating timeline:', error);
        set({ timelineCreated: false, loading: false, error: 'Failed to create timeline' });
      }
    },
    likeOrUnlikeTimeline: async (timelineId: string, type: string, timeline_event?: string) => {
        const timeline = get().timeline;
        const index = timeline.findIndex((item) => item._id === timelineId);
        if (index === -1) return;
    
        try {
          const response = type == "like" ? await api.put(`/timeline/event/`, { data: { timeline_id: timelineId, text: ""} }) : 
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