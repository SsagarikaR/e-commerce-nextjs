import { Transaction } from "sequelize";
import * as mongoQuery from "../mongoQuery/orders";
import * as mysqlQuery from "../mysqlQuery/orders";

export class Orders {
  private static instance: Orders;
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

  static getInstance(database: string): Orders {
    if (!Orders.instance) {
      Orders.instance = new Orders(database);
    }
    return Orders.instance;
  }

  async insertOrder(
    userID: string | number,
    totalPrice: number,
    addressID: string | number,
    totalAmount: number,
    transaction?: Transaction
  ) {
    return this.repo.insertOrder(
      userID,
      totalPrice,
      addressID,
      totalAmount,
      transaction
    );
  }

  async insertOrderItems(
    orderID: string | number,
    productID: string | number,
    quantity: number,
    price: number,
    transaction?: Transaction
  ) {
    return this.repo.insertOrderItems(
      orderID,
      productID,
      quantity,
      price,
      transaction
    );
  }

  async selectOrderByUserID(
    userID: string | number,
    transaction?: Transaction
  ) {
    return this.repo.selectOrderByUserID(userID, transaction);
  }

  async updateOrderStatusQuery(orderId: number | string, status: string) {
    return this.repo.updateOrderStatusQuery(orderId, status);
  }

  async deleteOrderQuery(orderId: number | string) {
    return this.repo.deleteOrderQuery(orderId);
  }

  async updateOrderAddressQuery(orderID: string | number, newAddress: string) {
    return this.repo.updateOrderAddressQuery(orderID, newAddress);
  }

  async getOrderStatusByIdQuery(orderId: number | string) {
    return this.repo.getOrderStatusByIdQuery(orderId);
  }

  async getUserOrderDetails(userID: number | string) {
    return this.repo.getUserOrderDetails(userID);
  }
}
