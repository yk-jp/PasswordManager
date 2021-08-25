const FormField = () => {
  return (
    <>
      <div className="form-group">
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
      </div>
      <div className="form-group mt-3">
        <input type="password" className="form-control" id="password" placeholder="Password" required />
      </div>
    </>
  )
};

export default FormField;