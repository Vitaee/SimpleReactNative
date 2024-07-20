import React, { useState } from 'react';
import AuthLayoutComponent from './AuthLayout';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/src/context/AuthStore';

export const ConfirmResetPasswordScreen: React.FC = () => {
    const confirmResetPassword = useAuthStore((state) => state.confirmResetPassword);
    const [code, setCode] = useState('');
    const router = useRouter();
  
    const handleconfirmResetPassword = async () => {
      try {
        const isConfirmResetPassword = await confirmResetPassword(code);
        isConfirmResetPassword ? router.replace('/auth/resetpass') : router.replace('/auth/confirmreset')
  
      } catch (error) {
        console.error('Forget Password failed', error);
        router.replace('/auth/forgotpass')
      }
    };
  
    return (
      <AuthLayoutComponent
        title="Confirm Reset Password"
        email={code}
        setEmail={setCode}
        emailPlaceHolder = '123456'
        password={null}
        setPassword={(password: string) =>{}}
        handleSubmit={handleconfirmResetPassword}
        submitText='Submit'
        footerText="Please the code we sent."
        footerActionText=""
        onFooterActionPress={() => {}}
        showText={false}
      />
    );
  };