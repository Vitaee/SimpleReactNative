import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity,Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FullScreenImageModal = ({ isVisible, imageUri, onClose }) => {
  return (
    <Modal visible={isVisible} style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
});

export default FullScreenImageModal;