import { sequelize } from "@/lib/db";
import { DataTypes } from "sequelize";
import { Categories } from "./category";
// import { Brands } from "./";

export const Produtcs=sequelize.define("Products",{
    productID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    productName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    productDescription:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    productThumbnail:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    productPrice:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    categoryID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Categories,
            key:"categoryID"
        },
        onDelete:'CASCADE'
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    brandID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Brands,
            key:"brandID"
        },
        onDelete:'CASCADE'
    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:'0'
    }
},
{
    timestamps:false
})

// console.log(Produtcs===sequelize.model("Products"));