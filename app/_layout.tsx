import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useAuthStore } from '../src/context/AuthStore'; // Adjust the path as necessary
import { useColorScheme } from '../hooks/useColorScheme'; // Adjust the path as necessary

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
        const isAuthenticated = await checkAuthStatus();
        isAuthenticated ? router.replace('/main') : router.replace('/splash')
      } catch (e) {
        console.warn(e);
        router.replace('/splash')
      }
    }
    prepare();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (fontsLoaded && appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appIsReady]);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
