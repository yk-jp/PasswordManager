import db from "../../config/db";
// import IPrivateInfo from "../../interfaces/IPrivateInfo";
import PrivateInfoQueries from '../../controllers/queries/privateInfoQueries';
import user from '../db/testData/user';
import privateinfos from '../db/testData/privateinfo';
import Crypt from '../../controllers/crypto/crypt';
import IPrivateInfo from "../../interfaces/IPrivateInfo";

describe('test a privateinfo table', () => {
  beforeEach(() => {

    return db.execute("DELETE FROM privateinfos");

  });

  test('data should be stored in a table', () => {
    return expect(PrivateInfoQueries.insertOne(user.userId, privateinfos[0])).resolves.not.toBeNull();
  });


  test('password should be encrypted and stored in a table', async () => {
    let inputData: IPrivateInfo = privateinfos[0];
    inputData.password = Crypt.encrypt(privateinfos[0].password!);
    const input = await PrivateInfoQueries.insertOne(user.userId, privateinfos[0]);
    expect(input).not.toBeNull();
  });

  test('decrypted password should be the same as an original one', async () => {
    let password = "test";
    let encrypted = Crypt.encrypt(password);
    let decrypted = Crypt.decrypt(encrypted);
    expect(decrypted).toBe(password);
  });

});
