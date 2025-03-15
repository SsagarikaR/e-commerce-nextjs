import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "@/lib/midlleware/auth";
import { updateOrderStatusService } from "@/services/apiServices/orders";

export const PATCH = async (req: NextRequest) => {
  const { isValid } = checkToken(req);
  if (!isValid) {
    return NextResponse.json(
      { error: "Unauthorized. Invalid or missing token." },
      { status: 401 }
    );
  }

  const { orderID } = await req.json();

  try {
    if (!orderID) {
      return NextResponse.json({ message: "Please provide orderId." });
    }

    const result = await updateOrderStatusService(orderID, "Cancelled");

    if (!result) {
      return NextResponse.json({
        message: "Error updating order status. Please try again.",
      });
    }

    return NextResponse.json({ message: "Order status updated to Cancelled" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error in updating order status, please try again!",
    });
  }
};
