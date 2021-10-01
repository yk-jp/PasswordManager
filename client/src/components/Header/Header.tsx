import { Link } from 'react-router-dom';
const Header = () => {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex jusity-content-between">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li id="homepage" className="nav-item mt-1">
              <Link className="nav-link" to="/"><i className="bi bi-house"></i>Home</Link>
            </li>
            <li id="mypage" className="nav-item mt-1">
              <Link className="nav-link" to="/mypage"><i className="bi bi-person-fill"></i>My page</Link>
            </li>
            <li id="signout" className="nav-item mt-1">
              <Link className="nav-link" to="/"><i className="bi bi-box-arrow-right"></i>Sign out</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;


