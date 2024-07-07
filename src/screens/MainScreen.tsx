import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import api from "../services/api"
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';



interface Brand {
    count: number;
    brand_name: string;
    brand_logo: string;
    brand_id: string;
    
}


export default function MainScreen() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const cardBackgroundColor = useThemeColor({}, 'cardBackground');
    const borderColor = useThemeColor({}, 'borderColor');
    const navigation = useNavigation();
  
    useEffect(() => {
      const fetchBrands = async () => {
        try {
          const response = await api.get('/product/brand/discounts/');
          if (response.data.success) {
            setBrands(response.data.data);
          }
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      };
  
      fetchBrands();
    }, []);
  
    const handleBrandPress = (brandId: string, brandName: string) => {
      console.log(brandName);
        router.replace({ pathname: "/products", params: { brandId: brandId, brandName: brandName } });
    };
  
    return (
      <ThemedView style={[styles.container, { backgroundColor }]}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ89z2EoiIKoPHSP7MXxpFqXmxt5m-yle52hLQqbzi6MRGhygMgctSnuq_Qlw&s' }}
              style={styles.profilePic}
            />
            <View>
              <ThemedText style={styles.greeting}>Merhaba,</ThemedText>
              <ThemedText style={styles.username}>Joe Doe</ThemedText>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={textColor} />
          </TouchableOpacity>
        </View>
  
        <ScrollView style={styles.content}>
          <View style={[styles.promoCard, { backgroundColor: '#6b46c1' }]}>
            <ThemedText style={styles.promoText}>Gratis'te sevdiğin ruj 20 ₺</ThemedText>
          </View>
  
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerScroll}>
            <View style={[styles.bannerCard, { backgroundColor: '#8b5cf6' }]}>
              <ThemedText style={styles.bannerTitle}>NOTE & PASTEL</ThemedText>
              <ThemedText style={styles.bannerSubtitle}>makyaj ürünlerinde</ThemedText>
              <ThemedText style={styles.bannerDiscount}>%40 İNDİRİM</ThemedText>
            </View>
            {/* Add more banner cards here */}
          </ScrollView>
  
          <ThemedText style={styles.sectionTitle}>Tüm Markalar</ThemedText>
          <ThemedText style={styles.sectionSubtitle}>Farklı markalardan ürünleri keşfet indirimleri kaçırma!</ThemedText>
  
          <View style={styles.brandList}>
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand.brand_id}
                style={[styles.brandCard, { backgroundColor: cardBackgroundColor, borderColor }]}
                onPress={() => handleBrandPress(brand.brand_id, brand.brand_name)}
              >
                <Image
                  source={{ uri: brand.brand_logo }}
                  style={styles.brandLogo}
                />
                <ThemedText style={styles.brandName}>{brand.brand_name}</ThemedText>
                <ThemedText style={styles.brandDiscount}>{brand.count} Yeni İndirim</ThemedText>
                <ThemedText style={styles.viewAll}>Tümünü Gör →</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ThemedView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  greeting: {
    fontSize: 14,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  promoCard: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  promoText: {
    color: 'white',
    fontSize: 16,
  },
  bannerScroll: {
    paddingLeft: 16,
  },
  bannerCard: {
    width: 280,
    height: 150,
    marginRight: 16,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 14,
  },
  bannerDiscount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 24,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 16,
  },
  brandList: {
    paddingHorizontal: 16,
  },
  brandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
  },
  brandLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  brandDiscount: {
    fontSize: 14,
  },
  viewAll: {
    fontSize: 14,
    color: '#6b46c1',
  },
});

