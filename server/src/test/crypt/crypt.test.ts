import Crypt from '../../controllers/crypto/crypt';

describe('test for password stored in db', () => {
  const password = "password";

  test('password shoud be encrypted and decrypted', () => {

    const encryptedPassword = Crypt.encrypt(password);

    const decryptedPass = Crypt.decrypt(encryptedPassword);
    expect(decryptedPass).toBe(password);
  });

});
