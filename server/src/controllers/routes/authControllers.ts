import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
// interface
import IAccount from '../../interfaces/IAccount';
import IAccountError from '../../interfaces/IAccountError';
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
    await redisSetex(userId, config.token.cookie_refresh_expiration_time, refreshToken);

    // successfully sign up 
    res.status(201).json({ accessToken });

  } catch (err: any) {
    if (err.hasOwnProperty('isError')) return res.status(400).json(err.errors);
    return res.status(400).json(err.toString());
  }
};

export const signIn_post = async (req: Request, res: Response) => {
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
    await redisSetex(existingAccount.userId, config.token.cookie_refresh_expiration_time, refreshToken);

    //successfully sign in 
    res.status(200).json({ accessToken });
  } catch (err: any) {
    res.status(404).json(err.toString());
  }
}

export const token_post = async (req: Request, res: Response) => {
  const userId: string = res.locals.userId;

  try {
    const accessToken = TokenController.createAccessToken(userId, config.token.secret_expiration_time);
    const refreshToken = TokenController.createRefreshToken(userId, config.token.secret_refresh_expiration_time);

    // update a refresh token stored in redis cache →　Sliding expiration time 
    await redisSetex(userId, config.token.cookie_refresh_expiration_time, refreshToken);
    res.cookie("refreshToken", refreshToken, { maxAge: config.token.cookie_refresh_expiration_time, httpOnly: true, path: "/token" });

    //successfully generate new access token 
    res.status(200).json({ accessToken });

  } catch (err: any) {
    return res.json({ accessToken: null });
  }
};

