import Order from "@/lib/database/models/order"; // Assuming the Order model is imported
import OrderItem from "@/lib/database/models/orderItem"; // Assuming the OrderItem model is imported
import mongoose from "mongoose";

export const insertOrder = async (
  userID: string,
  totalPrice: number,
  addressID: string,
  totalAmount: number
) => {
  try {
    const newOrder = new Order({
      userId: userID,
      totalPrice: totalPrice,
      status: "Pending",
      addressId: addressID,
      totalAmount: totalAmount,
    });

    // Save the order
    const order = await newOrder.save();

    return { orderID: order._id }; // Return the inserted order's ID
  } catch (error) {
    console.log("Error inserting order:", error);
    throw new Error("Error while inserting order");
  }
};

export const insertOrderItems = async (
  orderID: string,
  productId: string,
  quantity: number,
  price: number
) => {
  try {
    const newOrderItem = new OrderItem({
      orderId: orderID,
      productId: productId,
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
      userId: userID,
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
  const orders = await Order.find({ userId: userID }).populate("userId").exec();
  return orders;
};

// const getOrderItems = async (orderIDs: number[]): Promise<orderItem[]> => {
//   const query = `
//     SELECT oi.*, p.productName, p.productThumbnail, p.productPrice, b.brandName
//     FROM OrderItems oi
//     JOIN Products p ON oi.productId = p.productID
//     JOIN Brands b ON p.brandID = b.brandID
//     WHERE oi.orderId IN (?)
//   `;

//   const result: orderItem[] = await sequelize.query(query, {
//     replacements: [orderIDs],
//     type: QueryTypes.SELECT,
//   });

//   return result;
// };

const getOrderItems = async (orderIDs: string[]) => {
  const orderItems = await OrderItem.find({ orderId: { $in: orderIDs } })
    .populate("productId")
    .exec();
  return orderItems;
};

// Combine order and items (OrderDetail[] type)
export const getUserOrderDetails = async (userID: string) => {
  const orders = await getOrders(userID); // Fetch orders using the above function
  const orderIDs = orders.map((order) => order._id.toString()); // Get the order IDs

  const orderItems = await getOrderItems(orderIDs); // Fetch order items using the above function

  const result = await Order.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userID) } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "addressId",
        foreignField: "_id",
        as: "addressDetails",
      },
    },
  ]);

  // Combine the order details with the order items
  const orderDetails = result.map((order) => ({
    ...order,
    items: orderItems.filter(
      (item) => item.orderId.toString() === order._id.toString()
    ),
    address: order.addressDetails[0], // Assuming only one address
    user: order.userDetails[0], // Assuming only one user
  }));

  return orderDetails;
};

export const selectOrdersWithProductAndBrand = async (userID: string) => {
  try {
    const orders = await Order.aggregate([
      // Step 1: Match the orders by userId and status
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userID),
          status: "Pending",
        },
      },

      // Step 2: Lookup to join OrderItems collection
      {
        $lookup: {
          from: "orderitems", // Collection name in MongoDB
          localField: "_id", // Join on orderId field
          foreignField: "orderId",
          as: "orderItems",
        },
      },

      // Step 3: Lookup to join Products collection via OrderItems
      {
        $lookup: {
          from: "products", // Collection name in MongoDB
          localField: "orderItems.productId", // Field in OrderItems
          foreignField: "_id", // Field in Products
          as: "productDetails",
        },
      },

      // Step 4: Lookup to join Brands collection via Products
      {
        $lookup: {
          from: "brands", // Collection name in MongoDB
          localField: "productDetails.brandID", // Field in Products
          foreignField: "_id", // Field in Brands
          as: "brandDetails",
        },
      },

      // Step 5: Lookup to join Users collection (user who placed the order)
      {
        $lookup: {
          from: "users", // Collection name in MongoDB
          localField: "userId", // Field in Orders
          foreignField: "_id", // Field in Users
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
          userDetails: { $arrayElemAt: ["$userDetails", 0] }, // Extract the first user details (since it's a one-to-one relationship)
        },
      },

      // Step 7: Optionally limit the number of results (if needed)
      { $limit: 8 }, // This step can be modified or omitted
    ]);

    return orders;
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error(
      "Error while fetching orders with product and brand details"
    );
  }
};

export const deleteOrderQuery = async (orderId: string) => {
  try {
    const result = await Order.deleteOne({ _id: orderId }).exec();
    return result;
  } catch (error) {
    console.error("Error deleting order from DB:", error);
    throw new Error("Error while deleting the order");
  }
};

export const updateOrderStatusQuery = async (
  orderId: string,
  status: string
) => {
  try {
    const result = await Order.updateOne(
      { _id: orderId },
      { $set: { status: status } }
    ).exec();
    return result;
  } catch (error) {
    console.error("Error updating order status in DB:", error);
    throw new Error("Error while updating order status");
  }
};

export const updateOrderAddressQuery = async (
  orderId: string,
  newAddress: string
) => {
  try {
    const result = await Order.updateOne(
      { _id: orderId },
      { $set: { address: newAddress } }
    ).exec();
    return result;
  } catch (error) {
    console.error("Error updating order address in DB:", error);
    throw new Error("Error while updating product address");
  }
};

// Query to fetch order status
export const getOrderStatusByIdQuery = async (orderId: string) => {
  try {
    const order = await Order.findById(orderId).select("status").exec();
    return order?.status; // Return the order's status
  } catch (error) {
    console.error("Error fetching order status from DB:", error);
    throw new Error("Error fetching order status");
  }
};
