import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

interface ImagePickerComponentProps {
  onImagePicked: (uri: string) => void;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({ onImagePicked }) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      onImagePicked(uri);
    }
  };

  return (
    <TouchableOpacity style={styles.addButton} onPress={pickImage}>
        <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
          
  );
};

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'green',
        borderRadius: 15,
        padding: 5,
      },
});

export default ImagePickerComponent;
