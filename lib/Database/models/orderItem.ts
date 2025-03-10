import { DataTypes } from "sequelize";
import { sequelize } from "@/lib/Database/db";
import { Orders } from "./order";

export const OrderItems = sequelize.define(
  "OrderItems",
  {
    orderItemID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Orders,
        key: "orderID",
      },
      onDelete: "CASCADE",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
