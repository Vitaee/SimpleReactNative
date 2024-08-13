import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FormHeader from './formHeader';
import { ThemedText } from '../ThemedText';
import { router } from 'expo-router';
import { ThemedView } from '../ThemedView';
import ImagePickerComponent from '../ImagePicker';
import { useTimelineStore } from '@/src/context/timeline/TimelineStore';
import { TimelineFormData } from '@/constants/TimelineType';



const FormDetails: React.FC = () => {
  const [formData, setFormData] = useState<TimelineFormData>({ description: '', title: '' });
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const { createTimeline, timelineCreated, loading, error  } = useTimelineStore();

  const handleSubmit = async () => {
    await createTimeline(formData);
  };

  const handleImagePicked = (imageUri: string) => {
    setSelectedImages([...selectedImages, imageUri]);
    setFormData({ ...formData, image: [...(formData.image || []), imageUri] });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    const updatedFormImages = formData.image ? [...formData.image] : [];
    updatedFormImages.splice(index, 1);
    setFormData({ ...formData, image: updatedFormImages });
  };

  useEffect(() => {
    if (timelineCreated) {
      console.log('Timeline created successfully');
      router.replace('/forms/formconfirm');
    } else if (error) {
      console.log('Failed to create timeline:', error);
    }
  }, [timelineCreated, loading, error, router]);

  return (
    <ThemedView style={styles.container}>
      <FormHeader title="Form Detayları" subTitle="Başlık, açıklama veya görsel ekleyerek içeriğinizi oluşturun!" step={1} />
      <ScrollView style={styles.scrollView}>
        <ThemedText style={styles.productName}>Başlık</ThemedText>
        <TextInput
          style={styles.titleInput}
          placeholder="Başlık ( opsiyonel )"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
        />
                
        <ThemedText style={styles.productName}>Açıklama</ThemedText>

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
          <ImagePickerComponent onImagePicked={handleImagePicked} />
        </TouchableOpacity>

        {selectedImages.length > 0 && (
          <ThemedView style={styles.imagePreviewContainer}>
            {selectedImages.map((imageUri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveImage(index)}>
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </ThemedView>
        )}

      </ScrollView>
      <ThemedView style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleSubmit} disabled={loading}>
          <ThemedText type='title'>{loading ? 'Oluşturuluyor...' : 'Paylaş'}</ThemedText>
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
  titleInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 40,
    color: '#E0E0E0',
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
    width: 190,
    height: 50,
  },
  uploadButtonText: {
    marginLeft: 8,
    color: '#6200EE',
  },
  bottomContainer: {
    padding: 16,
  },

  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 4,
  
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
    marginBottom: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  editButton: {
    backgroundColor: '#F0F0F0',
    marginBottom: 8,
  },
});

export default FormDetails;