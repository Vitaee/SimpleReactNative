import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '../hooks/useThemeColor';

interface SearchBarProps {
  searchQuery: string;
  handleSearch: (text: string) => void;
  setShowFilters: (show: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearch, setShowFilters }) => {
  const borderColor = useThemeColor({}, 'borderColor');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'background');

  return (
    <View style={styles.header}>
      <View style={[styles.searchContainer, { backgroundColor: borderColor }]}>
        <Ionicons name="search" size={20} color={placeholderColor} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchBar, { color: textColor }]}
          placeholder="Ara"
          placeholderTextColor={placeholderColor}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.filterButton}>
        <Ionicons name="options-outline" size={24} color={textColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
      searchIcon: {
        marginRight: 8,
    },
      searchBar: {
        flex: 1,
        height: 40,
    },
      filterButton: {
        marginLeft: 10,
        padding: 8,
    },
});

export default SearchBar;