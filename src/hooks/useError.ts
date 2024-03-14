import { useCallback } from 'react';
import { useCollectionStore } from '../store/store';

const useErrorHandler = () => {
  const setError = useCollectionStore((state) => state.setError);
  const setUserError = useCollectionStore((state) => state.setUserError);

  const handleFail = useCallback((error: string) => {
    setError(error);
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
