import { Preference } from "@/repository/repoFunction/preferences";
import { invalidateCache, getCache, setCache } from "@/lib/helpers/cacheHelper";

const preferenceRepo = Preference.getInstance(process.env.DATABASE!);

// Service function for creating a preference
export const createPreferenceService = async (
  productID: string,
  userID: string
) => {
  const cacheKey = `preferences:${userID}`;
  try {
    const existingPreference =
      await preferenceRepo.selectPreferenceByProductANDUser(productID, userID);

    if (existingPreference) {
      return { message: "Preference already exists" };
    }

    const result = await preferenceRepo.insertPreference(productID, userID);

    invalidateCache(cacheKey);
    console.log(result);
    return { message: "Preference created successfully", result };
  } catch (error) {
    console.log(error, "error");
    throw new Error("Error while creating preference. Please try again.");
  }
};

// Service function for fetching preferences
export const fetchPreferencesService = async (userID: string) => {
  const cacheKey = `preferences:${userID}`;
  try {
    const cachedPreferences = getCache(cacheKey);
    if (cachedPreferences) {
      console.log("Returning cached preferences");
      return cachedPreferences;
    }

    // Fetch preferences from database if cache is not available
    const preferences = await preferenceRepo.fetchPreference(userID);
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
  preferenceID: string,
  productID: string,
  userID: string
) => {
  const cacheKey = `preferences:${userID}`;
  try {
    // Update preference in the database
    const preference = await preferenceRepo.updatePreference(
      preferenceID,
      productID,
      userID
    );

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
  preferenceID: string,
  userID: string
) => {
  const cacheKey = `preferences:${userID}`;
  try {
    // Delete preference from the database
    const preference = await preferenceRepo.deletePreference(preferenceID);

    // After deleting, invalidate the cache so that the changes are reflected
    invalidateCache(cacheKey);

    return { message: "Preference deleted successfully", preference };
  } catch (error) {
    console.error(error);
    throw new Error("Error while deleting preferences. Please try again.");
  }
};
