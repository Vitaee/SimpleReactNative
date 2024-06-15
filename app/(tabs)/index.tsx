// app/(tabs)/index.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const { token, appIsReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (appIsReady) {
      if (!token) {
        router.replace('/login');
      }
    }
  }, [token, appIsReady, router]);

  if (!appIsReady) {
    // Show a loading screen or nothing while checking auth status
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome!</ThemedText>
      <Text>Authenticated Home Screen Content</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
