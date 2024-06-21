import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { API_URL } from '@env'; // Import the environment variable

const API_BASE_URL = Platform.OS === 'ios' ? API_URL : API_URL;

const api = axios.create({
  baseURL: API_BASE_URL, // API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  // Add token to headers if available
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
