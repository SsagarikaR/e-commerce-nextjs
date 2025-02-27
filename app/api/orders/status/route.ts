import { NextRequest ,NextResponse} from "next/server";
import { checkToken } from "@/lib/midlleware/auth";
import {updateOrderStatusService} from "@/services/apiServices/orders";

export const PATCH= async (req: NextRequest) => {
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
  
      const result = await updateOrderStatusService(orderId, 'Cancelled');
  
      if (!result) {
        return NextResponse.json({message: 'Error updating order status. Please try again.' });
      }
  
      return NextResponse.json({ message: 'Order status updated to Cancelled' });
    } catch (error) {
        return NextResponse.json({
        error: 'Error in updating order status, please try again!',
      });
    }
  };