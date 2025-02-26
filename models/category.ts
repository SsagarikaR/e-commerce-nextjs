import { DataTypes } from "sequelize";
import { sequelize } from "@/lib/db";

export const Categories=sequelize.define("Categories",{
    categoryID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    categoryName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    categoryThumbnail:{
        type:DataTypes.TEXT,
        allowNull:false
    },
},
{
    timestamps:false
})

// console.log(Categories===sequelize.model("Categories"));