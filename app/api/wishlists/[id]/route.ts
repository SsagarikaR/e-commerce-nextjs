import { NextRequest, NextResponse } from "next/server";
import { getWishListItemByIDService } from "@/services/apiServices/wishLists";
import { checkToken } from "@/lib/midlleware/auth";

// Controller to get a specific product in the product by ID
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { isValid, decodedUser } = await checkToken(req);
  if (!isValid) {
    return NextResponse.json(
      { error: "Unauthorized. Invalid or missing token." },
      { status: 401 }
    );
  }

  const userID = decodedUser.identifire;
  const { id } = await params;
  try {
    const result = await getWishListItemByIDService(userID, Number(id));
    if (!result.success) {
      return NextResponse.json({ message: result.message });
    }
    return NextResponse.json(result.wishlistItem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error, please try again" });
  }
};
