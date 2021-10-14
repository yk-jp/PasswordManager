import CryptoJS from 'crypto-js';
import config from '../../config/config';
import IPrivateInfo from '../../interfaces/IPrivateInfo';
export default class Crypt {
  public static encrypt(plainPassword: string | null | undefined) {
    if (!plainPassword || plainPassword == "") return null;
    return CryptoJS.AES.encrypt(plainPassword, config.crypt.secret_key).toString();
  }

  public static decrypt(encryptedPassword: string | undefined | null) {
    if (!encryptedPassword || encryptedPassword == "") return null;
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, config.crypt.secret_key);
    return bytes.toString(CryptoJS.enc.Utf8);;
  }

  public static decryptAllData(privateInfoList: IPrivateInfo[]): IPrivateInfo[] {
    for(let i = 0; i < privateInfoList.length; i++) { 
      if(!privateInfoList[i].password) continue;
      privateInfoList[i].password = this.decrypt(privateInfoList[i].password);
    }
    return privateInfoList;
  }
}