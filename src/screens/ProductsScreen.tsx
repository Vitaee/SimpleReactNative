import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, View, ScrollView, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSearchProducts } from '../../hooks/useSearchProduct';
import { useProducts } from '../../hooks/useProduct';
import ProductCard from './ProductCard';
import { useThemeColor } from '../../hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useProductCategories } from '@/hooks/useProductCategories';
import SearchBar from '@/components/SearchBar';

const ProductsScreen: React.FC = () => {
  const ITEM_HEIGHT = 200;
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { brandId, brandName } = useLocalSearchParams();
  const navigation = useNavigation();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'placeholderColor');
  const borderColor = useThemeColor({}, 'borderColor');

  const { products, loading, error, pagination } = useProducts(pageNumber, brandId, selectedCategory);
  const { searchProducts, searchLoading, searchError, searchPagination } = useSearchProducts(searchQuery, pageNumber);

  useEffect(() => {
    if (brandId) {
      navigation.setOptions({
        title: `${brandName} Ürünleri`,
      });
    }
    setPageNumber(1);
    setSearchQuery('');
    setSelectedCategory('');
 
  }, [navigation, brandId, brandName]);
  
  const { categories,  categoriesLoading,  categoriesError } = useProductCategories(brandId);


  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setPageNumber(1);
  };

  const handleCategoryChange = (categoryText: string) => {
    setSearchQuery(''); 
    setPageNumber(1); 
    setSelectedCategory(categoryText);
  };

  const loadMoreProducts = () => {
    if(searchQuery){
      if (searchPagination && pageNumber < searchPagination.number_of_page) {
        setPageNumber((prev) => prev + 1);
      }
    } else {

      if (pagination && pageNumber < pagination.number_of_page) {
        setPageNumber((prev) => prev + 1);
      }
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        setShowFilters={setShowFilters}
      />

      <ParallaxScrollView
        horizontal={true}
        contentContainerStyle={styles.categoriesContent}
      >
        {categoriesLoading ? (
          <ActivityIndicator size="large" color={textColor} />
        ) : categoriesError ? (
          <ThemedText style={{ color: textColor }}>Error loading product categories</ThemedText>
        ) : (
          categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.selectedCategory
              ]}
              onPress={() => handleCategoryChange(category.name)}
            >
              <Ionicons name="apps-outline" size={24} color={textColor} />
              <ThemedText style={styles.categoryText}>
                {category.name.length > 15 ? category.name.substring(0, 12) + '...' : category.name}
              </ThemedText>
            </TouchableOpacity>
          ))
        )}
      </ParallaxScrollView>

      {searchLoading && pageNumber === 1 && searchQuery ? (
        <ActivityIndicator size="large" color={textColor} />
      ) : error ? (
        <ThemedText style={{ color: textColor }}>Error loading products</ThemedText>
      ) : searchQuery ? (
        searchProducts.length === 0 ? (
          <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText style={{ color: textColor }}>No products found for this search</ThemedText>
          </ThemedView>
        ) : (
          <FlatList
            data={searchProducts}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            renderItem={({ item }) => <ProductCard product={item} />}
            initialNumToRender={6}
            numColumns={2}
            columnWrapperStyle={styles.row}
            onEndReached={loadMoreProducts}
            onEndReachedThreshold={0.5}
            ListFooterComponent={searchLoading && pageNumber > 1 ? <ActivityIndicator size="small" color={textColor} /> : null}
            getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
          />
        )
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderItem={({ item }) => <ProductCard product={item} />}
          initialNumToRender={6}
          numColumns={2}
          columnWrapperStyle={styles.row}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && pageNumber > 1 ? <ActivityIndicator size="small" color={textColor} /> : null}
          getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
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
  
  categoriesContent: {
    paddingHorizontal: 1,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  selectedCategory: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  filterSection: {
    width: '100%',
    marginBottom: 20,
  },
  priceInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    width: '40%',
  },
  sortButton: {
    padding: 10,
    marginVertical: 5,
  },
  selectedSort: {
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default ProductsScreen;