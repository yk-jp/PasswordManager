import axios from "axios";

const getRequest = async (endPoint: string, accessToken?: string | undefined | null, withCredentials?: boolean | undefined) => {
  if (accessToken) {
    const headers = {
      "Content-type": "application/json",
      'Access-Control-Allow-Origin':'*',
      Authorization: `Bearer ${accessToken}`
    };
    return await axios.get(endPoint, {
      withCredentials: withCredentials,
      headers
    });
  }

  return await axios.get(endPoint, {
    withCredentials: withCredentials,
    headers:{
      'Access-Control-Allow-Origin':'*'
    }
  });
};

export default getRequest;