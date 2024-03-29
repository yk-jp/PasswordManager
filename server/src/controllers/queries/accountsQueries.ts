import db from "../../config/db";
// interface
import IAccount from '../../interfaces/IAccount';

export default class AccountsQueries {
  public static insert(account: IAccount) {
    return db.execute("INSERT INTO accounts (userId,email,password) VALUES (?,?,?)", [account.userId, account.email, account.password]);
  }

  public static findOne(email: string) {
    return db.execute("SELECT * FROM accounts where email = ?", [email]);
  }

  public static findOneById(userId: string) {
    return db.execute("SELECT * FROM accounts where userId = ?", [userId]);
  }

  public static deleteById(userId: string) {
    return db.execute("DELETE FROM accounts where userId = ?", [userId]);
  }
}