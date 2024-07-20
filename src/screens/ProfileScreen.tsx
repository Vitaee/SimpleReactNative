import React , {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import  api  from '../services/api';
import { useThemeColor } from '../../hooks/useThemeColor';
import { UserApiResponse } from '@/constants/UserType';



const ProfileScreen = () => {
  const [user, setUser] = useState<UserApiResponse>(); // should include user type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const backgroundColor = useThemeColor({}, 'background');


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.replace('/splash');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await api.get('/auth/', {});
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }

    };

    fetchUserData();
  }, []);

  return (
    <ThemedView style={[styles.container, { backgroundColor } ]}>
      

      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-line-black-icon-png-image_691065.jpg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ThemedText style={styles.profileName}>Joe Doe</ThemedText>
        <ThemedText type='subtitle' style={styles.profileName}>{user?.user.email}</ThemedText>

        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="purple" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons  name="log-out" size={24} color="purple" />
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
              <ThemedText>10</ThemedText>
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
    top: 16,
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