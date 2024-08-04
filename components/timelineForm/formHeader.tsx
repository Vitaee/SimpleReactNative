import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

interface HeaderProps {
  title: string;
  subTitle: string;
  step: number;
}

const FormHeader: React.FC<HeaderProps> = ({ title, subTitle, step }) => {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <ThemedView style={[styles.container, {backgroundColor: backgroundColor, paddingTop: insets.top }]}>
      <ThemedText style={styles.title} type='title'>{title}</ThemedText>
      <ThemedText style={styles.title} type='subtitle'>{subTitle}</ThemedText>

      <ThemedView style={styles.stepsContainer}>
        {[1, 2, 3].map((num) => (
          <ThemedView
            key={num}
            style={[
              styles.step,
              num === step ? styles.activeStep : null,
            ]}
          >
            <ThemedText style={styles.stepText} type='subtitle'>{num}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#6200EE',
  },
  stepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FormHeader;