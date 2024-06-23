import React, { useState } from 'react';
import { TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSearchProducts } from '../../hooks/useSearchProduct';
import { useProducts } from '../../hooks/useProduct';
import ProductCard from './ProductCard';


const HomeScreen: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { products, loading, error, pagination } = searchQuery
    ? useSearchProducts(searchQuery, pageNumber)
    : useProducts(pageNumber, '');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setPageNumber(1);
  };

  const loadMoreProducts = () => {
    if (pagination && pageNumber < pagination.number_of_page) {
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
 
      
        <ThemedView style={styles.container}>
        
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
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <ProductCard product={item} />}
              onEndReached={loadMoreProducts}
              onEndReachedThreshold={0.5}
              ListFooterComponent={loading && pageNumber > 1 ? <ActivityIndicator size="small" color="#0000ff" /> : null}
            />
          )}
          
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
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
    elevation: 5, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.2, // for iOS shadow
    shadowRadius: 5, // for iOS shadow
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 1 }, // for iOS shadow
    shadowOpacity: 0.1, // for iOS shadow
    shadowRadius: 2, // for iOS shadow
  },
  navText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;