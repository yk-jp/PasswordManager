import axios from "axios";

const getRequest = async (endPoint: string, accessToken?: string | undefined | null, withCredentials?: boolean | undefined) => {
  if (accessToken) {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    };
    return await axios.get(endPoint, {
      withCredentials: withCredentials,
      headers
    });
  }

  return await axios.get(endPoint, {
    withCredentials: withCredentials,
  });
};

export default getRequest;