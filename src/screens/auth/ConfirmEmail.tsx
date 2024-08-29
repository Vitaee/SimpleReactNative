import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuthStore } from '@/src/context/AuthStore';
import { EMAIL_CONFIRMATION_SCREEN, MAIN_SCREEN } from '@/constants/Routes';
import { useThemeColor } from '@/hooks/useThemeColor';

const EmailConfirmationScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const router = useRouter();
  const confirmEmail = useAuthStore((state) => state.confirmEmail);
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'commonWhite');


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleConfirm = async () => {
    try {
      const isConfirmed = await confirmEmail(code);
      if (isConfirmed) {
        router.replace(MAIN_SCREEN);
      } else {
        console.error('Email confirmation failed!!!');
        router.replace(EMAIL_CONFIRMATION_SCREEN);
      }
    } catch (error) {
      console.error('Email confirmation failed', error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>Confirm Your Email</ThemedText>
        <ThemedText style={styles.subtitle}>
          Enter the 5-digit code sent to your email
        </ThemedText>
        <TextInput
          style={[styles.input, { color: textColor }]}
          value={code}
          onChangeText={setCode}
          placeholder="Enter code"
          keyboardType="number-pad"
          maxLength={5}
        />
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <ThemedText style={styles.buttonText}>Confirm</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.timer}>
          Time remaining: {formatTime(timeLeft)}
        </ThemedText>
      </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timer: {
    marginTop: 20,
    fontSize: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default EmailConfirmationScreen;