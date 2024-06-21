import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import AuthLayoutComponent from './AuthLayout';

const RegisterScreen: React.FC = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await register(email, password);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const handleLogin = () => {
    router.push('login');
  };

  return (
    <AuthLayoutComponent
      title="Register"
      email={email}
      setEmail={setEmail}
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
