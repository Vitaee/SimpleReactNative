import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import FormHeader from './formHeader';
import ProductItem from './formProductItem';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { router, useRouter } from 'expo-router';
import SearchBar from '../SearchBar';


const FormProductSelection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: '1', name: 'İngiliz Süngeri E439 pink', price: '₺100', imageUrl: 'https://example.com/image1.jpg' },
    { id: '2', name: 'İngiliz Süngeri E439 pink', price: '₺120', imageUrl: 'https://example.com/image2.jpg' },
    // Add more products as needed
  ];

  const router = useRouter();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <ThemedView>
      <FormHeader title="Ürün Seçimi" subTitle="Dilerseniz uygulamadaki herhangi bir ürüne özel bir gönderi hazırlayabilirsiniz." step={1} />
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={() => {}}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductItem
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            onPress={() => {}}
          />
        )}
        keyExtractor={item => item.id}
      />
      
      <TouchableOpacity onPress={ () => { router.push('/forms/formdetails')  }}>
        <ThemedText type='title'>İlerle </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    margin: 10,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
  },
});

export default FormProductSelection;