import React, { memo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../constants/ProductType';
import { router } from 'expo-router';

interface ProductCardProps {
  product: Product;
}

const ProductCard:  React.FC<ProductCardProps> = memo(({ product }) => {
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const cardTextColor = useThemeColor({}, 'cardText');

  const getImageUri = () => {
    if (Array.isArray(product.product_image)) {
      // Use the first image if product_image is an array
      return product.product_image[0];
    } else {
      // Otherwise, product_image is a single URI string
      return product.product_image;
    }
  };

  const handlePress = () => {
    const encodedProduct = encodeURIComponent(JSON.stringify(product));
    router.push(`/productdetail?product=${encodedProduct}`);
  };
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: cardBackgroundColor }]} onPress={handlePress}>
      <Image source={{  uri: getImageUri() }} style={styles.image} />
      <ThemedText style={[styles.title, { color: cardTextColor }]}>{product.product_name}</ThemedText>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#ffd700" />
        <Text style={[styles.rating, { color: cardTextColor }]}>4.0</Text>
      </View>
      <ThemedText style={[styles.price, { color: cardTextColor }]}>{product.product_price} tl</ThemedText>
      <Text style={styles.discountedPrice}>{product.product_discount} tl</Text>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart-outline" size={24} color="#ff6347" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  discountedPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginBottom: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default ProductCard;