import { NextRequest,NextResponse } from "next/server";
import { checkToken ,isAdmin} from "@/lib/midlleware/auth";
import { getUserByIDService } from "@/services/apiServices/users";
import { Admins } from "@/models/admin";

// Controller to retrieve a user by their ID
export const GET = async (req: NextRequest) => {
  // await Admins.sync({force:true});
    const { isValid, decodedUser } = await checkToken(req);
  
    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized. Invalid or missing token." }, { status: 401 });
    }
    const id= decodedUser.identifire;
  
    try {
      const result = await getUserByIDService(id);
  
      if (!result.success) {
        return NextResponse.json({ message: result.message },{status:404});
      }
      
      return NextResponse.json(result.user,{status:200});
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: `An error occurred while fetching the user ${error}` },{status:500});
    }
  };