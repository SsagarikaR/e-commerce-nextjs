import User from "@/lib/Database/models/usermongo";
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
        foreignField: "userId",
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

export const selectUserByID = async (id: string): Promise<user[]> => {
  return await User.aggregate([
    // Match the user by ID
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "admins",
        localField: "_id",
        foreignField: "userId",
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

export const deleteUserByID = async (id: string) => {
  return await User.findByIdAndDelete(id).exec();
};

export const updateUsersPassword = async (
  id: string,
  hashedPassword: string
) => {
  return await User.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    { new: true }
  ).exec();
};

export const selectUserByNameOREmail = async (name: string, email: string) => {
  return await User.find({ name, email }).exec();
};
