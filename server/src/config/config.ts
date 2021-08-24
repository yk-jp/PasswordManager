import dotenv from 'dotenv';
dotenv.config();


// server port
const server_port: string = process.env.PORT || "5000";

const SERVER = {
  port: server_port
}





const config = {
  server: SERVER
}

export default config;