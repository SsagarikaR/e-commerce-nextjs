import { Cart } from "@/repository/repoFunction/cart";

const cartRepo = Cart.getInstance(process.env.DATABASE!);

// Service to add an item to the cart
export const addCartItemService = async (
  userID: string,
  productID: string,
  quantity: number
) => {
  try {
    // Check if the product already exists in the cart
    const existingCartItem = await cartRepo.selectFromCartByUserANDProduct(
      userID,
      productID
    );
    if (process.env.DATABSE === "mongodb") {
      if (existingCartItem) {
        await cartRepo.updateQuantityIfAlreadyExist(userID, productID);
        return { success: true, message: "Product quantity updated in cart" };
      }
    }
    if (process.env.DATABASE === "mysql") {
      if (existingCartItem.length > 0) {
        await cartRepo.updateQuantityIfAlreadyExist(userID, productID);
        return { success: true, message: "Product quantity updated in cart" };
      }
    }

    // Add new item to the cart
    const result = await cartRepo.addNewCartItem(userID, productID, quantity);
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
export const getCartItemsService = async (userID: string) => {
  try {
    const cartItems = await cartRepo.getCartByUserID(userID);
    // console.log(cartItems, "cart item");
    return { success: true, cartItems };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the cart items");
  }
};

// Service to delete an item from the cart
export const deleteCartItemService = async (cartItemID: string) => {
  try {
    const cartItem = await cartRepo.selectFromCartItemCartID(cartItemID);
    if (!cartItem) {
      return { success: false, message: "Cart item not found" };
    }

    await cartRepo.deleteFromCart(cartItemID);
    return { success: true, message: "Cart item deleted successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the cart item");
  }
};

// Service to update the quantity of an item in the cart
export const updateCartItemQuantityService = async (
  quantity: number,
  cartItemID: string
) => {
  try {
    const cartItem = await cartRepo.selectFromCartItemCartID(cartItemID);
    if (!cartItem) {
      return { success: false, message: "Cart item not found" };
    }

    await cartRepo.updateCartItemsQuantity(quantity, cartItemID);
    return {
      success: true,
      message: "Cart item quantity updated successfully",
    };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the cart item quantity");
  }
};
