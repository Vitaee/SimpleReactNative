import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { TimelineApiResponse, TimelineData } from '@/constants/TimelineType';
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';
import { TIMELINE_DETAIL_SCREEN } from '@/constants/Routes';
import { useTimelineStore } from '@/src/context/timeline/TimelineStore';

const TimelineScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'primaryText');
  const borderColor = useThemeColor({}, 'borderColor');

  const router = useRouter();

  const timeline = useTimelineStore((state) => state.timeline);
  const loading = useTimelineStore((state) => state.loading);
  const error = useTimelineStore((state) => state.error);
  const pageNumber = useTimelineStore((state) => state.pageNumber);
  const totalPages = useTimelineStore((state) => state.totalPages);
  const fetchTimelines = useTimelineStore((state) => state.fetchTimelines);
  const likeOrUnlikeTimeline = useTimelineStore((state) => state.likeOrUnlikeTimeline);


  const handleSearch = (text: string) => {
    setSearchQuery(text);
    fetchTimelines(1, text); // Fetch the first page with search query
  };

  const handleItemPress = (item: TimelineData) => {
    router.push({
      pathname: TIMELINE_DETAIL_SCREEN,
      params: {
        data: JSON.stringify(item),
      },
    });
  };

  const handleLikePress = async (item: TimelineData) => {
    let type = "";
    item.events.map((m => {m.event.user._id == '' })) ? 'unlike' : 'like';
    await likeOrUnlikeTimeline(item._id, type, "0");
  };

  const loadMore = () => {
    if (pageNumber < totalPages && !loading) {
      fetchTimelines(pageNumber + 1, searchQuery); // Fetch the next page
    }
  };

  useEffect(() => {
    fetchTimelines(); // Fetch the initial page
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color={textColor} />;
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      {error ? (
        <ThemedText type="title">{error}</ThemedText>
      ) : (
        <FlatList
          data={timeline}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item._id}
              style={[styles.card, { borderColor }]}
              onPress={() => handleItemPress(item)}
            >
              <Image source={{ uri: item.image[0] }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <ThemedText style={[styles.productName, { color: textColor }]}>
                  {item.product.product_name}
                </ThemedText>
                <ThemedText style={[styles.productDescription, { color: textColor }]}>
                  {item.description}
                </ThemedText>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => {handleLikePress(item)}}>
                    <Ionicons name={item.events ? "heart" : "heart-outline"} size={20} color={textColor}  />
                    <ThemedText style={[styles.actionText, { color: textColor }]}>
                      {item.like_count}
                    </ThemedText>
                  </TouchableOpacity>
                
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
      <TouchableOpacity onPress={() => { router.push('/forms/form') }}>
        <ThemedText type='title'> Bir şeyler Paylaş </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    padding: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
  },
});

export default TimelineScreen;
