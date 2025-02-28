import { NextRequest,NextResponse } from "next/server";
import { checkToken ,isAdmin} from "@/lib/midlleware/auth";
import { getUserByIDService } from "@/services/apiServices/users";

// Controller to retrieve a user by their ID
export const GET = async (req: NextRequest) => {
    const { isValid, decodedUser } = await checkToken(req);
  
    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized. Invalid or missing token." }, { status: 401 });
    }
    const id= decodedUser.identifire;
  
    try {
      const result = await getUserByIDService(id);
  
      if (!result.success) {
        return NextResponse.json({ message: result.message });
      }
  
      return NextResponse.json(result.user);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "An error occurred while fetching the user" });
    }
  };