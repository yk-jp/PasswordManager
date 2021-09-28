import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
// controllers
import AccountsQueries from '../controllers/queries/accountsQueries';
// config
import config from '../config/config';
// interfaces
import IAccount from '../interfaces/IAccount';

export const protectAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.headers.authorization;
  const accessToken: string | undefined = authHeader && authHeader.split(' ')[1]; //Bearer token

  try {
    if (!accessToken) throw Error("Not authorized");
    
    const decoded: JwtPayload = jwt.verify(accessToken, config.token.secret_key) as JwtPayload;
   
    const existingAccountData = await AccountsQueries.findOne(decoded.email);
    const existingAccount: IAccount = JSON.parse(JSON.stringify(existingAccountData[0]))[0];

    if(!existingAccount) throw Error("Account doesn't exist");
    // attach an email to each response.
    res.locals.email = decoded.email;
    next();
  } catch (err: any) {
    res.status(400).json(err.toString());
  }

}