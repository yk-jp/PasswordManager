import { useState, createContext } from 'react';

export const InputForPrivateInfoContext = createContext<any>({});

export const InputForPrivateInfoProvider = ({ children }: any): JSX.Element => {

  const [itemId, setitemId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const InputForPrivateInfo = {
    itemIdData: {
      itemId,
      setitemId
    },
    titleData: {
      title,
      setTitle
    },
    linkData: {
      link,
      setLink
    },
    usernameData: {
      username,
      setUsername
    },
    passwordData: {
      password,
      setPassword
    },
  }

  return (
    <InputForPrivateInfoContext.Provider value={InputForPrivateInfo}>
      {children}
    </InputForPrivateInfoContext.Provider>
  );
}
