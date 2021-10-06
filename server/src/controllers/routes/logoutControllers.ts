import { Request, Response } from 'express';
import { redisDelete } from '../../config/redis';
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
