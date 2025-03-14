import {
  selectByUserAndProduct,
  addProductToWishList,
  getWishListByUserId,
  selectFromWishListById,
  deleteFromWishList,
} from "@/dbQuery/wishLists";

// Service to add a product to the wishlist
export const addProductToWishListService = async (
  userId: string,
  productId: string
) => {
  const existingItem = await selectByUserAndProduct(userId, productId);
  if (existingItem) {
    return {
      success: false,
      message: "Product already exists in the wishlist.",
    };
  }

  const result = await addProductToWishList(userId, productId);
  if (result) {
    return { success: true, message: "Product added to wishlist." };
  }
  return { success: false, message: "Failed to add product to wishlist." };
};

// Service to get all wishlist items for a user
export const getWishListByUserService = async (userId: string) => {
  const wishlist = await getWishListByUserId(userId);
  if (wishlist.length === 0) {
    return {
      success: false,
      message: "This product doesn't exista in wishlist.",
    };
  }
  return { success: true, wishlist };
};

// Service to get a specific wishlist item by user and product id
export const getWishListItemByIDService = async (
  userId: string,
  productId: string
) => {
  const wishlistItem = await selectByUserAndProduct(userId, productId);
  console.log(wishlistItem, "why why");
  if (!wishlistItem) {
    return { success: false, message: "Wishlist item not found." };
  }
  return { success: true, wishlistItem };
};

// Service to remove an item from the wishlist
export const deleteFromWishListService = async (wishListId: string) => {
  const wishlistItem = await selectFromWishListById(wishListId);
  if (!wishlistItem) {
    return { success: false, message: "Wishlist item not found." };
  }
  await deleteFromWishList(wishListId);
  return { success: true, message: "Product removed from wishlist." };
};
