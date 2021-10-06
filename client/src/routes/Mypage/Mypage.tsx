import Header from "../../components/Header/Header";
import MypageControllers from "./MypageControllers";
import Loading from "../../components/Loading/Loading";
import style from "./Style.module.css";
const Mypage = () => {

  const { isLoggedIn } = MypageControllers();

  return (
    <>
      {!isLoggedIn ?
        <div id="loading" className={`${style.center}`}>
          <Loading />
        </div>
        :
        <div>
          <Header />
          <div className="text-white">
            <p>Mypage</p>
          </div>
        </div>
      }
    </>
  );

};

export default Mypage;