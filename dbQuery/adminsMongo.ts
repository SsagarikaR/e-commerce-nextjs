import Admin from "@/lib/database/models/adminmongo";

// Create a New Admin
export const createNewAdmin = async (userId: string) => {
  try {
    const admin = new Admin({ userId });
    return await admin.save();
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

// Select Admin by User ID
export const selectAdmin = async (userId: string) => {
  return await Admin.findOne({ userId });
};

// Select Admin by User ID
export const selectAllAdmin = async () => {
  return await Admin.find(); // Populating user data
};

// Delete Admin by User ID
export const deleteAdminByID = async (userId: string) => {
  return await Admin.findOneAndDelete({ userId });
};

//  Update Admin's User ID
export const updateAdminByID = async (userId: string, newUserId: string) => {
  return await Admin.findOneAndUpdate(
    { userId },
    { userID: newUserId },
    { new: true }
  );
};
