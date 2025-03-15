import * as mongoQuery from "../mongoQuery/admin";
import * as mysqlQuery from "../mysqlQuery/admin";

export class Admin {
  private static instance: Admin;
  private repo: typeof mongoQuery | typeof mysqlQuery;

  private constructor(database: string) {
    if (database === "mongodb") {
      this.repo = mongoQuery;
    } else if (database === "mysql") {
      this.repo = mysqlQuery;
    } else {
      throw new Error("Please enter a valid database.");
    }
  }

  static getInstance(database: string): Admin {
    if (!Admin.instance) {
      Admin.instance = new Admin(database);
    }
    return Admin.instance;
  }

  async createNewAdmin(userID: string | number) {
    return this.repo.createNewAdmin(userID);
  }

  async selectAdmin(userID: string | number) {
    return this.repo.selectAdmin(userID);
  }

  async deleteAdminByID(userID: string | number) {
    return this.repo.deleteAdminByID(userID);
  }

  async updateAdminByID(userID: number | string, newUserID: number | string) {
    return this.repo.updateAdminByID(userID, newUserID);
  }
}
