import mongoose from "mongoose";

// Define the category schema
const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryThumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

// Create the model
const Category = mongoose.model("Category", categorySchema);

export default Category;
