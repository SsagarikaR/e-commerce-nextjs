import { NextRequest, NextResponse } from "next/server";
import {
  addProductToWishListService,
  getWishListByUserService,
  getWishListItemByIDService,
  deleteFromWishListService,
} from "@/services/apiServices/wishLists";
import { checkToken } from "@/lib/midlleware/auth";

// Controller to add a product to the wishlist
export const POST = async (req: NextRequest) => {
  const { productID } = await req.json();
  const { isValid, decodedUser } = checkToken(req);
  if (!isValid) {
    return NextResponse.json(
      { error: "Unauthorized. Invalid or missing token." },
      { status: 401 }
    );
  }

  const userID = decodedUser.identifire;

  try {
    const result = await addProductToWishListService(userID, productID);
    if (!result.success) {
      return NextResponse.json({ message: result.message });
    }

    return NextResponse.json({ message: result.message });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error in adding the product to wishlist, please try again",
    });
  }
};



// Controller to get all products in the wishlist
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
    const result = await getWishListByUserService(userID);
    if (!result.success) {
      return NextResponse.json({ message: result.message });
    }
    return NextResponse.json(result.wishlist);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error, please try again" });
  }
};






// Controller to delete an item from the wishlist
export const DELETE = async (
  req:NextRequest
) => {
  const { wishListID } =await req.json();

  try {
    const result = await deleteFromWishListService(wishListID);
    if (!result.success) {
      return NextResponse.json({ message: result.message });
    }
    return NextResponse.json({ message: result.message });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error, please try again" });
  }
};
