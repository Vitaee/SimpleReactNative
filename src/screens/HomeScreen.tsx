import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';


const HomeScreen: React.FC = () => {

  const handleLogout = async () => {
    try {
        await AsyncStorage.removeItem('token');
        return router.replace('/splash');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
        <ThemedView style={styles.container}>
          <ThemedText type="title">Welcome!</ThemedText>
          <Text>Authenticated Home Screen Content</Text>
          <Button title="Logout" onPress={handleLogout} />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
  
export default HomeScreen;