import mongoose, { Schema, model, models } from "mongoose";

export const cartItemSchema = new Schema(
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
    handlingPrice: {
      type: Number,
      required: true,
      default: "10",
    },
    platformFee: {
      type: Number,
      required: true,
      default: "6",
    },
    deliveryCharge: {
      type: Number,
      required: true,
      default: "10",
    },
    quantity: {
      type: Number,
      required: true,
      default: "1",
    },
  },
  {
    timestamps: false,
  }
);

const cartItem = models.cartItem || model("cartItem", cartItemSchema);
console.log(models, "model");
export default cartItem;
