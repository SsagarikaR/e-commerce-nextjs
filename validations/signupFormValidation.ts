import { z } from "zod";

const signupSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be minimum 3 characters long." })
    .max(25, { message: "Name must be maximum 25  characters long." }),
  contactNo: z
    .string({ message: "Contact no. is required." })
    .length(10, { message: "Contact no. must be 10 characters long." }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required." })
    .min(8, { message: "Password must be minimum 8 characters long." })
    .max(32, { message: "Password must be maximum 32 characters long." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      }
    ),
});

export async function signupFormValidation(formData: FormData) {
  console.log(formData);
  const unvalidatedData = {
    email: formData.get("email"),
    password: formData.get("password"),
    contactNo: formData.get("contactNo"),
    name: formData.get("name"),
  };
  console.log(unvalidatedData);

  const validated = signupSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const formFieldErrors = validated.error.flatten().fieldErrors;

    return {
      errors: {
        email: formFieldErrors?.email,
        password: formFieldErrors?.password,
        contactNo: formFieldErrors?.contactNo,
        name: formFieldErrors?.name,
      },
    };
  } else {
    return { success: "Fields validated successfully" };
  }
}
