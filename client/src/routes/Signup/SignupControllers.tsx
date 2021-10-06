import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { InputContext } from "../../context/InputContext";
import IAccount from "../../interfaces/IAccount";
import config from "../../config/config";
import errorHandler from "../../utils/errorHandler";
import postRequest from "../../hooks/postRequest";

const SignupControllers = () => {
  const inputData = useContext(InputContext);
  const [error, setError] = useState<string[] | undefined>();
  const history = useHistory();

  useEffect(() => {
    return () => {
      inputData.emailData.setEmail("");
      inputData.passwordData.setPassword("");
    }
  }, []);

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const accountData: IAccount = {
      email: inputData.emailData.email,
      password: inputData.passwordData.password
    }
    
    try {
      const { data } = await postRequest(config.server.signup, accountData);
      // store a token
      localStorage.setItem("accessToken", data.accessToken);

      // navigate to mypage
      history.push('/mypage');
    } catch (err: any) {
      const error: string[] = errorHandler(err);
      setError(error);
    }
  };

  return { error, signup };
};


export default SignupControllers;