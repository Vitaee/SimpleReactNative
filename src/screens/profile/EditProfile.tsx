import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import ImagePickerComponent from '@/components/ImagePicker';
import { useProfileStore } from '@/src/context/profile/ProfileStore';

const EditProfileScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const { user, fetchUserData} = useProfileStore();


  const backgroundColor = useThemeColor({}, 'background');

  const handleSave = () => {
    // Save logic here, could be an API call
    console.log('Profile Updated', { name, bio, location, profileImage });
  };

  useEffect(() => {   
    fetchUserData();
  }, [fetchUserData]);

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
    <ParallaxScrollView style={styles.container}>
      
      
      <ThemedView style={styles.headerContainer}>

          <ThemedView style={styles.profileImageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Ionicons name="camera-outline" size={80} color="#ccc" />
            )}
            
            <ImagePickerComponent onImagePicked={setProfileImage}  />

          </ThemedView>        
      </ThemedView>
      
      <ThemedView style={styles.inputContainer}>
        <ThemedText style={styles.label}>İsim</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <ThemedText style={styles.label}>E-mail</ThemedText>
        <TextInput
          style={styles.input}
          placeholder={user!.data.user.email}
          value={user!.data.user.email}
          editable={false}
        />
      </ThemedView>

      

      <ThemedView style={styles.inputContainer}>
        <ThemedText style={styles.label}>Kişisel Bilgiler</ThemedText>
        <TextInput
          style={[styles.input]}
          placeholder="Enter your bio"
          value={bio}
          onChangeText={setBio}
          multiline
        />
      </ThemedView>

      
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Konum</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter your location"
            value={location}
            onChangeText={setLocation}
          />
        </ThemedView>
      

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <ThemedText style={styles.saveButtonText}>Güncelle</ThemedText>
      </TouchableOpacity>
     
    </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    marginHorizontal: 20,
    marginVertical: 30,
    backgroundColor: '#1DA1F2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default EditProfileScreen;
