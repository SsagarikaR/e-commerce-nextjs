import mongoose, { Schema, model, models } from "mongoose";

export const preferenceSchema = new Schema(
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

const Preference = models.Preference || model("Preference", preferenceSchema);
console.log(models.preference, "model");
export default Preference;
