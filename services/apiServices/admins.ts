import {
  createNewAdmin,
  selectAdmin,
  deleteAdminByID,
  updateAdminByID,
} from "@/dbQuery/admin";

// Service function to create a new admin
export const createAdminService = async (userId: string) => {
  try {
    // Check if the admin already exists
    const existingAdmin = await selectAdminService(userId);
    if (existingAdmin) {
      return { success: false, message: "This Admin is already registered." };
    }

    // Create new admin
    const admin = await createNewAdmin(userId);
    console.log(admin);
    if (!admin) {
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
export const selectAdminService = async (userId: string) => {
  try {
    return await selectAdmin(userId);
  } catch (error) {
    console.error("Error fetching admin:", error);
    throw new Error("Error while fetching admin details.");
  }
};

// Service function to delete admin by userID
export const deleteAdminService = async (userId: string) => {
  try {
    // Check if the admin exists
    const admin = await selectAdmin(userId);
    if (!admin) {
      return { success: false, message: "Admin not found" };
    }

    // Delete the admin
    const result = await deleteAdminByID(userId);
    console.log(result);
    return { success: true, message: "Admin deleted successfully" };
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw new Error("An error occurred while deleting the admin.");
  }
};

// Service function to update admin by userID
export const updateAdminService = async (userId: string, newUserId: string) => {
  try {
    // Check if the admin exists
    const admin = await selectAdminService(userId);
    if (!admin) {
      return { success: false, message: "Admin not found" };
    }

    // Update the admin
    const result = await updateAdminByID(userId, newUserId);
    console.log(result);
    if (!result) {
      return { success: false, message: "Failed to update admin" };
    }

    return { success: true, message: "Admin updated successfully" };
  } catch (error) {
    console.error("Error updating admin:", error);
    throw new Error("An error occurred while updating the admin.");
  }
};
