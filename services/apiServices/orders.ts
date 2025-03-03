import { sequelize } from  '@/lib/db';
import { insertOrder,
    insertOrderItems, 
    selectOrderByUserID,
    updateOrderStatusQuery,
    deleteOrderQuery ,
    updateOrderAddressQuery,
    getOrderStatusByIdQuery,
    getUserOrderDetails} from '@/dbQuery/orders';



//create a new order   
export const createOrderService = async (userID: number, totalAmount: number, items: Array<any>, address: string,totalPrice:number) => {
  const t = await sequelize.transaction();

  try {
    const existingOrder = await selectOrderByUserID(userID, t);

    if (existingOrder.length > 0) {
      // console.log("You already have a pending order")
      return {success:false,message:"You already have a pending order."}
    }

    const result = await insertOrder(userID, totalPrice, address,totalAmount, t);
    // console.log(result,"result");
    if (result) {
      for (const item of items) {
        await insertOrderItems(result.orderID, item.productId, item.quantity, item.price, t);
      }
    }

    await t.commit();
    
    return {success:true,result}
  } catch (error) {
    // Rollback the transaction in case of any error
    await t.rollback();
    console.log(error,"error");
    throw new Error('Error while creating order and order items');
  }
};




export const fetchOrders = async (userID: number) => {
  try {
    const orders = await getUserOrderDetails(userID);
    // console.log(orders,"orders")
    return orders;
  } catch (error) {
    console.error('Error fetching orders with product and brand details:', error);
    throw new Error('Error fetching orders with product and brand details');
  }
};



export const updateOrderAddressService = async (orderId: number, newAddress: string) => {
    try {
      const result = await updateOrderAddressQuery(orderId,  newAddress);
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