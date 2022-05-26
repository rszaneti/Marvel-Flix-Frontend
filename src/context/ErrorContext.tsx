import React, { createContext, useCallback } from 'react';
import { toast } from 'react-toastify';

interface ErrorContextState {
  ErrorMessage(err: any): Promise<void>;
}

const ErrorContext = createContext<ErrorContextState>({} as ErrorContextState);

const ErrorProvider: React.FC = ({ children }) => {
  const ErrorMessage = useCallback(async err => {
    if (err.response && err.response !== undefined) {
      if (err.response.data.status === 'error') {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        /*
        if (
          err.response.data.codeerror === 40101 ||
          err.response.data.codeerror === 40102 ||
          err.response.data.codeerror === 40103
        ) {
          yield put(signOut());
        } */
      } else {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, []);

  return (
    <ErrorContext.Provider value={{ ErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorProvider, ErrorContext };
