import { 
    selectReviewByProductAndUser, 
    addNewReview, 
    selectByReviewID, 
    selectReviewOfProduct, 
    deleteReview, 
    updateReview ,
    calculateAverageRating,updateProductRating
  } from "@/dbQuery/reviews";
  import { sequelize } from "@/lib/db";

  
// Service function to add a new review
export const addReviewService = async (userID: number, productID: number, rating: number, description: string) => {
  const t = await sequelize.transaction(); 

  try {
    const isAlreadyExist = await selectReviewByProductAndUser(userID, productID);
    if (isAlreadyExist.length > 0) {
      return { success: false, message: "You have already added a review for this product." };
    }

    await addNewReview(userID, productID, rating, description, t);

    const avgRating = await calculateAverageRating(productID, t);

    await updateProductRating(productID, avgRating, t);

    await t.commit();

    return { success: true, message: "Thank you for adding a review!" };
  } catch (error) {
    await t.rollback();
    throw new Error("An error occurred while adding the review.");
  }
};

  



  // Service function to get all reviews for a product
  export const getReviewsOfProductService = async (productID: number) => {
    try {
      const reviews = await selectReviewOfProduct(productID);
      if (reviews.length === 0) {
        return { success: false, message: "No reviews found." };
      }
      return { success: true, reviews };
    } catch (error) {
      throw new Error("An error occurred while fetching reviews.");
    }
  };
  




  // Service function to update a review
  export const updateReviewService = async (userID: number, reviewID: number, rating: number, description: string) => {
    try {
      const reviewExist = await selectByReviewID(reviewID);
      if (reviewExist.length === 0) {
        return { success: false, message: "No review found for this review ID." };
      }
  
      await updateReview(userID, reviewID, rating, description);
      return { success: true, message: "Review updated successfully!" };
    } catch (error) {
      throw new Error("An error occurred while updating the review.");
    }
  };
  



  // Service function to delete a review
  export const deleteReviewService = async (userID: number, reviewID: number) => {
    try {
      const reviewExist = await selectByReviewID(reviewID);
      if (reviewExist.length === 0) {
        return { success: false, message: "No review found for this review ID." };
      }
  
      await deleteReview(userID, reviewID);
      return { success: true, message: "Review deleted successfully!" };
    } catch (error) {
      throw new Error("An error occurred while deleting the review.");
    }
  };