import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; 


interface AuthState {
  token: string | null;
  appIsReady: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  checkAuthStatus: () => Promise<boolean>;
  setTokenAndPersist: (newToken: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {

  const setTokenAndPersist = async (newToken: string) => {
    set({ token: newToken });
    await AsyncStorage.setItem('token', newToken);
  };

  return {
    token: null,
    appIsReady: true,

    checkAuthStatus: async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          const response = await api.get('/auth', {
            headers: { Authorization: `Bearer ${storedToken}` },
          });

          if (response.data.user) {
            set({ token: storedToken });
            return true;
          } else {
            set({ token: null });
            await AsyncStorage.removeItem('token');
            return false;
          }
        } else {
          return false;
        }
      } catch (error) {
        console.error('Auth check failed', error);
        set({ token: null });
        return false;
      }
    },

    login: async (email: string, password: string) => {
      try {
        const response = await api.post('/auth/login/', { email, password });
        const newToken = response.data.token;

        if (newToken.startsWith('Invalid')) {
          set({ token: null });
          console.error('Login failed', newToken);
          return false;
        } else {
          await setTokenAndPersist(newToken);
          return true;
        }
      } catch (error) {
        console.log("error on login: ", error)
        return false;
      }
    },

    register: async (email: string, password: string) => {
      try {
        const response = await api.post('/auth/register/', { email, password });
        const newToken = response.data.token;

        if (newToken.startsWith('Invalid')) {
          set({ token: null });
          console.error('Registration failed', newToken);
          return false;
        } else {
          await setTokenAndPersist(newToken);
          return true;
        }
      } catch (error) {
        console.error('Registration failed', error);
        return false;
      }
    },

    logout: async () => {
      set({ token: null });
      await AsyncStorage.removeItem('token');
      return true;
    },

    setTokenAndPersist
  };
});

useAuthStore.getState().checkAuthStatus();
