import { z } from "zod";

const signinSchema = z.object({
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

export async function signinFormValidation(formData: FormData) {
  console.log(formData);
  const unvalidatedData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  console.log(unvalidatedData);

  const validated = signinSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const formFieldErrors = validated.error.flatten().fieldErrors;

    return {
      errors: {
        email: formFieldErrors?.email,
        password: formFieldErrors?.password,
      },
    };
  } else {
    return { success: "Fields validated successfully" };
  }
}
