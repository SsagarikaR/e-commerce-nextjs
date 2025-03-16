import Review from "@/database/mongo-models/review";
import Product from "@/database/mongo-models/product";
import mongoose from "mongoose";

export const selectReviewByProductAndUser = async (
  userID: string | number,
  productID: string | number
) => {
  return await Review.findOne({
    userID,
    productID,
  }).exec();
};

export const addNewReview = async (
  userID: string | number,
  productID: string | number,
  rating: number,
  description: string
) => {
  const newReview = new Review({
    userID,
    productID,
    rating: rating,
    description: description,
  });

  return await newReview.save();
};

export const calculateAverageRating = async (productID: string | number) => {
  // Convert to ObjectId if necessary
  const objectId = new mongoose.Types.ObjectId(productID);

  const result = await Review.aggregate([
    { $match: { productID: objectId } },
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
  productID: string | number,
  avgRating: number
) => {
  return await Product.updateOne(
    { _id: productID },
    { $set: { rating: Math.ceil(avgRating) } }
  );
};

export const selectByReviewID = async (reviewID: string | number) => {
  return await Review.findById(reviewID).exec();
};

export const selectReviewOfProduct = async (productID: string | number) => {
  const reviews = await Review.find({ productID }).populate("userID");
  console.log(reviews, "Reviews with user details:");
  return reviews;
};

export const deleteReview = async (
  userID: string | number,
  reviewID: string | number
) => {
  return await Review.deleteOne({ userID, _id: reviewID }).exec();
};

export const updateReview = async (
  userID: string | number,
  reviewID: string | number,
  rating: number,
  description: string
) => {
  return await Review.updateOne(
    { userID, _id: reviewID },
    { $set: { rating, description } }
  );
};
