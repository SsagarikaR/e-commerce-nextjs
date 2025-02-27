import { selectProductWithAllMatch, createNewProduct, getProductWithCondition, selectByProductID, deleteByProductID, updateProducts } from "@/dbQuery/products";
import { invalidateCache,getCache,setCache } from "../../helpers/cacheHelper";

// Service to create a new product
export const createProductService = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryID: number,
  brandID: number,
  stock: number
) => {
  // Check if product already exists
  const isProductExist = await selectProductWithAllMatch(productName, productDescription, productPrice, categoryID, brandID);
  if (isProductExist.length > 0) {
    throw new Error("This product already exists.");
  }

  const [result, metaData] = await createNewProduct(
    productName,
    productDescription,
    productThumbnail,
    productPrice,
    categoryID,
    brandID,
    stock
  );

  if (metaData > 0) {
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
  filters: { categoryID?: string | number, name?: string, id?: string | number, price?: "low-to-high" | "high-to-low" },
  page: number,
  limit: number
) => {
  const cacheKey = `products:${JSON.stringify(filters)}:page:${page}:limit:${limit}`;
  
  const cachedProducts = getCache(cacheKey);
  if (cachedProducts) {
    return cachedProducts;
  }

  const products = await getProductWithCondition(filters, page, limit);
  if (products.length === 0) {
    throw new Error("No products found.");
  }

  setCache(cacheKey, products);
  
  return products;
};




// Service to delete a product
export const deleteProductService = async (productID: number) => {
  const isProductExist = await selectByProductID(productID);
  if (isProductExist.length === 0) {
    throw new Error("This product doesn't exist.");
  }

  // Delete the product from the database
  await deleteByProductID(productID);

  // After deleting, invalidate the cache for affected product lists
  const cacheKey = `products:${JSON.stringify({ id: productID })}:page:1:limit:20`;
  invalidateCache(cacheKey); 

  return { success: true, message: "Successfully deleted the product" };
};




// Service to update a product
export const updateProductService = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryID: number,
  productID: number
) => {
  const isProductExist = await selectByProductID(productID);
  if (isProductExist.length === 0) {
    throw new Error("This product doesn't exist.");
  }

  await updateProducts(productName, productDescription, productThumbnail, productPrice, categoryID, productID);

  const cacheKey = `products:${JSON.stringify({ categoryID })}:page:1:limit:20`; 
  invalidateCache(cacheKey); 

  return { success: true, message: "Successfully updated the product." };
};