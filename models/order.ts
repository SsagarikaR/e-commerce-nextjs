import { DataTypes } from "sequelize";
import { sequelize } from "@/lib/db";

export const Orders = sequelize.define("Orders", {
  orderID:
   { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    autoIncrement: true,
    primaryKey: true 
  },
  userId:
   { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  totalAmount:
   { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  status: 
  { 
    type: DataTypes.ENUM('Pending', 'Success', 'Cancelled'),
    defaultValue: 'Pending' 
  },
  address: 
  { 
    type: DataTypes.STRING, 
    allowNull: false
  }
},{
    timestamps:false
});
