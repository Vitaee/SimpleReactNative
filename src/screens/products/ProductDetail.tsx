import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import {  ThemedText } from '../../../components/ThemedText'; 
import { Product } from '../../../constants/ProductType';
import { useRouter, useLocalSearchParams, useNavigation, router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import ImageGallery from '@/components/ImageGallery';
import { WEBVIEW_SCREEN } from '@/constants/Routes';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Comments from '@/components/Comments';
import { useProductStore } from '@/src/context/products/ProductStore';
import CommentCard from '@/components/CommentCard';


const ProductDetail = () => {
  const { product } = useLocalSearchParams();
  let parsedProduct: Product | null = null;

  
  const commentOnProduct = useProductStore((state) => state.commentOnProduct);
  const fetchCommentsOfProudct = useProductStore((state) => state.fetchCommentsOfProudct);
  const comments = useProductStore((state) => state.comments);

  try {
    // Safely decode and parse the product data
    parsedProduct = JSON.parse(decodeURIComponent(encodeURIComponent(product as string))) as Product;   
  } catch (error) {
    console.error('Failed to parse product data:', error);
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Failed to load product details. Please try again.</ThemedText>
      </ThemedView>
    );
  }

  const [commentsCount, setCommentsCount] = useState(10);

  const handlePostComment = async (comment: string, product_id: string) => {
    await commentOnProduct(product_id, comment);
    setCommentsCount(prevCount => prevCount + 1);
  };

  const cardBackgroundColor = useThemeColor({}, 'background');
  const cardTextColor = useThemeColor({}, 'secondaryText');

  const navigation = useNavigation();

  const openWebView = (url: string | undefined) => {
    router.push({ pathname: WEBVIEW_SCREEN, params: { url: url }});
  };

  const displayDiscount = (discount: string | undefined) => {
    if (isNaN(Number(discount))){
      return null;
    }

    if(discount != "0" && discount!.length > 0) {
      return discount + " TL";
    }

    return null;
  }

  useEffect(() => {
    if (parsedProduct?.product_name) {
      navigation.setOptions({
        title: `${parsedProduct?.product_brand} Ürün Detayı`,
      });
    }
    fetchCommentsOfProudct(parsedProduct!._id);
  }, [fetchCommentsOfProudct]);


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ ios: 100, android: 70 })}>

      <ParallaxScrollView>
        <ImageGallery images={parsedProduct?.product_image} />
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
            <Text style={styles.discountedPrice}> {displayDiscount(parsedProduct?.product_discount) }</Text>
            <TouchableOpacity onPress={ () => {openWebView(parsedProduct?.product_link)}}><ThemedText type='subtitle'>Orjinal Link</ThemedText></TouchableOpacity>
          </View>

          <Comments onCommentSubmit={ (comment: string) => handlePostComment(comment, parsedProduct!._id)} />

          <ThemedView>
            <ThemedText style={styles.commentsTitle}>Yorumlar</ThemedText>
            <ThemedText style={styles.commentCount}>Toplam {comments.length} yorum</ThemedText>

            <ThemedView>
                {comments.map((comment, index) => (
                  <CommentCard key={index} comment={comment} />
                ))}
            </ThemedView>

          </ThemedView>
        </View>
      </ParallaxScrollView>
    </KeyboardAvoidingView>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentCount: {
    color: '#888',
    marginBottom: 20,
  } 
});

export default ProductDetail;
