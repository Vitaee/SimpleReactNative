import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FormHeader from './formHeader';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

type RootStackParamList = {
  Confirmation: { productName: string; formDetails: { description: string } };
};

type ConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'Confirmation'>;
type ConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Confirmation'>;

type ConfirmationProps = {
  route: ConfirmationScreenRouteProp;
  navigation: ConfirmationScreenNavigationProp;
};

const Confirmation: React.FC<ConfirmationProps> = ({ route }) => {
  //const { productName, formDetails } = route.params;

  return (
    <ThemedView style={styles.container}>
      <FormHeader title="Ön İzleme" subTitle='Harika içeriğinizi paylaşmaya hazır mısınız?' step={3} />
      <ThemedView style={styles.content}>
        <ThemedView style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
        </ThemedView>
        <ThemedText style={styles.title}>Tebrikler</ThemedText>
        <ThemedText style={styles.subtitle}>Formunuzu başarılı şekilde doldurdunuz.</ThemedText>
        <ThemedView style={styles.productCard}>
          <Image
            source={{ uri: 'https://example.com/placeholder-image.jpg' }}
            style={styles.productImage}
          />
          <ThemedView style={styles.productInfo}>
            <ThemedText style={styles.productName}>Product Name</ThemedText>
            <ThemedText style={styles.rating}>
              <Ionicons name="star" size={16} color="#FFC107" /> 4.5
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedText style={styles.description}>Form Description</ThemedText>

        <TouchableOpacity>
          <ThemedText type='title'>Paylaş</ThemedText>

        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  successIcon: {
    marginTop: 32,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default Confirmation;