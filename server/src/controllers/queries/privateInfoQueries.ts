import db from "../../config/db";

export default class PrivateInfoQueries {
  public static findAll(email: string) {
    // specify columns except for user id which is a user's email 
    return db.execute("SELECT title,link,username,email,password FROM privateinfos where userId = ?", [email]);
  }
}