import jwt from 'jsonwebtoken';
import config from "../../config/config";
export default class TokenController {

  public static createAccessToken(userId: string, maxAge: string) {
    return jwt.sign({ userId: userId }, config.token.secret_key, { expiresIn: maxAge });
  }

  public static createRefreshToken(userId: string, maxAge: string) {
    return jwt.sign({ userId: userId }, config.token.secret_refresh_key, { expiresIn: maxAge });
  }
}