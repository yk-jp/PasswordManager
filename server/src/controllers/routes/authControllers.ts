import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
// interface
import { IAccount } from '../../interfaces/IAuth';
import { IAccountError } from '../../interfaces/IValidationErrors';
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

    if (existingAccount) throw "User account is already registered";

    // Check if both email and password are valid 
    const errors: { isError: boolean, errors: IAccountError } = AccountValidation.isAccountValid({ email, password });

    if (errors.isError) throw errors;

    // if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    // If the data does not exist, register new user in a database
    // hashing password 
    const salt = await bcrypt.genSalt();
    const hasheedPassword: string = await bcrypt.hash(password, salt);

    // store new account
    await AccountsQueries.insert({ email, password: hasheedPassword });

    // create access token 
    const accessToken = TokenController.createAccessToken(email, 30);

    res.json({ "token": accessToken });

  } catch (err) {
    res.json(err);
  }
};

export const signIn_post = async (req: Request, res: Response) => {
  const { email, password }: IAccount = req.body;

  try {
    // First things to do is to find an old user account.
    const existingAccountData = await AccountsQueries.findOne(email);

    const existingAccount: IAccount = JSON.parse(JSON.stringify(existingAccountData[0]))[0];

    // account doesn't exist because the account is not registered yet or email is wrong 
    if (!existingAccount) throw "Account doesn't exist";

    // password is wrong
    const isPasswordCorrect: boolean = await bcrypt.compare(password, existingAccount.password);

    if (!isPasswordCorrect) return Error("password is wrong");

    // create access token 
    const accessToken = TokenController.createAccessToken(email, 30);

    res.json({ existingAccount, accessToken });
  } catch (err) {
    res.status(404).json(err);
  }
}

