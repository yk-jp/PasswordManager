import dotenv from 'dotenv';
dotenv.config();

const server = {
  login: process.env.REACT_APP_SERVER_LOGIN || 'http://localhost:5000/',
  signup: process.env.REACT_APP_SERVER_SIGNUP || 'http://localhost:5000/signup',
  mypage: process.env.REACT_APP_SERVER_MYPAGE || 'http://localhost:5000/mypage',
  token: process.env.REACT_APP_SERVER_TOKEN || 'http://localhost:5000/token',
  logout: process.env.REACT_APP_SERVER_LOGOUT || 'http://localhost:5000/mypage/logout',
  account: process.env.REACT_APP_SERVER_ACCOUNT || 'http://localhost:5000/mypage/account'
}

const config = {
  server: server
}

export default config;