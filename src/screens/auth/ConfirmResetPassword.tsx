import React, { useState } from 'react';
import AuthLayoutComponent from './AuthLayout';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/src/context/AuthStore';
import { CONFIRM_RESET_SCREEN, RESET_PASS_SCREEN } from '@/constants/Routes';

export const ConfirmResetPasswordScreen: React.FC = () => {
    const confirmResetPassword = useAuthStore((state) => state.confirmResetPassword);
    const [code, setCode] = useState('');
    const router = useRouter();
  
    const handleconfirmResetPassword = async () => {
      try {
        const isConfirmResetPassword = await confirmResetPassword(code);
        isConfirmResetPassword ? router.replace(RESET_PASS_SCREEN) : router.replace(CONFIRM_RESET_SCREEN)
  
      } catch (error) {
        console.error('Confirm Code failed', error);
        router.replace(CONFIRM_RESET_SCREEN)
      }
    };
  
    return (
      <AuthLayoutComponent
        title="Enter code."
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