import { Link } from 'react-router-dom';
import HeaderControllers from './HeaderControllers';
import './style.css';
const Header = () => {

  const { logout, deleteMyAccount } = HeaderControllers();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex jusity-content-between">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li id="mypage" className="nav-item">
              <Link className="nav-link" to="/mypage"><i className="bi bi-person-fill"></i><span>My page</span></Link>
            </li>
            <li id="signout" className="nav-item nav-link" onClick={(e) => { logout(e) }}>
              <i className="bi bi-box-arrow-right"></i><span>Log out</span>
            </li>
            <li id="signout" className="nav-item nav-link"  onClick={(e) => { deleteMyAccount(e) }}>
              <i className="bi bi-person-x  color-red"></i><span className=" color-red">Delete my account</span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;


