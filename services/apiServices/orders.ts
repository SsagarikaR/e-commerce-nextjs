import {
  insertOrder,
  insertOrderItems,
  selectOrderByUserID,
  updateOrderStatusQuery,
  deleteOrderQuery,
  updateOrderAddressQuery,
  getOrderStatusByIdQuery,
  getUserOrderDetails,
} from "@/dbQuery/orders";
import { createNewAddress, selectAddress } from "@/dbQuery/address";

//create a new order
export const createOrderService = async (
  userId: string,
  totalAmount: number,
  items: orderItem[],
  state: string,
  city: string,
  pincode: string,
  locality: string,
  address: string,
  totalPrice: number
) => {
  try {
    const existingOrder = await selectOrderByUserID(userId);
    let addressId: string;
    const existingAddress: address = await selectAddress(
      state,
      city,
      pincode,
      locality,
      address
    );
    if (existingAddress) {
      addressId = existingAddress._id;
    } else {
      const result = await createNewAddress(
        state,
        city,
        pincode,
        locality,
        address
      );
      addressId = result._id;
    }

    if (existingOrder.length > 0) {
      // console.log("You already have a pending order")
      return { success: false, message: "You already have a pending order." };
    }

    const result = await insertOrder(
      userId,
      totalPrice,
      addressId,
      totalAmount
    );
    console.log(result, "order id .........");
    // console.log(result,"result");
    if (result) {
      for (const item of items) {
        await insertOrderItems(
          result.orderId,
          item.productId,
          item.quantity,
          item.price
        );
      }
    }

    return { success: true, result };
  } catch (error) {
    // Rollback the transaction in case of any error
    console.log(error, "error");
    throw new Error("Error while creating order and order items");
  }
};

export const fetchOrders = async (userId: string) => {
  try {
    const orders = await getUserOrderDetails(userId);
    // console.log(orders,"orders")
    return orders;
  } catch (error) {
    console.error(
      "Error fetching orders with product and brand details:",
      error
    );
    throw new Error("Error fetching orders with product and brand details");
  }
};

export const updateOrderAddressService = async (
  orderId: string,
  newAddress: string
) => {
  try {
    const result = await updateOrderAddressQuery(orderId, newAddress);
    return result;
  } catch (error) {
    console.error("Error in service:", error);
    throw new Error("Error while updating product address");
  }
};

export const deleteOrderService = async (orderId: string) => {
  try {
    const result = await deleteOrderQuery(orderId);
    return result;
  } catch (error) {
    console.error("Error in service:", error);
    throw new Error("Error while deleting the order");
  }
};

export const updateOrderStatusService = async (
  orderId: string,
  status: string
) => {
  try {
    const result = await updateOrderStatusQuery(orderId, status);
    return result;
  } catch (error) {
    console.error("Error in service:", error);
    throw new Error("Error while updating order status");
  }
};

export const getOrderStatusById = async (orderId: string) => {
  try {
    const result = await getOrderStatusByIdQuery(orderId);
    return result;
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw new Error("Error fetching order status");
  }
};
