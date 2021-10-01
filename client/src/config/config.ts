import dotenv from 'dotenv';
dotenv.config();

const server = {
  home_post: process.env.REACT_APP_SERVER_HOME_POST || 'http://localhost:5000/',
  signup_post: process.env.REACT_APP_SERVER_SIGNUP_POST || 'http://localhost:5000/signup',
  mypage_get: process.env.REACT_APP_SERVER_MYPAGE_GET || 'http://localhost:5000/mypage'
}

const config = {
  server: server
}

export default config;