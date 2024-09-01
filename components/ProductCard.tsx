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
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

interface ProductCardProps {
  product: Product;
  favProducts: string[] | []
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, favProducts = [] }) => {
  const cardBackgroundColor = useThemeColor({}, 'background');
  const cardTextColor = useThemeColor({}, 'primaryText');

  const { isProductLiked, likeOrUnlikeProduct, addOrRemoveProductToFavs, favedProducts } = useProductStore();

  const user = useProfileStore((state) => state.user);

  const handlePress = () => {
    const encodedProduct = encodeURIComponent(JSON.stringify(product));
    router.push(`${PRODUCT_DETAIL_SCREEN}?product=${encodedProduct}`);
  };


  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  

  const triggerFavAnimation = () => {
    scale.value = withTiming(1.2, { duration: 150, easing: Easing.out(Easing.ease) }, () => {
      scale.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.ease) });
    });
    handleFavPress();
  };

  const triggerLikeAnimation = () => {
    heartScale.value = withTiming(1.2, { duration: 150, easing: Easing.out(Easing.ease) }, () => {
      heartScale.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.ease) });
    });
    handleLikePress();
  };


  const handleLikePress = () => {
    if (product.like_count > 0) {
      if (isProductLiked(product._id)) {
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

  const isProductFaved = favProducts.includes(product._id) || favedProducts[product._id];

  const handleFavPress = () => {    
    if (isProductFaved) {
      favProducts = favProducts.filter((favProduct) => favProduct !== product._id);
      addOrRemoveProductToFavs(product._id, "remove");
    } else {
      favProducts.push(product._id);
      addOrRemoveProductToFavs(product._id, "add");
    }
  };

  const displayDiscount = (discount: string | undefined) => {
    

    if(discount != "0" && discount!.length > 0) {
      return discount + " TL";
    }

    if (isNaN(Number(discount))){
      return null;
    }

    return null;
  }

 

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: cardBackgroundColor }]} onPress={handlePress}>
      <Animated.View style={[styles.favoriteButton, animatedStyle]}>
        <TouchableOpacity style={styles.favoriteButton} onPress={() => triggerFavAnimation()}>
          {favProducts.includes(product._id) || favedProducts[product._id]   ? (
            <Ionicons name="bookmark-sharp" size={24} color="#ff6347" />
          ) : (
            <Ionicons name="bookmark-outline" size={24} color="#ff6347" />
          )}
        </TouchableOpacity>
      </Animated.View>

      <Image source={{ uri: product.product_image[0] }} style={styles.image} />
      <ThemedText style={[styles.title, { color: cardTextColor }]}>{product.product_name}</ThemedText>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#ffd700" />
        <Text style={[styles.rating, { color: cardTextColor }]}>4.0</Text>
      </View>
      <ThemedText style={[styles.price, { color: cardTextColor }]}>{product.product_price} tl</ThemedText>
      <Text style={styles.discountedPrice}>{displayDiscount(product.product_discount)}</Text>
      <Animated.View style={[styles.likeButton, animatedHeartStyle]}>
        <TouchableOpacity style={styles.likeButton} onPress={triggerLikeAnimation}>
          {isProductLiked(product._id)  ? (
            <Ionicons name="heart-sharp" size={24} color="#ff6347" />
          ) : (
            <Ionicons name="heart-outline" size={24} color="#ff6347" />
          )}
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 8,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    padding: 14
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
    top: 7,
    right: 3,
  },
  favoriteButton: {
    position: 'absolute',
    top: 7,
    left: 3,
  },
});

export default ProductCard;