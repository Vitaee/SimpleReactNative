import React, { useState } from 'react';
import { useAuthStore } from '../../context/AuthStore'; // Adjust the path as necessary
import { useRouter } from 'expo-router';
import AuthLayoutComponent from './AuthLayout';

const RegisterScreen: React.FC = () => {
  const register = useAuthStore((state) => state.register);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const isRegisterSucces = await register(email, password);
      isRegisterSucces ? router.replace('/main') : router.replace('/auth/register')

    } catch (error) {
      console.error('Registration failed', error);
      router.replace('/auth/register')
    }
  };

  const handleLogin = () => {
    router.push('/auth/login');
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
