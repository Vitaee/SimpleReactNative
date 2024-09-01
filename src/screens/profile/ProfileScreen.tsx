import React , {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { SPLASH_SCREEN } from '@/constants/Routes';
import { useProfileStore } from '@/src/context/profile/ProfileStore';
import ImagePickerComponent from '@/components/ImagePicker';
import { useFavsStore } from '@/src/context/profile/FavouritesStore';


const ProfileScreen = () => {
  const user = useProfileStore((state) => state.user);
  const loading = useProfileStore((state) => state.loading);
  const error = useProfileStore((state) => state.error);
  const fetchUserData = useProfileStore((state) => state.fetchUserData);

  const favs = useFavsStore((state) => state.favs);
  const fetUserFavs = useFavsStore((state) => state.fetchUserFavs);

  const [profileImage, setProfileImage] = useState<string | null>(null);


  const backgroundColor = useThemeColor({}, 'background');

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.replace(SPLASH_SCREEN);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetUserFavs();
  }, [fetchUserData, fetUserFavs]);

  const handleImagePicked = (uri: string) => {
    setProfileImage(uri);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor } ]}>
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: profileImage || 'https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-line-black-icon-png-image_691065.jpg' }}
            style={styles.profileImage}
          />
          
          <ImagePickerComponent onImagePicked={handleImagePicked} />

        </View>
        <ThemedText style={styles.profileName}>Joe Doe</ThemedText>
        <ThemedText type='subtitle' style={styles.profileName}>{user?.data.user.email}</ThemedText>

        <TouchableOpacity style={styles.editButton} onPress={() => {router.push('/profile/editprofile')}}>
          <Ionicons name="create-outline" size={24} color="purple" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="purple" />
        </TouchableOpacity>
        <ThemedText style={styles.profileDescription}>
          My Bio text information data long message maybe.
        </ThemedText>
      </View>

      <View style={styles.sharedSection}>
        <ThemedText style={styles.sectionTitle}>Paylaşılanlar</ThemedText>
        <View style={styles.sharedCount}>
          <ThemedText style={styles.countText}>10</ThemedText>
        </View>
      </View>

      <View style={styles.productCard}>
        <Image
          source={{ uri: 'https://example.com/lipstick-image.jpg' }}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <ThemedText style={styles.productName}>Inglot Ruj E439 Red</ThemedText>
          <ThemedText style={styles.productDescription}>
            Lorem ipsum dolor sit amet, cons adipiscing elit. Adipiscing sit amet...
          </ThemedText>
          <View style={styles.productStats}>
            <View style={styles.stat}>
              <Ionicons name="heart" size={16} color="purple" />
              <ThemedText>4.5</ThemedText>
            </View>
            <View style={styles.stat}>
              <Ionicons name="chatbubble-outline" size={16} color="gray" />
              <ThemedText>2</ThemedText>
            </View>
          </View>
        </View>        
      </View>    
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    padding: 16,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'green',
    borderRadius: 15,
    padding: 5,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editButton: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  logoutButton: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  profileDescription: {
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  sharedSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sharedCount: {
    backgroundColor: '#555353',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  countText: {
    fontWeight: 'bold',
  },
  productCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    marginTop: 5,
    color: 'gray',
  },
  productStats: {
    flexDirection: 'row',
    marginTop: 10,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
});

export default ProfileScreen;