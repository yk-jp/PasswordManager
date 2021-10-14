import { useContext } from "react";
import { InputContext } from '../../context/InputContext';
const FormField = () => {
  const InputData = useContext(InputContext);
  return (
    <>
      <div className="form-group">
        <input onChange={(e) => InputData.emailData.setEmail(e.target.value)} type="email" value={InputData.emailData.email} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
      </div>
      <div className="form-group mt-3">
        <input onChange={(e) => InputData.passwordData.setPassword(e.target.value)} value={InputData.passwordData.password} type="password" className="form-control" id="password" placeholder="Password" required />
      </div>
    </>
  )
};

export default FormField;