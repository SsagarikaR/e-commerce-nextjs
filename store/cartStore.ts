import { create } from 'zustand';
import { authorizedPostRequest, authorizedDeleteRequest, authorizedGetRequest, authorizedPatchRequest } from "@/services/reqServices/authorizedRequest";

// Fetch cart items from the backend
export const fetchCartItemsFromBackend = async () => {
  try {
    const response = await authorizedGetRequest('cart');
    return response; // Return the fetched cart items
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};




export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],

  // Fetch the latest cart items from the backend
  fetchCartItems: async () => {
    const cartItems = await fetchCartItemsFromBackend();
    set({ cartItems }); // Update the state with the fetched data
  },

  // Add an item to the cart
  addItemToCart: (productID, quantity) => {
    // Perform async request outside set
    authorizedPostRequest('cart', { productID, quantity })
      .then((response) => {
        if (response.status===200) {
          // Fetch updated cart items after adding an item
          fetchCartItemsFromBackend().then((updatedCartItems) => {
            set({ cartItems: updatedCartItems });
          });
        }
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  },

  // Remove an item from the cart
  removeItemFromCart: (cartItemID) => {
    // Perform async request outside set
    authorizedDeleteRequest('cart', { cartItemID })
      .then((response) => {
        if (response.status===200) {
          // Fetch updated cart items after removing an item
          fetchCartItemsFromBackend().then((updatedCartItems) => {
            set({ cartItems: updatedCartItems });
          });
        }
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  },

  // Update the quantity of an item in the cart
  updateCartItemQuantity: (cartItemID, quantity) => {
    // Perform async request outside set
    authorizedPatchRequest('cart', { cartItemID, quantity })
      .then((response) => {
        if (response.status=200) {
          // Fetch updated cart items after updating an item
          fetchCartItemsFromBackend().then((updatedCartItems) => {
            set({ cartItems: updatedCartItems });
          });
        }
      })
      .catch((error) => {
        console.error('Error updating cart item:', error);
      });
  },
}));
