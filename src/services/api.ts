import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';

//const API_BASE_URL = Platform.OS === 'ios' ? API_URL : API_URL;

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const ip = await Network.getIpAddressAsync();
  
  config.headers['x-real-ip'] = ip;
  
  return config;

});

export default api;
