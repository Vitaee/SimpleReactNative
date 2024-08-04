import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FormHeader from './formHeader';
import { ThemedText } from '../ThemedText';
import { router } from 'expo-router';
import { ThemedView } from '../ThemedView';
import ImagePickerComponent from '../ImagePicker';

type RootStackParamList = {
  FormDetails: { productName: string };
  Confirmation: { productName: string; formDetails: FormData };
};

type FormDetailsScreenRouteProp = RouteProp<RootStackParamList, 'FormDetails'>;
type FormDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FormDetails'>;

type FormDetailsProps = {
  route: FormDetailsScreenRouteProp;
  navigation: FormDetailsScreenNavigationProp;
};

type FormData = {
  description: string;
};

const FormDetails: React.FC<FormDetailsProps> = ({ route, navigation }) => {
  const [formData, setFormData] = useState<FormData>({ description: '' });

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <ThemedView style={styles.container}>
      <FormHeader title="Form Detayları" subTitle="Paylaşmak istediğiniz ürünün fotoğrafını seçebilirsiniz." step={2} />
      <ScrollView style={styles.scrollView}>
        <ThemedText style={styles.productName}>Selected Product Name</ThemedText>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          placeholder="Bu ürün bir harika..."
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
        />
        <TouchableOpacity style={styles.uploadButton}>
          <Ionicons name="camera-outline" size={24} color="#6200EE" />
          <ThemedText style={styles.uploadButtonText}>Fotoğraf Ekle</ThemedText>
          <ImagePickerComponent onImagePicked={() => {}} />
        </TouchableOpacity>
      </ScrollView>
      <ThemedView style={styles.bottomContainer}>
        <TouchableOpacity onPress={ () => { router.push('/forms/formconfirm')}}>
          <ThemedText type='title'> Önizleme </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 100,
    color: '#E0E0E0',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    marginLeft: 8,
    color: '#6200EE',
  },
  bottomContainer: {
    padding: 16,
  },
  editButton: {
    backgroundColor: '#F0F0F0',
    marginBottom: 8,
  },
});

export default FormDetails;