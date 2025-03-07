import { NextRequest, NextResponse } from "next/server";
import {
  createProductService,
  getProductsService,
  deleteProductService,
  updateProductService,
} from "@/services/apiServices/products";
import { checkToken, isAdmin } from "@/lib/midlleware/auth";

// Controller to create a product
export const POST = async (req: NextRequest) => {
  const {
    productName,
    productDescription,
    productThumbnail,
    productPrice,
    categoryID,
    brandID,
    stock,
  } = await req.json();
  const { isValid, decodedUser } = checkToken(req);

  if (!isValid) {
    return NextResponse.json({
      error: "Unauthorized. Invalid or missing token.",
    });
  }

  console.log(decodedUser);

  const adminCheckResult = await isAdmin(req, decodedUser);

  if (adminCheckResult) {
    return adminCheckResult;
  }

  try {
    const result = await createProductService(
      productName,
      productDescription,
      productThumbnail,
      productPrice,
      categoryID,
      brandID,
      stock
    );
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    return NextResponse.json({ error: "An unknown error occurred." });
  }
};

// Controller to fetch products (by filters or all)
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const name = url.searchParams.get("name");
  const price = url.searchParams.get("price");
  const categoryID = url.searchParams.get("categoryID");
  const id = url.searchParams.get("id");
  const page = url.searchParams.get("page") || "1";
  const limit = url.searchParams.get("limit") || "8";

  const currentPage = Number(page);
  const itemsPerPage = Number(limit);

  try {
    const filters = {
      categoryID: categoryID ? String(categoryID) : undefined,
      name: name ? String(name) : undefined,
      id: id ? Number(id) : undefined,
      price:
        price === "low-to-high" || price === "high-to-low"
          ? (price as "low-to-high" | "high-to-low")
          : undefined,
    };

    const products = await getProductsService(
      filters,
      currentPage,
      itemsPerPage
    );

    return NextResponse.json(products);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
    return NextResponse.json({ error: "An unknown error occurred." });
  }
};

// Controller to delete a product
export const DELETE = async (req: NextRequest) => {
  const { productID } = await req.json();
  const { isValid, decodedUser } = checkToken(req);

  if (!isValid) {
    return NextResponse.json({
      error: "Unauthorized. Invalid or missing token.",
    });
  }

  console.log(decodedUser);

  const adminCheckResult = await isAdmin(req, decodedUser);

  if (adminCheckResult) {
    return adminCheckResult;
  }

  try {
    const result = await deleteProductService(productID);
    console.log(result);
    return NextResponse.json({
      message: "Product deleted successfully",
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 400 });
    }

    return NextResponse.json({
      message: "An unknown error occurred.",
      status: 500,
    });
  }
};

// Controller to update a product
export const PATCH = async (req: NextRequest) => {
  const {
    productID,
    productName,
    productDescription,
    productThumbnail,
    productPrice,
    categoryID,
  } = await req.json();
  const { isValid, decodedUser } = checkToken(req);

  if (!isValid) {
    return NextResponse.json({
      error: "Unauthorized. Invalid or missing token.",
    });
  }

  console.log(decodedUser);

  const adminCheckResult = await isAdmin(req, decodedUser);

  if (adminCheckResult) {
    return adminCheckResult;
  }

  try {
    const result = await updateProductService(
      productName,
      productDescription,
      productThumbnail,
      productPrice,
      categoryID,
      productID
    );
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    return NextResponse.json({
      message: "An unknown error occurred during deletion. Please try again!!",
    });
  }
};
