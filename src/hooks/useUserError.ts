import { useCallback } from 'react';
import { useCollectionStore } from '../store/store';

const useHandleFail = () => {
  const setUserError = useCollectionStore((state) => state.setUserError);

  const handleFail = useCallback((error: string) => {
    setUserError(error);
    setTimeout(() => {
      setUserError('');
    }, 3000);
  }, [setUserError]);

  return handleFail;
};

export default useHandleFail;
