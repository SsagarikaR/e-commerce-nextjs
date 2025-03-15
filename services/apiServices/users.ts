import { User } from "@/repository/repoFunction/user";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/midlleware/auth";

const userRepo = User.getInstance(process.env.DATABASE!);

// Service to create a new user
export const createUserService = async (
  name: string,
  email: string,
  contactNo: string,
  password: string
) => {
  const existingUserByName = await userRepo.selectUserByName(name);
  if (existingUserByName.length > 0) {
    return { success: false, message: "Username already taken" };
  }

  // console.log(existingUserByName);

  const existingUserByEmail = await userRepo.selectUserByEmail(email);
  if (existingUserByEmail) {
    return { success: false, message: "Email already registered" };
  }
  // console.log(existingUserByEmail, "email");

  const hashedPassword = await bcrypt.hashSync(password, 10);
  console.log(hashedPassword, "hashed");
  const user = await userRepo.createNewUser(
    name,
    email,
    contactNo,
    hashedPassword
  );

  // console.log("user created", user);
  if (!user) {
    return { success: false, message: "Error creating user" };
  }
  const result = user._id;
  return { success: true, result };
};

// Service to get a user by email and password
export const getUserService = async (email: string, password: string) => {
  const user = await userRepo.selectUserByEmail(email);

  if (user.password) {
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid password" };
    }
    delete user.password;
    const userToReturn = user.toJSON();
    const token = await generateToken(user._id);
    userToReturn.token = token;
    // console.log(userToReturn, "user....");
    return { success: true, user: userToReturn };
  }
};

// Service to delete a user by their ID
export const deleteUserService = async (id: string) => {
  const user: user[] = await userRepo.selectUserByID(id);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  await userRepo.deleteUserByID(id);
  return { success: true, message: "User deleted successfully" };
};

// Service to update the user's password
export const updatePasswordService = async (
  id: string,
  oldPassword: string,
  newPassword: string
) => {
  const user: user[] = await userRepo.selectUserByID(id);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  if (user[0].password) {
    const isPasswordValid = await bcrypt.compare(oldPassword, user[0].password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid old password" };
    }
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await userRepo.updateUsersPassword(user[0]._id, hashedPassword);

  return { success: true, message: "Password updated successfully" };
};

export const getAllUsersService = async () => {
  try {
    const users = await userRepo.selectAllUsers();
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
export const getUserByIDService = async (id: string) => {
  try {
    const users = await userRepo.selectUserByID(id);
    // console.log(users, "user from backend");
    if (!users) {
      return { success: false, message: "User not found" };
    }

    // Delete the password field before returning
    return { success: true, user: users[0] };
  } catch (error) {
    throw new Error(`An error occurred while fetching the user by ID ${error}`);
  }
};
