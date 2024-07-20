import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AuthLayoutComponent from './AuthLayout';
import { useAuthStore } from '../../context/AuthStore'; // Adjust the path as necessary
import { LOGIN_SCREEN, MAIN_SCREEN, REGISTER_SCREEN } from '@/constants/Routes';

const LoginScreen: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const isLoginSucces = await login(email, password);
      isLoginSucces ? router.replace(MAIN_SCREEN) : router.replace(LOGIN_SCREEN)
    } catch (error) {
      router.replace(LOGIN_SCREEN)
    }
  };

  const handleRegister = () => {
    router.push(REGISTER_SCREEN);
  };

  return (
    <AuthLayoutComponent
      title="Login"
      email={email}
      setEmail={setEmail}
      emailPlaceHolder = 'joe@example.com'
      password={password}
      setPassword={setPassword}
      handleSubmit={handleLogin}
      submitText='Login'
      footerText="Don't Have Account?"
      footerActionText="Sign Up"
      onFooterActionPress={handleRegister}
      showText={true}
    />
  );
};

export default LoginScreen;
