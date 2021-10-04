import dotenv from 'dotenv';
dotenv.config();

// token
const secret_key: string = process.env.JWT_SECRET_KEY as string;
const secret_refresh_key: string = process.env.JWT_REFRESH_SECRET_KEY as string;

// expiration time
const secret_expiration_time: string = process.env.JWT_EXPIRATION_TIME as string || '15m';
const secret_refresh_expiration_time: string = process.env.JWT_REFRESH_EXPIRATION_TIME as string || '30d';
const cookie_refresh_expiration_time: number = parseInt(process.env.COOKIE_REFRESH_EXPIRATION_TIME!) as number || 14 * 1000 * 60 * 60 * 24; //14 * 1000 ms(1s) * 60(s) * 60(min) * 24(hours) = 14 days 
console.log(cookie_refresh_expiration_time)

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

// redis
const redis_port: number = parseInt(process.env.REDIS_PORT!) || 6379;
const redis_host: string = process.env.REDIS_HOST || '127.0.0.1';

const REDIS = {
  port: redis_port,
  host: redis_host
}

const config = {
  token: TOKEN,
  server: SERVER,
  db: DATABASE,
  redis: REDIS
}

export default config;