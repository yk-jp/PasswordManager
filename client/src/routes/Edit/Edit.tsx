import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import style from './Style.module.css';

const Edit = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <form >
          <div className="mb-2">
            <i className="bi bi-chevron-left"></i><span className="p-2">Back</span>
          </div>
          <div className="form-group mb-2" onSubmit={(e) => { }}>
            <label htmlFor="Title" className="text-white">Title</label>
            <input type="text" className="form-control" id="Title" placeholder="Enter a title" />
          </div>
          <div className="form-group  mb-2">
            <label htmlFor="Link" className="text-white">Link</label>
            <input type="text" className="form-control" id="Link" placeholder="Enter a link" />
          </div>
          <div className="form-group  mb-2">
            <label htmlFor="Username" className="text-white">Username</label>
            <input type="text" className="form-control" id="Username" placeholder="Enter an username" />
          </div>
          <div className="form-group  mb-2">
            <label htmlFor="Password" className="text-white">Password</label>
            <input type="password" className="form-control" id="Password" placeholder="Enter a password" />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-outline-warning">Update</button>
          </div>
        </form>
      </div>
    </div>
  );


};

export default Edit;