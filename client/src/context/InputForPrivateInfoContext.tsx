import { useState, createContext } from 'react';

export const InputForPrivateInfoContext = createContext<any>({});

export const InputForPrivateInfoProvider = ({ children }: any): JSX.Element => {

  const [itemId, setitemId] = useState<string | null>("");
  const [title, setTitle] = useState<string | null>("");
  const [link, setLink] = useState<string | null>("");
  const [username, setUsername] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");

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
