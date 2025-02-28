import { createUserService} from "@/services/apiServices/users";
import { NextRequest,NextResponse } from "next/server";
import { generateToken } from "@/lib/midlleware/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const { name, email, contactNo, password } =await req.json();

        try {
            const result = await createUserService(name, email, contactNo, password);
            console.log(result)
            if (!result.success) {
                return  NextResponse.json({message:result.message});
            }
    
            const token = await generateToken(Number(result.result));
            const setCookie=await cookies();
            const sevenDay=7* 24 * 60 * 60 * 1000
            setCookie.set('token',token!,{expires:Date.now()+sevenDay})
            return  NextResponse.json({token:token});
        } catch (error) {
            console.error(error);
            return  NextResponse.json({error:"Error in signing up. Please try again!"});

        }
}


