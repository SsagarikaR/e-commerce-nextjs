import mongoose from "mongoose";

// Define the brand schema
const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    brandThumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

// Avoid re-registering the schema if it's already registered
const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema);

export default Brand;
