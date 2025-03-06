import { z } from "zod";
import { authorizedPostRequest } from "@/services/apiReqServices/authorizedRequest";

const addCategorySchema = z.object({
  categoryName: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" }),
  categoryThumbnail: z
    .string({ message: "thumbnail is required." })
    .min(1, { message: "Thumbnail is required" }),
});

export async function addCategoryAction(formData: FormData) {
  console.log(formData, "form");
  const unvalidatedData = {
    categoryName: formData.get("categoryName"),
    categoryThumbnail: formData.get("categoryThumbnail"),
  };
  console.log(unvalidatedData);

  const validated = addCategorySchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const formFieldErrors = validated.error.flatten().fieldErrors;

    return {
      errors: {
        categoryName: formFieldErrors?.categoryName,
        categoryThumbnail: formFieldErrors?.categoryThumbnail,
      },
    };
  }

  try {
    // Proceed with API call if validation is successful
    const response = await authorizedPostRequest(
      "/categories",
      unvalidatedData
    );
    console.log(response);
    // Assuming the API response includes a success message or the created brand object
    if (
      response.response &&
      response.response.data.error !== undefined &&
      response.response.data.error !== null
    ) {
      return { errors: { general: response.response.data.error } };
    }

    return { success: "Category created successfully" };
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("API Error:", error);
    return {
      errors: { general: "An error occurred while creating the categroy" },
    };
  }
}
