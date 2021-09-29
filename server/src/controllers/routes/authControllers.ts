import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
// interface
import IAccount from '../../interfaces/IAccount';
import IAccountError from '../../interfaces/IAccountError';
import IError from '../../interfaces/IError';
// controllers
import TokenController from '../token/tokenControllers';
import AccountsQueries from '../queries/accountsQueries';
// validations
import AccountValidation from '../../validations/accountValidations';

export const signUp_post = async (req: Request, res: Response) => {
  const { email, password }: IAccount = req.body;

  try {
    // First things to do is to find an old user account.
    const existingAccountData = await AccountsQueries.findOne(email);
    const existingAccount: IAccount = JSON.parse(JSON.stringify(existingAccountData[0]))[0];

    if (existingAccount) throw Error(AccountValidation.isExistingAccount(existingAccount));

    // Check if both email and password are valid 
    const errors: { isError: boolean, errors: IAccountError } = AccountValidation.isAccountValid({ email, password });

    if (errors.isError) throw errors;

    // If the data does not exist, register new user in a database
    // hashing password 
    const salt = bcrypt.genSaltSync();
    const hasheedPassword: string = await bcrypt.hash(password, salt);

    // store new account
    await AccountsQueries.insert({ email, password: hasheedPassword });

    // create access token 
    const accessToken = TokenController.createAccessToken(email, 30);
    // successfully sign up 
    res.status(201).json({accessToken});

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
    const accessToken = TokenController.createAccessToken(email, 15 * 1000 * 60); //15 * 1000 ms(1s) * 60(s) = 15 minutes  

    //successfully sign in 
    res.status(200).json({accessToken});
  } catch (err: any) {
    res.status(404).json(err.toString());
  }
}

