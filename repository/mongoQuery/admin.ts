import Admin from "@/database/mongo-models/admin";

// Create a New Admin
export const createNewAdmin = async (userID: string | number) => {
  try {
    const admin = new Admin({ userID });
    return await admin.save();
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

// Select Admin by User ID
export const selectAdmin = async (userID: string | number) => {
  return await Admin.findOne({ userID });
};

// Select Admin by User ID
export const selectAllAdmin = async () => {
  return await Admin.find(); // Populating user data
};

// Delete Admin by User ID
export const deleteAdminByID = async (userID: string | number) => {
  return await Admin.findOneAndDelete({ userID });
};

//  Update Admin's User ID
export const updateAdminByID = async (
  userID: number | string,
  newUserID: number | string
) => {
  return await Admin.findOneAndUpdate(
    { userID },
    { userID: newUserID },
    { new: true }
  );
};
