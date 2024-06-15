// src/screens/SplashScreen.tsx
import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const SplashScreen: React.FC = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/login');
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/splash.png')} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Button title="Log In" onPress={navigateToLogin} />
        <Button title="Register" onPress={navigateToRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '50%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
});

export default SplashScreen;
