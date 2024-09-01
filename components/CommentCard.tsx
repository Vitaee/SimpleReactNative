import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';

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
        source={{ uri: 'https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png' }} 
        style={styles.profilePicture} 
      />
      <ThemedView style={styles.commentContent}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.userName}>{userName}</ThemedText>
          <ThemedText style={styles.userHandle}>@{userEmail.split('@')[0]}</ThemedText>
          <ThemedText style={styles.timestamp}>{new Date(comment?.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</ThemedText>
        </ThemedView>
        <ThemedText style={styles.commentText}>{comment?.event.text}</ThemedText>
        <ThemedView style={styles.engagementRow}>
          <View style={styles.engagementItem}>
            <Ionicons name="chatbubble-outline" size={16} color="#6e767d" />
            <ThemedText style={styles.engagementText}>19</ThemedText>
          </View>
          <View style={styles.engagementItem}>
            <Ionicons name="heart-outline" size={16} color="#6e767d" />
            <ThemedText style={styles.engagementText}>1K</ThemedText>
          </View>
          <View style={styles.engagementItem}>
            <Ionicons name="repeat" size={16} color="#6e767d" />
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
    marginBottom: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
    paddingBottom: 15,
  },
  profilePicture: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
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
    marginRight: 5,
  },
  userHandle: {
    color: '#6e767d',
    marginRight: 5,
  },
  timestamp: {
    color: '#6e767d',
  },
  commentText: {
    marginTop: 5,
    marginBottom: 10,
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
    marginLeft: 5,
    color: '#6e767d',
  },
});

export default CommentItem;