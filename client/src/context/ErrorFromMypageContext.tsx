import { useState, createContext } from 'react';

export const ErrorFromMypageContext = createContext<any>({});

export const ErrorFromMypageProvider = ({ children }: any): JSX.Element => {

  const [error, setError] = useState<string | null>(null);

  const ErrorFromMypage = {
    error,
    setError
  }

  return (
    <ErrorFromMypageContext.Provider value={ErrorFromMypage}>
      {children}
    </ErrorFromMypageContext.Provider>
  );
}
