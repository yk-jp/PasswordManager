import validator from 'validator';
import bcrypt from 'bcryptjs';
// interface
import IAccount from '../interfaces/IAccount';
import IAccountError from '../interfaces/IAccountError';
import IError from '../interfaces/IError';
export default class AccountValidation {

  public static isAccountValid(account: IAccount): { isError: boolean, errors: IAccountError } {
    let isError: boolean = false;

    const errors: IAccountError = { email: this.isEmailValid(account), password: this.isPasswordValid(account) };
    if (errors.email !== "" || errors.password.length > 0) isError = true;

    return { isError, errors };
  }

  private static isEmailValid(account: IAccount): string {
    let errorMsg: string = '';
    if (!validator.isEmail(account.email)) errorMsg = "Email is invalid";
    return errorMsg;
  }

  private static isPasswordValid(account: IAccount): string[] {
    let errorsMsg: string[] = [];

    if (account.password.length < 6) errorsMsg.push("Minimum length is 6 characters");
    if (validator.isNumeric(account.password)) errorsMsg.push("Use at least 1 alphabet");
    if (validator.isAlpha(account.password)) errorsMsg.push("Use at least 1 number");

    return errorsMsg;
  }

  public static isExistingAccount(account: IAccount): string {
    return account ? "User account is already registered" : "Account doesn't exist";
  }

  public static async isPasswordCorrect(reqestingPassword: string, account: IAccount): Promise<IError> {
    let error: IError = { isError: false, message: "" };
    try {
      const isPasswordCorrect: boolean = await bcrypt.compare(reqestingPassword, account.password);
      if (!isPasswordCorrect) error = { isError: true, message: "password is wrong" };
    } catch (err) {
      console.log(err);
    }
    return error;
  }
}

