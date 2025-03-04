import { sequelize } from "@/lib/Database/db";
import { DataTypes } from "sequelize";
import { Produtcs } from "./product";
import { Users } from "./user";

export const WishLists=sequelize.define("WishLists",{
    wishListID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    productID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Produtcs,
            key:"productID"
        },
        onDelete:'CASCADE'
    },
    userID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Users,
            key:"userID"
        },
        onDelete:'CASCADE'
    }
},
{
    timestamps:false
})