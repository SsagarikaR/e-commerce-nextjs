import mongoose, { Schema, model, models } from "mongoose";

export const wishListSchema = new Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const Wishlist = models.Wishlist || model("Wishlist", wishListSchema);
console.log(models, "model");
export default Wishlist;
