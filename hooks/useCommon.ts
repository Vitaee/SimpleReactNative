import { useState, useCallback } from 'react';

/**
 * Hook for managing modal visibility state
 */
export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const showModal = useCallback(() => {
    setIsVisible(true);
  }, []);
  
  const hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);
  
  return {
    isVisible,
    showModal,
    hideModal,
  };
};

/**
 * Hook for managing loading states
 */
export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);
  
  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};

/**
 * Hook for managing text input state
 */
export const useTextInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  
  const clearValue = useCallback(() => {
    setValue('');
  }, []);
  
  const resetValue = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);
  
  return {
    value,
    setValue,
    clearValue,
    resetValue,
  };
};