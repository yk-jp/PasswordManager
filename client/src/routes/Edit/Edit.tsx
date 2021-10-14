import Header from "../../components/Header/Header";
import FormFieldForPrivateInfo from "../../components/FormFieldForPrivateInfo/FormFieldForPrivateInfo";
import EditControllers from "./EditControllers";
const Edit = () => {

  const { edit } = EditControllers();

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <form onSubmit={(e) => { edit(e) }}>
          <FormFieldForPrivateInfo />
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-outline-warning">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;