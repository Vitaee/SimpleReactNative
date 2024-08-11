import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FormHeader from './formHeader';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { router, useLocalSearchParams } from 'expo-router';
import { MAIN_SCREEN, TIMELINE_SCREEN } from '@/constants/Routes';

type RootStackParamList = {
  Confirmation: { productName: string; formDetails: { description: string } };
};

type ConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'Confirmation'>;
type ConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Confirmation'>;

type ConfirmationProps = {
  route: ConfirmationScreenRouteProp;
  navigation: ConfirmationScreenNavigationProp;
};

const Confirmation: React.FC<ConfirmationProps> = () => {
  //const { formDetails } = useLocalSearchParams();
  let parsedForm: any;
  //parsedForm = JSON.parse(decodeURIComponent(encodeURIComponent(formDetails)));


  return (
    <ThemedView style={styles.container}>
      <FormHeader title="Başarılı!" subTitle='İçeriğinizi görmek için dokunun.' step={2} />
      <ThemedView style={styles.content}>
        <ThemedView style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
        </ThemedView>
        <ThemedText style={styles.title}>Tebrikler</ThemedText>
        <ThemedText style={styles.subtitle}>Formunuzu başarılı şekilde oluşturdunuz..</ThemedText>
      
        <TouchableOpacity onPress={() => { router.replace(TIMELINE_SCREEN)}}>
          <ThemedText type='title'>Ana Sayfa</ThemedText>

        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 28,
  },
  successIcon: {
    marginTop: 32,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
});

export default Confirmation;