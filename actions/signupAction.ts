"use server";
import { unAuthorizedPostRequest } from "@/services/apiReqServices/unAuthorizedRequest";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { signupFormValidation } from "@/validations/signupFormValidation";

// The action function should accept previousState and formData correctly
export async function signupUserAction(
  previousState: {
    success: string;
    errors: {
      email?: string[];
      password?: string[];
      contactNo?: string[];
      name?: string[];
    };
  },
  formData: FormData
) {
  // Call the validation function
  const validationResult = await signupFormValidation(formData);

  // If validation fails, return the errors
  if (validationResult.errors) {
    return {
      errors: {
        email: validationResult.errors.email || [],
        password: validationResult.errors.password || [],
        contactNo: validationResult.errors.contactNo || [],
        name: validationResult.errors.name || [],
      },
    };
  }

  const plainData = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    contactNo: formData.get("contactNo"),
  };

  const result = await unAuthorizedPostRequest("auth/signup", plainData);
  console.log(result, "result");
  if (result.token) {
    const setCookie = await cookies();
    const sevenDay = 7 * 24 * 60 * 60 * 1000;
    await setCookie.set("token", result.token!, {
      expires: Date.now() + sevenDay,
    });
    console.log(setCookie.get("token"));
    redirect(`/home`, RedirectType.push);
  }

  return {
    errors: {
      message: result.message,
    },
  };
}
