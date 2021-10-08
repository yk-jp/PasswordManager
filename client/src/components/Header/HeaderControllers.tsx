import { useHistory } from 'react-router';
import config from '../../config/config';
import deleteRequest from '../../hooks/deleteRequest';

const HeaderControllers = () => {
  const history = useHistory();
  const accessToken: string | null = localStorage.getItem("accessToken");
  const logout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      
      deleteRequest(config.server.logout, accessToken!);

      // delete a token
      localStorage.removeItem("accessToken");
      // navigate to login page
      history.push('/');
    } catch (err: any) {
      alert(err.message);
    }
  };
  const deleteMyAccount = async (e: React.MouseEvent) => {
    if (!window.confirm("You want to delete your account?")) return;

    try {
      deleteRequest(config.server.account, accessToken!);

      // delete a token
      localStorage.removeItem("accessToken");
      // navigate to login page
      history.push('/');
    } catch (err: any) {
      alert(err.message);
    }
  };
  return { logout, deleteMyAccount };
}


export default HeaderControllers;