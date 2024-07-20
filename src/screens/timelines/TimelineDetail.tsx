import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { TimelineData, TimelineEvent } from '@/constants/TimelineType';

const TimelineDetailScreen = () => {
  const router = useRouter();
  const { data } = useLocalSearchParams();
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'borderColor');

  let parsedData: TimelineData | null = null;
  if (data) {
    try {
      parsedData = JSON.parse(data) as TimelineData;
    } catch (error) {
      console.error("Failed to parse data:", error);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView>

        <ThemedText type="title" style={styles.productName}>{parsedData!.product.product_name}</ThemedText>
        <ThemedText style={styles.productDescription}>{parsedData!.description}</ThemedText>
        <Image source={{ uri: parsedData!.image[0] }} style={styles.productImage} />


        <View style={styles.tags}>
          <ThemedText style={[styles.tag, { color: textColor }]}>#ruj</ThemedText>
        </View>

        <View style={styles.userContainer}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png' }} style={styles.userAvatar} />
          <View style={styles.userInfo}>
            <ThemedText style={styles.userName}>{parsedData?.user.email}</ThemedText>
            <View style={styles.userRating}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <ThemedText style={styles.userRatingText}>4.2</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.postDate}>{parsedData!.createdAt}</ThemedText>
        </View>

        <View style={[styles.productCard, { borderColor }]}>
          <Image source={{ uri: parsedData!.product.product_image[0] }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <ThemedText style={styles.productTitle}>Ürün</ThemedText>
            <ThemedText style={styles.productSubtitle}>{parsedData?.product.product_name}</ThemedText>
            <View style={styles.productRating}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <ThemedText style={styles.productRatingText}>{3.4}</ThemedText>
            </View>
          </View>
        </View>

        <ThemedText style={styles.commentSectionTitle}>Yorumlar</ThemedText>
        {parsedData!.events && parsedData!.events.map((comment: TimelineEvent, index: number) => (
          <View key={index} style={styles.commentContainer}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.commentAvatar} />
            <View style={styles.commentContent}>
              <ThemedText style={styles.commentUserName}>{comment.event.user.email}</ThemedText>
              <ThemedText style={styles.commentText}>{comment.event.text}</ThemedText>
              <View style={styles.commentRating}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <ThemedText style={styles.commentRatingText}>1.4</ThemedText>
              </View>
              <ThemedText style={styles.commentDate}>{comment.createdAt}</ThemedText>
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  tags: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tag: {
    fontSize: 16,
    backgroundColor: '#6B6767',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userRatingText: {
    marginLeft: 5,
  },
  postDate: {
    fontSize: 14,
    color: '#757575',
  },
  productCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 10,
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productSubtitle: {
    fontSize: 14,
    marginVertical: 5,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productRatingText: {
    marginLeft: 5,
  },
  commentSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentContent: {
    marginLeft: 10,
    flex: 1,
  },
  commentUserName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
    marginVertical: 5,
  },
  commentRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentRatingText: {
    marginLeft: 5,
  },
  commentDate: {
    fontSize: 12,
    color: '#757575',
    marginTop: 5,
  },
});

export default TimelineDetailScreen;
