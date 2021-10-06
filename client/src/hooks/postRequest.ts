import axios from 'axios';
import IAccount from '../interfaces/IAccount';

const postRequest = async (endPoint: string, accountData: IAccount) => {
  return await axios.post(endPoint,
    accountData, {
    withCredentials: true
  });
};

export default postRequest;