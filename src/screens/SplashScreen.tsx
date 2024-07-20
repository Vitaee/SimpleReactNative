import React from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';

const SplashScreen: React.FC = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/auth/login');
  };

  const navigateToRegister = () => {
    router.push('/auth/register');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/bg.jpeg')}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Makyaj App</Text>

        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.loginButton]} onPress={navigateToLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.registerButton]} onPress={navigateToRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 30,
    borderRadius: 20,
  },
  image: {
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#6200EE',
  },
  registerButton: {
    backgroundColor: '#6200EE',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleText: {
    color: 'gray',
    fontSize: 25,
    textAlign: 'center'
  }
});

export default SplashScreen;