import dotenv from 'dotenv';
dotenv.config();

// server port
const server_port: string = process.env.PORT || "5000";

const SERVER = {
  port: server_port
}

// database
const db_host: string = process.env.DB_HOST || 'localhost';
const db_user: string = process.env.DB_USER || 'root';
const db_password: string | undefined = process.env.DB_PASSWORD || undefined;
const db_schema: string = process.env.DB_SCEMA || 'passwordmanager';

const DATABASE = {
  host: db_host,
  user: db_user,
  password: db_password,
  schema: db_schema
}

const config = {
  server: SERVER,
  db: DATABASE
}

export default config;