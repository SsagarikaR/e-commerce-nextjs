import { Wishlist } from "@/repository/repoFunction/wishLists";

const wishlistRepo = Wishlist.getInstance(process.env.DATABASE!);

// Service to add a product to the wishlist
export const addProductToWishListService = async (
  userID: string,
  productID: string
) => {
  const existingItem = await wishlistRepo.selectByUserAndProduct(
    userID,
    productID
  );
  if (existingItem) {
    return {
      success: false,
      message: "Product already exists in the wishlist.",
    };
  }

  const result = await wishlistRepo.addProductToWishList(userID, productID);
  if (result) {
    return { success: true, message: "Product added to wishlist." };
  }
  return { success: false, message: "Failed to add product to wishlist." };
};

// Service to get all wishlist items for a user
export const getWishListByUserService = async (userID: string) => {
  const wishlist = await wishlistRepo.getWishListByUserID(userID);
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
  userID: string,
  productID: string
) => {
  const wishlistItem = await wishlistRepo.selectByUserAndProduct(
    userID,
    productID
  );
  console.log(wishlistItem, "why why");
  if (!wishlistItem) {
    return { success: false, message: "Wishlist item not found." };
  }
  return { success: true, wishlistItem };
};

// Service to remove an item from the wishlist
export const deleteFromWishListService = async (wishListID: string) => {
  const wishlistItem = await wishlistRepo.selectFromWishListByID(wishListID);
  if (!wishlistItem) {
    return { success: false, message: "Wishlist item not found." };
  }
  await wishlistRepo.deleteFromWishList(wishListID);
  return { success: true, message: "Product removed from wishlist." };
};
