import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; 


interface AuthState {
  token: string | null;
  appIsReady: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  confirmEmail: (code: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  confirmResetPassword: (code: string) => Promise<boolean>;
  resendCode: (email: string) => Promise<boolean>;
  resetPassword: (password1: string, password2: string) => Promise<boolean>;
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
          
          if (response.status==200) {
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
        const newToken = response.data.data.token;


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

        if (response.data.success == 'true' || response.data.success == true) {
          set({ token: null });
          console.log('Registration success');
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Registration failed', error);
        return false;
      }
    },

    confirmEmail: async (code: string) => {
      try {
        const response = await api.post('/auth/confirm/email', { code });
        if (response.data.success) {
          await get().setTokenAndPersist(response.data.data);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Email confirmation failed', error);
        return false;
      }
    },

    resendCode: async (email: string) => {
      try {
        const response = await api.post('/auth/confirm/resend/', { email });
        return response.data.success;
      } catch (error) {
        console.error('Resend code failed', error);
        return false;
      }
    },

    forgotPassword: async (email: string) => {
      try {
        const response = await api.post('/user/password/reset/', { email });
        if (response.status === 200) {
          return true;
        } else {
          console.error('Forgot password failed', response.data);
          return false;
        }
      } catch (error) {
        console.error('Forgot password failed', error);
        return false;
      }
    },
    
    confirmResetPassword: async(code: string) =>{
      try {
        const response = await api.post('/user/password/confirm/', { code });
        if (response.status === 200) {
          setTokenAndPersist(response.data.data);
          return true;
        } else {
          console.error('Confirm password failed', response.data);
          return false;
        }
      } catch (error) {
        console.error('Confirm password failed', error);
        return false;
      }
    },

    resetPassword: async (password1: string, password2: string) => {
      try {
        const storedToken = await AsyncStorage.getItem('token');

        const response = await api.post('/user/password/change/', {
          password: password1,
          confirmPassword: password2,
        },{ headers: { Authorization: `Bearer ${storedToken}` },});

        if (response.status === 200) {
          return true;
        } else {
          console.error('Reset password failed', response.data);
          return false;
        }
      } catch (error) {
        console.error('Reset password failed', error);
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
