import { sequelize } from "@/lib/Database/db";
import { DataTypes, QueryTypes } from "sequelize";

export const selectByUserAndProduct=async(userID:number,productID:number)=>{
    return await sequelize.query('SELECT * FROM WishLists WHERE userID=? and productID=?',{
        replacements:[userID,productID],
        type:QueryTypes.SELECT
    })
}

export const addProductToWishList=async(userID:number,productID:number)=>{
    return await sequelize.query('Insert INTO WishLists (userID,productID) VALUES (?,?)',{
        replacements:[userID,productID],
        type:QueryTypes.INSERT
    })
}


export const getWishListByUserID = async (userID: number) => {
    return await sequelize.query(
      `
        SELECT 
        wl.*, p.*, br.*,u.*
      FROM WishLists wl
      JOIN Products p ON wl.productID = p.productID
      JOIN Brands br ON p.brandID = br.brandID
      JOIN Users u ON u.userID = wl.userID
      WHERE wl.userID = ?
      `,
      {
        replacements: [userID],
        type: QueryTypes.SELECT,
      }
    );
  };
  

export const selectFromWishListByID=async(wishListID:number)=>{
    return await sequelize.query('SELECT * FROM WishLists WHERE WishListID=?',{
        replacements:[wishListID],
        type:QueryTypes.SELECT
    })
}

export const deleteFromWishList=async(wishListID:number)=>{
    return await sequelize.query('DELETE FROM WishLists WHERE WishListID=?',{
        replacements:[wishListID],
        type:QueryTypes.DELETE
    })
}