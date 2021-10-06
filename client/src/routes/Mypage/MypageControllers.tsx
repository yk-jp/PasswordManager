import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import config from '../../config/config';
import { ErrorFromMypageContext } from '../../context/ErrorFromMypageContext';
import getRequest from '../../hooks/getRequest';
const MypageControllers = () => {
  
  const history = useHistory();
  const accessToken: string | null = localStorage.getItem("accessToken");
  const errorFromMypage = useContext(ErrorFromMypageContext);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (!accessToken) history.push('/');
    getPrivateInfo();
    setIsLoggedIn(true);
  }, []);

  const getPrivateInfo = async () => {
    try {
      await getRequest(config.server.mypage, accessToken);

    } catch (err: any) {
      // clear an old access token that has already expired
      localStorage.removeItem("accessToken");
      // request access token by using refresh token
      requestAccessTokenWithRefreshToken();
    }
  };

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

  return { isLoggedIn };
};

export default MypageControllers;