import React, { useState } from 'react';
import { Modal, TouchableOpacity, StyleSheet, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import DateTimePicker from '@react-native-community/datetimepicker';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
}

interface Filters {
  sortBy: 'price' | 'date' | 'name';
  sortOrder: 'A-Z' | '0-100' | '100-0';
  priceRange: { min: string; max: string };
  dateRange: { start: Date | null; end: Date | null };
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply }) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'borderColor');

  const [sortBy, setSortBy] = useState<Filters['sortBy']>('price');
  const [sortOrder, setSortOrder] = useState<Filters['sortOrder']>('A-Z');
  const [priceRange, setPriceRange] = useState<Filters['priceRange']>({ min: '', max: '' });
  const [dateRange, setDateRange] = useState<Filters['dateRange']>({ start: null, end: null });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleApply = () => {
    onApply({ sortBy, sortOrder, priceRange, dateRange });
    onClose();
  };

  const onChangeStartDate = (event: any, selectedDate: Date | undefined) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateRange((prev) => ({ ...prev, start: selectedDate }));
    }
  };

  const onChangeEndDate = (event: any, selectedDate: Date | undefined) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateRange((prev) => ({ ...prev, end: selectedDate }));
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <ThemedView style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText type="title" style={styles.title}>Filters</ThemedText>

          <ThemedText type="subtitle" style={styles.label}>Sort By</ThemedText>
          <ThemedView style={styles.optionContainer}>
            {['price', 'date', 'name'].map((option) => (
              <TouchableOpacity key={option} onPress={() => setSortBy(option as Filters['sortBy'])}>
                <ThemedText
                  style={[
                    styles.option,
                    sortBy === option && styles.selectedOption,
                    { borderColor },
                  ]}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>

          <ThemedText type="subtitle" style={styles.label}>Sort Order</ThemedText>
          <ThemedView style={styles.optionContainer}>
            {['A-Z', '0-100', '100-0'].map((option) => (
              <TouchableOpacity key={option} onPress={() => setSortOrder(option as Filters['sortOrder'])}>
                <ThemedText
                  style={[
                    styles.option,
                    sortOrder === option && styles.selectedOption,
                    { borderColor },
                  ]}
                >
                  {option}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>

          <ThemedText type="subtitle" style={styles.label}>Price Range</ThemedText>
          <ThemedView style={styles.rangeContainer}>
            <TextInput
              style={[styles.input, { color: textColor, borderColor }]}
              placeholder="Min"
              placeholderTextColor={textColor}
              keyboardType="numeric"
              value={priceRange.min}
              onChangeText={(text) => setPriceRange({ ...priceRange, min: text })}
            />
            <TextInput
              style={[styles.input, { color: textColor, borderColor }]}
              placeholder="Max"
              placeholderTextColor={textColor}
              keyboardType="numeric"
              value={priceRange.max}
              onChangeText={(text) => setPriceRange({ ...priceRange, max: text })}
            />
          </ThemedView>

          <ThemedText type="subtitle" style={styles.label}>Date Range</ThemedText>
          <ThemedView style={styles.rangeContainer}>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateInput}>
              <ThemedText style={styles.dateText}>
                {dateRange.start ? dateRange.start.toDateString() : 'Start Date'}
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateInput}>
              <ThemedText style={styles.dateText}>
                {dateRange.end ? dateRange.end.toDateString() : 'End Date'}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {showStartDatePicker && (
            <DateTimePicker
              value={dateRange.start || new Date()}
              mode="date"
              display="default"
              onChange={onChangeStartDate}
            />
          )}

          {showEndDatePicker && (
            <DateTimePicker
              value={dateRange.end || new Date()}
              mode="date"
              display="default"
              onChange={onChangeEndDate}
            />
          )}

          <ThemedView style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <ThemedText style={styles.buttonText}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleApply} style={styles.button}>
              <ThemedText style={styles.buttonText}>Apply</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  option: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedOption: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default FilterModal;
