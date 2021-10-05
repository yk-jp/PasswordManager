import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { InputContext } from "../../context/InputContext";
import axios from 'axios';
import config from "../../config/config";
import errorHandler from "../../utils/errorHandler";
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
      const { data } = await axios.get(config.server.login_get,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        });
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

    try {
      const { data } = await axios.post(config.server.login_post,
        {
          email: inputData.emailData.email,
          password: inputData.passwordData.password
        },
        {
          withCredentials: true
        });
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