import { Request, Response } from 'express';
import IPrivateInfo from '../../interfaces/IPrivateInfo';
import PrivateInfoQueries from '../queries/privateInfoQueries';
import AccountsQueries from '../queries/accountsQueries';
import { redisDelete } from '../../config/redis';

// password info 
export const mypage_get = async (req: Request, res: Response) => {
  try {
    const privateInfoData = await PrivateInfoQueries.findAll(res.locals.userId);
    const privateInfoList: IPrivateInfo[] = JSON.parse(JSON.stringify(privateInfoData[0]))[0];
    res.json(privateInfoList);

  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

// logout 
export const logout_delete = async (req: Request, res: Response) => {
  const userId: string = res.locals.userId;
  // delete the cookie for a refresh token
  res.clearCookie("refreshToken", { path: "/token" });
  try {
    // delete the refresh token from redis.
    redisDelete(userId);

    res.status(200).send("User was successfully logged out");
  } catch (err: any) {
    res.status(401).json(err.toString());
  }
}

// delete my account
export const account_delete = async (req: Request, res: Response) => {
  const userId: string = res.locals.userId;
  // delete the cookie for a refresh token
  res.clearCookie("refreshToken", { path: "/token" });
  try {
    // delete the refresh token from redis.
    redisDelete(userId);
    // delete the user data from database.
    await AccountsQueries.deleteById(userId);

    res.status(200).send("Thank you for using the service");
  } catch (err: any) {
    res.status(401).json(err.toString());
  }
}


