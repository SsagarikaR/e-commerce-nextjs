import mongoose, { Schema, model, models } from "mongoose";

export const orderItemSchema = new Schema(
  {
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const OrderItem = models.OrderItem || model("OrderItem", orderItemSchema);
export default OrderItem;
