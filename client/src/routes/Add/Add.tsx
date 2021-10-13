import Header from "../../components/Header/Header";
import FormFieldForPrivateInfo from "../../components/FormFieldForPrivateInfo/FormFieldForPrivateInfo";
import AddControllers from "./AddControllers";
const Add = () => {

  const { add } = AddControllers();

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <form onSubmit={(e) => { add(e) }}>
          <FormFieldForPrivateInfo />
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-outline-warning">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;