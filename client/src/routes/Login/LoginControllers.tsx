import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { InputContext } from "../../context/InputContext";
import IAccount from "../../interfaces/IAccount";
import config from "../../config/config";
import errorHandler from "../../utils/errorHandler";
import postRequest from "../../hooks/postRequest";
import getRequest from "../../hooks/getRequest";

const LoginControllers = () => {
  const accessToken: string | null = localStorage.getItem("accessToken");
  const inputData = useContext(InputContext);
  const [error, setError] = useState<string[] | undefined>();
  const history = useHistory();

  useEffect(() => {
    automateLogin();
    return () => {
      inputData.emailData.setEmail("");
      inputData.passwordData.setPassword("");
    }
  }, []);

  const automateLogin = async () => {
    if (!accessToken) return;
    try {
      // if access token is stored in local storage, check if it is valid or not.
      const { data } = await getRequest(config.server.login, accessToken);
      // store a token
      localStorage.setItem("accessToken", data.accessToken);
      // navigate to mypage
      history.push('/mypage');
    } catch (error) {
      return;
    }
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const accountData: IAccount = {
      email: inputData.emailData.email,
      password: inputData.passwordData.password
    }

    try {
      const { data } = await postRequest(config.server.login, accountData);
      // store a token
      localStorage.setItem("accessToken", data.accessToken);

      // navigate to mypage
      history.push('/mypage');
    } catch (err: any) {
      const error: string[] = errorHandler(err);
      setError(error);
    }
  };

  return { error, login };
};

export default LoginControllers;