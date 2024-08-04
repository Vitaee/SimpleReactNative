import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

interface ProductItemProps {
  name: string;
  price: string;
  imageUrl: string;
  onPress: () => void;
}

const FormProductItem: React.FC<ProductItemProps> = ({ name, price, imageUrl, onPress }) => {
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <ThemedView style={styles.textContainer}>
        <ThemedText style={styles.name} type='title'>{name}</ThemedText>
        <ThemedText style={styles.price} type='subtitle'>{price}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#6200EE',
  },
});

export default FormProductItem;