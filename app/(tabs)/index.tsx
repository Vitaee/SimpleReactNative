// app/(tabs)/index.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';

export default function HomeScreen() {
  const { token, appIsReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (appIsReady) {
      if (!token) {
        router.replace('/splash');
      } else {
        router.replace('/home');
      }
    }
  }, [token, appIsReady, router]);

  if (!appIsReady) {
    // Show a loading screen or nothing while checking auth status
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});