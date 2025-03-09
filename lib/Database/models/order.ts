import { DataTypes } from "sequelize";
import { sequelize } from "@/lib/Database/db";
import { Address } from "./address";

export const Orders = sequelize.define(
  "Orders",
  {
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("Pending", "Success", "Cancelled"),
      defaultValue: "Pending",
    },
    addressID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Address,
        key: "addressID",
      },
      onDelete: "CASCADE",
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    handlingPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "10",
    },
    platformFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "6",
    },
    deliveryCharge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "10",
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
