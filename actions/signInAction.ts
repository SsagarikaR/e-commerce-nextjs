"use server";
import { unAuthorizedPostRequest } from "@/services/apiReqServices/unAuthorizedRequest";
import { signinFormValidation } from "@/validations/signinFormValidation";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";

// The action function should accept `previousState` and `formData` correctly
export async function signinUserAction(
  previousState: {
    success: string;
    errors: { email?: string[]; password?: string[] };
  },
  formData: FormData
) {
  // Call the validation function
  const validationResult = await signinFormValidation(formData);

  // If validation fails, return the errors
  if (validationResult.errors) {
    return {
      errors: {
        email: validationResult.errors.email || [],
        password: validationResult.errors.password || [],
      },
    };
  }

  // If validation passes, proceed with the API request
  // Assuming you need to convert FormData to JSON for the API request
  const plainData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Call the unAuthorizedPostRequest to handle the API submission
  const result = await unAuthorizedPostRequest("auth/signin", plainData);
  console.log(result, "result");
  if (result.user.token) {
    const setCookie = await cookies();
    const sevenDay = 7 * 24 * 60 * 60 * 1000;
    await setCookie.set("token", result.user.token!, {
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
