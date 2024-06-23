import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Button, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';


const ProfileScreen = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.replace('/splash');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://canilgu.dev/makyaj-api/auth/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
 
      <ThemedView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <ThemedText>Error fetching user data</ThemedText>
        ) : (
          <View style={styles.profileContainer}>
            <ThemedText type="title">Profile</ThemedText>
            <ThemedText type="subtitle">Email: {user?.email}</ThemedText>
            <ThemedText type="subtitle">Created At: {new Date(user?.createdAt).toLocaleString()}</ThemedText>
            <ThemedText type="subtitle">Updated At: {new Date(user?.updatedAt).toLocaleString()}</ThemedText>

            <Pressable style={styles.button} onPress={handleLogout}>
              <ThemedText type="default">Logout</ThemedText>
            </Pressable>
          </View>
        )}
      </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'gray',
  },
});

export default ProfileScreen;