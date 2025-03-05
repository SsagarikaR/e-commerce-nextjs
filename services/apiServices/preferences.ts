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
  productID: number,
  userID: number
) => {
  const cacheKey = `preferences:${userID}`;
  try {
    // First, check if the preference already exists
    const existingPreference = await selectPrefernceByProductANDUser(
      productID,
      userID
    );

    // If the preference exists, return null to prevent adding again
    if (existingPreference.length > 0) {
      return { message: "Preference already exists" }; // Inform that preference already exists
    }

    // Insert new preference if it doesn't exist
    const result = await insertPrefernce(productID, userID);

    // After inserting, invalidate cache to reflect new changes
    invalidateCache(cacheKey);

    return { message: "Preference created successfully", result };
  } catch (error) {
    console.log(error, "error");
    throw new Error("Error while creating preference. Please try again.");
  }
};

// Service function for fetching preferences
export const fetchPreferencesService = async (userID: number) => {
  const cacheKey = `preferences:${userID}`;
  try {
    const cachedPreferences = getCache(cacheKey);
    if (cachedPreferences) {
      console.log("Returning cached preferences");
      return cachedPreferences; // Return cached data if available
    }

    // Fetch preferences from database if cache is not available
    const preferences = await fetchPreference(userID);
    if (!preferences || preferences.length === 0) {
      return null; // No preferences found for the user
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
  preferenceID: number,
  productID: number,
  userID: number
) => {
  const cacheKey = `preferences:${userID}`;
  try {
    // Update preference in the database
    const result = await updatePreference(preferenceID, productID, userID);

    if (result[0] === 0) {
      return { message: "Preference not found or not updated" }; // No rows were updated
    }

    // After updating, invalidate the cache so that the changes are reflected
    invalidateCache(cacheKey);

    return { message: "Preference updated successfully", result };
  } catch (error) {
    throw new Error("Error while updating preferences. Please try again.");
  }
};

// Service function for deleting a preference
export const deletePreferenceService = async (
  preferenceID: number,
  userID: number
) => {
  const cacheKey = `preferences:${userID}`;
  try {
    // Delete preference from the database
    const result = await deletePreference(preferenceID);

    // After deleting, invalidate the cache so that the changes are reflected
    invalidateCache(cacheKey);

    return { message: "Preference deleted successfully", result };
  } catch (error) {
    throw new Error("Error while deleting preferences. Please try again.");
  }
};
