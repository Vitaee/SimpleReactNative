import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AuthLayoutComponent from './AuthLayout';
import { useAuthStore } from '../../context/AuthStore';
import { LOGIN_SCREEN, MAIN_SCREEN, REGISTER_SCREEN, FORGOT_PASS_SCREEN } from '@/constants/Routes';

const LoginScreen: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const isLoginSuccess = await login(email, password);
      isLoginSuccess ? router.replace(MAIN_SCREEN) : router.replace(LOGIN_SCREEN);
    } catch (error) {
      router.replace(LOGIN_SCREEN);
    }
  };

  const handleRegister = () => {
    router.push(REGISTER_SCREEN);
  };

  const handleForgotPassword = () => {
    router.push(FORGOT_PASS_SCREEN);
  };

  return (
    <AuthLayoutComponent
      title="Welcome Back"
      email={email}
      setEmail={setEmail}
      emailPlaceHolder="Email"
      password={password}
      setPassword={setPassword}
      handleSubmit={handleLogin}
      submitText="Log In"
      footerText="Don't have an account?"
      footerActionText="Sign Up"
      onFooterActionPress={handleRegister}
      showForgotPassword={true}
      onForgotPasswordPress={handleForgotPassword}
    />
  );
};

export default LoginScreen;