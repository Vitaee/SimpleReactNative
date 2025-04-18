import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface AuthLayoutProps {
  title: string;
  email: string;
  setEmail: (email: string) => void;
  emailPlaceHolder: string;
  password: string | null;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
  submitText: string;
  footerText: string;
  footerActionText: string;
  onFooterActionPress: () => void;
  showForgotPassword: boolean;
  onForgotPasswordPress?: () => void;
}

const AuthLayoutComponent: React.FC<AuthLayoutProps> = ({
  title,
  email,
  setEmail,
  emailPlaceHolder,
  password,
  setPassword,
  handleSubmit,
  submitText,
  footerText,
  footerActionText,
  onFooterActionPress,
  showForgotPassword,
  onForgotPasswordPress,
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'commonWhite');
  const placeholderColor = useThemeColor({}, 'activeColor');
  const primaryColor = useThemeColor({}, 'primaryText');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedView style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color={placeholderColor} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder={emailPlaceHolder}
              placeholderTextColor={placeholderColor}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </ThemedView>
          {password !== null && (
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color={placeholderColor} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Password"
                placeholderTextColor={placeholderColor}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          )}
          {showForgotPassword && (
            <TouchableOpacity onPress={onForgotPasswordPress} style={styles.forgotPasswordButton}>
              <ThemedText style={styles.forgotPasswordText}>Forgot Password?</ThemedText>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.submitButton, { backgroundColor: primaryColor }]} onPress={handleSubmit}>
            <ThemedText style={styles.submitButtonText}>{submitText}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <ThemedText>{footerText}</ThemedText>
        <TouchableOpacity onPress={onFooterActionPress}>
          <ThemedText style={[styles.footerActionText, { color: primaryColor }]}>{footerActionText}</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  submitButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerActionText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default AuthLayoutComponent;