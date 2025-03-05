import { z } from "zod";

const addProductSchema = z.object({
  productName: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" }),
  productPrice: z
    .string({ message: "Price is required" })
    .min(1, { message: "price is required" }),
  productDescription: z
    .string({ message: "description is required" })
    .min(1, { message: "description is required " }),
  brandID: z
    .string({ message: "Please choose a brand" })
    .min(1, { message: "brandID is required " }),
  categoryID: z
    .string({ message: "Please choose a category" })
    .min(1, { message: "categoryID is required " }),
  stock: z
    .string({ message: "Stock is required" })
    .min(1, { message: " stock is required " }),
  productThumbnail: z
    .string({ message: "thumbnail is required." })
    .min(1, { message: "Thumbnail is required" }),
});

export async function addProductAction(formData: FormData) {
  console.log(formData, "form");
  const unvalidatedData = {
    productName: formData.get("productName"),
    productThumbnail: formData.get("productThumbnail"),
    categoryID: formData.get("categoryID"),
    brandID: formData.get("brandID"),
    productDescription: formData.get("productDescription"),
    stock: formData.get("stock"),
    productPrice: formData.get("productPrice"),
  };
  console.log(unvalidatedData, "un validate");

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
      },
    };
  } else {
    return { success: "Fields validated successfully" };
  }
}
