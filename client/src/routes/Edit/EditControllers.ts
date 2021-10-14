import { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { InputForPrivateInfoContext } from "../../context/InputForPrivateInfoContext";
import TokenRequest from "../../hooks/TokenRequest";
import getRequest from "../../hooks/getRequest";
import config from "../../config/config";
import putRequest from "../../hooks/putRequest";
import IPrivateInfo from "../../interfaces/IPrivateInfo";

const EditControllers = () => {
  const history = useHistory();
  const InputForPrivateInfo = useContext(InputForPrivateInfoContext)
  const accessToken: string | null = localStorage.getItem("accessToken");
  const { requestAccessTokenWithRefreshToken } = TokenRequest();
  const params = useParams<{ id: string }>(); //itemId

  useEffect(() => {
    let unmounted: boolean = false;
    if (!unmounted) getDataToEdit();
    return () => {
      unmounted = true;
    }
  }, []);

  const getDataToEdit = async () => {
    try {
      // send a get request to get a particular data
      const { data } = await getRequest(`${config.server.account}/${params.id}`, accessToken);
      InputForPrivateInfo.titleData.setTitle(data.privateInfo.title);
      InputForPrivateInfo.linkData.setLink(data.privateInfo.link);
      InputForPrivateInfo.usernameData.setUsername(data.privateInfo.username);
      InputForPrivateInfo.passwordData.setPassword(!data.privateInfo.password ? '' : data.privateInfo.password);
    } catch (err: any) {
      requestAccessTokenWithRefreshToken();
    }

  };

  const edit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const privateInfo: IPrivateInfo = {
      itemId: params.id,
      title: InputForPrivateInfo.titleData.title,
      link: InputForPrivateInfo.linkData.link,
      username: InputForPrivateInfo.usernameData.username,
      password: InputForPrivateInfo.passwordData.password
    }

    try {
      // send a post request
      await putRequest(`${config.server.account}/${params.id}`, privateInfo, accessToken);
      history.push('/mypage');
    } catch (err: any) {
      // check if session expired
      requestAccessTokenWithRefreshToken();
    }
  };

  return { edit };
};

export default EditControllers;