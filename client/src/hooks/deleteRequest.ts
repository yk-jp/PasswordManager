import axios from 'axios';
import IPrivateInfo from '../interfaces/IPrivateInfo';

const deleteRequest = async (endPoint: string, accessToken: string, data?:IPrivateInfo) => {
  await axios.delete(endPoint,
    {
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
};

export default deleteRequest;