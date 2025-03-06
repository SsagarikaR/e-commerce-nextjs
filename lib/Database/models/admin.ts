import { DataTypes } from "sequelize";
import { sequelize } from "@/lib/Database/db";
import { Users } from "./user";

export const Admins = sequelize.define(
  "Admins",
  {
    adminID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "userID",
      },
    },
  },
  {
    timestamps: false,
  }
);

// console.log(Admins===sequelize.model("Admins"));
