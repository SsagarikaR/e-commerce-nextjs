import { getAllUsersService } from "@/services/db/users";
import { NextRequest,NextResponse } from "next/server";
import { checkToken ,isAdmin} from "@/lib/midlleware/auth";


export async function GET(req: NextRequest) {
  // Step 1: Check the token
  const { isValid, decodedUser } = checkToken(req);

  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized. Invalid or missing token." }, { status: 401 });
  }

  // Attach the decoded user to `req` for the next middleware (isAdmin)
  // Since req is immutable, we use `decodedUser` directly instead of modifying `req`
  console.log(decodedUser); // You can now use the decoded user

  // Step 2: Check if the user is an admin
  const adminCheckResult = await isAdmin(req, decodedUser);

  if (adminCheckResult) {
    return adminCheckResult;  // Return the error response from isAdmin if the user is not an admin
  }

  try {
    // Step 3: Proceed with fetching the users if the user is an admin
    const result = await getAllUsersService();

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }

    return NextResponse.json(result.users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error in fetching. Please try again!" }, { status: 500 });
  }
}