import axios from 'axios';
import IAccount from '../interfaces/IAccount';
import IPrivateInfo from '../interfaces/IPrivateInfo';

const postRequest = async (endPoint: string, accountData: IAccount | IPrivateInfo, accessToken?: string | undefined | null) => {
  if (accessToken) {
    const headers = {
      "Content-type": "application/json",
      'Access-Control-Allow-Origin':`${endPoint}}`,
      Authorization: `Bearer ${accessToken}`
    };
    return await axios.post(endPoint,
      accountData, {
      withCredentials: true,
      headers
    }
    );
  }

  return await axios.post(endPoint,
    accountData, {
    withCredentials: true
  });
};

export default postRequest;