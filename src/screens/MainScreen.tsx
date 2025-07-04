import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useBrandStore } from '../context/main/BrandsStore'; // Adjust the path as necessary
import { PRODUCT_SCREEN } from '@/constants/Routes';
import { TYPOGRAPHY, SPACING, AVATAR_SIZES } from '@/constants/CommonConstants';


export default function MainScreen() {
  const brands = useBrandStore((state) => state.brands);
  const loading = useBrandStore((state) => state.loading);
  const error = useBrandStore((state) => state.error);
  const fetchBrands = useBrandStore((state) => state.fetchBrands);
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'primaryText');
  const cardBackgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'borderColor');
  const router = useRouter();

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleBrandPress = (brandId: string, brandName: string) => {
    router.replace({ pathname: PRODUCT_SCREEN, params: { brandId, brandName } });
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
            {loading ? <ActivityIndicator size="large" color={textColor} /> : 
            ( error ? <ThemedText style={{ color: textColor }}>{error}</ThemedText> : brands.map((brand) => (
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
            )))}
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
    width: AVATAR_SIZES.SMALL,
    height: AVATAR_SIZES.SMALL,
    borderRadius: AVATAR_SIZES.SMALL / 2,
    marginRight: SPACING.MEDIUM,
  },
  greeting: {
    fontSize: TYPOGRAPHY.SMALL_TEXT,
  },
  username: {
    fontSize: TYPOGRAPHY.MEDIUM_TEXT,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  promoCard: {
    margin: SPACING.LARGE,
    padding: SPACING.LARGE,
    borderRadius: 8,
  },
  promoText: {
    color: 'white',
    fontSize: TYPOGRAPHY.MEDIUM_TEXT,
  },
  bannerScroll: {
    paddingLeft: SPACING.LARGE,
  },
  bannerCard: {
    width: 280,
    height: 150,
    marginRight: SPACING.LARGE,
    borderRadius: 8,
    padding: SPACING.LARGE,
    justifyContent: 'center',
  },
  bannerTitle: {
    color: 'white',
    fontSize: TYPOGRAPHY.LARGE_TEXT,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: TYPOGRAPHY.SMALL_TEXT,
  },
  bannerDiscount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.LARGE_TEXT,
    fontWeight: 'bold',
    marginLeft: SPACING.LARGE,
    marginTop: 24,
  },
  sectionSubtitle: {
    fontSize: TYPOGRAPHY.SMALL_TEXT,
    marginLeft: SPACING.LARGE,
    marginBottom: SPACING.LARGE,
  },
  brandList: {
    paddingHorizontal: SPACING.LARGE,
  },
  brandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.LARGE,
    borderRadius: 8,
    marginBottom: SPACING.MEDIUM,
    borderWidth: 1,
  },
  brandLogo: {
    width: AVATAR_SIZES.SMALL,
    height: AVATAR_SIZES.SMALL,
    borderRadius: AVATAR_SIZES.SMALL / 2,
    marginRight: SPACING.MEDIUM,
  },
  brandName: {
    fontSize: TYPOGRAPHY.MEDIUM_TEXT,
    fontWeight: 'bold',
    flex: 1,
  },
  brandDiscount: {
    fontSize: TYPOGRAPHY.SMALL_TEXT,
  },
  viewAll: {
    fontSize: TYPOGRAPHY.SMALL_TEXT,
    color: '#6b46c1',
  },
});

