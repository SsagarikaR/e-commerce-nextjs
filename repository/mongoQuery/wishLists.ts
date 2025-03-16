import Wishlist from "@/database/mongo-models/wishList";
import Product from "@/database/mongo-models/product";
import Brand from "@/database/mongo-models/brand";
import Category from "@/database/mongo-models/category";
import User from "@/database/mongo-models/user";

// Select wishlist by user and product
export const selectByUserAndProduct = async (
  userID: string | number,
  productID: string | number
) => {
  return await Wishlist.findOne({ userID, productID });
};

// Add product to wishlist
export const addProductToWishList = async (
  userID: string | number,
  productID: string | number
) => {
  const wishlist = new Wishlist({
    userID,
    productID,
  });

  return await wishlist.save();
};

// Get all items in the user's wishlist, populated with product, brand, and category data
export const getWishListByUserID = async (userID: string) => {
  return await Wishlist.find({ userID })
    .populate({
      path: "productID",
      model: Product,
      populate: [
        { path: "brandID", model: Brand },
        { path: "categoryID", model: Category },
      ],
    })
    .populate({ path: "userID", model: User })
    .lean(); // Convert Mongoose documents to plain objects
};

// Select a specific wishlist item by ID
export const selectFromWishListByID = async (wishListID: string | number) => {
  return await Wishlist.findById({ _id: wishListID });
};

// Delete a specific wishlist item by ID
export const deleteFromWishList = async (wishListID: string | number) => {
  return await Wishlist.deleteOne({ _id: wishListID });
};
