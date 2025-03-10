import { sequelize } from "@/lib/Database/db";
import { QueryTypes, Transaction } from "sequelize";

export const insertOrder = async (
  userID: number,
  totalPrice: number,
  addressID: number,
  totalAmount: number,
  t: Transaction
) => {
  try {
    const [result] = await sequelize.query(
      `INSERT INTO Orders (userId, totalPrice, status, addressID,totalAmount) 
      VALUES (:userId, :totalPrice, 'Pending', :addressID,:totalAmount)`,
      {
        replacements: { userId: userID, totalPrice, addressID, totalAmount },
        type: QueryTypes.INSERT,
        transaction: t,
      }
    );
    return { orderID: result }; // Return orderID or the entire result depending on your table design
  } catch (error) {
    console.log("Error inserting order:", error);
    throw new Error("Error while inserting order");
  }
};

export const insertOrderItems = async (
  orderID: number,
  productId: number,
  quantity: number,
  price: number,
  t: Transaction
) => {
  try {
    await sequelize.query(
      `INSERT INTO OrderItems (orderId, productId, quantity, price) 
        VALUES (:orderID, :productId, :quantity, :price)`,
      {
        replacements: { orderID, productId, quantity, price },
        type: QueryTypes.INSERT,
        transaction: t,
      }
    );
  } catch (error) {
    console.log("Error inserting order item:", error);
    throw new Error("Error while inserting order item");
  }
};

export const selectOrderByUserID = async (userID: number, t: Transaction) => {
  try {
    return await sequelize.query(
      `SELECT * FROM Orders WHERE userId = :userID AND status = 'Pending'`,
      {
        replacements: { userID },
        type: QueryTypes.SELECT,
        transaction: t,
      }
    );
  } catch (error) {
    console.log("Error selecting order by user ID:", error);
    throw new Error("Error while selecting order by user ID");
  }
};

// First: Get orders (Order[] type)
const getOrders = async (userID: number): Promise<order[]> => {
  const query = `
      SELECT o.*,u.*
      FROM Orders o 
      JOIN Users u ON u.userID=o.userID
      WHERE o.userID=:userID
    `;

  const result: order[] = await sequelize.query(query, {
    replacements: { userID },
    type: QueryTypes.SELECT,
  });

  return result;
};

const getOrderItems = async (orderIDs: number[]): Promise<orderItem[]> => {
  const query = `
    SELECT oi.*, p.productName, p.productThumbnail, p.productPrice, b.brandName
    FROM OrderItems oi
    JOIN Products p ON oi.productId = p.productID
    JOIN Brands b ON p.brandID = b.brandID
    WHERE oi.orderId IN (?)
  `;

  const result: orderItem[] = await sequelize.query(query, {
    replacements: [orderIDs],
    type: QueryTypes.SELECT,
  });

  return result;
};

// Combine order and items (OrderDetail[] type)
export const getUserOrderDetails = async (userID: number) => {
  const orders = await getOrders(userID);

  // Extracting the order IDs for further querying the items
  const orderIDs = orders.map((order) => order.orderID);

  // Fetching the order items based on order IDs
  const orderItems = await getOrderItems(orderIDs);
  console.log(orderItems);

  // Combine order details with address details in one query
  const query = `
    SELECT 
      o.*,
      a.state, a.city, a.pincode, a.locality, a.address AS orderAddress,
      u.*
    FROM Orders o
    JOIN Users u ON u.userID = o.userID
    LEFT JOIN Addresses a ON o.addressID = a.addressID
    WHERE o.userID = :userID
  `;

  const result: order[] = await sequelize.query(query, {
    replacements: { userID },
    type: QueryTypes.SELECT,
  });
  console.log(result, "rresult");

  // Combine orders with order items and address details
  const orderDetails = result.map((order) => ({
    ...order,
    items: orderItems.filter((item) => item.orderId === order.orderID),
    address: {
      addressID: order.addressID,
      state: order.state,
      city: order.city,
      pincode: order.pincode,
      locality: order.locality,
      address: order.address, // the actual address field
    },
  }));
  console.log(orderDetails, "order details");

  return orderDetails;
};

export const selectOrdersWithProductAndBrand = async (userID: number) => {
  try {
    const query = `
        SELECT o.*,oi.*,p.*,b.*,u.*
        FROM Orders o
        JOIN OrderItems oi ON o.orderID = oi.orderId
        JOIN Products p ON oi.productId = p.productID
        JOIN Brands b ON p.brandID = b.brandID
        JOIN Users u ON u.userID = o.userID
        WHERE o.userId = :userID AND o.status = 'Pending'
      `;

    const result = await sequelize.query(query, {
      replacements: { userID },
      type: QueryTypes.SELECT,
    });
    // console.log(result,"result")

    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error(
      "Error while fetching orders with product and brand details"
    );
  }
};

export const deleteOrderQuery = async (orderId: number) => {
  try {
    const result = await sequelize.query(
      `DELETE FROM Orders WHERE orderID = :orderId`,
      {
        replacements: { orderId },
        type: QueryTypes.DELETE,
      }
    );
    return result;
  } catch (error) {
    console.error("Error deleting order from DB:", error);
    throw new Error("Error while deleting the order");
  }
};

export const updateOrderStatusQuery = async (
  orderId: number,
  status: string
) => {
  try {
    const result = await sequelize.query(
      `UPDATE Orders SET status = :status WHERE orderID = :orderId`,
      {
        replacements: { orderId, status },
        type: QueryTypes.UPDATE,
      }
    );
    return result;
  } catch (error) {
    console.error("Error updating order status in DB:", error);
    throw new Error("Error while updating order status");
  }
};

export const updateOrderAddressQuery = async (
  orderId: number,
  newAddress: string
) => {
  try {
    const result = await sequelize.query(
      `UPDATE Orders SET address = :newAddress WHERE orderId = :orderId `,
      {
        replacements: { orderId, newAddress },
        type: QueryTypes.UPDATE,
      }
    );
    return result;
  } catch (error) {
    console.error("Error updating product address in DB:", error);
    throw new Error("Error while updating product address");
  }
};

// Query to fetch order status
export const getOrderStatusByIdQuery = async (orderId: number) => {
  try {
    const result: order[] = await sequelize.query(
      `SELECT status FROM Orders WHERE orderID = :orderId`,
      {
        replacements: { orderId },
        type: QueryTypes.SELECT,
      }
    );
    return result[0]?.status; // Return the order status
  } catch (error) {
    console.error("Error fetching order status from DB:", error);
    throw new Error("Error fetching order status");
  }
};
