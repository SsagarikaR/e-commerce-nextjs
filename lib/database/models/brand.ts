import mongoose from "mongoose";

//define the brand schema
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

// Create the model
const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
