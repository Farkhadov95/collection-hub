import { useCallback } from 'react';
import { useNonPersistStore } from '../store/utilStore';

const useErrorHandler = () => {
  const setError = useNonPersistStore((state) => state.setError);
  const setUserError = useNonPersistStore((state) => state.setUserError);

  const handleFail = useCallback((error: string) => {
    setError(error);
    console.log(error);
    setTimeout(() => {
        setError('');
    }, 3000);
  }, [setError]);

  const handleUserFail = useCallback((error: string) => {
    setUserError(error);
    setTimeout(() => {
      setUserError('');
    }, 3000);
  }, [setUserError]);

  return {
    handleUserFail,
    handleFail
  };
};

export default useErrorHandler;
