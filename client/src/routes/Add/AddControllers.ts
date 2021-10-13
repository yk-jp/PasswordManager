import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { InputForPrivateInfoContext } from "../../context/InputForPrivateInfoContext";
import TokenRequest from "../../hooks/TokenRequest";
import postRequest from "../../hooks/postRequest";
import config from "../../config/config";
import IPrivateInfo from "../../interfaces/IPrivateInfo";

const AddControllers = () => {
  const accessToken: string | null = localStorage.getItem("accessToken");
  const history = useHistory();
  const InputForPrivateInfo = useContext(InputForPrivateInfoContext);
  const { requestAccessTokenWithRefreshToken } = TokenRequest();

  useEffect(() => {
    requestAccessTokenWithRefreshToken();
  }, []);


  const add = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const privateInfo: IPrivateInfo = {
      itemId: "",
      title: InputForPrivateInfo.titleData.title,
      link: InputForPrivateInfo.linkData.link,
      username: InputForPrivateInfo.usernameData.username,
      password: InputForPrivateInfo.passwordData.password
    }

    try {
      // send a post request
      await postRequest(config.server.account, privateInfo, accessToken);

      history.push('/mypage');
    } catch (err: any) {
      // clear an old access token that has already expired
      localStorage.removeItem("accessToken");
      history.push('/');
    }
  };

  return { add };
};

export default AddControllers;