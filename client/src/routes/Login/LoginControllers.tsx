import { useContext, useEffect } from "react";
import { InputContext } from "../../context/InputContext";
import axios from 'axios';
import config from "../../config/config";
const LoginControllers = () => {
  const inputData = useContext(InputContext);

  useEffect(() => {
    return () => {
      inputData.emailData.setEmail("");
      inputData.passwordData.setPassword("");
    }
  }, []);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${config.server.endpoint}`,
        {
          email: inputData.emailData.email,
          password: inputData.passwordData.password
        });

      // store a token
      localStorage.setItem("accessToken", data.accessToken);

    } catch (error) {
      console.error(error)
    }

  };

  return { login };
};

export default LoginControllers;