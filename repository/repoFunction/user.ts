import * as mongoQuery from "../mongoQuery/user";
import * as mysqlQuery from "../mysqlQuery/user";

export class User {
  private static instance: User;
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

  static getInstance(database: string): User {
    if (!User.instance) {
      User.instance = new User(database);
    }
    return User.instance;
  }

  async createNewUser(
    name: string,
    email: string,
    contactNo: string,
    hashedPassword: string
  ) {
    return this.repo.createNewUser(name, email, contactNo, hashedPassword);
  }

  async selectAllUsers() {
    return this.repo.selectAllUsers();
  }

  async selectUserByID(id: number | string) {
    return this.repo.selectUserByID(id);
  }

  async selectUserByName(name: string) {
    return this.repo.selectUserByName(name);
  }

  async selectUserByEmail(email: string) {
    return this.repo.selectUserByEmail(email);
  }

  async deleteUserByID(userID: string | number) {
    return this.repo.deleteUserByID(userID);
  }

  async updateUsersPassword(userID: string | number, hashedPassword: string) {
    return this.repo.updateUsersPassword(userID, hashedPassword);
  }
}
