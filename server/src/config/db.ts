import mysql2 from 'mysql2';
import config from './config';
import bluebird from 'bluebird';

const db = mysql2.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.schema,
  Promise: bluebird
});;


export default db;
