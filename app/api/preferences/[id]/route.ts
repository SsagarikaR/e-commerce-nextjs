import { NextRequest,NextResponse } from "next/server";
import { checkToken } from "@/lib/midlleware/auth";
import { deletePreferenceService,updatePreferenceService } from "@/services/apiServices/preferences";  


//delete prefrecnes
export const DELETE = async (req:NextRequest,{params}:{params:{id:string}}) => {
    const id =params.id
    const { isValid, decodedUser } = checkToken(req);
   
    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized. Invalid or missing token." }, { status: 401 });
    }
    const userID= decodedUser.identifire;
  
    try {
      const result = await deletePreferenceService(Number(id),userID);
  
      return NextResponse.json({ message: "Preference deleted successfully" });

    } catch (error) {
        return NextResponse.json({error: "Failed to delete preference" });
    }
  };



  //update prefernces
export const updatePreference = async (req:NextRequest, {params}:{params:{id:string}}) => {
    const { id} = params;
    const { isValid, decodedUser } = checkToken(req);
   
    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized. Invalid or missing token." }, { status: 401 });
    }
    const userID= decodedUser.identifire;
    const { productID} =await req.json();
  
    try {
      const result = await updatePreferenceService(Number(id), productID, userID);
  
      if (!result) {
        return NextResponse.json({ message: "Preference not found or not updated" });
      }
  
      return NextResponse.json({message: "Preference updated successfully", result });
  
    } catch (error) {
        return NextResponse.json({ error: "Failed to update preference" });
    }
  };
  
    