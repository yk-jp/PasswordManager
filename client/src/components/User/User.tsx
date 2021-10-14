import { Link } from "react-router-dom";
import IPrivateInfo from "../../interfaces/IPrivateInfo";
import UserControllers from "./UserControllers";
const User = (user: IPrivateInfo) => {

  const { deleteItem } = UserControllers();

  return (
    <div id={user.itemId} className="card bg-secondary">
      <div className="card-header text-center d-flex justify-content-center">
        <p className="m-0 px-1">Account</p><Link to={`mypage/account/${user.itemId}`}><i className="bi bi-pencil-square"></i></Link>
        <i id="deleteItem" className="bi bi-trash" onClick={() => { deleteItem(user) }}></i>
      </div>
      <div className="card-header text-center">
        {
          user.link ?
            <a href={user.link}>{user.title}</a>
            :
            user.title
        }
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item bg-secondary text-white text-center">{user.username && user.username}</li>
        <li className="list-group-item bg-secondary text-white text-center">{user.password && user.password}</li>
      </ul>
    </div>
  );
}

export default User;