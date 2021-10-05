import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { v4 as uuidv4 } from 'uuid';
// interface
import IAccount from '../../interfaces/IAccount';
import IAccountError from '../../interfaces/IAccountError';

// controllers
import TokenController from '../token/tokenControllers';
import AccountsQueries from '../queries/accountsQueries';
// validations
import AccountValidation from '../../validations/accountValidations';
// config
import config from '../../config/config';
// redis
import { redisSetex } from '../../config/redis';

export const signUp_post = async (req: Request, res: Response) => {
  const { email, password }: IAccount = req.body;
  const userId: string = uuidv4();
  try {
    // First things to do is to find an old user account.
    const existingAccountData = await AccountsQueries.findOne(email);
    const existingAccount: IAccount = JSON.parse(JSON.stringify(existingAccountData[0]))[0];

    if (existingAccount) throw Error(AccountValidation.isExistingAccount(existingAccount));

    // Check if both email and password are valid 
    const errors: { isError: boolean, errors: IAccountError } = AccountValidation.isAccountValid({ userId, email, password });

    if (errors.isError) throw errors;

    // If the data does not exist, register new user in a database
    // hashing password 
    const salt = bcrypt.genSaltSync();
    const hashedPassword: string = await bcrypt.hash(password, salt);

    // store new account
    await AccountsQueries.insert({ userId, email, password: hashedPassword });

    // create an access token 
    const accessToken = TokenController.createAccessToken(userId, config.token.secret_expiration_time);

    // create a refresh token 
    const refreshToken = TokenController.createRefreshToken(userId, config.token.secret_refresh_expiration_time)
    res.cookie("refreshToken", refreshToken, { maxAge: config.token.cookie_refresh_expiration_time, httpOnly: true, path: "/token" });

    // store a refresh token in redis cache with expiration which is the same period of cookie's 
    await redisSetex(userId, config.token.cookie_refresh_expiration_time/1000, refreshToken);

    // successfully sign up 
    res.status(201).json({ accessToken });

  } catch (err: any) {
    if (err.hasOwnProperty('isError')) return res.status(400).json(err.errors);
    return res.status(400).json(err.toString());
  }
};
