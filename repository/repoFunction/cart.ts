import * as mongoQuery from "../mongoQuery/cart";
import * as mysqlQuery from "../mysqlQuery/cart";

export class Cart {
  private static instance: Cart;
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

  static getInstance(database: string): Cart {
    if (!Cart.instance) {
      Cart.instance = new Cart(database);
    }
    return Cart.instance;
  }

  async selectFromCartByUserANDProduct(
    userID: string | number,
    productID: string | number
  ) {
    return this.repo.selectFromCartByUserANDProduct(userID, productID);
  }

  async updateQuantityIfAlreadyExist(
    userID: string | number,
    productID: string | number
  ) {
    return this.repo.updateQuantityIfAlreadyExist(userID, productID);
  }

  async addNewCartItem(
    userID: string | number,
    productID: string | number,
    quantity: number
  ) {
    return this.repo.addNewCartItem(userID, productID, quantity);
  }

  async getCartByUserID(userID: string | number) {
    return this.repo.getCartByUserID(userID);
  }

  async selectFromCartItemCartID(cartItemID: string | number) {
    return this.repo.selectFromCartItemCartID(cartItemID);
  }

  async deleteFromCart(cartItemID: string | number) {
    return this.repo.deleteFromCart(cartItemID);
  }

  async updateCartItemsQuantity(quantity: number, cartItemID: string | number) {
    return this.repo.updateCartItemsQuantity(quantity, cartItemID);
  }
}
