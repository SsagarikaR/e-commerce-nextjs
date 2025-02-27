import { deleteUserService, getAllUsersService, updatePasswordService } from "@/services/apiServices/users";
import { NextRequest,NextResponse } from "next/server";
import { checkToken ,isAdmin} from "@/lib/midlleware/auth";

//GET ALL CUSTOMERS DATA(Only accessible by admin)
export async function GET(req: NextRequest) {
  const { isValid, decodedUser } = checkToken(req);

  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized. Invalid or missing token." });
  }

  console.log(decodedUser); 

  const adminCheckResult = await isAdmin(req, decodedUser);

  if (adminCheckResult) {
    return adminCheckResult;  
  }

  try {
    const result = await getAllUsersService();

    if (!result.success) {
      return NextResponse.json({ message: result.message });
    }

    return NextResponse.json(result.users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error in fetching user. Please try again!" });
  }
}


// Controller to update a user's password
export const PATCH= async (req: NextRequest) => {
  const { oldPassword, newPassword } =await req.json();
  const { isValid, decodedUser } = checkToken(req);

  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized. Invalid or missing token." }, { status: 401 });
  }
  const userID = decodedUser.identifire;
  
  try {
      const result = await updatePasswordService(userID, oldPassword, newPassword);

      if (!result.success) {
        return NextResponse.json({ message: result.message });
      }

      return NextResponse.json({ message: result.message });
  } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error updating password" });
  }
};


// Controller to delete a user by ID
export const deleteUser = async (req: NextRequest) => {
  const { isValid, decodedUser } = checkToken(req);

  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized. Invalid or missing token." }, { status: 401 });
  }
  const userID = decodedUser.identifire;

  try {
      const result = await deleteUserService(userID);

      if (!result.success) {
        return NextResponse.json({  message: result.message });
      }

      return NextResponse.json({ message: result.message });
  } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error deleting user" });
  }
};
