import {
  insertOrder,
  insertOrderItems,
  selectOrderByUserID,
  updateOrderStatusQuery,
  deleteOrderQuery,
  updateOrderAddressQuery,
  getOrderStatusByIdQuery,
  getUserOrderDetails,
} from "@/repository/mongoQuery/orders";
import { Address } from "@/repository/repoFunction/address";

const addressRepo = Address.getInstance(process.env.DATABASE!);

//create a new order
export const createOrderService = async (
  userID: string,
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
    const existingOrder = await selectOrderByUserID(userID);
    let addressID: string;
    const existingAddress: address = await addressRepo.selectAddress(
      state,
      city,
      pincode,
      locality,
      address
    );
    if (existingAddress) {
      addressID = existingAddress._id;
    } else {
      const result = await addressRepo.createNewAddress(
        state,
        city,
        pincode,
        locality,
        address
      );
      addressID = result._id;
    }

    if (existingOrder.length > 0) {
      // console.log("You already have a pending order")
      return { success: false, message: "You already have a pending order." };
    }

    const result = await insertOrder(
      userID,
      totalPrice,
      addressID,
      totalAmount
    );
    console.log(result, "order id .........");
    console.log(items, "result");
    if (result) {
      for (const item of items) {
        await insertOrderItems(
          result.orderID,
          item.productID,
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

export const fetchOrders = async (userID: string) => {
  try {
    const orders = await getUserOrderDetails(userID);
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
  orderID: string,
  newAddress: string
) => {
  try {
    const result = await updateOrderAddressQuery(orderID, newAddress);
    return result;
  } catch (error) {
    console.error("Error in service:", error);
    throw new Error("Error while updating product address");
  }
};

export const deleteOrderService = async (orderID: string) => {
  try {
    const result = await deleteOrderQuery(orderID);
    return result;
  } catch (error) {
    console.error("Error in service:", error);
    throw new Error("Error while deleting the order");
  }
};

export const updateOrderStatusService = async (
  orderID: string,
  status: string
) => {
  try {
    const result = await updateOrderStatusQuery(orderID, status);
    return result;
  } catch (error) {
    console.error("Error in service:", error);
    throw new Error("Error while updating order status");
  }
};

export const getOrderStatusById = async (orderID: string) => {
  try {
    const result = await getOrderStatusByIdQuery(orderID);
    return result;
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw new Error("Error fetching order status");
  }
};
