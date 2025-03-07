import { sequelize } from "@/lib/Database/db";
import { QueryTypes, Transaction } from "sequelize";

export const selectReviewByProductAndUser = async (
  userID: number,
  productID: number
) => {
  return await sequelize.query(
    "SELECT * FROM Reviews WHERE userID=? AND productID=?",
    {
      replacements: [userID, productID],
      type: QueryTypes.SELECT,
    }
  );
};

export const addNewReview = async (
  userID: number,
  productID: number,
  rating: number,
  description: string,
  t: Transaction
) => {
  const result = await sequelize.query(
    `INSERT INTO Reviews (userID, productID, rating, description) 
      VALUES (:userID, :productID, :rating, :description)`,
    {
      replacements: { userID, productID, rating, description },
      type: QueryTypes.INSERT,
      transaction: t,
    }
  );
  return result;
};

export const calculateAverageRating = async (
  productID: number,
  t: Transaction
) => {
  const result: { avgRating: number }[] = await sequelize.query(
    `SELECT AVG(rating) as avgRating FROM Reviews WHERE productID = :productID`,
    {
      replacements: { productID },
      type: QueryTypes.SELECT,
      transaction: t,
    }
  );
  return result[0]?.avgRating || 0; // If no reviews, return 0
};

export const updateProductRating = async (
  productID: number,
  avgRating: number,
  t: Transaction
) => {
  const result = await sequelize.query(
    `UPDATE Products SET rating = :rating WHERE productID = :productID`,
    {
      replacements: { rating: Math.ceil(avgRating), productID },
      type: QueryTypes.UPDATE,
      transaction: t,
    }
  );
  return result;
};

export const selectByReviewID = async (reviewID: number) => {
  return await sequelize.query("SELECT * FROM Reviews WHERE reviewID=?", {
    replacements: [reviewID],
    type: QueryTypes.SELECT,
  });
};

export const selectReviewOfProduct = async (productID: number) => {
  return await sequelize.query(
    `SELECT r.*,u.*
                                FROM Reviews r 
                                JOIN Users u on r.userID=u.userID
                                WHERE  r.productID=?`,
    {
      replacements: [productID],
      type: QueryTypes.SELECT,
    }
  );
};

export const deleteReview = async (userID: number, reviewID: number) => {
  return await sequelize.query(
    "DELETE FROM Reviews WHERE userID=? AND reviewID=?",
    {
      replacements: [userID, reviewID],
      type: QueryTypes.DELETE,
    }
  );
};

export const updateReview = async (
  userID: number,
  reviewID: number,
  rating: number,
  description: string
) => {
  return await sequelize.query(
    "UPDATE Reviews SET rating=? , description=? WHERE userID=? AND reviewID=?",
    {
      replacements: [rating, description, userID, reviewID],
      type: QueryTypes.UPDATE,
    }
  );
};
