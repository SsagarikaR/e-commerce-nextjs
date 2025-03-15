import mongoose, { Schema, model, models } from "mongoose";

export const orderItemSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    productId: {
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
