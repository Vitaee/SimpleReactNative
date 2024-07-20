import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useAuthStore } from '../src/context/AuthStore'; // Adjust the path as necessary
import { useColorScheme } from '../hooks/useColorScheme'; // Adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAIN_SCREEN, SPLASH_SCREEN } from '@/constants/Routes';
import { ActivityIndicator } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { appIsReady, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    async function prepare() {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken === null) {
          router.replace(SPLASH_SCREEN);
        } else {
          const isAuthenticated = await checkAuthStatus();
          if (isAuthenticated) { 
            router.replace(MAIN_SCREEN);
          } else { 
            await AsyncStorage.removeItem('token'); 
            router.replace(SPLASH_SCREEN);
          }
        }
      } catch (e) {
        console.warn(e);
        router.replace(SPLASH_SCREEN);
      } 
    }
    prepare();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (fontsLoaded && appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appIsReady]);

  

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
