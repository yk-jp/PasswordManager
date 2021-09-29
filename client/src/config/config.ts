import dotenv from 'dotenv';
dotenv.config();

const server = {
  endpoint: process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:5000"
}

const config = {
  server: server
}

export default config;