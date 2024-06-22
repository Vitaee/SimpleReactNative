import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Product } from '../../constants/ProductType';

interface ProductCardProps {
    product: Product;
}

const ProductCard:  React.FC<ProductCardProps> = ({ product }) => {
  return (
    <ThemedView style={styles.card}>
      <Image source={{ uri: product.product_image }} style={styles.image} />
      <ThemedText type="title">{product.product_name}</ThemedText>
      <ThemedText>{product.product_brand}</ThemedText>
      <ThemedText>{`Price: ${product.product_price}`}</ThemedText>
      <ThemedText>{`Discount: ${product.product_discount}`}</ThemedText>
      <ThemedText>{product.product_description}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});

export default ProductCard;
