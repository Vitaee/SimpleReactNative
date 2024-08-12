import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { TimelineData, TimelineEvent } from '@/constants/TimelineType';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Comments from '@/components/Comments';

const TimelineDetailScreen = () => {
  const { data } = useLocalSearchParams();
  const textColor = useThemeColor({}, 'primaryText');
  const borderColor = useThemeColor({}, 'borderColor');

  let parsedData: TimelineData | null = null;
  if (data) {
    try {
      parsedData = JSON.parse(data) as TimelineData;
    } catch (error) {
      console.error("Failed to parse data:", error);
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.select({ ios: 100, android: 70 })}
    >
      <ThemedView style={styles.container}>
        <ParallaxScrollView>

          
        <ThemedView style={styles.userContainer}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png' }} style={styles.userAvatar} />
            <ThemedView style={styles.userInfo}>
              <ThemedText style={styles.userName}>{parsedData?.user.email}</ThemedText>
              
            </ThemedView>
            <ThemedText style={styles.postDate}>{formatDate(parsedData!.createdAt)}</ThemedText>
          </ThemedView>


          <ThemedText type="title" style={styles.productName}>{parsedData!.title}</ThemedText>

          <ThemedText style={styles.productDescription}>{parsedData!.description}</ThemedText>
          <Image source={{ uri: parsedData!.image[0] }} style={styles.productImage} />

        
          <Comments commentCount={1} onCommentSubmit={() => {}} />

          <ThemedText style={styles.commentSectionTitle}>Yorumlar ( {parsedData!.comment_count} ) adet</ThemedText>
          {parsedData!.events && parsedData!.events.map((comment: TimelineEvent, index: number) => (
            comment.event.text != null && comment.event.text != "" ?
            <ThemedView key={index} style={styles.commentContainer}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.commentAvatar} />
              <ThemedView style={styles.commentContent}>
                <ThemedText style={styles.commentUserName}>{comment.event.user.email}</ThemedText>
                <ThemedText style={styles.commentDate}>{formatDate(comment.createdAt)}</ThemedText>

                <ThemedText style={styles.commentText}>Test yorum</ThemedText>
                
              </ThemedView>
            </ThemedView>
            : null
          ))}


        </ParallaxScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
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
    width: 340,
    height: 340,
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
    marginTop: 18
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
    fontSize: 14,
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
