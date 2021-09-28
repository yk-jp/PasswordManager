import { Request, Response } from 'express';

export const mypage_get = (req: Request, res: Response) => {
  res.json({success:true});
};