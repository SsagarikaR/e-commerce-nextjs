import {
  createNewAdmin,
  selectAdmin,
  deleteAdminByID,
  updateAdminByID,
} from "@/dbQuery/admins";

// Service function to create a new admin
export const createAdminService = async (userID: number) => {
  try {
    // Check if the admin already exists
    const existingAdmin = await selectAdminService(userID);
    if (existingAdmin.length > 0) {
      return { success: false, message: "This Admin is already registered." };
    }

    // Create new admin
    const [result, metaData] = await createNewAdmin(userID);
    if (metaData === 0) {
      return {
        success: false,
        message: "Failed to create admin. Please try again later.",
      };
    }

    return { success: true, message: "Admin created successfully" };
  } catch (error) {
    console.error("Error creating admin:", error);
    throw new Error("An error occurred while creating the admin.");
  }
};

// Service function to get an admin by userID
export const selectAdminService = async (userID: number) => {
  try {
    return await selectAdmin(userID);
  } catch (error) {
    console.error("Error fetching admin:", error);
    throw new Error("Error while fetching admin details.");
  }
};

// Service function to delete admin by userID
export const deleteAdminService = async (userID: number) => {
  try {
    // Check if the admin exists
    const admin = await selectAdminService(userID);
    if (admin.length === 0) {
      return { success: false, message: "Admin not found" };
    }

    // Delete the admin
    const result = await deleteAdminByID(userID);

    return { success: true, message: "Admin deleted successfully" };
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw new Error("An error occurred while deleting the admin.");
  }
};

// Service function to update admin by userID
export const updateAdminService = async (userID: number, newUserID: number) => {
  try {
    // Check if the admin exists
    const admin = await selectAdminService(userID);
    if (admin.length === 0) {
      return { success: false, message: "Admin not found" };
    }

    // Update the admin
    const result = await updateAdminByID(userID, newUserID);
    if (result[0] === 0) {
      return { success: false, message: "Failed to update admin" };
    }

    return { success: true, message: "Admin updated successfully" };
  } catch (error) {
    console.error("Error updating admin:", error);
    throw new Error("An error occurred while updating the admin.");
  }
};
