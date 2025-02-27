import { getUserService } from "@/services/apiServices/users";
import { NextRequest,NextResponse } from "next/server";
import { generateToken } from "@/lib/midlleware/auth";

// Controller to get a user by email and password
export async function POST(req: NextRequest) {
    const { email, password } =await req.json();

    try {
        const result = await getUserService(email, password);

        if (!result?.success) {
            return  NextResponse.json({message: result?.message });
        }

        if(result.user){
            const user = result.user;
            const token = await generateToken(user.userID);
            user.token = token;
    
            return  NextResponse.json(user);
        }
       
    } catch (error) {
        console.error(error);
        return  NextResponse.json({error: "Error retrieving user . Please try again after someyimes" });
    }
};