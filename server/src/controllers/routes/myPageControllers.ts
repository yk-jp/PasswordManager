import { Request, Response } from 'express';
import IPrivateInfo from '../../interfaces/IPrivateInfo';
import PrivateInfoQueries from '../queries/privateInfoQueries';
import AccountsQueries from '../queries/accountsQueries';
import { redisDelete } from '../../config/redis';
import Crypt from '../crypto/crypt';
import { v4 as uuidv4 } from 'uuid';
// password info 
export const mypage_get = async (req: Request, res: Response) => {
  const userId: string = res.locals.userId;
  try {
    const privateInfoData = await PrivateInfoQueries.findAll(userId);
    let privateInfoList: IPrivateInfo[] = JSON.parse(JSON.stringify(privateInfoData))[0];
    // decrypt password
    privateInfoList = Crypt.decryptAllData(privateInfoList);
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

// when editting an item
export const item_get = async (req: Request, res: Response) => {
  const userId: string = res.locals.userId;
  const itemId: string = req.params.id;

  try {
    const itemData = await PrivateInfoQueries.findOne(userId, itemId);
    const item: IPrivateInfo = JSON.parse(JSON.stringify(itemData[0]))[0];

    //decrypt each password of items
    item.password = Crypt.decrypt(item.password);

    res.status(200).json(item);

  } catch (err: any) {
    // internal server error
    res.status(500).json(err.toString());
  }
}

export const item_post = async (req: Request, res: Response) => {
  const userId: string = res.locals.userId;
  const privateInfo: IPrivateInfo = req.body;
  const itemId:string = uuidv4();
  privateInfo.itemId = itemId;
  privateInfo.password = Crypt.encrypt(privateInfo.password);
 
  try {
    await PrivateInfoQueries.insertOne(userId,privateInfo);
    res.status(200).json({"success":"successfully added a new item"});
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};