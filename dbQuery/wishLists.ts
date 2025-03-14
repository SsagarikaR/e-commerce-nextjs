import Wishlist from "@/lib/database/models/wishList";
import Product from "@/lib/database/models/product";
import Brand from "@/lib/database/models/brand";
import Category from "@/lib/database/models/category";
import User from "@/lib/database/models/user";

// Select wishlist by user and product
export const selectByUserAndProduct = async (
  userId: string,
  productId: string
) => {
  return await Wishlist.findOne({ userId, productId });
};

// Add product to wishlist
export const addProductToWishList = async (
  userId: string,
  productId: string
) => {
  const wishlist = new Wishlist({
    userId,
    productId: productId,
  });

  return await wishlist.save();
};

// Get all items in the user's wishlist, populated with product, brand, and category data
export const getWishListByUserId = async (userId: string) => {
  return await Wishlist.find({ userId })
    .populate({
      path: "productId",
      model: Product,
      populate: [
        {
          path: "brandId",
          model: Brand,
        },
        {
          path: "categoryId",
          model: Category,
        },
      ],
    })
    .populate({ path: "userId", model: User });
};

// Select a specific wishlist item by ID
export const selectFromWishListById = async (wishListId: string) => {
  return await Wishlist.findById({ _id: wishListId });
};

// Delete a specific wishlist item by ID
export const deleteFromWishList = async (wishListId: string) => {
  return await Wishlist.deleteOne({ _id: wishListId });
};
