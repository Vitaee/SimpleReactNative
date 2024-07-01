import React, { useState } from 'react';
import { TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, View, ScrollView, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSearchProducts } from '../../hooks/useSearchProduct';
import { useProducts } from '../../hooks/useProduct';
import ProductCard from './ProductCard';
import { useThemeColor } from '../../hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useLocalSearchParams } from 'expo-router';

const HomeScreen: React.FC = () => {
  const ITEM_HEIGHT = 200;
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('popularity');

  const { brandId } = useLocalSearchParams();


  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'placeholderColor');
  const borderColor = useThemeColor({}, 'borderColor');

  const selectedCategory = "Tümü"
  

  const { products, loading, error, pagination } = searchQuery
    ? useSearchProducts(searchQuery, pageNumber)
    : useProducts(pageNumber, searchQuery, brandId);


  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setPageNumber(1);
  };

  const loadMoreProducts = () => {
    if (pagination && pageNumber < pagination.number_of_page) {
      setPageNumber((prev) => prev + 1);
    }
  };
  const categories = [
    { id: '1', name: 'Tümü', icon: 'apps-outline' },
    { id: '2', name: 'Saç Bakımı', icon: 'cut-outline' },
    { id: '3', name: 'Tırnak', icon: 'hand-left-outline' },
    { id: '4', name: 'Parfüm', icon: 'flask-outline' },
    { id: '5', name: 'Test 1', icon: 'flask-outline' },
    { id: '6', name: 'Test2', icon: 'flask-outline' },
    { id: '7', name: 'Test 3', icon: 'flask-outline' },

  ];

  /*const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFilters}
      onRequestClose={() => setShowFilters(false)}
    >
    <ThemedView style={{ backgroundColor }}>
      <ThemedText style={styles.modalTitle}>Filtrele</ThemedText>
          <View style={styles.filterSection}>
            <ThemedText>Fiyat Aralığı:</ThemedText>
            <View style={styles.priceInputs}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min"
                keyboardType="numeric"
                value={priceRange.min.toString()}
                onChangeText={(text) => setPriceRange({ ...priceRange, min: parseInt(text) || 0 })}
              />
              <ThemedText>-</ThemedText>
              <TextInput
                style={styles.priceInput}
                placeholder="Max"
                keyboardType="numeric"
                value={priceRange.max.toString()}
                onChangeText={(text) => setPriceRange({ ...priceRange, max: parseInt(text) || 1000 })}
              />
            </View>
          </View>
        <View style={styles.filterSection}>
          <ThemedText>Sırala:</ThemedText>
          <TouchableOpacity onPress={() => setSortBy('popularity')} style={styles.sortButton}>
            <ThemedText style={sortBy === 'popularity' ? styles.selectedSort : {}}>Popülerlik</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortBy('price_asc')} style={styles.sortButton}>
            <ThemedText style={sortBy === 'price_asc' ? styles.selectedSort : {}}>Fiyat: Artan</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortBy('price_desc')} style={styles.sortButton}>
            <ThemedText style={sortBy === 'price_desc' ? styles.selectedSort : {}}>Fiyat: Azalan</ThemedText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={() => setShowFilters(false)}>
          <ThemedText style={styles.applyButtonText}>Uygula</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </Modal>
  );*/


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
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory
            ]}
            onPress={() => {console.log("pressed", category.name)}}
          >
            <Ionicons name="apps-outline" size={24} color={textColor} />
            <ThemedText style={styles.categoryText}>{category.name}</ThemedText>
          </TouchableOpacity>
        ))}
      </ParallaxScrollView>

      {loading && pageNumber === 1 ? (
        <ActivityIndicator size="large" color={textColor} />
      ) : error ? (
        <ThemedText style={{ color: textColor }}>Error loading products</ThemedText>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCard product={item} />}
          initialNumToRender={6}
          numColumns={2}
          columnWrapperStyle={styles.row}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && pageNumber > 1 ? <ActivityIndicator size="small" color={textColor} /> : null}
          getItemLayout={(data, index) => (
            { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
          )}
        />
      )}
      {/*renderFilterModal()*/}
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
  categoriesContainer: {
    marginBottom: 16,
    marginTop: 8
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

export default HomeScreen;