import { Request, Response } from 'express';
// controllers
import TokenController from '../token/tokenControllers';

// config
import config from '../../config/config';
// redis
import { redisSetex } from '../../config/redis';

export const token_get = async (req: Request, res: Response) => {
  const userId: string = res.locals.userId;

  try {
    const accessToken = TokenController.createAccessToken(userId, config.token.secret_expiration_time);
    const refreshToken = TokenController.createRefreshToken(userId, config.token.secret_refresh_expiration_time);

    // update a refresh token stored in redis cache →　Sliding expiration time 
    await redisSetex(userId, config.token.cookie_refresh_expiration_time/1000, refreshToken);
    res.cookie("refreshToken", refreshToken, { maxAge: config.token.cookie_refresh_expiration_time, httpOnly: true, path: "/token" });

    //successfully generate new access token 
    res.status(200).json({ accessToken });

  } catch (err: any) {
    return res.json({ accessToken: null });
  }
};

