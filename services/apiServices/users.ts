// import bcrypt from "bcrypt";
import {
  selectUserByName,
  selectUserByEmail,
  createNewUser,
  deleteUserByID,
  selectUserByID,
  updateUsersPassword,
  selectAllUsers,
} from "@/dbQuery/users";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/midlleware/auth";

// Service to create a new user
export const createUserService = async (
  name: string,
  email: string,
  contactNo: string,
  password: string
) => {
  const existingUserByName = await selectUserByName(name);
  if (existingUserByName.length > 0) {
    return { success: false, message: "Username already taken" };
  }

  console.log(existingUserByName);

  const existingUserByEmail = await selectUserByEmail(email);
  if (existingUserByEmail.length > 0) {
    return { success: false, message: "Email already registered" };
  }
  console.log(existingUserByEmail, "email");

  const hashedPassword = await bcrypt.hashSync(password, 10);
  console.log(hashedPassword, "hashed");
  const [result, metaData] = await createNewUser(
    name,
    email,
    contactNo,
    hashedPassword
  );

  if (metaData === 0) {
    return { success: false, message: "Error creating user" };
  }

  return { success: true, result };
};

// Service to get a user by email and password
export const getUserService = async (email: string, password: string) => {
  const users: user[] = await selectUserByEmail(email);

  if (users[0].password) {
    const isPasswordValid = await bcrypt.compareSync(
      password,
      users[0].password
    );
    if (!isPasswordValid) {
      return { success: false, message: "Invalid password" };
    }
    const user = users[0];
    delete user.password;
    const token = await generateToken(user.userID);
    user.token = token;
    return { success: true, user };
  }
};

// Service to delete a user by their ID
export const deleteUserService = async (id: number) => {
  const user = await selectUserByID(id);

  if (user.length === 0) {
    return { success: false, message: "User not found" };
  }

  await deleteUserByID(id);
  return { success: true, message: "User deleted successfully" };
};

// Service to update the user's password
export const updatePasswordService = async (
  userID: number,
  oldPassword: string,
  newPassword: string
) => {
  const user = await selectUserByID(userID);

  if (user.length === 0) {
    return { success: false, message: "User not found" };
  }

  if (user[0].password) {
    const isPasswordValid = await bcrypt.compare(oldPassword, user[0].password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid old password" };
    }
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUsersPassword(hashedPassword);

  return { success: true, message: "Password updated successfully" };
};

export const getAllUsersService = async () => {
  try {
    const users = await selectAllUsers();
    if (users.length === 0) {
      return { success: false, message: "No users found" };
    }
    return { success: true, users };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching users");
  }
};

// Service function to retrieve a user by their ID
export const getUserByIDService = async (id: number) => {
  try {
    const users = await selectUserByID(id);
    if (users.length === 0) {
      return { success: false, message: "User not found" };
    }

    // Delete the password field before returning
    delete users[0].password;
    return { success: true, user: users[0] };
  } catch (error) {
    throw new Error(`An error occurred while fetching the user by ID ${error}`);
  }
};
