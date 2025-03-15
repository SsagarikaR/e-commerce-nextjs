import { invalidateCache } from "../../lib/helpers/cacheHelper";

import { Product } from "@/repository/repoFunction/product";

const productRepo = Product.getInstance(process.env.DATABASE!);

// Service to create a new product
export const createProductService = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryID: string,
  brandID: string,
  stock: number,
  productImages: Array<string>
) => {
  // Check if product already exists
  const isProductExist = await productRepo.selectProductWithAllMatch(
    productName,
    productDescription,
    productPrice,
    categoryID,
    brandID
  );
  if (isProductExist.length > 0) {
    throw new Error("This product already exists.");
  }

  const newProduct = await productRepo.createNewProduct(
    productName,
    productDescription,
    productThumbnail,
    productPrice,
    categoryID,
    brandID,
    stock,
    productImages
  );
  console.log(newProduct);
  if (newProduct) {
    // After product creation, clear the cache for affected product lists
    const cacheKey = `products:${JSON.stringify({ categoryID })}:page:1:limit:20`;
    invalidateCache(cacheKey);

    return { success: true, message: "Successfully added the product." };
  } else {
    throw new Error("Error in adding a new product.");
  }
};

// Service to fetch products with condition (filters), including caching logic
export const getProductsService = async (
  filters: {
    categoryID?: string;
    name?: string;
    id?: string;
    price?: "low-to-high" | "high-to-low";
  },
  page: number,
  limit: number
) => {
  const products = await productRepo.getProductWithCondition(
    filters,
    page,
    limit
  );
  if (!products) {
    throw new Error("No products found.");
  }
  return products;
};

// Service to delete a product
export const deleteProductService = async (_id: string) => {
  const isProductExist = await productRepo.selectByProductID(_id);
  if (!isProductExist) {
    throw new Error("This product doesn't exist.");
  }

  // Delete the product from the database
  await productRepo.deleteByProductID(_id);

  // After deleting, invalidate the cache for affected product lists
  const cacheKey = `products:${JSON.stringify({ id: _id })}:page:1:limit:20`;
  invalidateCache(cacheKey);

  return { success: true, message: "Successfully deleted the product" };
};

// Service to update a product
export const updateProductService = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryID: string,
  _id: string
) => {
  const isProductExist = await productRepo.selectByProductID(_id);
  if (!isProductExist) {
    throw new Error("This product doesn't exist.");
  }

  await productRepo.updateProduct(
    productName,
    productDescription,
    productThumbnail,
    productPrice,
    categoryID,
    _id
  );

  const cacheKey = `products:${JSON.stringify({ categoryID })}:page:1:limit:20`;
  invalidateCache(cacheKey);

  return { success: true, message: "Successfully updated the product." };
};
