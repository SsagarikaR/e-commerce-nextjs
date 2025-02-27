"use server"
import { error } from "console";
import {z} from "zod";

 const signinSchema=z.object({
    email:z.string({message:"Email is required"}).email({message:"Invalid email address"}),
    password:z.string({message:"Password is required."}).min(8,{message:"Password must be minimum 8 character long."}).max(32,{message:"Password must be maximum 32 character long."})
})


export async function signinUserAction(formData: FormData){
    console.log(formData);
    const unvalidatedData = {
        email: formData.get('email'),
        password: formData.get('password'),
    };
    console.log(unvalidatedData);

    const validated = signinSchema.safeParse(unvalidatedData);

    if (!validated.success) {
        const formFieldErrors=validated.error.flatten().fieldErrors;

        return{
            errors:{
                email:formFieldErrors?.email,
                password:formFieldErrors?.password
            }
        }
    } else {
        return {success:"Fields validated successfully"}
    }
}