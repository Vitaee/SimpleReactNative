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
import { useFavsStore } from '@/src/context/profile/FavouritesStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const cardBackgroundColor = useThemeColor({}, 'background');
  const cardTextColor = useThemeColor({}, 'primaryText');

  const { isProductLiked, likeOrUnlikeProduct, isProductFaved, addOrRemoveProductToFavs, initializeFavedProducts } = useProductStore();

  const user = useProfileStore((state) => state.user);
  const userFavs = useFavsStore((state) => state.favs);

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

  const handleFavPress = (product_id: string) => {
    const userFavsProducts = userFavs?.data[0].product!;


    if ( userFavsProducts != undefined) {
      if (isProductFaved(product_id)) {

         addOrRemoveProductToFavs(product_id, "remove");

      } else {
        addOrRemoveProductToFavs(product_id, "add");
      }
    } else {
      addOrRemoveProductToFavs(product_id, "add");
    }
  };

  


  useEffect(() => {
    initializeFavedProducts();
  }, [initializeFavedProducts]);


  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: cardBackgroundColor }]} onPress={handlePress}>
      <TouchableOpacity style={styles.favoriteButton} onPress={() => handleFavPress(product._id)}>
        {isProductFaved(product._id)  ? (
          <Ionicons name="bookmark-sharp" size={24} color="#ff6347" />
        ) : (
          <Ionicons name="bookmark-outline" size={24} color="#ff6347" />
        )}
      </TouchableOpacity>

      <Image source={{ uri: product.product_image[0] }} style={styles.image} />
      <ThemedText style={[styles.title, { color: cardTextColor }]}>{product.product_name}</ThemedText>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#ffd700" />
        <Text style={[styles.rating, { color: cardTextColor }]}>4.0</Text>
      </View>
      <ThemedText style={[styles.price, { color: cardTextColor }]}>{product.product_price} tl</ThemedText>
      <Text style={styles.discountedPrice}>{product.product_discount} tl</Text>
      <TouchableOpacity style={styles.likeButton} onPress={handleLikePress}>
        {isProductLiked(product._id)  ? (
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
  likeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
});

export default ProductCard;