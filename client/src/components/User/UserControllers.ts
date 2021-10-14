import deleteRequest from "../../hooks/deleteRequest";
import config from "../../config/config";
import IPrivateInfo from "../../interfaces/IPrivateInfo";
const UserControllers = () => {
  const accessToken: string | null = localStorage.getItem("accessToken");

  const deleteItem = async (user: IPrivateInfo) => {
    if (!window.confirm("You want to delete your item?")) return;

    try {
      await deleteRequest(`${config.server.account}/${user.itemId}`, accessToken!);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return { deleteItem };

};

export default UserControllers;