import { DataTypes } from "sequelize";
import { sequelize } from "@/lib/Database/db";

export const Brands=sequelize.define("Brands",{
    brandID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    brandName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    brandThumbnail:{
        type:DataTypes.TEXT,
        allowNull:false
    }
},
{
    timestamps:false
})

// console.log(Brands===sequelize.model("Brands"));