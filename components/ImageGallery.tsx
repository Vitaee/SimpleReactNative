// components/ImageGallery.js
import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import FullScreenImageModal from './ImageModal'; // Import the modal component

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ImageGallery = ({ images }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUri) => {
    setSelectedImage(imageUri);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons
        loop={false}
        height={screenHeight / 3} // Adjust the height here if necessary
      >
        {images.map((image, index) => (
          <TouchableOpacity key={index} style={styles.slide} onPress={() => openModal(image)}>
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </Swiper>
      <FullScreenImageModal
        isVisible={isModalVisible}
        imageUri={selectedImage}
        onClose={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight / 3, // Adjust the height as needed
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: screenWidth,
    height: screenHeight / 3, // Ensure this matches the container height
    resizeMode: 'cover',
  },
});

export default ImageGallery;
