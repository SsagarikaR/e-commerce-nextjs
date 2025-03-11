import Product from "@/lib/database/models/product"; // Import the product model
import Category from "@/lib/database/models/category"; // Import the category model (if needed)
import Brand from "@/lib/database/models/brand"; // Import the brand model (if needed)

export const selectProductWithAllMatch = async (
  productName: string,
  productDescription: string,
  productPrice: number,
  categoryID: string,
  brandID: string
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
  categoryID: string,
  productID: string
) => {
  return await Product.findByIdAndUpdate(
    productID,
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

export const deleteByProductID = async (productID: string) => {
  return await Product.findByIdAndDelete(productID).exec();
};

export const selectByProductID = async (productID: string) => {
  return await Product.findById(productID).exec();
};

export const createNewProduct = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryID: string,
  brandID: string,
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
    productImages,
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
    categoryID?: string;
    name?: string;
    id?: string;
    price?: "low-to-high" | "high-to-low";
  },
  page: number,
  limit: number
) => {
  // Build the query filter
  const filter: any = {};

  if (categoryID) filter.categoryID = categoryID;
  if (name) filter.productName = { $regex: name, $options: "i" }; // Case-insensitive search
  if (id) filter._id = id;

  // Build the sorting object
  const sort: any = {};
  if (price === "low-to-high") {
    sort.productPrice = 1;
  } else if (price === "high-to-low") {
    sort.productPrice = -1;
  }

  // Pagination logic
  const skip = (page - 1) * limit;

  // Query the products with the conditions and sorting
  const products = await Product.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .exec();

  // Count the total number of matching products
  const totalCount = await Product.countDocuments(filter).exec();

  // Add the total count to the result
  return {
    products,
    totalCount,
  };
};
