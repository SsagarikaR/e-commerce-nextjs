import Product from "@/database/mongo-models/product"; // Import the product model
import Brand from "@/database/mongo-models/brand";
import Category from "@/database/mongo-models/category";
console.log(Brand, Category);

export const selectProductWithAllMatch = async (
  productName: string,
  productDescription: string,
  productPrice: number,
  categoryID: string | number,
  brandID: string | number
) => {
  return await Product.find({
    productName,
    productDescription,
    productPrice,
    categoryID,
    brandID,
  }).exec();
};

export const updateProduct = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryID: string | number,
  _id: string | number
) => {
  return await Product.findByIdAndUpdate(
    _id,
    {
      productName,
      productDescription,
      productThumbnail,
      productPrice,
      categoryID,
    },
    { new: true } // Return the updated document
  ).exec();
};

export const deleteByProductID = async (_id: string | number) => {
  return await Product.findByIdAndDelete(_id).exec();
};

export const selectByProductID = async (_id: string | number) => {
  return await Product.findById(_id).exec();
};

export const createNewProduct = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryID: string | number,
  brandID: string | number,
  stock: number,
  productImages: Array<string>
) => {
  const newProduct = new Product({
    productName,
    productDescription,
    productThumbnail,
    productPrice,
    categoryID,
    brandID,
    stock,
    productImage1: productImages[0],
    productImage2: productImages[1],
    productImage3: productImages[2],
    productImage4: productImages[3],
  });

  return await newProduct.save();
};

export const getProductWithCondition = async (
  {
    categoryID,
    name,
    id,
    price,
  }: {
    categoryID?: string | number;
    name?: string;
    id?: string | number;
    price?: "low-to-high" | "high-to-low";
  },

  page: number,
  limit: number
) => {
  console.log(categoryID, "categiry id");
  type ProductFilter = {
    categoryID?: string | number;
    productName?: { $regex: string; $options: string };
    _id?: string | number;
  };

  type ProductSort = {
    productPrice?: 1 | -1;
  };

  const filter: ProductFilter = {};

  if (categoryID) filter.categoryID = categoryID;
  if (name) filter.productName = { $regex: name, $options: "i" }; // Case-insensitive search
  if (id) filter._id = id;

  const sort: ProductSort = {};
  if (price === "low-to-high") {
    sort.productPrice = 1;
  } else if (price === "high-to-low") {
    sort.productPrice = -1;
  }

  const skip = (page - 1) * limit;
  console.log(filter);

  const products = await Product.find(filter)
    .populate("brandID", "brandName brandThumbnail")
    .populate("categoryID", "categoryName categoryThumbnail")
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .exec();
  console.log(products);

  const totalCount = await Product.countDocuments(filter).exec();

  return {
    products,
    totalCount,
  };
};
