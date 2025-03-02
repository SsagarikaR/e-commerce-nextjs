import { NextRequest,NextResponse } from "next/server";
import {
  createAdminService,
  selectAdminService,
  deleteAdminService,
  updateAdminService,
} from "@/services/apiServices/admins";
import { checkToken,isAdmin } from "@/lib/midlleware/auth";


// Create new admin
export const POST = async (
  req: NextRequest
) => {
  const { userID } =await  req.json();
   const { isValid, decodedUser } = checkToken(req);
  
    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized. Invalid or missing token." },{status:401});
    }
  
    console.log(decodedUser); 
  
    const adminCheckResult = await isAdmin(req, decodedUser);
  
    if (adminCheckResult) {
      return adminCheckResult;  
    }
  

  try {
    if (!userID) {
        return NextResponse.json({
        message: "Please enter user's ID to add the user as admin",
      },{status:409});
    }

    const { success, message } = await createAdminService(userID);
    if (!success) {
        return NextResponse.json({message: message });
    }

    return NextResponse.json({message: message },{status:200});
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json({
      error: "An error occurred while creating admin",
      status:500
    });
  }
};




// Delete admin by userID
export const DELETE = async (
  req: NextRequest
) => {
  const { userID } =await req.json();
  const { isValid, decodedUser } = checkToken(req);
  
  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized. Invalid or missing token." },{status:401});
  }

  console.log(decodedUser); 

  const adminCheckResult = await isAdmin(req, decodedUser);

  if (adminCheckResult) {
    return adminCheckResult;  
  }


  try {
    const { success, message } = await deleteAdminService(userID);
    if (!success) {
      return NextResponse.json({ message:message });
    }

    return NextResponse.json({message: message });
  } catch (error) {
    console.error("Error deleting admin:", error);
    return NextResponse.json({
      error: "An error occurred while deleting admin",
    });
  }
};




// Update admin by userID
export const updateAdmin = async (
  req:NextRequest
) => {
  const { userID, newUserID } =await req.json();
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
    const { success, message } = await updateAdminService(userID, newUserID);
    if (!success) {
        return NextResponse.json({ message });
    }

    return NextResponse.json({ message },{status:200});
  } catch (error) {
    console.error("Error updating admin:", error);
    return NextResponse.json({
     error: "An error occurred while updating admin",
    });
  }
};
