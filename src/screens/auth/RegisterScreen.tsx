import React, { useState } from 'react';
import { useAuthStore } from '../../context/AuthStore';
import { useRouter } from 'expo-router';
import AuthLayoutComponent from './AuthLayout';
import { LOGIN_SCREEN, MAIN_SCREEN, REGISTER_SCREEN, EMAIL_CONFIRMATION_SCREEN } from '@/constants/Routes';

const RegisterScreen: React.FC = () => {
  const register = useAuthStore((state) => state.register);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const isRegisterSuccess = await register(email, password);
      isRegisterSuccess ? router.push({ pathname: EMAIL_CONFIRMATION_SCREEN, params: { email } }) : 
      router.replace(REGISTER_SCREEN);
    } catch (error) {
      console.error('Registration failed', error);
      router.replace(REGISTER_SCREEN);
    }
  };

  const handleLogin = () => {
    router.push(LOGIN_SCREEN);
  };

  return (
    <AuthLayoutComponent
      title="Create Account"
      email={email}
      setEmail={setEmail}
      emailPlaceHolder="Email"
      password={password}
      setPassword={setPassword}
      handleSubmit={handleRegister}
      submitText="Sign Up"
      footerText="Already have an account?"
      footerActionText="Log In"
      onFooterActionPress={handleLogin}
      showForgotPassword={false}
    />
  );
};

export default RegisterScreen;