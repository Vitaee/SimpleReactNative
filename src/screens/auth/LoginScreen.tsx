import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import AuthLayoutComponent from './AuthLayout';

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [click, setClick] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed', error);
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