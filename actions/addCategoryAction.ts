import { z } from "zod";

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
  } else {
    return { success: "Fields validated successfully" };
  }
}
