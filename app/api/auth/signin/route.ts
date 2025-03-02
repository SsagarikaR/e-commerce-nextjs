import { getUserService } from "@/services/apiServices/users";
import { NextRequest,NextResponse } from "next/server";
import { generateToken } from "@/lib/midlleware/auth";
import { cookies } from "next/headers";


// Controller to get a user by email and password
export async function POST(req: NextRequest) {
    // await Users.sync({force:true});
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
            const setCookie=await cookies();
            const sevenDay=7* 24 * 60 * 60 * 1000
            setCookie.set('token',user.token!,{expires:Date.now()+sevenDay})
            return  NextResponse.json(user);
        }
       
    } catch (error) {
        console.error(error);
        return  NextResponse.json({error: "Error retrieving user . Please try again after someyimes" });
    }
};