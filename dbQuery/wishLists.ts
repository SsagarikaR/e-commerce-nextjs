import { sequelize } from "@/lib/db";
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
          wl.wishListID, 
          wl.userID,
          wl.productID, 
          p.productName, 
          p.productThumbnail, 
          p.productPrice,
          br.brandID,
          br.brandThumbnail
        FROM WishLists wl
        JOIN Products p ON wl.productID = p.productID
        JOIN Brands br ON p.brandID = br.brandID
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