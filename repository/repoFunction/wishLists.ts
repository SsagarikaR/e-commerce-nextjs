import * as mongoQuery from "../mongoQuery/wishLists";
import * as mysqlQuery from "../mysqlQuery/wishLists";

export class Wishlist {
  private static instance: Wishlist;
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

  static getInstance(database: string): Wishlist {
    if (!Wishlist.instance) {
      Wishlist.instance = new Wishlist(database);
    }
    return Wishlist.instance;
  }

  async selectByUserAndProduct(
    userID: string | number,
    productID: string | number
  ) {
    return this.repo.selectByUserAndProduct(userID, productID);
  }

  async addProductToWishList(
    userID: string | number,
    productID: string | number
  ) {
    return this.repo.addProductToWishList(userID, productID);
  }

  async getWishListByUserID(userID: string | number) {
    return this.repo.getWishListByUserID(userID);
  }

  async selectFromWishListByID(wishListID: string | number) {
    return this.repo.selectFromWishListByID(wishListID);
  }

  async deleteFromWishList(wishListID: string | number) {
    return this.repo.deleteFromWishList(wishListID);
  }
}
