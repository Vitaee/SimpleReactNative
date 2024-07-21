import React, { memo, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../constants/ProductType';
import { router } from 'expo-router';
import { PRODUCT_DETAIL_SCREEN } from '@/constants/Routes';
import { useProductStore } from '@/src/context/products/ProductStore';
import { useProfileStore } from '@/src/context/profile/ProfileStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const cardTextColor = useThemeColor({}, 'cardText');

  const { isProductLiked, likeOrUnlikeProduct } = useProductStore();

  const user = useProfileStore((state) => state.user);
  const fetchUserData = useProfileStore((state) => state.fetchUserData);


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
    router.push(`${PRODUCT_DETAIL_SCREEN}?product=${encodedProduct}`);
  };

  const handleLikePress = () => {
    if (product.like_count > 0) {
      if (isProductLiked(product._id) || isProductLikedByCurrentUser()) {
        product.events.forEach((event) => {
          if (event.event.user._id === user?.data.user._id) {
            likeOrUnlikeProduct(product._id, event._id);
          }
        });
      } else {
        likeOrUnlikeProduct(product._id);
      }
    } else {
      likeOrUnlikeProduct(product._id);
    }
  };

  const isProductLikedByCurrentUser = () => {
    if (user && user.data && user.data.user && product.events) {
      return product.events.some((event) => event.event.user._id === user.data.user._id);
    }
    return false;
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);


  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: cardBackgroundColor }]} onPress={handlePress}>
      <Image source={{ uri: getImageUri() }} style={styles.image} />
      <ThemedText style={[styles.title, { color: cardTextColor }]}>{product.product_name}</ThemedText>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#ffd700" />
        <Text style={[styles.rating, { color: cardTextColor }]}>4.0</Text>
      </View>
      <ThemedText style={[styles.price, { color: cardTextColor }]}>{product.product_price} tl</ThemedText>
      <Text style={styles.discountedPrice}>{product.product_discount} tl</Text>
      <TouchableOpacity style={styles.favoriteButton} onPress={handleLikePress}>
        {isProductLiked(product._id) || isProductLikedByCurrentUser() ? (
          <Ionicons name="heart-sharp" size={24} color="#ff6347" />
        ) : (
          <Ionicons name="heart-outline" size={24} color="#ff6347" />
        )}
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