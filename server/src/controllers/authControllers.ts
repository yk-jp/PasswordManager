import { Request, Response } from 'express';
import db from '../config/db';
import jwt from 'jsonwebtoken';
// interface
import { IAccount } from '../interfaces/IAuth';

export const signUp_post = (req: Request, res: Response) => {
  const { email, password }: IAccount = req.body;

  db.promise().query("INSERT INTO accounts (email,password) VALUES (?,?)", [email, password])
    .then(() => {
      res.send("Registoration of an user account is done");
    }).catch((err) => {
      console.log(err);
      res.send("Registoration was faild");
    });
  // const token = jwt.sign();
};

