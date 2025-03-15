import { Review } from "@/repository/repoFunction/review";

const reviewRepo = Review.getInstance(process.env.DATABASE!);

// Service function to add a new review
export const addReviewService = async (
  userID: string,
  productID: string,
  rating: number,
  description: string
) => {
  try {
    await reviewRepo.addNewReview(userID, productID, rating, description);

    const avgRating = await reviewRepo.calculateAverageRating(productID);
    console.log(avgRating, "avg rating");
    await reviewRepo.updateProductRating(productID, avgRating);

    return { success: true, message: "Thank you for adding a review!" };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while adding the review.");
  }
};

// Service function to get all reviews for a product
export const getReviewsOfProductService = async (productID: string) => {
  try {
    const reviews = await reviewRepo.selectReviewOfProduct(productID);
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
  userID: string,
  reviewID: string,
  rating: number,
  description: string
) => {
  try {
    const reviewExist = await reviewRepo.selectByReviewID(reviewID);
    if (reviewExist.length === 0) {
      return { success: false, message: "No review found for this review ID." };
    }

    await reviewRepo.updateReview(userID, reviewID, rating, description);
    return { success: true, message: "Review updated successfully!" };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the review.");
  }
};

// Service function to delete a review
export const deleteReviewService = async (userID: string, reviewID: string) => {
  try {
    const reviewExist = await reviewRepo.selectByReviewID(reviewID);
    if (reviewExist.length === 0) {
      return { success: false, message: "No review found for this review ID." };
    }

    await reviewRepo.deleteReview(userID, reviewID);
    return { success: true, message: "Review deleted successfully!" };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the review.");
  }
};
