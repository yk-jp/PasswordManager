import dotenv from 'dotenv';
dotenv.config();

const server = {
  login_post: process.env.REACT_APP_SERVER_LOGIN_POST || 'http://localhost:5000/',
  login_get: process.env.REACT_APP_SERVER_LOGIN_GET || 'http://localhost:5000/',
  signup_post: process.env.REACT_APP_SERVER_SIGNUP_POST || 'http://localhost:5000/signup',
  mypage_get: process.env.REACT_APP_SERVER_MYPAGE_GET || 'http://localhost:5000/mypage',
  token_get: process.env.REACT_APP_SERVER_TOKEN_GET || 'http://localhost:5000/token',
  logout_delete:process.env.REACT_APP_SERVER_LOGOUT_DELETE || 'http://localhost:5000/mypage/logout'
}

const config = {
  server: server
}

export default config;