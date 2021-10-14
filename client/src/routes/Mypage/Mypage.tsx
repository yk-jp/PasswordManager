import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import MypageControllers from "./MypageControllers";
import Loading from "../../components/Loading/Loading";
import User from "../../components/User/User";
import style from "./Style.module.css";

const Mypage = () => {

  const { isLoggedIn, userData } = MypageControllers();
  
  return (
    <>
      {!isLoggedIn ?
        <div id="loading" className={`${style.center}`}>
          <Loading />
        </div>
        :
        <div>
          <Header />
          <section id="userInfoSec" className={`mt-2 text-white d-flex flex-row flex-wrap`}>

            {userData !== [] && userData.map((user, index) => {
              return <div key={index} className="d-flex justify-content-center m-2">
                <User {...user} />
              </div>;
            })
            }

            <Link to="/mypage/account/add"><i className={`bi bi-plus-square-dotted ${style["text-yellow"]}`}></i></Link>
          </section>
        </div>
      }
    </>
  );

};

export default Mypage;