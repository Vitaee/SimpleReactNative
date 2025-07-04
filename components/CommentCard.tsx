import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { AVATAR_URLS, COMMON_COLORS, TYPOGRAPHY, SPACING, AVATAR_SIZES } from '@/constants/CommonConstants';
import { formatTime, extractUsernameFromEmail } from '@/utils/formatters';

interface CommentItemProps {
  comment: {
    event: {
      text: string;
      user: {
        profilePicture?: string;
        name?: string;
        email: string;
      };
    };
    createdAt: string;
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const userEmail = comment?.event.user.email;
  const userName = comment?.event.user.name || userEmail;

  return (
    <ThemedView style={styles.commentContainer}>
      <Image 
        source={{ uri: AVATAR_URLS.COMMENT_PLACEHOLDER }} 
        style={styles.profilePicture} 
        accessible={true}
        accessibilityLabel={`Profile picture of ${userName}`}
      />
      <ThemedView style={styles.commentContent}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.userName}>{userName}</ThemedText>
          <ThemedText style={styles.userHandle}>@{extractUsernameFromEmail(userEmail)}</ThemedText>
          <ThemedText style={styles.timestamp}>{formatTime(comment?.createdAt)}</ThemedText>
        </ThemedView>
        <ThemedText 
          style={styles.commentText}
          accessible={true}
          accessibilityLabel={`Comment by ${userName}: ${comment?.event.text}`}
        >
          {comment?.event.text}
        </ThemedText>
        <ThemedView style={styles.engagementRow}>
          <View style={styles.engagementItem}>
            <Ionicons name="chatbubble-outline" size={16} color={COMMON_COLORS.ENGAGEMENT_TEXT} />
            <ThemedText style={styles.engagementText}>19</ThemedText>
          </View>
          <View style={styles.engagementItem}>
            <Ionicons name="heart-outline" size={16} color={COMMON_COLORS.ENGAGEMENT_TEXT} />
            <ThemedText style={styles.engagementText}>1K</ThemedText>
          </View>
          <View style={styles.engagementItem}>
            <Ionicons name="repeat" size={16} color={COMMON_COLORS.ENGAGEMENT_TEXT} />
            <ThemedText style={styles.engagementText}>3.4K</ThemedText>
          </View>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.XLARGE,
    borderBottomWidth: 0.3,
    borderBottomColor: COMMON_COLORS.BORDER_GRAY,
    paddingBottom: 15,
  },
  profilePicture: {
    width: AVATAR_SIZES.MEDIUM,
    height: AVATAR_SIZES.MEDIUM,
    borderRadius: AVATAR_SIZES.MEDIUM / 2,
    marginRight: SPACING.MEDIUM,
  },
  commentContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    marginRight: SPACING.SMALL,
  },
  userHandle: {
    color: COMMON_COLORS.ENGAGEMENT_TEXT,
    marginRight: SPACING.SMALL,
  },
  timestamp: {
    color: COMMON_COLORS.ENGAGEMENT_TEXT,
  },
  commentText: {
    marginTop: SPACING.SMALL,
    marginBottom: SPACING.MEDIUM,
    lineHeight: 20,
  },
  engagementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  engagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementText: {
    marginLeft: SPACING.SMALL,
    color: COMMON_COLORS.ENGAGEMENT_TEXT,
  },
});

export default CommentItem;