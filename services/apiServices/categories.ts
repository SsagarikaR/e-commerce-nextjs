import {
  createNewCategory,
  deleteCategory,
  selectAllCategories,
  selectCategoryByID,
  selectCategoryByName,
  updateCategory,
} from "@/dbQuery/categories";
import { invalidateCache, getCache, setCache } from "@/lib/helpers/cacheHelper";

// Service to create a new category
export const createCategoryService = async (
  categoryName: string,
  categoryThumbnail: string
) => {
  try {
    // Check if the category already exists
    const isCategoryExist = await selectCategoryByName(categoryName);
    if (isCategoryExist) {
      return { success: false, message: "This category already exists" };
    }

    // Create the new category
    const category = await createNewCategory(categoryName, categoryThumbnail);
    if (category) {
      // Invalidate cache for all categories to ensure the list is updated
      invalidateCache("categories:all");
      return { success: true, message: "Successfully added a new category." };
    } else {
      return { success: false, message: "Error in adding a new category." };
    }
  } catch (error) {
    console.error("Error in createCategoryService:", error);
    throw new Error("An error occurred while creating the category");
  }
};

// Service to get categories (by name or all categories)
export const getCategoriesService = async (name?: string) => {
  try {
    const cacheKey = name ? `category:${name}` : "categories:all";

    const cachedCategories = getCache(cacheKey);
    if (cachedCategories) {
      console.log("Returning cached categories");
      return { success: true, categories: cachedCategories };
    }

    if (name && typeof name === "string") {
      const category = await selectCategoryByName(name);
      if (!category) {
        return {
          success: false,
          message: `No category with name ${name} found.`,
        };
      }

      setCache(cacheKey, category);

      return { success: true, categories: category };
    }

    const categories = await selectAllCategories();
    if (categories.length === 0) {
      return { success: false, message: "No categories found." };
    }

    setCache(cacheKey, categories);

    return { success: true, categories };
  } catch (error) {
    console.error("Error in getCategoriesService:", error);
    throw new Error("An error occurred while fetching the categories");
  }
};

// Service to update an existing category
export const updateCategoryService = async (
  categoryId: string,
  categoryName: string,
  categoryThumbnail: string
) => {
  try {
    const isCategoryExist = await selectCategoryByID(categoryId);
    if (!isCategoryExist) {
      return { success: false, message: "Category not found" };
    }

    // Update the category
    await updateCategory(categoryName, categoryThumbnail, categoryId);

    // Invalidate cache for all categories since an update occurred
    invalidateCache("categories:all");
    invalidateCache(`category:${categoryName}`);

    return { success: true, message: "Successfully updated the category." };
  } catch (error) {
    console.error("Error in updateCategoryService:", error);
    throw new Error("An error occurred while updating the category");
  }
};

// Service to delete an existing category
export const deleteCategoryService = async (categoryId: string) => {
  try {
    const isCategoryExist = await selectCategoryByID(categoryId);
    if (!isCategoryExist) {
      return { success: false, message: "This category not found" };
    }

    // Delete the category
    await deleteCategory(categoryId);

    // Invalidate cache for all categories after deletion
    invalidateCache("categories:all");

    return { success: true, message: "Successfully deleted the category." };
  } catch (error) {
    console.error("Error in deleteCategoryService:", error);
    throw new Error("An error occurred while deleting the category");
  }
};
