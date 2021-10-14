import dotenv from 'dotenv';
dotenv.config();

const endpoint: string = process.env.REACT_APP_SERVER_ENDPOINT || 'http://localhost:5000';

const server = {
  login: `${endpoint}/`,
  signup: `${endpoint}/signup`,
  mypage: `${endpoint}/mypage`,
  token: `${endpoint}/token`,
  logout: `${endpoint}/mypage/logout`,
  user: `${endpoint}/mypage/user`,
  account: `${endpoint}/mypage/account`
}

const config = {
  server: server
}

export default config;