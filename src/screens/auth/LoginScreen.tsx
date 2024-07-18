import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AuthLayoutComponent from './AuthLayout';
import { useAuthStore } from '../../context/AuthStore'; // Adjust the path as necessary

const LoginScreen: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const isLoginSucces = await login(email, password);
      console.log(isLoginSucces, " login success mi")
      isLoginSucces ? router.replace('/main') : router.replace('/login')
    } catch (error) {
      router.replace('/login')
    }
  };

  const handleRegister = () => {
    router.push('register');
  };

  return (
    <AuthLayoutComponent
      title="Login"
      email={email}
      setEmail={setEmail}
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
