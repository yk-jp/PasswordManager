import { Request, Response } from 'express';
import IPrivateInfo from '../../interfaces/IPrivateInfo';
import PrivateInfoQueries from '../queries/privateInfoQueries';

export const mypage_get = async (req: Request, res: Response) => {
  try {
    const privateInfoData = await PrivateInfoQueries.findAll(res.locals.userId);
    const privateInfoList: IPrivateInfo[] = JSON.parse(JSON.stringify(privateInfoData[0]))[0];
    res.json(privateInfoList);
    
  } catch (err: any) {
    res.status(400).send(err.message);
  }
};

