// components
import Title from "../../components/Title/Title";
import SocialAccount from "../../components/SocialAccount/SocialAccount";
import FormField from "../../components/FormField/FormField";

const Login = () => {

  return (
    <div className="vh-100 container d-flex justify-content-center align-items-center flex-column">
      <div>
        <div className="text-white text-center my-4">
          <h2><Title /></h2>
        </div>
        {/* login with email and password */}
        <form onSubmit={() => { }}>
          <FormField />
          <button type="submit" className="btn btn-primary d-block m-auto w-100 mt-3">Login</button>
        </form>
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