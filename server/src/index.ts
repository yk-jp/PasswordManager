import express, { Application } from 'express';

// config 
import config from './config/config';

const app: Application = express();

app.listen(config.server.port, () => {
  console.log(`Server listening at ${config.server.port}`);
});