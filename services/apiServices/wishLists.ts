import {
  selectByUserAndProduct,
  addProductToWishList,
  getWishListByUserID,
  selectFromWishListByID,
  deleteFromWishList,
} from "@/dbQuery/wishLists";

// Service to add a product to the wishlist
export const addProductToWishListService = async (
  userID: number,
  productID: number
) => {
  const existingItem = await selectByUserAndProduct(userID, productID);
  if (existingItem.length !== 0) {
    return {
      success: false,
      message: "Product already exists in the wishlist.",
    };
  }

  const [result] = await addProductToWishList(userID, productID);
  if (result) {
    return { success: true, message: "Product added to wishlist." };
  }
  return { success: false, message: "Failed to add product to wishlist." };
};

// Service to get all wishlist items for a user
export const getWishListByUserService = async (userID: number) => {
  const wishlist = await getWishListByUserID(userID);
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
  userID: number,
  productID: number
) => {
  const wishlistItem = await selectByUserAndProduct(userID, productID);
  console.log(wishlistItem, "why why");
  if (wishlistItem.length === 0) {
    return { success: false, message: "Wishlist item not found." };
  }
  return { success: true, wishlistItem };
};

// Service to remove an item from the wishlist
export const deleteFromWishListService = async (wishListID: number) => {
  const wishlistItem = await selectFromWishListByID(wishListID);
  if (wishlistItem.length === 0) {
    return { success: false, message: "Wishlist item not found." };
  }
  await deleteFromWishList(wishListID);
  return { success: true, message: "Product removed from wishlist." };
};
