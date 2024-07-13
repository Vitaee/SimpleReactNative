import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
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
import { Product } from '@/constants/ProductType';
import { useCategoryProducts } from '@/hooks/useCategoryProducts';

const ProductsScreen: React.FC = () => {
  const ITEM_HEIGHT = 200;
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [loadingState, setLoadingState] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [data, setData] = useState<Product[]>([]);


  const { brandId, brandName } = useLocalSearchParams();
  const navigation = useNavigation();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'placeholderColor');
  const borderColor = useThemeColor({}, 'borderColor');

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
  
  
  const { products, loading, error, pagination } = useProducts(pageNumber, brandId, selectedCategory);
  const { searchProducts, searchLoading, searchError, searchPagination } = useSearchProducts(searchQuery, pageNumber);
  const { categoryProducts, categoryLoading, categoryError, categoryPagination } = useCategoryProducts(selectedCategory, pageNumber, brandId);


  useEffect(() => {
    if (pageNumber === 1) {
      if (searchQuery) {
        setData(searchProducts);
      } else if (selectedCategory) {
        setData(categoryProducts);
      } else {
        setData(products);
      }
    } else {
      if (searchQuery) {
        setData((prevData) => [...prevData, ...searchProducts]);
      } else if (selectedCategory) {
        setData((prevData) => [...prevData, ...categoryProducts]);
      } else {
        setData((prevData) => [...prevData, ...products]);
      }
    }
  
    if (searchQuery) {
      setLoadingState(searchLoading);
      setErrorState(searchError);
    } else if (selectedCategory) {
      setLoadingState(categoryLoading);
      setErrorState(categoryError);
    } else {
      setLoadingState(loading);
      setErrorState(error);
    }
  }, [pageNumber, searchQuery, selectedCategory, products, searchProducts, categoryProducts, loading, searchLoading, categoryLoading, error, searchError, categoryError]);
  



  const { categories,  categoriesLoading,  categoriesError } = useProductCategories(brandId);


  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setPageNumber(1);
    setData([]); // Clear data for new search
  };
  
  const handleCategoryChange = (categoryText: string) => {
    setSearchQuery('');
    setPageNumber(1);
    setSelectedCategory(categoryText);
    setData([]); // Clear data for new category
  };

  const loadMoreProducts = useCallback(() => {
    if(searchQuery){
      if (searchPagination && pageNumber < searchPagination.number_of_page) {
        setPageNumber((prev) => prev + 1);
      }
    } else if (selectedCategory) {
      if (categoryPagination && pageNumber < categoryPagination!.number_of_page) {
        setPageNumber((prev) => prev + 1);
      }
    } else {
      if (pagination && pageNumber < pagination.number_of_page) {
        setPageNumber((prev) => prev + 1);
      }
    }
  }, [searchQuery, searchPagination, selectedCategory, categoryPagination, pagination, pageNumber]);


  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <View style={[styles.searchContainer, { backgroundColor: borderColor }]}>
          <Ionicons name="search" size={20} color={placeholderColor} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchBar, { color: textColor }]}
            placeholder="Ara"
            placeholderTextColor={placeholderColor}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color={textColor} />
        </TouchableOpacity>
      </View>

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
                selectedCategory === category.name && styles.selectedCategory
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

      {loadingState ? (
        <ActivityIndicator size="large" color={textColor} />
      ) : errorState ? (
        <ThemedText style={{ color: textColor }}>Error loading products</ThemedText>
      ) :
      (
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderItem={({ item }) => <ProductCard product={item} />}
          initialNumToRender={6}
          numColumns={2}
          columnWrapperStyle={styles.row}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingState && pageNumber > 1 ? <ActivityIndicator size="small" color={textColor} /> : null}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  filterButton: {
    marginLeft: 10,
    padding: 8,
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
    backgroundColor: 'grey', // Default background color
  },
  selectedCategory: {
    backgroundColor: 'blue',
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