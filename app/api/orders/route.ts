import { NextRequest ,NextResponse} from "next/server";
import { checkToken } from "@/lib/midlleware/auth";
import { createOrderService ,
    fetchOrders,
    updateOrderAddressService,
    deleteOrderService,} from "@/services/apiServices/orders";

export const POST = async (req: NextRequest) => {
   const { isValid, decodedUser } = checkToken(req);
      if (!isValid) {
        return NextResponse.json(
          { error: "Unauthorized. Invalid or missing token." },
          { status: 401 }
        );
      }
    
      const userID = decodedUser.identifire;
  const { totalAmount, items, address,totalPrice } =await req.json();

  try {
    // Validate the required fields
    // console.log(req.body)

    const result = await createOrderService(userID, totalAmount, items, address,totalPrice);
    if (!result.success) {
        return NextResponse.json({ message:result.message });
    }

    return NextResponse.json({ message: 'Order created successfully',status:200 });
  } catch (error) {
    console.log(error,"errors");
    return NextResponse.json({
     error: `Error in creating order, Please try again! ${error}`,
    });
  }
};


export const GET = async (req: NextRequest) => {
    const { isValid, decodedUser } = checkToken(req);
    if (!isValid) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid or missing token." },
        { status: 401 }
      );
    }
     
    const userID = decodedUser.identifire;
    try {
      const orders = await fetchOrders(userID);
      // console.log("orders",orders)
  
      if (!orders || orders.length === 0) {
        return NextResponse.json({ message: 'No orders found for this user.' });
      }
  
      return NextResponse.json(orders );
    } catch (error) {
        return NextResponse.json({
       error: 'Error fetching orders. Please try again later.',
      });
    }
  };


  export const PATCH = async (req:NextRequest) => {
    const { isValid, decodedUser } = checkToken(req);
    if (!isValid) {
        return NextResponse.json(
          { error: "Unauthorized. Invalid or missing token." },
          { status: 401 }
        );
    }
      
    const { orderId, newAddress } =await req.json();
    console.log(orderId, newAddress)
    try {
      if (!orderId || !newAddress) {
        return NextResponse.json({message: 'Please provide orderId,  and newAddress.' },{status:409});
      }
  
      // // Check if the order status is 'Cancelled'
      // const orderStatus = await getOrderStatusById(orderId);
  
      // if (orderStatus === 'Cancelled') {
      //   return NextResponse.json({message: 'You cannot update the address of a cancelled order.' },{status:403});
      // }
  
      const result = await updateOrderAddressService(orderId,  newAddress);
  
      if (!result) {
        return NextResponse.json({ message: 'Error updating product address. Please try again.' },{status:500});
      }
  
      return NextResponse.json({ message: 'Product address updated successfully' },{status:200});
    } catch (error) {
        return NextResponse.json({
        error: 'Error in updating product address, please try again!',
      },{status:500});
    }
  };
  




  export const DELETE = async (req: NextRequest) => {
    const { isValid, decodedUser } = checkToken(req);
    if (!isValid) {
        return NextResponse.json(
          { error: "Unauthorized. Invalid or missing token." },
          { status: 401 }
        );
    }
      
    const userID = decodedUser.identifire;
    const { orderId } =await req.json();
  
    try {
      if (!orderId) {
        return NextResponse.json({ message: 'Please provide orderId.' });
      }
  
      const result = await deleteOrderService(orderId);
  
      return NextResponse.json({ message: 'Order deleted successfully' });

    } catch (error) {
        return NextResponse.json({
        error: 'Error in deleting order, please try again!',
      });
    }
  };




  