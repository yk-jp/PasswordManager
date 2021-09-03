import db from "../../config/db";
// interface
import { IAccount } from '../../interfaces/IAuth';

export default class AccountsQueries {
  public static insert(account: IAccount) {
    return db.execute("INSERT INTO accounts (email,password) VALUES (?,?)", [account.email, account.password]);
  }

  public static findOne(email: string) {
    return db.execute("SELECT * FROM accounts where email = ?", [email]);
  }
}