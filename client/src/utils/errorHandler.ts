const errorHandler = (error: any): string[] => {
  let errorMsg: string[] = [];
  if (error.response) {
    // customized error
    if (error.response.data.hasOwnProperty('email') || error.response.data.hasOwnProperty('password')) {

      if (error.response.data.email !== "") errorMsg.push(error.response.data.email);
      if (error.response.data.password.length > 0) error.response.data.password.map((err: string) => {
        errorMsg.push(err);
      })
    }
    else errorMsg.push(error.response.data);
 

  } else if(error.request) {
    errorMsg.push(error.request);
  } else { 
    errorMsg.push(error.message);
  }
  return errorMsg;
}

export default errorHandler;