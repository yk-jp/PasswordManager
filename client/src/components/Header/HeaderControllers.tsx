import { useHistory } from 'react-router';

import axios from 'axios';
import config from '../../config/config';

const HeaderControllers = () => {
  const history = useHistory();

  const logout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await axios.delete(config.server.logout_delete,
        {
          withCredentials: true
        });

      // delete a token
      localStorage.removeItem("accessToken");
      // navigate to login page
      history.push('/');
    } catch (err: any) {
      alert(err.message);
    }
  };
  return { logout };
}


export default HeaderControllers;