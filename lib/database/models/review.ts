import mongoose, { Schema, model, models } from "mongoose";

export const reviewSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const Review = models.Review || model("Review", reviewSchema);
console.log(models, "model");
export default Review;
