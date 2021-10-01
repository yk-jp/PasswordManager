import Header from "../../components/Header/Header";
import MypageControllers from "./MypageControllers";
const Mypage = () => {
  MypageControllers();

  return (
    <div>
      <Header />
      <div className="text-white">
        <p>Mypage</p>
      </div>
    </div>
  );

};

export default Mypage;