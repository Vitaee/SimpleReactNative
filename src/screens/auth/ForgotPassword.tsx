import React, { useState } from 'react';
import AuthLayoutComponent from './AuthLayout';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/src/context/AuthStore';

export const ForgotPasswordScreen: React.FC = () => {
    const forgotPassword = useAuthStore((state) => state.forgotPassword);
    const [email, setEmail] = useState('');
    const router = useRouter();
  
    const handleForgotPassword = async () => {
      try {
        const isForgotPassword = await forgotPassword(email);
        isForgotPassword ? router.replace('/auth/confirmreset') : router.replace('/auth/forgotpass')
  
      } catch (error) {
        console.error('Forget Password failed', error);
        router.replace('/auth/forgotpass')
      }
    };
  
    return (
      <AuthLayoutComponent
        title="Forgot Password"
        email={email}
        setEmail={setEmail}
        emailPlaceHolder = 'joe@example.com'
        password={null}
        setPassword={(password: string) =>{}}
        handleSubmit={handleForgotPassword}
        submitText='Submit'
        footerText="Please enter your e-mail."
        footerActionText=""
        onFooterActionPress={() => {}}
        showText={false}
      />
    );
  };