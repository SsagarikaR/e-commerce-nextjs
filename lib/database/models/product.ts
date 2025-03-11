import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      allowNull: false,
    },
    productDescription: {
      type: String,
      allowNull: false,
    },
    productThumbnail: {
      type: String,
      allowNull: false,
    },
    productPrice: {
      type: Number,
      allowNull: false,
    },
    stock: {
      type: Number,
      allowNull: false,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brandID: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    rating: {
      type: Number,
      allowNull: false,
      defaultValue: "0",
    },
    productImage1: {
      type: String,
      allowNull: false,
    },
    productImage2: {
      type: String,
      allowNull: false,
    },
    productImage3: {
      type: String,
      allowNull: true,
    },
    productImage4: {
      type: String,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
