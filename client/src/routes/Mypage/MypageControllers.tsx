import { useState,useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import config from '../../config/config';
import axios from 'axios';
import { ErrorFromMypageContext } from '../../context/ErrorFromMypageContext';
const MypageControllers = () => {
  const history = useHistory();
  const accessToken: string | null = localStorage.getItem("accessToken");
  const errorFromMypage = useContext(ErrorFromMypageContext);
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if(!accessToken) history.push('/');
    getPrivateInfo();
    setIsLoggedIn(true);
  }, []);

  const getPrivateInfo = async () => {
    try {
      await axios.get(config.server.mypage_get,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        });
    } catch (err: any) {
      // clear an old access token that has already expired
      localStorage.removeItem("accessToken");
      // request access token by using refresh token
      requestAccessTokenWithRefreshToken();
    }
  };

  const requestAccessTokenWithRefreshToken = async () => {
    try {
      const { data } = await axios.get(config.server.token_get,
        {
          withCredentials: true
        });

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

  return {isLoggedIn};
};

export default MypageControllers;