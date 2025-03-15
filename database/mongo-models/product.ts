import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productThumbnail: {
    type: String,
    required: true,
  },
  productImage1: {
    type: String,
    required: true,
  },
  productImage2: {
    type: String,
    required: true,
  },
  productImage3: {
    type: String,
    required: false,
  },
  productImage4: {
    type: String,
    required: false,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brandID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Product = models.Product || model("Product", productSchema);
console.log(models, "model");
export default Product;
