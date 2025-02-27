import { NextRequest,NextResponse } from "next/server";
import { checkToken } from "@/lib/midlleware/auth";
import {
  addCartItemService,
  getCartItemsService,
  deleteCartItemService,
  updateCartItemQuantityService,
} from "@/services/apiServices/carts";

// Controller to add an item to the user's cart
export const POST = async (req: NextRequest) => {
  const { productID, quantity } = await req.json();
  const { isValid, decodedUser } = checkToken(req);
    if (!isValid) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid or missing token." },
        { status: 401 }
      );
    }
  
    const userID = decodedUser.identifire;

  try {
    const result = await addCartItemService(userID, productID, quantity);
    if (result.success) {
        return NextResponse.json({  message: result.message, cartItemID: result.cartItemID });
    } else {
        return NextResponse.json({  message: result.message });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({  error: "An error occurred while adding the item to the cart" });
  }
};




// Controller to get all items in the user's cart
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
    const result = await getCartItemsService(userID);
    return NextResponse.json(result.cartItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json({  message: "An error occurred while fetching the cart items" });
  }
};

// Controller to delete an item from the user's cart
export const DELETE= async (req: NextRequest) => {
    const { isValid, decodedUser } = checkToken(req);
    if (!isValid) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid or missing token." },
        { status: 401 }
      );
    }
  
    const userID = decodedUser.identifire;
  const { cartItemID } =await req.json();

  try {
    const result = await deleteCartItemService(cartItemID);
    if (result.success) {
        return NextResponse.json({  message: result.message });
    } else {
        return NextResponse.json({  message: result.message });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({  message: "An error occurred while deleting the cart item" });
  }
};

// Controller to update the quantity of an item in the user's cart
export const PATCH = async (req: NextRequest) => {
  const { quantity, cartItemID } =await req.json();
  const { isValid, decodedUser } = checkToken(req);
    if (!isValid) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid or missing token." },
        { status: 401 }
      );
    }
  
    const userID = decodedUser.identifire;
  try {
    const result = await updateCartItemQuantityService(quantity, cartItemID);
    if (result.success) {
        return NextResponse.json({ message: result.message });
    } else {
        return NextResponse.json({  message: result.message });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({  error: "An error occurred while updating the cart item quantity" });
  }
};