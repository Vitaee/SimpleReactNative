import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import api from '../services/api';
import { useThemeColor } from '../../hooks/useThemeColor';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import { TimelineApiResponse, TimelineData } from '@/constants/TimelineType';
import SearchBar from '@/components/SearchBar';

const TimelineScreen = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const borderColor = useThemeColor({}, 'borderColor');
    const navigation = useNavigation();

    const [timelineData, setTimelineData] = useState<TimelineData[]>([]);

    useEffect(() => {
        const fetchTimelineData = async () => {
        try {
            const response = await api.get<TimelineApiResponse>('/timeline/');
            if (response.data.success) {
            setTimelineData(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
        };

        fetchTimelineData();
    }, []);

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        setPageNumber(1);
    };

    return (
        <ThemedView style={[styles.container, { backgroundColor }]}>
            <SearchBar
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            setShowFilters={setShowFilters}
        />
        <ParallaxScrollView>
            {timelineData.map((item) => (
            <View key={item._id} style={[styles.card, { borderColor }]}>
                <Image source={{ uri: item.product.product_image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                <ThemedText style={[styles.productName, { color: textColor }]}>{item.product.product_name}</ThemedText>
                <ThemedText style={[styles.productDescription, { color: textColor }]}>{item.description}</ThemedText>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="heart-outline" size={20} color={textColor} />
                    <ThemedText style={[styles.actionText, { color: textColor }]}>{item.like_count}</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubble-outline" size={20} color={textColor} />
                    <ThemedText style={[styles.actionText, { color: textColor }]}>{item.comment_count}</ThemedText>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            ))}
        </ParallaxScrollView>
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
