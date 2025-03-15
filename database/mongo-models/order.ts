import mongoose, { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Success", "Cancelled"],
      default: "Pending",
    },
    addressID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    handlingPrice: {
      type: Number,
      required: true,
      default: 10,
    },
    platformFee: {
      type: Number,
      required: true,
      default: 6,
    },
    deliveryCharge: {
      type: Number,
      required: true,
      default: 10,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || model("Order", orderSchema);
export default Order;
