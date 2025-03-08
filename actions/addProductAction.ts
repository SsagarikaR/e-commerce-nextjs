import { z } from "zod";

const addProductSchema = z.object({
  productName: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" }),
  productPrice: z
    .string({ message: "Price is required" })
    .min(1, { message: "Price is required" }),
  productDescription: z
    .string({ message: "Description is required" })
    .min(1, { message: "Description is required" }),
  brandID: z
    .string({ message: "Please choose a brand" })
    .min(1, { message: "Brand ID is required" }),
  categoryID: z
    .string({ message: "Please choose a category" })
    .min(1, { message: "Category ID is required" }),
  stock: z
    .string({ message: "Stock is required" })
    .min(1, { message: "Stock is required" }),
  productThumbnail: z
    .string({ message: "Thumbnail is required" })
    .min(1, { message: "Thumbnail is required" }),
  productImages: z
    .array(z.string().min(1, { message: "Image URL is required" }))
    .min(2, { message: "At least 2 images are required" })
    .max(4, { message: "You can upload a maximum of 4 images" }),
});

export async function addProductAction(formData: FormData) {
  console.log(formData.getAll, "formeded");
  const unvalidatedData = {
    productName: formData.get("productName"),
    productThumbnail: formData.get("productThumbnail"),
    categoryID: formData.get("categoryID"),
    brandID: formData.get("brandID"),
    productDescription: formData.get("productDescription"),
    stock: formData.get("stock"),
    productPrice: formData.get("productPrice"),
    productImages: formData.getAll("productImages"),
  };
  console.log(unvalidatedData, "unvalidated");

  const validated = addProductSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const formFieldErrors = validated.error.flatten().fieldErrors;

    return {
      errors: {
        productName: formFieldErrors?.productName,
        productThumbnail: formFieldErrors?.productThumbnail,
        categoryID: formFieldErrors?.categoryID,
        brandID: formFieldErrors?.brandID,
        productDescription: formFieldErrors?.productDescription,
        stock: formFieldErrors?.stock,
        productPrice: formFieldErrors?.productPrice,
        productImages: formFieldErrors?.productImages,
      },
    };
  } else {
    return { success: "Fields validated successfully" };
  }
}
