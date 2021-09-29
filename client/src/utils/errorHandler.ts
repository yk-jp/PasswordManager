const errorHandler = (error: any): string => {
  
  let errorMsg: string = "";
  
  if (error.response) {
    // customized error
    if (error.response.hasOwnProperty('email') || error.response.hasOwnProperty('password')) { 
      errorMsg = error.response.data.email + " " + error.response.data.password;
    } 
    else errorMsg = error.response.data;

  } else {
    errorMsg = error.response.data;
  }
  return errorMsg;
}

export default errorHandler;