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
import { AVATAR_URLS, COMMON_COLORS, TYPOGRAPHY, SPACING, AVATAR_SIZES } from '@/constants/CommonConstants';
import { formatDateTime, isNotEmpty } from '@/utils/formatters';

const TimelineDetailScreen = () => {
  const { data } = useLocalSearchParams();
  const textColor = useThemeColor({}, 'primaryText');
  const borderColor = useThemeColor({}, 'borderColor');

  let parsedData: TimelineData | null = null;
  if (data) {
    try {
      const dataString = Array.isArray(data) ? data[0] : data;
      parsedData = JSON.parse(dataString) as TimelineData;
    } catch (error) {
      console.error("Failed to parse data:", error);
    }
  }

  const formatDate = formatDateTime;

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.select({ ios: 100, android: 70 })}
    >
      <ThemedView style={styles.container}>
        <ParallaxScrollView>

          
        <ThemedView style={styles.userContainer}>
            <Image 
              source={{ uri: AVATAR_URLS.PROFILE_PLACEHOLDER }} 
              style={styles.userAvatar} 
              accessible={true}
              accessibilityLabel={`Profile picture of ${parsedData?.user.email}`}
            />
            <ThemedView style={styles.userInfo}>
              <ThemedText style={styles.userName}>{parsedData?.user.email}</ThemedText>
              
            </ThemedView>
            <ThemedText style={styles.postDate}>{formatDate(parsedData!.createdAt)}</ThemedText>
          </ThemedView>


          <ThemedText type="title" style={styles.productName}>{parsedData!.title}</ThemedText>

          <ThemedText style={styles.productDescription}>{parsedData!.description}</ThemedText>
          <Image 
            source={{ uri: parsedData!.image[0] }} 
            style={styles.productImage} 
            accessible={true}
            accessibilityLabel={`Product image for ${parsedData!.title}`}
          />

        
          <Comments commentCount={1} onCommentSubmit={() => {}} />

          <ThemedText style={styles.commentSectionTitle}>Yorumlar ( {parsedData!.comment_count} ) adet</ThemedText>
          {parsedData!.events && parsedData!.events.map((comment: TimelineEvent, index: number) => (
            isNotEmpty(comment.event.text) ?
            <ThemedView key={index} style={styles.commentContainer}>
              <Image source={{ uri: AVATAR_URLS.DEFAULT_USER }} style={styles.commentAvatar} />
              <ThemedView style={styles.commentContent}>
                <ThemedText style={styles.commentUserName}>{comment.event.user.email}</ThemedText>
                <ThemedText style={styles.commentDate}>{formatDate(comment.createdAt)}</ThemedText>

                <ThemedText style={styles.commentText}>{comment.event.text}</ThemedText>
                
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
    paddingHorizontal: SPACING.LARGE,
    paddingTop: SPACING.LARGE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XLARGE,
  },
  title: {
    fontSize: TYPOGRAPHY.LARGE_TEXT,
    marginLeft: SPACING.MEDIUM,
  },
  productName: {
    fontSize: TYPOGRAPHY.TITLE_SIZE,
    fontWeight: 'bold',
    marginBottom: SPACING.MEDIUM,
  },
  productDescription: {
    fontSize: TYPOGRAPHY.MEDIUM_TEXT,
    marginBottom: SPACING.XLARGE,
  },
  tags: {
    flexDirection: 'row',
    marginBottom: SPACING.XLARGE,
  },
  tag: {
    fontSize: TYPOGRAPHY.MEDIUM_TEXT,
    backgroundColor: COMMON_COLORS.TAG_BACKGROUND,
    borderRadius: SPACING.MEDIUM,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XLARGE,
  },
  userAvatar: {
    width: AVATAR_SIZES.SMALL,
    height: AVATAR_SIZES.SMALL,
    borderRadius: AVATAR_SIZES.SMALL / 2,
  },
  userInfo: {
    marginLeft: SPACING.MEDIUM,
    flex: 1,
  },
  userName: {
    fontSize: TYPOGRAPHY.MEDIUM_TEXT,
    fontWeight: 'bold',
  },
  userRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userRatingText: {
    marginLeft: SPACING.SMALL,
  },
  postDate: {
    fontSize: TYPOGRAPHY.SMALL_TEXT,
    color: COMMON_COLORS.MUTED_TEXT,
  },
  productCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: SPACING.MEDIUM,
    padding: SPACING.MEDIUM,
    marginBottom: SPACING.XLARGE,
  },
  productImage: {
    width: 340,
    height: 340,
    borderRadius: SPACING.MEDIUM,
  },
  productDetails: {
    marginLeft: SPACING.MEDIUM,
    flex: 1,
  },
  productTitle: {
    fontSize: TYPOGRAPHY.MEDIUM_TEXT,
    fontWeight: 'bold',
  },
  productSubtitle: {
    fontSize: TYPOGRAPHY.SMALL_TEXT,
    marginVertical: SPACING.SMALL,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productRatingText: {
    marginLeft: SPACING.SMALL,
  },
  commentSectionTitle: {
    fontSize: TYPOGRAPHY.LARGE_TEXT,
    fontWeight: 'bold',
    marginBottom: SPACING.MEDIUM,
    marginTop: TYPOGRAPHY.LARGE_TEXT,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.XLARGE,
  },
  commentAvatar: {
    width: AVATAR_SIZES.SMALL,
    height: AVATAR_SIZES.SMALL,
    borderRadius: AVATAR_SIZES.SMALL / 2,
  },
  commentContent: {
    marginLeft: SPACING.MEDIUM,
    flex: 1,
  },
  commentUserName: {
    fontSize: TYPOGRAPHY.SMALL_TEXT,
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: TYPOGRAPHY.SMALL_TEXT,
    marginVertical: SPACING.SMALL,
  },
  commentRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentRatingText: {
    marginLeft: SPACING.SMALL,
  },
  commentDate: {
    fontSize: TYPOGRAPHY.TINY_TEXT,
    color: COMMON_COLORS.MUTED_TEXT,
    marginTop: SPACING.SMALL,
  },
});

export default TimelineDetailScreen;
