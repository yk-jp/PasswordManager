import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
// controllers
import AccountsQueries from '../controllers/queries/accountsQueries';
// config
import config from '../config/config';
// interfaces
import IAccount from '../interfaces/IAccount';
// redis
import { redisGet } from '../config/redis';

export const protectAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.headers.authorization;
  const accessToken: string | undefined = authHeader && authHeader.split(' ')[1]; //Bearer token

  try {
    if (!accessToken) throw Error("Not authorized");

    const decoded: JwtPayload = jwt.verify(accessToken, config.token.secret_key) as JwtPayload;
    
    const existingAccountData = await AccountsQueries.findOneById(decoded.userId);
    const existingAccount: IAccount = JSON.parse(JSON.stringify(existingAccountData[0]))[0];

    if (!existingAccount) throw Error("Account doesn't exist");
    // attach an user id to each response.
    res.locals.userId = decoded.userId;
    next();
  } catch (err: any) {
    res.status(401).json(err.toString());
  }
}

export const protectAuthForRefresh = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken: string = req.cookies.refreshToken;
  console.log(refreshToken)
  if (!refreshToken) return res.json({ accessToken: null });

  try {
    const decoded: JwtPayload = jwt.verify(refreshToken, config.token.secret_refresh_key) as JwtPayload;
    
    const storedRefreshToken = await redisGet(decoded.userId);

    if (!storedRefreshToken) res.json({ accessToken: null });

    if (refreshToken !== storedRefreshToken) res.json({ accessToken: null });

    // attach an user id to each response.
    res.locals.userId = decoded.userId;

    next();
  } catch (err: any) {
    return res.status(401).json(err.toString());
  }
}