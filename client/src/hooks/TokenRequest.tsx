import { useContext } from "react";
import { useHistory } from "react-router";
import { ErrorFromMypageContext } from "../context/ErrorFromMypageContext";
import getRequest from "./getRequest";
import config from "../config/config";

const TokenRequest = () => {
  const history = useHistory();
  const errorFromMypage = useContext(ErrorFromMypageContext);

  const requestAccessTokenWithRefreshToken = async () => {
    try {
      const { data } = await getRequest(config.server.token, null, true);

      if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);
      else {
        errorFromMypage.setError('Session timeout');
        history.push('/'); //redirect to the home page
      }
    } catch (error: any) {
      errorFromMypage.setError(error.message);
      history.push('/'); //redirect to the home page
    }
  }
  return { requestAccessTokenWithRefreshToken };
};


export default TokenRequest;