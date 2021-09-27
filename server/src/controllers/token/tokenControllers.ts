import jwt from 'jsonwebtoken';
import config from "../../config/config";

export default class TokenController {

  public static createAccessToken(email: string, maxAge: number) {
    return jwt.sign({email:email}, config.token.secret_key, { expiresIn: maxAge });
  }
}