import { z } from "zod";

const signupSchema = z.object({
  full_name:z
  .string({message: "Full name is required"})
    .min(3, { message: "Full name must be minimum 3 characters long." })
    .max(25, { message: "Full name must be maximum 25  characters long." }),
    contact: z
    .string({ message: "Contact no. is required." })
    .length(10, { message: "Contact no. must be 10 characters long." })
   ,
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required." })
    .min(8, { message: "Password must be minimum 8 characters long." })
    .max(32, { message: "Password must be maximum 32 characters long." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
      { message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character." }
    ),
});

export async function signupUserAction(formData: FormData) {
  console.log(formData);
  const unvalidatedData = {
    email: formData.get("email"),
    password: formData.get("password"),
    contact: formData.get("contact"),
    full_name: formData.get("full_name"),
  };
  console.log(unvalidatedData);

  const validated = signupSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const formFieldErrors = validated.error.flatten().fieldErrors;

    return {
      errors: {
        email: formFieldErrors?.email,
        password: formFieldErrors?.password,
        contact: formFieldErrors?.contact,
        full_name: formFieldErrors?.full_name,
      },
    };
  } else {
    return { success: "Fields validated successfully" };
  }
}
