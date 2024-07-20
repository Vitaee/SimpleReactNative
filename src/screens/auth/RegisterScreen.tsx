import React, { useState } from 'react';
import { useAuthStore } from '../../context/AuthStore'; // Adjust the path as necessary
import { useRouter } from 'expo-router';
import AuthLayoutComponent from './AuthLayout';
import { LOGIN_SCREEN, MAIN_SCREEN, REGISTER_SCREEN } from '@/constants/Routes';

const RegisterScreen: React.FC = () => {
  const register = useAuthStore((state) => state.register);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const isRegisterSucces = await register(email, password);
      isRegisterSucces ? router.replace(MAIN_SCREEN) : router.replace(REGISTER_SCREEN)

    } catch (error) {
      console.error('Registration failed', error);
      router.replace(REGISTER_SCREEN)
    }
  };

  const handleLogin = () => {
    router.push(LOGIN_SCREEN);
  };

  return (
    <AuthLayoutComponent
      title="Register"
      email={email}
      setEmail={setEmail}
      emailPlaceHolder = 'joe@example.com'
      password={password}
      setPassword={setPassword}
      handleSubmit={handleRegister}
      submitText='Register'
      footerText="Already Have An Account?"
      footerActionText="Login"
      onFooterActionPress={handleLogin}
      showText={false}
    />
  );
};

export default RegisterScreen;
