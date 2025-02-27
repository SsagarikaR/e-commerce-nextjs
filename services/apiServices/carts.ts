import {
    selectFromCartByUserANDProduct,
    addNewCartItem,
    getCartByUserID,
    selectFromCartItemCartID,
    deleteFromCart,
    updateCartItemsQuantity,
    updateQuantityIfAlreadyExist,
  } from "@/dbQuery/carts";
  
  // Service to add an item to the cart
  export const addCartItemService = async (userID: number, productID: number, quantity: number) => {
    try {
      // Check if the product already exists in the cart
      const existingCartItem = await selectFromCartByUserANDProduct(userID, productID);
      if (existingCartItem.length > 0) {
        await updateQuantityIfAlreadyExist(userID, productID);
        return { success: true, message: "Product quantity updated in cart" };
      }
  
      // Add new item to the cart
      const result = await addNewCartItem(userID, productID, quantity);
      return { success: true, message: "Product added to cart", cartItemID: result[0] };
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while adding the item to the cart");
    }
  };
  
  // Service to get all cart items by user
  export const getCartItemsService = async (userID: number) => {
    try {
      const cartItems = await getCartByUserID(userID);
      return { success: true, cartItems };
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching the cart items");
    }
  };
  
  // Service to delete an item from the cart
  export const deleteCartItemService = async (cartItemID: number) => {
    try {
      const cartItem = await selectFromCartItemCartID(cartItemID);
      if (cartItem.length === 0) {
        return { success: false, message: "Cart item not found" };
      }
  
      await deleteFromCart(cartItemID);
      return { success: true, message: "Cart item deleted successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while deleting the cart item");
    }
  };
  
  // Service to update the quantity of an item in the cart
  export const updateCartItemQuantityService = async (quantity: number, cartItemID: number) => {
    try {
      const cartItem = await selectFromCartItemCartID(cartItemID);
      if (cartItem.length === 0) {
        return { success: false, message: "Cart item not found" };
      }
  
      await updateCartItemsQuantity(quantity, cartItemID);
      return { success: true, message: "Cart item quantity updated successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while updating the cart item quantity");
    }
  };
  