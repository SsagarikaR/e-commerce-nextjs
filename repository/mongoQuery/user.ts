import User from "@/database/mongo-models/user";
import mongoose from "mongoose";

export const createNewUser = async (
  name: string,
  email: string,
  contactNo: string,
  hashedPassword: string
) => {
  const newUser = new User({
    name,
    email,
    contactNo,
    password: hashedPassword,
  });
  return await newUser.save();
};

export const selectAllUsers = async () => {
  return await User.aggregate([
    {
      $lookup: {
        from: "admins",
        localField: "_id",
        foreignField: "userID",
        as: "adminData",
      },
    },
    {
      $addFields: {
        role: {
          $cond: {
            if: { $gt: [{ $size: "$adminData" }, 0] },
            then: "Admin",
            else: "User",
          },
        },
      },
    },
    {
      $project: {
        adminData: 0,
        password: 0,
      },
    },
  ]);
};

export const selectUserByID = async (
  userID: string | number
): Promise<user[]> => {
  return await User.aggregate([
    // Match the user by ID
    {
      $match: { _id: new mongoose.Types.ObjectId(userID) },
    },
    {
      $lookup: {
        from: "admins",
        localField: "_id",
        foreignField: "userID",
        as: "adminData",
      },
    },
    {
      $addFields: {
        role: {
          $cond: {
            if: { $gt: [{ $size: "$adminData" }, 0] },
            then: "Admin",
            else: "User",
          },
        },
      },
    },
    {
      $project: {
        adminData: 0,
        password: 0,
      },
    },
  ]);
};

export const selectUserByName = async (name: string) => {
  return await User.find({ name }).exec();
};

export const selectUserByEmail = async (email: string) => {
  return await User.findOne({ email }).exec();
};

export const deleteUserByID = async (userID: string | number) => {
  return await User.findByIdAndDelete(userID).exec();
};

export const updateUsersPassword = async (
  userID: string | number,
  hashedPassword: string
) => {
  return await User.findByIdAndUpdate(
    userID,
    { password: hashedPassword },
    { new: true }
  ).exec();
};

export const selectUserByNameOREmail = async (name: string, email: string) => {
  return await User.find({ name, email }).exec();
};
