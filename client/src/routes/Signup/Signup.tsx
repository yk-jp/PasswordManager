import { Link } from 'react-router-dom';
// components
import Title from "../../components/Title/Title";
import FormField from "../../components/FormField/FormField";
// controller
import SignupControllers from './SignupControllers';

const Signup = () => {
  const { error, signup } = SignupControllers();
  return (
    <div className="vh-100 container d-flex justify-content-center align-items-center flex-column">
      <div>
        <div className="text-white text-center my-4">
          <h2><Title /></h2>
        </div>
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
        <form onSubmit={(e) => { signup(e) }}>
          <FormField />
          <button type="submit" className="btn btn-primary d-block m-auto w-100 mt-3">Sign up</button>
        </form>
        <div className="d-flex justify-content-end">
          <Link className="nav-link  m-0 p-0" to="/">Already have an account?</Link>
        </div>
      </div>
    </div>
  )

};

export default Signup;