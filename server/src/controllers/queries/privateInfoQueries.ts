import db from "../../config/db";
import IPrivateInfo from "../../interfaces/IPrivateInfo";

export default class PrivateInfoQueries {
  public static findAll(userId: string) {
    // specify columns except for user id which is a user's email 
    return db.execute("SELECT itemId, title, link, username, password FROM privateinfos where userId = ?", [userId]);
  }

  public static findOne(userId: string, itemId: string) {
    // specify columns except for user id which is a user's email 
    return db.execute("SELECT itemId, title, link, username, password FROM privateinfos where userId = ? and itemId = ?", [userId, itemId]);
  }

  public static insertOne(userId: string, privateInfo: IPrivateInfo) {
    // specify columns except for user id which is a user's email 
    return db.execute("INSERT INTO privateinfos (userId, itemId, title, link, username, password) VALUES (?,?,?,?,?,?)", [userId, privateInfo.itemId, privateInfo.title, privateInfo.link, privateInfo.username, privateInfo.password]);
  }

  public static deleteOne(userId: string, itemId: string) {
    // specify columns except for user id which is a user's email 
    return db.execute("DELETE FROM privateinfos WHERE userId = ? and itemId = ?", [userId, itemId]);
  }

  public static updateOne(userId: string, privateInfo: IPrivateInfo) {
    // specify columns except for user id which is a user's email 
    return db.execute("UPDATE privateinfos SET title = ?,link = ?,username = ?,password = ? WHERE userId = ? and itemId = ?", [privateInfo.title, privateInfo.link, privateInfo.username, privateInfo.password, userId, privateInfo.itemId]);
  }
}