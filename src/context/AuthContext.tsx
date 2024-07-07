import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  api  from '../services/api'; // Ensure to import your api instance
import { useRouter } from 'expo-router';

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
  const router = useRouter();

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
          router.replace('/main');
        } else {
          setToken(null);
          await AsyncStorage.removeItem('token');
          router.replace('/splash');
        }
      } else {
        router.replace('/splash');
      }
    } catch (error) {
      console.error('Auth check failed', error);
      setToken(null);
      router.replace('/splash');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login/', { email, password });
      const newToken = response.data.token;

      if (newToken.startsWith('Invalid')) {
        setToken(null);
        console.error('Login failed', newToken);
        router.replace('/login');
      } else {
        await setTokenAndPersist(newToken);
        router.replace('/main');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/register/', { email, password });
      const newToken = response.data.token;

      if (newToken.startsWith('Invalid')) {
        setToken(null);
        console.error('Registration failed', newToken);
        router.replace('/register');
      } else {
        await setTokenAndPersist(newToken);
        router.replace('/main');
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('token');
    router.replace('/login');
  };

  const setTokenAndPersist = async (newToken: string) => {
    setToken(newToken);
    await AsyncStorage.setItem('token', newToken);
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
