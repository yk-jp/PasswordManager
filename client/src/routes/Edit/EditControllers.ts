import { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { ErrorFromMypageContext } from "../../context/ErrorFromMypageContext";
import TokenRequest from "../../hooks/TokenRequest";

const EditControllers = () => {
  const history = useHistory();
  const errorFromMypage = useContext(ErrorFromMypageContext);

  const { requestAccessTokenWithRefreshToken } = TokenRequest();

  useEffect(() => {



  }, []);

  const getDataToEdit = () => {
    // send a put request to get a particular data

  };

  const editController = () => {



  };

  return { editController, getDataToEdit };
};

export default EditControllers;