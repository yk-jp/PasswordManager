import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import config from '../../config/config';
import getRequest from '../../hooks/getRequest';
import TokenRequest from "../../hooks/TokenRequest";
import IPrivateInfo from '../../interfaces/IPrivateInfo';
const MypageControllers = () => {

  const history = useHistory();
  const accessToken: string | null = localStorage.getItem("accessToken");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { requestAccessTokenWithRefreshToken } = TokenRequest();
  const [userData, setUserData] = useState<IPrivateInfo[]>([]);

  useEffect(() => {
    if (!accessToken) history.push('/');
    getPrivateInfo();
    setIsLoggedIn(true);
  }, []);

  const getPrivateInfo = async () => {
    try {
      const data = await getRequest(config.server.mypage, accessToken);
      console.log(data);
    } catch (err: any) {
      // clear an old access token that has already expired
      localStorage.removeItem("accessToken");
      // request access token by using refresh token
      requestAccessTokenWithRefreshToken();
    }
  };

  return { isLoggedIn, userData };
};

export default MypageControllers;