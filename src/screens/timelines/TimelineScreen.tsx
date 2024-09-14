import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { TimelineApiResponse, TimelineData } from '@/constants/TimelineType';
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';
import { TIMELINE_DETAIL_SCREEN } from '@/constants/Routes';
import { useTimelineStore } from '@/src/context/timeline/TimelineStore';
import { formatDate } from '@/src/services/utils';
import { useProfileStore } from '@/src/context/profile/ProfileStore';

const TimelineScreen = () => {
  const user = useProfileStore((state) => state.user);
  const fetchUserData = useProfileStore((state) => state.fetchUserData);


  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);


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
    let type = "like";
    let timeline_event = "";

    if (item.events.length > 0) {
      item.events.map((m => { if (m.event.user._id == user?.data.user._id) { type = "unlike"; timeline_event = m._id} }));
    }
    
    await likeOrUnlikeTimeline(item._id, type, timeline_event);
  };

  const loadMore = () => {
    if (pageNumber < totalPages && !loading) {
      fetchTimelines(pageNumber + 1, searchQuery); // Fetch the next page
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTimelines(1, searchQuery);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchTimelines(); 
    fetchUserData();
  }, [fetchUserData]);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color={textColor} />;
  };

  const { applyFilters } = useTimelineStore();

  const handleApplyFilters = (filters: any) => {
    console.log(filters);
    applyFilters(filters, 1);
  };

  return (
    <ThemedView style={styles.container}>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} filtersProvider={handleApplyFilters}  />
      {error ? (
        <ThemedText type="title">{error}</ThemedText>
      ) : (
        <FlatList
          data={timeline}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity key={item._id} style={styles.card} onPress={() => handleItemPress(item)}>
              <Image source={{ uri: "https://www.pinclipart.com/picdir/middle/541-5416602_dummy-profile-image-url-clipart.png" }} style={styles.profileImage} />
              <ThemedView style={styles.content}>
                  <ThemedView style={styles.header}>
                    <ThemedText style={styles.userName}>{item.user.email}</ThemedText>
                    <ThemedText style={styles.timestamp}>{formatDate(item.createdAt)}</ThemedText>
                  </ThemedView>
                  <ThemedText style={styles.postText}>{item.description}</ThemedText>
                  {item.image[0] || item.product.product_image[0] ? (
                    <Image source={{ uri: item.image[0] ?? item.product.product_image[0] }} style={styles.postImage} />
                  ) : null}
                  <ThemedView style={styles.actions}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleLikePress(item)}>
                      <Ionicons name={item.events ? "heart" : "heart-outline"} size={20} color="red" />
                      <ThemedText style={styles.actionText}>{item.like_count}</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleLikePress(item)}>
                      <Ionicons name={item.events ? "bookmark" : "bookmark-outline"} size={20} color="#666" />
                      <ThemedText style={styles.actionText}>{item.like_count}</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleLikePress(item)}>
                      <Ionicons name={item.events ? "chatbubble": "chatbubble-outline"} size={20} color="#666" />
                      <ThemedText style={styles.actionText}>{item.like_count}</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleLikePress(item)}>
                      <Ionicons name={item.events ? "share": "share-outline"} size={20} color="#666" />
                      <ThemedText style={styles.actionText}>{item.like_count}</ThemedText>
                    </TouchableOpacity>
                    {/* Add more action buttons like comment and share here */}
                  </ThemedView>
              </ThemedView>
            </TouchableOpacity>
          )}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={textColor} />
          }
        />
      )}
      <TouchableOpacity onPress={() => { router.push('/forms/form') }} style={{width:60, height:60, borderRadius:20, backgroundColor: "transparent"}}>
        <Ionicons name='add-circle' size={60} color="#1DA1F2" />
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
    padding: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    color: '#657786',
    fontSize: 12,
  },
  postText: {
    marginTop: 5,
    fontSize: 15,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
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
    color: '#666',
    fontSize: 14,
  },
});

export default TimelineScreen;
