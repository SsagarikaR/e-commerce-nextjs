import { DataTypes } from "sequelize";
import { sequelize } from "@/lib/Database/db";
import { Produtcs } from "./product";
import { Users } from "./user";

export const CartItems = sequelize.define(
  "CartItems",
  {
    cartItemID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produtcs,
        key: "productID",
      },
      onDelete: "CASCADE",
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "userID",
      },
      onDelete: "CASCADE",
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1",
    },
  },
  {
    timestamps: false,
  }
);

// console.log(CartItems===sequelize.model("CartItems"))
