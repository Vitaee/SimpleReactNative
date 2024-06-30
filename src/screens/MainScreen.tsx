import React from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function MainScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const borderColor = useThemeColor({}, 'borderColor');

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
          <View style={[styles.bannerCard, { backgroundColor: '#8b5cf6' }]}>
            <ThemedText style={styles.bannerTitle}>Ruj & PASTEL</ThemedText>
            <ThemedText style={styles.bannerDiscount}>%30 İNDİRİM</ThemedText>
          </View>
          <View style={[styles.bannerCard, { backgroundColor: '#8b5cf6' }]}>
            <ThemedText style={styles.bannerTitle}>Kalem & PASTEL</ThemedText>
            <ThemedText style={styles.bannerDiscount}>%20 İNDİRİM</ThemedText>
          </View>
          {/* Add more banner cards here */}
        </ScrollView>

        <ThemedText style={styles.sectionTitle}>İndirimli Markalar</ThemedText>
        <ThemedText style={styles.sectionSubtitle}>Aktüel ürünleri keşfet indirimleri kaçırma</ThemedText>

        <View style={styles.brandList}>
          {['Watsons', 'Eve', 'Gratis'].map((brand, index) => (
            <TouchableOpacity key={index} style={[styles.brandCard, { backgroundColor: cardBackgroundColor, borderColor }]}>
              <Image
                source={{ uri: `https://banner2.cleanpng.com/20180811/pvw/kisspng-watsons-retail-personal-care-cosmetics-beauty-watsons-id-apps-on-google-play-5b6f0f265db177.8070437615340050303838.jpg` }}
                style={styles.brandLogo}
              />
              <ThemedText style={styles.brandName}>{brand}</ThemedText>
              <ThemedText style={styles.brandDiscount}>100 Yeni İndirim</ThemedText>
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

