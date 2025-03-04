import { DataTypes } from "sequelize";
import { sequelize } from "@/lib/Database/db";
import { Produtcs } from "./product";
import { Users } from "./user";

export const Reviews=sequelize.define("Reviews",{
    reviewID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    productID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Produtcs,
            key:"productID"
        }
    },
    userID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Users,
            key:"userID"
        }
    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    }
},{
    timestamps:false
});