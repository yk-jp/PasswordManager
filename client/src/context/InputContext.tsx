import { useState, createContext } from 'react';

export const InputContext = createContext<any>({});

export const InputProvider = ({ children }: any): JSX.Element => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const InputData = {
    emailData: {
      email: email,
      setEmail: setEmail
    },
    passwordData: {
      password: password,
      setPassword: setPassword
    },
  }

  return (
    <InputContext.Provider value={InputData}>
      {children}
    </InputContext.Provider>
  );
}
