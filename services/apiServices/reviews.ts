import {
  addNewReview,
  selectByReviewID,
  selectReviewOfProduct,
  deleteReview,
  updateReview,
  calculateAverageRating,
  updateProductRating,
} from "@/dbQuery/review";

// Service function to add a new review
export const addReviewService = async (
  userId: string,
  productId: string,
  rating: number,
  description: string
) => {
  try {
    await addNewReview(userId, productId, rating, description);

    const avgRating = await calculateAverageRating(productId);
    console.log(avgRating, "avg rating");
    await updateProductRating(productId, avgRating);

    return { success: true, message: "Thank you for adding a review!" };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while adding the review.");
  }
};

// Service function to get all reviews for a product
export const getReviewsOfProductService = async (productId: string) => {
  try {
    const reviews = await selectReviewOfProduct(productId);
    // console.log(reviews, "reviews....");
    if (reviews.length === 0) {
      return { success: false, message: "No reviews found." };
    }
    return { success: true, reviews };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching reviews.");
  }
};

// Service function to update a review
export const updateReviewService = async (
  userId: string,
  reviewId: string,
  rating: number,
  description: string
) => {
  try {
    const reviewExist = await selectByReviewID(reviewId);
    if (reviewExist.length === 0) {
      return { success: false, message: "No review found for this review ID." };
    }

    await updateReview(userId, reviewId, rating, description);
    return { success: true, message: "Review updated successfully!" };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the review.");
  }
};

// Service function to delete a review
export const deleteReviewService = async (userId: string, reviewId: string) => {
  try {
    const reviewExist = await selectByReviewID(reviewId);
    if (reviewExist.length === 0) {
      return { success: false, message: "No review found for this review ID." };
    }

    await deleteReview(userId, reviewId);
    return { success: true, message: "Review deleted successfully!" };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the review.");
  }
};
