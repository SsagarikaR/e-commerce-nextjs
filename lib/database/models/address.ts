import { Schema, model, models } from "mongoose";

const addressSchema = new Schema(
  {
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const Address = models.Address || model("Address", addressSchema);
export default Address;
