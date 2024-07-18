import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import {  ThemedText } from '../../components/ThemedText'; // Adjust the path according to your project structure
import { Product } from '../../constants/ProductType';
import { useRouter, useLocalSearchParams, useNavigation, router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import ImageGallery from '@/components/ImageGallery';


const ProductDetail = () => {
  const { product } = useLocalSearchParams();
  let parsedProduct: Product | null = null;

  try {
    // Safely decode and parse the product data
    parsedProduct = JSON.parse(decodeURIComponent(encodeURIComponent(product))) ;
    parsedProduct as Product;
    console.log(parsedProduct?.product_image.length);
  } catch (error) {
    console.error('Failed to parse product data:', error);
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Failed to load product details. Please try again.</ThemedText>
      </ThemedView>
    );
  }

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const cardTextColor = useThemeColor({}, 'cardText');

  const getImageUris = () => {
    if (Array.isArray(parsedProduct?.product_image)) {
      return parsedProduct?.product_image;
    } else {
      return [parsedProduct?.product_image];
    }
  };

  const navigation = useNavigation();

  const openWebView = (url: string | undefined) => {
    router.push({ pathname: '/webview', params: { url: url }});
  };

  useEffect(() => {
    if (parsedProduct?.product_name) {
      navigation.setOptions({
        title: `${parsedProduct?.product_brand} Ürün Detayı`,
      });
    }
  }, []);


  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      
      <ImageGallery images={getImageUris()} />
      <View style={[styles.detailsContainer, { backgroundColor: cardBackgroundColor }]}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#ffd700" />
          <Text style={[styles.rating, { color: cardTextColor }]}>4.5</Text>
        </View>
        <ThemedText style={[styles.title, { color: cardTextColor }]}>{parsedProduct?.product_name}</ThemedText>
        <Text style={[styles.description, { color: cardTextColor }]}>
          {parsedProduct?.product_description}
        </Text>
        <View style={styles.priceContainer}>
          <ThemedText style={[styles.price, { color: cardTextColor }]}>{parsedProduct?.product_price} tl</ThemedText>
          <Text style={styles.discountedPrice}>{parsedProduct?.product_discount} tl</Text>
          <TouchableOpacity onPress={ () => {openWebView(parsedProduct?.product_link)}}><ThemedText type='subtitle'>Orjinal Link</ThemedText></TouchableOpacity>
        </View>
        <View style={styles.commentsContainer}>
          <Text style={[styles.commentsTitle, { color: textColor }]}>Yorumlar</Text>
          {/* Render comments here */}
          <Text style={[styles.commentCount, { color: textColor }]}>10</Text>
        </View>
        <TouchableOpacity style={[styles.commentInput, { borderColor: cardTextColor }]}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color={textColor} />
          <Text style={[styles.commentPlaceholder, { color: textColor }]}>Yorumunuzu ekleyin...</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentCount: {
    fontSize: 14,
    color: '#999',
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 16,
  },
  commentPlaceholder: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default ProductDetail;
