import { sequelize } from  '@/lib/db';
import { insertOrder,
    insertOrderItems, 
    selectOrderByUserID,
    selectOrdersWithProductAndBrand,
    updateOrderStatusQuery,
    deleteOrderQuery ,
    updateOrderAddressQuery,
    getOrderStatusByIdQuery,
    getUserOrderDetails} from '@/dbQuery/orders';



//create a new order   
export const createOrderService = async (userID: number, totalPrice: number, items: Array<any>, address: string) => {
  const t = await sequelize.transaction();

  try {
    const existingOrder = await selectOrderByUserID(userID, t);

    if (existingOrder.length > 0) {
      return null; 
    }

    const result = await insertOrder(userID, totalPrice, address, t);

    if (result) {
      for (const item of items) {
        await insertOrderItems(result.orderID, item.productId, item.quantity, item.price, t);
      }
    }

    await t.commit();
    
    return result;
  } catch (error) {
    // Rollback the transaction in case of any error
    await t.rollback();
    console.log(error);
    throw new Error('Error while creating order and order items');
  }
};




export const fetchOrdersWithProductAndBrand = async (userID: number) => {
  try {
    const orders = await getUserOrderDetails(userID);
    return orders;
  } catch (error) {
    console.error('Error fetching orders with product and brand details:', error);
    throw new Error('Error fetching orders with product and brand details');
  }
};



export const updateOrderAddressService = async (orderId: number, productId: number, newAddress: string) => {
    try {
      const result = await updateOrderAddressQuery(orderId, productId, newAddress);
      return result;
    } catch (error) {
      console.error('Error in service:', error);
      throw new Error('Error while updating product address');
    }
  };




  export const deleteOrderService = async (orderId: number) => {
    try {
      const result = await deleteOrderQuery(orderId);
      return result;
    } catch (error) {
      console.error('Error in service:', error);
      throw new Error('Error while deleting the order');
    }
  };
  




  export const updateOrderStatusService = async (orderId: number, status: string) => {
    try {
      const result = await updateOrderStatusQuery(orderId, status);
      return result;
    } catch (error) {
      console.error('Error in service:', error);
      throw new Error('Error while updating order status');
    }
  };


 
  
  export const getOrderStatusById = async (orderId: number) => {
    try {
      const result = await getOrderStatusByIdQuery(orderId);
      return result;
    } catch (error) {
      console.error('Error fetching order status:', error);
      throw new Error('Error fetching order status');
    }
  };