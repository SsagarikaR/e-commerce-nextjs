import { sequelize } from "@/lib/Database/db";
import { QueryTypes } from "sequelize";


export const selectPrefernceByProductANDUser=async(productID:number,userID:number)=>{
    return await sequelize.query(
        `SELECT * FROM Preferences WHERE productID = :productID AND userID = :userID`,
        {
          replacements: { productID:productID, userID:userID },
          type:QueryTypes.SELECT,
        }
      );
}

export const insertPrefernce=async(productID:number,userID:number)=>{
    return await sequelize.query(
        `INSERT INTO Preferences (productID, userID) VALUES (:productID, :userID)`,
        {
          replacements: { productID, userID },
          type:QueryTypes.INSERT,
        }
      );
}

export const deletePreference=async(preferenceID:number)=>{
    return  await sequelize.query(
        `DELETE FROM Preferences WHERE preferenceID = :preferenceID`,
        {
          replacements: { preferenceID },
          type:QueryTypes.DELETE
        }
      );
}

export const updatePreference=async(productID:number, userID:number, preferenceID:number)=>{
    return await sequelize.query(
        `UPDATE Preferences 
         SET productID = :productID, userID = :userID 
         WHERE preferenceID = :preferenceID`,
        {
          replacements: { productID, userID, preferenceID },
          type: QueryTypes.UPDATE
        }
      );
}

export const fetchPreference=async(userID:number)=>{
    // console.log(userID,"got2")
    return await sequelize.query(
        `SELECT p.preferenceID, p.productID, p.userID, 
        pr.productName, pr.productDescription,pr.productThumbnail,pr.productPrice, 
        b.brandName, b.brandThumbnail
         FROM Preferences p
         JOIN Products pr ON pr.productID = p.productID
         JOIN Brands b ON b.brandID = pr.brandID
         WHERE p.userID = ? LIMIT 8`,  // Filter by userID
        {
          replacements: [ userID ],
          type:QueryTypes.SELECT
        }
      );
}