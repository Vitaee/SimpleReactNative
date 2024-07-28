import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';


const CommentSection = ({ commentCount, onCommentSubmit }) => {
  const [comment, setComment] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onCommentSubmit(comment);
      setComment('');
      setInputFocused(false);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.commentsContainer}>
      <ThemedText style={styles.commentsTitle} type="title">
        Yorumlar
      </ThemedText>
      <ThemedText style={styles.commentCount} type="default">
        {commentCount}
      </ThemedText>
      <TouchableOpacity
        style={[styles.commentInput, isInputFocused && { borderColor: '#FF6B6B' }]}
        onPress={() => setInputFocused(true)}
      >
        <Ionicons name="chatbox-ellipses-outline" size={24} color="#999" />
        <TextInput
          style={[styles.commentPlaceholder, { color: '#999' }]}
          placeholder="Yorumunuzu ekleyin..."
          placeholderTextColor="#999"
          value={comment}
          onChangeText={setComment}
          onSubmitEditing={handleCommentSubmit}
          onBlur={() => setInputFocused(false)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  commentsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentCount: {
    fontSize: 14,
    color: '#999',
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 16,
  },
  commentPlaceholder: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default CommentSection;