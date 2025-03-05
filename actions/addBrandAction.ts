import { z } from "zod";

const addBrandSchema = z.object({
  brandName: z
    .string({ message: "Name is required" })
    .min(1,{ message: "Name is required" }),
   brandThumbnail: z
    .string({ message: "thumbnail is required." })
    .min(1,{ message: "Thumbnail is required" })
});

export async function addBrandAction(formData: FormData) {
  console.log(formData,"form");
  const unvalidatedData = {
    brandName: formData.get("brandName"),
    brandThumbnail: formData.get("brandThumbnail"),
  };
  console.log(unvalidatedData);

  const validated =addBrandSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const formFieldErrors = validated.error.flatten().fieldErrors;

    return {
      errors: {
        brandName: formFieldErrors?.brandName,
        brandThumbnail :formFieldErrors?.brandThumbnail,
      },
    };
  } else {
    return { success: "Fields validated successfully" };
  }
}
