import React, { useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '@/constants/Colors'; // Adjust based on where your theme settings are stored

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
  const textColor = useThemeColor({}, 'primaryText');
  const borderColor = useThemeColor({}, 'borderColor');
  const accentColor = useThemeColor({}, 'accentColor');

  const [sortBy, setSortBy] = useState<Filters['sortBy']>('price');
  const [sortOrder, setSortOrder] = useState<Filters['sortOrder']>('A-Z');
  const [priceRange, setPriceRange] = useState<Filters['priceRange']>({ min: '', max: '' });
  const [dateRange, setDateRange] = useState<Filters['dateRange']>({ start: null, end: null });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleApply = () => {
    const defaultPriceRange = {
      min: priceRange.min ? priceRange.min : '1', // Default min is 1
      max: priceRange.max ? priceRange.max : '1000000', // Default max is a high number
    };

    const defaultDateRange = {
      start: dateRange.start ? dateRange.start : new Date('2000-01-01'), // Default start date
      end: dateRange.end ? dateRange.end : new Date(), // Default end date as today
    };

    onApply({ 
      sortBy, 
      sortOrder, 
      priceRange: defaultPriceRange, 
      dateRange: defaultDateRange 
    });
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
      <TouchableWithoutFeedback onPress={onClose}>
        <ThemedView style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView style={[styles.modalContent, { backgroundColor }]}>
              <ThemedText type="title" style={styles.title}>Filters</ThemedText>

              <ThemedText type="subtitle" style={styles.label}>Sort By</ThemedText>
              <ThemedView style={styles.optionContainer}>
                {['price', 'date', 'name'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setSortBy(option as Filters['sortBy'])}
                    style={[
                      styles.optionButton,
                      sortBy === option && { backgroundColor: Colors.light.boxActiveColor, borderColor: accentColor },
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.optionText,
                        sortBy === option ? { color: accentColor } : { color: textColor },
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
                  <TouchableOpacity
                    key={option}
                    onPress={() => setSortOrder(option as Filters['sortOrder'])}
                    style={[
                      styles.optionButton,
                      sortOrder === option && { backgroundColor: Colors.light.boxActiveColor, borderColor: accentColor },
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.optionText,
                        sortOrder === option ? { color: accentColor } : { color: textColor },
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
                <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                  <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
                  <ThemedText style={styles.applyButtonText}>Apply</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </TouchableWithoutFeedback>
        </ThemedView>
      </TouchableWithoutFeedback>
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
    width: '85%',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
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
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
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
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 5,
    backgroundColor: Colors.light.deactiveColor,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: Colors.light.commonWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  applyButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 5,
    backgroundColor: Colors.light.activeColor,
    borderRadius: 8,
  },
  applyButtonText: {
    color: Colors.light.commonWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterModal;
