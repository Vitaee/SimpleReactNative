import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useSearchProducts } from '../../hooks/useSearchProduct';
import { useProducts } from '../../hooks/useProduct';
import ProductCard from './ProductCard';
import { Product, Pagination } from '../../constants/ProductType';


const HomeScreen: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Use the appropriate hook based on whether a search query is present
  const { products, loading, error, pagination } = searchQuery
    ? useSearchProducts(searchQuery, pageNumber)
    : useProducts(pageNumber, '');

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      return router.replace('/splash');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setPageNumber(1); // Reset to the first page on search
  };

  const loadMoreProducts = () => {
    if (pagination && pageNumber < pagination.number_of_page) {
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome!</ThemedText>
      <ThemedText type="subtitle">Authenticated Home Screen Content</ThemedText>
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading && pageNumber === 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <ThemedText>Error loading products</ThemedText>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item: Product) => item._id}
          renderItem={({ item }: { item: Product }) => <ProductCard product={item} />}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && pageNumber > 1 ? <ActivityIndicator size="small" color="#0000ff" /> : null}
        />
      )}
      <Button title="Logout" onPress={handleLogout} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

export default HomeScreen;