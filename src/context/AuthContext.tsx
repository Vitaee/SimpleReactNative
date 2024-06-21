// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface AuthContextData {
  token: string | null;
  appIsReady: boolean;
  login(email: string, password: string): Promise<void>;
  register(email: string, password: string): Promise<void>;
  logout(): void;
  checkAuthStatus(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await checkAuthStatus();
      setAppIsReady(true);
    }

    prepare();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        const response = await api.get('/auth', {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        if (response.data.user) {
          setToken(storedToken);
          return router.replace('/home');

        } else {
          setToken(null);
          await AsyncStorage.removeItem('token');
          return router.replace('/login');

        }
      }
    } catch (error) {
      console.error('Auth check failed', error);
      setToken(null);
      return router.replace('/login');
    }
  };

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login/', { email, password });
    const newToken = response.data.token;
    console.log(newToken);

    if (newToken.startsWith('Invalid')) {
      setToken(null);
      console.error('Login failed', newToken);
      return router.replace('/login');

    }
    setToken(newToken);
    await AsyncStorage.setItem('token', newToken);
    return router.replace('/home');

  };

  const register = async (email: string, password: string) => {
    const response = await api.post('/auth/register/', { email, password });
    const newToken = response.data.token;
    if (newToken.startsWith('Invalid')) {
      setToken(null);
      console.error('Login failed', newToken);
      return router.replace('/register');
    }

    setToken(newToken);
    await AsyncStorage.setItem('token', newToken);
    return router.replace('/home');

  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('token');
    return router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ token, appIsReady, login, register, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
