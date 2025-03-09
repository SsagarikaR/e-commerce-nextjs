import { sequelize } from "@/lib/Database/db";
import { QueryTypes, Transaction } from "sequelize";

export const createNewAddress = async (
  state: string,
  city: string,
  pincode: string,
  locality: string,
  address: string,
  t: Transaction
) => {
  return await sequelize.query(
    "INSERT INTO Addresses  ( state,city,pincode, locality,address) VALUES (?,?,?,?,?)",
    {
      replacements: [state, city, pincode, locality, address],
      type: QueryTypes.INSERT,
      transaction: t,
    }
  );
};

export const selectAddress = async (
  state: string,
  city: string,
  pincode: string,
  locality: string,
  address: string,
  t: Transaction
): Promise<address[]> => {
  return await sequelize.query(
    "SELECT * FROM Addresses WHERE state = ? AND city = ? AND pincode = ? AND locality = ? AND address = ?",
    {
      replacements: [state, city, pincode, locality, address],
      type: QueryTypes.SELECT,
      transaction: t,
    }
  );
};

export const selectAddressById = async (addressID: number) => {
  return await sequelize.query("SELECT * FROM Addresses WHERE addressID=?", {
    replacements: [addressID],
    type: QueryTypes.SELECT,
  });
};

export const updateAddress = async (
  state: string,
  city: string,
  pincode: string,
  localiy: string,
  address: string,
  t: Transaction
) => {
  return await sequelize.query(
    "UPDATE Addresses SET state=?, city=?, pincode=?, locality=?, address=?",
    {
      replacements: [state, city, pincode, localiy, address],
      type: QueryTypes.UPDATE,
      transaction: t,
    }
  );
};

export const deleteAddressById = async (addressID: number) => {
  return await sequelize.query("DELETE FROM Addresses WHERE addressID = ?", {
    replacements: [addressID],
    type: QueryTypes.DELETE,
  });
};
