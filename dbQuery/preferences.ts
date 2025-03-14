import Preference from "@/lib/database/models/preference";
import mongoose from "mongoose";

// Select Preference by Product and User
export const selectPrefernceByProductANDUser = async (
  productId: string,
  userId: string
) => {
  return await Preference.findOne({
    productId,
    userId,
  }).exec();
};

// Insert Preference
export const insertPrefernce = async (productId: string, userId: string) => {
  const newPreference = new Preference({
    productId,
    userId,
  });

  return await newPreference.save();
};

// Delete Preference
export const deletePreference = async (preferenceId: string) => {
  return await Preference.deleteOne({ _id: preferenceId }).exec();
};

// Update Preference
export const updatePreference = async (
  productId: string,
  userId: string,
  preferenceId: string
) => {
  return await Preference.updateOne(
    { _id: preferenceId },
    { $set: { productId: productId, userId: userId } }
  ).exec();
};

// Fetch Preferences for a User
export const fetchPreference = async (userId: string) => {
  console.log(userId, "user id....");
  const objectId = new mongoose.Types.ObjectId(userId);

  const result = await Preference.aggregate([
    { $match: { userId: objectId } },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "brands",
        localField: "productDetails.brandID",
        foreignField: "_id",
        as: "brandDetails",
      },
    },
    { $unwind: { path: "$brandDetails", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        preferenceId: "$_id",
        productId: "$productId",
        userId: "$userId",
        productName: "$productDetails.productName",
        productDescription: "$productDetails.productDescription",
        productThumbnail: "$productDetails.productThumbnail",
        productPrice: "$productDetails.productPrice",
        brandName: "$brandDetails.brandName",
        brandThumbnail: "$brandDetails.brandThumbnail",
      },
    },
    { $limit: 8 },
  ]);

  console.log("Fetch Preference Result:", result); // Check the aggregation result

  return result;
};
