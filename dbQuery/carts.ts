import { sequelize } from "@/lib/db";
import { QueryTypes } from "sequelize";

export const selectFromCartByUserANDProduct=async(userID:number,productID:number)=>{
    return await sequelize.query(
        "SELECT * FROM CartItems WHERE userID = ? AND productID = ?",
        {
          replacements: [userID, productID],
          type: QueryTypes.SELECT,
        }
      );
  
}

export const updateQuantityIfAlreadyExist=async(userID:number, productID:number)=>{
    return await sequelize.query(
        "UPDATE CartItems SET quantity = quantity + 1 WHERE userID = :userID AND productID = :productID",
        {
          replacements: { userID, productID },
          type: QueryTypes.UPDATE,
        }
      );
}

export const  addNewCartItem=async(userID:number, productID:number, quantity:number)=>{
    return await  sequelize.query(
        "INSERT INTO CartItems (userID, productID, quantity) VALUES (:userID, :productID, :quantity)",
        {
          replacements: { userID, productID, quantity: quantity || 1 },
          type: QueryTypes.INSERT,
        }
      );
}

export const getCartByUserID=async(userID:number)=>{
    return await sequelize.query(
          `
            SELECT ci.*, p.*, c.*,br.*,
            (SELECT SUM(ci2.quantity * p2.productPrice) 
            FROM CartItems ci2 
            JOIN Products p2 ON ci2.productID = p2.productID 
            WHERE ci2.userID = ?) AS totalPrice
            FROM CartItems ci
            JOIN Products p ON ci.productID = p.productID
            JOIN Categories c ON p.categoryID = c.categoryID
            JOIN Brands br ON br.brandID = p.brandID
            WHERE ci.userID = ? 
          `,
          {
            replacements: [userID, userID],
            type: QueryTypes.SELECT,
          }
        );
}

export const selectFromCartItemCartID=async(cartItemID:number)=>{
    return await sequelize.query(
      "SELECT * FROM CartItems WHERE cartItemID = ?",
      {
        replacements: [cartItemID],
        type: QueryTypes.SELECT,
      }
    );

}

export const deleteFromCart=async(cartItemID:number)=>{
    return await sequelize.query(
      "DELETE FROM CartItems WHERE cartItemID = :cartItemID",
      {
        replacements: { cartItemID },
        type: QueryTypes.DELETE,
      }
    );
}

export const updateCartItemsQuantity=async(quantity:number,cartItemID:number)=>{
  console.log(quantity);
    return await sequelize.query(
      "UPDATE CartItems SET quantity =? WHERE cartItemID =?",
      {
        replacements: [ quantity, cartItemID ],
        type: QueryTypes.UPDATE,
      }
    );
}