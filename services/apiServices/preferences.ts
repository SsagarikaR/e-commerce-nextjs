import {
  insertPrefernce,
  selectPrefernceByProductANDUser,
  fetchPreference,
  updatePreference,
  deletePreference,
} from "@/dbQuery/preferences";
import { invalidateCache, getCache, setCache } from "@/lib/helpers/cacheHelper";

// Service function for creating a preference
export const createPreferenceService = async (
  productId: string,
  userId: string
) => {
  const cacheKey = `preferences:${userId}`;
  try {
    const existingPreference = await selectPrefernceByProductANDUser(
      productId,
      userId
    );

    if (existingPreference) {
      return { message: "Preference already exists" };
    }

    const result = await insertPrefernce(productId, userId);

    invalidateCache(cacheKey);
    console.log(result);
    return { message: "Preference created successfully", result };
  } catch (error) {
    console.log(error, "error");
    throw new Error("Error while creating preference. Please try again.");
  }
};

// Service function for fetching preferences
export const fetchPreferencesService = async (userId: string) => {
  const cacheKey = `preferences:${userId}`;
  try {
    const cachedPreferences = getCache(cacheKey);
    if (cachedPreferences) {
      console.log("Returning cached preferences");
      return cachedPreferences;
    }

    // Fetch preferences from database if cache is not available
    const preferences = await fetchPreference(userId);
    console.log(preferences, "prefernce service....");
    if (!preferences || preferences.length === 0) {
      return null;
    }

    // Store the preferences in cache for future use
    setCache(cacheKey, preferences);

    return preferences;
  } catch (error) {
    console.error(error);
    throw new Error("Error while fetching preferences. Please try again.");
  }
};

// Service function for updating a preference
export const updatePreferenceService = async (
  preferenceId: string,
  productId: string,
  userId: string
) => {
  const cacheKey = `preferences:${userId}`;
  try {
    // Update preference in the database
    const preference = await updatePreference(preferenceId, productId, userId);

    if (!preference) {
      return { message: "Preference not found or not updated" };
    }

    // After updating, invalidate the cache so that the changes are reflected
    invalidateCache(cacheKey);

    return { message: "Preference updated successfully", preference };
  } catch (error) {
    console.error(error);
    throw new Error("Error while updating preferences. Please try again.");
  }
};

// Service function for deleting a preference
export const deletePreferenceService = async (
  preferenceId: string,
  userId: string
) => {
  const cacheKey = `preferences:${userId}`;
  try {
    // Delete preference from the database
    const preference = await deletePreference(preferenceId);

    // After deleting, invalidate the cache so that the changes are reflected
    invalidateCache(cacheKey);

    return { message: "Preference deleted successfully", preference };
  } catch (error) {
    console.error(error);
    throw new Error("Error while deleting preferences. Please try again.");
  }
};
