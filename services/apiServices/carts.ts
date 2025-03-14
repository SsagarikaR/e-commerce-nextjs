import {
  selectFromCartByUserANDProduct,
  addNewCartItem,
  getCartByUserID,
  selectFromCartItemCartID,
  deleteFromCart,
  updateCartItemsQuantity,
  updateQuantityIfAlreadyExist,
} from "@/dbQuery/cart";

// Service to add an item to the cart
export const addCartItemService = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  try {
    // Check if the product already exists in the cart
    const existingCartItem = await selectFromCartByUserANDProduct(
      userId,
      productId
    );
    if (existingCartItem) {
      await updateQuantityIfAlreadyExist(userId, productId);
      return { success: true, message: "Product quantity updated in cart" };
    }

    // Add new item to the cart
    const result = await addNewCartItem(userId, productId, quantity);
    return {
      success: true,
      message: "Product added to cart",
      cartItemId: result._id,
    };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while adding the item to the cart");
  }
};

// Service to get all cart items by user
export const getCartItemsService = async (userId: string) => {
  try {
    const cartItems = await getCartByUserID(userId);
    // console.log(cartItems, "cart item");
    return { success: true, cartItems };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the cart items");
  }
};

// Service to delete an item from the cart
export const deleteCartItemService = async (cartItemId: string) => {
  try {
    const cartItem = await selectFromCartItemCartID(cartItemId);
    if (!cartItem) {
      return { success: false, message: "Cart item not found" };
    }

    await deleteFromCart(cartItemId);
    return { success: true, message: "Cart item deleted successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the cart item");
  }
};

// Service to update the quantity of an item in the cart
export const updateCartItemQuantityService = async (
  quantity: number,
  cartItemId: string
) => {
  try {
    const cartItem = await selectFromCartItemCartID(cartItemId);
    if (!cartItem) {
      return { success: false, message: "Cart item not found" };
    }

    await updateCartItemsQuantity(quantity, cartItemId);
    return {
      success: true,
      message: "Cart item quantity updated successfully",
    };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the cart item quantity");
  }
};
