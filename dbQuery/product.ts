import Product from "@/lib/database/models/product"; // Import the product model
import Brand from "@/lib/database/models/brand";
import Category from "@/lib/database/models/category";
console.log(Brand, Category);

export const selectProductWithAllMatch = async (
  productName: string,
  productDescription: string,
  productPrice: number,
  categoryId: string,
  brandId: string
) => {
  return await Product.find({
    productName,
    productDescription,
    productPrice,
    categoryId,
    brandId,
  }).exec();
};

export const updateProduct = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryId: string,
  _id: string
) => {
  return await Product.findByIdAndUpdate(
    _id,
    {
      productName,
      productDescription,
      productThumbnail,
      productPrice,
      categoryId,
    },
    { new: true } // Return the updated document
  ).exec();
};

export const deleteByProductID = async (_id: string) => {
  return await Product.findByIdAndDelete(_id).exec();
};

export const selectByProductID = async (_id: string) => {
  return await Product.findById(_id).exec();
};

export const createNewProduct = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryId: string,
  brandId: string,
  stock: number,
  productImages: Array<string>
) => {
  const newProduct = new Product({
    productName,
    productDescription,
    productThumbnail,
    productPrice,
    categoryId,
    brandId,
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
    categoryId,
    name,
    id,
    price,
  }: {
    categoryId?: string;
    name?: string;
    id?: string;
    price?: "low-to-high" | "high-to-low";
  },

  page: number,
  limit: number
) => {
  console.log(categoryId, "categiry id");
  type ProductFilter = {
    categoryId?: string;
    productName?: { $regex: string; $options: string };
    _id?: string;
  };

  type ProductSort = {
    productPrice?: 1 | -1;
  };

  const filter: ProductFilter = {};

  if (categoryId) filter.categoryId = categoryId;
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
    .populate("brandId", "brandName brandThumbnail")
    .populate("categoryId", "categoryName categoryThumbnail")
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
