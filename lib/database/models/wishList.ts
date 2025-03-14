import mongoose, { Schema, model, models } from "mongoose";

export const wishListSchema = new Schema(
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
  },
  {
    timestamps: false,
  }
);

const Wishlist = models.Wishlist || model("Wishlist", wishListSchema);
console.log(models, "model");
export default Wishlist;
