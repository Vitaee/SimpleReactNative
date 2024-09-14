import { create } from 'zustand';
import api from '../../services/api'; // Ensure to import your api instance
import { TimelineApiResponse, TimelineData, TimelineFormData } from '@/constants/TimelineType';
import { AxiosError } from 'axios';

interface TimelineFilters {
  sortBy: 'price' | 'date' | 'name';
  sortOrder: 'A-Z' | '0-100' | '100-0';
  //priceRange: { min: string; max: string };
  dateRange: { start: Date | null; end: Date | null };
}

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
    applyFilters: (filters: TimelineFilters, pageNumber: number) => Promise<void>;
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

    applyFilters: async ( filters: TimelineFilters, pageNumber: number) => {
      set({ loading: true, error: null });
      try {
          const res = await api.post('/timeline/filter/', filters);

          set( (state) => ({
              timeline: pageNumber === 1 ? res.data.data: [...state.timeline, ...res.data.data],
              loading: false,
              error: null
          }));
      } catch (err){
          console.error('Error applying filters for timelines:', err);
          set( (state) => ({
            timeline: [],
            loading: false,
            error: err!.toString()
        }));
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
        console.log("index", index);
        console.log("timeline", timelineId);
      
        console.log("timeline_event", timeline_event);
    
        try {
          const response = type == "like" ? await api.put(`/timeline/event/`, {   timeline_id: timelineId, text: ""} ) : 
          await api.delete(`/timeline/event/`, { data: { timeline_id: timelineId, timeline_event: timeline_event} });
          
          if (response.status === 200) {
            const updatedTimeline = [...timeline]; // /get().upToDateTimeline(timelineId);
            updatedTimeline[index] = response.data.data;
            set({ timeline: updatedTimeline });
          } else {
            console.error('Failed to like/unlike timeline item');
          }
        } catch (error: AxiosError | any) {
          console.log("response", error);
          console.log("response", error.response.data);
          console.error('Error liking/unliking timeline item:', error);
        }
      },

}));