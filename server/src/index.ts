import express, { Application } from 'express';
// config 
import config from './config/config';
// routes
import authRouter from './routes/authRoutes';
import mypageRouter from './routes/myPageRoutes';
// others
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors(
  {
    origin: [config.client,config.redis.host],
    credentials: true,
    allowedHeaders: ['Origin','X-Requested-With','Content-Type','Accept','Authorization']
  }
));

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/mypage', mypageRouter);

app.listen(config.server.port, () => {
  console.log(`Server listening at ${config.server.port}`);
});