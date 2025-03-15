import { Transaction } from "sequelize";
import * as mongoQuery from "../mongoQuery/address";
import * as mysqlQuery from "../mysqlQuery/address";

export class Address {
  private static instance: Address;
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

  static getInstance(database: string): Address {
    if (!Address.instance) {
      Address.instance = new Address(database);
    }
    return Address.instance;
  }

  async createNewAddress(
    state: string,
    city: string,
    pincode: string,
    locality: string,
    address: string,
    t?: Transaction
  ) {
    if (t) {
      return this.repo.createNewAddress(
        state,
        city,
        pincode,
        locality,
        address,
        t
      );
    } else {
      return this.repo.createNewAddress(
        state,
        city,
        pincode,
        locality,
        address
      );
    }
  }

  async selectAddress(
    state: string,
    city: string,
    pincode: string,
    locality: string,
    address: string,
    t?: Transaction
  ) {
    if (t) {
      return this.repo.selectAddress(
        state,
        city,
        pincode,
        locality,
        address,
        t
      );
    } else {
      return this.repo.selectAddress(state, city, pincode, locality, address);
    }
  }

  async selectAddressById(id: number | string) {
    return this.repo.selectAddressById(id);
  }

  async updateAddress(
    addressID: string | number,
    state: string,
    city: string,
    pincode: string,
    locality: string,
    address: string,
    t?: Transaction
  ) {
    if (t) {
      return this.repo.updateAddress(
        addressID,
        state,
        city,
        pincode,
        locality,
        address,
        t
      );
    } else {
      return this.repo.updateAddress(
        addressID,
        state,
        city,
        pincode,
        locality,
        address
      );
    }
  }

  async deleteAddressById(addressID: string | number) {
    return this.repo.deleteAddressById(addressID);
  }
}
