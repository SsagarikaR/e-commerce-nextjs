import eslintconfig from"../eslint.config.mjs";
import { DataTypes } from "sequelize";
import { sequelize } from "@/config/db/db";

export const users=sequelize.define("users",{
    userID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contactNo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    timestamps:false
}
)