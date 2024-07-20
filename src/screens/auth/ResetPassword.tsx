import React, { useState } from 'react';
import AuthLayoutComponent from './AuthLayout';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/src/context/AuthStore';

export const ResetPasswordScreen: React.FC = () => {
    const resetPassword = useAuthStore((state) => state.resetPassword);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const router = useRouter();
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleResetPassword = async () => {
        console.log(password)
        if (password !== password2) {
          setError('Passwords do not match');
          return;
        }
    
        if (password.length < 8) {
          setError('Password must be at least 8 characters long');
          return;
        }
    
        setError('');
        try {
          const isResetPasswordSuccess = await resetPassword(password, password2);
          if (isResetPasswordSuccess) {
            router.replace('/auth/login');
          } else {
            setError('Failed to reset password. Please try again.');
          }
        } catch (error) {
          console.error('Reset Password failed', error);
          setError('An error occurred. Please try again.');
        }
      };
  
    return (
      <AuthLayoutComponent
        title="Reset Password"
        email={password}
        setEmail={setPassword}
        emailPlaceHolder = 'Enter the new passwords'
        password={password2}
        setPassword={setPassword2}
        handleSubmit={handleResetPassword}
        submitText='Submit'
        footerText="Please enter compolex passwords."
        footerActionText=""
        onFooterActionPress={() => {}}
        showText={false}
      />
    );
  };