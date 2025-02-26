import { DataTypes } from "sequelize";
import { sequelize } from "@/lib/db";
import { Produtcs } from "./product";
import { Users } from "./user";

export const CartItems=sequelize.define("CartItems",{
    cartItemID:{
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
    },
    handlingPrice:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    platformFee:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    deliveryCharge:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
  
},
{
    timestamps:false
})

// console.log(CartItems===sequelize.model("CartItems"))