import { create } from "zustand";
import {
  authorizedPostRequest,
  authorizedDeleteRequest,
  authorizedGetRequest,
  authorizedPatchRequest,
} from "@/services/apiReqServices/authorizedRequest";

// Fetch cart items from the backend
export const fetchCartItemsFromBackend = async () => {
  try {
    const response = await authorizedGetRequest("cart");
    // console.log(response, "cart response");
    return response;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  fetchCartItems: async () => {
    const cartItems = await fetchCartItemsFromBackend();
    set({ cartItems });
  },

  // Add an item to the cart
  addItemToCart: (productID, quantity) => {
    authorizedPostRequest("cart", { productID, quantity })
      .then((response) => {
        if (response.status === 200) {
          fetchCartItemsFromBackend().then((updatedCartItems) => {
            set({ cartItems: updatedCartItems });
          });
        }
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  },

  // Remove an item from the cart
  removeItemFromCart: (cartItemID) => {
    authorizedDeleteRequest("cart", { cartItemID })
      .then((response) => {
        if (response.status === 200) {
          fetchCartItemsFromBackend().then((updatedCartItems) => {
            set({ cartItems: updatedCartItems });
          });
        }
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  },

  // Update the quantity of an item in the cart
  updateCartItemQuantity: (cartItemID, quantity) => {
    authorizedPatchRequest("cart", { cartItemID, quantity })
      .then((response) => {
        if ((response.status = 200)) {
          fetchCartItemsFromBackend().then((updatedCartItems) => {
            set({ cartItems: updatedCartItems });
          });
        }
      })
      .catch((error) => {
        console.error("Error updating cart item:", error);
      });
  },
}));
