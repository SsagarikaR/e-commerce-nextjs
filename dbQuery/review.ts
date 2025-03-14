import Review from "@/lib/database/models/review";
import Product from "@/lib/database/models/product";
import mongoose from "mongoose";

export const selectReviewByProductAndUser = async (
  userId: string,
  productId: string
) => {
  return await Review.findOne({
    userId,
    productId,
  }).exec();
};

export const addNewReview = async (
  userId: string,
  productId: string,
  rating: number,
  description: string
) => {
  const newReview = new Review({
    userId,
    productId,
    rating: rating,
    description: description,
  });

  return await newReview.save();
};

export const calculateAverageRating = async (productId: string) => {
  // Convert to ObjectId if necessary
  const objectId = new mongoose.Types.ObjectId(productId);

  const result = await Review.aggregate([
    { $match: { productId: objectId } },
    {
      $group: {
        _id: null,
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  return result[0]?.avgRating || 0;
};

export const updateProductRating = async (
  productId: string,
  avgRating: number
) => {
  return await Product.updateOne(
    { _id: productId },
    { $set: { rating: Math.ceil(avgRating) } }
  );
};

export const selectByReviewID = async (reviewId: string) => {
  return await Review.findById(reviewId).exec();
};

export const selectReviewOfProduct = async (productId: string) => {
  const reviews = await Review.find({ productId }).populate("userId");
  console.log(reviews, "Reviews with user details:");
  return reviews;
};

export const deleteReview = async (userId: string, reviewId: string) => {
  return await Review.deleteOne({ userId, _id: reviewId }).exec();
};

export const updateReview = async (
  userId: string,
  reviewId: string,
  rating: number,
  description: string
) => {
  return await Review.updateOne(
    { userId, _id: reviewId },
    { $set: { rating, description } }
  );
};
