import express, { Application } from 'express';
// config 
import config from './config/config';
// routes
import router from './routes/authRoutes';
// others
import cors from 'cors';

const app: Application = express();

app.use(express.json());

app.use(router);

app.listen(config.server.port, () => {
  console.log(`Server listening at ${config.server.port}`);
});