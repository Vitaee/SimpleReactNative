import React, { useEffect, useState, useCallback, memo } from 'react';
import { TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, View, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProductCard from '../../../components/ProductCard';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import { useProductStore } from '../../context/products/ProductStore';
import { useFavsStore } from '@/src/context/profile/FavouritesStore';

const ProductsScreen: React.FC = () => {
  const ITEM_HEIGHT = 200;
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { brandId, brandName } = useLocalSearchParams();
  const navigation = useNavigation();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'primaryText');

  const {
    products,
    loading,
    error,
    pagination,
    searchProducts,
    searchLoading,
    searchError,
    searchPagination,
    categories,
    categoriesLoading,
    categoriesError,
    fetchProducts,
    fetchSearchProducts,
    fetchCategories,
  } = useProductStore();

  const userFavs = useFavsStore((state) => state.fetchUserFavs);
  const favs = useFavsStore((state) => state.favs);

  useEffect(() => {
    userFavs();
    if (brandId) {
      navigation.setOptions({
        title: `${brandName} Ürünleri`,
      });
    }
    setPageNumber(1);
    setSearchQuery('');
    setSelectedCategory('');
    fetchCategories(brandId?.toString());
    fetchProducts(1, brandId?.toString(), '');
  }, [navigation, brandId, brandName]);

  useEffect(() => {
    if (searchQuery) {
      if (brandId) {
        fetchSearchProducts(searchQuery, pageNumber, brandId?.toString());
      } else {
        fetchSearchProducts(searchQuery, pageNumber);
      }
    } else {
      fetchProducts(pageNumber, brandId?.toString(), selectedCategory);
    }
  }, [pageNumber, searchQuery, selectedCategory, brandId]);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    setPageNumber(1);
  }, []);

  const handleCategoryChange = useCallback((categoryText: string) => {
    setSearchQuery('');
    setPageNumber(1);
    setSelectedCategory(categoryText);
  }, []);

  const loadMoreProducts = useCallback(() => {
    if (searchQuery) {
      if (searchPagination && pageNumber < searchPagination.number_of_page) {
        setPageNumber((prev) => prev + 1);
      }
    } else {
      if (pagination && pageNumber < pagination.number_of_page) {
        setPageNumber((prev) => prev + 1);
      }
    }
  }, [searchQuery, pagination, searchPagination, pageNumber]);

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
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
          categories.map((category) => (
            <TouchableOpacity
              key={`${category.id}_${Math.random()}`}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryChange(category.product_category)}
            >
              
              <ThemedText style={styles.categoryText}>
                {category.product_category.length > 15 ? `${category.product_category.substring(0, 12)}...` : category.product_category}
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
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                favProducts={favs?.data[0]?.product.map((product) => product._id) || []}
              />
            )}
            initialNumToRender={6}
            numColumns={2}
            columnWrapperStyle={styles.row}
            onEndReached={loadMoreProducts}
            onEndReachedThreshold={0.5}
            maxToRenderPerBatch={10}
            ListFooterComponent={
              searchLoading && pageNumber > 1 ? <ActivityIndicator size="small" color={textColor} /> : null
            }
            getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
          />
        )
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              favProducts={favs?.data[0]?.product.map((product) => product._id) || []}
            />
          )}
          initialNumToRender={6}
          numColumns={2}
          columnWrapperStyle={styles.row}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          maxToRenderPerBatch={10}
          ListFooterComponent={
            loading && pageNumber > 1 ? <ActivityIndicator size="small" color={textColor} /> : null
          }
          getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  categoriesContent: {
    paddingHorizontal: 1,
  },
  categoryButton: {
    //alignItems: 'center',
    //justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: 'purple',
    color: 'purple',
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    color: '#E0E0E0',
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

export default memo(ProductsScreen);
