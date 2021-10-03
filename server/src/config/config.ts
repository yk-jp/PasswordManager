import dotenv from 'dotenv';
dotenv.config();

// token
const secret_key: string = process.env.JWT_SECRET_KEY as string;
const secret_refresh_key: string = process.env.JWT_REFRESH_SECRET_KEY as string;

// expiration time
const secret_expiration_time: string = process.env.JWT_EXPIRATION_TIME as string || '15m'; 
const secret_refresh_expiration_time: string = process.env.JWT_REFRESH_EXPIRATION_TIME as string || '30d';
const cookie_refresh_expiration_time: number = parseInt(process.env.COOKIE_EFRESH_EXPIRATION_TIME as string) as number || 30 * 1000 * 60 * 60 * 24; //30 * 1000 ms(1s) * 60(s) * 60(min) * 24(hours) = 30 days 

const TOKEN = {
  secret_key: secret_key,
  secret_refresh_key: secret_refresh_key,
  secret_expiration_time: secret_expiration_time,
  secret_refresh_expiration_time: secret_refresh_expiration_time,
  cookie_refresh_expiration_time: cookie_refresh_expiration_time
}

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
  token: TOKEN,
  server: SERVER,
  db: DATABASE
}

export default config;