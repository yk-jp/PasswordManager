import { useContext } from 'react';
import { Link } from 'react-router-dom';
// components
import Title from "../../components/Title/Title";
import SocialAccount from "../../components/SocialAccount/SocialAccount";
import FormField from "../../components/FormField/FormField";
// controllers
import LoginControllers from './LoginControllers';
// context
import { ErrorFromMypageContext } from '../../context/ErrorFromMypageContext';

const Login = () => {
  const { error, login } = LoginControllers();
  const errorFromMypage = useContext(ErrorFromMypageContext);

  return (
    <div className="vh-100 container d-flex justify-content-center align-items-center flex-column">
      <div>
        <div className="text-white text-center my-4">
          <h2><Title /></h2>
        </div>
        {/* error from mypage. e.g session is expired */}
        {errorFromMypage &&
          <div id="errorFromMypage" className="text-danger my-4">
            <p className="text-center">{errorFromMypage.error}</p>
          </div>
        }
        {error &&
          <div id="errorMessage" className="text-danger my-4">
            <ul>
              {error.map((err, index) => {
                return <li key={index}>
                  {err}
                </li>
              })}
            </ul>
          </div>
        }
        {/* login with email and password */}
        <form onSubmit={(e) => { login(e) }}>
          <FormField />
          <button type="submit" className="btn btn-primary d-block m-auto w-100 mt-3">Login</button>
        </form>
        <div className="d-flex justify-content-end">
          <Link className="nav-link  m-0 p-0" to="/signup">Don't have an account?</Link>
        </div>
        <div className="text-white mt-3">
          <p className="text-center">or</p>
        </div>
        <div>
          <p className="text-center text-white">continue with these account</p>
        </div>
        {/* login with an account*/}
        <div className="d-flex text-white justify-content-around">
          <SocialAccount />
        </div>
      </div>
    </div>
  )
};

export default Login;