import { Request, Response } from 'express';
// interface
import IAccount from '../../interfaces/IAccount';
import IError from '../../interfaces/IError';
// controllers
import TokenController from '../token/tokenControllers';
import AccountsQueries from '../queries/accountsQueries';
// validations
import AccountValidation from '../../validations/accountValidations';
// config
import config from '../../config/config';
// redis
import { redisSetex } from '../../config/redis';

export const login_post = async (req: Request, res: Response) => {
  const { email, password }: IAccount = req.body;

  try {
    // First things to do is to find an old user account.
    const existingAccountData = await AccountsQueries.findOne(email);

    const existingAccount: IAccount = JSON.parse(JSON.stringify(existingAccountData[0]))[0];

    // account doesn't exist because the account is not registered yet or email is wrong 
    if (!existingAccount) throw Error(AccountValidation.isExistingAccount(existingAccount));

    // password is wrong
    const isPasswordCorrect: IError = await AccountValidation.isPasswordCorrect(password, existingAccount);

    if (isPasswordCorrect.isError) throw Error(isPasswordCorrect.message);

    // create access token 
    const accessToken = TokenController.createAccessToken(existingAccount.userId, config.token.secret_expiration_time);

    // create a refresh token 
    const refreshToken = TokenController.createRefreshToken(existingAccount.userId, config.token.secret_refresh_expiration_time);
    res.cookie("refreshToken", refreshToken, { maxAge: config.token.cookie_refresh_expiration_time, httpOnly: true, path: "/token" });

    // store a refresh token in redis cache with expiration which is the same period of cookie's 
    await redisSetex(existingAccount.userId, config.token.cookie_refresh_expiration_time/1000, refreshToken);

    //successfully sign in 
    res.status(200).json({ accessToken });
  } catch (err: any) {
    res.status(404).json(err.toString());
  }
}

export const login_get = async (req: Request, res: Response) => {
  try {
    // create access token 
    const accessToken = TokenController.createAccessToken(res.locals.userId, config.token.secret_expiration_time);
    //successfully sign in 
    res.status(200).json({ accessToken });
  } catch (err: any) {
    res.status(404).json(err.toString());
  }
}
