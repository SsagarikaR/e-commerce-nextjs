import {
  createNewBrand,
  deleteBrandByID,
  findAllBrand,
  findBrandByName,
  updateTheBrand,
  selectBrandByID,
} from "@/dbQuery/brand";
import { invalidateCache, getCache, setCache } from "@/lib/helpers/cacheHelper";

// Service to create a new brand
export const createBrandService = async (
  brandName: string,
  brandThumbnail: string
) => {
  try {
    const isBrandExist = await findBrandByName(brandName);
    if (isBrandExist) {
      return { success: false, message: "This brand already exists" };
    }

    const brand = await createNewBrand(brandName, brandThumbnail);
    if (brand) {
      invalidateCache("brands:all");
      return { success: true, message: "Successfully added a new brand." };
    } else {
      return { success: false, message: "Error in adding a new brand." };
    }
  } catch (error) {
    console.error("Error in createBrandService:", error);
    throw new Error("An error occurred while creating the brand");
  }
};

// Service to get brands (by name or all brands)
export const getBrandsService = async (name?: string) => {
  try {
    const cacheKey = name ? `brand:${name}` : "brands:all";
    const cachedBrands = getCache(cacheKey);
    if (cachedBrands) {
      console.log("Returning cached brands");
      return { success: true, brands: cachedBrands };
    }

    if (name && typeof name === "string") {
      const brand = await findBrandByName(name);
      if (!brand) {
        return { success: false, message: `No brand with name ${name} found.` };
      }

      setCache(cacheKey, brand);
      return { success: true, brands: brand };
    }

    const brands = await findAllBrand();
    if (brands.length === 0) {
      return { success: false, message: "No brands found." };
    }

    setCache(cacheKey, brands);
    return { success: true, brands };
  } catch (error) {
    console.error("Error in getBrandsService:", error);
    throw new Error("An error occurred while fetching the brands");
  }
};

// Service to update an existing brand
export const updateBrandService = async (
  brandId: string,
  brandName: string,
  brandThumbnail: string
) => {
  try {
    const isBrandExist = await selectBrandByID(brandId);
    if (!isBrandExist) {
      return { success: false, message: "Brand not found" };
    }

    await updateTheBrand(brandId, brandName, brandThumbnail);
    invalidateCache("brands:all");
    invalidateCache(`brand:${brandName}`);

    return { success: true, message: "Successfully updated the brand." };
  } catch (error) {
    console.error("Error in updateBrandService:", error);
    throw new Error("An error occurred while updating the brand");
  }
};

// Service to delete an existing brand
export const deleteBrandService = async (brandId: string) => {
  try {
    const isBrandExist = await selectBrandByID(brandId);
    if (!isBrandExist) {
      return { success: false, message: "This brand not found" };
    }

    await deleteBrandByID(brandId);
    invalidateCache("brands:all");

    return { success: true, message: "Successfully deleted the brand." };
  } catch (error) {
    console.error("Error in deleteBrandService:", error);
    throw new Error("An error occurred while deleting the brand");
  }
};
