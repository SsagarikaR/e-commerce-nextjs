import Order from "@/database/mongo-models/order"; // Assuming the Order model is imported
import OrderItem from "@/database/mongo-models/orderItem"; // Assuming the OrderItem model is imported
import mongoose from "mongoose";

export const insertOrder = async (
  userID: string,
  totalPrice: number,
  addressID: string,
  totalAmount: number
) => {
  try {
    const newOrder = new Order({
      userID,
      totalPrice: totalPrice,
      status: "Pending",
      addressID,
      totalAmount: totalAmount,
    });

    // Save the order
    const order = await newOrder.save();

    return { orderID: order._id };
  } catch (error) {
    console.log("Error inserting order:", error);
    throw new Error("Error while inserting order");
  }
};

export const insertOrderItems = async (
  orderID: string,
  productID: string,
  quantity: number,
  price: number
) => {
  try {
    const newOrderItem = new OrderItem({
      orderID,
      productID,
      quantity: quantity,
      price: price,
    });

    await newOrderItem.save();
  } catch (error) {
    console.log("Error inserting order item:", error);
    throw new Error("Error while inserting order item");
  }
};

export const selectOrderByUserID = async (userID: string) => {
  try {
    const orders = await Order.find({
      userID,
      status: "Pending",
    }).exec();
    return orders;
  } catch (error) {
    console.log("Error selecting order by user ID:", error);
    throw new Error("Error while selecting order by user ID");
  }
};

// First: Get orders (Order[] type)
const getOrders = async (userID: string) => {
  const orders = await Order.find({ userID }).populate("userID").exec();
  return orders;
};

const getOrderItems = async (orderIDs: string[]) => {
  const orderItems = await OrderItem.find({ orderID: { $in: orderIDs } })
    .populate("productID")
    .exec();
  return orderItems;
};

// Combine order and items (OrderDetail[] type)
export const getUserOrderDetails = async (userID: string) => {
  const orders = await getOrders(userID); // Fetch orders using the above function
  const orderIDs = orders.map((order) => order._id.toString()); // Get the order IDs

  const orderItems = await getOrderItems(orderIDs);

  const result = await Order.aggregate([
    { $match: { userID: new mongoose.Types.ObjectId(userID) } },
    {
      $lookup: {
        from: "users",
        localField: "userID",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "addressID",
        foreignField: "_id",
        as: "addressDetails",
      },
    },
  ]);

  // Combine the order details with the order items
  const orderDetails = result.map((order) => ({
    ...order,
    items: orderItems.filter(
      (item) => item.orderID.toString() === order._id.toString()
    ),
    address: order.addressDetails[0],
    user: order.userDetails[0],
  }));
  console.log(orderDetails, "orders fetch");
  return orderDetails;
};

export const selectOrdersWithProductAndBrand = async (userID: string) => {
  try {
    const orders = await Order.aggregate([
      // Step 1: Match the orders by userId and status
      {
        $match: {
          userID: new mongoose.Types.ObjectId(userID),
          status: "Pending",
        },
      },

      // Step 2: Lookup to join OrderItems collection
      {
        $lookup: {
          from: "orderitems",
          localField: "_id",
          foreignField: "orderID",
          as: "orderItems",
        },
      },

      // Step 3: Lookup to join Products collection via OrderItems
      {
        $lookup: {
          from: "products",
          localField: "orderItems.productID",
          foreignField: "_id",
          as: "productDetails",
        },
      },

      // Step 4: Lookup to join Brands collection via Products
      {
        $lookup: {
          from: "brands",
          localField: "productDetails.brandID",
          foreignField: "_id",
          as: "brandDetails",
        },
      },

      // Step 5: Lookup to join Users collection (user who placed the order)
      {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "_id",
          as: "userDetails",
        },
      },

      // Step 6: Project the fields to return
      {
        $project: {
          orderId: "$_id",
          totalPrice: 1,
          status: 1,
          orderItems: 1,
          productDetails: 1,
          brandDetails: 1,
          userDetails: { $arrayElemAt: ["$userDetails", 0] },
        },
      },

      // Step 7: Optionally limit the number of results (if needed)
      { $limit: 8 },
    ]);

    return orders;
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error(
      "Error while fetching orders with product and brand details"
    );
  }
};

export const deleteOrderQuery = async (orderID: string) => {
  try {
    const result = await Order.deleteOne({ _id: orderID }).exec();
    return result;
  } catch (error) {
    console.error("Error deleting order from DB:", error);
    throw new Error("Error while deleting the order");
  }
};

export const updateOrderStatusQuery = async (
  orderID: string,
  status: string
) => {
  try {
    const result = await Order.updateOne(
      { _id: orderID },
      { $set: { status: status } }
    ).exec();
    return result;
  } catch (error) {
    console.error("Error updating order status in DB:", error);
    throw new Error("Error while updating order status");
  }
};

export const updateOrderAddressQuery = async (
  orderID: string,
  newAddress: string
) => {
  try {
    const result = await Order.updateOne(
      { _id: orderID },
      { $set: { address: newAddress } }
    ).exec();
    return result;
  } catch (error) {
    console.error("Error updating order address in DB:", error);
    throw new Error("Error while updating product address");
  }
};

// Query to fetch order status
export const getOrderStatusByIdQuery = async (orderID: string) => {
  try {
    const order = await Order.findById(orderID).select("status").exec();
    return order?.status; // Return the order's status
  } catch (error) {
    console.error("Error fetching order status from DB:", error);
    throw new Error("Error fetching order status");
  }
};
