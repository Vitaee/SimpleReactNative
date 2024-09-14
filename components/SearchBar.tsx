import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '../hooks/useThemeColor';
import FilterModal from './FilterModal';
import { useProductStore } from '@/src/context/products/ProductStore';

interface SearchBarProps {
  searchQuery: string;
  handleSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearch  }) => {
  const borderColor = useThemeColor({}, 'borderColor');
  const textColor = useThemeColor({}, 'primaryText');

  const [showFilters, setShowFilters] = useState(false);

  const { applyFilters } = useProductStore();

  const handleApplyFilters = (filters: any) => {
    console.log(filters);
    applyFilters(filters, 1);
  };

  return (
    <View style={styles.header}>
      <View style={[styles.searchContainer, { backgroundColor: borderColor }]}>
        <Ionicons name="search" size={20} color={textColor} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchBar, { color: textColor }]}
          placeholder="Ara"
          placeholderTextColor={textColor}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color={textColor} />
        </TouchableOpacity>
        <FilterModal visible={showFilters} onClose={() => setShowFilters(false)} onApply={handleApplyFilters} />

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