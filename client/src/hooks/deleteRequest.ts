import axios from 'axios';

const deleteRequest = async (endPoint: string, accessToken: string) => {
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