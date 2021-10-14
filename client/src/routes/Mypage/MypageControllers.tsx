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
    let unmounted: boolean = false;
    if (!unmounted) getPrivateInfo();
    return () => {
      unmounted = true;
    }
  }, [userData]);

  const getPrivateInfo = async () => {
    try {
      const { data } = await getRequest(config.server.mypage, accessToken);
      setUserData(data.privateInfoList);
      // make the loading state true
      setIsLoggedIn(true);

    } catch (err: any) {
      // request access token by using refresh token
      requestAccessTokenWithRefreshToken();
    }
  };

  return { isLoggedIn, userData };
};

export default MypageControllers;