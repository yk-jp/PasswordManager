import { Link } from "react-router-dom";
import { useContext } from "react";
import { InputForPrivateInfoContext } from "../../context/InputForPrivateInfoContext";
import style from './Style.module.css';

const FormFieldForPrivateInfo = () => {
  const InputForPrivateInfo = useContext(InputForPrivateInfoContext);

  return (
    <>
      <div className="mb-2">
        <Link to="/mypage" className={`${style["text-decoration-none"]}`}><i className="bi bi-chevron-left"></i><span className={`p-2 }`}>Back</span></Link>
      </div>
      <div className="form-group mb-2" onSubmit={(e) => { }}>
        <label htmlFor="Title" className="text-white">Title</label>
        <input onChange={(e) => { InputForPrivateInfo.titleData.setTitle(e.target.value) }} type="text" className="form-control" id="Title" placeholder="Enter a title" value={InputForPrivateInfo.titleData.title} required />
      </div>
      <div className="form-group  mb-2">
        <label htmlFor="Link" className="text-white">Link</label>
        <input onChange={(e) => { InputForPrivateInfo.linkData.setLink(e.target.value) }} type="text" className="form-control" id="Link" placeholder="Enter a link" value={InputForPrivateInfo.linkData.link} />
      </div>
      <div className="form-group  mb-2">
        <label htmlFor="Username" className="text-white">Username</label>
        <input onChange={(e) => { InputForPrivateInfo.usernameData.setUsername(e.target.value) }} type="text" className="form-control" id="Username" placeholder="Enter an username" value={InputForPrivateInfo.usernameData.username} />
      </div>
      <div className="form-group  mb-2">
        <label htmlFor="Password" className="text-white">Password</label>
        <input onChange={(e) => { InputForPrivateInfo.passwordData.setPassword(e.target.value) }} type="password" className="form-control" id="Password" placeholder="Enter a password" value={InputForPrivateInfo.passwordData.password} />
      </div>
    </>
  );

};

export default FormFieldForPrivateInfo;