import axios from 'axios';
import IAccount from '../interfaces/IAccount';
import IPrivateInfo from '../interfaces/IPrivateInfo';
const putRequest = async (endPoint: string, accountData: IAccount | IPrivateInfo, accessToken?: string | undefined | null) => {
  if (accessToken) {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    };
    return await axios.put(endPoint,
      accountData, {
      withCredentials: true,
      headers
    }
    );
  }

  return await axios.put(endPoint,
    accountData, {
    withCredentials: true
  });
};

export default putRequest;