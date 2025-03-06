import {
  createCategoryService,
  getCategoriesService,
  updateCategoryService,
  deleteCategoryService,
} from "@/services/apiServices/categories";
import { NextRequest, NextResponse } from "next/server";
import { checkToken, isAdmin } from "@/lib/midlleware/auth";
import { error } from "console";

// Controller to create a new category
export const POST = async (req: NextRequest) => {
  const { categoryName, categoryThumbnail } = await req.json();
  const { isValid, decodedUser } = checkToken(req);

  if (!isValid) {
    return NextResponse.json(
      {
        error: "Unauthorized. Invalid or missing token.",
      },
      { status: 401 }
    );
  }

  console.log(decodedUser);

  const adminCheckResult = await isAdmin(req, decodedUser);

  if (adminCheckResult) {
    return adminCheckResult;
  }

  try {
    if (!categoryName || !categoryThumbnail) {
      return NextResponse.json(
        {
          error: "Please enter all the required fields",
        },
        { status: 409 }
      );
    }
    // Call service to create a new category
    const result = await createCategoryService(categoryName, categoryThumbnail);
    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.message }, { status: 403 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error in adding new category. Please try again after some time",
      },
      { status: 500 }
    );
  }
};

// Controller to get categories (by name or all categories)
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const name = url.searchParams.get("name");

  try {
    // Call service to fetch categories
    const result = await getCategoriesService(name ? String(name) : undefined);
    if (result.success) {
      return NextResponse.json(result.categories);
    } else {
      return NextResponse.json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Please try again after some time!" });
  }
};

// Controller to update an existing category
export const PATCH = async (req: NextRequest) => {
  const { categoryID, categoryName, categoryThumbnail } = await req.json();
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
    // Call service to update the category
    const result = await updateCategoryService(
      categoryID,
      categoryName,
      categoryThumbnail
    );
    if (result.success) {
      return NextResponse.json({ message: result.message });
    } else {
      return NextResponse.json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error in updating ctegories. Please try again after some time.",
    });
  }
};

// Controller to delete an existing category
export const DELETE = async (req: NextRequest) => {
  const { categoryID } = await req.json();
  const { isValid, decodedUser } = checkToken(req);

  if (!isValid) {
    return NextResponse.json({
      error: "Unauthorized. Invalid or missing token.",
      status: 401,
    });
  }

  console.log(decodedUser);

  const adminCheckResult = await isAdmin(req, decodedUser);

  if (adminCheckResult) {
    return adminCheckResult;
  }

  try {
    // Call service to delete the category
    const result = await deleteCategoryService(categoryID);
    if (result.success) {
      return NextResponse.json({ message: result.message, status: 200 });
    } else {
      return NextResponse.json({ message: result.message, status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error in deleting category. Please try again after some time!",
      status: 500,
    });
  }
};
