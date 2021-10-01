import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { InputContext } from "../../context/InputContext";
import axios from 'axios';
import config from "../../config/config";
import errorHandler from "../../utils/errorHandler";

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

    try {
      const { data } = await axios.post(config.server.signup_post,
        {
          email: inputData.emailData.email,
          password: inputData.passwordData.password
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

  return { error, signup };
};


export default SignupControllers;