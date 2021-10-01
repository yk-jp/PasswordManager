import { useEffect } from 'react';
import { useHistory } from 'react-router';
import config from '../../config/config';
import axios from 'axios';

const MypageControllers = () => {
  const history = useHistory();
  const accessToken: string | null = localStorage.getItem("accessToken");
  const getPrivateInfo = async () => {
    try {
      const { data } = await axios.get(config.server.mypage_get,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        },
      );
      // console.log(data);
    } catch (err: any) {
      console.log(err.message);
      localStorage.removeItem("accessToken");
      history.push('/');
      alert(err.response.data);
    }
  };

  useEffect(() => {
    if (!accessToken) history.push('/');

    getPrivateInfo();

    // cancel a fetch request 



  }, []);

}

export default MypageControllers;