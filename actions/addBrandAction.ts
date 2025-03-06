import { z } from "zod";
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest";
// Zod schema for validation
const addBrandSchema = z.object({
  brandName: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" }),
  brandThumbnail: z
    .string({ message: "Thumbnail is required" })
    .min(1, { message: "Thumbnail is required" }),
});

// Action function to add the brand
export async function addBrandAction(formData: FormData) {
  console.log(formData, "form");

  // Extract form data
  const unvalidatedData = {
    brandName: formData.get("brandName"),
    brandThumbnail: formData.get("brandThumbnail"),
  };

  console.log(unvalidatedData);

  // Validate form data with Zod schema
  const validated = addBrandSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    // If validation fails, return the validation errors
    const formFieldErrors = validated.error.flatten().fieldErrors;

    return {
      errors: {
        brandName: formFieldErrors?.brandName,
        brandThumbnail: formFieldErrors?.brandThumbnail,
      },
    };
  }

  try {
    // Proceed with API call if validation is successful
    const response = await authorizedPostRequest("/brands", unvalidatedData);

    // Assuming the API response includes a success message or the created brand object
    if (response.success) {
      return { success: "Brand created successfully" };
    } else {
      // If the API responds with an error, handle it accordingly
      return { errors: { general: "Failed to create brand" } };
    }
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("API Error:", error);
    return {
      errors: { general: "An error occurred while creating the brand" },
    };
  }
}
